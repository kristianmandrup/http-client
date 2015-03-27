// From: http://blog.gospodarets.com/fetch_in_action/
// For Timeout functionality

/*
USAGE EXAMPLE:

var MAX_WAITING_TIME = 5000;// in ms

var timeoutId = setTimeout(function () {
    wrappedFetch.reject(new Error('Load timeout for resource: ' + params.url));// reject on timeout
}, MAX_WAITING_TIME);

return wrappedFetch.promise// getting clear promise from wrapped
    .then(function (response) {
        clearTimeout(timeoutId);
        return response;
    });
*/

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
export default function () {
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