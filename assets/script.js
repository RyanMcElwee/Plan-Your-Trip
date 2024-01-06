// Grabs certain areas within the HTML
var searchCity = $(".city-search");
var coverImage = $(".city-image");
var cityLabel = $(".city-state-country");
var population = $(".population");

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
            // Cannot figure out how to display message if a location has an error
            /* .catch(function (error) {
                if (error instanceof TypeError) {
                cityLabel.text("No basic information to show for this location.");
                }
            }) */
    })
}

autocompleteSearch();