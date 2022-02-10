const puppeteer = require('puppeteer');
require('dotenv').config();
const { argv } = require('process');
const getAllUsers  = require('./getAllUser');
const macStatus = require('./macStatus');
const addNewMac = require('./addNewMac');
const disableFilter = require('./disableFilter');
const enableFilter = require('./enableFilter');
let operation = argv[2];
async function start () {
  if(operation===process.env.GETUSERS){ //done
    await getAllUsers();
    process.exit();
  }else if(operation===process.env.PUT){
    console.log(`Putting  ${argv[3]} in mac list...`);
  }else if(operation===process.env.EXPEL){
    console.log(`Expelling ${argv[3]} from list...`)
  }else if(operation===process.env.ADDNEW){ 
    console.log(`adding new mac ${argv[3]} to list`)
    if(!addNewMac(argv[3])) process.exit() 
  }else if(operation===process.env.MACSTATUS){ //done
    macStatus();
    console.log(`checking the mac status of network!`)
  } 
  else if(operation===process.env.OFF){ //done
    disableFilter()
    console.log(`mac filter is getting disabled!!`)
  }
  else if(operation===process.env.ON){ //done
    enableFilter()
    console.log(`mac filter is getting enabled!!`)
  }
  else{
    console.error("invalid command!")
    process.exit();
  }
}
start();
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('http://192.168.10.1/login.html');

//   await page.type('[name=username]', 'admin');
//   await page.type('[name=password]','reactJS');
//   await Promise.all([
//     page.waitForNavigation(),
//     page.click('.button'),
//   ]);
  
//   let frame = await page.frames().find(f=>f.name()==='menufrm');
//      await frame.click('#folder66 .menuLink') //clicking the wireless link
//     //  await frame.click('#item69 .menuLink') //clicking the mac Filter link
//   // await frames.click('#folder66 .menuLink');
//   //  console.log(await frames.childFrames()[1].click('#folder66 .menuLink'));
//   // await page.click('.menuCell')

  // await page.waitFor(1000);

  //get List of MAC there are still in the list:
// let baseFrame =  page.frames().find(f=>f.name()==='basefrm');
// let disabled=   await baseFrame.$$('[name=wlFltMacMode]');
// console.log(await (await disabled[0].getProperty('checked')).jsonValue());
// await frame.click('#item72 .menuLink') //clicking the mac Filter link


// await frame.waitFor(1000);

  //document.children[0].children[1].children[1].children[1].getElementsByTagName()
  //document.getElementsByTagName('frame')[2].contentDocument.getElementsByName('wlFltMacMode').valueOf()[2].checked check if checked or not?

  
//   await page.screenshot({ path: 'screenshot.png' });

  
//   await browser.close();
// })();
