# Log capturer for Karma

[![npm version](https://badge.fury.io/js/karma-logcapture-reporter.svg)](https://www.npmjs.com/package/karma-logcapture-reporter)

Captures browser logs (ie: `console.log`) during the execution of each test,
appending them only to failed tests.

> **Note**: Using `dump` instead of `console.log` will trigger also the default
  behaviour of writing the message to the terminal.

## Installation

`npm install karma-logcapture-reporter`

## Configuration

> **Important**: *logcapture* **must be the first** configured reporter

This is the minimal configuration needed to enable the capturing.

```js
{
  reporters: ['logcapture', 'progress'],
  client: {
    captureConsole: true
  }
}
```
