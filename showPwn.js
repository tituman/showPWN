javascript:var b64pad='';var DEBUG=true;var chrsz=8;var inputArray=new Array();var specialIterations=[{domains:['fh-wels.at','fh-ooe.at','fhooe.at'],iter:9,addOnes:true},{domains:['cardcomplete.com'],iter:1,addOnes:true},{domains:['google.com','google'],iter:2,addOnes:false},{domains:['ebay'],iter:1,addOnes:false},{domains:['evernote.com'],iter:1,addOnes:false},{domains:['pearl.de','pearl.at'],iter:0,addOnes:false},{domains:['miles-and-more.com','worldshop.eu'],iter:0,addOnes:false},{domains:['shroomery'],iter:0,addOnes:false},{domains:['pinterest'],iter:0,addOnes:false},{domains:['live'],iter:1,addOnes:false}];function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length*chrsz));}
function core_sha1(x,len){x[len>>5]|=0x80<<(24-len);x[((len+64>>9)<<4)+15]=len;var w=Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16)w[j]=x[i+j];else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);var t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t;}
a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde);}
return Array(a,b,c,d,e);}
function sha1_ft(t,b,c,d){if(t<20)return(b&c)|((~b)&d);if(t<40)return b^c^d;if(t<60)return(b&c)|(b&d)|(c&d);return b^c^d;}
function sha1_kt(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}
function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
function rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}
function str2binb(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(24-i);return bin;}
function binb2b64(binarray){var tab='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';var str='';for(var i=0;i<binarray.length*4;i+=3){var triplet=(((binarray[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(var j=0;j<4;j++){if(i*8+j*6>binarray.length*32)str+=b64pad;else str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}
return str;}
function getInputs(document){var myInputs;if(myInputs=document.getElementsByTagName('input')){for(var i=0;i<myInputs.length;++i){inputArray.push(myInputs[i]);}}}
function traverseFrames(document){try{getInputs(document);}catch(e){console.log('ERROR: ',e);};if(document){var fs=document.getElementsByTagName('frame');for(var i=0;i<fs.length;++i){try{traverseFrames(fs[i].contentDocument);}catch(e){console.log('ERROR: ',e);};}
fs=document.getElementsByTagName('iframe');for(var i=0;i<fs.length;++i){try{traverseFrames(fs[i].contentDocument);}catch(e){console.log('ERROR: ',e);};}}}
function doIt(){var domain='';var flagShow=false;var flagWritePWN=false;var flagTypeInDomain=false;var host1=window.location.hostname;if(host1!=null){if(sld=host1.match(/([^.]+\.([a-z][a-z][a-z]|[a-z][a-z]\.[a-z][a-z]|[a-z][a-z]))$/i)){domain=sld[0];}else{try{domain=host1.match(/([^.]+\.[^.]+\.[a-z][a-z])$/i)[0];window.alert('second match: '+domain);}catch(err){domain=window.prompt('host not recognized, type in custom domain');flagTypeInDomain=true;}}}else{domain=window.prompt('host not recognized, type in custom domain');flagTypeInDomain=true;}
if(DEBUG){if(!flagTypeInDomain){var Domain=window.prompt('Enter your domain');flagShow=true;if(Domain!=null&&Domain!=''){domain=Domain;flagTypeInDomain=true;}}}
for(i=0;i<specialIterations.length;i++){for(j=0;j<specialIterations[i].domains.length;j++){if((domain.indexOf(specialIterations[i].domains[j])!=-1)){var iter='';if(specialIterations[i].iter>0){iter=specialIterations[i].iter;}
domain=specialIterations[i].domains[0]+iter;var addOnes=specialIterations[i].addOnes;}}}
var p;var i=0,j=0;traverseFrames(document);var wrotePWAtLeastOnce=false;var wrotePWAtLeastOnceSecondChance=false;for(i=0;i<inputArray.length;i++){flagWritePWN=false;if(inputArray[i]==null||inputArray[i]==''||inputArray[i]==0){continue;}
D=inputArray[i];if(D.type=='password'){if(D.value||D.value!=''){p=b64_sha1(D.value+':'+domain).substr(0,8)+'1a';if(addOnes){p=p+'11';}
if(DEBUG){flagWritePWN=window.prompt(domain,p);}
if(flagShow){if(flagWritePWN){D.value=p;D.focus();D.style.background='#FF69B4';wrotePWAtLeastOnce=true;}}else{D.value=p;D.focus();D.style.background='#FF69B4';wrotePWAtLeastOnce=true;}}}
if(D.type=='text'){if(D.value||D.value!=''){if(D.name.toUpperCase().indexOf('PASSWORD')!=-1||D.name.toUpperCase().indexOf('PASSWD')!=-1){p=b64_sha1(D.value+':'+domain).substr(0,8)+'1a';if(addOnes){p=p+'11';}
if(DEBUG){flagWritePWN=window.prompt(domain,p);}
if(flagShow){if(flagWritePWN){D.value=p;D.focus();D.style.background='#FF69B4';wrotePWAtLeastOnce=true;}}else{D.value=p;D.focus();D.style.background='#FF69B4';wrotePWAtLeastOnce=true;}}}}}
if(wrotePWAtLeastOnce==false){var pwClear=window.prompt('enter pw in clear');if(pwClear){p=b64_sha1(pwClear+':'+domain).substr(0,8)+'1a';if(addOnes){p=p+'11';}
window.prompt(domain,p);}}}
doIt();void(null);