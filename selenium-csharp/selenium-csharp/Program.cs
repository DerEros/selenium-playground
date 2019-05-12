using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace selenium_csharp
{
    class Program
    {
        static void Main(string[] args)
        {
            ChromeDriverService service = ChromeDriverService.CreateDefaultService(@"lib", "chromedriver");
            IWebDriver driver = new ChromeDriver(service);

            // set driver to wait for every page to load, before continuing
	    driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            driver.Navigate().GoToUrl("https://demo.moodle.net/login/index.php");
	    IWebElement loginBox = driver.FindElement(By.Id("username"));
	    IWebElement passwordBox = driver.FindElement(By.Id("password"));
	    IWebElement submitButton = driver.FindElement(By.Id("loginbtn"));

	    loginBox.SendKeys("admin");
	    passwordBox.SendKeys("sandbox");
	    submitButton.Click();

	    IWebElement userText = driver.FindElement(By.ClassName("usertext"));
	    String username = userText.Text;

	    if (username.Equals("Admin User")) {
		    System.Console.WriteLine("Test passed!");
	    } else {
		    System.Console.WriteLine("Test failed!");
	    }
        }
    }
}
