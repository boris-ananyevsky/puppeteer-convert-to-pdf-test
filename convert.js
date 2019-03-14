const puppeteer = require('puppeteer');
const fs = require('fs');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const html = fs.readFileSync('./test.html').toString();
    await page.setContent(html, {waitUntil: 'networkidle0'});

    const pdfBuffer = await page.pdf({
        printBackground: true,
        format: 'Letter',
    });

    await browser.close();

    const fd = fs.openSync(process.argv[2] || "./result.pdf", 'w+');
    fs.writeSync(fd, pdfBuffer);
})();