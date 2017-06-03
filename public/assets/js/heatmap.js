$(document).ready(function() {

    var stocks = [];
    var twitterList = [];
    var stocksUrl = stocks.join('%20');

    getData();

    function getData() {
        $.get("/api/lists", function(data) {

            for (var i = 0; i < data.length; i++) {
                twitterList.push(data[i].company_lists.twitter_handle);
                stocks.push(data[i].company_lists.stock_sym);

            }
            console.log("stock list " + stocks);



            var stocksUrl = stocks.join('%20');
            var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22' + stocksUrl + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';


            var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22' + stocksUrl + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

            $.getJSON(url, function(data) {
                for (var i = 0; i < data.query.results.quote.length; i++) {
                    var stockId = '#stock-' + (i + 1);
                    var change = data.query.results.quote[i].ChangeinPercent;
                    var stockSymbol = data.query.results.quote[i].symbol

                    if (change.slice(0, -1) < 0) {
                        $(stockId).css('background-color', '#db5959');
                    } else if (change.slice(0, -1) > 0) {
                        $(stockId).css('background-color', '#68b665');
                    } else if (change.slice(0, -1) == 0) {
                        $(stockId).css('background-color', '#fdca41');
                    }

                    $(stockId).children('.symbol').html(stockSymbol);
                    $(stockId).children('.change').html(change);
                    $(stockId).attr("stockSymbol", stockSymbol);
                }
            });

        });

    }


// ================= barchart API and modal ====================

var companySymbol;
var stockPrices = [];
var stockTimes = [];


$(document).on("click", ".stock", function() {
    
    var financeData = {
        symbol: $(this).attr("stockSymbol"),
        timeStamps: [],
        closePrices: []
    }

    $.post("api/financeData", financeData, function(data) {
        companySymbol = data.symbol;
        stockPrices = data.closePrices;
        stockTimes = data.timeStamps;
        runChart();

    });
});


//////////////////////////////// CHARTJS ////////////////////////////////////////
var runChart = function() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stockTimes,
            datasets: [{
                label: [companySymbol],
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255,99,132,1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 1,
                data: stockPrices
            }],
            options: {
                responsive: false,
                maintainAspectRatio: false
            }
        }
    });
}

});
