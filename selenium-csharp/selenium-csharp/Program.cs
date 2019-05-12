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
            driver.Navigate().GoToUrl("http://google.com");
        }
    }
}
