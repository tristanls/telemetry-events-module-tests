# telemetry-events-module-tests

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

[![NPM version](https://badge.fury.io/js/telemetry-events-module-tests.png)](http://npmjs.org/package/telemetry-events-module-tests)

A bundle of [Jest](https://facebook.github.io/jest/) tests for testing modules using [TelemetryEvents](https://github.com/tristanls/telemetry-events).

## Contributors

[@tristanls](https://github.com/tristanls)

## Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Tests](#tests)
  * [Documentation](#documentation)
  * [Releases](#releases)

## Installation

    npm install telemetry-events-module-tests

## Usage

To run the below example run:

    npm run readme

```javascript
"use strict";

const events = require("events");
const LogTelemetryEvents = require("telemetry-events-log");
const pkg = require("../package.json");
const QuantifyTelemetryEvents = require("telemetry-events-quantify");
const TelemetryEvents = require("telemetry-events");
const TraceTelemetryEvents = require("telemetry-events-trace");
const util = require("util");

const MyModule = function(config = {})
{
    if (!(this instanceof MyModule))
    {
        return new MyModule(config);
    }
    const self = this;
    events.EventEmitter.call(self);
    self.name = pkg.name;
    self.version = pkg.version;

    self._telemetry = new TelemetryEvents(
        {
            package: pkg,
            emitter: self
        }
    );
    self._logs = new LogTelemetryEvents(
        {
            telemetry: self._telemetry
        }
    );
    self._log = self._logs.log;
    self._metrics = new QuantifyTelemetryEvents(
        {
            telemetry: self._telemetry
        }
    );
    self._tracing = new TraceTelemetryEvents(
        {
            telemetry: self._telemetry
        }
    );
};

util.inherits(MyModule, events.EventEmitter);

const telemetryEventsTests = require("../index.js");

telemetryEventsTests(
    {
        construct: () => new MyModule(),
        package: pkg
    }
);

```

## Tests

No tests at this time.

## Documentation

  * [telemetryEventsTests(config)](#telemetryeventstestsconfig)

### telemetryEventsTests(config)

  * `config`: _Object_
    * `construct`: _Function_ Function that should return a correctly instantiated instance of module to be tested.
    * `package`: _Object_ Parsed `package.json` to extract module `name` and `version` from.

Executes tests ensuring that the instantiated module returned by calling `construct` sets up expected telemetry functionality.

## Releases

We follow semantic versioning policy (see: [semver.org](http://semver.org/)):

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
>MAJOR version when you make incompatible API changes,<br/>
>MINOR version when you add functionality in a backwards-compatible manner, and<br/>
>PATCH version when you make backwards-compatible bug fixes.

**caveat**: Major version zero is a special case indicating development version that may make incompatible API changes without incrementing MAJOR version.
