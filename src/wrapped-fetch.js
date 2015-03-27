// From: http://blog.gospodarets.com/fetch_in_action/
// For Timeout functionality

var MAX_WAITING_TIME = 5000;// Default timeout in ms

var timeoutFor = function(fetcher, params = {}) {
  return setTimeout(function () {
    fetcher.reject(new Error('Load timeout for resource: ' + params.url));// reject on timeout
    }, params.timeout || MAX_WAITING_TIME);
  });
}

/* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
// It goes against Promise concept to not have external access to .resolve/.reject methods, but provides more flexibility
var getWrappedPromise = function () {
  var wrappedPromise = {},
      promise = new Promise(function (resolve, reject) {
        wrappedPromise.resolve = resolve;
        wrappedPromise.reject = reject;
      });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;// e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods
  return wrappedPromise;
};


/* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
var getWrappedFetch = function () {
    var wrappedPromise = getWrappedPromise();
    var args = Array.prototype.slice.call(arguments);// arguments to Array

    fetch.apply(null, args)// calling original fetch() method
        .then(function (response) {
            wrappedPromise.resolve(response);
        }, function (error) {
            wrappedPromise.reject(error);
        })
        .catch(function (error) {
            wrappedPromise.catch(error);
        });
    return wrappedPromise;
};

/**
 * Fetch JSON by url
 * @param { {
 *  url: {String},
 *  [cacheBusting]: {Boolean}
 * } } params
 * @returns {Promise}
 */

// TODO: should not be hardcoded for JSON but be enapsulated 
// using general HttpClient framework
var getJSON = function (params) {
    var wrappedFetch = getWrappedFetch(
        params.cacheBusting ? params.url + '?' + new Date().getTime() : params.url,
        {
            method: 'get',// optional, "GET" is default value
            headers: {
                'Accept': 'application/json' // TODO: parameterize
            }
        });

    return wrappedFetch.promise// getting clear promise from wrapped
        .then(function (response) {
            clearTimeout(timeoutFor(fetcher, params));
            return response;
        })
        .then(processStatus)
        .then(parseJson);
};

export {
  getJSON: getJSON,
  getWrappedFetch: getWrappedFetch
}
