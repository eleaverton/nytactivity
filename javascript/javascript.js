$(document).ready(function() {
	// VARIABLES
	var apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
	var queryTerm = "";
	var numRecords = 0;
	var beginYr = 0;
	var endYr = 0;
	var baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=";
	var articleCount = 0;
// METHODS
	// Event listener for the btnSearch
	$('#btnSearch').on('click', function() {
		// Resets the articleCount
		articleCount = 0;
		// Clears current content
		$("#wellSection").empty();
		queryTerm = $('#searchTerm').val().trim();
		queryURL = baseURL + queryTerm;
		numRecords = $("#numRecordsSelect").val();
		beginYr = $('#beginYr').val().trim();
		endYr = $('#endYr').val().trim();
		// Checks to see if the user inputs a beginYr & it's a number
		if (parseInt(beginYr)) 
		{
			// Add beginYr to query
			queryURL = queryURL + "&begin_date=" + startYr + "0101";
		}
		// Checks to see if the user inputs a endYr & it's a number
		if (parseInt(endYr)) 
		{
			// Adds endYr to query
			queryURL = queryURL + "&end_date=" + endYr + "0101";
		}
		runQuery(numRecords, queryURL);
		// This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
		return false;
	});	
	// Clears the article section & resets the articleCount
	$('#btnClear').on('click', function() {
		articleCount = 0;
		$("#wellSection").empty();
	})
// FUNCTIONS
	// Accepts numRecords & queryURL to fire the query
	function runQuery(numRecords, queryURL) {
		// Retrieves said data and stores it into NYTData
		$.ajax({url: queryURL, method: "GET"}).done(function(NYTData) {
			console.log("------------------------------------")
			console.log("URL: " + queryURL);
			console.log("------------------------------------")
			console.log(NYTData);
			console.log("------------------------------------")
			for (var i = 0; i < numRecords; i++) {
				articleCount++;
				// Establishes the wellSection
				var wellSection = $("<div>");
				wellSection.addClass('well');
				wellSection.attr('id', 'articleWell-' + articleCount)
				$('#wellSection').append(wellSection);
				// Checks the search results
				chkResults(response, articleCount, i);				
				// Displays the results in the HTML
				displayResults(response, articleCount, i);
				console.log(NYTData.response.docs[i].pub_date);
				console.log(NYTData.response.docs[i].section_name);
				console.log(NYTData.response.docs[i].web_url);	
			}
		});
	}
	function chkResults(response, articleCount, i) {
		// If the article has a headline include the headline in the HTML
		if(NYTData.response.docs[i].headline != "null") {
			$("#articleWell-"+ articleCount).append('<h3><span class="label label-primary">' + articleCount + '</span><strong>   ' + 
			NYTData.response.docs[i].headline.main + "</strong></h3>")
			console.log(NYTData.response.docs[i].headline.main);
		}
		// If the article has a Byline include the headline in the HTML
		if( NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
			$("#articleWell-"+ articleCount).append('<h5>' + 
			NYTData.response.docs[i].byline.original + "</h5>");
			// Log the first article's Author to console.
			console.log(NYTData.response.docs[i].byline.original);
		}
	}
	function displayResults(response, articleCount, i) {
		// Displays the remaining fields in the HTML (Section Name, Date, URL)
		$("#articleWell-"+ articleCount).append('<h5>Section: ' + 
		NYTData.response.docs[i].section_name + "</h5>");
		$("#articleWell-"+ articleCount).append('<h5>' + 
		NYTData.response.docs[i].pub_date + "</h5>");
		$("#articleWell-"+ articleCount).append("<a href='" + 
		NYTData.response.docs[i].web_url + "'>" + 
		NYTData.response.docs[i].web_url + "</a>");
	}
});