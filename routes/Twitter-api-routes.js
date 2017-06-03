var path = require("path");
var chartData = require("../data/chartData.js");
var financeData = require("../data/financeData.js");
var Client = require('node-rest-client').Client;
var client = new Client();


// //twitter stuff --- move to another file after testing
// var keys = require("../keys.js");
var accountInfo = {
    consumer_key: '8rdeCnRswldWEIcJj7AmY9251',
    consumer_secret: 'qxo7jGTj2MuTn1YahDH2P7jb1LDCcWP1GmU5CcXpUMRk3dJRZ6',
    access_token_key: '839168077031948291-fxevhFQQcqHfpxB1rTa8DPUOhOxb4Eo',
    access_token_secret: 'Bq0g8LipoNl9HhSNyBrVT9lNJXjy133kULZXZtqHUpuVE'
}
var Twitter = require('twitter');
var client2 = new Twitter(accountInfo);


//twitter stuff --- move to another file after testing

var finalScores = [];
var companiesArray = [];
var stockDataArray = [];
var stockTimeArray = [];

var TwitterReturn = [];


// var getParams = function() {

//     // need query in this part to get handels using names
//     connection.query("Select * from companies", function(err, res) {
//         var companyArray = [];

//         if (err) {
//             throw err;
//         }
//         console.log(res);
//         for (var z = 0; z < res.length; z++) {
//             companyArray.push(res[z].name);
//             handleArray.push(res[z].handle);

//         }
//     console.log(companyArray, handleArray);
// companiesArray.forEach(getTweets);

// }

var getTweets = function(element, index, array) {

    finalScores = [];

    var params = { q: '%40' + element, count: 10, lang: 'en', result_type: 'popular' };

    client2.get('search/tweets', params, function(error, response) {
        if (error) {
            console.log('Error occurred: ' + error);
        } else if (!error) {


            var trendingScore = 0;
            // console.log(response);

            for (j = 0; j < response.statuses.length; j++) {

                // console.log(response.statuses[j].retweet_count, response.statuses[j].favorite_count);
                var postReach = (response.statuses[j].retweet_count +
                    response.statuses[j].favorite_count);
                console.log(postReach);
                trendingScore += postReach;



            }

            console.log(element + ":" + trendingScore);
            var trendingData = {
                company: element,
                score: trendingScore
            }
            TwitterReturn.push(trendingData);

        }
    });
}

var getFinance = function(symbol) {

    stockPriceArray = [];
    stockTimeArray = [];


    client.get("http://marketdata.websol.barchart.com/getHistory.json?key=5f1d20803f9a33507c2f332d07223231&symbol=" + symbol + "&type=daily&startDate=20170501000000", function(data, response) {

        for (var i = 0; i < data.results.length; i++) {
            console.log(data.results[i].close, data.results[i].timestamp);
            stockPriceArray.push(data.results[i].close);
            stockTimeArray.push(data.results[i].timestamp.split("T").shift());
            /// joy to here
        }

    });

}

module.exports = function(app) {

    app.get("/dashboard2", function(req, res) {
        res.sendFile(path.join(__dirname, "../dashboard.html"));
    });

    app.get("/api/chartData", function(req, res) {
        res.json(chartData);
    });

    app.post("/api/chartData", function(req, res) {

        TwitterReturn = [];
        chartData = req.body;
        companiesArray = req.body.handles;

        companiesArray.forEach(getTweets);

        setTimeout(function() {

            chartData = TwitterReturn;
            res.json(TwitterReturn);

        }, 2000);

    });

    app.get("/api/financeData", function(req, res) {
        res.json(financeData);

    });

    app.post("/api/financeData", function(req, res) {
        financeData = req.body;
        symbol = req.body.symbol;
        console.log(symbol);
        getFinance(symbol);
        setTimeout(function() {
            console.log(stockTimeArray, stockPriceArray);
            financeData.timeStamps = stockTimeArray;
            financeData.closePrices = stockPriceArray;
            res.json(financeData);
        }, 3000);
    });


    app.post("/api/clear", function() {
        // Empty out the arrays of data
        chartData = [];

    });

}
