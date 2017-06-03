var db = require("../models");
var Client = require('node-rest-client').Client;
var client = new Client();


module.exports = function(app) {

	app.post("/barchart_stock/:stock", function(req, res) {

		// var companyStock = req.params;
		var companyStock = req.params;

		var hbsObject = { companyStock };

		res.render("barchart", hbsObject);

		// take a look at moment.js to lock set a week prior
		// client.get("http://marketdata.websol.barchart.com/getHistory.json?key=5f1d20803f9a33507c2f332d07223231&symbol=" + companyStock.stock  +"&type=daily&startDate=20170425000000", function(data, response) {
			
		// 	var stockPrice = [];
		// 	var timeLine = [];

		// 	console.log("///////////////////////////////");
		// 	console.log("");
		// 	for (var i = 0; i < data.results.length; i++) {
		// 		// console.log(data.results[i].close);
		// 		stockPrice.push(data.results[i].close);
		// 		// console.log(data.results[i].timestamp);
		// 		timeLine.push(data.results[i].timestamp);
		// 	}
		// 	console.log(timeLine);
		// 	console.log(stockPrice);
		// 	console.log("");
		// 	console.log("///////////////////////////////");
		// 	// res.redirect("/barchart");
		// });
		// res.redirect("/barchart:" + json.companyStock);
	});

};