const puppeteer = require('puppeteer');
async function addNewMac (mac)  {
  mac = mac.trim();
  if(mac.length!=17){
   console.error("Invalid mac address!")
    return false;
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://192.168.10.1/login.html');
  await page.type('[name=username]', 'admin');
  await page.type('[name=password]','reactJS');
  await Promise.all([
    page.waitForNavigation(),
    page.click('.button'),
  ]);

  let frame =  page.frames().find(f=>f.name()==='menufrm');
    await frame.click('#folder66 .menuLink') //clicking the wireless link
    await frame.click('#item69 .menuLink') //clicking the station link
    await frame.waitFor(1000);
let baseFrame =  page.frames().find(f=>f.name()==='basefrm');
    await baseFrame.click('#wlmacfltview9');
    await baseFrame.waitForNavigation()
    await baseFrame.type('[name=wlFltMacAddr]',mac);
    await frame.waitFor(100);
    await baseFrame.click('#wlmacflt4');
    await baseFrame.waitForNavigation()
    await baseFrame.waitFor(60000);
    console.log("process has been completed!");
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
};
module.exports = addNewMac;