const ciInfo = require('ci-info');
const os = require('os');

const chromeHeadlessSupported = os.platform() !== 'win32' || Number((os.release().match(/^(\d+)/) || ['0', '0'])[1]) >= 10;

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-mocha-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false
        },
        coverageReporter: {
            dir: '../coverage/',
            reporters: [
                { type: 'html', subdir: '.' },
                { type: 'text-summary' }
            ]
        },
        reporters: ['mocha', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserNoActivityTimeout: 30000,
        browsers: [
            ciInfo.TRAVIS           ? 'ChromeTravisCi' :
            chromeHeadlessSupported ? 'ChromeHeadless' :
                                      'Chrome'
        ],
        customLaunchers: {
            ChromeTravisCi: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        singleRun: false
    });
};
