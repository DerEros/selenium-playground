"use strict";

var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    SeleniumServer = require("selenium-webdriver/remote").SeleniumServer;
require('chromedriver');

describe('Login', function() {

    var loginPage = "https://demo.moodle.net/login/index.php";
    var capabilities = {
        browserName : 'Chrome'
    };

    let driver;

    before(async function() {
        driver = new webdriver.Builder()
            .withCapabilities(capabilities)
            .forBrowser('chrome')
            .build();

    });

    after(() => driver && driver.quit());

    it('should succeed with correct credentials', async function() {
        // without higher timeout Mocha will abort tests that run longer than 2s
        this.timeout(20000);

        await driver.manage().setTimeouts({ implicit: 10000 });
        driver.get(loginPage)
    });

    it('should fail with incorrect credentials', function() {
        //assert.equal(false, true);
    });
});
