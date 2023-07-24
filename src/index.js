const browserObject = require('./webScraper/browser');
const scraperController = require('./webScraper/pageController');
require('dotenv').config({path: '../.env'})

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller

setInterval(() => scraperController(browserInstance), 120000);

setTimeout(() => console.log(Date.UTC(0, 0, 0, 0, 2), 120000));