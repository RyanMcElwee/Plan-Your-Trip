/* function searchLocations() {
const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/search?key=https%3A%2F%2Fapi.teleport.org%2Fapi%2F%29&key=43C01EC640F049D2B42D2AF0EA110DEE&searchQuery=Japan&category=flights&language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  // code to search locations 
}

function locationDetails() {
  const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/15263873/details?key=https%3A%2F%2Fapi.teleport.org%2Fapi%2F&key=43C01EC640F049D2B42D2AF0EA110DEE&language=en&currency=USD', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  //code for location details
}

function locationPhotos() {
  const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/15263873/photos?key=https%3A%2F%2Fapi.teleport.org%2Fapi%2F&key=43C01EC640F049D2B42D2AF0EA110DEE&language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  //code for location photos
}

function locationReviews() {
  const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/15263873/reviews?key=https%3A%2F%2Fapi.teleport.org%2Fapi%2F&key=43C01EC640F049D2B42D2AF0EA110DEE&language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  //code for location reviews
}

searchLocations();
locationDetails();
locationPhotos();
locationReviews(); */

// Calls out input area within HTML and the inputted value
var searchCity = $(".city-search");

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
}

autocompleteSearch();

function cityImage() {
    var requestUrl = "https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images";

    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
    })
}

cityImage();