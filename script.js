'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// AJAX
// Asynchronous JavaScript And XML: Allow us to communicate with remote web servers in asynchronous way,
// with AJAX calls we can request data from web servers dynamically

// OLD SCHOOL WAY

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
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // * AJAX CALL
  // const request = new XMLHttpRequest(); // request is an object
  // console.log(request);
  // request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // 'GET' is the type of request, second link is the link that will connect us to that api
  // request.send();

  // when the data arrives load event is fired
  request.addEventListener('load', function () {
    console.log(this); //  request
    console.log(this.responseText);

    // const data = JSON.parse(this.responseText)[0]; // converting it to object
    // ! VERY IMPORTANT TO MEMORIZE ==> const [dara] = JSON.parse(this.responseText);
    const [data] = JSON.parse(this.responseText); // converting it to object // destructuring
    console.log(data);

    // Render Country
    renderCountry(data);

    // Render Neighbours (1)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    const request2 = new XMLHttpRequest(); // request is an object
    // console.log(request2);
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`); // 'GET' is the type of request, second link is the link that will connect us to that api
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText); // Get data about neighbour
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });

    // console.log(data.flag);
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
  });
  console.log('---------------------------');
};

// getCountryAndNeighbour('mongolia');

// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('france');
// getCountryAndNeighbour('israel');
// getCountryAndNeighbour('kurdistan');

// console.clear();

// OBJECT KEYS 🫀🫀🫀
// i love you object keys 🫀🫀🫀
/*
const g = {
  name: 'andrew',
  job: 'scammer',
  age: 36,
};

console.log(Object.keys(g)); // getting array of propery names
console.log(Object.keys(g)[0]); // getting array of propery names
*/

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

// ! SIMPLIFIED
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((resultingValue) => resultingValue.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0]; // checking borders

      fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then((Neighbourresult) => Neighbourresult.json())
        .then((neighbourData) => {
          renderCountry(neighbourData);
        });
    });
};

// ? STEP BY STEP WHAT HAPPENS
// ?  1- we fetch something
// ? 2- then we get a response that will be converted to json
// ? 3- we take that data and render it to the dom
getCountryData('usa');
