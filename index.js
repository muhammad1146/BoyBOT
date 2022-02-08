const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://192.168.10.1/login.html');

  await page.type('[name=username]', 'admin');
  await page.type('[name=password]','reactJS');
  await Promise.all([
    page.waitForNavigation(),
    page.click('.button'),
  ]);
  let frames = await page.frames().find(f=>f.url());
   await  (await frames.childFrames()[1].$('#folder66 .menuLink')).click(); //clicking the wireless link
  // await page.click('.menuCell'),
  await  (await frames.childFrames()[1].$('#item69 .menuLink')).click(); //clicking the mac Filter link

  await frames.waitFor(1000);

  //get List of MAC there are still in the list:


  //document.children[0].children[1].children[1].children[1].getElementsByTagName()
  //document.getElementsByTagName('frame')[2].contentDocument.getElementsByName('wlFltMacMode').valueOf()[2].checked check if checked or not?
  
  
  await page.screenshot({ path: 'screenshot.png' });

  
  await browser.close();
})();
