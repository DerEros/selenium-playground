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

        driver.manage().setTimeouts({ implicit: 10000 });
    });

    after(() => driver && driver.quit());

    async function executeLogin(username, password) {
        let userField = await driver.findElement(By.id("username"));
        let passwordField = await driver.findElement(By.id("password"));
        let submitButton = await driver.findElement(By.id("loginbtn"));

        await userField.sendKeys(username);
        await passwordField.sendKeys(password);
        await submitButton.click();
    }

    async function logout() {
        let userLink = await driver.findElement(By.id("dropdown-1"));
        await userLink.click();

        let logoutLink = await driver.findElement(By.id("actionmenuaction-6"));
        await logoutLink.click();
    }

    it('should succeed with correct credentials', async function() {
        // without higher timeout Mocha will abort tests that run longer than 2s
        this.timeout(20000);

        await driver.get(loginPage)
        await executeLogin("admin", "sandbox");

        await driver.wait(until.elementLocated(By.className("usertext")));
        let username = await driver.findElement(By.className("usertext")).getText();

        await logout();

        assert.equal("Admin User", username);
    });

    it('should fail with incorrect credentials', async function() {
        this.timeout(20000);

        await driver.get(loginPage);
        await executeLogin("foo", "bar");

        await driver.wait(until.elementLocated(By.className("alert-danger")));
        let errorMessage = await driver.findElement(By.className("alert-danger")).getText();

        assert.equal("Invalid login, please try again", errorMessage);
    });
});
