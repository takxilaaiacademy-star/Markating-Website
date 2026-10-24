const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1125,height:330},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/'+process.argv[2]+'.html',{waitUntil:'networkidle'});await p.screenshot({path:__dirname+'/'+process.argv[2]+'.png'});await b.close();})();
