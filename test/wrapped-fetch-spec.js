import {getWrappedFetch, getJSON} from '../src/wrapped-fetch';

describe("WrappedFetch", () => {
  it("constructor() correctly wraps fetch", () => {
    var fetchPromise = getWrappedFetch();

    expect(fetchPromise.then).toBeDefined();
  });

  // TODO: ...

  it("should get JSON", () => {
    var url = 'https://api.github.com/users/malyw';
    var onComplete = function () {
        console.log('invoked in any case after success/error');
    };

    getJSON({
        url: url,
        cacheBusting: true
    }).then(function (data) {// on success
        console.log('JSON parsed successfully!');
        console.log(data);
        onComplete(data);
    }, function (error) {// on reject
        console.error('An error occured!');
        console.error(error.message ? error.message : error);
        onComplete(error);
    });
  });
});