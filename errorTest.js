/*

// ! ERRORS
// ? try{}, catch{}, throw{}, finally{}
// * catch{} has to come after try{}

// prettier-ignore
try {

  console.log('Start of try runs');

  unicycle;

  console.log('End of try runs -- never reached');

} catch (err) {

  console.error('error occured: ' + err + ' --- ' + err.stack);

} finally {

  console.log('this always run');

}

console.log('...Then the execution continues');

let json = '{"age": 30}';

// prettier-ignore
try {

  console.log(json) // this wont give the data in json format as we dident parse it

  let user = JSON.parse(json);

  console.log(user);

} catch (err) {

  console.error('JSON Error: ' + err.message); // err.message is more concise error

}

console.log('Test start');

setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resoveld promise 1').then((res) => console.log(res)); // Promise.resolve immediately gives fulfilled promise

Promise.resolve('Resolved promise 2').then((res) => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log('test');
});
console.log('Test end');


*/
