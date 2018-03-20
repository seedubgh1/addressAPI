'use strict';

const Https = require('https');

/**
 * This is a small wrapper client for a trivia question API,
 * used for an Alexa trivia skill
 */
class QuestionAPIClient {

    /**
     * Retrieve an instance of the Address API client.
     * @param apiEndpoint the endpoint of the question APIs.
     * @param sessionToken valid consent token.
     */
    constructor(apiEndpoint, path) {
        console.log("Creating QuestionAPIClient instance.");
        //this.sessionToken = sessionToken;
        this.endpoint = apiEndpoint.replace(/^https?:\/\//i, "");
        this.path = path;
    }

    /**
     * This will make a request to the Address API using the device ID and
     * consent token provided when the Address Client was initialized.
     * This will retrieve the full address of a device.
     * @return {Promise} promise for the request in flight.
     */
    //getFullAddress() {
    get() {
        const options = this.__getRequestOptions(this.path);

        return new Promise((fulfill, reject) => {
            this.__handleQuestionApiRequest(options, fulfill, reject);
        });
    }

    /**
     * This will make a request to the Address API using the device ID and
     * consent token provided when the Address Client was initialized.
     * This will retrieve the country and postal code of a device.
     * @return {Promise} promise for the request in flight.
     */
    getCountryAndPostalCode() {
        const options = this.__getRequestOptions(
            `/v1/devices/${this.deviceId}/settings/address/countryAndPostalCode`);

        return new Promise((fulfill, reject) => {
            this.__handleQuestionApiRequest(options, fulfill, reject);
        });
    }

    /**
     * This is a helper method that makes requests to the Address API and handles the response
     * in a generic manner. It will also resolve promise methods.
     * @param requestOptions
     * @param fulfill
     * @param reject
     * @private
     */
    __handleQuestionApiRequest(requestOptions, fulfill, reject) {
        Https.get(requestOptions, (response) => {
            console.log(`Question API responded with a status code of : ${response.statusCode}`);

            response.on('data', (data) => {
                let responsePayloadObject = JSON.parse(data);

                const questionResponse = {
                    statusCode: response.statusCode,
                    //address: responsePayloadObject
                    payload: responsePayloadObject
                };

                fulfill(questionResponse);
            });
        }).on('error', (e) => {
            console.error(e);
            reject();
        });
    }

    /**
     * Private helper method for retrieving request options.
     * @param path the path that you want to hit against the API provided by the skill event.
     * @return {{hostname: string, path: *, method: string, headers: {Authorization: string}}}
     * @private
     */
    __getRequestOptions(path) {
        return {
            hostname: this.endpoint, 
            path: path,
            method: 'GET',
            //port: '',
            //'headers': {
            //    'Authorization': 'Bearer ' + this.sessionToken
            //}
        };
    }
}

module.exports = QuestionAPIClient;
