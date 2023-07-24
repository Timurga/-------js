const browserObject = require('./webScraper/browser');
const scraperController = require('./webScraper/pageController');
require('dotenv').config({path: '../.env'})

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller

scraperController(browserInstance), 120000;