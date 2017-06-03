var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");


module.exports = function(app) {
	
	app.get("/", function(req, res) {

		if (req.user) {
			res.redirect("/following");
			// res.redirect("/members");
			return false;
		}
		res.render("signup");
	});

	app.get("/login", function(req, res) {
		var hbsObject = {};
			
		if (req.user) {
			res.render("following", hbsObject);
			// res.render("members", hbsObject);
		}

		res.render("login", hbsObject)
	});

	
	app.get("/members", isAuthenticated, function(req, res) {

		// db.User.findAll({
		// 		where: {
		// 			id: req.user.id
		// 		},
		// 		include: [ db.company_list ],
		// 		raw: true, //into a readable json format
		// 		nest: true	//in to a nested format to access the companies_list table
		// 	}).then(function(data) {
		// 		console.log("////////////////////////");
		// 		console.log(data.length);
		// 		console.log(data);
		// 		console.log("////////////////////////");

		// 		var hbsObject = {
		// 			company_name: data
		// 		};

		// 		res.render("members", hbsObject);
		// 	});
	});

	app.get("/following", isAuthenticated, function(req, res) {

		db.User.findAll({
				where: {
					id: req.user.id
				},
				include: [ db.company_list ],
				raw: true, //into a readable json format
				nest: true	//in to a nested format to access the companies_list table
			}).then(function(data) {
				console.log("////////////////////////");
				var companiesArray = [];
				for (var i = 0; i < data.length; i++) {
					// console.log(data[i].company_lists.twitter_handle);
					companiesArray.push(data[i].company_lists.twitter_handle);
				}
				/// joy here is the array////
				console.log("this is your new array " + companiesArray);
				console.log("////////////////////////");

				var hbsObject = {
					company_name: data,
					TwitterArray: companiesArray
				};

				res.render("following", hbsObject);
			});
	});

	//test function for calling back data for charts.js
	app.get("/api/lists", isAuthenticated, function(req, res) {

		db.User.findAll({
			where: {
				id: req.user.id
			},
			include: [ db.company_list ],
			raw: true,
			nest: true,
		}).then(function(data) {
			res.json(data);
		});

	});

	app.get("/barchart", isAuthenticated, function(req, res) {

		var hbsObject = {};

		res.render("barchart", hbsObject);

	});

	app.get("/dashboard", isAuthenticated, function(req, res) {

		var hbsObject = {};

		res.render("dashboard", hbsObject);

	});

	app.get("/heatmap", isAuthenticated, function(req, res) {

		var hbsObject = {};

		res.render("heatmap", hbsObject);

	});

	app.get("/aboutUs", function(req, res) {

		var hbsObject = {};	

		res.render("aboutUs", hbsObject);
	});
   
    app.get("/deleteaccount", function(req, res){

    	var hbsObject = {};

    	res.render("deleteaccount", hbsObject);

    });
	
};