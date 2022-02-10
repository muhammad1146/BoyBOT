const puppeteer = require('puppeteer'); 
async function enableFilter ()  {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://192.168.10.1/login.html');
  await page.type('[name=username]', 'admin');
  await page.type('[name=password]','reactJS');
  await Promise.all([
    page.waitForNavigation(),
    page.click('.button'),
  ]);
  
  let frame = await page.frames().find(f=>f.name()==='menufrm');
    await frame.click('#folder66 .menuLink') //clicking the wireless link
    await frame.click('#item69 .menuLink') //clicking the station link  
    await frame.waitFor(1000);
let baseFrame =  page.frames().find(f=>f.name()==='basefrm');
let radio_lists = await baseFrame.$$('[name=wlFltMacMode]')
if(await (await radio_lists[1].getProperty('checked')).jsonValue()){
  console.error("mac filter is already enabled")
  process.exit();
}
await radio_lists[1].click();
await baseFrame.waitFor(1500);

  //  await baseFrame.click('[name=wlFltMacMode]');
  
  
   await page.screenshot({ path: 'screenshot.png' });
   
   await baseFrame.waitFor(6000);
  await browser.close();
};
module.exports = enableFilter;