"use strict";

const TelemetryEvents = require("telemetry-events");

module.exports = config =>
{
    it(`exposes "name" and "version" properties`, () =>
        {
            const module = config.construct();
            expect(module.name).toBe(config.package.name);
            expect(module.version).toBe(config.package.version);
        }
    );

    it("configures self as telemetry emitter", done =>
        {
            const module = config.construct();
            expect(module._telemetry instanceof TelemetryEvents).toBeTruthy();
            module.on("telemetry", event =>
                {
                    if (event.msg)
                    {
                        expect(event.msg).toBe("hi o/");
                        done();
                    }
                }
            );
            module.emit("telemetry", { msg: "hi o/" });
        }
    );

    it("configures telemetry logging", done =>
        {
            const module = config.construct();
            module.on("telemetry", event =>
                {
                    if (event.type == "log" && event.level == "info")
                    {
                        expect(event.message).toBe("hi o/");
                    }
                    done();
                }
            );
            module._log("info", "hi o/");
        }
    );

    it("configures telemetry metrics", done =>
        {
            const module = config.construct();
            module.on("telemetry", event =>
                {
                    if (event.type == "metric");
                    {
                        expect(event.name).toBe("latency");
                        expect(event.target_type).toBe("gauge");
                        expect(event.unit).toBe("ms");
                        expect(event.value).toBe(100);
                        done();
                    }
                }
            );
            module._metrics.gauge("latency",
                {
                    unit: "ms",
                    value: 100
                }
            );
        }
    );

    it("configures telemetry tracing", done =>
        {
            const module = config.construct();
            const parentSpan = module._tracing.trace("test", undefined,
                {
                    my: "baggage"
                }
            );
            module.on("telemetry", event =>
                {
                    if (event.type == "trace")
                        {
                            expect(event.name).toBe("test");
                            expect(event.traceId).toBe(parentSpan._traceId);
                            expect(event.baggage).toEqual(
                                {
                                    my: "baggage"
                                }
                            );
                            done();
                        }
                }
            );
            parentSpan.finish();
        }
    );
};
