function b64_sha1(a){return binb2b64(core_sha1(str2binb(a),a.length*chrsz))}function core_sha1(a,e){a[e>>5]|=128<<24-e,a[(e+64>>9<<4)+15]=e;for(var r=Array(80),t=1732584193,n=-271733879,o=-1732584194,s=271733878,i=-1009589776,d=0;d<a.length;d+=16){for(var c=t,l=n,u=o,f=s,m=i,p=0;80>p;p++){16>p?r[p]=a[d+p]:r[p]=rol(r[p-3]^r[p-8]^r[p-14]^r[p-16],1);var h=safe_add(safe_add(rol(t,5),sha1_ft(p,n,o,s)),safe_add(safe_add(i,r[p]),sha1_kt(p)));i=s,s=o,o=rol(n,30),n=t,t=h}t=safe_add(t,c),n=safe_add(n,l),o=safe_add(o,u),s=safe_add(s,f),i=safe_add(i,m)}return Array(t,n,o,s,i)}function sha1_ft(a,e,r,t){return 20>a?e&r|~e&t:40>a?e^r^t:60>a?e&r|e&t|r&t:e^r^t}function sha1_kt(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514}function safe_add(a,e){var r=(65535&a)+(65535&e),t=(a>>16)+(e>>16)+(r>>16);return t<<16|65535&r}function rol(a,e){return a<<e|a>>>32-e}function str2binb(a){for(var e=Array(),r=(1<<chrsz)-1,t=0;t<a.length*chrsz;t+=chrsz)e[t>>5]|=(a.charCodeAt(t/chrsz)&r)<<24-t;return e}function binb2b64(a){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r="",t=0;t<4*a.length;t+=3)for(var n=(a[t>>2]>>8*(3-t%4)&255)<<16|(a[t+1>>2]>>8*(3-(t+1)%4)&255)<<8|a[t+2>>2]>>8*(3-(t+2)%4)&255,o=0;4>o;o++)r+=8*t+6*o>32*a.length?b64pad:e.charAt(n>>6*(3-o)&63);return r}function getInputs(a){var e;if(e=a.getElementsByTagName("input"))for(var r=0;r<e.length;++r)inputArray.push(e[r])}function traverseFrames(a){try{getInputs(a)}catch(e){console.log("ERROR: ",e)}if(a){for(var r=a.getElementsByTagName("frame"),t=0;t<r.length;++t)try{traverseFrames(r[t].contentDocument)}catch(e){console.log("ERROR: ",e)}r=a.getElementsByTagName("iframe");for(var t=0;t<r.length;++t)try{traverseFrames(r[t].contentDocument)}catch(e){console.log("ERROR: ",e)}}}function doIt(){var a="",e=!1,r=!1,t=!1,n=window.location.hostname;if(null!=n)if(sld=n.match(/([^.]+\.([a-z][a-z][a-z]|[a-z][a-z]\.[a-z][a-z]|[a-z][a-z]))$/i))a=sld[0];else try{a=n.match(/([^.]+\.[^.]+\.[a-z][a-z])$/i)[0],window.alert("second match: "+a)}catch(o){a=window.prompt("host not recognized, type in custom domain"),t=!0}else a=window.prompt("host not recognized, type in custom domain"),t=!0;if(DEBUG&&!t){var s=window.prompt("Enter your domain");e=!0,null!=s&&""!=s&&(a=s,t=!0)}for(l=0;l<specialIterations.length;l++)for(u=0;u<specialIterations[l].domains.length;u++)if(-1!=a.indexOf(specialIterations[l].domains[u])){var i="";specialIterations[l].iter>0&&(i=specialIterations[l].iter),a=specialIterations[l].domains[0]+i;var d=specialIterations[l].addOnes}var c,l=0,u=0;traverseFrames(document);var f=!1;for(l=0;l<inputArray.length;l++)r=!1,null!=inputArray[l]&&""!=inputArray[l]&&0!=inputArray[l]&&(D=inputArray[l],"password"==D.type&&(D.value||""!=D.value)&&(c=b64_sha1(D.value+":"+a).substr(0,8)+"1a",d&&(c+="11"),DEBUG&&(r=window.prompt(a,c)),e?r&&(D.value=c,D.focus(),D.style.background="#FF69B4",f=!0):(D.value=c,D.focus(),D.style.background="#FF69B4",f=!0)),"text"==D.type&&(D.value||""!=D.value)&&(-1!=D.name.toUpperCase().indexOf("PASSWORD")||-1!=D.name.toUpperCase().indexOf("PASSWD"))&&(c=b64_sha1(D.value+":"+a).substr(0,8)+"1a",d&&(c+="11"),DEBUG&&(r=window.prompt(a,c)),e?r&&(D.value=c,D.focus(),D.style.background="#FF69B4",f=!0):(D.value=c,D.focus(),D.style.background="#FF69B4",f=!0)));if(0==f){var m=window.prompt("enter pw in clear");m&&(c=b64_sha1(m+":"+a).substr(0,8)+"1a",d&&(c+="11"),window.prompt(a,c))}}var b64pad="",DEBUG=!0,chrsz=8,inputArray=new Array,specialIterations=[{domains:["fh-wels.at","fh-ooe.at","fhooe.at"],iter:6,addOnes:!0},{domains:["cardcomplete.com"],iter:1,addOnes:!0},{domains:["google.com","google"],iter:2,addOnes:!1},{domains:["ebay"],iter:1,addOnes:!1},{domains:["evernote.com"],iter:1,addOnes:!1},{domains:["miles-and-more.com","worldshop.eu"],iter:0,addOnes:!1}];doIt();