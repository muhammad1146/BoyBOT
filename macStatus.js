const puppeteer = require('puppeteer'); 
const arr = ['Disabled','Allow','Deny']
async function macStatus ()  {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://192.168.10.1/login.html');
  let numberOfUsers = 0;
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
  let radio_list=   await baseFrame.$$('[name=wlFltMacMode]');
  
  let index=-1 
  for(let i=0;i<radio_list.length;i++){
    if(await (await radio_list[i].getProperty('checked')).jsonValue()){
      index=i
    }
  }
  console.log(`The Mac Status is true for "${arr[index]}"`);
  
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
};
module.exports = macStatus;