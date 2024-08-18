/*


(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.log(`💥💥 ${err.message} 💥💥`);
  }
})();

console.clear();

const getData = function () {
  return new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 50);
    setTimeout(() => {
      resolve(randomNum);
    }, 600);
  });
};

// const result = await getData();
// result.then((_) => console.log(_));

const start = async function () {
  const result = await getData();
  console.log(result);
};

// console.log(start());
// start();

// ! IIFE (immediately invoked function expressions)
// they dont polute the global object name space

let num;

(function myIIFE() {
  num++;
  console.log(num);
  return num !== 5 ? myIIFE(num) : console.log('Finished');
})((num = 0));

console.log(num);

// global
const x = 'whatever';

const helloWorld = () => 'Hello World!';

// isolate declarations within the function
(() => {
  const x = 'iife whatever';
  const helloWorld = () => 'Hello IIFE';
  console.log(x);
  console.log(helloWorld());
})();

console.log(x);
console.log(helloWorld());

//
*/

'use strict';

const imgContainer = document.querySelector('.images');
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `  
<article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(3)}</p>
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

// Getting JSON format

const getJSON = function (url, errorMessage = 'Something went wrong') {
  // we return the function and return a value withing that function
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`); // creating our own error, rejecting the promise on purpose
    return response.json();
  });
};

/*

///////////////////////////////////////

// AJAX
// Asynchronous JavaScript And XML: Allow us to communicate with remote web servers in asynchronous way,
// with AJAX calls we can request data from web servers dynamically

// ! RENDER COUNTRY CARD


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

// console.log('--------------------');jjjjjj

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

// * MODERN WAY AJAX CALLS
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
// * 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// * 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
// * The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// * 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// * 4. Chain a .catch method to the end of the promise chain and log errors to the console
// * 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// * 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

const whereAmI = function (lat, lng) {
  // fetch(`https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key`);
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((response) => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.region}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]))
    .catch((err) => console.error(`Something went wrong ${err.message}`))
    .finally((countriesContainer.style.opacity = 0.75));
};

// whereAmI(39.9334, 32.8597);
whereAmI(35.5, 32.8);
whereAmI(52.508, 13.381);

// ! CREATING A PROMISE

// * in practice we usually just consume promises
// * creating a new promises, promises are special kind of object, the function is called executer, as soon as promise runs it runs that executer function. promise should end up in either resolve or reject
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening ...');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN'); // calling resolve function will mark this promise as fulfilled promise
    } else {
      reject(new Error('You LOST 💩')); // creating real error
    }
  }, 2000);
});

// ! CONSUMING THE PROMISE
lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// ! PROMISIFYING SET TIME OUT
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); // it's not necesarry to wait for value
  });
};

const waitSeconds = 3;
wait(waitSeconds)
  .then(() => {
    console.log(
      `${waitSeconds} SECONDS WAITED, we dont receive any resolved value so there is no parameter in this function`
    );
    return wait(1); // in the result of the first fetch we create a new fetch and return it
  })
  .then(() => {
    console.log('i waited for 1 more seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited even more !!');
    return wait(1);
  })
  .then(() => {
    console.log('I WAITED FOR SO LONG !!!!!!!');
  });

// ! BAD PRACTİCE (dont do this)
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// ! CREATING FULFILLED OR REJECTED PROMISE IMMEDIATELY (CHEAT CODE)
Promise.resolve('Resolved immediately').then((res) => console.log(res)); // this is a static method on Promise constructor
Promise.reject('Rejected immediately').catch((err) => console.error(err));


// navigator.geolocation.getCurrentPosition() // getting the user's coordinates

// promisifying a callback based API to promise based API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // ? navigator.geolocation.getCurrentPosition(
    // ?   (position) => resolve(position),
    // ?   (err) => reject(err)
    // ? );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then((val) => console.log(val))
  .catch((err) => console.log('Something went wrong => ' + err));

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      // const { latitude, longitude } = pos.coords;
      // console.log(latitude);
      // console.log(longitude);
      console.log(lat, lng);
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((response) => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.region}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]))
    .catch((err) => console.error(`Something went wrong ${err.message}`))
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI); // interestingly when i add parenthesis to 'whereAmI' im getting error !?

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// ! ASYNC/AWAIT

// * async function performs the code inside of it while running at the background, when function is done it automatically returns promise
// * an async function always returns promise
const whereAmI = async function (country) {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const geoRes = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geoRes.ok) throw new Error('Problem getting location');
    const dataGeo = await geoRes.json();
    const currCountry = dataGeo.country;

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${currCountry}`
    );

    if (!response.ok) throw new Error('Problem getting the country');

    const data = await response.json();
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    // alert(err.message);
    alert(err.message);
    renderError(`Something went wrong ${err.message}`);
    countriesContainer.style.opacity = 1;

    // ! //
    // ! REJECT PROMISE RETURNED FROM ASYNC FUNCTION, if you skip this part even when there is an error it will return fulfilled
    throw err; // no need for 1new Error", we already have error
  }
};

// const place = whereAmI();
// console.log(place); // * an asyn function always returns promise // fulfilled value of that promise will be what we returned

// whereAmI().then((res) => console.log(res))

// ? Promise.race(), Promise.all(), Promsie.allSettled, Promise.any()

const get3countriess = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`)
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`)
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`)

    // const capitalArray = [...data1.capital, ...data2.capital, ...data3.capital];
    // console.log(capitalArray);

    // ! Promise.all()
    // * this method takes in an array of promises and returns new promise, which will run all promises array at the same time, saving us time to load the page
    // * if one of the promises reject, then all of the promises rejects as well

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]); // fetching 2 countries at the same time

    // console.log(data.map((d) => d[0].capital));

    const arrsCapital = data.map((c) => c[0].capital);
    console.log(arrsCapital);

    const newArrsCapital = [].concat(...arrsCapital);
    console.log(newArrsCapital);
  } catch (err) {
    console.error(err);
  }
};

get3countriess('turkey', 'spain', 'algeria');


// ! Promise.race()
// * inside the array promises will race each other, winner becomes the returned promise, promise that gets rejected can also win the race

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/zambia`),
    getJSON(`https://restcountries.com/v3.1/name/albania`),
    getJSON(`https://restcountries.com/v3.1/name/andorra`),
  ]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/zambia`),
  timeout(1),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err.message + '💥💥💥'));


// ! Promise.allSettled()
// * never short circuits, returns all results of all promises, its different from Promise.all() as it would return error
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('another Success'),
  Promise.reject('another ERROR'),
]).then((res) => console.log(res));

// ! Promise.any()
// * return first fulfilled promise, ignoring rejected promises

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); // it's not necesarry to wait for value
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// const loadNPause = async function () {
//   try {
//     // image-1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');

//     await wait(2);
//     img.style.display = 'none';

//     // image-2
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');

//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };

// loadNPause();

// Part2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    console.log(imgs);

    const imgEl = await Promise.all(imgs);
    console.log(imgEl);
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
