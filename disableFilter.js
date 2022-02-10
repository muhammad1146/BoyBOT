const puppeteer = require('puppeteer'); 
async function disableFilter ()  {
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
if(await (await (await baseFrame.$('[name=wlFltMacMode]')).getProperty('checked')).jsonValue()){
  console.error("the mac filter is already disabled!")
  process.exit()
}
   await baseFrame.click('[name=wlFltMacMode]');
   await baseFrame.waitFor(600);
  
   await page.screenshot({ path: 'screenshot.png' });
   console.log(`The Mac Disabled is getting true`);
   
   await baseFrame.waitFor(6000);
  await browser.close();
};
module.exports = disableFilter;