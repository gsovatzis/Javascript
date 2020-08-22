// This is my POSTMAN mock server url
const apiURL = "https://2a5c62f2-cc81-45cf-aa5a-c891a07e7159.mock.pstmn.io";

// Initialize button callbacks
document.getElementById("getUsers").addEventListener('click', getUsers);
document.getElementById("getUser").addEventListener('click', getUser);
document.getElementById("promiseRace").addEventListener('click', promiseRaceExample);
document.getElementById("promiseAll").addEventListener('click', promiseAllExample);
document.getElementById("getUsersWithPromisableXHR").addEventListener('click', getUsersWithXHRPromisable);
document.getElementById("getUserWithReturnFunc").addEventListener('click', getUserWithReturnFunc);
document.getElementById("createUser").addEventListener('click', function() { createUserWithFetch({"id":1, "username":"George"}); });

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


function action1() {
    return new Promise(function(resolve, reject) { setTimeout(resolve, 500, 'action 1 completed') });
}

function action2() {
    return new Promise(function(resolve, reject) { setTimeout(resolve, 1500, 'action 2 completed') });
}

function action3() {
    return new Promise(function(resolve, reject) { setTimeout(resolve, 100, 'action 3 completed') });
}


function promiseAllExample() {
    Promise.all([action1(), action2(), action3()])
        .then(([res1, res2, res3]) => {
            console.log(res1);
            console.log(res2);
            console.log(res3);
        }
    );
}

function promiseRaceExample() {
    var promise1 = new Promise(function(resolve, reject) {
        setTimeout(resolve, 500, 'action one completed');
    }); 
    
    var promise2 = new Promise(function(resolve, reject) {
        setTimeout(resolve, 100, 'action two completed');
    });

    Promise.race([promise1, promise2]).then(value => {console.log(value)});
}

function getUsersWithXHRPromisable() {
    console.log("calling getUsersWithXHRPromisable...")
    makeRequest(`${apiURL}/users`,'GET')
        .then(results => document.getElementById("results").textContent = results)
        .catch(error => console.log(error));

}

function getUserWithXHRPromisable() {
    console.log("calling getUserWithXHRPromisable...")
    return makeRequest(`${apiURL}/users/123`,'GET')
        .then(results => {return results;})
        .catch(error => {return error;});

}

function getUserWithReturnFunc() {
    console.log('getUserWithReturnFunc executing...');
    getUserWithXHRPromisable()
        .then(function(data) {console.log(data)})
        .catch(function(err) {console.log(err)});
}

// The classic example with XMLHttpRequest
function getUsers() {
    console.log("getUsers called...");
    doAjaxCall(`${apiURL}/users`,'GET'); 

}

// The Fetch API example (not supported with Internet Explorer)
function getUser() {
    console.log("getUser called...");
    fetch(`${apiURL}/users/123`).then(
        function(resp) {
            resp.text().then(function(text) {
                document.getElementById("results").textContent = text;
            });
        },
        function(fail) {
            console.log(fail);
        }
    );
    
}


function doAjaxCall(url, method) {
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.responseType = 'json';
    request.onload = function() {
        document.getElementById("results").textContent = JSON.stringify(request.response);
    };
    request.onerror = function() {
        console.log(request.statusText);
    };
    request.send();
}

function successAjax(result) {
    return result;
}

function failAjax(error) {
    return error;
}

function postUser(user) {
    var request = new XMLHttpRequest();
    request.open('PUT', 'https://2a5c62f2-cc81-45cf-aa5a-c891a07e7159.mock.pstmn.io/urllathos');
    
    request.responseType = 'json';
    request.onload = function() {
        document.getElementById("results").textContent = JSON.stringify(request.response);
    };
    request.onerror = function() {
        console.log(request.statusText);
    };
    request.send(user);
}

function createUser() {
    var user = {"id":1, "username":"George"};
    var userXml = "<xml><id>1</id><username>George</username></xml>";
    postUser(user);
}

function createUserWithFetch(user) {
    fetch(`${apiURL}/users`,
        {
            method: "POST",
            body: user
    
        }
    ).then(
        function(resp) {
            resp.text().then(function(text) {
                document.getElementById("results").textContent = text;
            });
        },
        function(fail) {
            console.log(fail);
        }
    );
}

