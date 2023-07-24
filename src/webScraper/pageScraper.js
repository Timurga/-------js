const aiTextCompression = require("../AI/aiTextCompression");

const scraperObject = {
    url: 'https://3dprint.com/category/3d-printing-materials',
    async scraper(browser) {
        let page = await browser.newPage();

        console.log(`Navigating to ${this.url}...`);

        await page.goto(this.url, { timeout: 0, waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.list-posts');

        console.log('Selector was finded');

        let urls = await page.$$eval('.news__item', links => {
            links = links.map(el => el.querySelector('a').href)
            return links;
        });

        let pagePromise = (link) => new Promise(async (resolve, reject) => {
            let dataObj = {};

            let newPage = await browser.newPage();

            await newPage.goto(link, { timeout: 0, waitUntil: 'domcontentloaded' });

            dataObj['newsTitle'] = await newPage.$eval('.article__title', text => text.textContent);

            if (dataObj['newsTitle'].indexOf('Briefs') !== -1) {
                await newPage.close();

                resolve(null);

                return;
            }

            backgroundImage = await newPage.$eval('.article__img > div', img => img.style.backgroundImage);

            dataObj['imageUrl'] = backgroundImage.match(/url\("(.*)"/)[1];

            dataObj['articleText'] = await newPage.$$eval('.article__wrapper > p', div => {
                div = div.map(el => el.textContent)
                return div;
            });

            resolve(dataObj);

            await newPage.close();
        });

        for (link in urls) {
            for (usedLink in usedUrls) {
                if(urls[link] === usedLink) {
                    console.log('Сообщение уже было отправлено');
                    return 0;
                }
            } 

            let currentPageData = await pagePromise(urls[link]);

            console.log('1');

            await aiTextCompression(currentPageData, urls[link]);
        }
    }
}

module.exports = scraperObject;