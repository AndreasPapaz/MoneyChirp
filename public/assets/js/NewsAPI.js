var newsArray = ["bbc-news", "business-insider", "wired-de", "usa-today", "techcrunch", "reddit-r-all", "hacker-news"];
var randNews = newsArray[Math.floor(Math.random() * newsArray.length)];
var newsUrl =  "https://newsapi.org/v1/articles?source=" + randNews + "&apiKey=dbee0ba68d36422d8a68ed5493a46cd2";
console.log("this is your daily news" + randNews);

runNews();
setInterval(runNews, 10000);


function runNews() {
	$.getJSON(newsUrl, function(data) {
		console.log(data.articles);
		var intNews = Math.floor(Math.random() * 4);

		var newsImage = data.articles[intNews].urlToImage;
		var newsDes = data.articles[intNews].description;
		var newsTitle = data.articles[intNews].title;
		var newsLink = data.articles[intNews].url;


		$(".mdl-card__title").css('background', 'url(' + newsImage + ')');
		$(".mdl-card__title-text").text(newsTitle);
		$(".mdl-card__supporting-text").text(newsDes);
		$(".newsLink").attr("href", newsLink);
	});
}

