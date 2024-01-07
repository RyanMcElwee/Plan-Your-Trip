// Grabs certain areas within the HTML
var searchCity = $(".city-search");
var coverImage = $(".city-image");
var cityLabel = $(".city-state-country");
var population = $(".population");
var citySummary = $(".city-summary");
var scoresLeft = $(".scores-left");
var scoresRight = $(".scores-right");

// Starting cover image until city is searched
coverImage.css("background-image", "url('assets/images/world-image.jpg')");

// Function for helping the user select a proper city to match with Teleport API
function autocompleteSearch() {
    var availableCities = [
        "Aarhus", "Adelaide", "Albuquerque", "Almaty", "Amsterdam", "Anchorage", "Andorra", "Ankara", "Asheville", "Asuncion", "Athens", "Atlanta", "Auckland", "Austin",
        "Baku", "Bali", "Bangkok", "Barcelona", "Beijing", "Beirut", "Belfast", "Belgrade", "Belize City", "Bengaluru", "Bergen", "Berlin", "Bern", "Birmingham", "Birmingham, AL", "Bogota", "Boise", "Bologna", "Bordeaux", "Boston", "Boulder", "Bozeman", "Bratislava", "Brighton", "Brisbane", "Bristol", "Brno", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Buffalo",
        "Cairo", "Calgary", "Cambridge", "Cape Town", "Caracas", "Cardiff", "Casablanca", "Charleston", "Charlotte", "Chattanooga", "Chennai", "Chiang Mai", "Chicago", "Chisinau", "Christchurch", "Cincinnati", "Cleveland", "Cluj-Napoca", "Cologne", "Colorado Springs", "Columbus", "Copenhagen", "Cork", "Curitiba",
        "Dallas", "Dar es Salaam", "Delhi", "Denver", "Des Moines", "Detroit", "Doha", "Dresden", "Dubai", "Dublin", "Dusseldorf",
        "Edinburgh", "Edmonton", "Eindhoven", "Eugene",
        "Florence", "Florianopolis", "Fort Collins", "Frankfurt", "Fukuoka",
        "Galway", "Gdansk", "Geneva", "Gibraltar", "Glasgow", "Gothenburg", "Grenoble", "Guadalajara", "Guatemala City",
        "Halifax", "Hamburg", "Hannover", "Havana", "Helsinki", "Ho Chi Minh City", "Hong Kong", "Honolulu", "Houston", "Hyderabad",
        "Indianapolis", "Innsbruck", "Istanbul",
        "Jacksonville", "Jakarta", "Johannesburg",
        "Kansas City", "Karlsruhe", "Kathmandu", "Kiev", "Kingston", "Knoxville", "Krakow", "Kuala Lumpur", "Kyoto",
        "Lagos", "La Paz", "Las Palmas de Gran Canaria", "Las Vegas", "Lausanne", "Leeds", "Leipzig", "Lille", "Lima", "Lisbon", "Liverpool", "Ljubljana", "London", "Los Angeles", "Louisville", "Luxembourg", "Lviv", "Lyon",
        "Madison", "Madrid", "Malaga", "Malmo", "Managua", "Manchester", "Manila", "Marseille", "Medellin", "Melbourne", "Memphis", "Mexico City", "Miami", "Milan", "Milwaukee", "Minneapolis-Saint Paul", "Minsk", "Montevideo", "Montreal", "Moscow", "Mumbai", "Munich",
        "Nairobi", "Nantes", "Naples", "Nashville", "New Orleans", "New York", "Nice", "Nicosia",
        "Oklahoma City", "Omaha", "Orlando", "Osaka", "Oslo", "Ottawa", "Oulu", "Oxford",
        "Palo Alto", "Panama", "Paris", "Perth", "Philadelphia", "Phnom Penh", "Phoenix", "Phuket", "Pittsburgh", "Portland, ME", "Portland, OR", "Porto", "Porto Alegre", "Prague", "Providence",
        "Quebec", "Quito",
        "Raleigh", "Reykjavik", "Richmond", "Riga", "Rio De Janeiro", "Riyadh", "Rochester", "Rome", "Rotterdam",
        "Saint Petersburg", "Salt Lake City", "San Antonio", "San Diego","San Francisco Bay Area", "San Jose", "San Juan", "San Luis Obispo", "San Salvador", "Santiago", "Santo Domingo", "Sao Paulo", "Sarajevo", "Saskatoon", "Seattle", "Seoul", "Seville", "Shanghai", "Singapore", "Skopje", "Sofia", "St. Louis", "Stockholm", "Stuttgart", "Sydney",
        "Taipei", "Tallinn", "Tampa Bay Area", "Tampere", "Tartu","Tashkent", "Tbilisi", "Tehran", "Tel Aviv", "The Hague", "Thessaloniki", "Tokyo", "Toronto", "Toulouse", "Tunis", "Turin", "Turku",
        "Uppsala", "Utrecht",
        "Valencia", "Valletta", "Vancouver", "Victoria", "Vienna", "Vilnius",
        "Warsaw", "Washington, D.C.", "Wellington", "Winnipeg", "Wroclaw",
        "Yerevan",
        "Zagreb", "Zurich"
    ];
    searchCity.autocomplete({
      source: availableCities
    });

    // Event listener when the user hits the Enter key, 
    searchCity.on('keydown', (event) => {
        if (event.key === 'Enter') {
            cityImage();
            basicInfo();
            qualityOfLife();
            viewFlights();
            searchHistory();
        }
    });
}

// For fetching the current city's background image
function cityImage() {
    // Since the API's link uses dashes in between words instead of spaces, we convert the spaces into dashes
    // Also gets rid of a comma if a searched city has one
    var convertToDashes = searchCity.val().replace(/[\s,]+/g, '-').replace(/\.+/g, '');
    // Then within the URL, changing the case to lowercase to match the API link
    var requestUrl = "https://api.teleport.org/api/urban_areas/slug:" + convertToDashes.toLowerCase() + "/images/";

    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);

        // Pinpoints the exact location of the URL needed from the data to show the current city's background image
        var backgroundImageUrl = data.photos[0].image.web;
        coverImage.css("background-image", "url(" + backgroundImageUrl + ")");
    })
}

// Function for fetching and adding the basic information from Teleport API
function basicInfo() {
    // Fetching the city's location to pull geonameid for the basic information API
    var requestUrl = "https://api.teleport.org/api/cities/?search=" + searchCity.val().toLowerCase();

    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);

        // Grabs the URL for finding out the geonameid for the basic info API
        var geoNameIdUrl = data._embedded['city:search-results'][0]._links['city:item'].href;
        
        // Fetches the basic information API
        fetch(geoNameIdUrl)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            console.log(data);

            cityLabel.text(data['full_name']);
            population.text("Population: " + data.population);
            $(".line-separator").attr("style", "display: block");
            })
        })
        // Displays a message when a location doesn't match the geoNameIdUrl
        .catch(function (error) {
            if (error instanceof TypeError) {
            cityLabel.text("No basic information to show for this location.");
            population.text("");
            $(".line-separator").attr("style", "display: block");
            }
        })
}

// Function for generating Quality of Life and other scores from Teleport API
function qualityOfLife() {
    // Since the API's link uses dashes in between words instead of spaces, we convert the spaces into dashes
    // Also gets rid of a comma if a searched city has one
    var convertToDashes = searchCity.val().replace(/[\s,]+/g, '-').replace(/\.+/g, '');

    var requestUrl = "https://api.teleport.org/api/urban_areas/slug:" + convertToDashes.toLowerCase() + "/scores/";

    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);

    // Rounds up the number so there's not a long decimal
    var cityScore = data['teleport_city_score'];
    var roundedNumber = Math.floor(cityScore);

    citySummary.html(data.summary + "\n<b>City Score:</b> " + roundedNumber + "%");
    scoresLeft.html("</p>" + data.categories[0].name + ": " + Math.floor(data.categories[1]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[1].name + ": " + Math.floor(data.categories[1]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[2].name + ": " + Math.floor(data.categories[2]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[3].name + ": " + Math.floor(data.categories[3]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[4].name + ": " + Math.floor(data.categories[4]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[5].name + ": " + Math.floor(data.categories[5]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[6].name + ": " + Math.floor(data.categories[6]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[7].name + ": " + Math.floor(data.categories[7]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[8].name + ": " + Math.floor(data.categories[8]['score_out_of_10']) + " / 10" + "</p>");
    scoresRight.html("</p>" + data.categories[9].name + ": " + Math.floor(data.categories[9]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[10].name + ": " + Math.floor(data.categories[10]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[11].name + ": " + Math.floor(data.categories[11]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[12].name + ": " + Math.floor(data.categories[12]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[13].name + ": " + Math.floor(data.categories[13]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[14].name + ": " + Math.floor(data.categories[14]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[15].name + ": " + Math.floor(data.categories[15]['score_out_of_10']) + " / 10" + "</p>"
    + "<p>" + data.categories[16].name + ": " + Math.floor(data.categories[16]['score_out_of_10']) + " / 10" + "</p>");
    })
}

// Function for displaying button that takes you to viewing flight information from second API
function viewFlights() {
    $(".view-flights").attr("style", "display: block");
}

// Empty array for storing searched cities
var searchedCities = [];

// Loads saved searches from local storage if it has anything
function loadSavedSearches() {
    // Checks if anything exists within local storage
    // If there are contents, run this code
    if (localStorage.getItem("teleport location")) {
        var searchedCities = JSON.parse(localStorage.getItem("teleport location"));
        for (var i = 0; i < searchedCities.length; i++) {
            var button = $("<button>").addClass("city").text(searchedCities[i]);
            $(".city-buttons").append(button);
    
            button.on("click", function() {
                var currentLocation = $(this).text();
                cityImage(currentLocation);
                basicInfo(currentLocation);
                qualityOfLife(currentLocation);
                viewFlights();
            });
        }
    }
}

function clearSearches() {
    // Add clear button to clear history
    var clearButton = $("<button>").addClass("clear-button").text("Clear");
    $(".clear-searches").append(clearButton);
    
    clearButton.on("click", function() {
        localStorage.clear();
        $(".city-buttons").empty();
        $(".information").empty();
    })
}

// Function for adding search history buttons
function searchHistory() {
    // Checks if there is already anything in local storage or keeps the array blank
    // So it doesn't replace the local storage upon new page refresh
    var searchedCities = JSON.parse(localStorage.getItem("teleport location")) || [];
        // Checks if searched city already exists in the search area and adds it if it doesn't
        if (!searchedCities.includes(searchCity.val())) {
            searchedCities.push(searchCity.val());
            // Add searched city to local storage in array
            localStorage.setItem("teleport location", JSON.stringify(searchedCities));
            // Adds city to search history area as a button
            var button = $("<button>").addClass("city").text(searchCity.val());
            $(".city-buttons").append(button);
            // Gets selected city's information when clicked on
            button.on("click", function() {
                var currentLocation = $(this).text();
                cityImage(currentLocation);
                basicInfo(currentLocation);
                qualityOfLife(currentLocation);
                viewFlights();
            })
        }
}

// Loads search history upon page arrival if there are any and clear button
loadSavedSearches();
clearSearches();

// Runs the first function to run all other functions
autocompleteSearch();