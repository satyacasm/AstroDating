const puppeteer = require("puppeteer");

async function generateKundli(data) {

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("https://www.astrosage.com/kundli/", {
    waitUntil: "networkidle2"
  });

  // Fill form
  await page.type("#Name", data.name);

  if (data.gender === "male") {
    await page.click("#male");
  } else {
    await page.click("#female");
  }

  await page.type("#Day", data.day);
  await page.type("#Month", data.month);
  await page.type("#Year", data.year);

  await page.type("#Hrs", data.hrs);
  await page.type("#Min", data.min);
  await page.type("#Sec", data.sec);

  await page.type("#place", data.place);

  await page.waitForTimeout(2000);

  await Promise.all([
    page.click("#submit"),
    page.waitForNavigation({ waitUntil: "networkidle2" })
  ]);

  const resultUrl = page.url();

  const html = await page.content();

  await browser.close();

  return {
    resultUrl,
    html
  };
}

module.exports = generateKundli;