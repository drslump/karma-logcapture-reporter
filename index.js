var util = require('util');

var LogCaptureReporter = function (config, baseReporterDecorator, emitter) {

    this.USE_COLORS = !!config.colors;

    baseReporterDecorator(this);

    this.captured = [];

    var origBrowserLog = this.onBrowserLog;
    this.onBrowserLog = function (browser, log, type) {
        if (typeof log !== 'string') {
            log = util.inspect(log, false, null, this.USE_COLORS);
        }

        log = log.replace(/^'(.*)'$/, '$1');

        if (type === 'dump') {
            origBrowserLog.call(this, browser, log, type);
        }

        this.captured.push(
            type.toUpperCase() + ': ' + log
        );
    };

    this.onSpecComplete = function (browser, result) {

        if (!result.success && !result.skipped && this.captured.length) {
            result.log.push(
                '\nCaptured logs:\n  ' + this.captured.join('\n  ')
            );
        }

        this.captured = [];
    };

    // HACK: Override log notification for the other reporters
    var self = this;
    var origBind = emitter.bind;
    emitter.bind = function (obj) {
        if (obj !== self) {
            obj.onBrowserLog = util.noop;
        }
        return origBind.call(this, obj);
    };
};

LogCaptureReporter.$inject = ['config', 'baseReporterDecorator', 'emitter'];

module.exports = {
    'reporter:logcapture' : ['type', LogCaptureReporter]
};