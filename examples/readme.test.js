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
