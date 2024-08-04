'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// AJAX
// Asynchronous JavaScript And XML: Allow us to communicate with remote web servers in asynchronous way,
// with AJAX calls we can request data from web servers dynamically

// ! RENDER COUNTRY CARD

const renderCountry = function (data, className = '') {
  const html = `  
<article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${
      data.languages[Object.keys(data.languages)[0]]
    }</p>
    <p class="country__row"><span>💰</span>${
      data.currencies[Object.keys(data.currencies)[0]].name
    }</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// ! RENDER ERROR
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// * OLD SCHOOL WAY, NOT MODERN

// const getCountryAndNeighbour = function (country) {
//   // * AJAX CALL
//   // const request = new XMLHttpRequest(); // request is an object
//   // console.log(request);
//   // request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // 'GET' is the type of request, second link is the link that will connect us to that api
//   // request.send();

//   // when the data arrives load event is fired
//   request.addEventListener("load", function () {
//     console.log(this); //  request
//     console.log(this.responseText);

//     // const data = JSON.parse(this.responseText)[0]; // converting it to object
//     // ! VERY IMPORTANT TO MEMORIZE ==> const [dara] = JSON.parse(this.responseText);
//     const [data] = JSON.parse(this.responseText); // converting it to object // destructuring
//     console.log(data);

//     // Render Country
//     renderCountry(data);

//     // Render Neighbours (1)
//     const neighbour = data.borders?.[0];

//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest(); // request is an object
//     // console.log(request2);
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`); // 'GET' is the type of request, second link is the link that will connect us to that api
//     request2.send();

//     request2.addEventListener("load", function () {
//       const [data2] = JSON.parse(this.responseText); // Get data about neighbour
//       console.log(data2);
//       renderCountry(data2, "neighbour");
//     });

//     // console.log(data.flag);
// console.log(data.flags.svg);
// console.log(data.name.common);
// console.log(data.region);
// console.log((+data.population / 1000000).toFixed(1));
// console.log(data.languages.tur);
// console.log(data.currencies.TRY.name);
// console.log(data.currencies.TRY.name);
// console.log(data.currencies.USD.name);

// console.log('--------------------');

// console.log(data.currencies);
// console.log(data.languages);

// console.log('--------------------');

// console.log(typeof data.currencies);
// console.log(data.currencies);
// console.log(Object.keys(data.currencies)[0]);
// console.log(data.currencies[Object.keys(data.currencies)[0]]);
// console.log(data.currencies['TRY']);

// console.log(data.currencies[Object.keys(data.currencies)[0]].name); // ! getting currency

// console.log(data.languages['tur']); // output: turkish
// console.log(data.languages[Object.keys(data.languages)[0]]); // ! getting language
// });
// console.log("---------------------------");
// };

// getCountryAndNeighbour('mongolia');

// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('france');
// getCountryAndNeighbour('israel');
// getCountryAndNeighbour('kurdistan');

// console.clear();

// OBJECT KEYS 🫀🫀🫀
// i love you object keys 🫀🫀🫀
// const g = {
// name: 'andrew',
// job: 'scammer',
//   age: 36,
// };

// console.log(Object.keys(g)); // getting array of propery names
// console.log(Object.keys(g)[0]); // getting array of propery names

// * OLD WAY
// const request = new XMLHttpRequest(); // request is an object
// console.log(request);
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // 'GET' is the type of request, second link is the link that will connect us to that api
// request.send();

// //* MODERN WAY AJAX CALLS
// * const request = fetch('https://restcountries.com/v3.1/name/portugal'); // rerquest is a promise
// * console.log(request);

// const getCountryData = function (country) {
//   // fetch return a promise and in all promises we can call then method
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (resultingValue) {
//       console.log(resultingValue); // resulting value is a 'response'
//       // this is a new promise, resolved value of promise will be the data itself
//       // when chaining we get what we return
//       return resultingValue.json(); // json() method is available on all response objects that is coming from the fetch function
//     })
//     .then(function (data) {
//       console.log(data); // data about the country
//       renderCountry(data[0]);

//       console.log(data[0].borders[0], 'neighbour');
//       renderCountry('CAN');
//     });
// };

// * GETTING JSON FORMAT BY CHECKING ANY ERROR
const getJSON = function (url, errorMessage = 'Something went wrong') {
  // we return the function and return a value withing that function
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`); // creating our own error, rejecting the promise on purpose
    return response.json();
  });
};

// ! SIMPLIFIED
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(
        `https://restcountries.com/v3.1/name/${neighbour}`,
        'Country not found'
      );
    })
    .then((neighbourData) => renderCountry(neighbourData[0], 'neighbour'))
    .catch((err) => {
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try Again`); // err.message will take only the message not the error (test it yourself if its not clear)
    })
    // finally() will be called always no matter promise is fulfilled or rejected
    .finally(() => (countriesContainer.style.opacity = 1));
};

// ? STEP BY STEP WHAT HAPPENS
// ? 1- we fetch something
// ? 2- then we get a response that will be converted to json
// ? 3- we take that data and render it to the dom

// ? then() method is called when promise is fulfilled
// ? catch() method is called when promise is rejected
// ? finally() method is always called no matter promise is fulfilled or rejected, and it comes after catch()
// ? they all return promise

btn.addEventListener('click', function () {
  getCountryData('algeria');
});

// Challenge #1

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
// The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

const whereAmI = function (lat, lng) {
  // fetch(`https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key`);
  fetch(`https://geocode.xyz/52.508,13.381?geoit=json`);
};
