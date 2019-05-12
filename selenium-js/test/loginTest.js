"use strict";

var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    SeleniumServer = require("selenium-webdriver/remote").SeleniumServer,
    By = webdriver.By,
    until = webdriver.until;
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

        driver.manage().setTimeouts({ implicit: 10000 });
        await driver.get(loginPage)

        let userField = await driver.findElement(By.id("username"));
        let passwordField = await driver.findElement(By.id("password"));
        let submitButton = await driver.findElement(By.id("loginbtn"));

        await userField.sendKeys("admin");
        await passwordField.sendKeys("sandbox");
        await submitButton.click();


        await driver.wait(until.elementLocated(By.className("usertext")));
        let username = await driver.findElement(By.className("usertext")).getText();

        assert.equal("Admin Userr", username);
    });

    it('should fail with incorrect credentials', function() {
        this.timeout(20000);
        //assert.equal(false, true);
    });
});
