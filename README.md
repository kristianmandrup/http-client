# aurelia-http-fetch-client

This library is part of the [Aurelia](http://www.aurelia.io/) platform and contains a simple, restful, message-based wrapper around Fetch API.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to join us on [![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge).

## Polyfills

* Depending on target browser(s), [core-js](https://github.com/zloirock/core-js) may be required for `Promise` support.

## Dependencies

* [aurelia-path](https://github.com/aurelia/path)
* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)

## Fetch API

Initial rework by @kristianmandrup

Useful links

- [introduction to fetch](http://updates.html5rocks.com/2015/03/introduction-to-fetch)
- [fetch in action](http://blog.gospodarets.com/fetch_in_action)

Outstanding issues:

- Do we still JSONP with fetch API!?
- Use `getWrappedFetch` for enabling *TimeOut* (see example in [fetch in action](http://blog.gospodarets.com/fetch_in_action) and `src/wrapped-fetch.js` file)
- More rework of test suite ;)

## Used By

This library is used directly by applications only.

## Platform Support

This library can be used in the **browser** only.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

  ```shell
  npm install -g jspm
  ```
3. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```

4. You can now run the tests with this command:

  ```shell
  karma start
  ```
