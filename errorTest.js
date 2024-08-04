// // ! ERRORS
// // ? try{}, catch{}, throw{}, finally{}
// // * catch{} has to come after try{}

// // prettier-ignore
// try {

//   console.log('Start of try runs');

//   unicycle;

//   console.log('End of try runs -- never reached');

// } catch (err) {

//   console.error('error occured: ' + err + ' --- ' + err.stack);

// } finally {

//   console.log('this always run');

// }

// console.log('...Then the execution continues');

// let json = '{"age": 30}';

// // prettier-ignore
// try {

//   console.log(json) // this wont give the data in json format as we dident parse it

//   let user = JSON.parse(json);

//   console.log(user);

// } catch (err) {

//   console.error('JSON Error: ' + err.message); // err.message is more concise error

// }
