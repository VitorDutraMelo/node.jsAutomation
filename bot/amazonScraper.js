const puppeteer = require('puppeteer');

async function scrapeAmazonProduct(url) {
  try {
    const browser = await puppeteer.launch({
      headless: false, // 🔥 IMPORTANTE (simula humano)
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
    );

    await page.goto(url, {
      waitUntil: 'networkidle2'
    });

    // ⏳ ESPERA REAL (simula humano)
    await new Promise(r => setTimeout(r, 5000));

    const product = await page.evaluate(() => {
      const title = document.querySelector('#productTitle')?.innerText;
      const image = document.querySelector('#landingImage')?.src;
      const price =
        document.querySelector('.a-price .a-offscreen')?.innerText;

      return { title, image, price };
    });

    await browser.close();

    return {
      ...product,
      link: url
    };
  } catch (error) {
    console.error('❌ Scraping erro real:', error.message);
    return null;
  }
}

module.exports = { scrapeAmazonProduct };