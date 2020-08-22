// A promisified version of XMLHttpRequest
var makeRequest = function(url, method) {

    // Create the XHR request
    var request = new XMLHttpRequest();
    
    // Return it as a Promise
	return new Promise(function (resolve, reject) {
		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {

			// Only run if the request is complete
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request.response);
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

        };

        request.onerror = function () {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };
        
        // Setup our HTTP request
		request.open(method || 'GET', url, true);

		// Send the request
		request.send();

	});
};

const apiURL = "https://2a5c62f2-cc81-45cf-aa5a-c891a07e7159.mock.pstmn.io";

function getUser(userId) {
    
    /* This fails as node doesn't know the fetch API
        check this: https://github.com/jefflau/jest-fetch-mock
    
    fetch(`${apiURL}/users/${userId}`).then(
        function(resp) {
            resp.text().then(function(text) {
                return text;
            });
        },
        function(fail) {
            return fail;
        }
    ); */

    return makeRequest(`${apiURL}/users/${userId}`,'GET')
        .then(results => {return JSON.parse(results);})     // Be careful here: If you don't return JSON.parse, you return a string and Jest will fail!!!
        .catch(error => {return error;});
    
}

exports.getUser = getUser;
