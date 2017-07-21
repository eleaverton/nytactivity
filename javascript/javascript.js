$(document).ready(function() {
	$(document).on("click", "#btnSearch", function(event) {
		event.preventDefault();
		var search = $("#searchterm").val();
		var numOfRec = $(".dropdown-menu:selected").val();
		console.log(search);
		console.log(numOfRec);
		var apiKey = "8b6a7d49605f403eb90138d8d7e70e55";
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;
		$.ajax({
 			url: queryURL,
 			method: 'GET',
		}).done(function(res) {
 			console.log(res);
		}).fail(function(err) {
 			throw err;
		});
	});
});