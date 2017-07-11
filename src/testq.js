'use strict';

const QuestionAPIClient = require('./QuestionAPIClient');

var apiEndpoint  = 'opentdb.com';
var tokenPath    = '/api_token.php?command=request';
var questionPath = '/api.php?type=multiple&amount=1';

const tokenClient    = new QuestionAPIClient(apiEndpoint,tokenPath);
//const questionClient = new QuestionAPIClient(apiEndpoint,questionPath);
//
console.log('Token:    ',tokenClient);
//console.log('Question: ',questionClient);

let token = tokenClient.get();

token.then((resp) => {

  console.log('Token: ',resp.payload.token);
});
