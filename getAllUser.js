const puppeteer = require('puppeteer');
const array = require('./MacArray');

async function getAllUsers ()  {
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
await frame.click('#item72 .menuLink') //clicking the station link
await frame.waitFor(1000);

let baseFrame =  page.frames().find(f=>f.name()==='basefrm');
  let table = await baseFrame.$$eval('table tr td' , tds=>tds.map(td=>{
    const tr = [...td.getElementsByTagName('td')]
    return td.textContent.trim()}));
    let macs = []
    numberOfUsers = table?.length/5-1
  for(let i=5;i<table.length;i+=5){
    macs.push(table[i]);
  }
  let people = macs.map((item)=>{
    let isFound = false;
    for(let j=0;j<array.length;j++){
      if(array[j].includes(item)){
        isFound=true;
        return array[j]
      }
    }
    if(!isFound){
      console.log('in else')
      return item
    }
  })
  for(let i=0;i<people.length;i++){
    console.log(people[i][0],'\t' ,people[i][1])
  }
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
  return people
};
module.exports = getAllUsers;