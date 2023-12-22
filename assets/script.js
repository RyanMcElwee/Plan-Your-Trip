const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/search?key=https%3A%2F%2Fapi.teleport.org%2Fapi%2F%29&key=43C01EC640F049D2B42D2AF0EA110DEE&searchQuery=Japan&category=flights&language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  // code to search locations 

  const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/15263873/details?key=https%3A%2F%2Fapi.teleport.org%2Fapi%2F&key=43C01EC640F049D2B42D2AF0EA110DEE&language=en&currency=USD', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  //code for location details

  const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/15263873/photos?key=https%3A%2F%2Fapi.teleport.org%2Fapi%2F&key=43C01EC640F049D2B42D2AF0EA110DEE&language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  //code for location photos

  const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/15263873/reviews?key=https%3A%2F%2Fapi.teleport.org%2Fapi%2F&key=43C01EC640F049D2B42D2AF0EA110DEE&language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  //code for location reviews

