'use strict';

const QuestionAPIClient = require('./QuestionAPIClient');

var apiEndpoint  = 'opentdb.com';
//var tokenPath    = '/api_token.php?command=request';
var tokenPath    = '/api_token.php?command=reset';
var token='dea2d1d981527192d9e9385e03f32b34a3ed6dfa3e128f6844e1ef978d4a9a2a';
tokenPath += '&token=';
tokenPath += token;
//var questionPath = '/api.php?type=multiple&amount=1';

//questionPath += '&token=';
//questionPath += token;

//console.log ('questionPath: ', questionPath);
console.log ('tokenPath: ', tokenPath);

const tokenClient    = new QuestionAPIClient(apiEndpoint,tokenPath);
//const questionClient = new QuestionAPIClient(apiEndpoint,questionPath);
//
console.log('Token:    ',tokenClient);
//console.log('Question: ',questionClient);

let tokenCall = tokenClient.get();

tokenCall.then((resp) => {

  console.log('Token: ',resp.payload);
});
//========
/*
let questionCall = questionClient.get();

questionCall.then((resp) => {

  console.log('Question: ',resp.payload);
});
*/
