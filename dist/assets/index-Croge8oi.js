(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(e||={});var t=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},n=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,r=r=>{let i=r.CapacitorCustomPlatform||null,a=r.Capacitor||{},o=a.Plugins=a.Plugins||{},s=()=>i===null?n(r):i.name,c=()=>s()!==`web`,l=e=>!!(f.get(e)?.platforms.has(s())||u(e)),u=e=>a.PluginHeaders?.find(t=>t.name===e),d=e=>r.console.error(e),f=new Map;return a.convertFileSrc||=e=>e,a.getPlatform=s,a.handleError=d,a.isNativePlatform=c,a.isPluginAvailable=l,a.registerPlugin=(n,r={})=>{let c=f.get(n);if(c)return console.warn(`Capacitor plugin "${n}" already registered. Cannot register plugins twice.`),c.proxy;let l=s(),d=u(n),p,m=async()=>(!p&&l in r?p=p=typeof r[l]==`function`?await r[l]():r[l]:i!==null&&!p&&`web`in r&&(p=p=typeof r.web==`function`?await r.web():r.web),p),h=(r,i)=>{if(d){let e=d?.methods.find(e=>i===e.name);if(e)return e.rtype===`promise`?e=>a.nativePromise(n,i.toString(),e):(e,t)=>a.nativeCallback(n,i.toString(),e,t);if(r)return r[i]?.bind(r)}else if(r)return r[i]?.bind(r);else throw new t(`"${n}" plugin is not implemented on ${l}`,e.Unimplemented)},g=r=>{let i,a=(...a)=>{let o=m().then(o=>{let s=h(o,r);if(s){let e=s(...a);return i=e?.remove,e}throw new t(`"${n}.${r}()" is not implemented on ${l}`,e.Unimplemented)});return r===`addListener`&&(o.remove=async()=>i()),o};return a.toString=()=>`${r.toString()}() { [capacitor code] }`,Object.defineProperty(a,"name",{value:r,writable:!1,configurable:!1}),a},_=g(`addListener`),v=g(`removeListener`),y=(e,t)=>{let n=_({eventName:e},t),r=async()=>{let r=await n;v({eventName:e,callbackId:r},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},b=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return d?y:_;case`removeListener`:return v;default:return g(t)}}});return o[n]=b,f.set(n,{name:n,proxy:b,platforms:new Set([...Object.keys(r),...d?[l]:[]])}),b},a.Exception=t,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},i=(e=>e.Capacitor=r(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),a=i.registerPlugin,o=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(t=`not implemented`){return new i.Exception(t,e.Unimplemented)}unavailable(t=`not available`){return new i.Exception(t,e.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},s=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),c=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),l=class extends o{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=c(n).trim(),r=c(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=s(e.key),n=s(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};a(`CapacitorCookies`,{web:()=>new l});var u=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),d=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},f=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,p=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=d(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},m=class extends o{async request(e){let t=p(e,e.webFetchExtra),n=f(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await u(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};a(`CapacitorHttp`,{web:()=>new m});var h;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(h||={});var g;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(g||={});var _=class extends o{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};a(`SystemBars`,{web:()=>new _});var v;(function(e){e.Heavy=`HEAVY`,e.Medium=`MEDIUM`,e.Light=`LIGHT`})(v||={});var y;(function(e){e.Success=`SUCCESS`,e.Warning=`WARNING`,e.Error=`ERROR`})(y||={});var b=`modulepreload`,x=function(e,t){return new URL(e,t).href},S={},C=function(e){return e.pathname.endsWith(`.css`)},w=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},T=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=x(t,n);let r=s(t),i=C(r);return w(S,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:b,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},E=a(`Haptics`,{web:()=>T(()=>import(`./web-DU7Kg7Ub.js`).then(e=>new e.HapticsWeb),[],import.meta.url)}),D=a(`App`,{web:()=>T(()=>import(`./web-JvQckyyu.js`).then(e=>new e.AppWeb),[],import.meta.url)}),O=a(`Preferences`,{web:()=>T(()=>import(`./web-D9jBWmGc.js`).then(e=>new e.PreferencesWeb),[],import.meta.url)}),k;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(k||={});var A;(function(e){e.None=`NONE`,e.Slide=`SLIDE`,e.Fade=`FADE`})(A||={});var j=a(`StatusBar`),M=a(`SplashScreen`,{web:()=>T(()=>import(`./web-aeGo2om0.js`).then(e=>new e.SplashScreenWeb),[],import.meta.url)}),N=a(`KeepAwake`,{web:()=>T(()=>import(`./web-B41yRnfE.js`).then(e=>new e.KeepAwakeWeb),[],import.meta.url)}),ee=a(`InAppReview`,{web:()=>T(()=>import(`./web-CEUAhQ9w.js`).then(e=>new e.InAppReviewWeb),[],import.meta.url)}),te=a(`Browser`,{web:()=>T(()=>import(`./web-Alpkc7s8.js`).then(e=>new e.BrowserWeb),[],import.meta.url)}),P=i.isNativePlatform(),ne=()=>typeof matchMedia==`function`&&matchMedia(`(prefers-reduced-motion: reduce)`).matches;i.getPlatform();var re=!0,ie=new Map,ae=(e,t)=>{let n=performance.now();return n-(ie.get(e)??-1e9)<t?!1:(ie.set(e,n),!0)},oe=e=>{try{navigator.vibrate?.(e)}catch{}},F={set enabled(e){re=e},get enabled(){return re},tick(){re&&ae(`tick`,45)&&(P?E.selectionChanged().catch(()=>void 0):oe(6))},light(){re&&ae(`light`,40)&&(P?E.impact({style:v.Light}).catch(()=>void 0):oe(10))},medium(){re&&ae(`medium`,60)&&(P?E.impact({style:v.Medium}).catch(()=>void 0):oe(18))},heavy(){re&&ae(`heavy`,80)&&(P?E.impact({style:v.Heavy}).catch(()=>void 0):oe(32))},success(){re&&ae(`success`,300)&&(P?E.notification({type:y.Success}).catch(()=>void 0):oe([12,60,18]))},warning(){re&&ae(`warning`,300)&&(P?E.notification({type:y.Warning}).catch(()=>void 0):oe([20,50,20]))},error(){re&&ae(`error`,300)&&(P?E.notification({type:y.Error}).catch(()=>void 0):oe([40,40,60]))}},se={async get(e){try{return P?(await O.get({key:e})).value:localStorage.getItem(e)}catch{return null}},async set(e,t){try{P?await O.set({key:e,value:t}):localStorage.setItem(e,t)}catch{}}},ce=async()=>{if(P)try{await j.setStyle({style:k.Dark}),await j.hide()}catch{}},le=()=>{P&&M.hide({fadeOutDuration:250}).catch(()=>void 0)},ue=e=>{P&&(e?N.keepAwake():N.allowSleep()).catch(()=>void 0)},I=e=>{document.addEventListener(`visibilitychange`,()=>document.hidden?e.pause():e.resume()),P&&(D.addListener(`appStateChange`,({isActive:t})=>t?e.resume():e.pause()),D.addListener(`backButton`,()=>e.back()))},de=()=>{P&&ee.requestReview().catch(()=>void 0)},fe=e=>{P?te.open({url:e,presentationStyle:`popover`,toolbarColor:`#0b0c0f`}).catch(()=>window.open(e,`_blank`)):window.open(e,`_blank`)},pe=()=>{P&&D.exitApp()},me=1e3,he=1001,ge=1002,_e=1003,ve=1004,ye=1005,be=1006,L=1007,xe=1008,Se=1009,Ce=1010,we=1011,Te=1012,Ee=1013,De=1014,R=1015,Oe=1016,ke=1017,Ae=1018,je=1020,Me=35902,z=35899,Ne=1021,Pe=1022,Fe=1023,Ie=1026,Le=1027,Re=1028,ze=1029,Be=1030,Ve=1031,He=1033,Ue=33776,We=33777,Ge=33778,Ke=33779,qe=35840,Je=35841,Ye=35842,Xe=35843,Ze=36196,Qe=37492,$e=37496,et=37488,tt=37489,nt=37490,rt=37491,it=37808,at=37809,ot=37810,st=37811,ct=37812,lt=37813,ut=37814,dt=37815,ft=37816,pt=37817,mt=37818,ht=37819,gt=37820,_t=37821,vt=36492,yt=36494,bt=36495,xt=36283,St=36284,Ct=36285,wt=36286,Tt=2300,Et=2301,Dt=2302,Ot=2303,kt=2400,At=2401,jt=2402,Mt=3200,Nt=`srgb`,Pt=`srgb-linear`,Ft=`linear`,It=`srgb`,Lt=7680,Rt=35044,zt=2e3;function Bt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Vt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ht(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ut(){let e=Ht(`canvas`);return e.style.display=`block`,e}var Wt={};function Gt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Kt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function B(...e){e=Kt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function V(...e){e=Kt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function qt(...e){let t=e.join(` `);t in Wt||(Wt[t]=!0,B(...e))}function Jt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Yt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Xt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Zt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Qt=Math.PI/180,$t=180/Math.PI;function en(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Zt[e&255]+Zt[e>>8&255]+Zt[e>>16&255]+Zt[e>>24&255]+`-`+Zt[t&255]+Zt[t>>8&255]+`-`+Zt[t>>16&15|64]+Zt[t>>24&255]+`-`+Zt[n&63|128]+Zt[n>>8&255]+`-`+Zt[n>>16&255]+Zt[n>>24&255]+Zt[r&255]+Zt[r>>8&255]+Zt[r>>16&255]+Zt[r>>24&255]).toLowerCase()}function tn(e,t,n){return Math.max(t,Math.min(n,e))}function nn(e,t){return(e%t+t)%t}function rn(e,t,n){return(1-n)*e+n*t}function an(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function on(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var H=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tn(this.x,e.x,t.x),this.y=tn(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tn(this.x,e,t),this.y=tn(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tn(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},sn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:B(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ln.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ln.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tn(this.x,e.x,t.x),this.y=tn(this.y,e.y,t.y),this.z=tn(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tn(this.x,e,t),this.y=tn(this.y,e,t),this.z=tn(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tn(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return cn.copy(this).projectOnVector(e),this.sub(cn)}reflect(e){return this.sub(cn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},cn=new U,ln=new sn,un=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return qt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(dn.makeScale(e,t)),this}rotate(e){return qt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(dn.makeRotation(-e)),this}translate(e,t){return qt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(dn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},dn=new un,fn=new un().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pn=new un().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mn(){let e={enabled:!0,workingColorSpace:Pt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=gn(e.r),e.g=gn(e.g),e.b=gn(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=_n(e.r),e.g=_n(e.g),e.b=_n(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ft:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return qt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return qt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Pt]:{primaries:t,whitePoint:r,transfer:Ft,toXYZ:fn,fromXYZ:pn,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:t,whitePoint:r,transfer:It,toXYZ:fn,fromXYZ:pn,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),e}var hn=mn();function gn(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function _n(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var vn,yn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vn===void 0&&(vn=Ht(`canvas`)),vn.width=e.width,vn.height=e.height;let t=vn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=vn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ht(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=gn(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(gn(t[e]/255)*255):t[e]=gn(t[e]);return{data:t,width:e.width,height:e.height}}return B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},bn=0,xn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:bn++}),this.uuid=en(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Sn(r[t].image)):e.push(Sn(r[t]))}else e=Sn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Sn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?yn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(B(`Texture: Unable to serialize Texture.`),{})}var Cn=0,wn=new U,Tn=class e extends Xt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=he,i=he,a=be,o=xe,s=Fe,c=Se,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cn++}),this.uuid=en(),this.name=``,this.source=new xn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new un,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wn).x}get height(){return this.source.getSize(wn).y}get depth(){return this.source.getSize(wn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){B(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?B(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case me:e.x-=Math.floor(e.x);break;case he:e.x=e.x<0?0:1;break;case ge:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case me:e.y-=Math.floor(e.y);break;case he:e.y=e.y<0?0:1;break;case ge:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Tn.DEFAULT_IMAGE=null,Tn.DEFAULT_MAPPING=300,Tn.DEFAULT_ANISOTROPY=1;var En=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tn(this.x,e.x,t.x),this.y=tn(this.y,e.y,t.y),this.z=tn(this.z,e.z,t.z),this.w=tn(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tn(this.x,e,t),this.y=tn(this.y,e,t),this.z=tn(this.z,e,t),this.w=tn(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tn(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Dn=class extends Xt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:be,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new En(0,0,e,t),this.scissorTest=!1,this.viewport=new En(0,0,e,t),this.textures=[];let r=new Tn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:be,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new xn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},On=class extends Dn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},kn=class extends Tn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=_e,this.minFilter=_e,this.wrapR=he,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},An=class extends Tn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=_e,this.minFilter=_e,this.wrapR=he,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},jn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Mn.setFromMatrixColumn(e,0).length(),i=1/Mn.setFromMatrixColumn(e,1).length(),a=1/Mn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Pn,e,Fn)}lookAt(e,t,n){let r=this.elements;return Rn.subVectors(e,t),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),In.crossVectors(n,Rn),In.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),In.crossVectors(n,Rn)),In.normalize(),Ln.crossVectors(Rn,In),r[0]=In.x,r[4]=Ln.x,r[8]=Rn.x,r[1]=In.y,r[5]=Ln.y,r[9]=Rn.y,r[2]=In.z,r[6]=Ln.z,r[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],te=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*M+c*P,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*M+f*P,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*M+g*P,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*M+b*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Mn.set(r[0],r[1],r[2]).length(),o=Mn.set(r[4],r[5],r[6]).length(),s=Mn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Nn.copy(this);let c=1/a,l=1/o,u=1/s;return Nn.elements[0]*=c,Nn.elements[1]*=c,Nn.elements[2]*=c,Nn.elements[4]*=l,Nn.elements[5]*=l,Nn.elements[6]*=l,Nn.elements[8]*=u,Nn.elements[9]*=u,Nn.elements[10]*=u,t.setFromRotationMatrix(Nn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=zt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=zt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Mn=new U,Nn=new jn,Pn=new U(0,0,0),Fn=new U(1,1,1),In=new U,Ln=new U,Rn=new U,zn=new jn,Bn=new sn,Vn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-tn(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(tn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-tn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(tn(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:B(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bn.setFromEuler(this),this.setFromQuaternion(Bn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vn.DEFAULT_ORDER=`XYZ`;var Hn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Un=0,Wn=new U,Gn=new sn,Kn=new jn,qn=new U,Jn=new U,Yn=new U,Xn=new sn,Zn=new U(1,0,0),Qn=new U(0,1,0),$n=new U(0,0,1),er={type:`added`},tr={type:`removed`},nr={type:`childadded`,child:null},rr={type:`childremoved`,child:null},ir=class e extends Xt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Un++}),this.uuid=en(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new Vn,r=new sn,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new jn},normalMatrix:{value:new un}}),this.matrix=new jn,this.matrixWorld=new jn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gn.setFromAxisAngle(e,t),this.quaternion.multiply(Gn),this}rotateOnWorldAxis(e,t){return Gn.setFromAxisAngle(e,t),this.quaternion.premultiply(Gn),this}rotateX(e){return this.rotateOnAxis(Zn,e)}rotateY(e){return this.rotateOnAxis(Qn,e)}rotateZ(e){return this.rotateOnAxis($n,e)}translateOnAxis(e,t){return Wn.copy(e).applyQuaternion(this.quaternion),this.position.add(Wn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zn,e)}translateY(e){return this.translateOnAxis(Qn,e)}translateZ(e){return this.translateOnAxis($n,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?qn.copy(e):qn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Jn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Jn,qn,this.up):Kn.lookAt(qn,Jn,this.up),this.quaternion.setFromRotationMatrix(Kn),r&&(Kn.extractRotation(r.matrixWorld),Gn.setFromRotationMatrix(Kn),this.quaternion.premultiply(Gn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(V(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(er),nr.child=e,this.dispatchEvent(nr),nr.child=null):V(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tr),rr.child=e,this.dispatchEvent(rr),rr.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(er),nr.child=e,this.dispatchEvent(nr),nr.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jn,e,Yn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jn,Xn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};ir.DEFAULT_UP=new U(0,1,0),ir.DEFAULT_MATRIX_AUTO_UPDATE=!0,ir.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ar=class extends ir{constructor(){super(),this.isGroup=!0,this.type=`Group`}},or={type:`move`},sr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ar,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ar,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ar,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(or)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ar;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},cr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},lr={h:0,s:0,l:0},ur={h:0,s:0,l:0};function dr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var W=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,hn.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=hn.workingColorSpace){return this.r=e,this.g=t,this.b=n,hn.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=hn.workingColorSpace){if(e=nn(e,1),t=tn(t,0,1),n=tn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=dr(i,r,e+1/3),this.g=dr(i,r,e),this.b=dr(i,r,e-1/3)}return hn.colorSpaceToWorking(this,r),this}setStyle(e,t=Nt){function n(t){t!==void 0&&parseFloat(t)<1&&B(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:B(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);B(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=cr[e.toLowerCase()];return n===void 0?B(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gn(e.r),this.g=gn(e.g),this.b=gn(e.b),this}copyLinearToSRGB(e){return this.r=_n(e.r),this.g=_n(e.g),this.b=_n(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return hn.workingToColorSpace(fr.copy(this),e),Math.round(tn(fr.r*255,0,255))*65536+Math.round(tn(fr.g*255,0,255))*256+Math.round(tn(fr.b*255,0,255))}getHexString(e=Nt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=hn.workingColorSpace){hn.workingToColorSpace(fr.copy(this),t);let n=fr.r,r=fr.g,i=fr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=hn.workingColorSpace){return hn.workingToColorSpace(fr.copy(this),t),e.r=fr.r,e.g=fr.g,e.b=fr.b,e}getStyle(e=Nt){hn.workingToColorSpace(fr.copy(this),e);let t=fr.r,n=fr.g,r=fr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(lr),this.setHSL(lr.h+e,lr.s+t,lr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(lr),e.getHSL(ur);let n=rn(lr.h,ur.h,t),r=rn(lr.s,ur.s,t),i=rn(lr.l,ur.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},fr=new W;W.NAMES=cr;var pr=class extends ir{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},mr=new U,hr=new U,gr=new U,_r=new U,vr=new U,yr=new U,br=new U,xr=new U,Sr=new U,Cr=new U,wr=new En,Tr=new En,Er=new En,Dr=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),mr.subVectors(e,t),r.cross(mr);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){mr.subVectors(r,t),hr.subVectors(n,t),gr.subVectors(e,t);let a=mr.dot(mr),o=mr.dot(hr),s=mr.dot(gr),c=hr.dot(hr),l=hr.dot(gr),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,_r)!==null&&_r.x>=0&&_r.y>=0&&_r.x+_r.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,_r)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,_r.x),s.addScaledVector(a,_r.y),s.addScaledVector(o,_r.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return wr.setScalar(0),Tr.setScalar(0),Er.setScalar(0),wr.fromBufferAttribute(e,t),Tr.fromBufferAttribute(e,n),Er.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(wr,i.x),a.addScaledVector(Tr,i.y),a.addScaledVector(Er,i.z),a}static isFrontFacing(e,t,n,r){return mr.subVectors(n,t),hr.subVectors(e,t),mr.cross(hr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mr.subVectors(this.c,this.b),hr.subVectors(this.a,this.b),mr.cross(hr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;vr.subVectors(r,n),yr.subVectors(i,n),xr.subVectors(e,n);let s=vr.dot(xr),c=yr.dot(xr);if(s<=0&&c<=0)return t.copy(n);Sr.subVectors(e,r);let l=vr.dot(Sr),u=yr.dot(Sr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(vr,a);Cr.subVectors(e,i);let f=vr.dot(Cr),p=yr.dot(Cr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(yr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return br.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(br,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(vr,a).addScaledVector(yr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Or=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ar.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ar.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ar.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Ar):Ar.fromBufferAttribute(r,t),Ar.applyMatrix4(e.matrixWorld),this.expandByPoint(Ar);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),jr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),jr.copy(e.boundingBox)),jr.applyMatrix4(e.matrixWorld),this.union(jr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ar),Ar.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rr),zr.subVectors(this.max,Rr),Mr.subVectors(e.a,Rr),Nr.subVectors(e.b,Rr),Pr.subVectors(e.c,Rr),Fr.subVectors(Nr,Mr),Ir.subVectors(Pr,Nr),Lr.subVectors(Mr,Pr);let t=[0,-Fr.z,Fr.y,0,-Ir.z,Ir.y,0,-Lr.z,Lr.y,Fr.z,0,-Fr.x,Ir.z,0,-Ir.x,Lr.z,0,-Lr.x,-Fr.y,Fr.x,0,-Ir.y,Ir.x,0,-Lr.y,Lr.x,0];return!Hr(t,Mr,Nr,Pr,zr)||(t=[1,0,0,0,1,0,0,0,1],!Hr(t,Mr,Nr,Pr,zr))?!1:(Br.crossVectors(Fr,Ir),t=[Br.x,Br.y,Br.z],Hr(t,Mr,Nr,Pr,zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ar).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ar).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(kr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},kr=[new U,new U,new U,new U,new U,new U,new U,new U],Ar=new U,jr=new Or,Mr=new U,Nr=new U,Pr=new U,Fr=new U,Ir=new U,Lr=new U,Rr=new U,zr=new U,Br=new U,Vr=new U;function Hr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Vr.fromArray(e,a);let o=i.x*Math.abs(Vr.x)+i.y*Math.abs(Vr.y)+i.z*Math.abs(Vr.z),s=t.dot(Vr),c=n.dot(Vr),l=r.dot(Vr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Ur=new U,Wr=new H,Gr=0,G=class extends Xt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Rt,this.updateRanges=[],this.gpuType=R,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wr.fromBufferAttribute(this,t),Wr.applyMatrix3(e),this.setXY(t,Wr.x,Wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ur.fromBufferAttribute(this,t),Ur.applyMatrix3(e),this.setXYZ(t,Ur.x,Ur.y,Ur.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ur.fromBufferAttribute(this,t),Ur.applyMatrix4(e),this.setXYZ(t,Ur.x,Ur.y,Ur.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ur.fromBufferAttribute(this,t),Ur.applyNormalMatrix(e),this.setXYZ(t,Ur.x,Ur.y,Ur.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ur.fromBufferAttribute(this,t),Ur.transformDirection(e),this.setXYZ(t,Ur.x,Ur.y,Ur.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=on(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),n=on(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),n=on(n,this.array),r=on(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=on(t,this.array),n=on(n,this.array),r=on(r,this.array),i=on(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Kr=class extends G{constructor(e,t,n){super(new Uint16Array(e),t,n)}},qr=class extends G{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Jr=class extends G{constructor(e,t,n){super(new Float32Array(e),t,n)}},Yr=new Or,Xr=new U,Zr=new U,Qr=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Yr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xr.subVectors(e,this.center);let t=Xr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Xr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xr.copy(e.center).add(Zr)),this.expandByPoint(Xr.copy(e.center).sub(Zr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},$r=0,ei=new jn,ti=new ir,ni=new U,ri=new Or,ii=new Or,ai=new U,oi=class e extends Xt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$r++}),this.uuid=en(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Bt(e)?qr:Kr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new un().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ei.makeRotationFromQuaternion(e),this.applyMatrix4(ei),this}rotateX(e){return ei.makeRotationX(e),this.applyMatrix4(ei),this}rotateY(e){return ei.makeRotationY(e),this.applyMatrix4(ei),this}rotateZ(e){return ei.makeRotationZ(e),this.applyMatrix4(ei),this}translate(e,t,n){return ei.makeTranslation(e,t,n),this.applyMatrix4(ei),this}scale(e,t,n){return ei.makeScale(e,t,n),this.applyMatrix4(ei),this}lookAt(e){return ti.lookAt(e),ti.updateMatrix(),this.applyMatrix4(ti.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ni).negate(),this.translate(ni.x,ni.y,ni.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Jr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Or);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ri.setFromBufferAttribute(n),this.morphTargetsRelative?(ai.addVectors(this.boundingBox.min,ri.min),this.boundingBox.expandByPoint(ai),ai.addVectors(this.boundingBox.max,ri.max),this.boundingBox.expandByPoint(ai)):(this.boundingBox.expandByPoint(ri.min),this.boundingBox.expandByPoint(ri.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);else if(e){let n=this.boundingSphere.center;if(ri.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ii.setFromBufferAttribute(n),this.morphTargetsRelative?(ai.addVectors(ri.min,ii.min),ri.expandByPoint(ai),ai.addVectors(ri.max,ii.max),ri.expandByPoint(ai)):(ri.expandByPoint(ii.min),ri.expandByPoint(ii.max))}ri.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)ai.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(ai));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)ai.fromBufferAttribute(a,t),o&&(ni.fromBufferAttribute(e,t),ai.add(ni)),r=Math.max(r,n.distanceToSquared(ai))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new G(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new G(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ai.fromBufferAttribute(e,t),ai.normalize(),e.setXYZ(t,ai.x,ai.y,ai.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new G(a,r,i)}if(this.index===null)return B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},si=new U,ci=new U,li=new un,ui=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=si.subVectors(n,t).cross(ci.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(si),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||li.getNormalMatrix(e),r=this.coplanarPoint(si).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},di=0,fi=class extends Xt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:di++}),this.uuid=en(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Lt,this.stencilZFail=Lt,this.stencilZPass=Lt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){B(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?B(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new W().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new ui().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},pi=new U,mi=new U,hi=new U,gi=new U,_i=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){mi.copy(e).add(t).multiplyScalar(.5),hi.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(mi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(hi),o=gi.dot(this.direction),s=-gi.dot(hi),c=gi.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(mi).addScaledVector(hi,d),f}intersectSphere(e,t){if(e.radius<0)return null;pi.subVectors(e.center,this.origin);let n=pi.dot(this.direction),r=pi.dot(pi)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,te=C/w,P=1/w,ne=T-ee*D,re=E-te*D,ie=O-ee*A,ae=k-te*A,oe=j-ee*N,F=M-te*N,se=oe*ae-F*ie,ce=ne*F-re*oe,le=ie*re-ae*ne;if(r){if(se<0||ce<0||le<0)return null}else if((se<0||ce<0||le<0)&&(se>0||ce>0||le>0))return null;let ue=se+ce+le;if(ue===0)return null;let I=P*(se*D+ce*A+le*N);return(ue>0?I<0:I>0)?null:this.at(I/ue,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vi=class extends fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},yi=new jn,bi=new _i,xi=new Qr,Si=new U,Ci=new U,wi=new U,Ti=new U,Ei=new U,Di=new U,Oi=new U,ki=new U,K=class extends ir{constructor(e=new oi,t=new vi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Di.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ei.fromBufferAttribute(s,e),a?Di.addScaledVector(Ei,r):Di.addScaledVector(Ei.sub(t),r))}t.add(Di)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xi.copy(n.boundingSphere),xi.applyMatrix4(i),bi.copy(e.ray).recast(e.near),!(xi.containsPoint(bi.origin)===!1&&(bi.intersectSphere(xi,Si)===null||bi.origin.distanceToSquared(Si)>(e.far-e.near)**2))&&(yi.copy(i).invert(),bi.copy(e.ray).applyMatrix4(yi),(n.boundingBox===null||bi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,bi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ji(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ji(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ji(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ji(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ai(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ki.copy(s),ki.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ki);return l<n.near||l>n.far?null:{distance:l,point:ki.clone(),object:e}}function ji(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ci),e.getVertexPosition(c,wi),e.getVertexPosition(l,Ti);let u=Ai(e,t,n,r,Ci,wi,Ti,Oi);if(u){let e=new U;Dr.getBarycoord(Oi,Ci,wi,Ti,e),i&&(u.uv=Dr.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=Dr.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=Dr.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};Dr.getNormal(Ci,wi,Ti,t.normal),u.face=t,u.barycoord=e}return u}var Mi=class extends Tn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=_e,l=_e,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ni=class extends G{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Pi=new jn,Fi=new jn,Ii=[],Li=new Or,Ri=new jn,zi=new K,Bi=new Qr,Vi=class extends K{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ni(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ri)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Or),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Pi),Li.copy(e.boundingBox).applyMatrix4(Pi),this.boundingBox.union(Li)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Pi),Bi.copy(e.boundingSphere).applyMatrix4(Pi),this.boundingSphere.union(Bi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(zi.geometry=this.geometry,zi.material=this.material,zi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bi.copy(this.boundingSphere),Bi.applyMatrix4(n),e.ray.intersectsSphere(Bi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Pi),Fi.multiplyMatrices(n,Pi),zi.matrixWorld=Fi,zi.raycast(e,Ii);for(let e=0,n=Ii.length;e<n;e++){let n=Ii[e];n.instanceId=i,n.object=this,t.push(n)}Ii.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ni(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Mi(new Float32Array(r*this.count),r,this.count,Re,R));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Hi=new Qr,Ui=new H(.5,.5),Wi=new U,Gi=class{constructor(e=new ui,t=new ui,n=new ui,r=new ui,i=new ui,a=new ui){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476+Ui.distanceTo(e.center),Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Wi.x=r.normal.x>0?e.max.x:e.min.x,Wi.y=r.normal.y>0?e.max.y:e.min.y,Wi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Wi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ki=class extends fi{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qi=new jn,Ji=new _i,Yi=new Qr,Xi=new U,Zi=class extends ir{constructor(e=new oi,t=new Ki){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yi.copy(n.boundingSphere),Yi.applyMatrix4(r),Yi.radius+=i,e.ray.intersectsSphere(Yi)===!1)return;qi.copy(r).invert(),Ji.copy(e.ray).applyMatrix4(qi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Xi.fromBufferAttribute(l,n),Qi(Xi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Xi.fromBufferAttribute(l,a),Qi(Xi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Qi(e,t,n,r,i,a,o){let s=Ji.distanceSqToPoint(e);if(s<n){let n=new U;Ji.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var $i=class extends Tn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ea=class extends Tn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ta=class extends Tn{constructor(e,t,n=De,r,i,a,o=_e,s=_e,c,l=Ie,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new xn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},na=class extends ta{constructor(e,t=De,n=301,r,i,a=_e,o=_e,s,c=Ie){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ra=class extends Tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ia=class e extends oi{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Jr(c,3)),this.setAttribute(`normal`,new Jr(l,3)),this.setAttribute(`uv`,new Jr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},aa=class e extends oi{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Jr(u,3)),this.setAttribute(`normal`,new Jr(d,3)),this.setAttribute(`uv`,new Jr(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},oa=class e extends aa{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},sa=class e extends oi{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Jr(i,3)),this.setAttribute(`normal`,new Jr(i.slice(),3)),this.setAttribute(`uv`,new Jr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new U,r=new U,i=new U;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new U;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new U;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new U,t=new U,n=new U,r=new U,o=new H,s=new H,c=new H;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},ca=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){B(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new H:new U);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,r=[],i=[],a=[],o=new U,s=new jn;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new U)}i[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(tn(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(tn(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},la=class extends ca{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new H){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ua=class extends la{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function da(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var fa=new U,pa=new U,ma=new da,ha=new da,ga=new da,_a=class extends ca{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new U){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(pa.subVectors(r[0],r[1]).add(r[0]),c=pa);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(fa.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=fa),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ma.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),ha.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),ga.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ma.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),ha.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),ga.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ma.calc(s),ha.calc(s),ga.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function va(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function ya(e,t){let n=1-e;return n*n*t}function ba(e,t){return 2*(1-e)*e*t}function xa(e,t){return e*e*t}function Sa(e,t,n,r){return ya(e,t)+ba(e,n)+xa(e,r)}function Ca(e,t){let n=1-e;return n*n*n*t}function wa(e,t){let n=1-e;return 3*n*n*e*t}function Ta(e,t){return 3*(1-e)*e*e*t}function Ea(e,t){return e*e*e*t}function Da(e,t,n,r,i){return Ca(e,t)+wa(e,n)+Ta(e,r)+Ea(e,i)}var Oa=class extends ca{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Da(e,r.x,i.x,a.x,o.x),Da(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ka=class extends ca{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Da(e,r.x,i.x,a.x,o.x),Da(e,r.y,i.y,a.y,o.y),Da(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Aa=class extends ca{constructor(e=new H,t=new H){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ja=class extends ca{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ma=class extends ca{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Sa(e,r.x,i.x,a.x),Sa(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Na=class extends ca{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Sa(e,r.x,i.x,a.x),Sa(e,r.y,i.y,a.y),Sa(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Pa=Object.freeze({__proto__:null,ArcCurve:ua,CatmullRomCurve3:_a,CubicBezierCurve:Oa,CubicBezierCurve3:ka,EllipseCurve:la,LineCurve:Aa,LineCurve3:ja,QuadraticBezierCurve:Ma,QuadraticBezierCurve3:Na,SplineCurve:class extends ca{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new H){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(va(o,s.x,c.x,l.x,u.x),va(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this}}}),Fa=class e extends sa{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ia=class e extends oi{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Jr(p,3)),this.setAttribute(`normal`,new Jr(m,3)),this.setAttribute(`uv`,new Jr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},La=class e extends oi{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Jr(p,3)),this.setAttribute(`normal`,new Jr(m,3)),this.setAttribute(`uv`,new Jr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Ra=class e extends oi{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new U,f=new U,p=new U;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Jr(c,3)),this.setAttribute(`normal`,new Jr(l,3)),this.setAttribute(`uv`,new Jr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},za=class e extends oi{constructor(e=new Na(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new U,s=new U,c=new H,l=new U,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new Jr(u,3)),this.setAttribute(`normal`,new Jr(d,3)),this.setAttribute(`uv`,new Jr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new Pa[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Ba(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ha(i))i.isRenderTargetTexture?(B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ha(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Va(e){let t={};for(let n=0;n<e.length;n++){let r=Ba(e[n]);for(let e in r)t[e]=r[e]}return t}function Ha(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ua(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Wa(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:hn.workingColorSpace}var Ga={clone:Ba,merge:Va},Ka=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qa=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ja=class extends fi{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ka,this.fragmentShader=qa,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ba(e.uniforms),this.uniformsGroups=Ua(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new W().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new En().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new un().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new jn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ya=class extends Ja{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Xa=class extends fi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new W(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Za=class extends fi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Qa=class extends fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Mt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},$a=class extends fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function eo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function to(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var no=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ro=class extends no{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kt,endingEnd:kt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case At:i=e,o=2*t-n;break;case jt:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case At:a=e,s=2*n-t;break;case jt:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},io=class extends no{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ao=class extends no{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},oo=class extends no{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=lo(n,t,g,y,r);i[p]=so(x,o,_,b,m)}return i}};function so(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function co(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function lo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=so(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=co(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var uo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=eo(t,this.TimeBufferType),this.values=eo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:eo(e.times,Array),values:eo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),to(e.settings)&&(n.settings={inTangents:eo(e.settings.inTangents,Array),outTangents:eo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ro(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new oo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Tt:t=this.InterpolantFactoryMethodDiscrete;break;case Et:t=this.InterpolantFactoryMethodLinear;break;case Dt:t=this.InterpolantFactoryMethodSmooth;break;case Ot:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return B(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tt;case this.InterpolantFactoryMethodLinear:return Et;case this.InterpolantFactoryMethodSmooth:return Dt;case this.InterpolantFactoryMethodBezier:return Ot}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;to(this.settings)&&(fo(this.settings.inTangents,e),fo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(V(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(V(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){V(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){V(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Vt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){V(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Dt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,to(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function fo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}uo.prototype.ValueTypeName=``,uo.prototype.TimeBufferType=Float32Array,uo.prototype.ValueBufferType=Float32Array,uo.prototype.DefaultInterpolation=Et;var po=class extends uo{constructor(e,t,n){super(e,t,n)}};po.prototype.ValueTypeName=`bool`,po.prototype.ValueBufferType=Array,po.prototype.DefaultInterpolation=Tt,po.prototype.InterpolantFactoryMethodLinear=void 0,po.prototype.InterpolantFactoryMethodSmooth=void 0;var mo=class extends uo{constructor(e,t,n,r){super(e,t,n,r)}};mo.prototype.ValueTypeName=`color`;var ho=class extends uo{constructor(e,t,n,r){super(e,t,n,r)}};ho.prototype.ValueTypeName=`number`;var go=class extends no{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)sn.slerpFlat(i,0,a,c-o,a,c,s);return i}},_o=class extends uo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new go(this.times,this.values,this.getValueSize(),e)}};_o.prototype.ValueTypeName=`quaternion`,_o.prototype.InterpolantFactoryMethodSmooth=void 0;var vo=class extends uo{constructor(e,t,n){super(e,t,n)}};vo.prototype.ValueTypeName=`string`,vo.prototype.ValueBufferType=Array,vo.prototype.DefaultInterpolation=Tt,vo.prototype.InterpolantFactoryMethodLinear=void 0,vo.prototype.InterpolantFactoryMethodSmooth=void 0;var yo=class extends uo{constructor(e,t,n,r){super(e,t,n,r)}};yo.prototype.ValueTypeName=`vector`;var bo={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(xo(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!xo(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function xo(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var So=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Co=class{constructor(e){this.manager=e===void 0?So:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Co.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var wo=new WeakMap,To=class extends Co{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=bo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=wo.get(a);e===void 0&&(e=[],wo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Ht(`img`);function s(){l(),t&&t(this);let n=wo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}wo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),bo.remove(`image:${e}`);let n=wo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}wo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),bo.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},Eo=class extends Co{constructor(e){super(e)}load(e,t,n,r){let i=new Tn,a=new To(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Do=class extends ir{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new W(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Oo=class extends Do{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(ir.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ko=new jn,Ao=new U,jo=new U,Mo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=Se,this.map=null,this.mapPass=null,this.matrix=new jn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gi,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new En(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ao.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ao),jo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ko.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ko,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ko)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},No=new U,Po=new sn,Fo=new U,Io=class extends ir{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new jn,this.projectionMatrix=new jn,this.projectionMatrixInverse=new jn,this.coordinateSystem=zt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(No,Po,Fo),Fo.x===1&&Fo.y===1&&Fo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Po,Fo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(No,Po,Fo),Fo.x===1&&Fo.y===1&&Fo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Po,Fo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Lo=new U,Ro=new H,zo=new H,Bo=class extends Io{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=$t*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Qt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $t*2*Math.atan(Math.tan(Qt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Lo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Lo.x,Lo.y).multiplyScalar(-e/Lo.z),Lo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Lo.x,Lo.y).multiplyScalar(-e/Lo.z)}getViewSize(e,t){return this.getViewBounds(e,Ro,zo),t.subVectors(zo,Ro)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Qt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Vo=class extends Io{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ho=class extends Mo{constructor(){super(new Vo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Uo=class extends Do{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(ir.DEFAULT_UP),this.updateMatrix(),this.target=new ir,this.shadow=new Ho}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Wo=-90,Go=1,Ko=class extends ir{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Bo(Wo,Go,e,t);r.layers=this.layers,this.add(r);let i=new Bo(Wo,Go,e,t);i.layers=this.layers,this.add(i);let a=new Bo(Wo,Go,e,t);a.layers=this.layers,this.add(a);let o=new Bo(Wo,Go,e,t);o.layers=this.layers,this.add(o);let s=new Bo(Wo,Go,e,t);s.layers=this.layers,this.add(s);let c=new Bo(Wo,Go,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},qo=class extends Bo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Jo=`\\[\\]\\.:\\/`,Yo=RegExp(`[\\[\\]\\.:\\/]`,`g`),Xo=`[^\\[\\]\\.:\\/]`,Zo=`[^`+Jo.replace(`\\.`,``)+`]`,Qo=`((?:WC+[\\/:])*)`.replace(`WC`,Xo),$o=`(WCOD+)?`.replace(`WCOD`,Zo),es=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Xo),ts=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Xo),ns=RegExp(`^`+Qo+$o+es+ts+`$`),rs=[`material`,`materials`,`bones`,`map`],is=class{constructor(e,t,n){let r=n||as.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},as=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Yo,``)}static parseTrackName(e){let t=ns.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);rs.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){B(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){V(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){V(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){V(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){V(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){V(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;V(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};as.Composite=is,as.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},as.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},as.prototype.GetterByBindingType=[as.prototype._getValue_direct,as.prototype._getValue_array,as.prototype._getValue_arrayElement,as.prototype._getValue_toArray],as.prototype.SetterByBindingTypeAndVersioning=[[as.prototype._setValue_direct,as.prototype._setValue_direct_setNeedsUpdate,as.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[as.prototype._setValue_array,as.prototype._setValue_array_setNeedsUpdate,as.prototype._setValue_array_setMatrixWorldNeedsUpdate],[as.prototype._setValue_arrayElement,as.prototype._setValue_arrayElement_setNeedsUpdate,as.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[as.prototype._setValue_fromArray,as.prototype._setValue_fromArray_setNeedsUpdate,as.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function os(e,t,n,r){let i=ss(r);switch(n){case Ne:return e*t;case Re:return e*t/i.components*i.byteLength;case ze:return e*t/i.components*i.byteLength;case Be:return e*t*2/i.components*i.byteLength;case Ve:return e*t*2/i.components*i.byteLength;case Pe:return e*t*3/i.components*i.byteLength;case Fe:return e*t*4/i.components*i.byteLength;case He:return e*t*4/i.components*i.byteLength;case Ue:case We:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ge:case Ke:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Je:case Xe:return Math.max(e,16)*Math.max(t,8)/4;case qe:case Ye:return Math.max(e,8)*Math.max(t,8)/2;case Ze:case Qe:case et:case tt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case $e:case nt:case rt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case it:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case at:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ot:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case st:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ct:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case lt:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ut:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case dt:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ft:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case pt:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case mt:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ht:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case gt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case _t:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case vt:case yt:case bt:return Math.ceil(e/4)*Math.ceil(t/4)*16;case xt:case St:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ct:case wt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function ss(e){switch(e){case Se:case Ce:return{byteLength:1,components:1};case Te:case we:case Oe:return{byteLength:2,components:1};case ke:case Ae:return{byteLength:2,components:4};case De:case Ee:case R:return{byteLength:4,components:1};case Me:case z:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?B(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function cs(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ls(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var us={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},q={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new un},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new un}},envmap:{envMap:{value:null},envMapRotation:{value:new un},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new un}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new un}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new un},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new un},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new un},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new un}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new un}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new un}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0},uvTransform:{value:new un}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new un},alphaMap:{value:null},alphaMapTransform:{value:new un},alphaTest:{value:0}}},ds={basic:{uniforms:Va([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.fog]),vertexShader:us.meshbasic_vert,fragmentShader:us.meshbasic_frag},lambert:{uniforms:Va([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:us.meshlambert_vert,fragmentShader:us.meshlambert_frag},phong:{uniforms:Va([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:us.meshphong_vert,fragmentShader:us.meshphong_frag},standard:{uniforms:Va([q.common,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.roughnessmap,q.metalnessmap,q.fog,q.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:us.meshphysical_vert,fragmentShader:us.meshphysical_frag},toon:{uniforms:Va([q.common,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.gradientmap,q.fog,q.lights,{emissive:{value:new W(0)}}]),vertexShader:us.meshtoon_vert,fragmentShader:us.meshtoon_frag},matcap:{uniforms:Va([q.common,q.bumpmap,q.normalmap,q.displacementmap,q.fog,{matcap:{value:null}}]),vertexShader:us.meshmatcap_vert,fragmentShader:us.meshmatcap_frag},points:{uniforms:Va([q.points,q.fog]),vertexShader:us.points_vert,fragmentShader:us.points_frag},dashed:{uniforms:Va([q.common,q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:us.linedashed_vert,fragmentShader:us.linedashed_frag},depth:{uniforms:Va([q.common,q.displacementmap]),vertexShader:us.depth_vert,fragmentShader:us.depth_frag},normal:{uniforms:Va([q.common,q.bumpmap,q.normalmap,q.displacementmap,{opacity:{value:1}}]),vertexShader:us.meshnormal_vert,fragmentShader:us.meshnormal_frag},sprite:{uniforms:Va([q.sprite,q.fog]),vertexShader:us.sprite_vert,fragmentShader:us.sprite_frag},background:{uniforms:{uvTransform:{value:new un},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:us.background_vert,fragmentShader:us.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new un}},vertexShader:us.backgroundCube_vert,fragmentShader:us.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:us.cube_vert,fragmentShader:us.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:us.equirect_vert,fragmentShader:us.equirect_frag},distance:{uniforms:Va([q.common,q.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:us.distance_vert,fragmentShader:us.distance_frag},shadow:{uniforms:Va([q.lights,q.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:us.shadow_vert,fragmentShader:us.shadow_frag}};ds.physical={uniforms:Va([ds.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new un},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new un},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new un},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new un},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new un},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new un},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new un},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new un},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new un},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new un},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new un},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new un}}]),vertexShader:us.meshphysical_vert,fragmentShader:us.meshphysical_frag};var fs={r:0,b:0,g:0},ps=new jn,ms=new un;ms.set(-1,0,0,0,1,0,0,0,1);function hs(e,t,n,r,i,a){let o=new W(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new K(new ia(1,1,1),new Ja({name:`BackgroundCubeMaterial`,uniforms:Ba(ds.backgroundCube.uniforms),vertexShader:ds.backgroundCube.vertexShader,fragmentShader:ds.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ps.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ms),l.material.toneMapped=hn.getTransfer(i.colorSpace)!==It,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new K(new Ia(2,2),new Ja({name:`BackgroundMaterial`,uniforms:Ba(ds.background.uniforms),vertexShader:ds.background.vertexShader,fragmentShader:ds.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=hn.getTransfer(i.colorSpace)!==It,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(fs,Wa(e)),n.buffers.color.setClear(fs.r,fs.g,fs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function gs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function _s(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function vs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(B(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&B(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function ys(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ui,s=new un,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var bs=4,xs=6,Ss=20,Cs=256,ws=new Vo,Ts=new W,Es=null,Ds=0,Os=0,ks=!1,As=new U,js=new U,Ms=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=As}=i;Es=this._renderer.getRenderTarget(),Ds=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel(),ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Es,Ds,Os),this._renderer.xr.enabled=ks,e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Es=this._renderer.getRenderTarget(),Ds=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel(),ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:be,minFilter:be,generateMipmaps:!1,type:Oe,format:Fe,colorSpace:Pt,depthBuffer:!1},r=Ps(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ps(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ns(r)),this._blurMaterial=Ls(r,e,t),this._ggxMaterial=Is(r,e,t)}return r}_compileMaterial(e){let t=new K(new oi,e);this._renderer.compile(t,ws)}_sceneToCubeUV(e,t,n,r,i){let a=new Bo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ts),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new K(new ia,new vi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ts),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Fs(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=zs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Fs(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ws)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-bs?n-d+bs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Fs(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,ws),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Fs(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,ws)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Fs(t,3*l*(r>this._lodMax-bs?r-this._lodMax+bs:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,ws)}};function Ns(e){let t=[],n=[],r=e,i=e-bs+1+xs;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?js.set(1,r,n):e===1?js.set(-n,1,-r):e===2?js.set(-n,r,1):e===3?js.set(-1,r,-n):e===4?js.set(-n,-1,r):js.set(n,r,-1),js.toArray(l,(e*6+t)*3)}}let u=new oi;u.setAttribute(`position`,new G(c,3)),u.setAttribute(`outputDirection`,new G(l,3)),n.push(new K(u,null)),r>bs&&r--}return{lodMeshes:n,sizeLods:t}}function Ps(e,t,n){let r=new On(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Fs(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Is(e,t,n){return new Ja({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Cs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Bs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ls(e,t,n){return new Ja({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ss,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Bs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Rs(){return new Ja({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function zs(){return new Ja({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Vs=class extends On{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new $i(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ia(5,5,5),i=new Ja({name:`CubemapFromEquirect`,uniforms:Ba(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new K(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=be),new Ko(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Hs(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Vs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ms(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ms(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Us(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&qt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Ws(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?qr:Kr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Gs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ks(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function qs(e,t,n){let r=new WeakMap,i=new En;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new kn(h,p,m,u);g.type=R,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Js(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ys={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Xs(e,t,n,r,i,a){let o=new On(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new oi;l.setAttribute(`position`,new Jr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Jr([0,2,0,0,2,0],2));let u=new Ya({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new K(l,u),f=new Vo(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new On(t,n,{type:Oe,depthBuffer:!1,stencilBuffer:!1}),c=new On(t,n,{type:Oe,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},hn.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Ys[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Zs=new Tn,Qs=new ta(1,1),$s=new kn,ec=new An,tc=new $i,nc=[],rc=[],ic=new Float32Array(16),ac=new Float32Array(9),oc=new Float32Array(4);function sc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=nc[i];if(a===void 0&&(a=new Float32Array(i),nc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function cc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function lc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function uc(e,t){let n=rc[t];n===void 0&&(n=new Int32Array(t),rc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function dc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2fv(this.addr,t),lc(n,t)}}function pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(cc(n,t))return;e.uniform3fv(this.addr,t),lc(n,t)}}function mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4fv(this.addr,t),lc(n,t)}}function hc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;oc.set(r),e.uniformMatrix2fv(this.addr,!1,oc),lc(n,r)}}function gc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;ac.set(r),e.uniformMatrix3fv(this.addr,!1,ac),lc(n,r)}}function _c(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;ic.set(r),e.uniformMatrix4fv(this.addr,!1,ic),lc(n,r)}}function vc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2iv(this.addr,t),lc(n,t)}}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(cc(n,t))return;e.uniform3iv(this.addr,t),lc(n,t)}}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4iv(this.addr,t),lc(n,t)}}function Sc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2uiv(this.addr,t),lc(n,t)}}function wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(cc(n,t))return;e.uniform3uiv(this.addr,t),lc(n,t)}}function Tc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4uiv(this.addr,t),lc(n,t)}}function Ec(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Qs.compareFunction=n.isReversedDepthBuffer()?518:515,a=Qs):a=Zs,n.setTexture2D(t||a,i)}function Dc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ec,i)}function Oc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||tc,i)}function kc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||$s,i)}function Ac(e){switch(e){case 5126:return dc;case 35664:return fc;case 35665:return pc;case 35666:return mc;case 35674:return hc;case 35675:return gc;case 35676:return _c;case 5124:case 35670:return vc;case 35667:case 35671:return yc;case 35668:case 35672:return bc;case 35669:case 35673:return xc;case 5125:return Sc;case 36294:return Cc;case 36295:return wc;case 36296:return Tc;case 35678:case 36198:case 36298:case 36306:case 35682:return Ec;case 35679:case 36299:case 36307:return Dc;case 35680:case 36300:case 36308:case 36293:return Oc;case 36289:case 36303:case 36311:case 36292:return kc}}function jc(e,t){e.uniform1fv(this.addr,t)}function Mc(e,t){let n=sc(t,this.size,2);e.uniform2fv(this.addr,n)}function Nc(e,t){let n=sc(t,this.size,3);e.uniform3fv(this.addr,n)}function Pc(e,t){let n=sc(t,this.size,4);e.uniform4fv(this.addr,n)}function Fc(e,t){let n=sc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Ic(e,t){let n=sc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Lc(e,t){let n=sc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Rc(e,t){e.uniform1iv(this.addr,t)}function zc(e,t){e.uniform2iv(this.addr,t)}function Bc(e,t){e.uniform3iv(this.addr,t)}function Vc(e,t){e.uniform4iv(this.addr,t)}function Hc(e,t){e.uniform1uiv(this.addr,t)}function Uc(e,t){e.uniform2uiv(this.addr,t)}function Wc(e,t){e.uniform3uiv(this.addr,t)}function Gc(e,t){e.uniform4uiv(this.addr,t)}function Kc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Qs:Zs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function qc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ec,a[e])}function Jc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||tc,a[e])}function Yc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||$s,a[e])}function Xc(e){switch(e){case 5126:return jc;case 35664:return Mc;case 35665:return Nc;case 35666:return Pc;case 35674:return Fc;case 35675:return Ic;case 35676:return Lc;case 5124:case 35670:return Rc;case 35667:case 35671:return zc;case 35668:case 35672:return Bc;case 35669:case 35673:return Vc;case 5125:return Hc;case 36294:return Uc;case 36295:return Wc;case 36296:return Gc;case 35678:case 36198:case 36298:case 36306:case 35682:return Kc;case 35679:case 36299:case 36307:return qc;case 35680:case 36300:case 36308:case 36293:return Jc;case 36289:case 36303:case 36311:case 36292:return Yc}}var Zc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ac(t.type)}},Qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xc(t.type)}},$c=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},el=/(\w+)(\])?(\[|\.)?/g;function tl(e,t){e.seq.push(t),e.map[t.id]=t}function nl(e,t,n){let r=e.name,i=r.length;for(el.lastIndex=0;;){let a=el.exec(r),o=el.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){tl(n,l===void 0?new Zc(s,e,t):new Qc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new $c(s),tl(n,e)),n=e}}}var rl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);nl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function il(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var al=37297,ol=0;function sl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var cl=new un;function ll(e){hn._getMatrix(cl,hn.workingColorSpace,e);let t=`mat3( ${cl.elements.map(e=>e.toFixed(4))} )`;switch(hn.getTransfer(e)){case Ft:return[t,`LinearTransferOETF`];case It:return[t,`sRGBTransferOETF`];default:return B(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ul(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+sl(e.getShaderSource(t),r)}return i}function dl(e,t){let n=ll(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var fl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function pl(e,t){let n=fl[t];return n===void 0?(B(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var ml=new U;function hl(){return hn.getLuminanceCoefficients(ml),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${ml.x.toFixed(4)}, ${ml.y.toFixed(4)}, ${ml.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function gl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(yl).join(`
`)}function _l(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function vl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function yl(e){return e!==``}function bl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function xl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Sl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(e){return e.replace(Sl,Tl)}var wl=new Map;function Tl(e,t){let n=us[t];if(n===void 0){let e=wl.get(t);if(e!==void 0)n=us[e],B(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Cl(n)}var El=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(e){return e.replace(El,Ol)}function Ol(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function kl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Al={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function jl(e){return Al[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ml={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Nl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Ml[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Pl={302:`ENVMAP_MODE_REFRACTION`};function Fl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Pl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Il={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Ll(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Il[e.combine]||`ENVMAP_BLENDING_NONE`}function Rl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function zl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=jl(n),l=Nl(n),u=Fl(n),d=Ll(n),f=Rl(n),p=gl(n),m=_l(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(yl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(yl).join(`
`),_.length>0&&(_+=`
`)):(g=[kl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(yl).join(`
`),_=[kl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:us.tonemapping_pars_fragment,n.toneMapping===0?``:pl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,us.colorspace_pars_fragment,dl(`linearToOutputTexel`,n.outputColorSpace),hl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(yl).join(`
`)),o=Cl(o),o=bl(o,n),o=xl(o,n),s=Cl(s),s=bl(s,n),s=xl(s,n),o=Dl(o),s=Dl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=il(i,i.VERTEX_SHADER,y),S=il(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=ul(i,x,`vertex`),n=ul(i,S,`fragment`);V(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):B(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new rl(i,h),T=vl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,al)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ol++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Bl=0,Vl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Hl(e),t.set(e,n)),n}},Hl=class{constructor(e){this.id=Bl++,this.code=e,this.usedTimes=0}};function Ul(e){return e===1030||e===37490||e===36285}function Wl(e,t,n,r,i,a){let o=new Hn,s=new Vl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&B(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ds[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,ee=h.isBatchedMesh===!0,te=!!i.map,P=!!i.matcap,ne=!!x,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,F=!!i.displacementMap,se=!!i.emissiveMap,ce=!!i.metalnessMap,le=!!i.roughnessMap,ue=i.anisotropy>0,I=i.clearcoat>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=ue&&!!i.anisotropyMap,_e=I&&!!i.clearcoatMap,ve=I&&!!i.clearcoatNormalMap,ye=I&&!!i.clearcoatRoughnessMap,be=pe&&!!i.iridescenceMap,L=pe&&!!i.iridescenceThicknessMap,xe=me&&!!i.sheenColorMap,Se=me&&!!i.sheenRoughnessMap,Ce=!!i.specularMap,we=!!i.specularColorMap,Te=!!i.specularIntensityMap,Ee=he&&!!i.transmissionMap,De=he&&!!i.thicknessMap,R=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,Ae=!!i.alphaHash,je=!!i.extensions,Me=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Me=e.toneMapping);let z={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ee,batchingColor:ee&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:hn.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:P,envMap:ne,envMapMode:ne&&x.mapping,envMapCubeUVHeight:S,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:F,emissiveMap:se,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&Ul(i.normalMap.format),metalnessMap:ce,roughnessMap:le,anisotropy:ue,anisotropyMap:ge,clearcoat:I,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:be,iridescenceThicknessMap:L,sheen:me,sheenColorMap:xe,sheenRoughnessMap:Se,specularMap:Ce,specularColorMap:we,specularIntensityMap:Te,transmission:he,transmissionMap:Ee,thicknessMap:De,gradientMap:R,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:Ae,combine:i.combine,mapUv:te&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:oe&&m(i.normalMap.channel),displacementMapUv:F&&m(i.displacementMap.channel),emissiveMapUv:se&&m(i.emissiveMap.channel),metalnessMapUv:ce&&m(i.metalnessMap.channel),roughnessMapUv:le&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:L&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Se&&m(i.sheenRoughnessMap.channel),specularMapUv:Ce&&m(i.specularMap.channel),specularColorMapUv:we&&m(i.specularColorMap.channel),specularIntensityMapUv:Te&&m(i.specularIntensityMap.channel),transmissionMapUv:Ee&&m(i.transmissionMap.channel),thicknessMapUv:De&&m(i.thicknessMap.channel),alphaMapUv:Oe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(oe||ue),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(te||Oe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&hn.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&hn.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||ee)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return z.vertexUv1s=c.has(1),z.vertexUv2s=c.has(2),z.vertexUv3s=c.has(3),c.clear(),z}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ds[t];n=Ga.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new zl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Gl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Kl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ql(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Jl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Kl),r.length>1&&r.sort(t||ql),i.length>1&&i.sort(t||ql)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Yl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Jl,e.set(t,[i])):n>=r.length?(i=new Jl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Xl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new U,color:new W};break;case`SpotLight`:n={position:new U,direction:new U,color:new W,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new W,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new W,groundColor:new W};break;case`RectAreaLight`:n={color:new W,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function Zl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ql=0;function $l(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function eu(e){let t=new Xl,n=Zl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new jn,o=new jn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort($l);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=q.LTC_FLOAT_1,r.rectAreaLTC2=q.LTC_FLOAT_2):(r.rectAreaLTC1=q.LTC_HALF_1,r.rectAreaLTC2=q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ql++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function tu(e){let t=new eu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function nu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new tu(e),t.set(n,[a])):r>=i.length?(a=new tu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ru=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,au=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],ou=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],su=new jn,cu=new U,lu=new U;function uu(e,t,n){let r=new Gi,i=new H,a=new H,o=new En,s=new Qa,c=new $a,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Ja({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:ru,fragmentShader:iu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new oi;m.setAttribute(`position`,new G(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new K(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(B(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){B(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){B(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new On(i.x,i.y,{format:Be,type:Oe,minFilter:be,magFilter:be,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new ta(i.x,i.y,R),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Ie,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=_e,d.map.depthTexture.magFilter=_e}else l.isPointLight?(d.map=new Vs(i.x),d.map.depthTexture=new na(i.x,De)):(d.map=new On(i.x,i.y),d.map.depthTexture=new ta(i.x,i.y,De)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Ie,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=be,d.map.depthTexture.magFilter=be):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=_e,d.map.depthTexture.magFilter=_e);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),cu.setFromMatrixPosition(l.matrixWorld),e.position.copy(cu),lu.copy(e.position),lu.add(au[t]),e.up.copy(ou[t]),e.lookAt(lu),e.updateMatrixWorld(),n.makeTranslation(-cu.x,-cu.y,-cu.z),su.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(su,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new On(i.x,i.y,{format:Be,type:Oe}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function du(e,t){function n(){let t=!1,n=new En,r=null,i=new En(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ce(e.DEPTH_TEST):le(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Yt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ce(e.STENCIL_TEST):le(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(te)[1]),N=ee>=1);let P=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new En().fromArray(re),oe=new En().fromArray(ie);function F(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=F(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=F(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=F(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=F(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ce(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),ce(e.CULL_FACE),me(0);function ce(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function le(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function I(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(le(e.BLEND),g=!1);else if(g===!1&&(ce(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?le(e.CULL_FACE):ce(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ce(e.SAMPLE_ALPHA_TO_COVERAGE):le(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?le(e.CULL_FACE):(ce(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(ce(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):le(e.POLYGON_OFFSET_FILL)}function be(t){t?ce(e.SCISSOR_TEST):le(e.SCISSOR_TEST)}function L(t){t===void 0&&(t=e.TEXTURE0+M-1),P!==t&&(e.activeTexture(t),P=t)}function xe(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+M-1:P);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function Se(){let t=ne[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Te(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ee(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function R(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ae(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function je(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Me(t){return d[t]===void 0?e.getParameter(t):d[t]}function z(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ne(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Pe(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Fe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ie(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ce,disable:le,bindFramebuffer:ue,drawBuffers:I,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:L,bindTexture:xe,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:Ae,texImage3D:je,pixelStorei:z,getParameter:Me,updateUBOMapping:Fe,uniformBlockBinding:Ie,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:Te,texSubImage3D:Ee,compressedTexSubImage2D:De,compressedTexSubImage3D:R,scissor:Ne,viewport:Pe,reset:Le}}function fu(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new H,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Ht(`canvas`)}function g(e,t,n){let r=1,i=je(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),B(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&B(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];B(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||B(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ft:hn.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,B(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&B(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ee(t,i){let a=r.get(t);if(t.isVideoTexture&&ke(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)B(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)B(`WebGLRenderer: Texture marked for update but image is incomplete`);else{le(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?le(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function P(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?le(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?ue(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let re={[me]:e.REPEAT,[he]:e.CLAMP_TO_EDGE,[ge]:e.MIRRORED_REPEAT},ie={[_e]:e.NEAREST,[ve]:e.NEAREST_MIPMAP_NEAREST,[ye]:e.NEAREST_MIPMAP_LINEAR,[be]:e.LINEAR,[L]:e.LINEAR_MIPMAP_NEAREST,[xe]:e.LINEAR_MIPMAP_LINEAR},ae={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function oe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&B(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,re[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,re[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,re[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ie[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ie[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ae[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function F(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function se(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ce(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=se(n.start,r.width,4),c=se(t.start,r.width,4);n.start<=i+1&&a===c&&se(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function le(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=F(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=hn.getPrimaries(hn.workingColorSpace),r=o.colorSpace===``?null:hn.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Ae(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);oe(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Le,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ce(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=os(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=os(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=je(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=je(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,o,s){if(o.image.length!==6)return;let c=F(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=hn.getPrimaries(hn.workingColorSpace),r=o.colorSpace===``?null:hn.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Ae(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);oe(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=je(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function I(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,R(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function de(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Oe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,R(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,R(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Oe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,R(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,R(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function fe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,l.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),oe(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ee(i.depthTexture,0);let u=l.__webglTexture,d=R(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function pe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)fe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?fe(i.__webglFramebuffer[0],t,0):fe(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),de(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),de(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(t,n,i){let a=r.get(t);n!==void 0&&I(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&pe(t)}function Ce(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Oe(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=R(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),de(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),oe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)I(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else I(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),oe(c,a),I(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),oe(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)I(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else I(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&pe(t)}function we(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Te=[],Ee=[];function De(t){if(t.samples>0){if(Oe(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Te.length=0,Ee.length=0,Te.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Te.push(l),Ee.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ee)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Te))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function R(e){return Math.min(i.maxSamples,e.samples)}function Oe(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function ke(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Ae(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(hn.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&B(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function je(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=ee,this.setTexture2DArray=te,this.setTexture3D=P,this.setTextureCube=ne,this.rebindTextures=Se,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=I,this.useMultisampledRTT=Oe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function pu(e,t){function n(n,r=``){let i,a=hn.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var mu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,gu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ra(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ja({vertexShader:mu,fragmentShader:hu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new K(new Ia(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_u=class extends Xt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new gu,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new H,C=null,w=null,T=new Bo;T.viewport=new En;let E=new Bo;E.viewport=new En;let D=[T,E],O=new qo,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new sr,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new sr,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new sr,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Le:Ie,a=_.stencil?je:De);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new On(d.textureWidth,d.textureHeight,{format:Fe,type:Se,depthTexture:new ta(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new On(f.framebufferWidth,f.framebufferHeight,{format:Fe,type:Se,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),oe.setContext(r),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ee=new U,te=new U;function P(e,t,n){ee.setFromMatrixPosition(t.matrixWorld),te.setFromMatrixPosition(n.matrixWorld);let r=ee.distanceTo(te),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ne(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ne(O,i);for(let e=0;e<a.length;e++)ne(a[e],i);a.length===2?P(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),re(e,O,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=$t*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Bo,o.layers.enable(n),o.viewport=new En,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ra,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let oe=new cs;oe.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},vu=new jn,yu=new un;yu.set(-1,0,0,0,1,0,0,0,1);function bu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Wa(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(vu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(yu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function xu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return V(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?B(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):B(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Su=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Cu=null;function wu(){return Cu===null&&(Cu=new Mi(Su,16,16,Be,Oe),Cu.name=`DFG_LUT`,Cu.minFilter=be,Cu.magFilter=be,Cu.wrapS=he,Cu.wrapT=he,Cu.generateMipmaps=!1,Cu.needsUpdate=!0),Cu}var Tu=class{constructor(e={}){let{canvas:t=Ut(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Se}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([He,Ve,ze]),g=new Set([Se,De,Te,je,ke,Ae]),_=new Uint32Array(4),v=new Int32Array(4),y=new U,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Nt;let j=0,M=0,N=null,ee=-1,te=null,P=new En,ne=new En,re=null,ie=new W(0),ae=0,oe=t.width,F=t.height,se=1,ce=null,le=null,ue=new En(0,0,oe,F),I=new En(0,0,oe,F),de=!1,fe=new Gi,pe=!1,me=!1,he=new jn,ge=new U,_e=new En,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ye=!1;function be(){return N===null?se:1}let L=n;function Ce(e,n){return t.getContext(e,n)}let we,Ee,R,Me,z,Ne,Pe,Fe,Ie,Le,Re,Be,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,nt,!1),t.addEventListener(`webglcontextrestored`,rt,!1),t.addEventListener(`webglcontextcreationerror`,it,!1),L===null){let t=`webgl2`;if(L=Ce(t,e),L===null)throw Ce(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}et()}catch(e){throw t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),V(`WebGLRenderer: `+e.message),e}function et(){we=new Us(L),we.init(),Ze=new pu(L,we),Ee=new vs(L,we,e,Ze),R=new du(L,we),Ee.reversedDepthBuffer&&d&&R.buffers.depth.setReversed(!0),O=L.createFramebuffer(),k=L.createFramebuffer(),A=L.createFramebuffer(),Me=new Ks(L),z=new Gl,Ne=new fu(L,we,R,z,Ee,Ze,Me),Pe=new Hs(T),Fe=new ls(L),Qe=new gs(L,Fe),Ie=new Ws(L,Fe,Me,Qe),Le=new Js(L,Ie,Fe,Qe,Me),Je=new qs(L,Ee,Ne),Ge=new ys(z),Re=new Wl(T,Pe,we,Ee,Qe,Ge),Be=new bu(T,z),Ue=new Yl,We=new nu(we),qe=new hs(T,Pe,R,Le,p,s),Ke=new uu(T,Le,Ee),$e=new xu(L,Me,Ee,R),Ye=new _s(L,we,Me),Xe=new Gs(L,we,Me),Me.programs=Re.programs,T.capabilities=Ee,T.extensions=we,T.properties=z,T.renderLists=Ue,T.shadowMap=Ke,T.state=R,T.info=Me}m!==1009&&(w=new Xs(m,t.width,t.height,o,r,i));let tt=new _u(T,L);this.xr=tt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=we.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=we.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(e){e!==void 0&&(se=e,this.setSize(oe,F,!1))},this.getSize=function(e){return e.set(oe,F)},this.setSize=function(e,n,r=!0){tt.isPresenting?B(`WebGLRenderer: Can't change size while VR device is presenting.`):(oe=e,F=n,t.width=Math.floor(e*se),t.height=Math.floor(n*se),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(oe*se,F*se).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,F=n,se=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)V(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){B(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(P)},this.getViewport=function(e){return e.copy(ue)},this.setViewport=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),R.viewport(P.copy(ue).multiplyScalar(se).round())},this.getScissor=function(e){return e.copy(I)},this.setScissor=function(e,t,n,r){e.isVector4?I.set(e.x,e.y,e.z,e.w):I.set(e,t,n,r),R.scissor(ne.copy(I).multiplyScalar(se).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(e){R.setScissorTest(de=e)},this.setOpaqueSort=function(e){ce=e},this.setTransparentSort=function(e){le=e},this.getClearColor=function(e){return e.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=qe.getClearColor(),r=qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,L.clearBufferuiv(L.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,L.clearBufferiv(L.COLOR,0,v))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),qe.dispose(),Ue.dispose(),We.dispose(),z.dispose(),Pe.dispose(),Le.dispose(),Qe.dispose(),$e.dispose(),Re.dispose(),tt.dispose(),tt.removeEventListener(`sessionstart`,dt),tt.removeEventListener(`sessionend`,ft),pt.stop()};function nt(e){e.preventDefault(),Gt(`WebGLRenderer: Context Lost.`),E=!0}function rt(){Gt(`WebGLRenderer: Context Restored.`),E=!1;let e=Me.autoReset,t=Ke.enabled,n=Ke.autoUpdate,r=Ke.needsUpdate,i=Ke.type;et(),Me.autoReset=e,Ke.enabled=t,Ke.autoUpdate=n,Ke.needsUpdate=r,Ke.type=i}function it(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function at(e){let t=e.target;t.removeEventListener(`dispose`,at),ot(t)}function ot(e){st(e),z.remove(e)}function st(e){let t=z.get(e).programs;t!==void 0&&(t.forEach(function(e){Re.releaseProgram(e)}),e.isShaderMaterial&&Re.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ve);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ct(e,t,n,r,i);R.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ie.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Qe.setup(i,r,s,n,c);let h,g=Ye;if(c!==null&&(h=Fe.get(c),g=Xe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(R.setLineWidth(r.wireframeLinewidth*be()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),R.setLineWidth(e*be()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(we.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Fe.get(c).bytesPerElement:1,o=z.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ct(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),pe===!0&&Ge.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,yt(e,t,r),e.side=0,e.needsUpdate=!0,yt(e,t,r),e.side=2):yt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=We.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),me=this.localClippingEnabled,pe=Ge.init(this.clippingPlanes,me),pe===!0&&Ge.setGlobalState(this.clippingPlanes,t),D!==null&&Ke.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ct(o,n,t,e),r.add(o)}else ct(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=z.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}we.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let lt=null;function ut(e){lt&&lt(e)}function dt(){pt.stop()}function ft(){pt.start()}let pt=new cs;pt.setAnimationLoop(ut),typeof self<`u`&&pt.setContext(self),this.setAnimationLoop=function(e){lt=e,tt.setAnimationLoop(e),e===null?pt.stop():pt.start()},tt.addEventListener(`sessionstart`,dt),tt.addEventListener(`sessionend`,ft),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=tt.enabled===!0&&tt.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(t),t=tt.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=We.get(e,C.length),x.init(t),x.state.textureUnits=Ne.getTextureUnits(),C.push(x),he.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),fe.setFromProjectionMatrix(he,zt,t.reversedDepth),me=this.localClippingEnabled,pe=Ge.init(this.clippingPlanes,me),b=Ue.get(e,S.length),b.init(),S.push(b),tt.enabled===!0&&tt.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&mt(e,t,-1/0,T.sortObjects)}mt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ce,le),ye=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,ye&&qe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&Ge.beginShadows();let i=x.state.shadowsArray;if(Ke.render(i,e,t),pe===!0&&Ge.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];gt(n,r,e,a)}ye&&qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ht(b,e,n,n.viewport)}}else r.length>0&&gt(n,r,e,t),ye&&qe.render(e),ht(b,e,t)}N!==null&&M===0&&(Ne.updateMultisampleRenderTarget(N),Ne.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Qe.resetDefaultState(),ee=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],Ne.setTextureUnits(x.state.textureUnits),pe===!0&&Ge.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function mt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(fe)){r&&_e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(he);let i=Le.update(e),a=e.material;a.visible&&b.push(e,i,a,n,_e.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(fe))){let i=Le.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),_e.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),_e.copy(e.boundingSphere.center)),_e.applyMatrix4(e.matrixWorld).applyMatrix4(he)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,_e.z,s,t)}}else a.visible&&b.push(e,i,a,n,_e.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)mt(i[e],t,n,r)}function ht(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),pe===!0&&Ge.setGlobalState(T.clippingPlanes,n),r&&R.viewport(P.copy(r)),i.length>0&&_t(i,t,n),a.length>0&&_t(a,t,n),o.length>0&&_t(o,t,n),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function gt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=we.has(`EXT_color_buffer_half_float`)||we.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new On(1,1,{generateMipmaps:!0,type:e?Oe:Se,minFilter:xe,samples:Math.max(4,Ee.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:hn.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||P;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),ye&&qe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),pe===!0&&Ge.setGlobalState(T.clippingPlanes,r),_t(e,n,r),Ne.updateMultisampleRenderTarget(a),Ne.updateRenderTargetMipmap(a),we.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,vt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ne.updateMultisampleRenderTarget(a),Ne.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function _t(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&vt(o,t,n,s,l,c)}}function vt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function yt(e,t,n){t.isScene!==!0&&(t=ve);let r=z.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Re.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Re.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Pe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,at),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return xt(e,s),d}else s.uniforms=Re.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Re.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ge.uniform),xt(e,s),r.needsLights=Tt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function bt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=rl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function xt(e,t){let n=z.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function St(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function Ct(e,t,n,r,i){t.isScene!==!0&&(t=ve),Ne.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:hn.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Pe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=z.get(r),y=x.state.lights;if(pe===!0&&(me===!0||e!==te)){let t=e===te&&r.id===ee;Ge.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ge.numPlanes||v.numIntersection!==Ge.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=yt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(R.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ee&&(ee=r.id,w=!0),v.needsLights){let e=St(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||te!==e){R.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(L,`projectionMatrix`,e.projectionMatrix),O.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(L,ge.setFromMatrixPosition(e.matrixWorld)),Ee.logarithmicDepthBuffer&&O.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(L,`sunShadowMap`,y.state.sunShadowMap,Ne),y.state.directionalShadowMap.length>0&&O.setValue(L,`directionalShadowMap`,y.state.directionalShadowMap,Ne),y.state.spotShadowMap.length>0&&O.setValue(L,`spotShadowMap`,y.state.spotShadowMap,Ne),y.state.pointShadowMap.length>0&&O.setValue(L,`pointShadowMap`,y.state.pointShadowMap,Ne)),i.isSkinnedMesh){O.setOptional(L,i,`bindMatrix`),O.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(L,`boneTexture`,e.boneTexture,Ne))}i.isBatchedMesh&&(O.setOptional(L,i,`batchingTexture`),O.setValue(L,`batchingTexture`,i._matricesTexture,Ne),O.setOptional(L,i,`batchingIdTexture`),O.setValue(L,`batchingIdTexture`,i._indirectTexture,Ne),O.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(L,`batchingColorTexture`,i._colorsTexture,Ne));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Je.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=wu()),w){if(O.setValue(L,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&wt(k,E),a&&r.fog===!0&&Be.refreshFogUniforms(k,a),Be.refreshMaterialUniforms(k,r,se,F,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}rl.upload(L,bt(v),k,Ne)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(rl.upload(L,bt(v),k,Ne),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(L,`center`,i.center),O.setValue(L,`modelViewMatrix`,i.modelViewMatrix),O.setValue(L,`normalMatrix`,i.normalMatrix),O.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];$e.update(n,S),$e.bind(n,S)}}return S}function wt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Tt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=z.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),z.get(e.texture).__webglTexture=t,z.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=z.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=z.get(e);if(o.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,R.viewport(P),R.scissor(ne),R.setScissorTest(re),ee=-1;return}if(o.__webglFramebuffer===void 0)Ne.setupRenderTarget(e);else if(o.__hasExternalTextures)Ne.rebindTextures(e,z.get(e.texture).__webglTexture,z.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&z.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ne.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=z.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ne.useMultisampledRTT(e)===!1?z.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else P.copy(ue).multiplyScalar(se).floor(),ne.copy(I).multiplyScalar(se).floor(),re=de;if(n!==0&&(r=O),R.bindFramebuffer(L.FRAMEBUFFER,r)&&R.drawBuffers(e,r),R.viewport(P),R.scissor(ne),R.setScissorTest(re),i){let r=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=z.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}ee=-1};function Et(e){let t=z.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ee.textureFormatReadable(e.format),t.__typeReadable=Ee.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){R.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let u=Et(o);if(u.__formatReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,Ze.convert(c),Ze.convert(l),a)}finally{let e=N===null?null:z.get(N).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){R.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let d=Et(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,Ze.convert(l),Ze.convert(u),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let p=N===null?null:z.get(N).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,p);let m=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Jt(L,m,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(f),L.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ne.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),R.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ze.convert(t.format),_=Ze.convert(t.type),v;t.isData3DTexture?(Ne.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ne.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(Ne.setTexture2D(t,0),v=L.TEXTURE_2D),R.activeTexture(L.TEXTURE0),R.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),R.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),R.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=R.getParameter(L.UNPACK_ROW_LENGTH),b=R.getParameter(L.UNPACK_IMAGE_HEIGHT),x=R.getParameter(L.UNPACK_SKIP_PIXELS),S=R.getParameter(L.UNPACK_SKIP_ROWS),C=R.getParameter(L.UNPACK_SKIP_IMAGES);R.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),R.pixelStorei(L.UNPACK_SKIP_PIXELS,l),R.pixelStorei(L.UNPACK_SKIP_ROWS,u),R.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=z.get(e),r=z.get(t),h=z.get(n.__renderTarget),g=z.get(r.__renderTarget);R.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,o,s,f,p,o,s,L.DEPTH_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||z.has(e)){let n=z.get(e),r=z.get(t);R.bindFramebuffer(L.READ_FRAMEBUFFER,k),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,o,s,f,p,o,s,L.COLOR_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);R.pixelStorei(L.UNPACK_ROW_LENGTH,y),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),R.pixelStorei(L.UNPACK_SKIP_PIXELS,x),R.pixelStorei(L.UNPACK_SKIP_ROWS,S),R.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&L.generateMipmap(v),R.unbindTexture()},this.initRenderTarget=function(e){z.get(e).__webglFramebuffer===void 0&&Ne.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ne.setTextureCube(e,0):e.isData3DTexture?Ne.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ne.setTexture2DArray(e,0):Ne.setTexture2D(e,0),R.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,R.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return zt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=hn._getDrawingBufferColorSpace(e),t.unpackColorSpace=hn._getUnpackColorSpace()}},Eu=1234567,Du=()=>(Eu^=Eu<<13,Eu^=Eu>>>17,Eu^=Eu<<5,(Eu>>>0)/4294967296*2-1),Ou=e=>{Eu=e>>>0||1},J=(e,t)=>new Float32Array(Math.max(1,Math.floor(e*t))),ku=(e,t=1)=>{for(let n=0;n<e.length;n++)e[n]+=Du()*t;return e},Au=(e,t=1)=>{let n=0,r=0,i=0,a=0,o=0,s=0,c=0;for(let l=0;l<e.length;l++){let u=Du();n=.99886*n+u*.0555179,r=.99332*r+u*.0750759,i=.969*i+u*.153852,a=.8665*a+u*.3104856,o=.55*o+u*.5329522,s=-.7616*s-u*.016898,e[l]+=(n+r+i+a+o+s+c+u*.5362)*.11*t,c=u*.115926}return e},ju=(e,t=1)=>{let n=0;for(let r=0;r<e.length;r++)n=(n+.02*Du())/1.02,e[r]+=n*3.5*t;return e},Mu=(e,t,n,r,i=.707,a=0)=>{let o=0,s=0,c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=e.length,g=typeof r==`number`,_=e=>{let r=2*Math.PI*Math.min(e,t*.45)/t,o=Math.cos(r),s=Math.sin(r)/(2*i),c=1;switch(n){case`lp`:u=(1-o)/2,d=1-o,f=(1-o)/2,c=1+s,p=-2*o,m=1-s;break;case`hp`:u=(1+o)/2,d=-(1+o),f=(1+o)/2,c=1+s,p=-2*o,m=1-s;break;case`bp`:u=s,d=0,f=-s,c=1+s,p=-2*o,m=1-s;break;case`peak`:{let e=10**(a/40);u=1+s*e,d=-2*o,f=1-s*e,c=1+s/e,p=-2*o,m=1-s/e;break}}u/=c,d/=c,f/=c,p/=c,m/=c};g&&_(r);for(let t=0;t<h;t++){!g&&!(t&31)&&_(r(t/h));let n=e[t],i=u*n+d*o+f*s-p*c-m*l;s=o,o=n,l=c,c=i,e[t]=i}return e},Nu=(e,t,n,r,i=4)=>{let a=Math.max(1,Math.floor(n*t)),o=Math.max(1,Math.floor(r*t));for(let t=0;t<e.length;t++){let n;if(t<a)n=t/a;else{let e=(t-a)/o;n=e>=1?0:Math.exp(-i*e)*(1-e)}e[t]*=n}return e},Pu=(e,t,n,r,i=0,a=-1,o=.002,s=5,c=`sin`)=>{let l=Math.floor(i*t),u=a<0?e.length-l:Math.min(e.length-l,Math.floor(a*t)),d=0,f=Math.max(1,Math.floor(o*t));for(let i=0;i<u;i++){let a=i/u,o=typeof n==`number`?n:n(a);d+=2*Math.PI*o/t;let p;switch(c){case`sin`:p=Math.sin(d);break;case`tri`:p=2/Math.PI*Math.asin(Math.sin(d));break;case`saw`:p=d/Math.PI%2-1;break;default:p=Math.sin(d)>0?1:-1}let m=(i<f?i/f:1)*Math.exp(-s*a)*(1-a);e[l+i]+=p*r*m}return e},Fu=(e,t,n,r,i=0,a=1,o=3.5,s=3,c=5)=>{let l=Math.floor(i*t),u=Math.min(e.length-l,Math.floor(a*t)),d=0,f=0;for(let i=0;i<u;i++){let a=i/u;f+=2*Math.PI*n*o/t;let p=s*Math.exp(-c*1.6*a);d+=2*Math.PI*n/t;let m=Math.sin(d+p*Math.sin(f)),h=Math.min(1,i/(.002*t))*Math.exp(-c*a)*(1-a);e[l+i]+=m*r*h}return e},Iu=(e,t,n,r,i,a,o=.0015)=>{for(let s=0;s<n;s++){let n=r+(Du()+1)/2*(i-r),s=Math.floor(n*t),c=Math.max(2,Math.floor(o*t*(.5+(Du()+1)/2))),l=a*(.4+(Du()+1)*.3);for(let t=0;t<c&&s+t<e.length;t++)e[s+t]+=Du()*l*(1-t/c)}return e},Lu=(e,t)=>{for(let n=0;n<e.length;n++)e[n]*=t;return e},Ru=(e,t,n=1,r=0)=>{for(let i=0;i<t.length&&i+r<e.length;i++)e[i+r]+=t[i]*n;return e},zu=(e,t=.9)=>{let n=0;for(let t=0;t<e.length;t++)n=Math.max(n,Math.abs(e[t]));return n>0&&Lu(e,t/n),e},Bu=(e,t=2)=>{let n=Math.tanh(t);for(let r=0;r<e.length;r++)e[r]=Math.tanh(e[r]*t)/n;return e},Vu=(e,t,n=.25)=>{let r=Math.floor(n*t),i=new Float32Array(e.length-r);for(let t=0;t<i.length;t++)i[t]=e[t];for(let t=0;t<r;t++){let n=t/r;i[t]=e[t]*n+e[i.length+t]*(1-n)}return i},Hu=()=>Du(),Uu=e=>({tick:()=>{Ou(11);let t=J(e,.05);return Pu(t,e,1800,.5,0,.03,.001,9),Iu(t,e,1,0,.001,.4),Mu(t,e,`hp`,600),[zu(t,.35)]},back:()=>{let t=J(e,.08);return Pu(t,e,e=>1200-e*500,.5,0,.07,.002,7),[zu(t,.3)]},open:()=>{Ou(13);let t=J(e,.22);return ku(t,.4),Mu(t,e,`bp`,e=>800+e*3e3,1.2),Nu(t,e,.04,.15,3),Pu(t,e,e=>600+e*300,.3,0,.18,.01,5),[zu(t,.3)]},buy:()=>{let t=J(e,.6);return Fu(t,e,1318,.5,0,.5,2,1.5,6),Fu(t,e,1760,.5,.08,.5,2,1.5,6),Fu(t,e,2637,.4,.16,.4,2,1.2,7),[zu(t,.5)]},unlock:()=>{let t=J(e,.9);return[523,659,784,1047].forEach((n,r)=>Fu(t,e,n,.5,r*.07,.7,2.01,1.6,5)),[zu(t,.5)]},error:()=>{let t=J(e,.22);return Pu(t,e,180,.6,0,.09,.003,4,`sqr`),Pu(t,e,150,.6,.11,.1,.003,4,`sqr`),Mu(t,e,`lp`,1400),[zu(t,.3)]},toggle:()=>{let t=J(e,.06);return Pu(t,e,900,.5,0,.05,.001,8,`tri`),[zu(t,.3)]},star:()=>[0,1,2].map(t=>{let n=J(e,.8),r=[1047,1319,1568][t];return Fu(n,e,r,.6,0,.7,2,2.2,5),Fu(n,e,r*2,.2,.01,.4,3.5,1.2,7),zu(n,.55)}),best:()=>{let t=J(e,1.2);return[784,988,1175,1568].forEach((n,r)=>Fu(t,e,n,.5,r*.09,.9,2,1.8,4)),[zu(t,.55)]},coin:()=>{let t=J(e,.3);return Fu(t,e,1976,.5,0,.25,2.4,1.5,9),Fu(t,e,2637,.5,.05,.22,2.4,1.5,9),[zu(t,.4)]},count:()=>{let t=J(e,.25);return Pu(t,e,880,.5,0,.18,.003,4,`tri`),Pu(t,e,1760,.15,0,.12,.003,6),[zu(t,.4)]},go:()=>{let t=J(e,.7);return Pu(t,e,1320,.5,0,.6,.003,2.5,`tri`),Pu(t,e,660,.3,0,.6,.003,2.5,`saw`),Mu(t,e,`lp`,3500),[zu(t,.45)]},pop:()=>[0,1].map(t=>{Ou(30+t);let n=J(e,.18);return Pu(n,e,e=>140+e*60,.7,0,.1,.002,6),ku(n,.25),Mu(n,e,`lp`,2500),Nu(n,e,.002,.12,6),Iu(n,e,3,0,.03,.25),zu(n,.5)}),land:()=>[0,1,2].map(t=>{Ou(40+t);let n=J(e,.4);Pu(n,e,e=>75-e*25,.9,0,.18,.002,7);let r=J(e,.4);return ku(r,.9),Mu(r,e,`bp`,2400+t*400,.8),Nu(r,e,.004,.3,5),Ru(n,r,.45),Iu(n,e,14,.01,.25,.25,.0012),zu(n,.7)}),landHard:()=>{Ou(50);let t=J(e,.6);Pu(t,e,e=>60-e*20,1,0,.3,.002,6);let n=J(e,.6);return Au(n,1),Mu(n,e,`lp`,1800),Nu(n,e,.003,.45,4),Ru(t,n,.6),Iu(t,e,3,0,.05,.6,.004),Bu(t,1.6),[zu(t,.8)]},whoosh:()=>[0,1].map(t=>{Ou(60+t);let n=J(e,.45);return ku(n,1),Mu(n,e,`bp`,e=>400+Math.sin(e*Math.PI)*1800,1.4),Nu(n,e,.15,.28,2),zu(n,.45)}),whip:()=>{Ou(70);let t=J(e,.5);return ku(t,1),Mu(t,e,`bp`,e=>600+Math.sin(e*Math.PI)*2400,2),Nu(t,e,.08,.38,2),Iu(t,e,24,.05,.42,.18,7e-4),[zu(t,.5)]},barspin:()=>{Ou(71);let t=J(e,.4);Iu(t,e,30,0,.35,.35,6e-4),Mu(t,e,`hp`,1800);let n=J(e,.4);return ku(n,.6),Mu(n,e,`bp`,2600,3),Nu(n,e,.05,.3,2),Ru(t,n,.5),[zu(t,.4)]},token:()=>{let t=J(e,.9);return Fu(t,e,1568,.6,0,.8,2,2.5,4),Fu(t,e,2349,.45,.06,.7,2,2,4),Fu(t,e,3136,.3,.12,.6,2,1.5,5),[zu(t,.6)]},gap:()=>{Ou(80);let t=J(e,1.4),n=J(e,1.4);return Au(n,1),Mu(n,e,`bp`,1100,.6),Nu(n,e,.25,1,2),Ru(t,n,.5),[988,1245,1480].forEach((n,r)=>Fu(t,e,n,.35,.02*r,.9,2,1.5,4)),[zu(t,.6)]},bail:()=>{Ou(90);let t=J(e,1);Pu(t,e,e=>90-e*40,1,0,.35,.002,5);let n=J(e,1);return ju(n,1),Mu(n,e,`lp`,900),Nu(n,e,.01,.8,3),Ru(t,n,.9),Iu(t,e,30,.02,.8,.35,.002),Fu(t,e,420,.25,.12,.4,2.7,4,8),Fu(t,e,610,.18,.31,.3,2.7,4,8),[zu(t,.75)]},cheer:()=>{Ou(100);let t=J(e,2.6);for(let n=0;n<4;n++){let r=J(e,2.6);Au(r,1),Mu(r,e,`bp`,700+n*450,1.1);for(let t=0;t<r.length;t++)r[t]*=.6+.4*Math.sin(t/(e*(.11+n*.03))+n);Ru(t,r,.4)}return Nu(t,e,.35,2,2),Pu(t,e,e=>2200+Math.sin(e*30)*200,.08,.5,.5,.05,2),[zu(t,.5)]},perfect:()=>{let t=J(e,.5);return Fu(t,e,2093,.5,0,.45,2,1.5,6),Fu(t,e,3136,.35,.05,.4,2,1.2,7),[zu(t,.45)]},chain:()=>[0,1,2,3,4,5,6,7].map(t=>{let n=J(e,.35),r=523*2**([0,2,4,5,7,9,11,12][t]/12);return Fu(n,e,r,.5,0,.3,2,1.4,7),Fu(n,e,r*1.5,.25,.03,.25,2,1,8),zu(n,.4)}),lost:()=>{let t=J(e,.5);return Pu(t,e,e=>440-e*220,.5,0,.45,.005,3,`tri`),Mu(t,e,`lp`,1800),[zu(t,.35)]},finish:()=>{Ou(110);let t=J(e,2.2);Pu(t,e,523,.4,0,1.6,.01,2,`saw`),Pu(t,e,659,.35,0,1.6,.01,2,`saw`),Pu(t,e,784,.35,0,1.6,.01,2,`saw`),Mu(t,e,`lp`,2200);let n=J(e,2.2);return Au(n,1),Mu(n,e,`bp`,900,.7),Nu(n,e,.2,1.8,2),Ru(t,n,.5),[zu(t,.6)]},wood:()=>[0,1].map(t=>{Ou(120+t);let n=J(e,.2);return Pu(n,e,180+t*40,.8,0,.12,.001,8,`tri`),Iu(n,e,4,0,.06,.4,.002),Mu(n,e,`bp`,600,1.2),zu(n,.5)}),pedal:()=>{Ou(130);let t=J(e,.12);return Iu(t,e,6,0,.08,.3,8e-4),Mu(t,e,`hp`,2e3),[zu(t,.2)]}}),Wu=e=>({roll:()=>{Ou(200);let t=J(e,2);return Au(t,1),Mu(t,e,`lp`,1400),Iu(t,e,120,0,2,.12,.0015),Vu(zu(t,.7),e,.2)},hub:()=>{Ou(210);let t=J(e,1);for(let n=0;n<36;n++){let r=Math.floor(n/36*e);for(let e=0;e<90&&!(r+e>=t.length);e++)t[r+e]+=Math.sin(e*.9)*Math.exp(-e/14)*(.8+Hu()*.1)}return Mu(t,e,`hp`,1500),Mu(t,e,`peak`,4200,1.5,6),zu(t,.6)},wind:()=>{Ou(220);let t=J(e,3);Au(t,1),Mu(t,e,`bp`,600,.5);for(let n=0;n<t.length;n++)t[n]*=.75+.25*Math.sin(n/e*2.1)*Math.sin(n/e*.7);return Vu(zu(t,.7),e,.4)},rattle:()=>{Ou(235);let t=J(e,2);for(let n=0;n<46;n++){let n=Math.floor(Hu()*(t.length-2e3)),r=Hu()<.3,i=r?.9:.35+Hu()*.3,a=r?90+Hu()*60:300+Hu()*600;for(let o=0;o<(r?1800:500);o++)t[n+o]+=Math.sin(o/e*Math.PI*2*a)*Math.exp(-o/(r?420:90))*i}return Iu(t,e,18,0,2,.25,8e-4),Mu(t,e,`lp`,3200),Vu(zu(t,.75),e,.1)},skid:()=>{Ou(230);let t=J(e,1);return ku(t,1),Mu(t,e,`bp`,1800,.9),Iu(t,e,80,0,1,.3,.001),Vu(zu(t,.6),e,.15)},amb:()=>{Ou(240);let t=J(e,6);ju(t,1),Mu(t,e,`lp`,500);let n=J(e,6);Au(n,1),Mu(n,e,`bp`,1400,.4);for(let t=0;t<n.length;t++)n[t]*=.35+.65*Math.max(0,Math.sin(t/e*.9+1));return Ru(t,n,.35),Pu(t,e,e=>2600+Math.sin(e*90)*300,.04,1.6,.25,.02,3),Pu(t,e,e=>2900-e*400,.03,4.2,.18,.02,3),Vu(zu(t,.5),e,.6)},crowd:()=>{Ou(250);let t=J(e,4);for(let n=0;n<3;n++){let r=J(e,4);Au(r,1),Mu(r,e,`bp`,600+n*500,.9);for(let t=0;t<r.length;t++)r[t]*=.7+.3*Math.sin(t/(e*(.17+n*.05)));Ru(t,r,.5)}return Vu(zu(t,.5),e,.5)}}),Gu={mesa:{root:45,bpm:92,prog:[[0,7,10,14,15],[-4,3,7,11,14],[3,10,14,19],[-2,5,9,14,17]]},pines:{root:43,bpm:88,prog:[[0,7,11,14,16],[5,9,12,16],[-3,4,7,11,14],[2,9,12,17]]},town:{root:48,bpm:96,prog:[[0,4,11,14],[-3,7,12,15],[2,9,12,17],[-5,5,9,14]]},glacier:{root:40,bpm:84,prog:[[0,7,10,14,15],[-2,5,9,14],[-4,7,11,15],[-5,2,7,10,14]]},ember:{root:41,bpm:98,prog:[[0,7,10,15],[1,8,12,15],[-2,5,10,13],[-4,3,8,12]]}},Ku=e=>440*2**((e-69)/12),qu=(e,t)=>{let n=Gu[t]??Gu.mesa,r=60/n.bpm,i=32*r,a=J(e,i+.01),o=J(e,i+.01),s=(t,n,r,i=1)=>{let s=Math.floor(r*e),c=i*Math.cos((n+1)*Math.PI/4),l=i*Math.sin((n+1)*Math.PI/4);for(let e=0;e<t.length;e++){let n=(s+e)%a.length;a[n]+=t[e]*c,o[n]+=t[e]*l}};Ou(t.length*97+5);let c=(()=>{let t=J(e,.5);return Pu(t,e,e=>120*Math.exp(-e*5)+45,1,0,.42,.001,5),zu(t,.9)})(),l=(()=>{let t=J(e,.4);return ku(t,.8),Mu(t,e,`bp`,1900,.7),Nu(t,e,.001,.22,5),Pu(t,e,190,.5,0,.1,.001,6),Mu(t,e,`lp`,6e3),zu(t,.55)})(),u=(()=>{let t=J(e,.08);return ku(t,1),Mu(t,e,`hp`,7e3),Nu(t,e,.001,.05,6),zu(t,.22)})(),d=(()=>{let t=J(e,.12);return ku(t,1),Mu(t,e,`bp`,6e3,1.4),Nu(t,e,.02,.08,3),zu(t,.12)})();for(let e=0;e<8;e++){let t=e*4*r,n=r*.06;s(c,0,t,.9),s(c,0,t+1.5*r+n,.7),s(c,0,t+2*r,.85),e%4==3&&s(c,0,t+3.5*r+n,.6),s(l,.05,t+r,.75),s(l,.05,t+3*r,.75);for(let e=0;e<8;e++){let i=t+e*r/2+(e%2?n:0);s(u,.35,i,e%2?.55:.85+Hu()*.1),e%2&&s(d,-.4,i+r*.25,.6)}}let f=(t,r,i,a)=>{t.forEach((o,c)=>{let l=Ku(n.root+12+o),u=J(e,i+.6);Fu(u,e,l,.5,0,i+.5,1,1.2,2.2),Pu(u,e,l*2,.06,0,i,.004,3),Mu(u,e,`lp`,2600),s(u,c/(t.length-1)*.6-.3,r+c*.012,a*.16)})};for(let e=0;e<8;e++){let t=n.prog[e%4],i=e*4*r;f(t,i,r*2.2,1),f(t,i+2.5*r+r*.06,r*1.4,.75)}for(let t=0;t<8;t++){let i=n.prog[t%4],a=t*4*r,o=n.root-12+i[0],c=[[0,o,1.3],[1.5,o,.45],[2,o+7,.9],[3,o+(t%2?10:12),.8]];for(let[t,n,i]of c){let o=J(e,i*r+.1);Pu(o,e,Ku(n),.9,0,i*r,.006,3,`tri`),Pu(o,e,Ku(n)*2,.12,0,i*r*.6,.006,5,`sin`),Mu(o,e,`lp`,700),s(o,0,a+t*r+(t%1?r*.06:0),.42)}}let p=[0,3,5,7,10,12,15];for(let t=1;t<8;t+=2){let i=t*4*r;for(let t=0;t<3;t++){let a=n.root+24+p[Math.floor((Hu()*.5+.5)*p.length)%p.length],o=J(e,1.2);Fu(o,e,Ku(a),.3,0,1,3,1.6,4),s(o,Hu()*.6,i+(1+t*.75)*r,.07)}}let m=1e-6;for(let e=0;e<a.length;e++)m=Math.max(m,Math.abs(a[e]),Math.abs(o[e]));for(let e=0;e<a.length;e++)a[e]=Math.tanh(a[e]/m*1.3)*.7,o[e]=Math.tanh(o[e]/m*1.3)*.7;return Mu(a,e,`lp`,9e3),Mu(o,e,`lp`,9e3),{L:a,R:o}},Ju=new class{ctx=null;master=null;sfxBus=null;musicBus=null;bank=new Map;loops=new Map;music=null;musicCache=new Map;musicWorld=``;sound=.9;musicVol=.6;started=!1;paused=!1;init(){if(this.ctx){this.ctx.state===`suspended`&&!this.paused&&this.ctx.resume();return}let e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e({latencyHint:`interactive`});let t=this.ctx;this.master=t.createGain(),this.master.connect(t.destination),this.sfxBus=t.createGain(),this.sfxBus.connect(this.master),this.musicBus=t.createGain(),this.musicBus.connect(this.master),this.applyVolumes();let n=Uu(t.sampleRate),r=Object.keys(n),i=0,a=()=>{let e=performance.now();for(;i<r.length&&performance.now()-e<8;){let e=r[i++];this.bank.set(e,n[e]().map(e=>this.toBuffer(e)))}i<r.length?setTimeout(a,0):this.startLoops()};a()}toBuffer(e){let t=this.ctx,n=t.createBuffer(1,e.length,t.sampleRate);return n.copyToChannel(e,0),n}startLoops(){let e=this.ctx,t=Wu(e.sampleRate);for(let n of Object.keys(t)){let r=e.createBufferSource();r.buffer=this.toBuffer(t[n]()),r.loop=!0;let i=e.createBiquadFilter();i.type=`lowpass`,i.frequency.value=8e3;let a=e.createGain();a.gain.value=0,r.connect(i).connect(a).connect(this.sfxBus),r.start(),this.loops.set(n,{src:r,gain:a,filt:i})}this.started=!0}applyVolumes(){this.sfxBus&&this.musicBus&&(this.sfxBus.gain.value=this.sound,this.musicBus.gain.value=this.musicVol*.55)}play(e,t={}){let n=this.ctx;if(!n||this.paused)return;let r=this.bank.get(e);if(!r?.length)return;let i=r[t.variant===void 0?Math.floor(Math.random()*r.length):Math.min(r.length-1,t.variant)],a=n.createBufferSource();a.buffer=i,a.playbackRate.value=(t.rate??1)*(1+(Math.random()-.5)*(t.vary??.06));let o=n.createGain();o.gain.value=t.vol??1;let s=a.connect(o);if(t.pan){let e=n.createStereoPanner();e.pan.value=t.pan,s=s.connect(e)}s.connect(this.sfxBus),a.start(n.currentTime+(t.delay??0))}ride(e){if(!this.started||!this.ctx)return;let t=this.ctx.currentTime,n=(e,n,r,i)=>{let a=this.loops.get(e);a&&(a.gain.gain.setTargetAtTime(n,t,.06),r!==void 0&&a.src.playbackRate.setTargetAtTime(r,t,.05),i!==void 0&&a.filt.frequency.setTargetAtTime(i,t,.08))},r=e.active?e.speed:0,i=e.surface,a=i===`wood`?900:i===`snow`?2600:i===`stone`||i===`rock`?2200:i===`loam`?900:1500;if(n(`roll`,e.ground?Math.min(.55,r*.04):0,.7+r*.03,a),n(`hub`,e.coasting&&e.ground&&r>2?Math.min(.32,.08+r*.015):e.air&&r>2?.22:0,Math.max(.3,r*.09)),n(`wind`,Math.min(.8,r*r/520+(e.air?.18:0)),.8+r*.025,600+r*120),n(`skid`,e.ground?e.sliding*.5:0,1),n(`rattle`,(e.ground?e.rough??0:0)*Math.min(.75,.15+r*.04),.8+r*.035),this.musicBus&&e.flow!==void 0){let n=this.ducked?this.musicVol*.2:this.musicVol*(.55+.25*Math.max(0,(e.flow-.5)*2));Math.abs(n-this.musicK)>.01&&(this.musicK=n,this.musicBus.gain.setTargetAtTime(n,t,.6))}n(`amb`,e.active?.22:.3),n(`crowd`,Math.max(0,e.finishNear)*.55)}setMusic(e){let t=this.ctx;if(!t||e===this.musicWorld)return;this.musicWorld=e??``;let n=this.music;n&&(n.gain.gain.setTargetAtTime(0,t.currentTime,.4),setTimeout(()=>n.src.stop(),2e3),this.music=null),e&&setTimeout(()=>{let n=this.musicCache.get(e);if(!n){let{L:r,R:i}=qu(t.sampleRate,e);n=t.createBuffer(2,r.length,t.sampleRate),n.copyToChannel(r,0),n.copyToChannel(i,1),this.musicCache.set(e,n)}if(this.musicWorld!==e)return;let r=t.createBufferSource();r.buffer=n,r.loop=!0;let i=t.createGain();i.gain.value=0,r.connect(i).connect(this.musicBus),r.start(),i.gain.setTargetAtTime(1,t.currentTime,.8),this.music={src:r,gain:i}},30)}ducked=!1;musicK=-1;duck(e){this.ducked=e,this.ctx&&this.musicBus&&this.musicBus.gain.setTargetAtTime(e?this.musicVol*.2:this.musicVol*.55,this.ctx.currentTime,.3)}pause(){this.paused=!0,this.ctx?.suspend()}resume(){this.paused=!1,this.ctx?.resume()}},Yu=class{el;stick={x:0,y:0,ry:0,active:!1,ox:0,oy:0,cx:0,cy:0};hold=!1;styleQ=null;touches=new Map;keys=new Set;radius=62;invertFlip=!1;swap=!1;fixed=!1;bias=null;enabled=!0;air=!1;onAnyInput=null;constructor(e){this.el=e,e.addEventListener(`pointerdown`,this.down,{passive:!1}),window.addEventListener(`pointermove`,this.move,{passive:!1}),window.addEventListener(`pointerup`,this.up),window.addEventListener(`pointercancel`,this.up),window.addEventListener(`keydown`,this.keyDown),window.addEventListener(`keyup`,this.keyUp)}down=e=>{if(!this.enabled)return;let t=window.innerWidth,n=e.clientX<t*.5===this.swap?`R`:`L`;this.touches.set(e.pointerId,{side:n,x0:e.clientX,y0:e.clientY,x:e.clientX,y:e.clientY,t0:performance.now(),swiped:!1}),n===`L`?(this.stick.active=!0,this.stick.ox=this.stick.cx=e.clientX,this.stick.oy=this.stick.cy=e.clientY,this.stick.x=this.stick.y=this.stick.ry=0):this.hold=!0,this.onAnyInput?.(),e.preventDefault()};move=e=>{let t=this.touches.get(e.pointerId);if(t){if(t.x=e.clientX,t.y=e.clientY,t.side===`L`){let t=this.stick;t.cx=e.clientX,t.cy=e.clientY;let n=e.clientX-t.ox,r=e.clientY-t.oy,i=Math.hypot(n,r);if(!this.fixed&&i>this.radius*1.6){let a=(i-this.radius*1.6)/i;t.ox+=n*a,t.oy+=r*a,n=e.clientX-t.ox,r=e.clientY-t.oy}this.setFrom(n,r)}else if(this.air&&!t.swiped){let e=t.x-t.x0,n=t.y-t.y0,r=performance.now()-t.t0;Math.hypot(e,n)>30&&r<320&&(t.swiped=!0,this.styleQ=Math.abs(e)>Math.abs(n)?`tailwhip`:n<0?`superman`:`nohander`)}e.preventDefault()}};up=e=>{let t=this.touches.get(e.pointerId);if(t){if(this.touches.delete(e.pointerId),t.side===`L`)[...this.touches.values()].find(e=>e.side===`L`)||(this.stick.active=!1,this.stick.x=this.stick.y=this.stick.ry=0);else{let e=performance.now()-t.t0<230&&Math.hypot(t.x-t.x0,t.y-t.y0)<22;this.air&&e&&!t.swiped&&(this.styleQ=`barspin`),this.hold=[...this.touches.values()].some(e=>e.side===`R`)||this.keys.has(` `)}}};saved=null;fixedOrigin(){let e=window.innerWidth,t=window.innerHeight,n=Math.max(96,e*.12);return{x:this.swap?e-n:n,y:t-Math.max(92,t*.26)}}setFrom(e,t){let n=this.stick,r=Xu(e/this.radius),i=Xu(-t/this.radius),a=this.bias;a&&(Math.abs(r)<.15&&Math.abs(i)<.15?this.bias=null:(r=Math.max(-1,Math.min(1,r-a.x)),i=Math.max(-1,Math.min(1,i-a.y)))),n.x=r,n.ry=i,n.y=i*(this.invertFlip?-1:1)}anchor(){let e=this.stick;if(!e.active)this.saved=null;else if(this.fixed){let t=e.cx-e.ox,n=e.cy-e.oy;this.bias=null,this.bias={x:Xu(t/this.radius),y:Xu(-n/this.radius)},e.x=e.y=e.ry=0,this.saved=null}else this.saved={ox:e.ox,oy:e.oy},e.ox=e.cx,e.oy=e.cy,e.x=e.y=e.ry=0}restore(){let e=this.stick,t=this.saved;if(this.saved=null,this.fixed){this.bias=null,e.active&&this.setFrom(e.cx-e.ox,e.cy-e.oy);return}if(!t||!e.active)return;e.ox=t.ox,e.oy=t.oy;let n=e.cx-e.ox,r=e.cy-e.oy;e.x=Xu(n/this.radius),e.ry=Xu(-r/this.radius),e.y=e.ry*(this.invertFlip?-1:1)}keyDown=e=>{if(!this.enabled||e.repeat)return;let t=e.key===` `?` `:e.key.toLowerCase();this.keys.add(t),t===` `&&(this.hold=!0),t===`j`&&(this.styleQ=`tailwhip`),t===`k`&&(this.styleQ=`barspin`),t===`i`&&(this.styleQ=`superman`,this.hold=!0),t===`u`&&(this.styleQ=`nohander`,this.hold=!0),this.onAnyInput?.(),this.keyStick()};keyUp=e=>{let t=e.key===` `?` `:e.key.toLowerCase();this.keys.delete(t),(t===` `||t===`i`||t===`u`)&&(this.hold=this.keys.has(` `)||this.keys.has(`i`)||this.keys.has(`u`)||[...this.touches.values()].some(e=>e.side===`R`)),this.keyStick()};keyStick(){if(this.stick.active)return;let e=(...e)=>e.some(e=>this.keys.has(e));this.stick.x=+!!e(`arrowright`,`d`)-!!e(`arrowleft`,`a`),this.stick.ry=+!!e(`arrowup`,`w`)-!!e(`arrowdown`,`s`),this.stick.y=this.stick.ry*(this.invertFlip?-1:1)}consumeStyle(){let e=this.styleQ;return this.styleQ=null,e}reset(){this.touches.clear(),this.stick.active=!1,this.stick.x=this.stick.y=this.stick.ry=0,this.hold=!1,this.styleQ=null}},Xu=e=>{let t=Math.min(1,Math.abs(e));if(t<.1)return 0;let n=(t-.1)/.9;return Math.sign(e)*(n*(.55+.45*n))},Zu=Math.PI*2,Y=(e,t,n)=>e<t?t:e>n?n:e,Qu=e=>e<0?0:e>1?1:e,$u=(e,t,n)=>e+(t-e)*n,X=(e,t,n)=>{let r=Qu((n-e)/(t-e));return r*r*(3-2*r)},Z=(e,t)=>1-Math.exp(-e*t),ed=(e,t)=>{let n=(t-e)%Zu;return n>Math.PI&&(n-=Zu),n<-Math.PI&&(n+=Zu),n},td=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},nd=[{id:`scout`,name:`Scout`,cls:`trail`,tagline:`Trail bike. Forgiving, quick, ready for anything.`,wheelbase:1.2,wheelR:.36,flipRate:400,spinRate:520,whipTime:.48,barTime:.36,stability:1.1,speed:1,pop:2.1,grip:1,price:0,travel:.14,paint:{frame:`#e8572a`,accent:`#1b1c20`,rims:`#1b1c20`,tires:`black`}},{id:`dart`,name:`Dart`,cls:`bmx`,tagline:`BMX. The fastest spinner in the garage.`,wheelbase:1,wheelR:.26,flipRate:440,spinRate:640,whipTime:.38,barTime:.28,stability:.92,speed:.96,pop:2.4,grip:.95,price:4e3,travel:0,paint:{frame:`#2f6bff`,accent:`#f4eee3`,rims:`#c9ccd2`,tires:`tan`}},{id:`mantis`,name:`Mantis`,cls:`dirt`,tagline:`Dirt jumper. Light, snappy, built for whips.`,wheelbase:1.1,wheelR:.33,flipRate:430,spinRate:580,whipTime:.4,barTime:.32,stability:1,speed:1,pop:2.35,grip:1,price:9e3,travel:0,paint:{frame:`#9be52a`,accent:`#111214`,rims:`#111214`,tires:`black`}},{id:`bison`,name:`Bison`,cls:`dh`,tagline:`Downhill rig. Fastest and most stable. Slower to spin.`,wheelbase:1.28,wheelR:.37,flipRate:360,spinRate:460,whipTime:.52,barTime:.4,stability:1.3,speed:1.06,pop:1.9,grip:1.08,price:16e3,travel:.2,paint:{frame:`#f4eee3`,accent:`#e8572a`,rims:`#111214`,tires:`black`}},{id:`drift`,name:`Drift`,cls:`fat`,tagline:`Fat bike. Huge grip on snow and ice.`,wheelbase:1.18,wheelR:.38,flipRate:380,spinRate:500,whipTime:.5,barTime:.38,stability:1.2,speed:.98,pop:2,grip:1.35,price:24e3,travel:0,paint:{frame:`#7a3cff`,accent:`#ffc23d`,rims:`#ffc23d`,tires:`black`}}],rd=e=>nd.find(t=>t.id===e)??nd[0],id=[{id:`mesa`,name:`Red Mesa`,tagline:`Sandstone ridges, big drops, desert light.`,unlock:0,style:{kind:`ridge`,half:2.7,depth:52,side:1,grade:-.15,trail:`dirt`,sideSurface:`rock`,hill:.62,land:{relief:150,size:420,ridged:.3,terrace:13,ranges:240,summitBias:-45}}},{id:`pines`,name:`Pine Shore`,tagline:`Loam, roots and wooden lines through the forest.`,unlock:9,style:{kind:`bench`,half:2.2,depth:20,side:1,grade:-.13,trail:`loam`,sideSurface:`grass`,hill:.78,land:{relief:210,size:520,ridged:.4,terrace:0,ranges:620,summitBias:-35}}},{id:`town`,name:`Old Town`,tagline:`Whitewashed stairs, rooftops and sea views.`,unlock:20,style:{kind:`street`,half:3,depth:6,side:1,grade:-.12,trail:`stone`,sideSurface:`stone`,hill:.5,land:{relief:95,size:380,ridged:.15,terrace:0,ranges:260,summitBias:-20}}},{id:`glacier`,name:`Whiteout`,tagline:`Snow ridges and ice under a cold sky.`,unlock:32,style:{kind:`ridge`,half:3,depth:60,side:1,grade:-.14,trail:`snow`,sideSurface:`ice`,hill:.85,land:{relief:420,size:620,ridged:.9,terrace:0,ranges:1100,summitBias:-60}}},{id:`ember`,name:`Ember Peak`,tagline:`Black basalt and glowing rivers at dusk.`,unlock:45,style:{kind:`ridge`,half:2.6,depth:70,side:1,grade:-.16,trail:`dirt`,sideSurface:`rock`,hill:.7,land:{relief:170,size:500,ridged:.6,terrace:0,ranges:520,summitBias:-50}}}],ad=[{id:`mesa-1`,world:`mesa`,name:`First Light`,blurb:`Drop off the butte at sunrise. Pump the rollers, send your first tables.`,rival:`Juno`,par:64,goals:[9e3,23500],recipe:{seed:101,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.42},{t:`ridge`,len:44,turn:12},{t:`rollers`,n:3},{t:`table`,size:1},{t:`open`,len:34,turn:-16},{t:`table`,size:2},{t:`berm`,turn:70},{t:`traverse`,len:40,turn:-6},{t:`rollers`,n:4},{t:`drop`,h:3.5},{t:`open`,len:28,turn:-10},{t:`table`,size:2},{t:`run`,len:24},{t:`finish`}]}},{id:`mesa-2`,world:`mesa`,name:`Knife Edge`,blurb:`Off the summit onto a ridge one bike wide. Look ahead, not down.`,rival:`Rex`,par:82,goals:[15e3,39e3],recipe:{seed:202,steps:[{t:`start`},{t:`rollin`,len:18,grade:-.6},{t:`ridge`,len:70,turn:14},{t:`table`,size:2},{t:`step`,size:2,down:3},{t:`ridge`,len:50,turn:-18},{t:`gap`,size:2},{t:`switchbacks`,n:2,leg:24,radius:7.5,dir:1},{t:`slab`,len:24},{t:`drop`,h:5,label:`Sandstone Drop`},{t:`open`,len:28},{t:`gap`,size:3},{t:`run`,len:20},{t:`finish`}]}},{id:`mesa-3`,world:`mesa`,name:`Split Rock`,blurb:`Two lines, one ridge, then a chute full of rock. The hero line pays.`,rival:`Mika`,par:67,goals:[12500,28e3],recipe:{seed:303,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.55},{t:`open`,len:30,turn:-8},{t:`rollers`,n:3},{t:`split`,left:`big`,right:`table`,label:`Split Rock`},{t:`traverse`,len:40,turn:14},{t:`berm`,turn:75},{t:`gap`,size:2},{t:`drop`,h:6,label:`Six Metre Ledge`},{t:`chute`,len:40,grade:-.36,rough:`rocks`},{t:`split`,left:`gap`,right:`rollers`},{t:`table`,size:3},{t:`run`,len:20},{t:`finish`}]}},{id:`mesa-4`,world:`mesa`,name:`Canyon Gap`,blurb:`Switchbacks down the cliff, then everything builds to one jump. Carry your speed.`,rival:`Kai`,par:96,goals:[21500,5e4],recipe:{seed:404,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.6},{t:`ridge`,len:48,turn:10},{t:`table`,size:2},{t:`gap`,size:2},{t:`switchbacks`,n:3,leg:26,radius:7,dir:-1},{t:`slab`,len:26},{t:`drop`,h:5},{t:`step`,size:3,down:4,label:`Mesa Step`},{t:`open`,len:34,turn:-12},{t:`canyon`,label:`Canyon Gap`},{t:`run`,len:30},{t:`table`,size:3},{t:`run`,len:16},{t:`finish`}]}},{id:`mesa-5`,world:`mesa`,name:`The Big Send`,blurb:`From the highest butte: cliff drops, a ridge, switchbacks, a canyon. The whole mesa.`,rival:`Rex`,par:105,goals:[29e3,65e3],recipe:{seed:505,steps:[{t:`start`},{t:`rollin`,len:20,grade:-.7},{t:`ridge`,len:56},{t:`gap`,size:3},{t:`drop`,h:7,label:`The Cliff`},{t:`berm`,turn:80},{t:`gap`,size:3},{t:`ridge`,len:45,turn:-10},{t:`switchbacks`,n:2,leg:26,radius:7.5,dir:1},{t:`step`,size:3,down:5},{t:`drop`,h:9,label:`The Big Send`},{t:`run`,len:22},{t:`canyon`,label:`Mesa Gap`},{t:`run`,len:24},{t:`table`,size:4},{t:`run`,len:16},{t:`finish`}]}},{id:`pines-1`,world:`pines`,name:`Needle Drop`,blurb:`Above the trees, then down a rooty chute into loamy berms and your first wooden kicker.`,rival:`Ash`,par:71,goals:[10500,24500],recipe:{seed:1101,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.5},{t:`open`,len:36,turn:-10},{t:`chute`,len:40,grade:-.34,rough:`roots`},{t:`berm`,turn:70},{t:`rollers`,n:4},{t:`kicker`,size:2},{t:`berm`,turn:-75},{t:`table`,size:2},{t:`traverse`,len:26,turn:12,rough:`roots`},{t:`drop`,h:4,label:`Root Ledge`},{t:`berm`,turn:70},{t:`kicker`,size:3},{t:`run`,len:18},{t:`finish`}]}},{id:`pines-2`,world:`pines`,name:`North Shore`,blurb:`Raised planks and switchbacks through the old forest. Stay on the wood.`,rival:`Ash`,par:76,goals:[12e3,26e3],recipe:{seed:1202,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.5},{t:`traverse`,len:26},{t:`deck`,len:22,h:2.2,label:`Plank Drop`},{t:`switchbacks`,n:2,leg:22,radius:6.5,dir:-1},{t:`bridge`,len:14,label:`Skinny`},{t:`chute`,len:30,grade:-.32,rough:`roots`},{t:`rollers`,n:3},{t:`kicker`,size:2},{t:`berm`,turn:80},{t:`deck`,len:28,h:3.2,label:`Tree Deck`},{t:`run`,len:20},{t:`gap`,size:2},{t:`finish`}]}},{id:`pines-3`,world:`pines`,name:`Fern Gully`,blurb:`A steep root chute into a fast gully, with gaps over the creek.`,rival:`Rex`,par:68,goals:[14500,34e3],recipe:{seed:1303,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.55},{t:`chute`,len:50,grade:-.38,turn:14,rough:`roots`},{t:`gap`,size:2,label:`Creek Gap`},{t:`berm`,turn:-70},{t:`rollers`,n:5},{t:`split`,left:`big`,right:`rollers`,label:`Fern Line`},{t:`berm`,turn:75},{t:`gap`,size:3},{t:`drop`,h:5},{t:`run`,len:18},{t:`kicker`,size:3},{t:`finish`}]}},{id:`pines-4`,world:`pines`,name:`Ladder Line`,blurb:`Skinnies, switchbacks, decks and a long wooden finale.`,rival:`Mika`,par:82,goals:[13e3,25e3],recipe:{seed:1404,steps:[{t:`start`},{t:`bridge`,len:12},{t:`switchbacks`,n:2,leg:24,radius:7,dir:1},{t:`kicker`,size:3},{t:`deck`,len:24,h:2.6},{t:`berm`,turn:-80},{t:`bridge`,len:18,label:`Long Skinny`},{t:`chute`,len:34,grade:-.36,rough:`roots`},{t:`step`,size:3,down:3},{t:`deck`,len:34,h:4,label:`Ladder Drop`},{t:`run`,len:18},{t:`finish`}]}},{id:`pines-5`,world:`pines`,name:`Old Growth`,blurb:`From the bare summit down through the tallest trees. The biggest wood. Full send.`,rival:`Kai`,par:95,goals:[2e4,47500],recipe:{seed:1505,steps:[{t:`start`},{t:`rollin`,len:18,grade:-.6},{t:`open`,len:30,rough:`rocks`},{t:`gap`,size:3},{t:`chute`,len:40,grade:-.38,rough:`roots`},{t:`deck`,len:30,h:3.6,label:`Canopy Deck`},{t:`berm`,turn:80},{t:`kicker`,size:3},{t:`drop`,h:7,label:`Granite Drop`},{t:`switchbacks`,n:2,leg:24,radius:7,dir:-1},{t:`split`,left:`big`,right:`table`},{t:`bridge`,len:16},{t:`gap`,size:4,label:`Old Growth Gap`},{t:`run`,len:18},{t:`finish`}]}},{id:`town-1`,world:`town`,name:`Market Steps`,blurb:`From the castle gate down through the market. Drop the terrace walls.`,rival:`Juno`,par:64,goals:[1e4,3e4],recipe:{seed:2101,wander:.1,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.45},{t:`run`,len:26},{t:`drop`,h:2.5,label:`Market Wall`},{t:`berm`,turn:80,radius:22},{t:`kicker`,size:2},{t:`run`,len:20},{t:`drop`,h:3.5},{t:`berm`,turn:-85,radius:22},{t:`table`,size:2},{t:`kicker`,size:3,label:`Fountain Gap`},{t:`run`,len:18},{t:`finish`}]}},{id:`town-2`,world:`town`,name:`Rooftop Run`,blurb:`Roof to roof above the alleys.`,rival:`Rex`,par:62,goals:[12500,35e3],recipe:{seed:2202,wander:.1,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.5},{t:`run`,len:22},{t:`gap`,size:2,label:`Alley Gap`},{t:`gap`,size:2},{t:`berm`,turn:-80,radius:22},{t:`drop`,h:4,label:`Roof Drop`},{t:`kicker`,size:3},{t:`berm`,turn:80,radius:22},{t:`gap`,size:3,label:`Big Alley`},{t:`run`,len:18},{t:`finish`}]}},{id:`town-3`,world:`town`,name:`Harbour Line`,blurb:`Switchbacks under the castle walls, all the way down to the sea wall.`,rival:`Mika`,par:93,goals:[13e3,27e3],recipe:{seed:2303,wander:.1,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.5},{t:`switchbacks`,n:3,leg:24,radius:7,dir:1},{t:`kicker`,size:2},{t:`berm`,turn:-90,radius:20},{t:`drop`,h:3},{t:`berm`,turn:90,radius:20},{t:`table`,size:3},{t:`berm`,turn:-90,radius:20},{t:`drop`,h:5,label:`Sea Wall`},{t:`gap`,size:3},{t:`finish`}]}},{id:`town-4`,world:`town`,name:`Bell Tower`,blurb:`Past the church, over the square, under the bells.`,rival:`Kai`,par:70,goals:[16e3,39e3],recipe:{seed:2404,wander:.1,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.5},{t:`kicker`,size:2},{t:`drop`,h:4},{t:`berm`,turn:-85,radius:22},{t:`split`,left:`big`,right:`table`,label:`Bell Gap`},{t:`berm`,turn:85,radius:22},{t:`step`,size:3,down:4},{t:`kicker`,size:3},{t:`drop`,h:6,label:`Church Steps`},{t:`run`,len:18},{t:`finish`}]}},{id:`town-5`,world:`town`,name:`Fiesta`,blurb:`The whole town is watching. Give them a show.`,rival:`Rex`,par:83,goals:[18500,48500],recipe:{seed:2505,wander:.1,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.55},{t:`run`,len:18},{t:`gap`,size:3},{t:`berm`,turn:85,radius:22},{t:`drop`,h:5},{t:`kicker`,size:3},{t:`switchbacks`,n:2,leg:22,radius:7,dir:-1},{t:`gap`,size:4,label:`Plaza Gap`},{t:`drop`,h:7,label:`Fiesta Drop`},{t:`run`,len:16},{t:`table`,size:4},{t:`finish`}]}},{id:`glacier-1`,world:`glacier`,name:`First Tracks`,blurb:`Fresh snow off the shoulder of the peak. Float the tables.`,rival:`Juno`,par:62,goals:[12e3,34e3],recipe:{seed:3101,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.45},{t:`open`,len:36},{t:`table`,size:2},{t:`rollers`,n:4},{t:`table`,size:3},{t:`berm`,turn:70},{t:`gap`,size:2},{t:`drop`,h:5,label:`Cornice`},{t:`open`,len:22},{t:`table`,size:3},{t:`finish`}]}},{id:`glacier-2`,world:`glacier`,name:`Ice Spine`,blurb:`A blue-ice arete off the summit, then switchbacks down the face. Smooth hands.`,rival:`Rex`,par:74,goals:[13500,32500],recipe:{seed:3202,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.55},{t:`ridge`,len:60,turn:12},{t:`gap`,size:2},{t:`ridge`,len:50,turn:-14},{t:`step`,size:3,down:4},{t:`switchbacks`,n:2,leg:24,radius:7.5,dir:1},{t:`drop`,h:6,label:`Ice Ledge`},{t:`gap`,size:3},{t:`finish`}]}},{id:`glacier-3`,world:`glacier`,name:`Crevasse`,blurb:`Deep blue cracks across the glacier. Jump them.`,rival:`Mika`,par:60,goals:[14500,35e3],recipe:{seed:3303,steps:[{t:`start`},{t:`rollin`,len:14,grade:-.5},{t:`open`,len:24},{t:`gap`,size:2,depth:14,label:`Small Crevasse`},{t:`rollers`,n:3},{t:`gap`,size:3,depth:18},{t:`berm`,turn:80},{t:`split`,left:`big`,right:`table`},{t:`gap`,size:3,depth:20,label:`Blue Crevasse`},{t:`drop`,h:5},{t:`finish`}]}},{id:`glacier-4`,world:`glacier`,name:`Avalanche Chute`,blurb:`Drop into the couloir. Steep, fast and falling away under you.`,rival:`Kai`,par:66,goals:[19e3,5e4],recipe:{seed:3404,steps:[{t:`start`},{t:`rollin`,len:18,grade:-.65},{t:`chute`,len:60,grade:-.42,rough:`rocks`},{t:`drop`,h:6},{t:`gap`,size:3},{t:`drop`,h:8,label:`Chute Drop`},{t:`berm`,turn:-80},{t:`table`,size:4},{t:`step`,size:3,down:5},{t:`gap`,size:3},{t:`finish`}]}},{id:`glacier-5`,world:`glacier`,name:`Summit Send`,blurb:`From the summit cornice to the glacier floor.`,rival:`Rex`,par:65,goals:[22500,47500],recipe:{seed:3505,steps:[{t:`start`},{t:`rollin`,len:20,grade:-.7},{t:`ridge`,len:36},{t:`drop`,h:8,label:`Summit Cornice`},{t:`gap`,size:3},{t:`ridge`,len:45},{t:`canyon`,label:`Glacier Gap`},{t:`berm`,turn:80},{t:`drop`,h:9},{t:`table`,size:4},{t:`run`,len:16},{t:`finish`}]}},{id:`ember-1`,world:`ember`,name:`Black Sand`,blurb:`Over the crater rim and down fast cinder slopes above the glow.`,rival:`Ash`,par:49,goals:[11e3,29e3],recipe:{seed:4101,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.55},{t:`open`,len:40,grade:-.28},{t:`gap`,size:2},{t:`rollers`,n:4},{t:`gap`,size:3},{t:`berm`,turn:-75},{t:`drop`,h:6,label:`Cinder Drop`},{t:`table`,size:3},{t:`finish`}]}},{id:`ember-2`,world:`ember`,name:`Lava Tube`,blurb:`Basalt spines over a river of fire.`,rival:`Rex`,par:47,goals:[11e3,25500],recipe:{seed:4202,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.6},{t:`ridge`,len:55,turn:-12},{t:`gap`,size:3,depth:22,label:`Lava Gap`},{t:`ridge`,len:40},{t:`drop`,h:7},{t:`berm`,turn:80},{t:`gap`,size:3},{t:`finish`}]}},{id:`ember-3`,world:`ember`,name:`Fault Line`,blurb:`The ground broke here. Switchbacks down the scarp, then pick your side.`,rival:`Mika`,par:69,goals:[17e3,43e3],recipe:{seed:4303,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.55},{t:`open`,len:24},{t:`split`,left:`big`,right:`gap`,label:`Fault Gap`},{t:`drop`,h:6},{t:`switchbacks`,n:2,leg:24,radius:7,dir:1},{t:`split`,left:`gap`,right:`big`},{t:`step`,size:3,down:5},{t:`gap`,size:4},{t:`finish`}]}},{id:`ember-4`,world:`ember`,name:`Obsidian`,blurb:`Glass-black cliffs and slabs. Huge, clean drops.`,rival:`Kai`,par:61,goals:[24e3,54e3],recipe:{seed:4404,steps:[{t:`start`},{t:`rollin`,len:16,grade:-.6},{t:`drop`,h:7},{t:`gap`,size:3},{t:`slab`,len:28},{t:`drop`,h:9,label:`Obsidian Wall`},{t:`berm`,turn:80},{t:`table`,size:4},{t:`drop`,h:8},{t:`canyon`,label:`Glass Canyon`},{t:`finish`}]}},{id:`ember-5`,world:`ember`,name:`Eruption`,blurb:`The last line, from the crater to the coast. Everything you have.`,rival:`Rex`,par:87,goals:[27500,59500],recipe:{seed:4505,steps:[{t:`start`},{t:`rollin`,len:20,grade:-.7},{t:`run`,len:20},{t:`gap`,size:4},{t:`drop`,h:9,label:`Crater Rim`},{t:`ridge`,len:40},{t:`canyon`,label:`Lava Canyon`},{t:`berm`,turn:-80},{t:`switchbacks`,n:2,leg:24,radius:7.5,dir:1},{t:`step`,size:3,down:6},{t:`drop`,h:10,label:`Eruption`},{t:`table`,size:4},{t:`finish`}]}}],od=e=>id.find(t=>t.id===e)??id[0],sd=e=>ad.find(t=>t.id===e),cd=e=>ad.filter(t=>t.world===e),ld=class e{a;b;c;d;constructor(e){this.a=2654435769,this.b=608135816,this.c=3084996962,this.d=e>>>0;for(let e=0;e<16;e++)this.next()}next(){let{a:e,b:t,c:n,d:r}=this;e>>>=0,t>>>=0,n>>>=0,r>>>=0;let i=e+t|0;return e=t^t>>>9,t=n+(n<<3)|0,n=n<<21|n>>>11,r=r+1|0,i=i+r|0,n=n+i|0,this.a=e,this.b=t,this.c=n,this.d=r,(i>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return e+Math.floor(this.next()*(t-e+1))}chance(e){return this.next()<e}sign(){return this.next()<.5?-1:1}pick(e){return e[Math.floor(this.next()*e.length)]}weighted(e){let t=0;for(let n in e)t+=Math.max(0,e[n]??0);let n=this.next()*t,r;for(let t in e){let i=Math.max(0,e[t]??0);if(!(i<=0)&&(r=t,n-=i,n<=0))return t}return r}gauss(){return(this.next()+this.next()+this.next()+this.next()-2)*1.732}fork(){return new e(this.next()*4294967296>>>0)}},ud=(e,t,n,r)=>{if(n===1/0)return 1;let i=Math.abs(e-t)-n;if(i<=0)return 1;if(i>=r)return 0;let a=i/r;return 1-a*a*(3-2*a)},dd=(e,t,n)=>{let r=Math.max(n-Math.abs(e-t),0)/n;return Math.max(e,t)+r*r*n/4},fd=.5,pd=class{spec;kind;s0;s1;reach=0;keys;assist;label;lipS;knuckleS;tangentS;landEndS;pw;vx;tanLip;xk;xt;yt;mt;constructor(e){this.spec=e;let{s0:t,kLen:n,kH:r,lip:i,vDesign:a,kd:o}=e;this.kind=e.kind??`jump`,this.s0=t,this.lipS=t+n,this.vx=a*Math.cos(i),this.tanLip=Math.tan(i);let s=9.81/(2*this.vx*this.vx),c=this.tanLip*this.tanLip-4*s*(o+fd);this.xk=(this.tanLip+Math.sqrt(Math.max(0,c)))/(2*s),this.xt=this.xk+2.8,this.yt=this.flight(this.xt)-fd,this.mt=this.tanLip-2*s*this.xt,this.knuckleS=this.lipS+this.xk,this.tangentS=this.lipS+this.xt,this.landEndS=this.tangentS+Math.min(60,(Math.abs(this.yt)+e.kH+8)/Math.max(.25,-this.mt)+10),this.s1=this.landEndS,this.pw=Math.max(1.2,n*(this.tanLip-e.lineSlope)/Math.max(.15,r)),this.keys=[this.lipS,this.knuckleS],this.assist={a0:t-45,a1:this.lipS,v:a,y:e.lipY},this.label=e.label,this.dc=e.dc}dc;flight(e){return e*this.tanLip-9.81*e*e/(2*this.vx*this.vx)}landing(e){return e<=this.xt?this.flight(e)-fd:this.yt+this.mt*(e-this.xt)}shape(e,t){let{kLen:n,kH:r,kd:i,fill:a,depth:o,lipY:s}=this.spec,c=e-this.s0;if(c<=0)return t;if(c<=n)return t+r*(c/n)**+this.pw;let l=c-n;if(l<this.xk){let e=s+i;if(a===`table`){let n=X(0,1.2,l);return Math.max(t,s+(e-s)*n-.08*Math.sin(l/this.xk*Math.PI))}let n=e-o,r=Math.max(1,(s-n)*(a===`void`?.18:.3)),c=this.spec.openUnder?Math.min(t,n):s-(s-n)*X(0,r,l),u=e-(e-n)*X(0,r*.8,this.xk-l);return Math.max(c,u)}let u=l-this.xk,d=s+this.landing(l);if(u<1.2){let e=u/1.2;d=s+i+(this.landing(l)-i)*e*e*(1+0*e)}return dd(d,t,.7)}ground(e,t,n,r){if(e<=this.s0||e>=this.s1)return n;let i=this.shape(e,r)-r;return i>=0?n+i*ud(t,this.spec.dc,this.spec.hw,this.spec.skirt):n+i*ud(t,this.spec.dc,this.spec.trenchHw??this.spec.hw+1.2,this.spec.skirt*.6)}},md=(e,t)=>1.8*e/Math.tan(t*Math.PI/180),hd=e=>{let t=e.kind===`drop`?5:md(e.kH,e.lipDeg);return new pd({s0:e.s0,kLen:t,kH:e.kH,lip:e.lipDeg*Math.PI/180,vDesign:e.v,kd:Math.min(0,e.kd),lipY:e.lineAtLip+e.kH,lineSlope:e.lineSlope,fill:e.fill,depth:e.depth??4,dc:e.dc??0,hw:e.hw??1/0,skirt:e.skirt??2.2,trenchHw:e.trenchHw,label:e.label,kind:e.kind,openUnder:e.openUnder})},gd=(e,t,n)=>e<=0?0:e>=n?t:t*(1-(1-e/n)**2.2),_d=class{s0;count;wave;amp;dc;hw;kind=`rollers`;s1;reach=0;keys=[];constructor(e,t,n,r,i=0,a=1/0){this.s0=e,this.count=t,this.wave=n,this.amp=r,this.dc=i,this.hw=a,this.s1=e+t*n}ground(e,t,n){let r=e-this.s0;if(r<=0||e>=this.s1)return n;let i=ud(t,this.dc,this.hw,2),a=r/this.wave*Math.PI;return n+Math.sin(a)**2*this.amp*i}},vd=class{s0;s1;dc;height;width;kind=`fin`;reach=0;keys=[];constructor(e,t,n,r,i){this.s0=e,this.s1=t,this.dc=n,this.height=r,this.width=i}ground(e,t,n){if(e<=this.s0||e>=this.s1)return n;let r=X(this.s0,this.s0+8,e)*X(this.s1,this.s1-8,e),i=ud(t,this.dc,this.width*.2,this.width*.8);return n+this.height*r*i}},yd=class{baseY;height;rollLen;half;kind=`start`;s0=-16;s1;reach=0;keys;deckSurface=`wood`;deckY;constructor(e,t,n,r=1.7){this.baseY=e,this.height=t,this.rollLen=n,this.half=r,this.deckY=e(0)+t,this.s1=n,this.keys=[0,n]}deck(e,t){if(Math.abs(t)>this.half||e<this.s0||e>this.s1)return-1/0;if(e<=0)return this.deckY;let n=Y(e/this.rollLen,0,1),r=n*n*(3-2*n);return this.deckY+(this.baseY(this.rollLen)-this.deckY)*r}},bd=class{s0;len;h;groundAt;dc;half;pw;kind=`woodKicker`;s1;reach=0;keys;deckSurface=`wood`;assist;constructor(e,t,n,r,i,a,o,s=2){this.s0=e,this.len=t,this.h=n,this.groundAt=r,this.dc=i,this.half=a,this.pw=s,this.s1=e+t,this.keys=[this.s1],this.assist={a0:e-40,a1:this.s1,v:o}}deck(e,t){if(Math.abs(t-this.dc)>this.half||e<this.s0||e>this.s1)return-1/0;let n=(e-this.s0)/this.len;return this.groundAt(e)+this.h*n**+this.pw}},xd=class{s0;s1;rampLen;y0;topY0;topY1;dc;half;kind=`woodDeck`;reach=0;keys;deckSurface=`wood`;assist;constructor(e,t,n,r,i,a,o,s,c){this.s0=e,this.s1=t,this.rampLen=n,this.y0=r,this.topY0=i,this.topY1=a,this.dc=o,this.half=s,this.keys=[e+n,t],this.assist={a0:t-40,a1:t,v:c}}deck(e,t){if(Math.abs(t-this.dc)>this.half||e<this.s0||e>this.s1)return-1/0;let n=this.s0+this.rampLen;if(e<n){let t=(e-this.s0)/this.rampLen;return this.y0+(this.topY0-this.y0)*t}let r=(e-n)/Math.max(.1,this.s1-n);return this.topY0+(this.topY1-this.topY0)*r}},Sd=class{s0;s1;y0;y1;dc;half;kind=`bridge`;reach=0;keys;deckSurface=`wood`;constructor(e,t,n,r,i,a){this.s0=e,this.s1=t,this.y0=n,this.y1=r,this.dc=i,this.half=a,this.keys=[e,t]}deck(e,t){if(Math.abs(t-this.dc)>this.half||e<this.s0||e>this.s1)return-1/0;let n=(e-this.s0)/(this.s1-this.s0);return this.y0+(this.y1-this.y0)*n-Math.sin(n*Math.PI)*.1}},Cd=class{s0;s1;depth;kind=`pit`;reach=0;keys;constructor(e,t,n){this.s0=e,this.s1=t,this.depth=n,this.keys=[e,t]}ground(e,t,n){if(e<=this.s0-1||e>=this.s1+1)return n;let r=1.6,i=X(this.s0-.6,this.s0-.6+r,e),a=X(this.s1+.6,this.s1+.6-r,e);return n-this.depth*Math.min(i,a)}},wd=class{perm=new Uint8Array(512);gx=new Float32Array(256);gy=new Float32Array(256);constructor(e){let t=new Uint8Array(256);for(let e=0;e<256;e++)t[e]=e;let n=e>>>0||1,r=()=>(n^=n<<13,n^=n>>>17,n^=n<<5,(n>>>0)/4294967296);for(let e=255;e>0;e--){let n=Math.floor(r()*(e+1)),i=t[e];t[e]=t[n],t[n]=i}for(let e=0;e<512;e++)this.perm[e]=t[e&255];for(let e=0;e<256;e++){let t=r()*Math.PI*2;this.gx[e]=Math.cos(t),this.gy[e]=Math.sin(t)}}n2(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=n&255,s=r&255,c=this.perm,l=c[o+c[s]],u=c[o+1+c[s]],d=c[o+c[s+1]],f=c[o+1+c[s+1]],p=this.gx[l]*i+this.gy[l]*a,m=this.gx[u]*(i-1)+this.gy[u]*a,h=this.gx[d]*i+this.gy[d]*(a-1),g=this.gx[f]*(i-1)+this.gy[f]*(a-1),_=i*i*i*(i*(i*6-15)+10),v=a*a*a*(a*(a*6-15)+10),y=p+(m-p)*_;return(y+(h+(g-h)*_-y)*v)*1.414}fbm(e,t,n=3,r=2,i=.5){let a=1,o=1,s=0,c=0;for(let l=0;l<n;l++)s+=this.n2(e*o,t*o)*a,c+=a,a*=i,o*=r;return s/c}ridged(e,t,n=3){let r=.5,i=1,a=0;for(let o=0;o<n;o++){let n=1-Math.abs(this.n2(e*i,t*i));a+=n*n*r,r*=.5,i*=2.1}return a}n1(e){return this.n2(e,17.31)}},Td=.25,Ed=[null,`dirt`,`rock`,`wood`,`stone`,`snow`,`ice`,`loam`,`grass`,`roof`,`metal`],Dd=class e{x;z;hd;k;y;n;length;halfA;bankA;depthA;kindA;sideA;hillA;kind2A;depth2A;mixA;roughA;surfA;reachL;reachR;features=[];land=null;tokens=[];checkpoints=[];gaps=[];startS=8;finishS=0;noise;buckets=[];static BUCKET=8;constructor(e,t,n){this.n=e.length,this.length=(this.n-1)*Td,this.x=new Float64Array(this.n),this.z=new Float64Array(this.n),this.hd=new Float64Array(this.n),this.k=new Float64Array(this.n),this.y=new Float64Array(this.n);for(let t=0;t<this.n;t++){let n=e[t];this.x[t]=n.x,this.z[t]=n.z,this.hd[t]=n.h,this.k[t]=n.k,this.y[t]=n.y}this.halfA=t.half,this.bankA=t.bank,this.depthA=t.depth,this.kindA=t.kind,this.sideA=t.side,this.hillA=t.hill??new Float32Array(this.n),this.kind2A=t.kind2??t.kind,this.depth2A=t.depth2??t.depth,this.mixA=t.mix??new Float32Array(this.n).fill(1),this.roughA=new Uint8Array(this.n),this.surfA=new Uint8Array(this.n),this.reachL=new Float32Array(this.n).fill(12),this.reachR=new Float32Array(this.n).fill(12),this.noise=new wd(n^1540483477),this.finishS=this.length-30}addFeature(e){this.features.push(e)}index(){let t=Math.ceil(this.length/e.BUCKET)+1;this.buckets=Array.from({length:t},()=>[]);for(let n of this.features){let r=Math.max(0,Math.floor((n.s0-n.reach)/e.BUCKET)),i=Math.min(t-1,Math.floor((n.s1+n.reach)/e.BUCKET));for(let e=r;e<=i;e++)this.buckets[e].push(n)}}featuresNear(t){let n=Y(Math.floor(t/e.BUCKET),0,this.buckets.length-1);return this.buckets[n]??[]}idx(e){let t=Y(e/Td,0,this.n-1.000001),n=Math.floor(t);return{i:n,t:t-n}}frame(e,t){if(e<0)return this.frame(0,t),t.x+=Math.cos(t.h)*e,t.z+=Math.sin(t.h)*e,t.y+=-e*0,t;if(e>this.length){this.frame(this.length,t);let n=e-this.length;return t.x+=Math.cos(t.h)*n,t.z+=Math.sin(t.h)*n,t}let{i:n,t:r}=this.idx(e),i=n+1,a=this.hd[n];t.h=a+(this.hd[i]-a)*r,t.k=this.k[n]+(this.k[i]-this.k[n])*r;let o=r*Td,s=a+(t.h-a)*.5;return t.x=this.x[n]+Math.cos(s)*o,t.z=this.z[n]+Math.sin(s)*o,t.y=this.baseY(e),t}baseY(e){if(e<=0)return this.y[0]+(this.y[0]-this.y[1])*(-e/Td);if(e>=this.length)return this.y[this.n-1]+(this.y[this.n-1]-this.y[this.n-2])*((e-this.length)/Td);let{i:t,t:n}=this.idx(e),r=this.y[Math.max(0,t-1)],i=this.y[t],a=this.y[t+1],o=this.y[Math.min(this.n-1,t+2)],s=n*n,c=s*n;return .5*(2*i+(-r+a)*n+(2*r-5*i+4*a-o)*s+(-r+3*i-3*a+o)*c)}profile(e,t=Md){let{i:n,t:r}=this.idx(e),i=n+1;t.half=this.halfA[n]+(this.halfA[i]-this.halfA[n])*r,t.bank=this.bankA[n]+(this.bankA[i]-this.bankA[n])*r,t.depth=this.depthA[n]+(this.depthA[i]-this.depthA[n])*r;let a=r<.5?n:i;return t.kind=jd[this.kindA[a]],t.kind2=jd[this.kind2A[a]],t.mix=this.mixA[n]+(this.mixA[i]-this.mixA[n])*r,this.kindA[n]!==this.kindA[i]&&(t.mix=this.mixA[a]),t.depth2=this.depth2A[n]+(this.depth2A[i]-this.depth2A[n])*r,t.side=this.sideA[n],t.hill=this.hillA[n]+(this.hillA[i]-this.hillA[n])*r,t}toWorld(e,t,n){return this.frame(e,kd),n.x=kd.x-Math.sin(kd.h)*t,n.z=kd.z+Math.cos(kd.h)*t,n}toTrack(e,t,n,r){let i=n;for(let n=0;n<6;n++){this.frame(i,kd);let n=Math.cos(kd.h),r=Math.sin(kd.h),a=e-kd.x,o=t-kd.z,s=a*n+o*r,c=-a*r+o*n,l=1-kd.k*c,u=s/(l>.2?l:.2);if(i+=u,Math.abs(u)<1e-4)break}return this.frame(i,kd),r.s=i,r.d=-(e-kd.x)*Math.sin(kd.h)+(t-kd.z)*Math.cos(kd.h),r}ground(e,t){let n=this.baseY(e),r=this.profile(e),i=n+this.cross(e,t,r),a=this.featuresNear(e);for(let r=0;r<a.length;r++){let o=a[r];e<o.s0-o.reach||e>o.s1+o.reach||(i=o.ground?o.ground(e,t,i,n):i)}let o=this.land;if(o){let n=Math.abs(t)-r.half;if(n>.3){let r=Math.min(11,this.reach(e,t)-.4),a=X(Math.min(4,r*.4),r,n);a>0&&(this.toWorld(e,t,Ad),i+=(o.height(Ad.x,Ad.z)-i)*a)}}return i}nearGround(e,t){let n=this.baseY(e),r=this.profile(e),i=n+this.cross(e,t,r),a=this.featuresNear(e);for(let r=0;r<a.length;r++){let o=a[r];e<o.s0-o.reach||e>o.s1+o.reach||(i=o.ground?o.ground(e,t,i,n):i)}return i}height(e,t){let n=this.ground(e,t),r=this.featuresNear(e);for(let i=0;i<r.length;i++){let a=r[i];if(!a.deck||e<a.s0||e>a.s1)continue;let o=a.deck(e,t);o>n&&(n=o)}return n}roughItems=[];roughList=[];buildRough(e){let t=e>>>0||1,n=()=>(t^=t<<13,t^=t>>>17,t^=t<<5,(t>>>0)/4294967296),r=(e,t)=>e+(t-e)*n(),i=Math.ceil(this.length)+2;this.roughItems=Array.from({length:i},()=>[]);let a=0;for(;a<this.length;){let e=this.rough(a);if(!e){a+=.5;continue}let t=this.profile(a).half,o;if(e===1){let e=r(-.55,.55),i=n()<.55,s=i?-t-.4:r(-t-.4,0),c=i?t+.4:r(s+.8,t+.4);o={kind:1,s:a,d:(s+c)/2,d0:s,d1:c,tan:Math.tan(e),h:r(.05,.11),w:r(.14,.2),r:0},a+=r(.6,1.8)}else if(e===2){let e=r(.22,.55);o={kind:2,s:a,d:r(-t+.2,t-.2),d0:0,d1:0,tan:0,h:r(.07,.2)*(e/.4),w:0,r:e},a+=r(.35,1.1)}else o={kind:3,s:a,d:0,d0:-t-.3,d1:t+.3,tan:0,h:r(.03,.06),w:.32,r:0},a+=r(.8,1.2);this.roughList.push(o);let s=o.kind===1?Math.abs(o.tan)*(t+.5)+.6:o.kind===2?o.r+.2:.8,c=Math.max(0,Math.floor(o.s-s)),l=Math.min(i-1,Math.floor(o.s+s));for(let e=c;e<=l;e++)this.roughItems[e].push(o)}}roughH(e,t){let n=Math.floor(e);if(n<0||n>=this.roughItems.length)return 0;let r=this.roughItems[n],i=0;for(let n=0;n<r.length;n++){let a=r[n];if(a.kind===2){let n=e-a.s,r=t-a.d,o=a.r+.18,s=(n*n+r*r)/(o*o);s<1&&(i=Math.max(i,a.h*(1-s)*(1-s)));continue}if(t<a.d0||t>a.d1)continue;let o=e-(a.s+a.tan*(t-a.d)),s=o/a.w*(o/a.w);s<9&&(i=Math.max(i,a.h*Math.exp(-s)*Math.min(1,(t-a.d0)/.3,(a.d1-t)/.3)))}return i}surface(e,t){let n=this.featuresNear(e),r=this.ground(e,t);for(let i=0;i<n.length;i++){let a=n[i];if(a.deck&&e>=a.s0&&e<=a.s1&&a.deck(e,t)>=r-.01)return a.deckSurface??`wood`;if(a.surface&&e>=a.s0&&e<=a.s1){let n=a.surface(e,t);if(n)return n}}let i=this.profile(e);if(Math.abs(t)>i.half+.4)return this.sideSurface;let a=this.surfA[Math.round(Y(e/Td,0,this.n-1))];return a?Ed[a]??this.trailSurface:this.trailSurface}reach(e,t){let n=t<0?this.reachL:this.reachR,r=Y(e/Td,0,this.n-1.000001),i=Math.floor(r);return n[i]+(n[i+1]-n[i])*(r-i)}rough(e){return this.roughA[Math.round(Y(e/Td,0,this.n-1))]}structureAt(e,t){let n=this.featuresNear(e),r=this.ground(e,t);for(let i=0;i<n.length;i++){let a=n[i];if(!(!a.deck||e<a.s0||e>a.s1)&&a.deck(e,t)>=r-.01)return a}return null}trailSurface=`dirt`;sideSurface=`rock`;slope(e,t,n){let r=.12;return n.ds=(this.height(e+r,t)-this.height(e-r,t))/(2*r),n.dd=(this.height(e,t+r)-this.height(e,t-r))/(2*r),n}cross(e,t,n){let r=Math.abs(t),i=n.half,a=i+1.6,o=(Math.abs(t)<a?t:Math.sign(t)*(a+(1-Math.exp(-(Math.abs(t)-a)/1.5))*1.5))*Math.tan(n.bank);if(r<=i)return o;let s=t<0?-1:1,c=Od(n.kind,r-i,s,n.depth,n.hill,n.side,this.noise,e);if(n.mix>=.999)return o+c;let l=Od(n.kind2,r-i,s,n.depth2,n.hill,n.side,this.noise,e);return o+l+(c-l)*n.mix}},Od=(e,t,n,r,i,a,o,s)=>{let c=n*i;switch(e){case`ridge`:{let e=o.fbm(s*.035,n*7.1+t*.02,3),i=o.fbm(s*.6,n*3.3+t*.6,2)*.12*X(.2,1.5,t),a=-.07*t*t+i,l=X(1.4,5+e*2,t),u=-r*(1-Math.exp(-t/(11+e*4))),d=o.ridged(s*.05+n*3.3,t*.09,2)*3.2*l,f=(o.ridged(s*.11+n*9.1,t*.035,2)-.35)*5.5*l*X(3,14,t)*(1-X(40,70,t)),p=a*(1-l)+u*l+d+f-.6*l;return c>0&&(p+=c*Math.min(t,80)*.85),Math.max(p,-r-8)}case`bench`:{let e=o.fbm(s*.03,n*4.7+t*.05,3)*1.4,r=o.fbm(s*.5,n*2.1+t*.5,2)*.1*X(.3,2,t),i=c>0?-.14*X(0,.6,t)*(1-X(.8,2.2,t)):.16*X(0,.8,t)*(1-X(1.2,3,t)),a=c*t*(1+.01*t)*X(0,1.6,t+.4);return 110*Math.tanh(a/110)+i+r+e*X(0,8,t)}case`gully`:{let e=o.fbm(s*.045,n*5.3,2),i=o.fbm(s*.55,n*1.9+t*.55,2)*.12*X(.2,1.4,t);return r*(.75+.35*e)*(1-Math.exp(-t/(4.5+e*1.5)))+(o.ridged(s*.13+n*6.1,t*.05,2)-.4)*2.2*X(1,6,t)+i+c*t*.35}case`open`:{let e=o.fbm(s*.02,n*2.9+t*.03,3)*1.8*X(0,12,t),r=o.fbm(s*.5,n*1.3+t*.5,2)*.1*X(.3,2,t);return 90*Math.tanh(c*t/90)+e+r-.012*t}case`summit`:{let e=o.fbm(s*.04,n*3.9+t*.04,3),i=o.fbm(s*.5,n*1.7+t*.5,2)*.12*X(.3,2,t),a=5+e*2.5,c=-.06*t+i+e*.6*X(0,6,t);if(t<a)return c;let l=t-a,u=X(0,3,l),d=-r*(1-Math.exp(-l/14)),f=o.ridged(s*.06+n*2.7,l*.1,2)*3*u;return Math.max(c+d*u+f,-r-6)}case`street`:{let e=X(0,.3,t)*.16;if(t<11)return e;let r=t-11,i=n===a,c=o.fbm(s*.02,n*3.7+r*.02,2)*1.5;return i?e+r*.45+Math.floor(r/9)*.8+c:e-r*.55-Math.floor(r/9)*1.2+c}default:{let e=o.fbm(s*.02,n*2.9+t*.03,3),i=o.fbm(s*.5,n*1.3+t*.5,2)*.1*X(.3,2,t),a=10+e*4,c=-.05*t+i+e*1.2*X(0,10,t);if(t<a)return c;let l=t-a,u=X(0,4,l),d=Math.max(r,30),f=-d*(1-Math.exp(-l/10)),p=o.ridged(s*.05+n*1.7,l*.09,2)*3*u;return Math.max(c+f*u+p,-d-8)}}},kd={x:0,z:0,h:0,k:0,y:0},Ad={x:0,z:0},jd=[`ridge`,`bench`,`street`,`plateau`,`gully`,`open`,`summit`],Md={half:3,depth:40,kind:`ridge`,bank:0,side:1,hill:0,kind2:`ridge`,depth2:40,mix:1},Nd=()=>({x:0,z:0,h:0,k:0,y:0}),Pd=Nd(),Fd=(()=>{let e=[];for(let t=0;t<20;t+=.5)e.push(t);for(let t=20;t<100;t+=2)e.push(t);for(let t=100;t<=4e3;t+=t<400?10:100)e.push(t);return e})(),Id=Fd.length,Ld=e=>e<20?e/.5:e<100?40+(e-20)/2:e<400?80+(e-100)/10:Math.min(Id-1.000001,110+(e-400)/100),Rd=class{x0;z0;cell;nx;nz;h;dist;constructor(e,t,n,r,i){this.x0=e,this.z0=t,this.cell=n,this.nx=r,this.nz=i,this.h=new Float32Array((r+1)*(i+1)),this.dist=new Float32Array((r+1)*(i+1))}inside(e,t,n=0){let r=(e-this.x0)/this.cell,i=(t-this.z0)/this.cell;return r>=n&&i>=n&&r<=this.nx-n&&i<=this.nz-n}sample(e,t,n){let r=Y((t-this.x0)/this.cell,0,this.nx-1e-6),i=Y((n-this.z0)/this.cell,0,this.nz-1e-6),a=Math.floor(r),o=Math.floor(i),s=r-a,c=i-o,l=this.nx+1,u=e[o*l+a],d=e[o*l+a+1],f=e[(o+1)*l+a],p=e[(o+1)*l+a+1];return u+(d-u)*s+(f-u)*c+(u-d-f+p)*s*c}},zd=class{track;style;near;far;nz;nz2;lowY;highY;constructor(e,t,n,r=2.5){this.track=e,this.style=t,this.nz=new wd(n^625341585),this.nz2=new wd(n^1821285621);let i=this.samples(2,60),a=this.samples(6,260),o=this.samples(24,1e9),s=1/0,c=-1/0,l=1/0,u=-1/0,d=1/0,f=-1/0;for(let e=0;e<i.n;e++)s=Math.min(s,i.x[e]),c=Math.max(c,i.x[e]),l=Math.min(l,i.z[e]),u=Math.max(u,i.z[e]),d=Math.min(d,i.y[e]),f=Math.max(f,i.y[e]);this.lowY=d,this.highY=f;let p=3200;this.far=new Rd(s-p,l-p,28,Math.ceil((c-s+2*p)/28),Math.ceil((u-l+2*p)/28));let m=new Rd(s-p-56,l-p-56,56,Math.ceil((c-s+2*p+112)/56),Math.ceil((u-l+2*p+112)/56));this.lattice(m,o),this.fillFar(this.far,m,o);let h=r;for(;(c-s+244)/h*((u-l+244)/h)>3e5;)h*=1.12;this.near=new Rd(s-122,l-122,h,Math.ceil((c-s+244)/h),Math.ceil((u-l+244)/h)),this.fine=i,this.hash=new Vd(i,12),this.fillNear(this.near,i,a,o,m),Bd(this.near.h),Bd(this.far.h),this.reach()}fine;hash;nearestS(e,t,n=40){let r=this.hash.nearestIndex(e,t,n);return r<0?NaN:this.fine.s[r]}reach(){let e=this.track,t=e.reachL,n=e.reachR;for(let r=0;r<e.n;r+=4){let i=r*Td;e.frame(i,Pd);let a=e.profile(i).half,o=Math.sin(Pd.h),s=Math.cos(Pd.h);for(let e of[-1,1]){let c=12;for(let t=.5;t<=12.01;t+=.5){let n=e*(a+t),r=Pd.x-o*n,l=Pd.z+s*n,u=this.hash.nearestIndex(r,l,30);if(u>=0&&Math.abs(this.fine.s[u]-i)>6+1.6*Math.abs(n)){c=Math.max(1,t-.75);break}}(e<0?t:n)[r]=c}}for(let r of[t,n]){for(let t=0;t<e.n;t++){if(t%4==0)continue;let n=Math.floor(t/4)*4,i=Math.min(e.n-1,n+4);r[t]=Math.min(r[n],r[i])}for(let t=0;t<2;t++){let t=r[0];for(let n=1;n<e.n;n++)t=Math.min(r[n],t+.12),r[n]=t;t=r[e.n-1];for(let n=e.n-2;n>=0;n--)t=Math.min(r[n],t+.12),r[n]=t}}}height(e,t){return this.near.inside(e,t)?this.near.sample(this.near.h,e,t):this.far.sample(this.far.h,e,t)}distance(e,t){return this.near.inside(e,t)?this.near.sample(this.near.dist,e,t):this.far.sample(this.far.dist,e,t)}samples(e,t){let n=this.track,r=n.length+140,i=Math.floor((r- -46)/e)+1,a={n:i,s:new Float64Array(i),x:new Float64Array(i),z:new Float64Array(i),tx:new Float64Array(i),tz:new Float64Array(i),y:new Float64Array(i),half:new Float32Array(i),depth:new Float32Array(i),hill:new Float32Array(i),side:new Int8Array(i),kind:new Uint8Array(i),trench:new Float32Array(i),tab:new Float32Array(i*2*Id)},o=Id;for(;o>2&&Fd[o-2]>t;)o--;let s=(n.baseY(n.length)-n.baseY(n.length-20))/20;for(let t=0;t<i;t++){let r=-46+t*e;n.frame(r,Pd),a.s[t]=r,a.x[t]=Pd.x,a.z[t]=Pd.z,a.tx[t]=Math.cos(Pd.h),a.tz[t]=Math.sin(Pd.h);let i=n.profile(Math.max(0,Math.min(n.length,r)));if(r<0)a.y[t]=n.baseY(0),a.kind[t]=jd.indexOf(`summit`),a.half[t]=i.half+1,a.depth[t]=Math.max(i.depth,40),a.hill[t]=0;else if(r>n.length){let e=r-n.length;a.y[t]=n.baseY(n.length)+s*30*(1-Math.exp(-e/30)),a.kind[t]=jd.indexOf(`open`),a.half[t]=i.half,a.depth[t]=i.depth,a.hill[t]=i.hill*Math.exp(-e/60)}else a.y[t]=n.baseY(r),a.kind[t]=jd.indexOf(i.kind),a.half[t]=i.half,a.depth[t]=i.depth,a.hill[t]=i.hill,a.trench[t]=this.trenchAt(r);a.side[t]=i.side;let c=jd[a.kind[t]],l=t*2*Id,u=r>=0&&r<=n.length?i.mix:1;for(let e=0;e<o;e++){let o=Od(c,Fd[e],-1,a.depth[t],a.hill[t],a.side[t],n.noise,r),s=Od(c,Fd[e],1,a.depth[t],a.hill[t],a.side[t],n.noise,r);u<.999&&(o=o*u+Od(i.kind2,Fd[e],-1,i.depth2,a.hill[t],a.side[t],n.noise,r)*(1-u),s=s*u+Od(i.kind2,Fd[e],1,i.depth2,a.hill[t],a.side[t],n.noise,r)*(1-u)),a.tab[l+e]=o,a.tab[l+Id+e]=s}for(let e=o;e<Id;e++)a.tab[l+e]=a.tab[l+o-1],a.tab[l+Id+e]=a.tab[l+Id+o-1]}return a}trenchAt(e){let t=this.track,n=0;for(let r of t.featuresNear(e)){if(!(r instanceof pd)||e<r.lipS||e>r.knuckleS||r.spec.fill===`table`||Math.abs(r.spec.dc)>.5&&r.spec.hw!==1/0)continue;let i=t.baseY(e),a=r.ground(e,0,i,i)-i;n=Math.min(n,a)}return n}lend(e,t,n,r){let i=Math.max(0,r-e.half[t]),a=Ld(i),o=Math.floor(a),s=a-o,c=t*2*Id+o,l=e.tab[c]+(e.tab[c+1]-e.tab[c])*s,u=e.tab[c+Id]+(e.tab[c+Id+1]-e.tab[c+Id])*s,d=X(-.35,.35,n/Math.max(1,r)),f=e.trench[t]===0?0:e.trench[t]*Math.exp(-i/45);return e.y[t]+l+(u-l)*d+f}lattice(e,t){let n=e.nx+1;for(let r=0;r<=e.nz;r++){let i=e.z0+r*e.cell;for(let a=0;a<=e.nx;a++){let o=e.x0+a*e.cell,s=0,c=0,l=1/0;for(let e=0;e<t.n;e++){let n=o-t.x[e],r=i-t.z[e],a=n*n+r*r;a<l&&(l=a);let u=Math.sqrt(a),d=-n*t.tz[e]+r*t.tx[e],f=1/((a+100)*(a+100));s+=f*this.lend(t,e,d,u),c+=f}e.h[r*n+a]=s/c,e.dist[r*n+a]=Math.sqrt(l)}}}fillFar(e,t,n){let r=e.nx+1,i=n.x[0],a=n.z[0];for(let o=0;o<=e.nz;o++){let s=e.z0+o*e.cell;for(let c=0;c<=e.nx;c++){let l=e.x0+c*e.cell,u=1/0;for(let e=0;e<n.n;e++){let t=l-n.x[e],r=s-n.z[e];u=Math.min(u,t*t+r*r)}u=Math.sqrt(u);let d=t.sample(t.h,l,s)+this.relief(l,s,u,Math.hypot(l-i,s-a),3);e.h[o*r+c]=d,e.dist[o*r+c]=u}}this.style.terrace>0&&this.terraceGrid(e)}terraceGrid(e){let t=e.nx+1,n=e.h.slice();for(let r=0;r<=e.nz;r++)for(let i=0;i<=e.nx;i++){let a=r*t+i,o=n[r*t+Math.max(0,i-1)],s=n[r*t+Math.min(e.nx,i+1)],c=n[Math.max(0,r-1)*t+i],l=n[Math.min(e.nz,r+1)*t+i],u=X(.38,.85,Math.hypot(s-o,l-c)/(2*e.cell));if(u<=0)continue;let d=e.x0+i*e.cell,f=e.z0+r*e.cell,p=this.terraced(n[a],d,f,e.dist[a]);e.h[a]=n[a]+(p-n[a])*u}}fillNear(e,t,n,r,i){let a=e.nx+1,o=new Vd(t,12),s=new Vd(n,24),c=t.x[0],l=t.z[0];for(let t=0;t<=e.nz;t++){let n=e.z0+t*e.cell;for(let u=0;u<=e.nx;u++){let d=e.x0+u*e.cell,f=t*a+u,p=1/0;for(let e=0;e<r.n;e++){let t=d-r.x[e],i=n-r.z[e];p=Math.min(p,t*t+i*i)}if(p=Math.sqrt(p),p>140){e.h[f]=this.far.sample(this.far.h,d,n),e.dist[f]=p;continue}p<40&&(p=Math.min(p,o.nearest(d,n,p+26)));let m,h=X(16,26,p),g=X(64,88,p),_=0,v=0;h<1&&(_=o.blend(this,d,n,Math.min(70,p*1.7+18))),h>0&&g<1&&(v=s.blend(this,d,n,Math.min(200,p*1.9+34)));let y=g>0?i.sample(i.h,d,n):0;Number.isNaN(_)&&(_=v),Number.isNaN(v)&&(v=y),m=_+(v-_)*h,m+=(y-m)*g,m+=this.relief(d,n,p,Math.hypot(d-c,n-l),5);let b=X(110,140,p);b>0&&(m+=(this.far.sample(this.far.h,d,n)-m)*b),e.h[f]=m,e.dist[f]=p}}this.style.terrace>0&&this.terraceGrid(e)}relief(e,t,n,r,i){let a=this.style,o=this.nz,s=0,c=X(14,60,n)*(1-X(300,600,n));c>0&&(s+=(this.nz2.fbm(e*.045,t*.045,3)*2.2+(this.nz2.ridged(e*.02,t*.02,2)-.3)*3)*c);let l=a.relief*X(40,520,n);if(l>0){let r=1/a.size,c=e*r+o.fbm(e*r*.5+3.1,t*r*.5-1.7,2)*.9,u=t*r+o.fbm(e*r*.5-7.3,t*r*.5+5.2,2)*.9,d=a.ridged>0?o.ridged(c,u,i)*2-.62:0,f=a.ridged<1?o.fbm(c*.8,u*.8,Math.max(2,i-1)):0;if(s+=(d*a.ridged+f*(1-a.ridged))*l,a.terrace>0){let i=r*.75,c=e*i+o.fbm(e*i*.7+9.1,t*i*.7,2)*.6,l=t*i+o.fbm(e*i*.7,t*i*.7-4.4,2)*.6,u=this.nz2.fbm(c,l,3),d=X(.02,.09,u)*.62+X(.27,.32,u)*.38;s+=(d-.3)*a.relief*1.5*X(60,420,n)}}s+=a.summitBias*(1-X(60,700,r))*X(20,120,n);let u=X(1200,3200,n);return u>0&&(s+=a.ranges*u*(.55+.45*o.ridged(e*7e-4+11,t*7e-4-4,3))),s}terraced(e,t,n,r){let i=this.style,a=X(16,46,r);if(a<=0)return e;let o=this.nz2,s=o.fbm(t*.0012,n*.0012,2)*6,c=i.terrace*(.8+.4*(o.fbm(t*.003+5,n*.003,2)*.5+.5)),l=(e+s)/c,u=Math.floor(l),d=l-u;return e+((u+(X(.62,.96,d)*.9+d*.1))*c-s-e)*a}},Bd=e=>{let t=0;for(let n=0;n<e.length;n++)Number.isFinite(e[n])?t=e[n]:e[n]=t},Vd=class{S;cell;x0;z0;w;h;start;items;constructor(e,t){this.S=e,this.cell=t;let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let t=0;t<e.n;t++)n=Math.min(n,e.x[t]),r=Math.min(r,e.z[t]),i=Math.max(i,e.x[t]),a=Math.max(a,e.z[t]);this.x0=n,this.z0=r,this.w=Math.ceil((i-n)/t)+1,this.h=Math.ceil((a-r)/t)+1;let o=new Int32Array(this.w*this.h+1),s=i=>Math.floor((e.z[i]-r)/t)*this.w+Math.floor((e.x[i]-n)/t);for(let t=0;t<e.n;t++)o[s(t)+1]++;for(let e=1;e<o.length;e++)o[e]+=o[e-1];this.start=o,this.items=new Int32Array(e.n);let c=o.slice();for(let t=0;t<e.n;t++)this.items[c[s(t)]++]=t}nearestIndex(e,t,n){let r=this.S,i=n*n,a=-1,o=this.cell,s=Math.max(0,Math.floor((e-n-this.x0)/o)),c=Math.min(this.w-1,Math.floor((e+n-this.x0)/o)),l=Math.max(0,Math.floor((t-n-this.z0)/o)),u=Math.min(this.h-1,Math.floor((t+n-this.z0)/o));for(let n=l;n<=u;n++)for(let o=s;o<=c;o++){let s=n*this.w+o;for(let n=this.start[s];n<this.start[s+1];n++){let o=this.items[n],s=e-r.x[o],c=t-r.z[o],l=s*s+c*c;l<i&&(i=l,a=o)}}return a}nearest(e,t,n){let r=this.S,i=n*n,a=this.cell,o=Math.max(0,Math.floor((e-n-this.x0)/a)),s=Math.min(this.w-1,Math.floor((e+n-this.x0)/a)),c=Math.max(0,Math.floor((t-n-this.z0)/a)),l=Math.min(this.h-1,Math.floor((t+n-this.z0)/a));for(let n=c;n<=l;n++)for(let a=o;a<=s;a++){let o=n*this.w+a;for(let n=this.start[o];n<this.start[o+1];n++){let a=this.items[n],o=e-r.x[a],s=t-r.z[a],c=o*o+s*s;c<i&&(i=c)}}return Math.sqrt(i)}blend(e,t,n,r){let i=this.S,a=r*r,o=this.cell,s=Math.max(0,Math.floor((t-r-this.x0)/o)),c=Math.min(this.w-1,Math.floor((t+r-this.x0)/o)),l=Math.max(0,Math.floor((n-r-this.z0)/o)),u=Math.min(this.h-1,Math.floor((n+r-this.z0)/o)),d=0,f=0;for(let r=l;r<=u;r++)for(let o=s;o<=c;o++){let s=r*this.w+o;for(let r=this.start[s];r<this.start[s+1];r++){let o=this.items[r],s=t-i.x[o],c=n-i.z[o],l=s*s+c*c;if(l>=a)continue;let u=Math.sqrt(l),p=-s*i.tz[o]+c*i.tx[o],m=1-l/a,h=m*m/((l+4)*(l+4));d+=h*e.lend(i,o,p,u),f+=h}}return f>0?d/f:NaN}},Hd=9.81,Ud={dirt:.014,loam:.018,rock:.012,wood:.01,stone:.011,snow:.03,ice:.006,grass:.025,roof:.012,metal:.008},Wd=.0085,Gd=9.5,Kd=2.4,qd={dirt:1,loam:1.05,rock:1.1,wood:.95,stone:.9,snow:.75,ice:.45,grass:.85,roof:.9,metal:.8},Jd=(e,t,n,r=Ud.dirt)=>{let i=Math.sqrt(Math.max(0,e)),a=-9.81*t/Math.sqrt(1+t*t)-r*Hd-Wd*i*i;return i<9.5&&(a+=Kd*Math.min(1,(Gd-i)/2)),i>21&&(a-=3*(i-21)),Math.max(4,e+2*a*n)},Yd={1:{kH:.8,lip:24,vMin:8.5,vMax:11.5},2:{kH:1.3,lip:29,vMin:10,vMax:13.5},3:{kH:1.85,lip:32,vMin:11.5,vMax:15.5},4:{kH:2.4,lip:34,vMin:13.5,vMax:17.5}},Xd={roots:1,rocks:2,bumps:3},Zd=(e,t=1)=>{let n=Yd[e],r=n.lip*Math.PI/180,i=n.vMax,a=2*i*i*Math.sin(r)*Math.cos(r)/Hd;return md(n.kH,n.lip)+a*1.05*t+14},Qd=(e,t,n=1)=>{let r=Math.tan(Math.abs(t)),i=Hd*Y((n+r)/Math.max(.2,1-n*r),.3,3.2);return Math.sqrt(i*e)*.72},$d=(e,t)=>{let n=new ld(e.seed),r=tf(e.steps,t,n),i=0;for(let e of r)e.s0=i,i+=e.len;let a=Math.ceil(i/Td)+1,o=Array(a),s=new Float32Array(a),c=new Float32Array(a),l=new Float32Array(a),u=new Uint8Array(a),d=new Uint8Array(a),f=new Float32Array(a),p=new Float32Array(a),m=new Int8Array(a),h=new Float32Array(a),g=new Float32Array(a),_=new Uint8Array(a),v=new Uint8Array(a),y=new Float64Array(a),b=new Float64Array(a),x=new Float64Array(a),S=e.wander??.22,C=n.range(0,100),w=0;for(let e=0;e<a;e++){let n=e*Td;for(;w<r.length-1&&n>=r[w+1].s0;)w++;let i=r[w],a=w>0?r[w-1]:null,o=n-i.s0,h=Y(o,0,i.len),T;if(i.curve===`trap`){let e=h/i.len;T=(e<.25?e/.25:e>.75?(1-e)/.25:1)/.75}else T=i.len>0?1-Math.cos(2*Math.PI*h/i.len):0;let E=i.len>0?i.turn*T/i.len:0,D=i.step.t;if(D===`run`||D===`rollers`||D===`open`||D===`traverse`||D===`ridge`||D===`spine`||D===`chute`){let e=Math.sin(n*.011+C)*Math.sin(n*.0047+C*1.7);E+=S/100*e*X(0,10,o)*X(0,10,i.len-o)}x[e]=E;let O=a?X(0,10,o):1;y[e]=a?a.slope+(i.slope-a.slope)*O:i.slope;let k=a?X(0,8,o):1,A=a?X(0,Math.max(8,(a.half-i.half)*5),o):1;s[e]=a?a.half+(i.half-a.half)*A:i.half,l[e]=i.depth,u[e]=jd.indexOf(i.kind),d[e]=jd.indexOf(a?a.kind:i.kind),f[e]=a?a.depth:i.depth,p[e]=k,g[e]=a?a.hillK+(i.hillK-a.hillK)*k:i.hillK,m[e]=t.side,c[e]=i.curve===`trap`?i.bank*Math.min(1,T*.75*1.25):i.bank*T/2,_[e]=o>2&&o<i.len-2?i.rough:0,v[e]=i.surf?Ed.indexOf(i.surf):0;let j=0;for(let e=0;e<w;e++)r[e].fall&&(j+=r[e].fall.fall);i.fall&&(j+=gd(o-i.fall.at,i.fall.fall,i.fall.len)),b[e]=j}let T=0,E=0,D=0,O=0;for(let e=0;e<a;e++){o[e]={x:T,z:E,h:D,k:x[e],y:O-b[e]};let t=D+x[e]*Td*.5;T+=Math.cos(t)*Td,E+=Math.sin(t)*Td,D+=x[e]*Td,O+=y[e]*Td}let k=o[a-1].y,A=o[0].x,j=o[0].z;for(let e=0;e<a;e++){let n=o[e],r=A-n.x,i=j-n.z,a=Math.hypot(r,i),s=-Math.sin(n.h),c=Math.cos(n.h),p=a>1?(r*s+i*c)/a:0;h[e]=t.hill*g[e]*p*X(8,70,a);let m=.45*Math.max(0,n.y-k),_=jd[u[e]];(_===`ridge`||_===`summit`||_===`plateau`)&&(l[e]+=m);let v=jd[d[e]];(v===`ridge`||v===`summit`||v===`plateau`)&&(f[e]+=m)}let M=new Dd(o,{half:s,bank:c,depth:l,kind:u,side:m,hill:h,kind2:d,depth2:f,mix:p},e.seed);M.trailSurface=t.trail,M.sideSurface=t.sideSurface,M.roughA=_,M.surfA=v;let N=new af(M,n);for(let e of r)N.place(e);return M.index(),N.finishUp(),M.buildRough(e.seed^20973),M.land=new zd(M,t.land,e.seed),M},ef=(e,t)=>{let n=new ld(e.seed),r=tf(e.steps,t,n),i=[],a=0,o=0,s=0,c=0;for(let e of r)for(let t=0;t<e.len;t+=1){let n;if(e.curve===`trap`){let r=t/e.len;n=(r<.25?r/.25:r>.75?(1-r)/.25:1)/.75}else n=1-Math.cos(2*Math.PI*t/e.len);let r=e.turn*n/e.len;Math.round(c)%2==0&&i.push({x:a,z:o,s:c,half:e.half});let l=s+r*1*.5;a+=Math.cos(l)*1,o+=Math.sin(l)*1,s+=r*1,c+=1}let l=1/0,u=new Map;i.forEach((e,t)=>{let n=`${Math.floor(e.x/24)},${Math.floor(e.z/24)}`,r=u.get(n);r||u.set(n,r=[]),r.push(t)});for(let e of i){let t=Math.floor(e.x/24),n=Math.floor(e.z/24);for(let r=-1;r<=1;r++)for(let a=-1;a<=1;a++){let o=u.get(`${t+r},${n+a}`);if(o)for(let t of o){let n=i[t];if(n.s<=e.s)continue;let r=Math.hypot(e.x-n.x,e.z-n.z);n.s-e.s<2.2*r+12||(l=Math.min(l,r-e.half-n.half))}}}return l},tf=(e,t,n)=>{let r=[],i=Math.PI/180,a=(e,n,r={})=>({step:e,len:n,turn:0,slope:t.grade,half:t.half,depth:t.depth,kind:t.kind,bank:0,hillK:.55,curve:`bump`,rough:0,surf:null,s0:0,...r}),o=t.kind===`ridge`;for(let s of e)switch(s.t){case`start`:r.push(a(s,30,{slope:t.grade*.5,half:t.half+1.5,kind:t.kind===`street`?`street`:`summit`,depth:Math.max(t.depth,40),hillK:0}));break;case`rollin`:{let e=s.len??16;r.push(a(s,e,{slope:s.grade??-.62,kind:t.kind===`street`?`street`:`gully`,depth:7,half:t.half,hillK:.2}));break}case`chute`:r.push(a(s,s.len,{turn:(s.turn??0)*i,slope:s.grade??-.4,kind:t.kind===`street`?`street`:`gully`,depth:9+n.range(0,6),half:t.half-.2,hillK:.3,rough:s.rough?Xd[s.rough]:0}));break;case`ridge`:r.push(a(s,s.len,{turn:(s.turn??0)*i,slope:s.grade??t.grade*.7,kind:`ridge`,half:Math.min(t.half,1.9),depth:t.depth*1.1,hillK:.3}));break;case`switchbacks`:{let e=Math.max(1,s.n),n=s.leg??26,i=s.radius??7,o=s.grade??-.17,c=s.dir??1,l=.36;for(let u=0;u<=e;u++)if(r.push(a(s,n,{slope:o,kind:`bench`,hillK:1,half:t.half-.15,rough:0})),u<e){let e=c*Math.PI,n=Math.PI*i/.75;r.push(a(s,n,{turn:e,slope:o*.85,kind:`bench`,hillK:1,half:t.half+.5,curve:`trap`,bank:-c*l,corner:Qd(i+.3,l)})),c=-c}break}case`slab`:r.push(a(s,s.len,{turn:(s.turn??0)*i,slope:s.grade??-.48,kind:`open`,half:t.half+.6,hillK:.4,surf:`rock`}));break;case`traverse`:r.push(a(s,s.len,{turn:(s.turn??0)*i,slope:s.grade??t.grade*.6,kind:t.kind===`street`?`street`:`bench`,hillK:1,rough:s.rough?Xd[s.rough]:0}));break;case`open`:r.push(a(s,s.len,{turn:(s.turn??0)*i,slope:s.grade??t.grade*1.3,kind:t.kind===`street`?`street`:`open`,hillK:.45,half:t.half+.4,rough:s.rough?Xd[s.rough]:0}));break;case`run`:r.push(a(s,s.len,{turn:(s.turn??0)*i,slope:s.grade??t.grade*n.range(.85,1.2),half:s.half??t.half,kind:s.kind??t.kind,rough:s.rough?Xd[s.rough]:0}));break;case`rollers`:r.push(a(s,(s.n+1)*5.6+10,{turn:(s.turn??0)*i,slope:t.grade*1.15}));break;case`table`:case`kicker`:r.push(a(s,26+Zd(s.size),{slope:t.grade*.9}));break;case`gap`:r.push(a(s,26+Zd(s.size),{slope:t.grade*.9}));break;case`step`:{let e=26+Zd(s.size,1.25)+s.down*2,n=24+md(Yd[s.size].kH,Yd[s.size].lip);r.push(a(s,e,{slope:t.grade*.9,fall:{at:n+2,fall:s.down*1.15,len:e-n-6}}));break}case`drop`:{let e=8.55*Math.sqrt(2*s.h/Hd)+12+s.h;r.push(a(s,27+e+10,{slope:t.grade*.8,fall:{at:28.2,fall:s.h*1.25+2,len:e}}));break}case`berm`:{let e=s.radius??26,n=s.turn*i,o=Math.abs(n)*e*1.6;r.push(a(s,o,{turn:n,bank:-Math.sign(n)*.42,half:t.half+1.2,slope:t.grade*.85,corner:Qd(e*.8,.42)}));break}case`spine`:r.push(a(s,s.len,{turn:(s.turn??0)*i,half:1.3,depth:t.depth*1.15,slope:t.grade*1.1,kind:o||t.kind===`plateau`?`ridge`:t.kind===`street`?`street`:`ridge`,hillK:.3}));break;case`deck`:{let e=s.len+46;r.push(a(s,e,{slope:t.grade*.9,fall:{at:22+s.len,fall:s.h*.9+3,len:18}}));break}case`bridge`:r.push(a(s,s.len+40,{slope:t.grade*.7}));break;case`split`:{let e=34+Math.max(nf(s.left),nf(s.right));r.push(a(s,e,{half:t.half+4.9,slope:t.grade*.9}));break}case`canyon`:r.push(a(s,40+Zd(4,1.1),{slope:t.grade*.8,half:t.half+.8}));break;case`finish`:r.push(a(s,90,{slope:t.grade*.3,half:t.half+7,kind:t.kind===`street`?`street`:`open`,depth:10,hillK:.2}))}return r},nf=e=>e===`rollers`?40:Zd(e===`big`?3:2),rf=class{s0;s1;v;kind=`corner`;reach=0;keys=[];assist;constructor(e,t,n){this.s0=e,this.s1=t,this.v=n,this.assist={a0:e-34,a1:e+(t-e)*.5,v:n,brake:!0}}},af=class{track;rng;v=4;sCur=0;tokensWanted=[];corners=[];constructor(e,t){this.track=e,this.rng=t}add(e){this.track.addFeature(e),this.track.index()}cap(e){let t=1/0;for(let n of this.corners){if(e<n.assist.a0||e>n.assist.a1)continue;let r=Y((n.assist.a1-e)/(n.assist.a1-n.assist.a0),0,1);t=Math.min(t,n.v+r*r*12)}return t}rideTo(e,t=0){let n=this.track,r=.5,i=this.v*this.v,a=this.sCur;for(;a<e;){let e=n.height(a,t),o=n.height(a+r,t),s=(e-n.height(a-r,t))/r,c=(o-e)/r,l=Math.sqrt(i)/Math.sqrt(1+s*s),u=l*s,d=r/l;if(e+u*d-4.905*d*d>o+.04){let r=a,o=e,s=u,c=1/120,d=0;for(;d<8&&(r+=l*c,s-=Hd*c,o+=s*c,d+=c,!(o<=n.height(r,t))););let f=(n.height(r+.3,t)-n.height(r-.3,t))/.6,p=(l+s*f)/Math.hypot(1,f);i=Math.max(16,p*p*.97),a=r;continue}i=Jd(i,c,r);let f=this.cap(a);i>f*f&&(i=f*f),a+=r}this.v=Math.sqrt(i),this.sCur=Math.max(this.sCur,a)}moundHw(e){return this.track.profile(e).half+.9}place(e){let t=this.track,n=e.step,r=e.s0;if(e.corner!==void 0){let n=new rf(r,r+e.len,e.corner);this.corners.push(n),this.add(n);let i=Math.max(0,Math.round((r-13)/Td)),a=Math.max(0,Math.round((r-1)/Td));for(let e=i;e<a&&e<t.n;e++)t.roughA[e]||(t.roughA[e]=3)}switch(n.t){case`start`:this.add(new yd(e=>t.baseY(e),4.2,12)),this.sCur=-12,this.v=2.5,this.rideTo(r+e.len),t.startS=-6,t.checkpoints.push({s:16,d:0,v:Math.max(8,this.v)});break;case`run`:case`berm`:case`spine`:case`rollin`:case`chute`:case`ridge`:case`slab`:case`traverse`:case`open`:this.rideTo(r+e.len),(n.t===`spine`||n.t===`ridge`)&&this.tokensWanted.push({s:r+e.len*.6,d:0,y:1.1,prio:1}),(n.t===`chute`||n.t===`slab`)&&this.checkpoint(r+2);break;case`switchbacks`:this.checkpoint(r+1),this.rideTo(r+e.len);break;case`rollers`:this.rideTo(r+5),this.add(new _d(r+5,n.n,5.6,n.amp??.75,0,this.moundHw(r+5))),this.rideTo(r+e.len);break;case`table`:case`gap`:case`step`:{let i=Yd[n.size],a=r+24;this.rideTo(a),this.checkpoint(a-20);let o=Y(Math.sqrt(Math.max(1,this.v*this.v-2*Hd*i.kH*1.05)),i.vMin,i.vMax),s=a+md(i.kH,i.lip),c=n.t===`table`?-.25:n.t===`gap`?-.35-.12*n.size:-n.down*.75,l=hd({s0:a,v:o,kH:i.kH,lipDeg:i.lip,lineAtLip:t.baseY(s),lineSlope:t.baseY(s+.5)-t.baseY(s-.5),fill:n.t===`gap`?`gap`:`table`,kd:c,depth:n.t===`gap`?n.depth??3+n.size*1.5:0,hw:this.moundHw(s),skirt:3,trenchHw:1/0,label:n.label});this.add(l),this.jumpExtras(l,n.t===`gap`||n.t===`step`&&n.down>=2.5),this.rideTo(r+e.len);break}case`kicker`:{let i=Yd[n.size],a=r+24;this.rideTo(a),this.checkpoint(a-20);let o=Y(Math.sqrt(Math.max(1,this.v*this.v-2*Hd*i.kH)),i.vMin,i.vMax),s=i.lip+3,c=md(i.kH,s),l=a+c,u=hd({s0:a,v:o,kH:i.kH,lipDeg:s,lineAtLip:t.baseY(l),lineSlope:t.baseY(l+.5)-t.baseY(l-.5),fill:`gap`,kd:-.5,depth:2.2,hw:this.moundHw(l),skirt:3,trenchHw:1/0,label:n.label}),d=new pd({...u.spec,kH:.001,woodLip:!0});this.add(d);let f=t.baseY(l+.5)-t.baseY(l-.5),p=Math.max(1.2,c*(Math.tan(s*Math.PI/180)-f)/i.kH);this.add(new bd(a,c,i.kH,e=>t.baseY(e),0,1.35,o,p)),this.jumpExtras(u,!0),this.rideTo(r+e.len);break}case`drop`:{let i=r+22;this.rideTo(i),this.checkpoint(i-22);let a=Y(this.v,8,11),o=i+5,s=hd({s0:i,v:a,kH:.25,lipDeg:6,lineAtLip:t.baseY(o),lineSlope:t.baseY(o+.5)-t.baseY(o-.5),fill:`void`,kd:-.55*n.h,depth:.5*n.h+2.5,hw:this.moundHw(o),skirt:3,trenchHw:1/0,label:n.label,kind:`drop`});this.add(s),n.h>=4&&t.gaps.push({name:n.label??`${Math.round(n.h)} m Drop`,a0:o-2,a1:o+.6,b0:s.knuckleS-1,b1:s.landEndS,points:Math.round(n.h*110)}),this.tokensWanted.push({s:o+a*.45,d:0,y:.6,prio:2}),this.rideTo(r+e.len);break}case`deck`:{let i=r+18;this.rideTo(i),this.checkpoint(i-14);let a=t.ground(i,0),o=a+n.h,s=i+4+n.len,c=o+(t.baseY(s)-t.baseY(i+4))*.35,l=Y(this.v,8,11);this.add(new xd(i,s,4,a,o,c,0,.75,l));let u=(c-o)/Math.max(1,n.len),d=hd({s0:s-5,v:l,kH:.001,lipDeg:Math.atan(u)*180/Math.PI,lineAtLip:c-.001,lineSlope:u,fill:`void`,kd:-.45*n.h-.4,depth:1.2,hw:this.moundHw(s),skirt:3,kind:`drop`,openUnder:!0,label:n.label});this.add(d),n.label&&t.gaps.push({name:n.label,a0:s-1.5,a1:s+.6,b0:d.knuckleS-1,b1:d.landEndS,points:Math.round(260+n.h*120)}),this.tokensWanted.push({s:s-n.len*.5,d:0,y:1,prio:1}),this.rideTo(r+e.len);break}case`bridge`:{let i=r+20;this.rideTo(i),this.checkpoint(i-14);let a=n.len;this.add(new Cd(i,i+a,9)),this.add(new Sd(i-1,i+a+1,t.ground(i-1.2,0),t.ground(i+a+1.2,0),0,.6)),t.gaps.push({name:n.label??`Skinny Bridge`,a0:i-1,a1:i+.5,b0:i+a,b1:i+a+3,points:Math.round(a*40)}),this.tokensWanted.push({s:i+a*.5,d:0,y:.9,prio:2}),this.rideTo(r+e.len);break}case`split`:{let t=r+24;this.rideTo(t-6),this.checkpoint(t-22),this.add(new vd(r+10,r+e.len-4,0,2.6,1.6));let i=this.v;this.placeSplitSide(n.left,t,-4,i,n.label),this.placeSplitSide(n.right,t,4,i,n.label),this.rideTo(r+e.len,4);break}case`canyon`:{let i=Yd[4],a=r+34;this.rideTo(a),this.checkpoint(a-26);let o=Y(Math.sqrt(Math.max(1,this.v*this.v-2*Hd*i.kH)),14.5,17.5),s=a+md(i.kH,i.lip),c=hd({s0:a,v:o,kH:i.kH,lipDeg:i.lip,lineAtLip:t.baseY(s),lineSlope:t.baseY(s+.5)-t.baseY(s-.5),fill:`gap`,kd:-1.2,depth:26,hw:this.moundHw(s),skirt:3,trenchHw:1/0,label:n.label??`Canyon Gap`});this.add(c),this.jumpExtras(c,!0,2600),this.rideTo(r+e.len);break}case`finish`:this.rideTo(r+20),t.finishS=r+22,this.rideTo(r+e.len)}}placeSplitSide(e,t,n,r,i){let a=this.track;if(e===`rollers`){this.add(new _d(t-6,6,5.6,.8,n,2.2));return}let o=e===`big`?3:2,s=Yd[o],c=Y(Math.sqrt(Math.max(1,r*r-2*Hd*s.kH)),s.vMin,s.vMax),l=t+md(s.kH,s.lip),u=hd({s0:t,v:c,kH:s.kH,lipDeg:s.lip,lineAtLip:a.baseY(l),lineSlope:a.baseY(l+.5)-a.baseY(l-.5),fill:e===`table`?`table`:`gap`,kd:e===`table`?-.25:-.5,depth:e===`table`?0:3+o,dc:n,hw:2.1,skirt:1.6,label:e===`big`?i??`Hero Line`:void 0});this.add(u),e!==`table`&&this.jumpExtras(u,!0,e===`big`?900:400,n)}jumpExtras(e,t,n=0,r=0){let i=e.spec,a=i.vDesign*Math.cos(i.lip),o=i.vDesign*Math.sin(i.lip),s=e.knuckleS-e.lipS,c=a*o/Hd,l=i.lipY+o*o/(2*Hd),u=this.track.height(e.lipS+c,r);if(this.tokensWanted.push({s:e.lipS+c,d:r,y:l-u+.25,prio:t?3:1}),t){let t=i.label??(s>11?`Big Gap`:`Gap`);this.track.gaps.push({name:t,a0:e.lipS-1.5,a1:e.lipS+.6,b0:e.knuckleS-1,b1:e.landEndS,points:n||Math.round(120+s*30)})}}checkpoint(e){let t=this.track.checkpoints;t.length&&e-t[t.length-1].s<30||t.push({s:e,d:0,v:Math.min(Math.max(Gd,this.v),this.cap(e))})}finishUp(){let e=this.track,t=this.tokensWanted.filter(t=>t.s>30&&t.s<e.finishS-10).sort((e,t)=>t.prio-e.prio||e.s-t.s),n=[];for(let e of t){if(n.length>=3)break;n.every(t=>Math.abs(t.s-e.s)>60)&&n.push(e)}for(let e of t){if(n.length>=3)break;!n.includes(e)&&n.every(t=>Math.abs(t.s-e.s)>25)&&n.push(e)}n.sort((e,t)=>e.s-t.s);for(let t of n)e.tokens.push({s:t.s,d:t.d,y:Y(t.y,.8,6)});e.checkpoints.sort((e,t)=>e.s-t.s)}},of=(e,t,n=`mesa`)=>{let r=(n,r)=>Math.max(n,Math.min(r,Math.round(n+(r-n)*Math.min(1,t+e.range(-.2,.25))))),i=n===`pines`;switch(e.weighted({table:3,gap:3+t*2,drop:1.5+t*2,rollers:2,berm:2,spine:n===`town`?0:1.2,split:1.2,step:1+t,kicker:1,chute:1.4,ridge:n===`town`||i?.4:1.4,switchbacks:.9,slab:n===`mesa`||n===`ember`?.9:.2})){case`chute`:return[{t:`chute`,len:e.int(30,50),grade:-e.range(.32,.42),turn:e.range(-12,12),rough:e.chance(.6)?i?`roots`:`rocks`:void 0}];case`ridge`:return[{t:`ridge`,len:e.int(40,70),turn:e.range(-16,16)}];case`switchbacks`:return[{t:`switchbacks`,n:e.int(1,3),leg:e.int(22,28),radius:e.range(6.5,8),dir:e.sign()}];case`slab`:return[{t:`slab`,len:e.int(20,32)}];case`table`:return[{t:`table`,size:r(1,3)}];case`gap`:return[{t:`gap`,size:r(2,4)}];case`drop`:return[{t:`drop`,h:Math.round(e.range(3,5+t*5))}];case`rollers`:return[{t:`rollers`,n:e.int(3,5),turn:e.range(-12,12)}];case`berm`:return[{t:`berm`,turn:e.sign()*e.range(55,85)}];case`spine`:return[{t:`spine`,len:e.int(35,60),turn:e.range(-14,14)}];case`split`:return[{t:`split`,left:e.pick([`big`,`gap`]),right:e.pick([`table`,`rollers`])}];case`step`:return[{t:`step`,size:r(2,3),down:Math.round(e.range(2,3+t*2))}];default:return[{t:`kicker`,size:r(1,3)}]}},sf=(e=new Date)=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,cf=(e=sf())=>{let t=td(`huckline-daily-${e}`),n=id[t%id.length].id;for(let r=0;;r++){let i=t+r*7919>>>0,a=lf(i,n);if(r<30&&ef({seed:i,steps:a},od(n).style)<3)continue;let o=new Date(`${e}T12:00:00`).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`});return{id:`daily-${e}`,world:n,name:`Daily · ${o}`,blurb:`One line for everyone today. Best score wins the day.`,recipe:{seed:i,steps:a},par:80,goals:[15e3,35e3],rival:`Today`}}},lf=(e,t)=>{let n=new ld(e),r=[{t:`start`},{t:`rollin`,len:n.int(14,20),grade:-n.range(.5,.68)},{t:`run`,len:24}],i=n.int(9,11),a=!1;for(let e=0;e<i;e++){let o=of(n,.25+e/i*.55,t);o[0].t===`switchbacks`&&a||(a=o[0].t===`switchbacks`,r.push(...o),n.chance(.55)&&r.push({t:n.chance(.5)?`open`:`run`,len:n.int(18,34),turn:n.range(-16,16)}))}return r.push(n.chance(.5)?{t:`canyon`,label:`Daily Gap`}:{t:`table`,size:4}),r.push({t:`run`,len:18},{t:`finish`}),r},uf=e=>{for(let t=0;;t++){let n=e+t*7919>>>0,r=df(n);if(!(t<30&&ef({seed:n,steps:r},od(`mesa`).style)<3))return{id:`endless`,world:`mesa`,name:`Endless Ridge`,blurb:`One life. It only gets bigger.`,recipe:{seed:n,steps:r},par:0,goals:[2e4,6e4],rival:``}}},df=e=>{let t=new ld(e),n=[{t:`start`},{t:`rollin`,len:16,grade:-.6},{t:`run`,len:22}],r=!1;for(let e=0;e<30;e++){let i=of(t,Math.min(1,e/22));i[0].t===`switchbacks`&&r||(r=i[0].t===`switchbacks`,n.push(...i),t.chance(.45)&&n.push({t:`run`,len:t.int(16,30),turn:t.range(-18,18)}))}return n.push({t:`run`,len:20},{t:`finish`}),n},ff=(e=0,t=0,n=0)=>({x:e,y:t,z:n}),pf=(e,t,n,r)=>(e.x=t,e.y=n,e.z=r,e),mf=(e,t)=>(e.x=t.x,e.y=t.y,e.z=t.z,e),hf=(e,t)=>e.x*t.x+e.y*t.y+e.z*t.z,gf=e=>Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z),_f=(e,t,n)=>pf(e,t.y*n.z-t.z*n.y,t.z*n.x-t.x*n.z,t.x*n.y-t.y*n.x),vf=(e,t,n,r)=>pf(e,t.x+n.x*r,t.y+n.y*r,t.z+n.z*r),yf=(e,t=e)=>{let n=gf(t)||1;return pf(e,t.x/n,t.y/n,t.z/n)},bf=(e,t,n)=>{let r=Math.cos(n),i=Math.sin(n),a=hf(t,e)*(1-r),o=t.y*e.z-t.z*e.y,s=t.z*e.x-t.x*e.z,c=t.x*e.y-t.y*e.x;return pf(e,e.x*r+o*i+t.x*a,e.y*r+s*i+t.y*a,e.z*r+c*i+t.z*a)},xf=(e,t,n)=>{let r=hf(t,n);return pf(e,t.x-n.x*r,t.y-n.y*r,t.z-n.z*r)},Sf=[`superman`,`cancan`,`nohander`],Cf=()=>({steer:0,throttle:0,flip:0,hold:!1,style:null}),wf={snap:!0,speed:1.1,level:7,land:1.15,edge:1},Tf={snap:!1,speed:.95,level:3,land:.9,edge:.5},Ef=Object.freeze(ff(0,1,0)),Df=ff(),Of=ff(),kf=Nd(),Af={s:0,d:0},jf=class{spec;track;p=ff();v=ff();F=ff(1,0,0);U=ff(0,1,0);R=ff(0,0,1);mode=`ground`;s=0;d=0;heading=0;speed=0;pitch=0;lean=0;bar=0;steerIn=0;yawRate=0;pitchRate=0;spinRate=0;rollRate=0;crouch=0;compress=0;compressV=0;sliding=0;braking=0;pedalling=0;rough=0;speedTarget=NaN;kick=0;kickSign=1;lastBump=0;surface=`dirt`;air=Mf();style=null;wheelAngle=0;popped=!1;lastLand=null;sinceLand=9;agl=0;assist=wf;pumping=0;bailT=0;wasHold=!1;vyG=0;yawOff=0;pitchOff=0;rollA=0;landIn=9;landAng=0;landS=0;forecastT=0;popQ=null;crouchAtTakeoff=0;jumpFrom=null;carryLeft=0;carryNeed=0;latNeed=0;latLeft=0;latDir=ff();constructor(e,t){this.spec=e,this.track=t}place(e,t,n){let r=this.track;r.frame(e,kf),this.s=e,this.d=t;let i=r.toWorld(e,t,Lf);pf(this.p,i.x,r.height(e,t),i.z),this.heading=kf.h,this.speed=n,this.mode=`ground`,this.yawRate=this.pitchRate=this.spinRate=this.rollRate=0,this.style=null,this.crouch=0,this.compress=0,this.compressV=0,this.sliding=0,this.steerIn=0,this.sinceLand=9,this.bailT=0,this.popQ=null,this.jumpFrom=null,this.carryLeft=this.carryNeed=0,this.groundFrame(0),pf(this.v,this.F.x*n,this.F.y*n,this.F.z*n),this.vyG=this.v.y}step(e,t){if(this.popped=!1,this.sinceLand+=e,this.mode===`ground`)this.groundStep(e,t);else if(this.mode===`air`){let n=this.airStep(e,t);return this.wasHold=t.hold,n}else this.bailStep(e);return this.wasHold=t.hold,null}slopes(e,t,n,r){let i=this.track,a=ed(kf.h,n),o=.35,s=Math.cos(a),c=Math.sin(a),l=1/Math.max(.3,1-kf.k*t),u=i.height(e+o*s*l,t+o*c),d=i.height(e-o*s*l,t-o*c),f=i.height(e-o*c*l,t+o*s),p=i.height(e+o*c*l,t-o*s);r.f=(u-d)/(2*o),r.r=(f-p)/(2*o)}groundStep(e,t){let n=this.track,r=this.spec,i=this.assist;n.toTrack(this.p.x,this.p.z,this.s,Af),this.s=Af.s,this.d=Af.d,n.frame(this.s,kf);let a=kf.h,o=n.profile(this.s).half;this.surface=n.surface(this.s,this.d);let s=Nf;this.slopes(this.s,this.d,this.heading,s);let c=this.speed;this.steerIn+=(t.steer-this.steerIn)*Z(12,e);let l=this.steerIn*Y(.36*c,3.2,6.5),u=o+.15,d=Math.abs(this.d)-(u-1.1);d>0&&this.steerIn*Math.sign(this.d)<.6&&(l-=Math.sign(this.d)*d*2.6*i.edge);let f=n.structureAt(this.s,this.d),p=f?f.half??9:9;if(f&&p<o){let e=f.dc??0,t=this.d-e;l=l*.35-t*3.2*i.edge}let m=n.roughItems.length?n.roughH(this.s+.6,this.d):0;m>this.lastBump+.025&&c>4&&(this.kick+=(this.kickSign=-this.kickSign)*m*(t.hold?.6:2.2)*Math.min(1,c/12)),this.lastBump=m,this.kick*=1-Z(6,e);let h=a+(Math.asin(Y(l/Math.max(c,2.5),-.6,.6))+this.kick),g=ed(this.heading,h),_=kf.k*c*Math.cos(this.heading-a)/Math.max(.3,1-kf.k*this.d),v=g*6.5+_,y=(qd[this.surface]??1)*r.grip,b=Y(s.r*Math.sign(v||1),-.8,.8),x=Hd*Y((y+b)/Math.max(.2,1-y*b),.25,3.5)/Math.max(c,1.5);this.sliding=Math.max(0,this.sliding-e*3),Math.abs(v)>x&&(this.sliding=Math.min(1,this.sliding+e*8),c-=(Math.abs(v)-x)*c*.25*e,v=Math.sign(v)*x),this.yawRate=v,this.heading+=v*e;let S=t.throttle??0,C=S<-.25?Math.min(1,(-S-.25)/.55):0,w=S>.25?Math.min(1,(S-.25)/.55):0;this.braking+=(C-this.braking)*Z(14,e),this.pedalling+=(w-this.pedalling)*Z(10,e);let T=n.rough(this.s),E=T===1?.022:T===2?.03:T===3?.008:0;this.rough+=((T===2?1:T===1?.75:T===3?.35:0)-this.rough)*Z(6,e);let D=(Ud[this.surface]??.014)+E*(t.hold?.4:1),O=1/Math.sqrt(1+s.f*s.f),k=s.f*O,A=-Hd*k-D*Hd*O-Wd/r.speed*c*c;c<9.5&&C===0&&(A+=Kd*Math.min(1,(Gd-c)/2)),w>0&&c<15&&(A+=3.4*w*Math.min(1,(15-c)/4)),C>0&&c>.8&&(A-=7.2*C,c>5&&(this.sliding=Math.max(this.sliding,C*.7))),c>21*r.speed&&(A-=3*(c-21*r.speed)),this.pumping=0,t.hold&&s.f<-.06&&(this.pumping=Math.min(2.2,-s.f*4.5),A+=this.pumping);let j=n.featuresNear(this.s);this.speedTarget=NaN;for(let e=0;e<j.length;e++){let t=j[e],n=t.assist;if(!n||this.s<n.a0||this.s>n.a1||Math.abs(this.d-(t.dc??0))>4.5)continue;let r=Y((this.s-n.a0)/12,0,1),a=n.y===void 0?n.v:Math.sqrt(Math.max(1,n.v*n.v+2*Hd*(n.y-this.p.y)*1.04));if(n.brake||(this.speedTarget=a),n.brake&&c<=a)continue;let o=Y(1-(n.a1-this.s)/18,0,1),s=1-Math.max(C,w)*.85;A+=(a-c)*i.speed*(1.6+3.5*o*o)*r*(c>a?1.4:1)*s}c=Math.max(1.2,c+A*e),this.speed=c;let M=this.crouch;this.crouch=t.hold?Math.min(1,this.crouch+e*4.5):Math.max(0,this.crouch-e*9);let N=this.wasHold&&!t.hold&&M>.18,ee=0,te=!1;if(N){let e=this.nextLip(),t=e===null?9:(e-this.s)/Math.max(c,1);te=t>=-.04&&t<.3,ee=r.pop*(.55+.45*M)+(te?.45:0),t>.07&&t<.6&&(this.popQ={imp:ee,perfect:te,ttl:t+.25},N=!1)}this.popQ&&!N&&(this.popQ.ttl-=e,this.popQ.ttl<=0&&(ee=this.popQ.imp*.85,te=!1,this.popQ=null,N=!0));let P=c*O,ne=Math.cos(this.heading),re=Math.sin(this.heading),ie=this.p.x+ne*P*e,ae=this.p.z+re*P*e,oe=ed(a,this.heading),F=this.s+P*e*Math.cos(oe)/Math.max(.3,1-kf.k*this.d),se=this.d+P*e*Math.sin(oe),ce=n.height(F,se),le=Y(this.vyG,-P*2.2,P*1.2),ue=this.p.y+le*e-.5*Hd*e*e;if(this.wheelAngle+=c/r.wheelR*e,N){this.crouchAtTakeoff=0;let t=this.launch(P,le,ne,re);this.takeoff(t.x,t.y,t.z,ee,!0,te),this.p.x=ie,this.p.z=ae,this.p.y=Math.max(ce,this.p.y+le*e);return}if(ue>ce+.004){let e=this.popQ;this.popQ=null,this.crouchAtTakeoff=e?0:M;let t=this.launch(P,le,ne,re);this.takeoff(t.x,t.y,t.z,e?e.imp:0,!!e,e?e.perfect:!1),this.p.x=ie,this.p.z=ae,this.p.y=ue;return}let I=(ce-this.p.y)/e;this.vyG=I;let de=(I-le)/e;this.compressV+=(Y(de/40,-.5,1.5)-this.compress)*30*e-this.compressV*10*e,this.compress=Y(this.compress+this.compressV*e,0,1),this.p.x=ie,this.p.z=ae,this.p.y=ce,this.s=F,this.d=se,this.groundFrame(e),pf(this.v,this.F.x*c,this.F.y*c,this.F.z*c),this.agl=0}nextLip(){let e=this.track.featuresNear(this.s+4),t=null;for(let n of e){let e=n.keys[0];if(e===void 0||e<this.s-1||n.kind!==`jump`&&n.kind!==`drop`&&n.kind!==`woodKicker`&&n.kind!==`woodDeck`||Math.abs(this.d-(n.dc??0))>2.8||n instanceof pd&&n.spec.kH<.01)continue;let r=n.kind===`woodDeck`?n.s1:e;(t===null||r<t)&&(t=r)}return t}lipHere(){for(let e of this.track.featuresNear(this.s))if(!(!(e instanceof pd)||e.spec.kH<.01&&!e.spec.woodLip)&&!(this.s<e.lipS-1.6||this.s>e.lipS+.9)&&!(Math.abs(this.d-e.spec.dc)>(e.spec.hw===1/0?99:e.spec.hw+.5)))return e;return null}jumpLeaving(){for(let e of this.track.featuresNear(this.s))if(e instanceof pd&&!(this.s<e.lipS-2.5||this.s>e.knuckleS-1)&&!(Math.abs(this.d-e.spec.dc)>(e.spec.hw===1/0?99:e.spec.hw+1)))return e;return null}launch(e,t,n,r){let i=this.speed,a=i/Math.max(.1,Math.hypot(e,t)),o=this.assist.snap?this.lipHere():null;if(o){let e=o.spec.vDesign,t=Y(i,e*.99,e*1.06),a=Math.cos(o.spec.lip),s=Math.sin(o.spec.lip);return{x:n*t*a,y:t*s,z:r*t*a}}return{x:n*e*a,y:t*a,z:r*e*a}}groundFrame(e){let t=this.track,n=this.spec.wheelbase;t.frame(this.s,kf);let r=ed(kf.h,this.heading),i=1/Math.max(.3,1-kf.k*this.d),a=n/2*Math.cos(r)*i,o=n/2*Math.sin(r),s=t.height(this.s+a,this.d+o),c=t.height(this.s-a,this.d-o),l=Math.atan2(s-c,n);this.pitch=l;let u=Math.cos(l);pf(this.F,Math.cos(this.heading)*u,Math.sin(l),Math.sin(this.heading)*u);let d=Y(Math.atan(this.speed*this.yawRate/Hd),-.9,.9);this.lean+=(d-this.lean)*(e>0?Z(10,e):1),xf(this.U,Ef,this.F),yf(this.U),bf(this.U,this.F,this.lean),_f(this.R,this.F,this.U),yf(this.R),this.bar+=(Y(this.yawRate*.18,-.5,.5)-this.bar)*(e>0?Z(12,e):1)}takeoff(e,t,n,r,i,a){pf(this.v,e,t+r,n),this.jumpFrom=this.jumpLeaving();let o=Math.hypot(e,n);this.carryLeft=this.jumpFrom?o*(this.assist.snap?.2:.1):0,this.carryNeed=0,this.latNeed=0,this.latLeft=this.assist.snap?2.6:0,this.mode=`air`,this.popped=i,this.air=Mf(),this.air.takeoffY=this.p.y,this.air.maxY=this.p.y,this.air.takeoffS=this.s,this.air.perfectPop=a,this.air.popped=i,this.pitchRate=0,this.spinRate=0,this.rollRate=0,this.crouch=0;let s=Math.hypot(this.v.x,this.v.z),c=Math.atan2(this.v.z,this.v.x);this.yawOff=ed(c,this.heading),this.pitchOff=this.pitch-Math.atan2(this.v.y,Math.max(.3,s)),this.rollA=this.lean,this.forecastT=0,this.landIn=9}airStep(e,t){let n=this.spec,r=this.air;if(r.t+=e,!r.popped&&r.t<.14&&this.wasHold&&!t.hold&&this.crouchAtTakeoff>.18&&(this.v.y+=n.pop*(.55+.45*this.crouchAtTakeoff)*.9,r.popped=!0,this.popped=!0,this.crouchAtTakeoff=0),r.t>=.14&&(this.crouchAtTakeoff=0),this.carryNeed>0&&this.carryLeft>0){let t=Math.min(this.carryNeed,this.carryLeft,7*e),n=Math.hypot(this.v.x,this.v.z)||1;this.v.x+=this.v.x/n*t,this.v.z+=this.v.z/n*t,this.carryNeed-=t,this.carryLeft-=t}if(this.latNeed!==0&&this.latLeft>0){let t=Math.min(Math.abs(this.latNeed),this.latLeft,4*e)*Math.sign(this.latNeed);this.v.x+=this.latDir.x*t,this.v.z+=this.latDir.z*t,this.latNeed-=t,this.latLeft-=Math.abs(t)}this.v.y-=Hd*e;let i=1-.0012*gf(this.v)*e;this.v.x*=i,this.v.y*=i,this.v.z*=i;let a=n.flipRate*Math.PI/180,o=n.spinRate*Math.PI/180,s=t.flip,c=t.steer,l=this.assist.level,u=Math.abs(s)>.12?s*a:this.settle(r.pitch,this.pitchRate,a,l),d=Math.abs(c)>.12?c*o:this.settle(r.yaw,this.spinRate,o,l),f=Math.abs(s)>.12?11:8,p=Math.abs(c)>.12?11:8;this.pitchRate+=(u-this.pitchRate)*Z(f,e),this.spinRate+=(d-this.spinRate)*Z(p,e),r.pitch+=this.pitchRate*e,r.yaw+=this.spinRate*e,this.rollA+=-this.rollA*Z(5,e),this.yawOff+=-this.yawOff*Z(4,e),this.forecastT-=e,this.forecastT<=0?(this.forecast(),this.forecastT=.05):this.landIn-=e;let m=Math.hypot(this.v.x,this.v.z),h=Math.atan2(this.v.y,Math.max(.3,m)),g=Y((.55-this.landIn)/.4,0,1)*Math.min(1,this.assist.level/7),_=(this.landAng-h)*g;this.pitchOff+=(_-this.pitchOff)*Z(4+6*g,e),this.airBasis(),this.wheelAngle+=this.speed/n.wheelR*e*.98,this.styleStep(e,t),vf(this.p,this.p,this.v,e),r.maxY=Math.max(r.maxY,this.p.y),this.lean*=1-Z(4,e),this.bar*=1-Z(4,e);let v=this.track;v.toTrack(this.p.x,this.p.z,this.s,Af),this.s=Af.s,this.d=Af.d;let y=v.height(this.s,this.d);this.agl=this.p.y-y;let b=n.wheelR,x=n.wheelbase;xf(Of,Ff,this.R),gf(Of)<.2&&pf(Of,-this.U.x,-this.U.y,-this.U.z),yf(Of);let S=!1;for(let e of[-1,1]){let t=this.p.x+this.U.x*b+this.F.x*(x/2)*e+Of.x*b,n=this.p.y+this.U.y*b+this.F.y*(x/2)*e+Of.y*b,r=this.p.z+this.U.z*b+this.F.z*(x/2)*e+Of.z*b;n<=this.groundAt(t,r)+.01&&(S=!0)}let C=this.p.x+this.U.x*1.45,w=this.p.y+this.U.y*1.45,T=this.p.z+this.U.z*1.45,E=w<=this.groundAt(C,T)+.05;return!S&&!E||!E&&this.separating()?null:this.land(E&&!S)}settle(e,t,n,r){let i=Math.PI*2,a=Math.round(e/i)*i;if(Math.abs(t)>1.6){let n=Math.sign(t)>0?Math.ceil(e/i-1e-6)*i:Math.floor(e/i+1e-6)*i;Math.abs(n-e)<i*.62&&(a=n)}let o=a-e,s=o*r;return Math.abs(o)>.35&&(s=Math.sign(o)*Math.max(Math.abs(s),Math.min(n,Math.abs(t))*.85)),Y(s,-n,n)}forecast(){let e=this.track,t=this.p.x,n=this.p.y,r=this.p.z,i=this.v.y,a=1/40,o=this.s,s=Math.hypot(this.v.x,this.v.z)||1,c=this.v.x/s,l=this.v.z/s;for(let s=1;s<160;s++)if(t+=this.v.x*a,r+=this.v.z*a,i-=Hd*a,n+=i*a,e.toTrack(t,r,o,If),o=If.s,n<=e.height(If.s,If.d)){this.landIn=s*a,this.landS=o;let n=this.jumpFrom;if(n&&this.landIn>.08){let e=n.knuckleS+1.2;this.carryNeed=o<e?(e+.4-o)/Math.max(.15,this.landIn):0}if(this.latLeft>0&&this.landIn>.12){let t=e.profile(If.s).half,r=n&&n.spec.hw!==1/0?n.spec.dc:0,i=n&&n.spec.hw!==1/0?n.spec.hw:t,a=r-i+.5,o=r+i-.5,s=If.d,c=s<a?a-s:s>o?o-s:0;e.frame(If.s,kf),pf(this.latDir,-Math.sin(kf.h),0,Math.cos(kf.h)),this.latNeed=c/Math.max(.2,this.landIn)}let i=.5;e.toTrack(t+c*i,r+l*i,o,Rf);let u=e.height(Rf.s,Rf.d);e.toTrack(t-c*i,r-l*i,o,Rf);let d=e.height(Rf.s,Rf.d);this.landAng=Math.atan2(u-d,2*i);return}this.landIn=9,this.landAng=0}setTrickPose(e,t,n){this.mode===`air`&&(this.air.pitch=e,this.air.yaw=t,this.pitchOff=0,this.yawOff=0,this.style=n?{kind:n,t:.2,n:1,dur:.6,recover:0,held:!0}:null,this.airBasis())}airBasis(){let e=Math.hypot(this.v.x,this.v.z),t=e>.3?Math.atan2(this.v.z,this.v.x):this.heading,n=Math.atan2(this.v.y,Math.max(.3,e)),r=t+this.yawOff+this.air.yaw,i=n+this.pitchOff+this.air.pitch,a=Math.cos(r),o=Math.sin(r),s=Math.cos(i),c=Math.sin(i);pf(this.F,a*s,c,o*s),pf(this.U,-a*c,s,-o*c),_f(this.R,this.F,this.U),this.rollA!==0&&(bf(this.U,this.F,this.rollA),_f(this.R,this.F,this.U)),yf(this.R)}separating(){let e=this.track,t=.3;e.frame(this.s,kf);let n=(e.height(this.s+t,this.d)-e.height(this.s-t,this.d))/(2*t),r=(e.height(this.s,this.d+t)-e.height(this.s,this.d-t))/(2*t),i=Math.cos(kf.h),a=Math.sin(kf.h);return pf(Pf,-n*i+r*a,1,-n*a-r*i),yf(Pf),hf(this.v,Pf)>.3}groundAt(e,t){let n=this.track;return n.toTrack(e,t,this.s,If),n.height(If.s,If.d)}styleStep(e,t){let n=this.spec,r=this.style;if(t.style){let e=t.style,i=Sf.includes(e);if(!r)this.style={kind:e,t:0,n:+!i,dur:i?.18:e===`barspin`?n.barTime:n.whipTime,recover:0,held:i},this.air.styles.push({kind:e,n:+!i,held:0});else if(r.kind===e&&!i&&r.t>r.dur*r.n-.25){r.n+=1;let t=this.air.styles[this.air.styles.length-1];t&&t.kind===e&&(t.n=r.n)}}let i=this.style;if(i){if(i.t+=e,Sf.includes(i.kind)){if(i.held&&t.hold){i.n+=e;let t=this.air.styles[this.air.styles.length-1];t&&(t.held=i.n)}else i.held?(i.held=!1,i.recover=.24):(i.recover-=e,i.recover<=0&&(this.style=null))}else i.t>=i.dur*i.n&&(this.style=null)}}land(e){let t=this.track,n=this.air,r=.3;t.toTrack(this.p.x,this.p.z,this.s,Af),t.frame(Af.s,kf);let i=t.height(Af.s+r,Af.d),a=t.height(Af.s-r,Af.d),o=t.height(Af.s,Af.d+r),s=t.height(Af.s,Af.d-r),c=(i-a)/(2*r),l=(o-s)/(2*r),u=Math.cos(kf.h),d=Math.sin(kf.h),f=-d,p=u,m=Pf;pf(m,-c*u-l*f,1,-c*d-l*p),yf(m);let h=-hf(this.v,m);xf(Df,this.v,m);let g=gf(Df);yf(Df);let _=Y(hf(this.F,Df),-1,1),v=Math.acos(_),y=Math.acos(Y(hf(this.U,m),-1,1)),b=Math.max(v,y*.85)*180/Math.PI,x=this.spec.stability*this.assist.land,S,C;e?(S=`bail`,C=`head`):_<0?(S=`bail`,C=`backwards`):this.style&&(this.style.held||this.style.recover>.06||!Sf.includes(this.style.kind))?(S=`bail`,C=`style`):h>14.5?(S=`bail`,C=`hard`):b<8*x?S=`perfect`:b<21*x?S=`clean`:b<37*x?S=`sketchy`:(S=`bail`,C=`angle`);let w=n.t<.2&&!this.style&&Math.abs(n.pitch)<.6&&Math.abs(n.yaw)<.6&&!e&&h<9;w&&(S=b<8*x?`perfect`:`clean`);let T={quality:S,err:b,impact:h,reason:w?void 0:C,air:n,landS:Af.s,micro:w};if(this.lastLand=T,this.sinceLand=0,this.jumpFrom=null,this.carryNeed=this.carryLeft=0,this.popQ=null,S===`bail`)return this.mode=`bail`,this.bailT=0,this.style=null,T;let E=S===`perfect`?1.04:S===`clean`?.97:.8,D=h>9.5?.82:1;return this.speed=Math.max(3,g*Math.max(.35,_)*E*D),this.heading=Math.atan2(this.F.z,this.F.x),this.s=Af.s,this.d=Af.d,this.p.y=t.height(Af.s,Af.d),this.mode=`ground`,this.style=null,this.compress=Y(h/9,.2,1),this.compressV=0,this.pitchRate=this.spinRate=this.rollRate=0,this.groundFrame(0),pf(this.v,this.F.x*this.speed,this.F.y*this.speed,this.F.z*this.speed),this.vyG=this.v.y,T}bailStep(e){this.bailT+=e;let t=this.track;this.v.y-=Hd*e,vf(this.p,this.p,this.v,e),t.toTrack(this.p.x,this.p.z,this.s,Af),this.s=Af.s,this.d=Af.d;let n=t.height(Af.s,Af.d);if(this.p.y<n){this.p.y=n,this.v.y<0&&(this.v.y=-this.v.y*.25);let t=1-Z(2.5,e);this.v.x*=t,this.v.z*=t}bf(this.F,this.R,e*2.5*Math.max(0,1-this.bailT)),bf(this.U,this.R,e*2.5*Math.max(0,1-this.bailT))}basis(e,t,n){mf(e,this.F),mf(t,this.U),mf(n,this.R)}},Mf=()=>({t:0,pitch:0,yaw:0,styles:[],takeoffY:0,maxY:0,takeoffS:0,perfectPop:!1,popped:!1}),Nf={f:0,r:0},Pf=ff(),Ff=Object.freeze(ff(0,-1,0)),If={s:0,d:0},Lf={x:0,z:0},Rf={s:0,d:0},zf={ambition:1,margin:.36,pops:!0,side:-1,seed:7},Bf=class{run;skill;plan=null;airFor=0;styleSent=0;rng;out=Cf();holdT=0;constructor(e,t){this.run=e,this.skill=t,this.rng=new ld(t.seed)}input(){let e=this.run,t=e.bike,n=e.track,r=this.out;if(r.style=null,t.mode===`ground`){this.plan=null,this.airFor=0;let e=0;for(let r of n.featuresNear(t.s+20))if(r.dc&&r.s0>t.s-5&&r.s0<t.s+60){let t=this.skill.side||-1;Math.sign(r.dc)===Math.sign(t)&&(e=r.dc)}for(let r of n.featuresNear(t.s))r.kind===`fin`&&t.s>r.s0-2&&t.s<r.s1+2&&Math.abs(t.d)>1&&(e=Math.sign(t.d)*Math.max(Math.abs(e),3.2));r.steer=Math.max(-1,Math.min(1,(e-t.d)*.55)),r.flip=0;let i=t.nextLip(),a=i===null?9:(i-t.s)/Math.max(1,t.speed);return r.hold=!!(this.skill.pops&&a<.55&&a>.03),r}if(t.mode!==`air`)return r.steer=0,r.flip=0,r.hold=!1,r;this.airFor+=1/120,this.plan||=this.choose();let i=this.plan,a=t.air,o=i.flips*Math.PI*2;r.flip=i.flips!==0&&Math.abs(a.pitch)<Math.abs(o)-.7?Math.sign(i.flips):0;let s=i.spins*Math.PI*2;if(r.steer=i.spins!==0&&Math.abs(a.yaw)<Math.abs(s)-.7?-1:0,r.hold=!1,i.style){let e=i.style===`superman`||i.style===`cancan`||i.style===`nohander`,n=e?.75:(i.style===`barspin`?t.spec.barTime:t.spec.whipTime)+.3;this.airFor>.12&&this.styleSent<(e?1:i.styleN)&&t.landIn>n&&(!t.style||!e&&t.style.t>t.style.dur*t.style.n-.2)&&(r.style=i.style,this.styleSent++,this.holdT=0),e&&this.styleSent>0&&(this.holdT+=1/120,r.hold=this.holdT<i.hold&&t.landIn>.42)}return r}choose(){this.styleSent=0;let e=this.run.bike,t=this.hangTime()-this.skill.margin,n=e.spec,r=Math.PI*2/(n.flipRate*Math.PI/180)+.34,i=Math.PI*2/(n.spinRate*Math.PI/180)+.3,a={flips:0,spins:0,style:null,styleN:0,hold:0};if(this.skill.ambition<=0||t<.35)return a;let o=this.rng.next();t>r*2&&this.skill.ambition>.7?a.flips=2:t>r?a.flips=o<.25?-1:1:t>i&&(a.spins=1);let s=t-(a.flips||a.spins?.25:0);if(s>n.whipTime+.2){let e=this.rng.next();e<.4?(a.style=`tailwhip`,a.styleN=s>n.whipTime*2+.3?2:1):e<.7?(a.style=`superman`,a.hold=Math.min(1.4,s-.55)):(a.style=`barspin`,a.styleN=s>n.barTime*2+.3?2:1)}return a}hangTime(){let e=this.run.bike,t=this.run.track,n=e.p.x,r=e.p.y,i=e.p.z,a=e.v.y,o=1/60,s=e.s,c={s:0,d:0};for(let l=0;l<600;l++)if(n+=e.v.x*o,i+=e.v.z*o,a-=Hd*o,r+=a*o,t.toTrack(n,i,s,c),s=c.s,r<=t.height(c.s,c.d))return l*o;return 10}},Vf=[null,`tailwhip`,`barspin`,`superman`,`cancan`,`nohander`],Hf=28,Uf=class e{buf;bytes;frames=0;time=0;acc=0;constructor(e=1920){this.bytes=new Uint8Array(e*Hf),this.buf=new DataView(this.bytes.buffer)}record(e,t){if(this.acc-=t,this.acc>0||(this.acc+=1/8,(this.frames+1)*Hf>this.bytes.length))return;let n=e.bike,r=this.frames*Hf,i=this.buf;i.setFloat32(r,n.s,!0),i.setFloat32(r+4,n.p.x,!0),i.setFloat32(r+8,n.p.y,!0),i.setFloat32(r+12,n.p.z,!0);let a=Wf(-n.R.x,-n.R.y,-n.R.z,n.U.x,n.U.y,n.U.z,n.F.x,n.F.y,n.F.z);i.setInt16(r+16,Math.round(a[0]*32767),!0),i.setInt16(r+18,Math.round(a[1]*32767),!0),i.setInt16(r+20,Math.round(a[2]*32767),!0),i.setInt16(r+22,Math.round(a[3]*32767),!0),i.setUint8(r+24,Math.round(Math.max(n.crouch,n.compress*.9)*255));let o=n.style;i.setUint8(r+25,o?Math.max(0,Vf.indexOf(o.kind)):0),i.setUint8(r+26,o?Math.round(Math.min(1,o.t/Math.max(.05,o.dur*o.n))*255):0),i.setUint8(r+27,+(n.mode===`air`)|(n.mode===`bail`?2:0)),this.frames++}f32(e,t){return this.buf.getFloat32(e*Hf+t,!0)}sample(e,t){let n=this.frames;if(n===0)return t;let r=Math.max(0,Math.min(n-1.0001,e*8)),i=Math.floor(r),a=r-i,o=Math.min(n-1,i+1),s=e=>this.f32(i,e)+(this.f32(o,e)-this.f32(i,e))*a;t.s=s(0),t.x=s(4),t.y=s(8),t.z=s(12);let c=this.buf,l=c.getInt16(i*Hf+16,!0)/32767,u=c.getInt16(i*Hf+18,!0)/32767,d=c.getInt16(i*Hf+20,!0)/32767,f=c.getInt16(i*Hf+22,!0)/32767,p=c.getInt16(o*Hf+16,!0)/32767,m=c.getInt16(o*Hf+18,!0)/32767,h=c.getInt16(o*Hf+20,!0)/32767,g=c.getInt16(o*Hf+22,!0)/32767;l*p+u*m+d*h+f*g<0&&(p=-p,m=-m,h=-h,g=-g),l+=(p-l)*a,u+=(m-u)*a,d+=(h-d)*a,f+=(g-f)*a;let _=Math.hypot(l,u,d,f)||1;return t.qx=l/_,t.qy=u/_,t.qz=d/_,t.qw=f/_,t.crouch=(c.getUint8(i*Hf+24)*(1-a)+c.getUint8(o*Hf+24)*a)/255,t.style=Vf[c.getUint8(i*Hf+25)]??null,t.styleT=c.getUint8(i*Hf+26)/255,t.air=(c.getUint8(i*Hf+27)&1)==1,t}airAround(e){let t=this.frames,n=Math.max(0,Math.min(t-1,Math.round(e*8))),r=e=>(this.buf.getUint8(e*Hf+27)&1)==1;if(!r(n))return 0;let i=n,a=n;for(;i>0&&r(i-1);)i--;for(;a<t-1&&r(a+1);)a++;return(a-i+1)/8}timeAtS(e){let t=this.frames,n=this.f32(0,0);for(let r=1;r<t;r++){let t=this.f32(r,0);if(t>=e&&n<e)return(r-1+(e-n)/Math.max(1e-4,t-n))/8;n=t}return NaN}get duration(){return this.frames/8}encode(){let e=this.bytes.subarray(0,this.frames*Hf),t=``;for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return`${this.time.toFixed(3)}:${btoa(t)}`}static decode(t){try{let n=t.indexOf(`:`),r=Number(t.slice(0,n)),i=atob(t.slice(n+1)),a=new e(Math.ceil(i.length/Hf)+1);for(let e=0;e<i.length;e++)a.bytes[e]=i.charCodeAt(e);return a.frames=Math.floor(i.length/Hf),a.time=r,a.frames>1?a:null}catch{return null}}},Wf=(e,t,n,r,i,a,o,s,c)=>{let l=e+i+c,u,d,f,p;if(l>0){let e=Math.sqrt(l+1)*2;p=.25*e,u=(a-s)/e,d=(o-n)/e,f=(t-r)/e}else if(e>i&&e>c){let l=Math.sqrt(1+e-i-c)*2;p=(a-s)/l,u=.25*l,d=(r+t)/l,f=(o+n)/l}else if(i>c){let l=Math.sqrt(1+i-e-c)*2;p=(o-n)/l,u=(r+t)/l,d=.25*l,f=(s+a)/l}else{let l=Math.sqrt(1+c-e-i)*2;p=(t-r)/l,u=(o+n)/l,d=(s+a)/l,f=.25*l}let m=Math.hypot(u,d,f,p)||1;return[u/m,d/m,f/m,p/m]},Gf=Math.PI*2,Kf={tailwhip:`Tailwhip`,barspin:`Barspin`,superman:`Superman`,cancan:`Can-Can`,nohander:`No-Hander`},qf=[``,``,`Double `,`Triple `,`Quad `,`Quint `],Jf=e=>e===0?``:`${qf[Math.min(Math.abs(e),5)]}${e>0?`Backflip`:`Frontflip`}`,Yf=e=>e===0?``:`${e*360}`,Xf=e=>{let t=e.air,n=[],r=[],i=t.pitch/Gf,a=Math.round(i),o=Math.abs(t.yaw)/Gf,s=Math.round(o);if(a!==0){let e=Math.abs(a),t=a>0?1e3:1250;n.push({label:Jf(a),points:Math.round(t*e*(1+.6*(e-1)))})}s!==0&&n.push({label:Yf(s),points:[0,500,1300,2400,4e3,6e3][Math.min(s,5)]});for(let e of t.styles)if(e.kind===`tailwhip`||e.kind===`barspin`){let t=e.kind===`tailwhip`?600:350,r=e.kind===`tailwhip`?.45:.3;n.push({label:`${qf[Math.min(e.n,5)]}${Kf[e.kind]}`,points:Math.round(t*e.n*(1+r*(e.n-1)))})}else if(e.held>.05){let t=Math.min(e.held,2.5),r=e.kind===`superman`?900:e.kind===`cancan`?700:600;n.push({label:Kf[e.kind],points:Math.round(220+r*t)})}let c=n.length>0,l=n.reduce((e,t)=>e+t.points,0);if(t.t>1.6){let e=t.t>2.4?600:250;r.push(t.t>2.4?`Huge Air`:`Big Air`),l+=e}let u=1+.3*Math.max(0,n.length-1);t.perfectPop&&(r.push(`Perfect Pop`),l+=150,u*=1.1);let d=e.quality;d===`perfect`?(r.push(`Perfect Landing`),u*=1.5):d===`sketchy`&&(r.push(`Sketchy`),u*=.5);let f=d===`bail`?0:Math.round(l*u/10)*10;return{name:n.length?Zf(n.map(e=>e.label)):t.t>.55?t.t>1.6?`Big Air`:`Air`:``,parts:n,base:l,points:f,flips:a,spins:s,quality:d,trick:c,extras:r}},Zf=e=>{let t=[],n=[];for(let r of e)/flip$/.test(r)?t.push(r):/^\d+$/.test(r)?t.unshift(r):n.push(r);return[t.join(` `),...n].filter(Boolean).join(` + `)},Qf=1/120,$f=2.6,ep=class{track;opts;bike;phase=`ready`;time=0;countdown=0;score=0;pending=0;mult=1;chainT=0;chainLive=!1;tokens;gapsDone=new Set;cpIndex=0;bails=0;tricks=0;perfects=0;bestChain=0;biggestAir=0;bestTrick=``;bestTrickPoints=0;gapNames=[];flow=0;inFlow=!1;flowTime=0;closeCalls=0;obstacles=[];passed=new Set;events=[];bailT=0;acc=0;pendingStyle=null;result=null;tick=0;tape=new Uf;constructor(e,t,n={}){this.track=e,this.opts=n,this.bike=new jf(t,e),this.bike.assist=n.assist??wf,this.tokens=e.tokens.map(()=>!1),this.reset()}reset(){let e=this.track;this.bike.place(e.startS,0,.01),this.phase=`ready`,this.time=0,this.score=0,this.pending=0,this.mult=1,this.chainT=0,this.chainLive=!1,this.tokens.fill(!1),this.gapsDone.clear(),this.cpIndex=0,this.bails=0,this.tricks=0,this.perfects=0,this.bestChain=0,this.biggestAir=0,this.bestTrick=``,this.bestTrickPoints=0,this.gapNames=[],this.flow=0,this.inFlow=!1,this.flowTime=0,this.closeCalls=0,this.passed.clear(),this.events=[],this.result=null,this.acc=0,this.tick=0,this.tape=new Uf}start(e=!1){e?(this.phase=`riding`,this.emit({t:`go`})):(this.phase=`countdown`,this.countdown=3)}emit(e){this.events.push(e)}drain(){let e=this.events;return this.events=[],e}queueStyle(e){this.pendingStyle=e}update(e,t){for(this.acc+=Math.min(e,.1);this.acc>=Qf;)this.acc-=Qf,this.fixed(t)}get alpha(){return this.acc/Qf}fixed(e){this.tick++;let t=this.bike;if(this.phase===`ready`||this.phase===`finished`)return;if(this.phase===`countdown`){this.countdown-=Qf,this.countdown<=0&&(this.phase=`riding`,this.emit({t:`go`}));return}if(this.time+=Qf,this.tape.record(this,Qf),this.phase===`bail`){t.step(Qf,tp),this.bailT+=Qf,this.bailT>(this.opts.oneLife?1.8:1.45)&&(this.opts.oneLife?this.finish():this.respawn());return}let n=np;n.steer=e.steer,n.throttle=e.throttle??0,n.flip=e.flip,n.hold=e.hold,n.style=null,e.style&&=(this.pendingStyle=e.style,null),this.pendingStyle&&=(t.mode===`air`&&(n.style=this.pendingStyle,this.emit({t:`style`,kind:this.pendingStyle})),null);let r=t.mode===`air`,i=t.step(Qf,n);!r&&t.mode===`air`?this.emit({t:`takeoff`,popped:t.air.popped,perfectPop:t.air.perfectPop}):r&&t.mode===`air`&&t.popped&&this.emit({t:`pop`}),i&&this.onLand(i),t.mode===`bail`&&this.phase===`riding`?i||this.bail(`crash`):(this.chainLive&&t.mode===`ground`&&(this.chainT+=Qf,this.chainT>2.6&&this.bank()),this.checkWorld())}onLand(e){if(e.micro)return;let t=Xf(e);if(this.biggestAir=Math.max(this.biggestAir,e.air.t),e.quality===`bail`){this.emit({t:`land`,land:e,trick:t}),this.bail(e.reason??`crash`);return}this.emit({t:`land`,land:e,trick:t});let n=this.track.gaps,r=0;for(let t=0;t<n.length;t++){let i=n[t];this.gapsDone.has(t)||e.air.takeoffS>=i.a0&&e.air.takeoffS<=i.a1&&e.landS>=i.b0&&e.landS<=i.b1&&(this.gapsDone.add(t),r+=i.points,this.gapNames.push(i.name),this.emit({t:`gap`,name:i.name,points:i.points}))}e.quality===`perfect`&&this.perfects++,this.addFlow(e.quality===`perfect`?.16:e.quality===`clean`?.07:-.25),r>0&&this.addFlow(.1);let i=Math.round((t.points+r)*(1+this.flow*.8)/10)*10;t.trick&&(this.tricks++,t.points>this.bestTrickPoints&&(this.bestTrickPoints=t.points,this.bestTrick=t.name)),i>0?(this.chainLive?(t.trick||r>0)&&(this.mult=Math.min(10,this.mult+1)):(this.chainLive=!0,this.mult=1),this.pending+=i,this.chainT=0,this.emit({t:`chain`,pending:this.pending,mult:this.mult})):this.chainLive&&(this.chainT=Math.min(this.chainT,$f*.5)),e.quality===`sketchy`&&this.chainLive&&(this.chainT=Math.max(this.chainT,$f*.6))}bank(){if(!this.chainLive)return;let e=this.pending*this.mult;this.score+=e,this.bestChain=Math.max(this.bestChain,e),this.emit({t:`bank`,points:e,mult:this.mult}),this.pending=0,this.mult=1,this.chainLive=!1,this.chainT=0}bail(e){this.flow=0,this.inFlow&&(this.inFlow=!1,this.emit({t:`flow`,on:!1})),this.phase=`bail`,this.bailT=0,this.bails++,this.chainLive&&this.pending>0&&this.emit({t:`lost`,points:this.pending*this.mult}),this.pending=0,this.mult=1,this.chainLive=!1,this.emit({t:`bail`,reason:e})}respawn(){let e=this.track.checkpoints[Math.max(0,this.cpIndex-1)]??{s:this.track.startS+10,d:0,v:8};this.bike.place(e.s,e.d,e.v),this.phase=`riding`,this.emit({t:`respawn`})}checkWorld(){let e=this.bike,t=this.track,n=t.checkpoints;for(;this.cpIndex<n.length&&e.s>=n[this.cpIndex].s;)this.cpIndex++,this.emit({t:`checkpoint`,index:this.cpIndex-1});for(let n=0;n<t.tokens.length;n++){if(this.tokens[n])continue;let r=t.tokens[n];if(Math.abs(e.s-r.s)>2.2)continue;let i=t.height(r.s,r.d)+r.y,a=e.p.y+.9;Math.abs(e.d-r.d)<1.7&&Math.abs(a-i)<1.9&&(this.tokens[n]=!0,this.emit({t:`token`,index:n}))}this.flowStep(Qf),this.obstacleStep();let r=t.profile(e.s),i=Math.abs(e.d)-(r.half+3.5);if(i>0){let n=t.height(e.s,Y(e.d,-r.half,r.half));(e.mode===`ground`&&i>2.5||e.p.y<n-5)&&this.bail(`off`)}e.mode!==`ground`&&e.p.y<t.height(e.s,e.d)-.5&&this.bail(`off`),e.s>=t.finishS&&this.finish()}addFlow(e){this.flow=Y(this.flow+e,0,1),!this.inFlow&&this.flow>=.82?(this.inFlow=!0,this.emit({t:`flow`,on:!0})):this.inFlow&&this.flow<.6&&(this.inFlow=!1,this.emit({t:`flow`,on:!1}))}flowStep(e){let t=this.bike;if(this.inFlow&&(this.flowTime+=e),t.mode!==`ground`){this.addFlow(-.01*e);return}let n=-.045;t.pumping>.2&&(n+=.32*Math.min(1,t.pumping/1.5));let r=Math.abs(t.yawRate*t.speed);r>3.5&&t.sliding<.1&&(n+=.2*Math.min(1,(r-3.5)/5)),t.speed>13&&(n+=.06);let i=this.track.profile(t.s);i.kind===`ridge`&&i.half<2.2&&t.speed>9&&(n+=.06),t.braking>.4&&(n-=.4*t.braking),t.sliding>.3&&(n-=.25),t.speed<6&&(n-=.15),this.addFlow(n*e)}obstacleStep(){let e=this.obstacles;if(!e.length)return;let t=this.bike,n=0,r=e.length;for(;n<r;){let i=n+r>>1;e[i].s<t.s-4?n=i+1:r=i}for(let r=n;r<e.length&&e[r].s<t.s+4;r++){let n=e[r],i=Math.hypot(t.p.x-n.x,t.p.z-n.z)-n.r;if(!(t.agl>2.4)){if(i<.28&&this.phase===`riding`){this.bail(`tree`);return}if(i<1.1&&t.speed>8&&!this.passed.has(r)){this.passed.add(r),this.closeCalls++;let e=Math.round((60+(1.1-i)*140)*(t.speed/10)/10)*10;this.pending+=e,this.chainLive||(this.chainLive=!0,this.mult=1),this.chainT=Math.min(this.chainT,$f*.5),this.addFlow(.09),this.emit({t:`close`,points:Math.round(e)})}}}}finish(){if(this.phase===`finished`)return;this.bank();let e=this.opts.par??0,t=e>0&&!this.opts.oneLife?Math.max(0,Math.round((e-this.time)*60)*10):0,n=this.tokens.filter(Boolean).length*250;this.score+=t+n,this.phase=`finished`,this.tape.time=this.time,this.result={score:this.score,time:this.time,tricks:this.tricks,bails:this.bails,tokens:[...this.tokens],bestChain:this.bestChain,timeBonus:t,gaps:[...this.gapNames],perfects:this.perfects,biggestAir:this.biggestAir,bestTrick:this.bestTrick,bestTrickPoints:this.bestTrickPoints,flowTime:this.flowTime,closeCalls:this.closeCalls},this.emit({t:`finish`})}get progress(){return Y((this.bike.s-this.track.startS)/(this.track.finishS-this.track.startS),0,1)}},tp=Cf(),np=Cf(),rp=(e,t=!1)=>`<svg viewBox="0 0 24 24" ${t?`fill="currentColor"`:`fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`} aria-hidden="true">${e}</svg>`,ip={play:rp(`<path d="M7 4.5v15l12.5-7.5z"/>`,!0),pause:rp(`<path d="M8 5v14M16 5v14"/>`),gear:rp(`<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"/>`),bike:rp(`<circle cx="5.5" cy="16" r="3.6"/><circle cx="18.5" cy="16" r="3.6"/><path d="M5.5 16 9 9h6.5l3 7M9 9l3.2 7h0.3M12 6h3l0.5 3"/>`),trophy:rp(`<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4.5a3 3 0 0 0 3.2 4M16 6h3.5a3 3 0 0 1-3.2 4M12 13v4M8.5 20h7M10 17h4"/>`),daily:rp(`<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><path d="M12 12.5v3.5h3"/>`),endless:rp(`<path d="M6.5 15.5a3.5 3.5 0 1 1 0-7c3 0 8 7 11 7a3.5 3.5 0 1 0 0-7c-3 0-8 7-11 7z"/>`),tour:rp(`<path d="M3 19 9 7l4 7 3-4 5 9z"/><circle cx="17" cy="6" r="2"/>`),back:rp(`<path d="M15 5l-7 7 7 7"/>`),close:rp(`<path d="M6 6l12 12M18 6 6 18"/>`),restart:rp(`<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v4.3h4.3"/>`),next:rp(`<path d="M9 5l7 7-7 7"/>`),home:rp(`<path d="M4 11 12 4l8 7v9h-5.5v-6h-5v6H4z"/>`),star:rp(`<path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z"/>`,!0),lock:rp(`<rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>`),coin:rp(`<circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />`),check:rp(`<path d="M5 12.5l4.5 4.5L19 7.5"/>`),sound:rp(`<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>`),token:rp(`<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5" fill="currentColor"/>`),rotate:rp(`<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>`),hand:rp(`<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-1a6 6 0 0 1-5.2-3l-2.3-4a1.5 1.5 0 0 1 2.5-1.6L9 14"/>`),info:rp(`<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.4"/>`),share:rp(`<path d="M12 3.5v12M7.5 8 12 3.5 16.5 8"/><path d="M5 13v6.5h14V13"/>`),ghost:rp(`<path d="M6 20V10a6 6 0 0 1 12 0v10l-2-1.6-2 1.6-2-1.6-2 1.6-2-1.6z"/><circle cx="10" cy="10.5" r="0.8" fill="currentColor"/><circle cx="14" cy="10.5" r="0.8" fill="currentColor"/>`)},Q=(e,t=``,n=[],r={})=>{let i=document.createElement(e);t&&(i.className=t);for(let[e,t]of Object.entries(r))i.setAttribute(e,t);let a=Array.isArray(n)?n:[n];for(let e of a)e!=null&&e!==!1&&i.append(typeof e==`string`?document.createTextNode(e):e);return i},ap=(e,t=``)=>{let n=document.createElement(`span`);return n.className=`ico-wrap ${t}`,n.style.display=`inline-flex`,n.innerHTML=ip[e],n},op=(e,t)=>(e.addEventListener(`click`,e=>{e.stopPropagation(),sp?.(),t(e)}),e),sp=null,cp=e=>{sp=e},lp=(e,t=``,n,r)=>{let i=Q(`button`,`btn ${t}`,[n?ap(n):null,typeof e==`string`?Q(`span`,``,e):e]);return r&&op(i,r),i},up=(e,t=3,n=``)=>{let r=Q(`span`,`stars ${n}`);r.style.display=`inline-flex`,r.style.gap=`2px`;for(let n=0;n<t;n++)r.append(ap(`star`,`star ${n<e?`on`:``}`));return r},dp=e=>Math.round(e).toLocaleString(`en-US`),fp=e=>{let t=Math.floor(e/60),n=e-t*60;return`${t}:${n<10?`0`:``}${n.toFixed(1)}`},pp={steer:{side:`left`,key:`Steer`,text:`Drag your left thumb to pick a line.`,hand:`drag-x`},pop:{side:`right`,key:`Pop`,text:`Hold your right thumb and let go at the lip.`,hand:`press`},flip:{side:`left`,key:`Backflip`,text:`In the air, drag up. Let go to land.`,hand:`drag-up`},spin:{side:`left`,key:`Spin`,text:`In the air, drag sideways to spin.`,hand:`drag-x`},whip:{side:`right`,key:`Tailwhip`,text:`In the air, swipe your right thumb.`,hand:`swipe-x`},superman:{side:`right`,key:`Superman`,text:`Swipe up and hold. Let go before you land.`,hand:`drag-up`},chain:{side:`mid`,key:`Chain it`,text:`Keep landing tricks to grow the multiplier.`,hand:``},brake:{side:`left`,key:`Sharp turn ahead`,text:`Pull your left thumb back to brake. Push it up to pedal.`,hand:`drag-up`},flow:{side:`mid`,key:`Flow`,text:`Pump the backsides, carve the turns, land clean. Full flow: points ×1.8.`,hand:``},roots:{side:`right`,key:`Roots`,text:`Hold your right thumb to soak them up and keep your line.`,hand:`press`}},mp=class{root;scoreV;prog;flowEl;flowBar;lastFlow=-1;time;toks;chain;chainPts;chainMult;grace;callouts;ring;knob;popRing;cue;lastCue=``;pro=!1;popArc;edgeL;edgeR;coachEl=null;shownScore=0;lastTime=``;lastToks=``;lastPend=-1;lastMult=-1;oneLife=!1;held=!1;constructor(e){this.scoreV=Q(`div`,`v`,`0`),this.prog=Q(`i`);let t=Q(`div`,`prog`,this.prog);this.flowBar=Q(`i`),this.flowEl=Q(`div`,`flow`,[Q(`div`,`bar`,this.flowBar),Q(`span`,``,`FLOW`)]);let n=Q(`div`,`score`,[this.scoreV,t,this.flowEl]);this.time=Q(`div`,`time`,`0:00.0`),this.toks=Q(`div`,`toks`);let r=op(Q(`button`,`btn icon pause`),e);r.innerHTML=ip.pause;let i=Q(`div`,`right`,[Q(`div`,``,[this.time,this.toks]),r]);this.chainPts=Q(`span`,`pts`,`0`),this.chainMult=Q(`span`,`mult`,`×1`),this.grace=Q(`i`,`grace`),this.chain=Q(`div`,`chain panel`,[this.chainPts,this.chainMult,this.grace]),this.callouts=Q(`div`,`callouts`),this.ring=Q(`div`,`stick-ring`),this.knob=Q(`div`,`stick-knob`),this.popRing=Q(`div`,`pop-ring`),this.popRing.innerHTML=`<svg viewBox="0 0 82 82"><circle cx="41" cy="41" r="39"/></svg><span>POP</span>`,this.popArc=this.popRing.querySelector(`circle`),this.cue=Q(`div`,`speed-cue`),this.edgeL=Q(`div`,`edge-warn l`),this.edgeR=Q(`div`,`edge-warn r`),this.root=Q(`div`,`hud`,[this.edgeL,this.edgeR,n,i,this.chain,this.callouts,this.ring,this.knob,this.popRing,this.cue]),this.root.style.display=`none`}show(e){this.root.style.display=e?``:`none`}hold(){this.held=!0,this.root.classList.add(`hold`)}reset(e,t=!1){this.oneLife=t,this.shownScore=0,this.scoreV.textContent=`0`,this.lastPend=this.lastMult=this.lastFlow=-1,this.lastTime=this.lastToks=``,this.toks.replaceChildren(...Array.from({length:e},()=>Q(`i`))),this.callouts.replaceChildren(),this.chain.classList.remove(`on`),this.coach(null)}update(e,t,n){let r=e.score;this.shownScore!==r&&(this.shownScore+=(r-this.shownScore)*Math.min(1,n*9)+Math.sign(r-this.shownScore)*3,Math.abs(r-this.shownScore)<4&&(this.shownScore=r),this.scoreV.textContent=dp(this.shownScore)),this.prog.style.width=`${(e.progress*100).toFixed(1)}%`;let i=Math.round(e.flow*100);i!==this.lastFlow&&(this.lastFlow=i,this.flowBar.style.width=`${i}%`,this.flowEl.classList.toggle(`on`,e.inFlow));let a=this.oneLife?`${Math.max(0,e.bike.s-e.track.startS).toFixed(0)} m`:fp(e.time);a!==this.lastTime&&(this.time.textContent=a,this.lastTime=a);let o=e.tokens.map(e=>+!!e).join(``);o!==this.lastToks&&(this.lastToks=o,[...this.toks.children].forEach((t,n)=>t.classList.toggle(`on`,e.tokens[n]))),e.chainLive?(this.chain.classList.add(`on`),e.pending!==this.lastPend&&(this.lastPend=e.pending,this.chainPts.textContent=dp(e.pending)),e.mult!==this.lastMult&&(this.lastMult=e.mult,this.chainMult.textContent=`×${e.mult}`,ne()||this.chainMult.animate([{transform:`scale(1.5)`},{transform:`scale(1)`}],{duration:260,easing:`cubic-bezier(.2,1.4,.4,1)`})),this.grace.style.transform=`scaleX(${Math.max(0,1-e.chainT/$f).toFixed(3)})`):this.chain.classList.contains(`on`)&&(this.chain.classList.remove(`on`),this.lastPend=this.lastMult=-1);let s=t.stick;if(this.ring.classList.toggle(`on`,s.active||t.fixed),this.knob.classList.toggle(`on`,s.active||t.fixed),!s.active&&t.fixed){let e=t.fixedOrigin();this.ring.style.transform=`translate(${e.x}px, ${e.y}px)`,this.knob.style.transform=`translate(${e.x}px, ${e.y}px)`}if(s.active){this.ring.style.transform=`translate(${s.ox}px, ${s.oy}px)`;let e=Math.max(-1,Math.min(1,(s.cx-s.ox)/62))*40,t=Math.max(-1,Math.min(1,(s.cy-s.oy)/62))*40;this.knob.style.transform=`translate(${s.ox+e}px, ${s.oy+t}px)`}let c=e.bike,l=c.mode===`ground`?c.crouch:0;this.popArc.style.strokeDashoffset=`${245-245*l}`,this.popRing.style.transform=t.hold?`scale(0.92)`:``,this.popRing.style.opacity=c.mode===`air`?`0.25`:`0.7`;let u=``;if(this.pro&&c.mode===`ground`&&!Number.isNaN(c.speedTarget)){let e=c.speed-c.speedTarget;u=e<-.5?`PEDAL`:e>1.2?`BRAKE`:`OK`}u!==this.lastCue&&(this.lastCue=u,this.cue.textContent=u===`OK`?`✓`:u,this.cue.className=`speed-cue ${u?`on`:``} ${u.toLowerCase()}`);let d=e.track.profile(c.s),f=Math.abs(c.d)-(d.half-.6),p=e.phase===`riding`?Math.max(0,Math.min(1,f/1.2)):0;this.edgeL.style.opacity=c.d<0?p.toFixed(2):`0`,this.edgeR.style.opacity=c.d>0?p.toFixed(2):`0`}callout(e,t,n,r=``){let i=Q(`div`,`callout ${r}`,[Q(`span`,`nm`,e),t?Q(`span`,`pt`,t):null,n.length?Q(`div`,`tags`,n.map(e=>Q(`span`,e.toLowerCase().includes(`perfect`)?`perfect`:e.toLowerCase()===`sketchy`?`sketchy`:``,e))):null]);for(this.callouts.prepend(i);this.callouts.children.length>3;)this.callouts.lastChild?.remove();this.held||setTimeout(()=>i.remove(),1700)}event(e){switch(e.t){case`land`:{let t=e.trick;if(e.land.quality===`bail`)return;t.trick?this.callout(t.name,`+${dp(t.points)}`,t.extras.filter(e=>e!==`Big Air`||!t.trick)):t.extras.length&&t.points>0?this.callout(t.extras[0],`+${dp(t.points)}`,t.extras.slice(1),`small`):e.land.quality===`perfect`&&e.land.air.t>.6&&this.callout(`Perfect`,``,[],`small`);break}case`gap`:this.callout(e.name,`+${dp(e.points)}`,[],`gap`);break;case`bail`:this.callout(e.reason===`tree`?`Hit a tree`:`Bail`,``,[],`bail`);break;case`close`:this.callout(`Close call`,`+${dp(e.points)}`,[],`small close`);break;case`flow`:e.on&&this.callout(`In flow`,`×1.8`,[],`flow`);break;case`lost`:this.callout(`Chain lost`,`−${dp(e.points)}`,[],`small`);break;case`bank`:{let t=Q(`div`,`bank`,`+${dp(e.points)}${e.mult>1?`  ×${e.mult}`:``}`);this.root.append(t),setTimeout(()=>t.remove(),1300);break}case`token`:this.callout(`Token`,`+250`,[],`small`)}}split(e,t,n=!1){let r=e<0,i=Q(`div`,`split ${r?`ahead`:`behind`} ${n?`final`:``}`,[Q(`b`,``,`${r?`−`:`+`}${Math.abs(e).toFixed(2)}`),Q(`span`,``,` vs ${t}`)]);this.root.append(i),setTimeout(()=>i.remove(),n?3200:2400)}countdown(e){let t=Q(`div`,`count ${e===`DROP`?`go`:``}`,e);this.root.append(t),setTimeout(()=>t.remove(),950)}coach(e){if(this.coachEl?.remove(),this.coachEl=null,!e)return;let t=pp[e],n=Q(`div`,`coach panel ${t.side}`,[t.hand?ap(`hand`,`hand ${t.hand}`):null,Q(`div`,``,[Q(`div`,`k`,t.key),Q(`div`,``,t.text)])]);if(t.hand){let e=n.querySelector(`.hand`);e.style.position=`relative`,e.style.width=`40px`,e.style.height=`40px`}this.coachEl=n,this.root.append(n)}},hp=(e,t,n)=>Math.sqrt(e*e+t*t+n*n),gp=(e,t,n)=>{if(n<=0)return Math.min(e,t);let r=Math.max(n-Math.abs(e-t),0)/n;return Math.min(e,t)-r*r*n*.25},_p=(e,t,n)=>-gp(-e,-t,n),vp=(e,t,n,r)=>{let i=t-e.a[0],a=n-e.a[1],o=r-e.a[2];if(e.rot){let t=e.rot,n=t[0]*i+t[1]*a+t[2]*o,r=t[3]*i+t[4]*a+t[5]*o,s=t[6]*i+t[7]*a+t[8]*o;i=n,a=r,o=s}switch(e.kind){case`ellipsoid`:{let t=e.r,n=hp(i/t[0],a/t[1],o/t[2]),r=hp(i/(t[0]*t[0]),a/(t[1]*t[1]),o/(t[2]*t[2]));return r>1e-9?n*(n-1)/r:-Math.min(t[0],t[1],t[2])}case`cone`:{let t=e.b,n=t[0]-e.a[0],r=t[1]-e.a[1],s=t[2]-e.a[2],c=n*n+r*r+s*s,l=e.ra-e.rb,u=c-l*l,d=1/c,f=i*n+a*r+o*s,p=f-c,m=i*c-n*f,h=a*c-r*f,g=o*c-s*f,_=m*m+h*h+g*g,v=f*f*c,y=p*p*c,b=Math.sign(l)*l*l*_;return Math.sign(p)*u*y>b?Math.sqrt(_+y)*d-e.rb:Math.sign(f)*u*v<b?Math.sqrt(_+v)*d-e.ra:(Math.sqrt(_*u*d)+f*l)*d-e.ra}case`box`:{let t=e.r,n=e.ra??0,r=Math.abs(i)-t[0]+n,s=Math.abs(a)-t[1]+n,c=Math.abs(o)-t[2]+n;return hp(Math.max(r,0),Math.max(s,0),Math.max(c,0))+Math.min(Math.max(r,Math.max(s,c)),0)-n}case`torus`:{let t=Math.sqrt(i*i+o*o)-e.ra;return Math.sqrt(t*t+a*a)-e.rb}}},yp=e=>{let t=e.k+.02,n,r;switch(e.kind){case`ellipsoid`:case`box`:{let t=Math.max(...e.r)*(e.rot?1.42:1);n=[e.a[0]-t,e.a[1]-t,e.a[2]-t],r=[e.a[0]+t,e.a[1]+t,e.a[2]+t],e.rot||(n=[e.a[0]-e.r[0],e.a[1]-e.r[1],e.a[2]-e.r[2]],r=[e.a[0]+e.r[0],e.a[1]+e.r[1],e.a[2]+e.r[2]]);break}case`cone`:{let t=Math.max(e.ra,e.rb),i=e.b;n=[Math.min(e.a[0],i[0])-t,Math.min(e.a[1],i[1])-t,Math.min(e.a[2],i[2])-t],r=[Math.max(e.a[0],i[0])+t,Math.max(e.a[1],i[1])+t,Math.max(e.a[2],i[2])+t];break}case`torus`:{let t=e.ra+e.rb;n=[e.a[0]-t,e.a[1]-t,e.a[2]-t],r=[e.a[0]+t,e.a[1]+t,e.a[2]+t];break}}e.lo=[n[0]-t,n[1]-t,n[2]-t],e.hi=[r[0]+t,r[1]+t,r[2]+t]},bp=class{prims=[];add(e){return yp(e),this.prims.push(e),this}dist(e,t,n){let r=1,i=!1;for(let a of this.prims){if(a.sub||e<a.lo[0]||t<a.lo[1]||n<a.lo[2]||e>a.hi[0]||t>a.hi[1]||n>a.hi[2])continue;let o=vp(a,e,t,n);r=i?gp(r,o,a.k):o,i=!0}if(!i)return .05;for(let i of this.prims)i.sub&&(e<i.lo[0]||t<i.lo[1]||n<i.lo[2]||e>i.hi[0]||t>i.hi[1]||n>i.hi[2]||(r=_p(r,-vp(i,e,t,n),i.k)));return r}distRow(e,t,n,r,i,a,o){let s=[],c=[];for(let n of this.prims)e<n.lo[1]||t<n.lo[2]||e>n.hi[1]||t>n.hi[2]||(n.sub?c:s).push(n);for(let l=0;l<i;l++){let i=n+l*r,u=1,d=!1;for(let n of s){if(i<n.lo[0]||i>n.hi[0])continue;let r=vp(n,i,e,t);u=d?gp(u,r,n.k):r,d=!0}if(!d)a[o+l]=.05;else{for(let n of c)i<n.lo[0]||i>n.hi[0]||(u=_p(u,-vp(n,i,e,t),n.k));a[o+l]=u}}}nearest(e,t,n){let r=null,i=null,a=1/0,o=1/0;for(let s of this.prims){if(s.sub||e<s.lo[0]-.08||t<s.lo[1]-.08||n<s.lo[2]-.08||e>s.hi[0]+.08||t>s.hi[1]+.08||n>s.hi[2]+.08)continue;let c=Math.abs(vp(s,e,t,n));c<a?(i=r,o=a,r=s,a=c):c<o&&(i=s,o=c)}return{p1:r,d1:a,p2:i,d2:o}}},xp=(e,t,n,r)=>{let i=Math.ceil((n[0]-t[0])/r)+1,a=Math.ceil((n[1]-t[1])/r)+1,o=Math.ceil((n[2]-t[2])/r)+1,s=i*a,c=new Float32Array(i*a*o);for(let n=0;n<o;n++){let o=t[2]+n*r;for(let l=0;l<a;l++)e.distRow(t[1]+l*r,o,t[0],r,i,c,n*s+l*i)}let l=[0,1,i,i+1,s,s+1,s+i,s+i+1],u=[0,2,4,6,0,1,4,5,0,1,2,3],d=[1,3,5,7,2,3,6,7,4,5,6,7],f=[0,1,0,1,0,1,0,1],p=[0,0,1,1,0,0,1,1],m=[0,0,0,0,1,1,1,1],h=i-1,g=a-1,_=new Int32Array(h*g*(o-1)).fill(-1),v=65536,y=new Float32Array(v*3),b=new Float32Array(v*3),x=0,S=new Float32Array(8);for(let e=0;e<o-1;e++)for(let n=0;n<a-1;n++){let a=e*s+n*i;for(let o=0;o<i-1;o++){let i=a+o,s=0;for(let e=0;e<8;e++){let t=c[i+l[e]];S[e]=t,t<0&&s++}if(s===0||s===8)continue;let C=0,w=0,T=0,E=0;for(let e=0;e<12;e++){let t=S[u[e]],n=S[d[e]];if(t<0==n<0)continue;let r=t/(t-n),i=u[e],a=d[e];C+=f[i]+(f[a]-f[i])*r,w+=p[i]+(p[a]-p[i])*r,T+=m[i]+(m[a]-m[i])*r,E++}if(x>=v){v*=2;let e=new Float32Array(v*3);e.set(y),y=e;let t=new Float32Array(v*3);t.set(b),b=t}let D=C/E,O=w/E,k=T/E;y[x*3]=t[0]+(o+D)*r,y[x*3+1]=t[1]+(n+O)*r,y[x*3+2]=t[2]+(e+k)*r;let A=(S[1]-S[0])*(1-O)*(1-k)+(S[3]-S[2])*O*(1-k)+(S[5]-S[4])*(1-O)*k+(S[7]-S[6])*O*k,j=(S[2]-S[0])*(1-D)*(1-k)+(S[3]-S[1])*D*(1-k)+(S[6]-S[4])*(1-D)*k+(S[7]-S[5])*D*k,M=(S[4]-S[0])*(1-D)*(1-O)+(S[5]-S[1])*D*(1-O)+(S[6]-S[2])*(1-D)*O+(S[7]-S[3])*D*O,N=Math.sqrt(A*A+j*j+M*M)||1;b[x*3]=A/N,b[x*3+1]=j/N,b[x*3+2]=M/N,_[(e*g+n)*h+o]=x++}}let C=1<<17,w=new Uint32Array(C),T=0,E=(e,t,n)=>(n*g+t)*h+e,D=(e,t,n,r,i)=>{if(!(e<0||t<0||n<0||r<0)){if(T+6>C){C*=2;let e=new Uint32Array(C);e.set(w),w=e}i?(w[T++]=e,w[T++]=n,w[T++]=t,w[T++]=e,w[T++]=r,w[T++]=n):(w[T++]=e,w[T++]=t,w[T++]=n,w[T++]=e,w[T++]=n,w[T++]=r)}};for(let e=1;e<o-1;e++)for(let t=1;t<a-1;t++)for(let n=1;n<i-1;n++){let r=e*s+t*i+n,a=c[r]<0;a!==c[r+1]<0&&D(_[E(n,t-1,e-1)],_[E(n,t,e-1)],_[E(n,t,e)],_[E(n,t-1,e)],!a),a!==c[r+i]<0&&D(_[E(n-1,t,e-1)],_[E(n-1,t,e)],_[E(n,t,e)],_[E(n,t,e-1)],!a),a!==c[r+s]<0&&D(_[E(n-1,t-1,e)],_[E(n,t-1,e)],_[E(n,t,e)],_[E(n-1,t,e)],!a)}return{positions:y.slice(0,x*3),normals:b.slice(0,x*3),indices:w.slice(0,T)}},Sp=256,Cp=(e,t,n)=>{let r=Math.imul(e|0,374761393)^Math.imul(t|0,668265263)^Math.imul(n|0,2147483647);return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296},wp=e=>e*e*e*(e*(e*6-15)+10),Tp=(e,t,n,r)=>{let i=e*n,a=t*n,o=Math.floor(i),s=Math.floor(a),c=wp(i-o),l=wp(a-s),u=(o%n+n)%n,d=(s%n+n)%n,f=(u+1)%n,p=(d+1)%n,m=Cp(u,d,r),h=Cp(f,d,r),g=Cp(u,p,r),_=Cp(f,p,r);return m+(h-m)*c+(g-m)*l+(m-h-g+_)*c*l},Ep=(e,t,n,r,i)=>{let a=0,o=.5,s=0,c=n;for(let n=0;n<r;n++)a+=Tp(e,t,c,i+n*17)*o,s+=o,o*=.5,c*=2;return a/s},Dp=null,Op=()=>{if(Dp)return Dp;let e=new Uint8Array(Sp*Sp*4),t=[];for(let e=0;e<14;e++)for(let n=0;n<14;n++)t.push((n+Cp(n,e,3))/14,(e+Cp(n,e,5))/14);for(let n=0;n<Sp;n++)for(let r=0;r<Sp;r++){let i=r/Sp,a=n/Sp,o=Ep(i,a,4,5,11),s=Ep(i,a,32,3,23)*.6+Cp(r,n,7)*.4,c=Ep(i,a,6,3,31),l=Math.abs(Math.sin((a*9+c*1.8)*Math.PI*2)),u=Math.min(1,l*3.2)**.6,d=9,f=9,p=Math.floor(i*14),m=Math.floor(a*14);for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++){let r=(p+n+14)%14,o=(m+e+14)%14,s=t[(o*14+r)*2],c=t[(o*14+r)*2+1];p+n<0&&--s,p+n>=14&&(s+=1),m+e<0&&--c,m+e>=14&&(c+=1);let l=Math.hypot(s-i,c-a);l<d?(f=d,d=l):l<f&&(f=l)}let h=Math.min(1,(f-d)*14*1.8),g=(n*Sp+r)*4;e[g]=Math.round(o*255),e[g+1]=Math.round(s*255),e[g+2]=Math.round(u*255),e[g+3]=Math.round(h*255)}let n=new Mi(e,Sp,Sp,Fe,Se);return n.wrapS=n.wrapT=me,n.magFilter=be,n.minFilter=xe,n.generateMipmaps=!0,n.anisotropy=4,n.needsUpdate=!0,Dp=n,n},kp=(e,t)=>{let n=new Uint8Array(2048),r=new ld(t),i=e.map(e=>{let t=parseInt(e.slice(1),16);return[t>>16&255,t>>8&255,t&255]}),a=[],o=0,s=-1;for(;o<512;){let e=r.int(0,i.length-1);e===s&&(e=(e+1)%i.length),s=e;let t=r.chance(.14),n=!t&&r.chance(.12),c=t?r.int(2,4):r.int(12,44);o+=c;let l=t?.7:n?1.22:1,u=i[e].map(e=>e*l);a.push({end:Math.min(512,o),c:u})}let c=0;for(let e=0;e<512;e++){for(;a[c].end<=e;)c++;let t=a[c],r=a[Math.min(a.length-1,c+1)],i=t.end-e,o=i<3?(3-i)/6:0,s=e*4;for(let e=0;e<3;e++)n[s+e]=Math.min(255,Math.round(t.c[e]+(r.c[e]-t.c[e])*o));n[s+3]=255}let l=new Mi(n,512,1,Fe,Se);return l.colorSpace=Nt,l.wrapS=me,l.wrapT=he,l.magFilter=be,l.minFilter=be,l.generateMipmaps=!1,l.needsUpdate=!0,l},$={uSunDir:{value:new U(.5,.6,.3).normalize()},uFogCol:{value:new W(`#d8c7b6`)},uFogSun:{value:new W(`#ffe1b8`)},uFogDist:{value:1500},uFogLow:{value:.3},uFogBase:{value:0},uFogBright:{value:1.25},uTime:{value:0},uWind:{value:1},uDetail:{value:null},uStrata:{value:null},uStrataScale:{value:1/34},uSand:{value:new W},uTrail:{value:new W},uRut:{value:new W},uVeg:{value:new W},uVegDark:{value:new W},uRock:{value:new W},uSnow:{value:0},uSnowCol:{value:new W(`#eef3fb`)},uRockTop:{value:new W},uLavaCol:{value:new W},uLavaY:{value:-1e6},uLavaK:{value:0},tTrailC:{value:null},tTrailN:{value:null},tGroundC:{value:null},tGroundN:{value:null},tRockC:{value:null},tRockN:{value:null},tAltC:{value:null},tAltN:{value:null},uTexScale:{value:new En(1/2.4,1/3.2,1/7,1/3)},uTrailTint:{value:new W(1,1,1)},uGroundTint:{value:new W(1,1,1)},uRockTint:{value:new W(1,1,1)},uAltTint:{value:new W(1,1,1)},uMatK:{value:new En(.42,.72,0,0)},uAltBand:{value:new H(0,1)},tWallC:{value:null},tRoofC:{value:null}},Ap=(e,t)=>{$.uFogCol.value.set(e.fogColor),$.uFogSun.value.set(e.fogSun),$.uFogDist.value=e.fogDist,$.uFogLow.value=e.fogLow,$.uDetail.value=Op(),$.uStrata.value?.dispose?.(),$.uStrata.value=kp(e.strata,t),$.uSand.value.set(e.sand),$.uTrail.value.set(e.trail),$.uRut.value.set(e.rut),$.uVeg.value.set(e.veg),$.uVegDark.value.set(e.vegDark),$.uRock.value.set(e.rock),$.uSnow.value=e.snow,$.uRockTop.value.set(e.rockTop??e.sand),$.uLavaCol.value.set(e.lava?.color??`#000000`),$.uLavaK.value=e.lava?.strength??0;let n=e.mat;$.uTexScale.value.set(1/n.scale[0],1/n.scale[1],1/n.scale[2],1/n.scale[3]),$.uTrailTint.value.set(n.tint[0]),$.uGroundTint.value.set(n.tint[1]),$.uRockTint.value.set(n.tint[2]),$.uAltTint.value.set(n.tint[3]),$.uMatK.value.set(n.rock[0],n.rock[1],n.alt===`slab`?1:n.alt===`meadow`?2:0,n.strata)},jp=e=>{$.tTrailC.value=e.trail.c,$.tTrailN.value=e.trail.n,$.tGroundC.value=e.ground.c,$.tGroundN.value=e.ground.n,$.tRockC.value=e.rock.c,$.tRockN.value=e.rock.n,$.tAltC.value=e.alt.c,$.tAltN.value=e.alt.n},Mp=`
uniform vec3 uSunDir;
uniform vec3 uFogCol;
uniform vec3 uFogSun;
uniform float uFogDist;
uniform float uFogLow;
uniform float uFogBase;
uniform float uFogBright;
uniform float uTime;
uniform sampler2D uDetail;
varying vec3 vWPos;
varying vec3 vWNrm;

// screen-space bump: perturbs the (view-space) normal by the slope of a height field h
vec3 hlBump(vec3 surfPos, vec3 n, float h) {
  vec3 sx = dFdx(surfPos);
  vec3 sy = dFdy(surfPos);
  vec3 r1 = cross(sy, n);
  vec3 r2 = cross(n, sx);
  float det = dot(sx, r1);
  vec3 grad = sign(det) * (dFdx(h) * r1 + dFdy(h) * r2);
  return normalize(abs(det) * n - grad);
}

vec3 hlAtmos(vec3 col, vec3 wp) {
  // grade: a little more colour before the tone curve eats it
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(lum), col, 1.16), 0.0);
  vec3 v = wp - cameraPosition;
  float dist = length(v);
  vec3 vd = v / max(dist, 1e-3);
  float f = 1.0 - exp(-dist / uFogDist);
  float low = uFogLow * exp(-max(wp.y - uFogBase, 0.0) / 70.0) * (1.0 - exp(-dist / (uFogDist * 0.3)));
  f = clamp(f + low * (1.0 - f), 0.0, 1.0);
  float sunAmt = pow(max(dot(vd, uSunDir), 0.0), 5.0);
  vec3 fc = mix(uFogCol, uFogSun, sunAmt) * uFogBright;
  return mix(col, fc, f);
}
`,Np=`
uniform sampler2D tTrailC;
uniform sampler2D tTrailN;
uniform sampler2D tGroundC;
uniform sampler2D tGroundN;
uniform sampler2D tRockC;
uniform sampler2D tRockN;
uniform sampler2D tAltC;
uniform sampler2D tAltN;
uniform vec4 uTexScale;
uniform vec3 uTrailTint;
uniform vec3 uGroundTint;
uniform vec3 uRockTint;
uniform vec3 uAltTint;
uniform vec4 uMatK;
uniform vec2 uAltBand;
uniform sampler2D uStrata;
uniform float uStrataScale;
vec3 hlNW;
// packed normal map: rg = tangent-space xy, b = height
vec3 hlDec(vec4 t) {
  vec2 xy = t.rg * 2.0 - 1.0;
  return vec3(xy, sqrt(max(0.001, 1.0 - dot(xy, xy))));
}
// height blend: weight of layer b over layer a for a base weight t (b's stones push through a's sand…)
float hlHB(float ha, float hb, float t) {
  float a = ha + 1.0 - t;
  float b = hb + t;
  float m = max(a, b) - 0.22;
  float wa = max(a - m, 0.0);
  float wb = max(b - m, 0.0);
  return wb / (wa + wb + 1e-5);
}

// a layer sampled from above (two scales against tiling); returns albedo, writes world normal + height
vec3 hlTop(sampler2D tc, sampler2D tn, vec2 xz, float inv, float mixN, float bump, vec3 nG, out vec3 nW, out float h) {
  vec2 u1 = xz * inv;
#ifdef HL_LITE
  vec3 c = texture2D(tc, u1).rgb;
  vec4 p = texture2D(tn, u1);
#else
  vec2 u2 = xz * inv * 0.29 + vec2(0.37, 0.71);
  vec3 c = mix(texture2D(tc, u1).rgb, texture2D(tc, u2).rgb, mixN);
  vec4 p = mix(texture2D(tn, u1), texture2D(tn, u2), mixN);
#endif
  vec3 tn3 = hlDec(p);
  h = p.b;
  // UDN blend onto the surface normal (top projection: u → +x, v → +z)
  nW = normalize(vec3(nG.x + tn3.x * bump, nG.y, nG.z + tn3.y * bump));
  return c;
}

// rock on cliffs: triplanar, each side projection mirrored so strata stay level and lit right
vec3 hlTri(sampler2D tc, sampler2D tn, vec3 wp, float inv, vec3 nG, out vec3 nW, out float h) {
  vec3 bl = pow(abs(nG), vec3(4.0));
  bl /= max(1e-4, bl.x + bl.y + bl.z);
  vec3 sg = sign(nG + 1e-5);
  vec2 ux = vec2(wp.z * sg.x, wp.y) * inv;
  vec2 uy = vec2(wp.x * sg.y, wp.z) * inv;
  vec2 uz = vec2(-wp.x * sg.z, wp.y) * inv;
  vec2 dxx = dFdx(ux), dyx = dFdy(ux), dxy = dFdx(uy), dyy = dFdy(uy), dxz = dFdx(uz), dyz = dFdy(uz);
  vec3 c = vec3(0.0);
  vec4 p = vec4(0.0);
  vec3 n = vec3(0.0);
  if (bl.x > 0.01) {
    vec4 q = textureGrad(tn, ux, dxx, dyx);
    vec3 t = hlDec(q);
    t.x *= sg.x;
    n += vec3(nG.x, nG.y + t.y, nG.z + t.x) * bl.x;
    c += textureGrad(tc, ux, dxx, dyx).rgb * bl.x;
    p += q * bl.x;
  }
  if (bl.y > 0.01) {
    vec4 q = textureGrad(tn, uy, dxy, dyy);
    vec3 t = hlDec(q);
    t.x *= sg.y;
    n += vec3(nG.x + t.x, nG.y, nG.z + t.y) * bl.y;
    c += textureGrad(tc, uy, dxy, dyy).rgb * bl.y;
    p += q * bl.y;
  }
  if (bl.z > 0.01) {
    vec4 q = textureGrad(tn, uz, dxz, dyz);
    vec3 t = hlDec(q);
    t.x *= -sg.z;
    n += vec3(nG.x + t.x, nG.y + t.y, nG.z) * bl.z;
    c += textureGrad(tc, uz, dxz, dyz).rgb * bl.z;
    p += q * bl.z;
  }
  h = p.b;
  nW = normalize(n);
  return c;
}

`,Pp=`
uniform vec3 uSnowCol;
uniform float uSnow;
uniform vec3 uLavaCol;
uniform float uLavaY;
uniform float uLavaK;
varying vec4 vTrack;
varying float vSurf;

vec3 hlLava(vec3 wp) {
  if (uLavaK <= 0.0) return vec3(0.0);
  float depth = uLavaY - wp.y;
  float g = smoothstep(-6.0, 4.0, depth);
  vec4 f = texture2D(uDetail, wp.xz * 0.012 + vec2(uTime * 0.004, uTime * 0.0025));
  vec4 f2 = texture2D(uDetail, wp.xz * 0.05 - vec2(uTime * 0.01, 0.0));
  float crust = smoothstep(0.42, 0.62, f.r * 0.7 + f2.g * 0.3);
  return uLavaCol * uLavaK * g * (0.35 + 0.65 * crust) * (0.8 + 0.4 * f2.r);
}


vec3 hlTerrain(vec3 wp, vec3 nG) {
  float dist = length(wp - cameraPosition);
  float nearK = 1.0 - smoothstep(40.0, 160.0, dist);
  vec4 dA = texture2D(uDetail, wp.xz * 0.0105);
  vec4 dB = texture2D(uDetail, wp.xz * 0.061 + 0.5);
  float slope = 1.0 - clamp(nG.y, 0.0, 1.0);
  float mixN = smoothstep(0.32, 0.68, dA.r);
  float bump = 0.55 + 0.45 * nearK;

  // ground: the world's flats
  vec3 nGr;
  float hGr;
  vec3 col = hlTop(tGroundC, tGroundN, wp.xz, uTexScale.y, mixN, bump, nG, nGr, hGr) * uGroundTint;
  vec3 nrm = nGr;
  float hh = hGr;

  // the extra layer: slickrock slabs on benches (mesa), alpine meadow up high (forest)
  float altW = 0.0;
  if (uMatK.z > 1.5) altW = smoothstep(uAltBand.x, uAltBand.y, wp.y + (dA.g - 0.5) * 30.0) * smoothstep(0.55, 0.2, slope);
  else if (uMatK.z > 0.5) {
    // slickrock: bare patches on benches and flats, blotchy (never in bands)
    vec4 dS = texture2D(uDetail, wp.zx * 0.0071 + 0.43);
    altW = smoothstep(0.56, 0.68, dS.r * 0.65 + dB.r * 0.35) * smoothstep(0.5, 0.15, slope) * smoothstep(20.0, 60.0, vTrack.y > 900.0 ? 99.0 : abs(vTrack.y));
  }
  if (altW > 0.01) {
    vec3 nAl;
    float hAl;
    vec3 ca = hlTop(tAltC, tAltN, wp.xz, uTexScale.w, mixN, bump, nG, nAl, hAl) * uAltTint;
    float w = hlHB(hh, hAl, altW);
    col = mix(col, ca, w);
    nrm = normalize(mix(nrm, nAl, w));
    hh = mix(hh, hAl, w);
  }

  // rock: cliffs, gully walls, ledges
  float rockT = smoothstep(uMatK.x - 0.08 + dA.g * 0.16, uMatK.y + dB.g * 0.1, slope);
  if (rockT > 0.01) {
    vec3 nRk;
    float hRk;
    vec3 cr = hlTri(tRockC, tRockN, wp, uTexScale.z, nG, nRk, hRk) * uRockTint;
    // big strata bands across canyon walls
    if (uMatK.w > 0.0) {
      float sy = wp.y * uStrataScale + (dA.r - 0.5) * 0.06 + wp.x * 0.0009;
      vec3 band = texture2D(uStrata, vec2(sy, 0.5)).rgb;
      cr *= mix(vec3(1.0), band * 2.1, uMatK.w);
    }
    float w = hlHB(hh, hRk, rockT);
    col = mix(col, cr, w);
    nrm = normalize(mix(nrm, nRk, w));
    hh = mix(hh, hRk, w);
  }

  // the trail: packed riding surface, worn racing line and tyre ruts, loose stuff at the edges
  float d = vTrack.y;
  if (d < 900.0) {
    float ad = abs(d);
    float half_ = vTrack.z;
    float edgeN = (dB.r - 0.5) * 0.6 + (dA.b - 0.5) * 0.3;
    float onT = 1.0 - smoothstep(half_ - 0.35 + edgeN, half_ + 0.45 + edgeN, ad);
    onT *= 1.0 - smoothstep(0.55, 0.85, slope) * 0.8;
    if (onT > 0.01) {
      vec3 nTr;
      float hTr;
      vec3 ct;
      // slickrock sections ride on the slab texture, the rest on the trail's dirt
      if (uMatK.z > 0.5 && uMatK.z < 1.5 && vSurf > 1.5 && vSurf < 2.5) ct = hlTop(tAltC, tAltN, wp.xz, uTexScale.w, mixN, bump, nG, nTr, hTr) * uAltTint;
      else ct = hlTop(tTrailC, tTrailN, wp.xz, uTexScale.x, mixN, bump, nG, nTr, hTr) * uTrailTint;
      // the racing line: compacted, a touch darker and smoother, with two tyre grooves
      float wob = (dA.g - 0.5) * 0.7 + sin(vTrack.x * 0.09) * 0.25;
      float lane = exp(-pow((d - wob * 0.5) / max(0.5, half_ * 0.45), 2.0));
      float rut = exp(-pow((d - wob * 0.5 - 0.14) / 0.09, 2.0)) + exp(-pow((d - wob * 0.5 + 0.2) / 0.08, 2.0)) * 0.6;
      ct *= 1.0 - lane * 0.1 - rut * 0.12 * (0.6 + 0.4 * dB.g);
      float w = hlHB(hh, hTr * (1.0 - lane * 0.35) + lane * 0.35, onT);
      col = mix(col, ct, w);
      nrm = normalize(mix(nrm, nTr, w));
      hh = mix(hh, hTr, w);
    }
  }

  // snow lies on the flats (glacier world: the ground is snow already)
  if (uSnow > 0.0) {
    float sw = uSnow * smoothstep(0.5, 0.25, slope + (dB.g - 0.5) * 0.2) * smoothstep(0.35, 0.6, hh + 0.25);
    col = mix(col, uSnowCol * (0.94 + 0.08 * dB.g), sw * 0.85);
  }

  // large-scale variation and cavities
  col *= 0.88 + 0.24 * dA.g;
  col *= mix(0.72, 1.04, smoothstep(0.0, 0.75, hh));
  hlNW = nrm;
  return col * vTrack.w;
}
`,Fp=`
uniform vec3 uRockTop;
uniform float uSnow;
vec3 hlRockCol(vec3 wp, vec3 nG, vec3 base) {
  vec3 nR;
  float hR;
  vec3 c = hlTri(tRockC, tRockN, wp, uTexScale.z * 1.7, nG, nR, hR) * uRockTint;
  vec4 dA = texture2D(uDetail, wp.xz * 0.05);
  if (uMatK.w > 0.0) {
    float sy = wp.y * uStrataScale + (dA.r - 0.5) * 0.05 + wp.x * 0.0009;
    c *= mix(vec3(1.0), texture2D(uStrata, vec2(sy, 0.5)).rgb * 2.1, uMatK.w * 0.7);
  }
  // dust, moss or snow settles on the tops, in the low spots of the texture first
  float top = smoothstep(0.45, 0.85, nG.y + (dA.g - 0.5) * 0.3) * smoothstep(0.75, 0.3, hR);
  c = mix(c, uRockTop * (0.85 + 0.25 * dA.g), top * 0.55);
  c = mix(c, vec3(0.93, 0.95, 1.0), uSnow * smoothstep(0.55, 0.9, nG.y) * 0.85);
  c *= mix(0.75, 1.05, smoothstep(0.0, 0.7, hR));
  hlNW = nR;
  return c * base;
}
`,Ip=(e,t)=>{e.onBeforeCompile=e=>{Object.assign(e.uniforms,$);let n=e.vertexShader,r=e.fragmentShader,i=t.kind===`terrain`;n=n.replace(`#include <common>`,`#include <common>
uniform float uTime;
uniform float uWind;
varying vec3 vWPos;
varying vec3 vWNrm;
${i?`attribute vec4 aTrack;
varying vec4 vTrack;
attribute float aSurf;
varying float vSurf;`:``}
${t.kind===`house`||t.kind===`roof`?`varying vec3 vLocal;
varying vec3 vLNrm;
varying float vTop;`:``}`),(t.kind===`house`||t.kind===`roof`)&&(n=n.replace(`#include <begin_vertex>`,`#include <begin_vertex>
{
  vec3 sc = vec3(1.0);
  #ifdef USE_INSTANCING
  sc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
  #endif
  vLocal = position * sc;
  vLNrm = normal;
  vTop = sc.y;
}`)),t.sway&&(n=n.replace(`#include <begin_vertex>`,`#include <begin_vertex>
{
  vec3 basePos = vec3(0.0);
  #ifdef USE_INSTANCING
  basePos = instanceMatrix[3].xyz;
  #endif
  float ph = basePos.x * 0.37 + basePos.z * 0.23;
  float h = max(position.y, 0.0);
  float sw = (sin(uTime * 1.7 + ph) * 0.6 + sin(uTime * 3.1 + ph * 1.7) * 0.25) * uWind * ${t.sway.toFixed(3)} * h * h;
  transformed.x += sw;
  transformed.z += sw * 0.6;
}`)),t.cull&&(n=n.replace(`#include <project_vertex>`,`#include <project_vertex>
#ifdef USE_INSTANCING
{
  vec3 ipw = (modelMatrix * vec4(instanceMatrix[3].xyz, 1.0)).xyz;
  if (distance(ipw, cameraPosition) < ${t.cull.toFixed(1)}) gl_Position = vec4(0.0, 0.0, -2.0, 1.0);
}
#endif`)),n=n.replace(`#include <project_vertex>`,`#include <project_vertex>
{
  vec4 hlW = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  hlW = instanceMatrix * hlW;
  #endif
  hlW = modelMatrix * hlW;
  vWPos = hlW.xyz;
  vWNrm = normalize(inverseTransformDirection(transformedNormal, viewMatrix));
  ${i?`vTrack = aTrack;
  vSurf = aSurf;`:``}
}`);let a=i||t.kind===`rock`;r=r.replace(`#include <common>`,`#include <common>\n${t.lite?`#define HL_LITE
`:``}${Mp}\n${a?Np:``}${i?Pp:``}${t.kind===`rock`?Fp:``}`),i?(r=r.replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.rgb = hlTerrain(vWPos, normalize(vWNrm));`),r=r.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
totalEmissiveRadiance += hlLava(vWPos);`)):t.kind===`rock`?r=r.replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.rgb = hlRockCol(vWPos, normalize(vWNrm), diffuseColor.rgb);`):t.kind===`foliage`?r=r.replace(`#include <color_fragment>`,`#include <color_fragment>
{
  vec4 dd = texture2D(uDetail, vWPos.xz * 0.9 + vWPos.y * 0.7);
  diffuseColor.rgb *= 0.72 + 0.5 * dd.g;
  diffuseColor.rgb *= 0.75 + 0.25 * clamp(vWNrm.y * 0.5 + 0.5, 0.0, 1.0);
}`):t.kind===`wood`?r=r.replace(`#include <color_fragment>`,`#include <color_fragment>
{
  vec3 g3 = vWPos * vec3(0.9, 3.1, 0.9);
  vec4 dd = texture2D(uDetail, vec2(g3.x + g3.z, g3.y) * 0.35);
  vec4 de = texture2D(uDetail, vWPos.xz * 2.3 + vWPos.y);
  diffuseColor.rgb *= 0.7 + 0.45 * dd.r;
  diffuseColor.rgb *= 0.85 + 0.25 * de.g;
}`):t.kind===`roof`?(r=r.replace(`#include <common>`,`#include <common>
varying vec3 vLocal;
varying vec3 vLNrm;
varying float vTop;
uniform sampler2D tRoofC;`),r=r.replace(`#include <color_fragment>`,`#include <color_fragment>
{
  // tiles in rows along the ridge, down the slope
  vec2 uv = vec2(vLocal.x, vLocal.y + abs(vLocal.z)) / 1.7;
  vec3 tc = texture2D(tRoofC, uv).rgb;
  vec4 dd = texture2D(uDetail, vWPos.xz * 0.21);
  diffuseColor.rgb = tc * (0.86 + 0.24 * dd.g) * 1.1;
}`)):t.kind===`house`?(r=r.replace(`#include <common>`,`#include <common>
varying vec3 vLocal;
varying vec3 vLNrm;
varying float vTop;
uniform sampler2D tWallC;`),r=r.replace(`#include <color_fragment>`,`#include <color_fragment>
{
  vec4 dd = texture2D(uDetail, vWPos.xz * 0.7 + vWPos.y * 0.5);
  diffuseColor.rgb *= 0.9 + 0.12 * dd.g;
  // lime plaster, a little weathered
  vec2 wuv = (abs(vLNrm.x) > 0.5 ? vLocal.zy : vLocal.xy) / 2.6;
  diffuseColor.rgb *= mix(vec3(1.0), texture2D(tWallC, wuv).rgb * 1.32, 0.85);
  // walls only (vertex colour alpha marks wall faces): windows with dark panes and painted shutters
  if (abs(vLNrm.y) < 0.5 && vLocal.y < vTop - 0.35) {
    float u = abs(vLNrm.x) > 0.5 ? vLocal.z : vLocal.x;
    float y = vLocal.y;
    float cell = 2.1;
    float fu = fract(u / cell + 0.5) - 0.5;
    float fy = fract(y / 2.8) - 0.5;
    float storey = floor(y / 2.8);
    float win = step(abs(fu), 0.17) * step(abs(fy), 0.24) * step(0.8, y);
    float shut = step(abs(fu), 0.32) * (1.0 - step(abs(fu), 0.18)) * step(abs(fy), 0.24) * step(0.8, y);
    vec3 shutCol = mix(vec3(0.05, 0.28, 0.42), vec3(0.15, 0.36, 0.18), step(0.5, fract(storey * 0.37 + floor(u / cell) * 0.21)));
    diffuseColor.rgb = mix(diffuseColor.rgb, shutCol, shut * 0.9);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.03, 0.035, 0.05), win);
  }
}`)):t.kind===`cloth`&&(r=r.replace(`#include <color_fragment>`,`#include <color_fragment>
{
  vec4 dd = texture2D(uDetail, vWPos.xy * 3.0 + vWPos.zx * 3.0);
  diffuseColor.rgb *= 0.92 + 0.12 * dd.g;
}`)),i&&(r=r.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
normal = normalize((viewMatrix * vec4(hlNW, 0.0)).xyz);`)),t.kind===`rock`&&(r=r.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
normal = normalize((viewMatrix * vec4(hlNW, 0.0)).xyz);`)),t.noFog||(r=r.replace(`#include <opaque_fragment>`,`outgoingLight = hlAtmos(outgoingLight, vWPos);
#include <opaque_fragment>`)),r=r.replace(`#include <fog_fragment>`,``),e.vertexShader=n,e.fragmentShader=r},e.customProgramCacheKey=()=>`hl-${t.kind}-${t.sway??0}-${+!!t.noFog}-${t.cull??0}-${+!!t.lite}`},Lp=e=>{let t=new Za({color:e.color??`#ffffff`,vertexColors:e.vertexColors??!1,flatShading:e.flat??!1});return e.side!==void 0&&(t.side=e.side),Ip(t,e),t},Rp=e=>{let t=new Xa({color:e.color,metalness:e.metalness??0,roughness:e.roughness??.6,vertexColors:e.vertexColors??!1,flatShading:e.flat??!1});return e.envIntensity!==void 0&&(t.envMapIntensity=e.envIntensity),Ip(t,{kind:`plain`,noFog:e.noFog}),t},zp={ember:{jersey:`#ff5b14`,jersey2:`#1b1c20`,pants:`#24262b`,pads:`#2e3036`,gloves:`#1b1c20`,shoes:`#1b1c20`,helmet:`#f4eee3`,helmet2:`#ff5b14`,lens:`#2a2320`},cobalt:{jersey:`#2f6bff`,jersey2:`#f4eee3`,pants:`#1c2440`,pads:`#2a2f3a`,gloves:`#f4eee3`,shoes:`#f4eee3`,helmet:`#121316`,helmet2:`#2f6bff`,lens:`#1c2a3a`},sand:{jersey:`#e9d6b6`,jersey2:`#6b4a2e`,pants:`#6b5a44`,pads:`#3a3330`,gloves:`#6b4a2e`,shoes:`#3a3330`,helmet:`#c9874f`,helmet2:`#f4eee3`,lens:`#2e2a22`},lime:{jersey:`#c8f03c`,jersey2:`#121316`,pants:`#121316`,pads:`#2a2b2e`,gloves:`#c8f03c`,shoes:`#121316`,helmet:`#121316`,helmet2:`#c8f03c`,lens:`#1d2b22`}},Bp=0,Vp=1,Hp=2,Up=3,Wp=4,Gp=5,Kp=6,qp=7,Jp=8,Yp={pelvisUp:.1,spine:.46,neck:.07,head:.3,upper:.29,fore:.27,hand:.085,thigh:.43,shin:.42,shoulder:.185,hip:.095},Xp=(e,t,n,r=.04,i)=>({kind:`ellipsoid`,a:e,r:t,mat:n,k:r,bone:0,rot:i}),Zp=(e,t,n,r,i,a=.03)=>({kind:`cone`,a:e,b:t,ra:n,rb:r,mat:i,k:a,bone:0}),Qp=(e,t,n,r,i=.03,a)=>({kind:`box`,a:e,r:t,ra:n,mat:r,k:i,bone:0,rot:a}),$p=e=>{let t=Math.cos(e),n=Math.sin(e);return[1,0,0,0,t,n,0,-n,t]},em={pelvis:()=>[Xp([0,.02,-.01],[.17,.11,.12],Hp,.05),Xp([.095,-.05,.01],[.1,.1,.1],Hp,.06),Xp([-.095,-.05,.01],[.1,.1,.1],Hp,.06),Qp([0,.1,-.005],[.16,.022,.115],.02,Vp,.02)],torso:()=>[Xp([0,.07,-.005],[.155,.12,.115],Bp,.06),Xp([0,.25,.012],[.19,.15,.125],Bp,.07),Xp([0,.38,-.01],[.215,.085,.11],Bp,.06),Xp([0,.2,-.06],[.17,.17,.09],Bp,.06),Xp([.15,.2,0],[.05,.15,.1],Vp,.04),Xp([-.15,.2,0],[.05,.15,.1],Vp,.04),Zp([0,.43,0],[0,.49,.01],.06,.05,Vp,.03)],head:()=>[Zp([0,-.03,0],[0,.06,.01],.05,.048,Vp,.02),Xp([0,.17,-.005],[.122,.142,.165],Kp,.03),Xp([0,.13,-.09],[.1,.1,.08],Kp,.06),Xp([0,.05,.11],[.098,.062,.085],Kp,.06),Qp([0,.035,.175],[.05,.035,.02],.015,qp,.02),Qp([0,.232,.165],[.112,.009,.075],.008,qp,.02,$p(.22)),Xp([0,.25,-.01],[.03,.066,.158],qp,.006),Xp([0,.155,.136],[.092,.038,.042],Jp,.012),Xp([0,.155,0],[.13,.024,.162],Vp,.006)],upper:()=>[Zp([0,0,0],[0,Yp.upper,0],.06,.047,Bp,.03),Xp([0,.03,0],[.068,.07,.068],Bp,.04)],fore:()=>[Zp([0,0,0],[0,Yp.fore,0],.047,.036,Bp,.03),Zp([0,Yp.fore-.05,0],[0,Yp.fore+.005,0],.04,.042,Vp,.01)],hand:()=>[Xp([0,.045,.008],[.042,.058,.032],Wp,.03),Xp([0,.07,.03],[.038,.03,.03],Wp,.03),Xp([.035,.03,.025],[.014,.03,.014],Wp,.02)],thigh:()=>[Zp([0,0,0],[0,Yp.thigh,0],.088,.066,Hp,.04),Xp([0,.16,0],[.092,.13,.088],Hp,.05)],shin:()=>[Zp([0,0,0],[0,Yp.shin,0],.058,.04,Hp,.03),Xp([0,.07,.03],[.062,.11,.05],Up,.03),Zp([0,Yp.shin-.12,0],[0,Yp.shin,0],.042,.04,Vp,.02)],foot:()=>[Qp([0,-.04,.06],[.05,.04,.13],.035,Gp,.02),Qp([0,-.078,.06],[.054,.008,.135],.006,Vp,.01)]},tm=[`pelvis`,`torso`,`head`,`upperL`,`upperR`,`foreL`,`foreR`,`handL`,`handR`,`thighL`,`thighR`,`shinL`,`shinR`,`footL`,`footR`],nm={pelvis:`pelvis`,torso:`torso`,head:`head`,upperL:`upper`,upperR:`upper`,foreL:`fore`,foreR:`fore`,handL:`hand`,handR:`hand`,thighL:`thigh`,thighR:`thigh`,shinL:`shin`,shinR:`shin`,footL:`foot`,footR:`foot`},rm=new Map,im=e=>{let t=rm.get(e);if(t)return t;let n=new bp,r=e===`head`?.9:1;for(let t of em[e](1))r!==1&&(t.a=t.a.map(e=>e*r),t.b&&=t.b.map(e=>e*r),t.r&&=t.r.map(e=>e*r),t.ra!==void 0&&(t.ra*=r),t.rb!==void 0&&(t.rb*=r)),n.add(t);let i=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(let e of n.prims)for(let t=0;t<3;t++)i[t]=Math.min(i[t],e.lo[t]),a[t]=Math.max(a[t],e.hi[t]);i=i.map(e=>e-.03),a=a.map(e=>e+.03);let o=xp(n,i,a,e===`head`?.015:e===`hand`||e===`foot`?.014:e===`upper`||e===`fore`?.018:.021),s=new oi;s.setAttribute(`position`,new G(o.positions,3)),s.setAttribute(`normal`,new G(o.normals,3)),s.setIndex(new G(o.indices,1));let c=o.positions.length/3,l=new Uint8Array(c);for(let e=0;e<c;e++){let t=n.nearest(o.positions[e*3],o.positions[e*3+1],o.positions[e*3+2]);l[e]=t.p1.mat}s.setAttribute(`color`,new G(new Float32Array(c*3),3));let u={g:s,mats:l};return rm.set(e,u),u},am=(e,t,n,r,i,a)=>{let o=cm.copy(t).sub(e),s=o.length(),c=Math.abs(n-r)+.001,l=n+r-.001;s>l&&(o.multiplyScalar(l/s),s=l,t.copy(e).add(o)),s<c&&(s=c);let u=o.normalize(),d=(n*n-r*r+s*s)/(2*s),f=Math.sqrt(Math.max(0,n*n-d*d)),p=lm.copy(i).sub(e);return p.addScaledVector(u,-p.dot(u)),p.lengthSq()<1e-8&&p.set(0,0,1).addScaledVector(u,-u.z),p.normalize(),a.copy(e).addScaledVector(u,d).addScaledVector(p,f)},om=new U,sm=new U,cm=new U,lm=new U,um=new jn,dm=new U,fm=new U,pm=new U,mm=()=>({crouch:0,lean:0,superman:0,cancan:0,nohander:0,feetOff:0,handsOff:0,air:0,look:0,back:0,pedal:!0}),hm=class{group=new ar;parts=new Map;mat;j={pelvis:new U,spine:new U,neck:new U,head:new U,shL:new U,shR:new U,elL:new U,elR:new U,wrL:new U,wrR:new U,hipL:new U,hipR:new U,knL:new U,knR:new U,anL:new U,anR:new U,toeL:new U,toeR:new U};ragdoll=!1;parts3={};links=[];constructor(e){this.mat=Rp({color:`#ffffff`,roughness:.78,metalness:0,vertexColors:!0,envIntensity:.6});for(let e of tm){let{g:t}=im(nm[e]),n=new K(t.clone(),this.mat);n.castShadow=!0,n.receiveShadow=!0,n.matrixAutoUpdate=!1,this.parts.set(e,n),this.group.add(n)}this.setOutfit(e)}setOutfit(e){let t=[e.jersey,e.jersey2,e.pants,e.pads,e.gloves,e.shoes,e.helmet,e.helmet2,e.lens,`#c98d6a`].map(e=>new W(e));for(let e of tm){let n=this.parts.get(e),{mats:r}=im(nm[e]),i=n.geometry.attributes.color;for(let e=0;e<r.length;e++){let n=t[r[e]];i.setXYZ(e,n.r,n.g,n.b)}i.needsUpdate=!0}}pose(e,t){let n=this.j,r=e.bb,i=t.superman,a=Y(t.crouch,0,1),o=Y(t.back,0,1);n.pelvis.set(-t.lean*.18,r.y-e.sag+.73-a*.22+t.air*.03-o*.13,r.z-.24-a*.08-o*.3),n.pelvis.y+=i*.32+t.nohander*.05+t.feetOff*.16,n.pelvis.z+=-i*.5+t.nohander*-.02,n.spine.copy(n.pelvis).add(cm.set(0,Yp.pelvisUp,0));let s=Y(.98+a*.1+i*.32-t.nohander*.35+o*.18,.2,1.35);n.neck.set(n.spine.x-t.lean*.08,n.spine.y+Math.cos(s)*Yp.spine,n.spine.z+Math.sin(s)*Yp.spine),n.head.set(n.neck.x,n.neck.y+.05,n.neck.z+.06);let c=fm.copy(n.neck).sub(n.spine).normalize(),l=dm.set(1,0,0);n.shL.copy(n.neck).addScaledVector(l,Yp.shoulder).addScaledVector(c,-.06),n.shR.copy(n.neck).addScaledVector(l,-Yp.shoulder).addScaledVector(c,-.06);let u=pm.copy(e.gripL),d=new U().copy(e.gripR),f=Math.max(t.nohander,t.handsOff*.6);f>0&&(u.lerp(cm.copy(n.shL).add(new U(.55,.12,.05)),f),d.lerp(cm.copy(n.shR).add(new U(-.55,.12,.05)),f));let p=(Yp.upper+Yp.fore)*.97,m=Math.max(n.shL.distanceTo(u),n.shR.distanceTo(d))-p;if(m>0){om.copy(u).add(d).multiplyScalar(.5).sub(sm.copy(n.shL).add(n.shR).multiplyScalar(.5)).normalize().multiplyScalar(m);for(let e of[n.pelvis,n.spine,n.neck,n.head,n.shL,n.shR])e.add(om)}let h=new U(n.shL.x+.5,n.shL.y-.2,n.shL.z-.4),g=new U(n.shR.x-.5,n.shR.y-.2,n.shR.z-.4);am(n.shL,u,Yp.upper,Yp.fore,h,n.elL),n.wrL.copy(u),am(n.shR,d,Yp.upper,Yp.fore,g,n.elR),n.wrR.copy(d),n.hipL.copy(n.pelvis).add(cm.set(Yp.hip,-.04,0)),n.hipR.copy(n.pelvis).add(cm.set(-Yp.hip,-.04,0));let _=new U().copy(e.pedalL).add(cm.set(0,.075,-.035)),v=new U().copy(e.pedalR).add(cm.set(0,.075,-.035));t.feetOff>0&&(_.lerp(cm.set(.24,r.y+.32,r.z-.18),t.feetOff),v.lerp(cm.set(-.24,r.y+.36,r.z-.08),t.feetOff)),i>0&&(_.lerp(cm.set(.12,n.pelvis.y-.12,n.pelvis.z-.82),i),v.lerp(cm.set(-.16,n.pelvis.y-.02,n.pelvis.z-.8),i)),t.cancan>0&&_.lerp(cm.set(-.42,r.y+.42,r.z+.26),t.cancan);let y=.12+t.air*.08;am(n.hipL,_,Yp.thigh,Yp.shin,new U(n.hipL.x+y,n.hipL.y,n.hipL.z+.9-i*1.6),n.knL),n.anL.copy(_),am(n.hipR,v,Yp.thigh,Yp.shin,new U(n.hipR.x-y,n.hipR.y,n.hipR.z+.9-i*1.6),n.knR),n.anR.copy(v),n.toeL.copy(n.anL).add(cm.set(0,-.02,.2-i*.36)),n.toeR.copy(n.anR).add(cm.set(0,-.02,.2-i*.36)),this.place(t.look)}place(e=0){let t=this.j,n=new U(0,0,1),r=new U(0,1,0);this.seg(`pelvis`,t.pelvis,t.spine,n),this.seg(`torso`,t.spine,t.neck,n);let i=new U(Math.sin(e),0,Math.cos(e));this.seg(`head`,t.neck,cm.copy(t.neck).add(new U(0,1,.18)),i),this.seg(`upperL`,t.shL,t.elL,lm.set(0,0,1).applyAxisAngle(r,.3)),this.seg(`upperR`,t.shR,t.elR,lm.set(0,0,1).applyAxisAngle(r,-.3)),this.seg(`foreL`,t.elL,t.wrL,n),this.seg(`foreR`,t.elR,t.wrR,n),this.seg(`handL`,t.wrL,cm.copy(t.wrL).add(lm.copy(t.wrL).sub(t.elL).normalize()),n),this.seg(`handR`,t.wrR,cm.copy(t.wrR).add(lm.copy(t.wrR).sub(t.elR).normalize()),n),this.seg(`thighL`,t.hipL,t.knL,n),this.seg(`thighR`,t.hipR,t.knR,n),this.seg(`shinL`,t.knL,t.anL,n),this.seg(`shinR`,t.knR,t.anR,n),this.footSeg(`footL`,t.anL,t.toeL,t.knL),this.footSeg(`footR`,t.anR,t.toeR,t.knR)}seg(e,t,n,r){let i=this.parts.get(e),a=fm.copy(n).sub(t);a.lengthSq()<1e-10&&a.set(0,1,0),a.normalize();let o=pm.copy(r).addScaledVector(a,-r.dot(a));o.lengthSq()<1e-6&&o.set(0,0,1).addScaledVector(a,-a.z),o.normalize();let s=dm.crossVectors(a,o);um.makeBasis(s,a,o).setPosition(t),i.matrix.copy(um),i.matrixWorldNeedsUpdate=!0}footSeg(e,t,n,r){let i=this.parts.get(e),a=pm.copy(n).sub(t).normalize(),o=lm.copy(r).sub(t).normalize(),s=fm.copy(o).addScaledVector(a,-o.dot(a)).normalize(),c=dm.crossVectors(s,a);um.makeBasis(c,s,a).setPosition(t),i.matrix.copy(um),i.matrixWorldNeedsUpdate=!0}startRagdoll(e,t,n){this.ragdoll=!0;let r=this.j;this.parts3={};for(let i of Object.keys(r)){let a=r[i].clone().applyMatrix4(e),o=a.clone().addScaledVector(t,-1/60);o.addScaledVector(t,-(a.y-r.pelvis.clone().applyMatrix4(e).y)*n/60),this.parts3[i]={p:a,o}}let i=(e,t)=>this.links.push([e,t,r[e].distanceTo(r[t])]);this.links=[],i(`pelvis`,`spine`),i(`spine`,`neck`),i(`neck`,`head`),i(`neck`,`shL`),i(`neck`,`shR`),i(`shL`,`shR`),i(`shL`,`elL`),i(`elL`,`wrL`),i(`shR`,`elR`),i(`elR`,`wrR`),i(`pelvis`,`hipL`),i(`pelvis`,`hipR`),i(`hipL`,`hipR`),i(`hipL`,`knL`),i(`knL`,`anL`),i(`hipR`,`knR`),i(`knR`,`anR`),i(`anL`,`toeL`),i(`anR`,`toeR`),i(`hipL`,`shL`),i(`hipR`,`shR`),i(`pelvis`,`neck`)}stepRagdoll(e,t,n){if(!this.ragdoll)return;let r=this.parts3,i=-9.81*e*e,a={s:n,d:0};for(let e in r){let t=r[e],n=(t.p.x-t.o.x)*.995,a=(t.p.y-t.o.y)*.995,o=(t.p.z-t.o.z)*.995;t.o.copy(t.p),t.p.x+=n,t.p.y+=a+i,t.p.z+=o}for(let e=0;e<4;e++){for(let[e,t,n]of this.links){let i=r[e].p,a=r[t].p,o=cm.copy(a).sub(i),s=o.length()||1e-4,c=(s-n)/s*.5;i.addScaledVector(o,c),a.addScaledVector(o,-c)}for(let e in r){let n=r[e];t.toTrack(n.p.x,n.p.z,a.s,a);let i=t.height(a.s,a.d)+.06;n.p.y<i&&(n.p.y=i,n.o.x=n.p.x-(n.p.x-n.o.x)*.55,n.o.z=n.p.z-(n.p.z-n.o.z)*.55)}}let o=this.j;for(let e in r)o[e].copy(r[e].p);this.place(0)}stopRagdoll(){this.ragdoll=!1}setHead(e){for(let t of[`head`,`torso`]){let n=this.parts.get(t);n&&n.visible!==e&&(n.visible=e)}}dispose(){this.parts.forEach(e=>e.geometry.dispose()),this.mat.dispose()}},gm={ember:0,cobalt:6,sand:15,lime:30},_m=`https://mulhimfy.github.io/huckline-app/`,vm=class{g;root;cur=null;veilEl;constructor(e,t){this.g=t,this.root=e,this.veilEl=Q(`div`,`veil`),e.append(this.veilEl);let n=Q(`div`,`rotate-hint`,[Q(`div`,``,[ap(`rotate`),Q(`div`,`display`,`Turn your phone`),Q(`div`,`label`,`Huckline plays in landscape`)])]);e.append(n)}mount(e){return this.cur?.remove(),this.cur=e,this.root.insertBefore(e,this.veilEl),e}clear(){this.cur?.remove(),this.cur=null}veil(e,t=``,n=``){e?(this.veilEl.replaceChildren(Q(`div`,``,[Q(`div`,`vt`,[n?Q(`small`,``,n):null,t]),Q(`div`,`bar`,Q(`i`))])),this.veilEl.classList.add(`on`)):this.veilEl.classList.remove(`on`)}toast(e){let t=Q(`div`,`toast panel`,e);this.root.append(t),setTimeout(()=>t.remove(),2700)}home(){let e=this.g,t=e.save,n=e.nextLine(),r=Q(`div`,`logo`);r.innerHTML=`<svg viewBox="0 0 210 46"><path class="arc" d="M4 44 Q 96 -18 206 40"/><circle class="dot" cx="104" cy="13" r="4.2"/></svg><span class="word">HUCK<b>LINE</b></span>`;let i=Q(`div`,`summary`,[Q(`span`,`chip`,[ap(`star`,`star on`),`${t.stars} / ${id.length*15}`]),Q(`span`,`chip`,[ap(`coin`,`coin`),dp(t.data.coins)])]),a=lp(Q(`span`,``,[Q(`span`,``,`Ride`),Q(`span`,`sub`,n.name)]),`primary big`,`play`,()=>e.ride()),o=Q(`div`,`corner`,[lp(``,`icon`,`bike`,()=>e.openGarage()),e.servicesName?lp(``,`icon`,`trophy`,()=>e.trophies()):null,lp(``,`icon`,`gear`,()=>e.openSettings())]),s=(e,t,n,r)=>op(Q(`div`,`mode card`,[Q(`span`,`ico`,ap(e)),Q(`div`,``,[Q(`div`,`t`,t),Q(`div`,`s`,n)]),Q(`span`,`go`,ap(`next`))]),r),c=e.dailyBest(),l=Q(`div`,`modes`,[s(`tour`,`Tour`,`${t.stars} stars · ${id.filter(t=>e.worldOpen(t.id)).length} of ${id.length} worlds`,()=>e.openLines()),s(`daily`,`Daily Line`,c>0?`Today's best ${dp(c)}`:`A new line every day`,()=>e.daily()),s(`endless`,`Endless Ridge`,t.data.endless.best>0?`Best ${dp(t.data.endless.best)}`:`One life. Keep going.`,()=>e.endless())]);l.querySelectorAll(`.mode`).forEach((e,t)=>e.style.animation=`rise .45s ${.08*t+.1}s cubic-bezier(.16,1,.3,1) both`);let u=Q(`div`,`screen home`,[Q(`div`,`layer-dim`),r,Q(`div`,`tag`,`Big-mountain freeride. Flips, whips and cliff drops.`),i,Q(`div`,`ride`,a),o,l]);this.mount(u)}lines(e){let t=this.g,n=t.save,r=Q(`div`,`tabs`,id.map(n=>{let r=t.worldOpen(n.id);return op(Q(`div`,`tab ${n.id===e?`sel`:``}`,[r?null:ap(`lock`),n.name]),()=>{n.id!==e&&(t.previewWorld(n.id),this.lines(n.id))})})),i=Q(`div`,`topbar`,[lp(``,`icon`,`back`,()=>t.home()),r]),a=id.find(t=>t.id===e),o=t.worldOpen(e),s=cd(e).reduce((e,t)=>e+n.line(t.id).stars,0),c=Q(`div`,`world-head`,[Q(`div`,`label`,o?`World ${id.indexOf(a)+1}`:`Opens at ${a.unlock} stars`),Q(`div`,`wname`,a.name),Q(`div`,`wtag`,a.tagline),Q(`div`,`wstars`,[Q(`span`,`chip`,[ap(`star`,`star on`),`${s} / 15`]),o?null:Q(`span`,`chip`,[ap(`lock`),`${Math.max(0,a.unlock-n.stars)} more stars`])])]),l=Q(`div`,`lines-row`,cd(e).map((r,i)=>{let s=n.line(r.id),c=i===0||n.line(cd(e)[i-1].id).stars>0,l=o&&c,u=Q(`div`,`line-card card ${l?``:`locked`}`,[Q(`div`,`n`,`LINE ${i+1}`),Q(`div`,`name`,r.name),Q(`div`,`blurb`,r.blurb),Q(`div`,`foot`,[up(s.stars),Q(`span`,`best`,s.best>0?dp(s.best):``)]),l?null:ap(`lock`,`lock`)]);return u.style.animationDelay=`${i*.05}s`,op(u,()=>{l?t.selectLine(r.id):this.toast(o?`Finish the line before it first`:`Earn ${a.unlock} stars to open ${a.name}`)}),u}));this.mount(Q(`div`,`screen lines`,[Q(`div`,`layer-dim`),i,c,l])),requestAnimationFrame(()=>{let t=cd(e).findIndex(e=>n.line(e.id).stars<3),r=l.children[Math.max(0,t)];r&&t>1&&l.scrollTo({left:r.offsetLeft-20,behavior:`smooth`})})}intro(e,t){let n=this.g,r=n.save.line(e.id),i=id.find(t=>t.id===e.world),a=(e,t,n)=>Q(`div`,`goal ${n?`done`:``}`,[up(e,e),Q(`span`,``,t),n?ap(`check`):null]),o=t?.oneLife?Q(`div`,`goals`,[Q(`div`,`goal`,`Best ${dp(n.save.data.endless.best)}`),Q(`div`,`goal`,`One bail ends the run`)]):Q(`div`,`goals`,[a(1,`Finish the line`,r.stars>=1),a(2,`Score ${dp(e.goals[0])}`,r.stars>=2),a(3,`Score ${dp(e.goals[1])}`,r.stars>=3)]),s=Q(`div`,`card-block`,[Q(`div`,`label world`,t?.daily?`Daily Line`:t?.oneLife?`Endless`:i.name),Q(`div`,`lname`,e.name),Q(`div`,`blurb`,e.blurb),o,r.best>0&&!t?.oneLife?Q(`div`,`label`,`Your best ${dp(r.best)} · ${fp(r.time)}`):null]);s.lastChild?.style.setProperty(`margin-top`,`12px`);let c=Q(`div`,`go`,lp(`Drop in`,`primary big`,`play`,()=>n.drop())),l=Q(`div`,`topbar`,[lp(``,`icon`,`back`,()=>t?.daily||t?.oneLife?n.home():n.openLines(e.world))]);this.mount(Q(`div`,`screen intro`,[Q(`div`,`layer-dim`),l,s,c]))}pause(){let e=this.g,t=Q(`div`,`dialog panel`,[Q(`h2`,``,`Paused`),Q(`div`,`stack`,[lp(`Resume`,`primary`,`play`,()=>e.resume()),lp(`Restart line`,``,`restart`,()=>e.restart()),lp(`Settings`,``,`gear`,()=>e.openSettings()),lp(`Quit to menu`,``,`home`,()=>e.quit())])]);this.mount(Q(`div`,`screen pause`,[Q(`div`,`layer-dim full`),t]))}results(e,t,n){let r=this.g,i=Q(`div`,`total`,`0`),a=[[`Tricks landed`,String(t.tricks)],[`Perfect landings`,String(t.perfects)],[`Best chain`,dp(t.bestChain)],[`Best trick`,t.bestTrick?`${t.bestTrick}`:`—`],[`Biggest air`,`${t.biggestAir.toFixed(1)} s`],[`Gaps`,t.gaps.length?String(t.gaps.length):`—`],[`Tokens`,`${t.tokens.filter(Boolean).length} / ${t.tokens.length}`]];n.oneLife||a.push([`Time`,`${fp(t.time)}${t.timeBonus?`  (+${dp(t.timeBonus)})`:``}`]),t.bails&&a.push([`Bails`,String(t.bails)]);let o=Q(`div`,`left`,[Q(`div`,`lname`,e.name),i,n.best?Q(`div`,`newbest`,n.oneLife?`NEW BEST RUN`:`NEW BEST`):null,Q(`div`,`rows`,a.flatMap(([e,t])=>[Q(`div`,`k`,e),Q(`div`,`v`,t)]))]),s=Q(`div`,`stars-big`);if(!n.oneLife)for(let e=0;e<3;e++)s.append(ap(`star`,`star ${e<n.stars?`on`:``}`));let c=Q(`div`,`reward`,[Q(`span`,`chip`,[ap(`coin`,`coin`),`+${dp(n.coins)}`])]),l=Q(`div`,`actions`,[lp(``,`icon`,`home`,()=>r.quit()),lp(`Replay`,``,`play`,()=>r.replay()),lp(`Retry`,``,`restart`,()=>r.restart()),n.hasNext?lp(`Next`,`primary`,`next`,()=>r.next()):null]);this.mount(Q(`div`,`screen results`,[Q(`div`,`layer-dim`),o,s,c,l]));let u=performance.now(),d=()=>{let e=Math.min(1,(performance.now()-u)/1100),n=1-(1-e)**3;i.textContent=dp(t.score*n),e<1&&requestAnimationFrame(d)};requestAnimationFrame(d),[...s.children].forEach((e,t)=>{e.style.animationDelay=`${.9+t*.28}s`})}replayBar=null;replayOverlay(e){this.replayBar=Q(`i`);let t=Q(`div`,`screen replay`,[Q(`div`,`bars top`),Q(`div`,`bars bottom`),Q(`div`,`tag`,[Q(`span`,`dot`),`REPLAY`]),Q(`div`,`rprog`,this.replayBar),lp(`Done`,`primary`,`next`,e)]);op(t,()=>void 0),this.mount(t)}replayProgress(e){this.replayBar&&(this.replayBar.style.width=`${(e*100).toFixed(1)}%`)}garage(e){let t=this.g,n=t.save.data,r=e,i=Q(`div`,`list`),a=Q(`div`,`side panel`),o=Q(`div`,`tagline`),s=Q(`div`,`equip`),c=()=>{let e=nd.find(e=>e.id===r),l=n.bikes.includes(r);i.replaceChildren(...nd.map(e=>{let i=n.bikes.includes(e.id),a=Q(`div`,`bike-card card ${e.id===r?`sel`:``}`,[Q(`div`,`bn`,e.name),Q(`div`,`bc`,ym[e.cls]),i?n.bike===e.id?Q(`span`,`price`,ap(`check`)):null:Q(`span`,`price`,[ap(`coin`,`coin`),dp(e.price)])]);return op(a,()=>{r=e.id,t.previewBike(e.id),c()}),a})),a.replaceChildren(...this.bikeSide(e,l,()=>c())),o.textContent=e.tagline,s.replaceChildren(l?n.bike===r?lp(`Riding this`,``,`check`):lp(`Ride this bike`,`primary`,`check`,()=>{t.equipBike(r),c()}):lp(Q(`span`,``,[`Buy  `,Q(`b`,``,dp(e.price))]),`primary ${n.coins,e.price,``}`,`coin`,()=>{t.buyBike(r)&&c()}))},l=Q(`div`,`topbar`,[lp(``,`icon`,`back`,()=>t.home()),Q(`div`,`title`,`Garage`),Q(`div`,`spacer`),Q(`span`,`chip`,[ap(`coin`,`coin`),dp(n.coins)])]);this.mount(Q(`div`,`screen garage`,[l,i,a,o,s])),c()}bikeSide(e,t,n){let r=this.g,i=r.save.data,a={spin:640,flip:440,stab:1.3,speed:1.06,pop:2.4},o=(e,t)=>Q(`div`,`statrow`,[Q(`span`,`label`,e),Q(`div`,`bar`,Q(`i`,``,[],{style:`width:${Math.round(Math.min(1,t)*100)}%`}))]),s=[Q(`div`,`label`,`Feel`),o(`Spin`,e.spinRate/a.spin),o(`Flip`,e.flipRate/a.flip),o(`Stability`,e.stability/a.stab),o(`Speed`,(e.speed-.9)/(a.speed-.9)),o(`Pop`,e.pop/a.pop)],c=i.paints[e.id]??{...e.paint},l=(i,a,o,l)=>{s.push(Q(`div`,`label`,i)),s.push(Q(`div`,`swatches`,a.map(i=>{let a=Q(`span`,`sw ${i.toLowerCase()===o.toLowerCase()?`sel`:``}`);return a.style.background=i,op(a,()=>{t?(l(i),r.setPaint(e.id,c),n()):this.toast(`Buy the bike to paint it`)}),a})))};return l(`Frame`,bm,c.frame,e=>c.frame=e),l(`Accent`,xm,c.accent,e=>c.accent=e),l(`Rims`,Sm,c.rims,e=>c.rims=e),s.push(Q(`div`,`label`,`Tyres`)),s.push(Q(`div`,`swatches`,[`black`,`tan`].map(i=>{let a=Q(`span`,`sw ${c.tires===i?`sel`:``}`);return a.style.background=i===`black`?`#151515`:`linear-gradient(90deg,#151515 0 30%,#b98d5f 30% 70%,#151515 70%)`,op(a,()=>{if(!t)return this.toast(`Buy the bike to change it`);c.tires=i,r.setPaint(e.id,c),n()}),a}))),s.push(Q(`div`,`label`,`Rider kit`)),s.push(Q(`div`,`swatches`,Object.entries(zp).map(([e,t])=>{let a=r.outfitOpen(e),o=Q(`span`,`sw ${i.outfit===e?`sel`:``}`);return o.style.background=`linear-gradient(135deg, ${t.jersey} 0 55%, ${t.helmet} 55% 100%)`,a.open||(o.style.opacity=`0.35`),op(o,()=>{if(!a.open)return this.toast(`Earn ${a.need} stars to unlock this kit`);r.setOutfit(e),n()}),o}))),s}settings(e){let t=this.g,n={...t.save.data.settings},r=Q(`div`,`body panel`),i=()=>t.applySettings(n),a=(e,t,n)=>Q(`div`,`ctl`,e.map(([e,r])=>op(Q(`span`,`seg ${e===t?`sel`:``}`,r),()=>{n(e),i(),c()}))),o=(e,t)=>{let n=Q(`input`,`slider`,[],{type:`range`,min:`0`,max:`1`,step:`0.05`});return n.value=String(e),n.addEventListener(`input`,()=>{t(Number(n.value)),i()}),Q(`div`,`ctl`,n)},s=(e,t,n)=>Q(`div`,`set-row`,[Q(`div`,``,[Q(`div`,`k`,e),t?Q(`div`,`d`,t):null]),n]),c=()=>{r.replaceChildren(Q(`div`,`label`,`Sound`),s(`Effects`,``,o(n.sound,e=>n.sound=e)),s(`Music`,``,o(n.music,e=>n.music=e)),s(`Haptics`,``,a([[`on`,`On`],[`off`,`Off`]],n.haptics?`on`:`off`,e=>n.haptics=e===`on`)),Q(`div`,`label`,`Riding`),s(`Assist`,`Easy lines up jumps and landings for you. Pro leaves it to you.`,a([[`easy`,`Easy`],[`pro`,`Pro`]],n.assist,e=>n.assist=e)),s(`Flip control`,`Which way to drag for a backflip.`,a([[`up`,`Up`],[`down`,`Down`]],n.invert?`down`:`up`,e=>n.invert=e===`down`)),s(`Thumbs`,`Swap the steering and pop sides.`,a([[`r`,`Right-handed`],[`l`,`Left-handed`]],n.lefty?`l`:`r`,e=>n.lefty=e===`l`)),s(`Camera`,`Helmet rides first-person.`,a([[`near`,`Close`],[`far`,`Wide`],[`helmet`,`Helmet`]],n.camera,e=>n.camera=e)),s(`Stick`,`Fixed keeps the steering stick at the bottom left.`,a([[`float`,`Floating`],[`fixed`,`Fixed`]],n.stick,e=>n.stick=e)),s(`Ghost`,`Race your best run, or the line rival until you have one.`,a([[`on`,`On`],[`off`,`Off`]],n.ghost?`on`:`off`,e=>n.ghost=e===`on`)),Q(`div`,`label`,`Graphics`),s(`Quality`,`Auto keeps it smooth on your phone.`,a([[`auto`,`Auto`],[`battery`,`Battery`],[`high`,`High`]],n.quality,e=>n.quality=e)),Q(`div`,`label`,`About`),s(`Privacy`,`No ads, no tracking.`,op(Q(`span`,`link`,`Read`),()=>t.openLink(`${_m}privacy.html`))),s(`Support`,``,op(Q(`span`,`link`,`Website`),()=>t.openLink(_m))),s(`Textures`,`Photo-scanned materials by Poly Haven (CC0).`,op(Q(`span`,`link`,`Poly Haven`),()=>t.openLink(`https://polyhaven.com`))),s(`Version`,``,Q(`span`,`label`,t.version)))};c();let l=Q(`div`,`topbar`,[lp(``,`icon`,`back`,e),Q(`div`,`title`,`Settings`)]);this.mount(Q(`div`,`screen settings`,[Q(`div`,`layer-dim full`),l,r]))}},ym={trail:`Trail bike`,bmx:`BMX`,dirt:`Dirt jumper`,dh:`Downhill`,fat:`Fat bike`},bm=[`#e8572a`,`#ff5b14`,`#2f6bff`,`#9be52a`,`#f4eee3`,`#1b1c20`,`#7a3cff`,`#ffc23d`,`#e2453c`,`#1f8a70`,`#ff8fb1`,`#8a9099`],xm=[`#1b1c20`,`#f4eee3`,`#ff5b14`,`#2f6bff`,`#ffc23d`,`#9be52a`],Sm=[`#1b1c20`,`#c9ccd2`,`#ffc23d`,`#ff5b14`,`#2f6bff`,`#e2453c`];function Cm(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new oi,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=wm(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=wm(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function wm(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new G(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Tm=new U(0,1,0),Em=(e,t,n,r=n,i=10)=>{let a=t.clone().sub(e),o=a.length(),s=new aa(r,n,o,i,1,!1);s.translate(0,o/2,0);let c=new sn().setFromUnitVectors(Tm,a.normalize());return s.applyQuaternion(c),s.translate(e.x,e.y,e.z),s.toNonIndexed().index?s.toNonIndexed():s},Dm=(e,t,n=24,r=8)=>new za(new _a(e,!1,`centripetal`),n,t,r,!1),Om=e=>{let t=e.map(e=>e.index?e.toNonIndexed():e);return t.forEach(e=>{e.attributes.uv&&e.deleteAttribute(`uv`),e.attributes.normal||e.computeVertexNormals()}),Cm(t)},km=(e,t)=>{let n=new Ra(e,t,10,72),r=n.attributes.position,i=new U;for(let n=0;n<r.count;n++){i.fromBufferAttribute(r,n);let a=Math.atan2(i.y,i.x),o=Math.hypot(i.x,i.y),s=o-e,c=i.z;if(s>t*.35){let e=1+ +(Math.cos(a*36)>.25)*(Math.abs(c)>t*.55?.7:1)*.006/o;i.x*=e,i.y*=e}r.setXYZ(n,i.x,i.y,i.z)}return n.rotateY(Math.PI/2),n.computeVertexNormals(),n},Am=(e,t,n,r)=>{let i=[];for(let a=0;a<n;a++){let o=a/n*Math.PI*2,s=a%2?1:-1,c=new U(s*r,Math.cos(o+.18*s)*e,Math.sin(o+.18*s)*e),l=new U(s*.006,Math.cos(o)*t,Math.sin(o)*t);i.push(Em(c,l,.0018,.0018,3))}return Om(i)},jm=class{spec;root=new ar;frame=new ar;steer=new ar;rearWheel=new ar;frontWheel=new ar;cranks=new ar;bars=new ar;headAxis=new U;headPivot=new U;gripL=new U;gripR=new U;pedalL=new U;pedalR=new U;saddle=new U;bb=new U;sag=0;rearAx0=new U;frontAx0=new U;mats=[];constructor(e,t){this.spec=e;let n=e.wheelbase,r=e.wheelR,i=e.cls===`bmx`,a=e.cls===`dh`,o=e.cls===`fat`,s=i?.026:o?.055:a?.034:.031,c=Rp({color:t.frame,metalness:.35,roughness:.3,envIntensity:1.2}),l=Rp({color:t.accent,metalness:.3,roughness:.38,envIntensity:1}),u=Rp({color:`#c9ccd2`,metalness:.9,roughness:.28,envIntensity:1.1}),d=Rp({color:`#18191c`,metalness:.4,roughness:.45}),f=Rp({color:t.rims,metalness:.65,roughness:.35}),p=Rp({color:`#151515`,metalness:0,roughness:.92}),m=Rp({color:`#b98d5f`,metalness:0,roughness:.85});this.mats=[c,l,u,d,f,p,m];let h=new U(0,r,-n/2),g=new U(0,r,n/2),_=new U(0,r-(i?0:.035),-n/2+(i?.36:.44));this.bb.copy(_);let v=(i?75:a?63:o?68:65)*Math.PI/180,y=new U(0,Math.sin(v),-Math.cos(v)).normalize();this.headAxis.copy(y);let b=i?.34:a?.62:.56,x=y.clone(),S=g.clone().addScaledVector(x,b).add(new U(0,0,-.044)),C=i||a?.12:.13,w=S.clone().addScaledVector(y,C);this.headPivot.copy(S);let T=(i?71:76)*Math.PI/180,E=new U(0,Math.sin(T),-Math.cos(T)),D=i?.25:o?.42:.4,O=_.clone().addScaledVector(E,D),k=[],A=i?.017:.021;k.push(Em(_,S.clone().add(new U(0,-.01,-.01)),i?.018:.028,i?.017:.024,12)),k.push(Em(O.clone().add(new U(0,-.02,.02)),w.clone().add(new U(0,-.025,-.01)),A,A*.95,12)),k.push(Em(_,O,.02,.018,12)),k.push(Em(S.clone().addScaledVector(y,-.01),w.clone().addScaledVector(y,.01),.026,.026,14));for(let e of[-1,1]){let t=h.clone().add(new U(e*.065,0,0)),n=_.clone().add(new U(e*.03,0,-.02));k.push(Em(n,t,.014,.011,8));let r=O.clone().add(new U(e*.02,-.04,-.01));k.push(Em(r,t,.011,.01,8))}k.push(Em(_.clone().add(new U(0,.02,.02)),_.clone().lerp(S,.35).add(new U(0,.03,0)),.034,.022,10));let j=new K(Om(k),c);if(this.frame.add(j),e.travel>0){let e=_.clone().lerp(S,.45).add(new U(0,.035,0)),t=O.clone().lerp(_,.38).add(new U(0,.02,-.04)),n=Em(e,e.clone().lerp(t,.55),.022,.022,10);this.frame.add(new K(n,d));let r=Em(e.clone().lerp(t,.5),t,.009,.009,6);this.frame.add(new K(r,u));let i=[],a=t.clone().sub(e),o=a.length();a.normalize();let s=new U().crossVectors(a,new U(1,0,0)).normalize(),c=new U().crossVectors(a,s).normalize();for(let t=0;t<=64;t++){let n=t/64,r=n*Math.PI*2*9;i.push(e.clone().addScaledVector(a,.1*o+n*.75*o).addScaledVector(s,Math.cos(r)*.03).addScaledVector(c,Math.sin(r)*.03))}this.frame.add(new K(Dm(i,.0045,160,5),l))}let M=O.clone().addScaledVector(E,i?.04:.03);this.frame.add(new K(Em(O,M,.0155,.0155,8),d));let N=new La(.06,12,8);N.scale(.95,.42,2.6),N.translate(M.x,M.y+.02,M.z+.02),this.frame.add(new K(N,d)),this.saddle.set(M.x,M.y+.05,M.z),this.buildWheel(this.rearWheel,r,s,t,f,u,d,p,m,!0),this.rearWheel.position.copy(h),this.rearAx0.copy(h),this.frame.add(this.rearWheel);let ee=new Ra(i?.085:.068,.006,6,32);ee.rotateY(Math.PI/2),ee.translate(-.055,0,0),this.cranks.add(new K(ee,u));let te=new Ra(i?.03:.05,.006,6,20);te.rotateY(Math.PI/2);let P=new K(te,u);P.position.set(-.07,0,0),this.rearWheel.add(P);let ne=new U(-.055,_.y+(i?.085:.068),_.z),re=new U(-.065,h.y+(i?.03:.05),h.z),ie=new U(-.055,_.y-(i?.085:.068),_.z),ae=new U(-.065,h.y-(i?.03:.05),h.z);this.frame.add(new K(Om([Em(ne,re,.004,.004,4),Em(ie,ae,.004,.004,4)]),d));let oe=i?.175:.17;for(let e of[-1,1]){let t=[],n=e*.075,r=e>0?1:-1;t.push(Em(new U(n,0,0),new U(n,-oe*r,0),.012,.01,6));let i=new ia(.1,.018,.1);i.translate(n+e*.06,-oe*r,0),t.push(i),this.cranks.add(new K(Om(t),d))}this.cranks.position.copy(_),this.frame.add(this.cranks),this.steer.position.copy(S);let F=e=>e.clone().sub(S),se=[],ce=F(S.clone().addScaledVector(y,-.03));for(let e of[-1,1]){let t=ce.clone().add(new U(e*.058,0,0)),n=F(g).add(new U(e*.058,0,0)),r=t.clone().lerp(n,i?0:.42);if(i||se.push(Em(t,r,.018,.018,10)),se.push(Em(i?t:r,n,i?.014:.022,i?.012:.02,10)),a){let n=F(w.clone().addScaledVector(y,.04)).add(new U(e*.058,0,0));se.push(Em(t,n,.018,.018,10))}}let le=new ia(.16,.03,.05);if(le.translate(ce.x,ce.y,ce.z),se.push(le),a){let e=new ia(.16,.025,.045),t=F(w.clone().addScaledVector(y,.03));e.translate(t.x,t.y,t.z),se.push(e)}this.steer.add(new K(Om(se),i?c:u)),this.buildWheel(this.frontWheel,r,s,t,f,u,d,p,m,!1),this.frontWheel.position.copy(F(g)),this.frontAx0.copy(F(g)),this.steer.add(this.frontWheel);let ue=F(w.clone().addScaledVector(y,i?.06:.03)),I=ue.clone().add(new U(0,i?.02:.008,i?.03:.045)),de=[];de.push(Em(ue,I,.017,.017,8));let fe=i?.36:.39,pe=i?.2:.03,me=-.045,he=[new U(-fe,I.y+pe,I.z+me),new U(-fe*.55,I.y+pe*.6,I.z+me*.3),new U(-.08,I.y,I.z),new U(.08,I.y,I.z),new U(fe*.55,I.y+pe*.6,I.z+me*.3),new U(fe,I.y+pe,I.z+me)];de.push(Dm(he,.011,40,8)),i&&de.push(Em(new U(-fe*.55,I.y+pe*.65,I.z),new U(fe*.55,I.y+pe*.65,I.z),.009,.009,6)),this.bars.add(new K(Om(de),i?c:d));let ge=[];for(let e of[-1,1]){let t=new U(e*(fe-.12),I.y+pe,I.z+me),n=new U(e*(fe+.005),I.y+pe,I.z+me);ge.push(Em(t,n,.016,.016,8))}this.bars.add(new K(Om(ge),p)),this.steer.add(this.bars),this.gripLocal.set(fe-.06,I.y+pe,I.z+me),this.frame.add(this.steer),this.root.add(this.frame),this.root.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),this.crankLen=oe,this.pose(0,0,0,0,0)}gripLocal=new U;crankLen=.17;buildWheel(e,t,n,r,i,a,o,s,c,l){let u=new K(km(t-n,n),s);if(e.add(u),r.tires===`tan`)for(let r of[-1,1]){let i=new Ra(t-n*1.55,n*.42,6,48);i.rotateY(Math.PI/2),i.translate(r*n*.55,0,0),e.add(new K(i,c))}let d=new Ra(t-n*2+.004,.012,6,48);d.rotateY(Math.PI/2),d.scale(1.6,1,1),e.add(new K(d,i)),e.add(new K(Am(.025,t-n*2-.004,28,.03),a));let f=new aa(.022,.022,.1,10);if(f.rotateZ(Math.PI/2),e.add(new K(f,o)),this.spec.cls!==`bmx`){let t=new aa(l?.09:.1,l?.09:.1,.003,24,1,!0);t.rotateZ(Math.PI/2),t.translate(.06,0,0),e.add(new K(t,a))}}pose(e,t,n,r,i,a=this.sag){this.sag=a,this.rearWheel.rotation.x=e,this.frontWheel.rotation.x=e,this.rearWheel.position.copy(this.rearAx0).y+=a,this.frontWheel.position.copy(this.frontAx0).y+=a,this.cranks.rotation.x=i;let o=Mm.setFromAxisAngle(this.headAxis,t+r);this.steer.quaternion.copy(o);let s=Nm.setFromAxisAngle(this.headAxis,n);this.frame.quaternion.copy(s),this.frame.position.copy(this.headPivot).sub(Fm.copy(this.headPivot).applyQuaternion(s)),this.frame.position.y-=a,n!==0&&this.steer.quaternion.premultiply(Pm.copy(s).invert()),this.updateTargets()}updateTargets(){this.root.updateMatrixWorld(!0);let e=this.root.matrixWorld.clone().invert(),t=(t,n)=>t.applyMatrix4(n.matrixWorld).applyMatrix4(e);this.gripR.set(-this.gripLocal.x,this.gripLocal.y,this.gripLocal.z),this.gripL.copy(this.gripLocal),t(this.gripL,this.bars),t(this.gripR,this.bars);let n=this.crankLen;this.pedalL.set(.135,-n,0),this.pedalR.set(-.135,n,0),t(this.pedalL,this.cranks),t(this.pedalR,this.cranks)}setPaint(e){this.mats[0].color.set(e.frame),this.mats[1].color.set(e.accent),this.mats[4].color.set(e.rims)}dispose(){this.root.traverse(e=>{let t=e;t.isMesh&&t.geometry.dispose()}),this.mats.forEach(e=>e.dispose())}},Mm=new sn,Nm=new sn,Pm=new sn,Fm=new U,Im=Nd(),Lm={s:0,d:0},Rm=e=>{let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)},zm=class{cam;mode=`chase`;pos=new U;look=new U;dir=new U(1,0,0);fov=58;shakeT=0;shakeA=0;t=0;snapNext=!0;dist=3.7;height=1.55;introT=0;orbit=0;rumble=0;lean=0;flow=0;roll=0;lookDrop=0;shots=[];shot=-1;povF=new U(1,0,0);povU=new U(0,1,0);constructor(e){this.cam=new Bo(58,e,.15,5200)}snap(){this.snapNext=!0}shake(e){ne()||(this.shakeA=Math.max(this.shakeA,e),this.shakeT=.35)}update(e,t,n,r,i,a,o,s,c){this.t+=e;let l=this.snapNext;if(this.snapNext=!1,this.mode===`intro`)return this.intro(e,t);if(this.mode===`finish`)return this.finishOrbit(e,n);t.frame(i+6,Im);let u=Math.cos(Im.h),d=Math.sin(Im.h),f=Math.hypot(r.x,r.z),p=f>1?r.x/f:u,m=f>1?r.z/f:d,h=new U(u*.55+p*.45,0,d*.55+m*.45).normalize();l?this.dir.copy(h):this.dir.lerp(h,Z(a?1.6:3.2,e)).normalize();let g=Y(s,0,22),_=this.mode===`bail`,v=this.dist+g*.07+(a?.9:0)+(_?2.5:0),y=this.height+g*.035+(a?Math.min(o*.35,2.2):0)+(_?1.4:0),b=c??n,x=new U(b.x-this.dir.x*v,b.y+y,b.z-this.dir.z*v);t.toTrack(x.x,x.z,i-v,Lm);let S=t.height(Lm.s,Lm.d);x.y=Math.max(x.y,S+1.3);let C=3.2+g*.22;t.toTrack(b.x+this.dir.x*(C+4),b.z+this.dir.z*(C+4),i+C+4,Lm);let w=Y(t.height(Lm.s,Lm.d)-(b.y-0),-14,4);this.lookDrop+=(w*.55-this.lookDrop)*(l?1:Z(3,e));let T=new U(b.x+this.dir.x*C,b.y+.85-(a?Math.min(o*.25,1.5):0)+(a?0:this.lookDrop*.6),b.z+this.dir.z*C);if(l)this.pos.copy(x),this.look.copy(T);else{let t=_?2.2:7.5;this.pos.x+=(x.x-this.pos.x)*Z(t,e),this.pos.z+=(x.z-this.pos.z)*Z(t,e),this.pos.y+=(x.y-this.pos.y)*Z(a?3.2:5.5,e),this.look.lerp(T,Z(_?3:10,e))}let E=54+g*.95+(a?3:0)+this.flow*4;this.fov=l?E:$u(this.fov,E,Z(2.5,e)),this.roll+=(Y(-this.lean*.14,-.08,.08)-this.roll)*Z(4,e),this.apply(e)}apply(e){let t=this.cam;if(t.position.copy(this.pos),this.shakeT>0){this.shakeT-=e;let n=this.shakeA*Math.max(0,this.shakeT/.35);t.position.x+=Math.sin(this.t*61)*n*.06,t.position.y+=Math.sin(this.t*47+1)*n*.08}else this.shakeA=0;if(this.rumble>.01&&!ne()){let e=this.rumble;t.position.y+=(Math.sin(this.t*73)*.6+Math.sin(this.t*131+2)*.4)*e*.035,t.position.x+=Math.sin(this.t*97+1)*e*.015}t.lookAt(this.look),this.mode===`chase`&&Math.abs(this.roll)>1e-4&&t.rotateZ(this.roll),Math.abs(t.fov-this.fov)>.01&&(t.fov=this.fov,t.updateProjectionMatrix())}pov(e,t,n,r,i,a=!1){this.t+=e;let o=a?1:Z(16,e);this.povF.lerp(n,o).normalize();let s=new U(0,1,0).lerp(r,.6).normalize();this.povU.lerp(s,a?1:Z(10,e)).normalize(),this.pos.copy(t),this.look.copy(t).addScaledVector(this.povF,10).addScaledVector(this.povU,-2.6);let c=this.cam;c.position.copy(this.pos),this.rumble>.01&&!ne()&&(c.position.y+=Math.sin(this.t*83)*this.rumble*.02),c.up.copy(this.povU),c.lookAt(this.look),c.up.set(0,1,0);let l=74+Math.min(22,i)*.55;this.fov=a?l:$u(this.fov,l,Z(2.5,e)),Math.abs(c.fov-this.fov)>.01&&(c.fov=this.fov,c.updateProjectionMatrix())}setShots(e){let t=[],n=[];for(let t of e.features)(t.kind===`jump`||t.kind===`drop`||t.kind===`woodKicker`||t.kind===`woodDeck`)&&n.push(t.keys[0]??t.s0);n.sort((e,t)=>e-t);let r=0,i=0;t.push({s:6,side:1,out:2.5,up:1.6,fov:52,follow:!1});for(let a=14;a<e.finishS+10;){let e=n.find(e=>e>a+4);if(e!==void 0&&e-a<45)t.push({s:e+6,side:i%2?1:-1,out:9+r%3*2,up:1.4+r%2*1.8,fov:46,follow:!1}),a=e+22,r++;else{let e=i%4==3;t.push({s:a+30,side:i%2?-1:1,out:e?0:7+i%3*3,up:e?3:2.2+i%3,fov:e?62:40,follow:e}),a+=42}i++}this.shots=t,this.shot=-1}replay(e,t,n,r,i){this.t+=e;let a=this.shots.findIndex(e=>e.s+(e.follow?26:14)>i);a<0&&(a=this.shots.length-1);let o=this.shots[a],s=a!==this.shot;if(this.shot=a,!o)return;if(o.follow){let t=Math.hypot(r.x,r.z)||1,i=new U(n.x-r.x/t*8,n.y+o.up+1.5,n.z-r.z/t*8);s?this.pos.copy(i):this.pos.lerp(i,Z(3,e))}else{let e=t.profile(Math.max(0,Math.min(t.length,o.s))).half,n=o.side*(e+o.out);t.frame(o.s,Im);let r=Im.x-Math.sin(Im.h)*n,i=Im.z+Math.cos(Im.h)*n,a=t.height(o.s,n);this.pos.set(r,Math.max(a,t.height(o.s,0))+o.up,i)}let c=new U(n.x,n.y+.9,n.z);s?this.look.copy(c):this.look.lerp(c,Z(9,e)),this.fov=o.fov,this.apply(e)}intro(e,t){this.introT=Math.min(1,this.introT+e/6);let n=this.introT;t.frame(0,Im);let r=Im.x,i=Im.z,a=t.height(0,0),o=Math.cos(Im.h),s=Math.sin(Im.h),c=new U(-s,0,o),l=(e,t,n=0)=>new U(r-o*e,a+t,i-s*e).addScaledVector(c,n),u=l(58,34,10),d=l(40,20,6),f=l(18,7,2);t.frame(-6,Im);let p=new U(Im.x-Math.cos(Im.h)*5,t.height(-6,0)+2.6,Im.z-Math.sin(Im.h)*5),m=Rm(n*1.05),h=1-m;this.pos.copy(u).multiplyScalar(h*h*h).addScaledVector(d,3*h*h*m).addScaledVector(f,3*h*m*m).addScaledVector(p,m*m*m);let g=Math.min(t.length*.3,150);t.frame(g,Im);let _=new U(Im.x,t.height(g,0)-6,Im.z);t.frame(10,Im);let v=new U(Im.x,t.height(10,0)+1,Im.z);this.look.copy(_).lerp(v,Rm((n-.45)/.55)),this.fov=$u(52,56,Rm(n)),this.apply(e)}finishOrbit(e,t){this.orbit+=e*.25,this.pos.set(t.x+Math.cos(this.orbit)*7,t.y+2.6,t.z+Math.sin(this.orbit)*7),this.look.set(t.x,t.y+.9,t.z),this.fov=46,this.apply(e)}studio(e,t,n,r,i){this.pos.set(t.x+Math.cos(n)*r,t.y+i,t.z+Math.sin(n)*r),this.look.copy(t).add(new U(0,.8,0)),this.fov=38,this.apply(e)}resize(e){this.cam.aspect=e,this.cam.updateProjectionMatrix()}},Bm=(e,t,n)=>{let r=new pr,i=new La(10,32,16),a=i.attributes.position,o=new Float32Array(a.count*3),s=new W(t.zenith),c=new W(t.horizon),l=new W(t.hemiGround).multiplyScalar(.6),u=new W(t.sunColor),d=new W;for(let e=0;e<a.count;e++){let t=a.getX(e)/10,r=a.getY(e)/10,i=a.getZ(e)/10;r>=0?d.copy(c).lerp(s,r**.5):d.copy(c).lerp(l,Math.min(1,-r*3));let f=Math.max(0,t*n.x+r*n.y+i*n.z)**24*6;d.r+=u.r*f,d.g+=u.g*f,d.b+=u.b*f,o[e*3]=d.r,o[e*3+1]=d.g,o[e*3+2]=d.b}i.setAttribute(`color`,new G(o,3)),r.add(new K(i,new vi({vertexColors:!0,side:1})));let f=new Ms(e),p=f.fromScene(r,.02);return f.dispose(),i.dispose(),p.texture},Vm=1400,Hm=class{points;glow;pos=new Float32Array(Vm*3);vel=new Float32Array(Vm*3);col=new Float32Array(Vm*4);size=new Float32Array(Vm);life=new Float32Array(Vm);age=new Float32Array(Vm);grow=new Float32Array(Vm);drag=new Float32Array(Vm);grav=new Float32Array(Vm);kind=new Uint8Array(Vm);head=0;geo;glowGeo;gpos=new Float32Array(Vm*3);gcol=new Float32Array(Vm*4);gsize=new Float32Array(Vm);dustCol=new W(`#d9b48c`);scale=1;constructor(){this.geo=new oi,this.geo.setAttribute(`position`,new G(this.pos,3)),this.geo.setAttribute(`aCol`,new G(this.col,4)),this.geo.setAttribute(`aSize`,new G(this.size,1));let e=new Ja({transparent:!0,depthWrite:!1,blending:1,uniforms:{uScale:{value:1},uFogCol:$.uFogCol,uFogDist:$.uFogDist,uFogBright:$.uFogBright},vertexShader:`
        attribute vec4 aCol;
        attribute float aSize;
        uniform float uScale;
        uniform float uFogDist;
        varying vec4 vCol;
        varying float vFog;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uScale / max(0.1, -mv.z);
          vCol = aCol;
          vFog = 1.0 - exp(-(-mv.z) / uFogDist);
        }`,fragmentShader:`
        uniform vec3 uFogCol;
        uniform float uFogBright;
        varying vec4 vCol;
        varying float vFog;
        void main() {
          vec2 q = gl_PointCoord * 2.0 - 1.0;
          float r = dot(q, q);
          if (r > 1.0) discard;
          float a = vCol.a * (1.0 - r) * (1.0 - r);
          vec3 c = mix(vCol.rgb, uFogCol * uFogBright, vFog);
          gl_FragColor = vec4(c, a);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`});this.points=new Zi(this.geo,e),this.points.frustumCulled=!1,this.points.renderOrder=5,this.glowGeo=new oi,this.glowGeo.setAttribute(`position`,new G(this.gpos,3)),this.glowGeo.setAttribute(`aCol`,new G(this.gcol,4)),this.glowGeo.setAttribute(`aSize`,new G(this.gsize,1));let t=e.clone();t.blending=2,t.uniforms={uScale:e.uniforms.uScale,uFogCol:$.uFogCol,uFogDist:$.uFogDist,uFogBright:$.uFogBright},this.glow=new Zi(this.glowGeo,t),this.glow.frustumCulled=!1,this.glow.renderOrder=6}setViewport(e){this.points.material.uniforms.uScale.value=e*.9}setDust(e){this.dustCol.set(e)}emit(e,t,n,r=1,i=.5,a){for(let o=0;o<r;o++){let r=this.head;this.head=(this.head+1)%Vm,this.kind[r]=e===`dust`?0:e===`pebble`?1:e===`spark`?2:e===`confetti`?3:4;let o=r*3;this.pos[o]=t.x+(Math.random()-.5)*i*.4,this.pos[o+1]=t.y+Math.random()*i*.2,this.pos[o+2]=t.z+(Math.random()-.5)*i*.4,this.vel[o]=n.x+(Math.random()-.5)*i*2,this.vel[o+1]=n.y+Math.random()*i*1.4,this.vel[o+2]=n.z+(Math.random()-.5)*i*2,this.age[r]=0;let s=a??this.dustCol,c=r*4;switch(e){case`dust`:this.life[r]=1.2+Math.random()*1.4,this.size[r]=.5+Math.random()*.5,this.grow[r]=1.6,this.drag[r]=2.2,this.grav[r]=-.25,this.col[c]=s.r*(.9+Math.random()*.2),this.col[c+1]=s.g*(.9+Math.random()*.2),this.col[c+2]=s.b*(.9+Math.random()*.2),this.col[c+3]=.38;break;case`spray`:this.life[r]=.7+Math.random()*.5,this.size[r]=.25+Math.random()*.25,this.grow[r]=1.2,this.drag[r]=1.5,this.grav[r]=3,this.col[c]=s.r,this.col[c+1]=s.g,this.col[c+2]=s.b,this.col[c+3]=.55;break;case`pebble`:this.life[r]=.9+Math.random()*.5,this.size[r]=.05+Math.random()*.05,this.grow[r]=0,this.drag[r]=.3,this.grav[r]=9.8,this.col[c]=s.r*.55,this.col[c+1]=s.g*.5,this.col[c+2]=s.b*.45,this.col[c+3]=1;break;case`spark`:this.life[r]=.6+Math.random()*.5,this.size[r]=.12+Math.random()*.15,this.grow[r]=-.6,this.drag[r]=2.5,this.grav[r]=1.5,this.col[c]=s.r,this.col[c+1]=s.g,this.col[c+2]=s.b,this.col[c+3]=1;break;case`confetti`:this.life[r]=2.5+Math.random()*1.5,this.size[r]=.1+Math.random()*.08,this.grow[r]=0,this.drag[r]=1.6,this.grav[r]=2.2,this.col[c]=s.r,this.col[c+1]=s.g,this.col[c+2]=s.b,this.col[c+3]=1}}}enabled=!0;update(e){let t=0;for(let n=0;n<Vm;n++){if(this.life[n]<=0)continue;this.age[n]+=e;let r=this.age[n]/this.life[n],i=n*3;if(r>=1){this.life[n]=0,this.size[n]=0;continue}let a=Math.exp(-this.drag[n]*e);this.vel[i]*=a,this.vel[i+1]=this.vel[i+1]*a-this.grav[n]*e,this.vel[i+2]*=a,this.pos[i]+=this.vel[i]*e,this.pos[i+1]+=this.vel[i+1]*e,this.pos[i+2]+=this.vel[i+2]*e,this.size[n]=Math.max(0,this.size[n]+this.grow[n]*e);let o=this.kind[n];(o===0||o===4)&&(this.col[n*4+3]=(o===0?.36:.5)*(1-r)*Math.min(1,r*8)),o===2&&t<Vm&&(this.gpos[t*3]=this.pos[i],this.gpos[t*3+1]=this.pos[i+1],this.gpos[t*3+2]=this.pos[i+2],this.gcol[t*4]=this.col[n*4],this.gcol[t*4+1]=this.col[n*4+1],this.gcol[t*4+2]=this.col[n*4+2],this.gcol[t*4+3]=1-r,this.gsize[t]=this.size[n]*3,t++)}for(let e=t;e<Vm;e++)this.gsize[e]=0;this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aCol.needsUpdate=!0,this.geo.attributes.aSize.needsUpdate=!0,this.glowGeo.attributes.position.needsUpdate=!0,this.glowGeo.attributes.aCol.needsUpdate=!0,this.glowGeo.attributes.aSize.needsUpdate=!0,this.glowGeo.setDrawRange(0,t),this.glow.visible=this.enabled&&t>0}clear(){this.life.fill(0),this.size.fill(0)}},Um={mesa:{sunElev:21,sunAzim:-112,sunColor:`#ffd9ab`,sunIntensity:3,hemiSky:`#86aee6`,hemiGround:`#b05a36`,hemiIntensity:.8,zenith:`#1d4fc0`,horizon:`#c6d6e2`,below:`#c9926a`,sunGlow:`#ffe2b8`,cloudColor:`#fff6ec`,cloudShade:`#9fb2cc`,cloudCover:.42,fogColor:`#c8b4a2`,fogSun:`#ffc995`,fogDist:4200,fogLow:.05,exposure:.92,strata:[`#a24a2b`,`#b1552f`,`#bd6236`,`#c86f40`,`#b85a33`,`#a95030`,`#c97a4a`,`#d8996a`,`#c26a3d`,`#9d4529`,`#b4603a`,`#d08a5c`],sand:`#c27f55`,trail:`#dcb08a`,rut:`#a8714b`,veg:`#8f9a63`,vegDark:`#4f5a35`,rock:`#c9764a`,snow:0,wood:`#b98552`,woodDark:`#6b4a2e`,mat:{scale:[2.6,3.4,9,4.5],tint:[`#ffffff`,`#ffd9c4`,`#ffffff`,`#ffe2cc`],rock:[.4,.68],alt:`slab`,strata:.5}},pines:{sunElev:22,sunAzim:-40,sunColor:`#ffe7c4`,sunIntensity:2.6,hemiSky:`#a8c6d8`,hemiGround:`#4a5a34`,hemiIntensity:1.1,zenith:`#4f86b8`,horizon:`#dbe6e4`,below:`#7f8f78`,sunGlow:`#fff0d0`,cloudColor:`#ffffff`,cloudShade:`#aab8c2`,cloudCover:.45,fogColor:`#bfd0cc`,fogSun:`#ffe9c6`,fogDist:880,fogLow:.42,exposure:1,strata:[`#4b4740`,`#5d574d`,`#6f685b`,`#7d7563`,`#5a544a`,`#8a8270`],sand:`#6e5a3c`,trail:`#6b4f33`,rut:`#4a3522`,veg:`#5f7a3a`,vegDark:`#2e4423`,rock:`#7a756a`,snow:0,wood:`#c08b55`,woodDark:`#6a4a2c`,rockTop:`#55712f`,mat:{scale:[2.4,3,6,3.4],tint:[`#ffffff`,`#f2efe6`,`#ffffff`,`#ffffff`],rock:[.5,.8],alt:`meadow`,strata:0}},town:{sunElev:24,sunAzim:-62,sunColor:`#ffe7c7`,sunIntensity:3.25,hemiSky:`#8fbbe8`,hemiGround:`#c49568`,hemiIntensity:.95,zenith:`#1d5fc4`,horizon:`#cfe5f5`,below:`#4fa3c7`,sunGlow:`#fff1da`,cloudColor:`#ffffff`,cloudShade:`#bfcfe0`,cloudCover:.2,fogColor:`#d3e2ee`,fogSun:`#ffeed6`,fogDist:1500,fogLow:.2,exposure:1,strata:[`#c89f74`,`#d9b587`,`#b6875c`,`#e4c79e`,`#bf916a`,`#d1aa80`],sand:`#d8b583`,trail:`#e9dbc2`,rut:`#b09878`,veg:`#5e7f38`,vegDark:`#33501e`,rock:`#c2a37e`,snow:0,wood:`#a8754a`,woodDark:`#5c3f27`,sea:{color:`#1a6aa0`,below:26},mat:{scale:[2.2,3.4,7,3],tint:[`#ffffff`,`#fff3e2`,`#fff6ea`,`#ffffff`],rock:[.45,.75],alt:`none`,strata:0}},glacier:{sunElev:14,sunAzim:-35,sunColor:`#ffd7b0`,sunIntensity:3.1,hemiSky:`#86a8e2`,hemiGround:`#c7d3ea`,hemiIntensity:.9,zenith:`#1b3f8f`,horizon:`#f2c9b8`,below:`#d9e4f2`,sunGlow:`#ffd9b8`,cloudColor:`#ffeee6`,cloudShade:`#9aa9c8`,cloudCover:.3,fogColor:`#c9d5ea`,fogSun:`#ffd2b4`,fogDist:2600,fogLow:.22,exposure:1,strata:[`#4d5468`,`#5e6680`,`#717a94`,`#3f4659`,`#868fa8`,`#5a6278`],sand:`#eef3fb`,trail:`#e2e9f4`,rut:`#b9c6da`,veg:`#4d6b5a`,vegDark:`#2b3f36`,rock:`#5d6479`,snow:1,wood:`#a7774c`,woodDark:`#5c3f27`,mat:{scale:[2.8,3.8,8,3],tint:[`#f4f8ff`,`#ffffff`,`#e8ecf6`,`#ffffff`],rock:[.52,.8],alt:`none`,strata:0}},ember:{sunElev:7,sunAzim:-25,sunColor:`#ffb27a`,sunIntensity:2.4,hemiSky:`#8c7fb8`,hemiGround:`#a8452a`,hemiIntensity:1,zenith:`#2a2458`,horizon:`#f59a6b`,below:`#3a1e1c`,sunGlow:`#ffc08a`,cloudColor:`#ffc7a6`,cloudShade:`#5e4a78`,cloudCover:.4,fogColor:`#8f6a78`,fogSun:`#ffa86e`,fogDist:1400,fogLow:.55,exposure:1.05,strata:[`#1d1a1f`,`#2b2629`,`#3b3234`,`#24201f`,`#463a38`,`#2f2a2c`],sand:`#3a3030`,trail:`#5b4740`,rut:`#2e2321`,veg:`#5d5a3a`,vegDark:`#2f2c1c`,rock:`#2e292c`,snow:0,wood:`#9a6a44`,woodDark:`#4e3420`,lava:{color:`#ff5a12`,below:40,strength:3.2},mat:{scale:[2.6,3,7,3],tint:[`#cfc4c0`,`#8f8a8c`,`#ffffff`,`#ffffff`],rock:[.4,.7],alt:`none`,strata:0}}},Wm=e=>{let t=e.index?e.toNonIndexed():e;return t.attributes.uv&&t.deleteAttribute(`uv`),t},Gm=class{p=[];c=[];tri(e,t,n,r,i=r,a=r){this.p.push(e.x,e.y,e.z,t.x,t.y,t.z,n.x,n.y,n.z),this.c.push(r.r,r.g,r.b,i.r,i.g,i.b,a.r,a.g,a.b)}geometry(){let e=new oi;return e.setAttribute(`position`,new G(new Float32Array(this.p),3)),e.setAttribute(`color`,new G(new Float32Array(this.c),3)),e.computeVertexNormals(),e}},Km=(e,t,n,r,i,a=7)=>{let o=new aa(r,n,t,a,Math.max(3,Math.round(t/1.5)),!0),s=o.attributes.position,c=o.attributes.uv,l=new wd(e);for(let e=0;e<s.count;e++){let r=s.getY(e)+t/2,a=r/t,o=1+(1-a)**6*.6;s.setX(e,s.getX(e)*o+l.n1(a*2+1)*i*a+i*.5*a*a),s.setZ(e,s.getZ(e)*o+l.n1(a*2+7)*i*a),s.setY(e,r),c.setY(e,r/1.6%1e4),c.setX(e,c.getX(e)*Math.max(1,Math.round(n*12)))}return o.computeVertexNormals(),o},qm=(e,t)=>{let n=new ld(e),r=t.h,i=(t.width??.22)*r*n.range(.85,1.15),a=t.base??.16,o=new Gm,s=new Gm,c=t.leaf.clone().multiplyScalar(.38),l=t.leaf.clone().multiplyScalar(.3),u=new W(`#eef2f8`),d=Math.max(6,Math.round(r*.5)),f=(e,t,r,i,a,o,s,c,d)=>{let f=new U(0,t,0),p=[];for(let e=0;e<a*2;e++){let s=e%2==0,c=o+e/(a*2)*Math.PI*2+(s?n.range(-.12,.12):0),l=s?r*n.range(.9,1.12):r*n.range(.55,.7),u=t-(s?i*n.range(.85,1.2):i*.45)-l*.08;p.push(new U(Math.cos(c)*l,u,Math.sin(c)*l))}let m=s[1].clone().multiplyScalar(n.range(.88,1.12));for(let t=0;t<p.length;t++){let n=p[t],r=p[(t+1)%p.length],i=t%2==0?m:s[2],a=t%2==0?s[2]:m;if(e.tri(f,r,n,s[0],a,i),c&&t%2==0){let t=new U(0,.06,0);e.tri(f.clone().add(t),r.clone().lerp(f,.35).add(t),n.clone().lerp(f,.35).add(t),u)}}if(d){let n=new U(0,t-i*.55,0);for(let t=0;t<p.length;t+=2){let r=p[t],i=p[(t+2)%p.length];e.tri(n,r,i,l,l,l)}}};for(let l=0;l<d;l++){let u=l/(d-1),p=r*(a+(1-a)*u**.9),m=(1-u)**.9*(.82+.18*Math.sin(u*3.1+e)),h=i*m*n.range(.88,1.1)+.12,g=h*n.range(.32,.5)+.1,_=t.leaf2.clone().lerp(t.leaf,n.range(0,.35)),v=t.leaf.clone().multiplyScalar(.7),y=Math.max(5,Math.round(6+m*4)),b=n.range(0,6.28);f(o,p,h,g,y,b,[c,_,v],!!t.snow,!0),f(o,p+g*.5+.1,h*.62,g*.7,Math.max(4,y-2),b+.4,[c,_.clone().multiplyScalar(.92),v],!!t.snow&&l%2==0,!1),l%2==0&&f(s,p,h*1.05,g,Math.max(4,Math.round(y*.7)),b,[c,_,v],!!t.snow,!1)}let p=new U(0,r*1.03,0);for(let e=0;e<5;e++){let n=e/5*Math.PI*2,a=(e+1)/5*Math.PI*2,c=r*.9,l=i*.08+.12,u=new U(Math.cos(n)*l,c,Math.sin(n)*l),d=new U(Math.cos(a)*l,c,Math.sin(a)*l);o.tri(p,d,u,t.leaf2,t.leaf,t.leaf),s.tri(p,d,u,t.leaf2,t.leaf,t.leaf)}let m=Km(e,r*.98,Math.max(.08,r*.022),.03,n.range(.05,.25));return{crown:o.geometry(),trunk:m,low:s.geometry()}},Jm=(e,t,n)=>{let r=new ld(e),i=new wd(e),a=r.range(2.2,4.2),o=[],s=[],c=r.int(3,5),l=Km(e,a*.45,.16,.1,.25,6);o.push(l);for(let l=0;l<c;l++){let c=r.range(0,Math.PI*2),u=r.range(.35,.9),d=a*r.range(.45,.7),f=Km(e+l*13,d,.09,.035,.12,5);f.rotateZ(-u),f.rotateY(c),f.translate(0,a*.4,0),o.push(f);let p=new U(Math.sin(u)*d,Math.cos(u)*d+a*.4,0).applyAxisAngle(new U(0,1,0),c),m=r.range(.7,1.2),h=new Fa(m,1),g=h.attributes.position;for(let e=0;e<g.count;e++){let t=new U(g.getX(e),g.getY(e),g.getZ(e)),n=1+(i.ridged(t.x*2.2+l,t.y*2.2+t.z*1.3,2)-.35)*.55+i.n2(t.x*5+l,t.z*5)*.12;t.multiplyScalar(n),t.y<0&&(t.y*=.55),g.setXYZ(e,t.x+p.x,t.y*.8+p.y,t.z+p.z)}let _=Wm(h),v=new Float32Array(_.attributes.position.count*3),y=_.attributes.position;for(let e=0;e<y.count;e++){let i=(y.getY(e)-p.y)/m,a=t.clone().lerp(n,Math.max(0,Math.min(1,.4+i*.5+r.range(-.2,.2)))).multiplyScalar(.75+.3*Math.max(0,i+.5));v[e*3]=a.r,v[e*3+1]=a.g,v[e*3+2]=a.b}_.setAttribute(`color`,new G(v,3)),_.computeVertexNormals(),s.push(_)}let u=Cm(o.map(e=>e.index?e.toNonIndexed():e));u.computeVertexNormals();let d=Cm(s),f=new Fa(a*.42,0);f.scale(1.1,.75,1.1),f.translate(0,a*.7,0);let p=Wm(f),m=new Float32Array(p.attributes.position.count*3);for(let e=0;e<m.length;e+=3)m[e]=t.r*.85,m[e+1]=t.g*.85,m[e+2]=t.b*.85;return p.setAttribute(`color`,new G(m,3)),p.computeVertexNormals(),{crown:d,trunk:u,far:p}},Ym=(e,t,n,r=.45,i=9)=>{let a=new ld(e),o=new Gm;for(let e=0;e<i;e++){let e=a.range(0,Math.PI*2),i=a.range(.15,.6),s=r*a.range(.6,1.2),c=a.range(.018,.032),l=Math.cos(e),u=Math.sin(e),d=-u,f=l,p=(e,t)=>{let n=Math.sin(e*i*1.6)*s*.6;return new U(l*n+d*t*c*(1-e),e*s*Math.cos(i*e),u*n+f*t*c*(1-e))},m=t.clone().multiplyScalar(a.range(.8,1.1)),h=n.clone().multiplyScalar(a.range(.85,1.15)),g=m.clone().lerp(h,.5);o.tri(p(0,-1),p(0,1),p(.5,-1),m,m,g),o.tri(p(0,1),p(.5,1),p(.5,-1),m,g,g),o.tri(p(.5,-1),p(.5,1),p(1,0),g,g,h)}return o.geometry()},Xm=(e,t=2,n=0)=>{let r=new ld(e),i=new wd(e),a=new Fa(1,t),o=a.attributes.position,s=r.range(.9,1.6),c=r.range(.45,.9),l=r.range(.8,1.35),u=[];for(let e=0;e<r.int(3,6);e++){let e=new U(r.range(-1,1),r.range(-.6,1),r.range(-1,1)).normalize();u.push({n:e,d:r.range(.55,.85)})}for(let e=0;e<o.count;e++){let t=new U(o.getX(e),o.getY(e),o.getZ(e)),r=1+i.fbm(t.x*1.4+3,t.y*1.4+t.z*.8,3)*.32+(i.ridged(t.x*2.6,t.z*2.6+t.y,2)-.3)*.12;t.multiplyScalar(r);for(let e of u){let n=t.dot(e.n);n>e.d&&t.addScaledVector(e.n,-(n-e.d)*.92)}if(n>0){let e=.22,n=t.y/e;t.y=(Math.floor(n)+(n-Math.floor(n))**3)*e*.9+t.y*.1}t.set(t.x*s,t.y*c,t.z*l),t.y<-.25*c&&(t.y=-.25*c+(t.y+.25*c)*.3),o.setXYZ(e,t.x,t.y,t.z)}let d=a.toNonIndexed();return d.deleteAttribute(`uv`),d.computeVertexNormals(),a.dispose(),d},Zm=(e,t,n)=>{let r=new ld(e),i=new wd(e),a=[],o=r.int(5,8);for(let e=0;e<o;e++){let o=r.range(.22,.42),s=new Fa(o,1),c=s.attributes.position,l=r.range(0,Math.PI*2),u=r.range(0,.38),d=Math.cos(l)*u,f=Math.sin(l)*u,p=o*.8+r.range(0,.18);for(let t=0;t<c.count;t++){let n=new U(c.getX(t),c.getY(t),c.getZ(t));n.multiplyScalar(1+(i.ridged(n.x*7+e,n.y*7+n.z*3,2)-.4)*.5),c.setXYZ(t,n.x+d,n.y*.8+p,n.z+f)}let m=Wm(s),h=new Float32Array(m.attributes.position.count*3),g=m.attributes.position;for(let e=0;e<g.count;e++){let i=Math.max(0,Math.min(1,g.getY(e)/.9)),a=t.clone().lerp(n,i*r.range(.6,1)).multiplyScalar(.7+.35*i);h[e*3]=a.r,h[e*3+1]=a.g,h[e*3+2]=a.b}m.setAttribute(`color`,new G(h,3)),a.push(m)}let s=Cm(a);return s.computeVertexNormals(),s},Qm={mesa:{trail:`mesa_trail`,ground:`mesa_ground`,rock:`mesa_rock`,alt:`mesa_slab`,extra:[`bark`]},pines:{trail:`pines_trail`,ground:`pines_ground`,rock:`pines_rock`,alt:`pines_meadow`,extra:[`bark_pine`]},town:{trail:`town_trail`,ground:`town_ground`,rock:`town_rock`,alt:null,extra:[`town_wall`,`town_roof`,`bark`]},glacier:{trail:`glacier_trail`,ground:`glacier_ground`,rock:`glacier_rock`,alt:null,extra:[`bark_pine`]},ember:{trail:`ember_trail`,ground:`ember_ground`,rock:`ember_rock`,alt:null,extra:[`bark`]}},$m=[`planks`],eh=new Map,th=new Eo,nh=null,rh=()=>{if(nh)return nh;let e=(e,t,n)=>{let r=new Mi(new Uint8Array([e,t,n,255]),1,1,Fe);return r.needsUpdate=!0,r};return nh={c:e(150,150,150),n:e(128,128,128)},nh},ih=(e,t,n)=>new Promise((r,i)=>th.load(e,e=>{e.wrapS=e.wrapT=me,e.colorSpace=t?Nt:``,e.minFilter=xe,e.anisotropy=n,e.generateMipmaps=!0,e.needsUpdate=!0,r(e)},void 0,i)),ah=async(e,t)=>{let n=eh.get(e);if(n)return n;try{let[n,r]=await Promise.all([ih(`./tex/${e}.webp`,!0,t),ih(`./tex/${e}_n.webp`,!1,t)]),i={c:n,n:r};return eh.set(e,i),i}catch{return rh()}},oh=async(e,t)=>{let n=Qm[e],r=[n.trail,n.ground,n.rock,...n.alt?[n.alt]:[],...n.extra,...$m],i=new Set(r);for(let[e,t]of eh)i.has(e)||(t.c.dispose(),t.n.dispose(),eh.delete(e));let a=Math.min(8,t.capabilities.getMaxAnisotropy()),o={};return await Promise.all(r.map(async e=>o[e]=await ah(e,a))),o},sh=e=>e&&eh.get(e)||rh(),ch=Nd(),lh=new ir,uh=new U(0,1,0),dh={s:0,d:0},fh=130,ph=(e,t,n,r)=>{for(let i of e.featuresNear(t)){if(i.kind===`rollers`||i.kind===`fin`||i.kind===`corner`||t<i.s0-3||t>i.s1+3)continue;let a=e.profile(t);if(Math.abs(n)<a.half+r+1.5||i.kind===`start`&&Math.abs(n)<9)return!1}return!0},mh=class{track;look;density;world;group=new ir;rng;nz;species=[];chunks=[];obstacles=[];foliage;foliage2;rockMat;far=new Map;constructor(e,t,n,r=1,i=`mesa`){this.track=e,this.look=t,this.density=r,this.world=i,this.rng=new ld(n^48879),this.nz=new wd(n^24301),this.foliage=Lp({kind:`foliage`,vertexColors:!0,color:`#ffffff`,side:2,sway:.004}),this.foliage2=Lp({kind:`foliage`,vertexColors:!0,color:`#ffffff`,sway:.004}),this.rockMat=Lp({kind:`rock`,color:`#ffffff`,flat:!0})}build(){switch(this.world){case`mesa`:this.buildDesert();break;case`pines`:this.buildForest();break;case`town`:this.buildTown();break;case`glacier`:this.buildSnow();break;default:this.buildVolcanic()}this.buildStakes(),this.buildTape(),this.finish()}buildTape(){let e=this.track,t=[],n=[],r=[],i=new W(`#ff5b14`),a=new W(`#f4eee3`);for(let o of e.features){if(o.kind!==`corner`)continue;e.frame((o.s0+o.s1)/2,ch);let s=ch.k>0?-1:1,c=null,l=0;for(let u=o.s0-6;u<=o.s1+6;u+=3.2){let o=s*(e.profile(u).half+.7);if(!ph(e,u,o,-.4)){c=null;continue}e.toWorld(u,o,hh);let d=e.ground(u,o);r.push({x:hh.x,y:d-.05,z:hh.z,rot:0,scale:1});let f=new U(hh.x,d+.82,hh.z);if(c){let e=l++%2?i:a,r=c.clone().lerp(f,.5).add(new U(0,-.06,0));for(let[i,a]of[[c,r],[r,f]]){t.push(i.x,i.y,i.z,a.x,a.y,a.z,a.x,a.y-.05,a.z,i.x,i.y,i.z,a.x,a.y-.05,a.z,i.x,i.y-.05,i.z);for(let t=0;t<6;t++)n.push(e.r,e.g,e.b)}}c=f}}if(!r.length)return;let o=new ia(.04,.9,.04);o.translate(0,.45,0),this.kind([{parts:[{geo:o,mat:Lp({kind:`wood`,color:this.look.wood}),shadow:!1}],max:130}]).list.push(...r);let s=new oi;s.setAttribute(`position`,new G(new Float32Array(t),3)),s.setAttribute(`color`,new G(new Float32Array(n),3)),s.computeVertexNormals();let c=new K(s,Lp({kind:`cloth`,color:`#ffffff`,vertexColors:!0,side:2}));c.matrixAutoUpdate=!1,this.group.add(c)}spot(e,t){let n=this.track,r=n.land;if(!r)return null;let i=r.distance(e,t),a=NaN,o=0,s=99,c;if(i<60){let i=r.nearestS(e,t,70);if(!Number.isNaN(i)){n.toTrack(e,t,Math.max(0,Math.min(n.length,i)),dh),a=dh.s,o=dh.d;let r=n.profile(Math.max(0,Math.min(n.length,a))).half;if(s=Math.abs(o)-r,a>-2&&a<n.length+2&&s<.6||a>-20&&a<n.length+2&&!ph(n,a,o,.6)||a>n.finishS-30&&a<n.finishS+48&&s<9.5)return null}}c=!Number.isNaN(a)&&a>0&&a<n.length&&s<n.reach(a,o)?n.ground(a,o):r.height(e,t);let l=1.2,u=(r.height(e+l,t)-r.height(e-l,t))/(2*l),d=(r.height(e,t+l)-r.height(e,t-l))/(2*l),f=new U(-u,1,-d).normalize();return{x:e,y:c,z:t,s:a,d:o,e:s,dist:i,slope:Math.hypot(u,d),nrm:f}}scatter(e,t,n,r,i=1){let a=this.track.land;if(!a)return;let o=a.near,s=this.rng,c=e/Math.sqrt(this.density);for(let e=o.z0;e<o.z0+o.nz*o.cell;e+=c)for(let l=o.x0;l<o.x0+o.nx*o.cell;l+=c){let o=l+s.range(0,c),u=e+s.range(0,c);if(a.distance(o,u)>t)continue;let d=s.next();if(d>=i)continue;let f=this.spot(o,u);f&&d<n(f)&&r(f)}}edge(e,t,n,r,i){let a=this.track,o=this.rng;for(let s=6;s<a.length-2;s+=e/this.density)for(let e of[-1,1]){let c=a.profile(s).half,l=o.range(t,n);if(l>a.reach(s,e)+6)continue;let u=e*(c+l);a.toWorld(s,u,hh);let d=this.spot(hh.x,hh.z);d&&o.next()<r(d)&&i(d)}}grove(e,t,n=1){let r=this.nz;return X(-.25,.35,r.fbm(e*.012*n,t*.012*n,3)+r.n2(e*.05,t*.05)*.25)}kind(e,t=!1){let n={levels:e,list:[],colors:t?[]:void 0};return this.species.push(n),n}finish(){let e=new sn,t=new jn,n=(n,r,i)=>{i.forEach((i,a)=>{let o=r.list[i];lh.position.set(o.x,o.y,o.z),lh.rotation.set(0,o.rot,0),lh.scale.set(o.scale,o.scale*(o.sy??1),o.scale),lh.updateMatrix(),o.tilt&&(e.setFromUnitVectors(uh,o.tilt),t.makeRotationFromQuaternion(e),lh.matrix.premultiply(t),lh.matrix.setPosition(o.x,o.y,o.z)),n.setMatrixAt(a,lh.matrix),r.colors&&n.setColorAt(a,r.colors[i])}),n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0),n.computeBoundingSphere()},r=new Map;for(let e of this.species)if(e.list.length){if(e.levels.length>1&&e.levels.length-1,e.levels.length>1){let t=e.levels[e.levels.length-1],r=e.list.map((e,t)=>t);for(let i of t.parts){let t=new Vi(i.geo,i.mat,r.length);n(t,e,r),t.castShadow=!1,t.receiveShadow=!0,t.frustumCulled=!0,this.group.add(t)}}e.list.forEach((t,n)=>{let i=`${Math.floor(t.x/fh)},${Math.floor(t.z/fh)}`,a=r.get(i);a||r.set(i,a=[]);let o=a.find(t=>t.sp===e);o||a.push(o={sp:e,idx:[]}),o.idx.push(n)})}for(let[e,t]of r){let[r,i]=e.split(`,`).map(Number),a=0,o=0,s=[];for(let{sp:e,idx:r}of t){let t=e.levels.length>1?e.levels.length-1:1;for(let i=0;i<t;i++){let t=e.levels[i];for(;s.length<=i;)s.push({max:0,meshes:[]});s[i].max=Math.max(s[i].max,t.max);for(let a of t.parts){let t=new Vi(a.geo,a.mat,r.length);n(t,e,r),t.castShadow=a.shadow,t.receiveShadow=!0,t.visible=!1,s[i].meshes.push(t),this.group.add(t)}}for(let t of r)a+=e.list[t].y,o++}for(let e=1;e<s.length;e++)s[e].max=Math.max(s[e].max,s[e-1].max);this.chunks.push({cx:(r+.5)*fh,cz:(i+.5)*fh,cy:o?a/o:0,levels:s,shown:-2})}}update(e){for(let t of this.chunks){let n=Math.max(0,Math.hypot(t.cx-e.x,t.cz-e.z,(t.cy-e.y)*.5)-fh*.62),r=-1;for(let e=0;e<t.levels.length;e++)if(n<=t.levels[e].max){r=e;break}r!==t.shown&&(t.shown=r,t.levels.forEach((e,t)=>e.meshes.forEach(e=>e.visible=t===r)))}}farMat(e,t){let n=`${e}-${t}`,r=this.far.get(n);return r||(r=Lp(e===`rock`?{kind:`rock`,color:`#ffffff`,flat:!0,cull:t}:{kind:`foliage`,vertexColors:!0,color:`#ffffff`,cull:t}),this.far.set(n,r)),r}bark(e){let t=Lp({kind:`plain`,color:`#ffffff`});return t.map=sh(e).c,t}conifers(e,t){let n=[],r=this.bark(t.bark);for(let i=0;i<e;i++){let a=t.h[0]+(t.h[1]-t.h[0])*(i+.5)/e,o=qm(7e3+i*31+Math.round(a*10),{h:a,leaf:new W(t.leaf),leaf2:new W(t.leaf2),snow:t.snow,width:t.width,base:t.base}),s=new aa(.05,a*(t.width??.22)*.85,a*.86,6,1);s.translate(0,a*.57,0);let c=s.toNonIndexed();c.deleteAttribute(`uv`);let l=new Float32Array(c.attributes.position.count*3),u=new W(t.leaf).multiplyScalar(.8);for(let e=0;e<l.length;e+=3)l[e]=u.r,l[e+1]=u.g,l[e+2]=u.b;c.setAttribute(`color`,new G(l,3)),c.computeVertexNormals();let d=new aa(.03,Math.max(.08,a*.022),a*.95,5,1,!0);d.translate(0,a*.475,0),n.push(this.kind([{parts:[{geo:o.crown,mat:this.foliage,shadow:!0},{geo:o.trunk,mat:r,shadow:!0}],max:50},{parts:[{geo:o.low,mat:this.foliage2,shadow:!1},{geo:d,mat:r,shadow:!1}],max:130},{parts:[{geo:c,mat:this.farMat(`foliage`,150),shadow:!1}],max:1e9}]))}return n}rocks(e,t=0){let n=[];for(let r=0;r<e;r++){let e=Xm(1e3+r*77,2,t),i=Xm(1e3+r*77,0,t);n.push(this.kind([{parts:[{geo:e,mat:this.rockMat,shadow:!0}],max:60},{parts:[{geo:i,mat:this.farMat(`rock`,75),shadow:!1}],max:1e9}]))}return n}stones(e,t=0){let n=[];for(let r=0;r<e;r++)n.push(this.kind([{parts:[{geo:Xm(2e3+r*31,1,t),mat:this.rockMat,shadow:!0}],max:60}]));return n}grasses(e,t,n,r){let i=Lp({kind:`foliage`,vertexColors:!0,color:`#ffffff`,side:2,sway:.9}),a=[];for(let o=0;o<e;o++)a.push(this.kind([{parts:[{geo:Ym(300+o*17,new W(t),new W(n),r),mat:i,shadow:!1}],max:45}],!0));return a}place(e,t,n,r={}){e.list.push({x:t.x,y:t.y-(r.sink??0)*n,z:t.z,rot:this.rng.range(0,6.28),scale:n,sy:r.sy,tilt:r.tilt?t.nrm.clone().lerp(uh,.4).normalize():void 0}),e.colors&&e.colors.push(r.color??new W(1,1,1))}solid(e,t){Number.isNaN(e.s)||e.e>3.5||this.obstacles.push({x:e.x,z:e.z,r:t,s:e.s})}buildDesert(){let e=this.rng,t=this.look,n=this.rocks(3,1),r=this.stones(3,1),i=[0,1,2].map(e=>{let t=Jm(41+e*9,new W(`#55634a`),new W(`#93a07a`)),n=this.bark(`bark`);return this.kind([{parts:[{geo:t.crown,mat:this.foliage2,shadow:!0},{geo:t.trunk,mat:n,shadow:!0}],max:90},{parts:[{geo:t.far,mat:this.farMat(`foliage`,110),shadow:!1}],max:1e9}])}),a=[0,1].map(e=>this.kind([{parts:[{geo:Zm(5+e*4,new W(t.vegDark),new W(`#a7ae8a`)),mat:this.foliage2,shadow:!0}],max:160}])),o=this.grasses(2,`#8c7a52`,`#d8c48c`,.42);this.scatter(9,260,e=>e.slope<1.4?.22+.25*X(.3,1,e.slope):.05,t=>{let i=e.chance(.3);this.place(e.pick(i?n:r),t,i?e.range(1.4,4.5):e.range(.4,1.1),{sink:i?.35:.2,tilt:!0})},.47),this.edge(2.2,.3,4.5,e=>e.slope<1?.55:.1,t=>{let n=e.range(.18,.75)*(e.chance(.1)?1.8:1);this.place(e.pick(r),t,n,{sink:.18,tilt:!0}),n>.9&&this.solid(t,n*.9)}),this.scatter(11,240,e=>e.slope<.55?.28*this.grove(e.x,e.z,.7):0,t=>{this.place(e.pick(i),t,e.range(.7,1.4),{sink:.1}),this.solid(t,.35)},.28),this.scatter(3.2,120,e=>e.slope<.6?.3:.04,t=>this.place(e.pick(a),t,e.range(.5,1.2),{sink:.05}),.3),this.edge(1.1,.4,7,e=>e.slope<.8?.45:.1,t=>this.place(e.pick(o),t,e.range(.7,1.3),{color:new W(1,1,1).multiplyScalar(e.range(.85,1.1))}))}buildForest(){let e=this.track,t=this.rng,n=e.baseY(0),r=e.baseY(e.length),i=r+(n-r)*.84,a=this.conifers(3,{h:[14,24],leaf:`#2c4a2a`,leaf2:`#5f7d45`,bark:`bark_pine`,width:.2,base:.3}),o=this.conifers(2,{h:[3.5,7],leaf:`#355a30`,leaf2:`#6f9150`,bark:`bark_pine`,width:.26,base:.08}),s=this.rocks(3),c=this.stones(2),l=this.grasses(2,`#3d5a26`,`#9db466`,.5),u=Lp({kind:`foliage`,vertexColors:!1,color:`#ffffff`,side:2,sway:.15}),d=this.kind([{parts:[{geo:gh(),mat:u,shadow:!1}],max:70}],!0),f=e=>X(i+8,i-6,e.y+this.nz.n2(e.x*.02,e.z*.02)*10);this.scatter(6.5,300,e=>e.slope<1?.62*f(e)*(.35+.65*this.grove(e.x,e.z)):0,e=>{let n=!Number.isNaN(e.s)&&e.e<6;this.place(t.pick(n&&t.chance(.5)?o:a),e,t.range(.8,1.2),{sink:.1}),this.solid(e,.45)},.62),this.edge(5,1,3.2,e=>e.slope<.9?.5*f(e):0,e=>{this.place(t.pick(o),e,t.range(.8,1.3),{sink:.05}),this.solid(e,.3)}),this.scatter(14,260,e=>e.slope<.8?.2*(1-f(e)):0,e=>this.place(t.pick(o),e,t.range(.5,.9),{sink:.05}),.2),this.scatter(10,220,e=>e.slope<1.3?.18+.2*(1-f(e)):.04,e=>{let n=t.chance(.3);this.place(t.pick(n?s:c),e,n?t.range(1.5,3.6):t.range(.4,1.1),{sink:.3,tilt:!0})}),this.edge(2.4,.3,4,()=>.35,e=>this.place(t.pick(c),e,t.range(.2,.6),{sink:.2,tilt:!0})),this.edge(.9,.4,8,e=>e.slope<.9?.5*f(e):0,e=>this.place(d,e,t.range(.7,1.4),{color:new W(this.look.veg).multiplyScalar(t.range(.7,1.15))})),this.edge(.8,.3,9,e=>e.slope<.8?.35+.4*(1-f(e)):0,e=>this.place(t.pick(l),e,t.range(.7,1.4),{color:new W(1,1,1).multiplyScalar(t.range(.8,1.15))}));let p=this.bark(`bark_pine`),m=Km(77,6,.32,.26,.1,7);m.rotateZ(Math.PI/2),m.translate(-3,.22,0);let h=this.kind([{parts:[{geo:m,mat:p,shadow:!0}],max:140}]);this.edge(16,2.5,9,e=>e.slope<.5?.6*f(e):0,e=>this.place(h,e,t.range(.7,1.1),{sink:.05}))}buildSnow(){let e=this.track,t=this.rng,n=e.baseY(0),r=e.baseY(e.length),i=r+(n-r)*.45,a=this.conifers(3,{h:[6,13],leaf:`#24382c`,leaf2:`#3f5a46`,snow:!0,bark:`bark_pine`,width:.24,base:.12}),o=this.rocks(3),s=this.stones(2),c=e=>X(i+6,i-6,e.y+this.nz.n2(e.x*.02,e.z*.02)*8);this.scatter(9,280,e=>e.slope<.8?.5*c(e)*this.grove(e.x,e.z,1.3):0,e=>{this.place(t.pick(a),e,t.range(.7,1.25),{sink:.2}),this.solid(e,.35)}),this.scatter(9,260,e=>e.slope>.5?.3:.08,e=>{let n=t.chance(.25);this.place(t.pick(o),e,n?t.range(1.8,4.5):t.range(.5,1.4),{sink:.35,tilt:!0})}),this.edge(2.6,.4,5,()=>.3,e=>this.place(t.pick(s),e,t.range(.25,.8),{sink:.25,tilt:!0}));let l=new Fa(1,0);l.scale(.35,1.6,.3),l.translate(0,1.1,0);let u=l.toNonIndexed();u.computeVertexNormals();let d=this.kind([{parts:[{geo:u,mat:Rp({color:`#9fd8ff`,metalness:.1,roughness:.12,flat:!0,envIntensity:1.6}),shadow:!0}],max:200}]);this.edge(7,2,16,()=>.3,e=>{d.list.push({x:e.x,y:e.y-.3,z:e.z,rot:t.range(0,6.28),scale:t.range(.5,1.6),tilt:new U(t.range(-.4,.4),1,t.range(-.4,.4)).normalize()})})}buildVolcanic(){let e=this.rng,t=this.rocks(3),n=this.stones(2);this.scatter(8,260,e=>e.slope<1.4?.3:.05,n=>{let r=e.chance(.2);this.place(e.pick(t),n,r?e.range(1.6,4.2):e.range(.4,1.3),{sink:.3,tilt:!0})}),this.edge(2.2,.3,4.5,()=>.45,t=>this.place(e.pick(n),t,e.range(.2,.7),{sink:.2,tilt:!0}));let r=new Fa(1,0);r.scale(.55,3.2,.5),r.translate(0,2.2,0);let i=r.toNonIndexed();i.computeVertexNormals();let a=this.kind([{parts:[{geo:i,mat:Rp({color:`#121014`,metalness:.2,roughness:.18,flat:!0,envIntensity:1.4}),shadow:!0}],max:400}]);this.scatter(16,200,e=>e.slope<.9?.28:0,t=>{a.list.push({x:t.x,y:t.y-.6,z:t.z,rot:e.range(0,6.28),scale:e.range(.8,2.4),tilt:new U(e.range(-.2,.2),1,e.range(-.2,.2)).normalize()}),this.solid(t,.5)});let o=[0,1,2].map(e=>{let t=[],n=3+e;t.push(Km(600+e,n,.15,.04,.3,6));let r=new ld(600+e);for(let i=0;i<4;i++){let a=Km(610+e*5+i,n*.4,.06,.015,.15,5);a.rotateZ(r.range(.5,1.1)*(i%2?1:-1)),a.rotateY(r.range(0,6.28)),a.translate(0,n*r.range(.35,.7),0),t.push(a)}let i=Cm(t.map(e=>e.index?e.toNonIndexed():e));return this.kind([{parts:[{geo:i,mat:this.bark(`bark`),shadow:!0}],max:220}])});this.scatter(14,220,e=>e.slope<.6?.25:0,t=>{this.place(e.pick(o),t,e.range(.8,1.3),{sink:.1}),this.solid(t,.2)});let s=this.grasses(2,`#4a4030`,`#8f8160`,.32);this.edge(1.6,.4,6,e=>e.slope<.7?.25:0,t=>this.place(e.pick(s),t,e.range(.6,1.1),{color:new W(1,1,1).multiplyScalar(e.range(.8,1.1))}))}buildTown(){let e=this.track,t=this.rng,n=new ia(1,2.2,1);n.translate(0,-.1,0);let r=n.toNonIndexed();r.computeVertexNormals();let i=new oi,a=.56,o=[-.56,0,-.56,a,0,-.56,a,1,0,-.56,0,-.56,a,1,0,-.56,1,0,-.56,0,a,-.56,1,0,a,1,0,-.56,0,a,a,1,0,a,0,a,-.56,0,-.56,-.56,1,0,-.56,0,a,a,0,-.56,a,0,a,a,1,0];i.setAttribute(`position`,new G(new Float32Array(o),3)),i.computeVertexNormals();let s=new ia(1.04,1,1.04);s.translate(0,.5,0);let c=s.toNonIndexed();c.computeVertexNormals();let l=[],u=[],d=[],f=[],p=[`#f6f1e7`,`#f3ead8`,`#efe2c9`,`#f6e3d3`,`#e7eef3`,`#f2e6b8`,`#f0d8cf`];for(let n of[-1,1]){let r=8;for(;r<e.length-10;){let i=t.range(5,9),a=r+i/2,o=e.profile(a),s=t.range(6,9),c=e.reach(a,n),m=n*(o.half+1.4+s/2);if(c>6&&ph(e,a,n*(o.half+1.4),.2)&&ph(e,r,n*(o.half+1.4),.2)&&ph(e,r+i,n*(o.half+1.4),.2)&&t.chance(.86)){e.toWorld(a,m,hh);let r=Math.min(e.ground(a,n*(o.half+1.4)),e.ground(a,m));e.frame(a,ch);let c=t.range(4.5,9.5),h={x:hh.x,y:r,z:hh.z,rot:-ch.h,scale:1,w:i*.96,h:c,dd:s};l.push(h),u.push(new W(t.pick(p))),t.chance(.62)?d.push({...h,y:r+c,h:s*.24}):f.push({...h,y:r+c,h:.22})}r+=i+t.range(.4,2.2)}}let m=new jn,h=new sn,g=new U,_=new U,v=(e,t,n,r)=>{if(!n.length)return;let i=new Vi(e,t,n.length);n.forEach((e,t)=>{h.setFromAxisAngle(uh,e.rot),g.set(e.w,e.h,e.dd),_.set(e.x,e.y,e.z),m.compose(_,h,g),i.setMatrixAt(t,m),r&&i.setColorAt(t,r[t])}),i.instanceMatrix.needsUpdate=!0,i.castShadow=!0,i.receiveShadow=!0,i.computeBoundingSphere(),this.group.add(i)};v(r,Lp({kind:`house`,color:`#ffffff`,flat:!0}),l,u),v(i,Lp({kind:`roof`,color:`#ffffff`,flat:!0}),d),v(c,Lp({kind:`plain`,color:`#e9e2d4`,flat:!0}),f);let y=[0,1].map(e=>{let t=Jm(90+e*7,new W(`#5a6b45`),new W(`#a3ad86`));return this.kind([{parts:[{geo:t.crown,mat:this.foliage2,shadow:!0},{geo:t.trunk,mat:this.bark(`bark`),shadow:!0}],max:260}])}),b=[0,1].map(e=>{let t=qm(500+e,{h:8+e*2,leaf:new W(`#24361c`),leaf2:new W(`#3d5a2a`),width:.09,base:.05});return this.kind([{parts:[{geo:t.crown,mat:this.foliage,shadow:!0}],max:70},{parts:[{geo:t.low,mat:this.farMat(`foliage`,90),shadow:!1}],max:1e9}])}),x=this.kind([{parts:[{geo:_h(),mat:this.foliage,shadow:!0}],max:300}]);this.scatter(10,240,e=>e.slope<.7&&(Number.isNaN(e.s)||e.e>12)?.35:0,e=>{let n=t.next();n<.45?this.place(t.pick(y),e,t.range(.8,1.3),{sink:.1}):n<.8?this.place(t.pick(b),e,t.range(.8,1.2),{sink:.1}):this.place(x,e,t.range(.8,1.2),{sink:.1})});let S=this.rocks(3);this.scatter(12,240,e=>e.slope>.6?.3:.05,e=>this.place(t.pick(S),e,t.range(.8,2.6),{sink:.3,tilt:!0}));let C=this.grasses(2,`#7d7448`,`#c9b97a`,.4);this.scatter(3,90,e=>e.slope<.7&&(Number.isNaN(e.s)||e.e>11)?.3:0,e=>this.place(t.pick(C),e,t.range(.7,1.2),{color:new W(1,1,1).multiplyScalar(t.range(.8,1.1))}),.3);let w=new oi;w.setAttribute(`position`,new G(new Float32Array([-.16,0,0,.16,0,0,0,-.42,0]),3)),w.computeVertexNormals();let T=this.kind([{parts:[{geo:w,mat:Lp({kind:`cloth`,color:`#ffffff`,side:2,sway:.6}),shadow:!1}],max:300}],!0),E=[`#ff5b14`,`#ffc23d`,`#2f6bff`,`#f4eee3`,`#e2453c`,`#3cb371`];for(let n=30;n<e.finishS-10;n+=t.range(18,28)){if(!ph(e,n,0,-3))continue;let t=e.profile(n).half+1.4,r=e.ground(n,-t)+5.6,i=e.ground(n,t)+5.6;e.frame(n,ch);for(let e=1;e<16;e++){let n=e/16,a=-t+n*t*2,o=Math.sin(n*Math.PI)*.9;T.list.push({x:ch.x-Math.sin(ch.h)*a,y:r+(i-r)*n-o,z:ch.z+Math.cos(ch.h)*a,rot:-ch.h+Math.PI/2,scale:1}),T.colors.push(new W(E[e%E.length]))}}}buildStakes(){let e=this.track,t=this.rng,n=new ia(.05,1.1,.05);n.translate(0,.55,0);let r=new oi;r.setAttribute(`position`,new G(new Float32Array([0,1.08,0,.42,.98,0,0,.84,0,0,1.08,0,0,.84,0,.42,.98,0]),3)),r.computeVertexNormals();let i=this.kind([{parts:[{geo:n,mat:Lp({kind:`wood`,color:this.look.wood}),shadow:!0}],max:160}]),a=this.kind([{parts:[{geo:r,mat:Lp({kind:`cloth`,color:`#ffffff`,side:2,sway:.25}),shadow:!1}],max:160}],!0),o=[`#ff5b14`,`#f4eee3`,`#2f6bff`],s=1;for(let n=20;n<e.finishS-5;n+=t.range(9,15)){s=-s;let r=e.profile(n),c=s*(r.half+.7);if(!ph(e,n,c,-.3))continue;e.toWorld(n,c,hh);let l=e.ground(n,c);e.frame(n,ch);let u=-ch.h+(s>0?Math.PI:0);i.list.push({x:hh.x,y:l-.1,z:hh.z,rot:u,scale:1}),a.list.push({x:hh.x,y:l-.1,z:hh.z,rot:u+t.range(-.4,.4),scale:1}),a.colors.push(new W(o[(Math.floor(n/13)%3+3)%3]))}}},hh={x:0,z:0},gh=()=>{let e=[];for(let t=0;t<7;t++){let n=t/7*Math.PI*2,r=new oi,i=.75;r.setAttribute(`position`,new G(new Float32Array([0,.05,0,Math.cos(n)*i,.42,Math.sin(n)*i,Math.cos(n+.22)*i*.6,.32,Math.sin(n+.22)*i*.6]),3)),r.computeVertexNormals(),e.push(r)}return Cm(e)},_h=()=>{let e=[],t=new aa(.12,.2,6,6,4),n=t.attributes.position;for(let e=0;e<n.count;e++)n.setX(e,n.getX(e)+((n.getY(e)+3)/6)**2*.6);t.translate(0,3,0);let r=t.toNonIndexed();r.deleteAttribute(`uv`);let i=(e,t)=>{let n=e.attributes.position.count,r=new Float32Array(n*3);for(let e=0;e<n;e++)r[e*3]=t.r,r[e*3+1]=t.g,r[e*3+2]=t.b;return e.setAttribute(`color`,new G(r,3)),e};e.push(i(r,new W(`#8a6a4a`)));for(let t=0;t<9;t++){let n=t/9*Math.PI*2,r=new oi,a=2.6;r.setAttribute(`position`,new G(new Float32Array([.6,6,0,.6+Math.cos(n)*a,5.3,Math.sin(n)*a,.6+Math.cos(n+.25)*a*.5,5.9,Math.sin(n+.25)*a*.5]),3)),r.computeVertexNormals(),e.push(i(r,new W(`#4f7a2c`)))}let a=Cm(e);return a.computeVertexNormals(),a},vh={x:0,z:0},yh=(e,t,n)=>{let r=new ir,i=e.roughList.filter(e=>e.kind===1),a=e.roughList.filter(e=>e.kind===2);if(i.length){let n=Lp({kind:`plain`,color:`#7a5c44`});n.map=sh(t).c;let a=[],o=new ld(77);for(let t of i){let n=e.profile(t.s).half,r=Math.max(t.d0,-n-.5),i=Math.min(t.d1,n+.5);if(i-r<.4)continue;let s=t.h*.85,c=[],l=Math.max(3,Math.ceil((i-r)/.35));for(let n=0;n<=l;n++){let a=r+(i-r)*n/l,u=t.s+t.tan*(a-t.d)+Math.sin(n*1.7+t.s)*.06;e.toWorld(u,a,vh);let d=Math.min(n,l-n)/l;c.push(new U(vh.x,e.ground(u,a)+s*(d<.12?-.9:-.25)+o.range(-.01,.01),vh.z))}let u=new za(new _a(c),l*2,s,5,!1);a.push(u)}if(a.length){let e=new K(Cm(a.map(e=>e.toNonIndexed())),n);e.castShadow=!0,e.receiveShadow=!0,e.matrixAutoUpdate=!1,r.add(e)}}if(a.length){let t=Lp({kind:`rock`,color:n,flat:!0}),i=[Xm(301,1),Xm(317,1),Xm(331,1)],o=new ir;i.forEach((n,s)=>{let c=a.filter((e,t)=>t%i.length===s);if(!c.length)return;let l=new Vi(n,t,c.length);c.forEach((t,n)=>{e.toWorld(t.s,t.d,vh),o.position.set(vh.x,e.ground(t.s,t.d)-t.h*.15,vh.z),o.rotation.set(0,(t.s*7.31+t.d*3.1)%6.28,0),o.scale.set(t.r,Math.max(.05,t.h*1.35),t.r),o.updateMatrix(),l.setMatrixAt(n,o.matrix)}),l.instanceMatrix.needsUpdate=!0,l.castShadow=!0,l.receiveShadow=!0,l.computeBoundingSphere(),r.add(l)})}return r},bh=Nd(),xh=new ir,Sh=()=>{let e=[0,0,.25,-1.1,.05,-.05,0,0,-.15,0,0,.25,0,0,-.15,1.1,.05,-.05,0,0,.35,-.08,0,-.3,.08,0,-.3,-.08,0,-.3,0,0,-.55,.08,0,-.3],t=new oi;return t.setAttribute(`position`,new G(new Float32Array(e),3)),t.computeVertexNormals(),t},Ch=class{mesh;birds=[];constructor(e,t,n=5){let r=new ld(t^2845),i=Lp({kind:`plain`,color:`#2a2622`,side:2}),a=i.onBeforeCompile;i.onBeforeCompile=(e,t)=>{a(e,t),e.uniforms.uTime=$.uTime,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
{
  float ph = instanceMatrix[3].x * 0.13 + instanceMatrix[3].z * 0.07;
  // mostly gliding, a few slow wingbeats now and then
  float beat = sin(uTime * 5.0 + ph) * smoothstep(0.55, 0.95, sin(uTime * 0.35 + ph * 3.0));
  transformed.y += abs(position.x) * (beat * 0.45 + 0.08);
}`)},i.customProgramCacheKey=()=>`hl-bird`,this.mesh=new Vi(Sh(),i,n),this.mesh.frustumCulled=!1;for(let t=0;t<n;t++){let t=r.range(.15,.85)*e.length;e.frame(t,bh);let n=r.sign()*r.range(40,160),i=new U(bh.x-Math.sin(bh.h)*n,e.baseY(t)+r.range(25,70),bh.z+Math.cos(bh.h)*n);this.birds.push({c:i,r:r.range(18,45),w:r.range(.12,.22)*r.sign(),ph:r.range(0,6.28),y:i.y})}this.update(0)}update(e){this.birds.forEach((t,n)=>{let r=t.ph+e*t.w;xh.position.set(t.c.x+Math.cos(r)*t.r,t.y+Math.sin(e*.3+t.ph)*2,t.c.z+Math.sin(r)*t.r),xh.rotation.set(0,-r-(t.w>0?0:Math.PI),t.w>0?.35:-.35),xh.scale.setScalar(1.1),xh.updateMatrix(),this.mesh.setMatrixAt(n,xh.matrix)}),this.mesh.instanceMatrix.needsUpdate=!0}},wh=class{mesh;mat;constructor(){this.mat=new Ja({side:1,depthWrite:!1,depthTest:!1,uniforms:{uZenith:{value:new W},uHorizon:{value:new W},uBelow:{value:new W},uGlow:{value:new W},uCloud:{value:new W},uCloudShade:{value:new W},uCover:{value:.3},uSunDir:$.uSunDir,uFogCol:$.uFogCol,uFogBright:$.uFogBright,uTime:$.uTime,uDetail:$.uDetail,uSunSize:{value:1}},vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,fragmentShader:`
        uniform vec3 uZenith;
        uniform vec3 uHorizon;
        uniform vec3 uBelow;
        uniform vec3 uGlow;
        uniform vec3 uCloud;
        uniform vec3 uCloudShade;
        uniform float uCover;
        uniform vec3 uSunDir;
        uniform vec3 uFogCol;
        uniform float uFogBright;
        uniform float uTime;
        uniform float uSunSize;
        uniform sampler2D uDetail;
        varying vec3 vDir;
        void main() {
          vec3 d = normalize(vDir);
          float h = d.y;
          float sd = max(dot(d, uSunDir), 0.0);
          // gradient: a quick fall from zenith blue to a bright, hazy horizon band
          float t = pow(clamp(h, 0.0, 1.0), 0.55);
          vec3 sky = mix(uHorizon, uZenith, t);
          // haze band at the horizon matches the ground haze
          vec3 haze = uFogCol * uFogBright / 1.6;
          sky = mix(sky, haze, exp(-max(h, 0.0) * 14.0) * 0.6);
          // sun glow (mie) and disc
          sky += uGlow * (pow(sd, 8.0) * 0.35 + pow(sd, 64.0) * 0.6);
          float disc = smoothstep(0.99955 - 0.00012 * uSunSize, 0.99975, sd);
          sky += uGlow * disc * 18.0;
          // below the horizon: ground-coloured haze
          sky = mix(sky, mix(haze, uBelow, 0.35), smoothstep(0.0, -0.08, h));
          // clouds on a flat layer above
          if (h > 0.01) {
            vec2 uv = d.xz / (h + 0.12) * 0.22;
            vec2 drift = vec2(uTime * 0.0035, uTime * 0.0012);
            float n = texture2D(uDetail, uv * 0.6 + drift).r * 0.62 + texture2D(uDetail, uv * 1.9 + drift * 1.7).r * 0.28 + texture2D(uDetail, uv * 5.1 + drift * 2.3).g * 0.1;
            float c = smoothstep(0.62 - uCover * 0.3, 0.74 - uCover * 0.3, n);
            c *= smoothstep(0.01, 0.12, h);
            float lit = 0.55 + 0.45 * pow(sd, 3.0);
            vec3 cc = mix(uCloudShade, uCloud, clamp(lit + (n - 0.5) * 0.8, 0.0, 1.0));
            cc += uGlow * pow(sd, 12.0) * 0.6 * (1.0 - c * 0.5);
            sky = mix(sky, cc * 1.25, c * 0.92);
          }
          gl_FragColor = vec4(sky * 1.1, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}),this.mesh=new K(new La(4e3,48,24),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10}setLook(e){let t=this.mat.uniforms;t.uZenith.value.set(e.zenith),t.uHorizon.value.set(e.horizon),t.uBelow.value.set(e.below),t.uGlow.value.set(e.sunGlow),t.uCloud.value.set(e.cloudColor),t.uCloudShade.value.set(e.cloudShade),t.uCover.value=e.cloudCover}follow(e){this.mesh.position.copy(e)}},Th=Nd(),Eh=new jn,Dh=new U,Oh=new U,kh=new U,Ah=new U,jh=class{boxes=[];add(e,t,n,r,i){this.boxes.push({p:e.clone(),x:t.clone(),y:n.clone(),z:r.clone(),c:i})}mesh(e,t=!0){if(!this.boxes.length)return null;let n=new Vi(new ia(1,1,1),e,this.boxes.length);return this.boxes.forEach((e,t)=>{Eh.makeBasis(e.x,e.y,e.z).setPosition(e.p),n.setMatrixAt(t,Eh),n.setColorAt(t,e.c)}),n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0),n.castShadow=t,n.receiveShadow=!0,n.computeBoundingSphere(),n}},Mh=(e,t,n)=>{e.frame(t,Th);let r=Math.cos(Th.h),i=Math.sin(Th.h);Dh.set(r,n,i).normalize(),Oh.set(-i,0,r),kh.crossVectors(Oh,Dh).normalize()},Nh=(e,t,n,r,i)=>(e.frame(t,Th),i.set(Th.x-Math.sin(Th.h)*n,r,Th.z+Math.cos(Th.h)*n)),Ph=class{track;look;group=new ir;planks=new jh;beams=new jh;rails=new jh;railing=null;rng;wood;woodDark;crowd=null;constructor(e,t,n){this.track=e,this.look=t,this.rng=new ld(n^12648430),this.wood=new W(t.wood),this.woodDark=new W(t.woodDark)}build(){let e=this.track;for(let t of e.features)t instanceof yd?this.tower(t):t instanceof bd?this.plankPath(e=>t.deck(e,t.dc),t.s0,t.s1,t.dc,t.half,{posts:!0,sides:!0}):t instanceof xd?this.plankPath(e=>t.deck(e,t.dc),t.s0,t.s1,t.dc,t.half,{posts:!0,sides:!1}):t instanceof Sd&&this.plankPath(e=>t.deck(e,t.dc),t.s0,t.s1,t.dc,t.half,{posts:!1,sides:!1,rope:!0});this.finish();let t=this.planks.mesh(Lp({kind:`wood`,color:`#ffffff`})),n=this.beams.mesh(Lp({kind:`wood`,color:`#ffffff`}));t&&this.group.add(t),n&&this.group.add(n),this.railing=this.rails.mesh(Lp({kind:`wood`,color:`#ffffff`})),this.railing&&this.group.add(this.railing)}woodTone(e=!1){return(e?this.woodDark:this.wood).clone().multiplyScalar(this.rng.range(.82,1.12))}plankPath(e,t,n,r,i,a){let o=this.track,s=.18,c=.05;for(let a=t+s/2;a<n;a+=.205){let l=e(a);if(!isFinite(l))continue;let u=(e(Math.min(n,a+.08))-e(Math.max(t,a-.08)))/.16;Mh(o,a,u),Nh(o,a,r,l-c/2,Ah);let d=this.rng.range(-.02,.02);this.planks.add(Ah,Oh.clone().multiplyScalar(i*2+d),kh.clone().multiplyScalar(c),Dh.clone().multiplyScalar(s),this.woodTone())}let l=1.6;for(let s=t;s<n-.05;s+=l){let c=Math.min(n,s+l);for(let l of[-1,1]){let u=r+l*(i-.12),d=e(Math.max(t+.01,s))-.12,f=e(Math.min(n-.01,c))-.12;if(!isFinite(d)||!isFinite(f))continue;let p=Nh(o,s,u,d,new U),m=Nh(o,c,u,f,new U);if(this.beam(p,m,.09,.16,!0),a.sides){let e=o.ground(s,u),t=d-e;if(t>.15){let n=Nh(o,s,u,e+t/2,new U),r=Nh(o,c,u,(f+o.ground(c,u))/2,new U),i=n.clone().add(r).multiplyScalar(.5),a=r.clone().sub(n),l=a.length();a.normalize();let d=new U().crossVectors(a,new U(0,1,0)).normalize();this.beams.add(i,a.multiplyScalar(l),new U(0,Math.max(.1,(t+(f-o.ground(c,u)))/2),0),d.multiplyScalar(.04),this.woodTone(!0))}}if(a.posts){let e=o.ground(s,u);if(d-e>.25){let t=Nh(o,s,u,d,new U),n=Nh(o,s,u,e-.3,new U);if(this.beam(n,t,.12,.12,!0),d-e>2.2&&l<0){let t=Nh(o,s,r+(i-.12),d-.4,new U),n=Nh(o,s,u,e+.4,new U);this.beam(n,t,.06,.12,!0)}}}if(a.rope){let e=Nh(o,s,u,d+.95,new U),t=Nh(o,c,u,f+.95,new U);this.beam(e,t,.035,.035,!1);let n=Nh(o,s,u,d+.05,new U);this.beam(n,e,.05,.05,!0)}}}}beam(e,t,n,r,i,a){let o=t.clone().sub(e),s=o.length();if(s<.001)return;o.normalize();let c=Math.abs(o.y)>.9?new U(1,0,0):new U(0,1,0),l=new U().crossVectors(o,c).normalize(),u=new U().crossVectors(l,o).normalize(),d=e.clone().add(t).multiplyScalar(.5);(a??this.beams).add(d,o.multiplyScalar(s),u.multiplyScalar(r),l.multiplyScalar(n),this.woodTone(i))}tower(e){let t=this.track;this.plankPath(t=>e.deck(t,0),e.s0,e.s1,0,e.half,{posts:!0,sides:!1});for(let n of[-1,1]){let r=n*(e.half-.05);for(let n=e.s0;n<=.01;n+=2){let i=Nh(t,n,r,e.deckY,new U),a=Nh(t,n,r,e.deckY+1.05,new U);this.beam(i,a,.08,.08,!0,this.rails)}let i=Nh(t,e.s0,r,e.deckY+1,new U),a=Nh(t,0,r,e.deckY+1,new U);this.beam(i,a,.07,.09,!1,this.rails)}let n=-1.2,r=Nh(t,n,-e.half-.2,e.deckY,new U),i=Nh(t,n,e.half+.2,e.deckY,new U),a=3.1;this.beam(r,r.clone().setY(e.deckY+a),.18,.18,!0),this.beam(i,i.clone().setY(e.deckY+a),.18,.18,!0),this.beam(r.clone().setY(e.deckY+a),i.clone().setY(e.deckY+a),.22,.22,!0);let o=this.banner(`HUCKLINE`,`#ff5b14`,`#f4eee3`,4),s=new K(new Ia(e.half*2+.3,.62),o);t.frame(n,Th),s.position.copy(r.clone().add(i).multiplyScalar(.5)).setY(e.deckY+a-.42),s.rotation.y=-Th.h-Math.PI/2,this.group.add(s);let c=s.clone();c.rotation.y+=Math.PI,c.position.addScaledVector(new U(Math.cos(Th.h),0,Math.sin(Th.h)),-.02),this.group.add(c)}banner(e,t,n,r){let i=document.createElement(`canvas`);i.width=512,i.height=Math.round(512/r);let a=i.getContext(`2d`);a.fillStyle=t,a.fillRect(0,0,i.width,i.height),a.fillStyle=n,a.font=`italic 800 ${Math.round(i.height*.62)}px "Big Shoulders Display Variable", "Saira Variable", sans-serif`,a.textAlign=`center`,a.textBaseline=`middle`,a.fillText(e,i.width/2,i.height*.54),a.fillStyle=`rgba(0,0,0,0.18)`,a.fillRect(0,i.height-6,i.width,6);let o=new ea(i);return o.colorSpace=Nt,o.anisotropy=4,new vi({map:o,side:0,toneMapped:!1,color:new W(.82,.82,.82)})}finish(){let e=this.track,t=e.finishS,n=e.profile(t).half+1.2,r=e.height(t,0),i=new ia(.7,5.2,.7);i.translate(0,2.6,0);let a=Lp({kind:`plain`,color:`#1b1c20`});for(let r of[-1,1]){let o=new K(i,a);Nh(e,t,r*n,e.ground(t,r*n),o.position),o.castShadow=!0,this.group.add(o)}e.frame(t,Th);let o=new K(new Ia(n*2+.7,1.1),this.banner(`FINISH`,`#1b1c20`,`#ff5b14`,5.5));Nh(e,t,0,r+4.6,o.position),o.rotation.y=-Th.h-Math.PI/2,this.group.add(o);let s=document.createElement(`canvas`);s.width=256,s.height=32;let c=s.getContext(`2d`);for(let e=0;e<16;e++)for(let t=0;t<2;t++)c.fillStyle=(e+t)%2?`#111`:`#f4eee3`,c.fillRect(e*16,t*16,16,16);let l=new ea(s);l.colorSpace=Nt;let u=new K(new Ia(n*2,.6),new vi({map:l,transparent:!0,opacity:.85,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));Nh(e,t,0,r+.03,u.position),u.rotation.x=-Math.PI/2,u.rotation.z=-Th.h-Math.PI/2,this.group.add(u);let d=[],f=[`#ff5b14`,`#2f6bff`,`#f4eee3`,`#1b1c20`,`#ffc23d`,`#e2453c`,`#3cb371`,`#7a3cff`,`#ff8fb1`,`#9be52a`],p=this.rng;for(let n=t-26;n<t+42;n+=.55)for(let t of[-1,1]){let r=e.profile(n),i=t*(r.half+2.2);if(Math.abs(n-Math.round(n/2.2)*2.2)<.3){let t=Nh(e,n,i,e.ground(n,i)+.5,new U),r=Nh(e,n+2.1,i,e.ground(n+2.1,i)+.5,new U),a=r.clone().sub(t),o=a.length();a.normalize();let s=new U().crossVectors(a,new U(0,1,0)).normalize(),c=new W(Math.floor(n/2.2)%3==0?`#ff5b14`:`#f4eee3`);this.beams.add(t.clone().add(r).multiplyScalar(.5),a.multiplyScalar(o),new U(0,.9,0),s.multiplyScalar(.05),c)}for(let i=0;i<3;i++){if(!p.chance(.62-i*.12))continue;let a=t*(r.half+2.9+i*.75+p.range(-.15,.15)),o=n+p.range(-.2,.2),s=e.ground(o,a);d.push({p:Nh(e,o,a,s,new U),c:new W(p.pick(f)),h:p.range(.9,1.08)})}}let m=new oa(2.4,2.2,4,1);m.rotateY(Math.PI/4),m.translate(0,2.9,0),new aa(.05,.05,1.8,4).translate(0,.9,0);for(let n=0;n<4;n++){let r=n%2?1:-1,i=t+10+n*7,a=r*(e.profile(i).half+7.5),o=Nh(e,i,a,e.ground(i,a),new U),s=new K(m,Lp({kind:`cloth`,color:n%2?`#ff5b14`:`#f4eee3`}));s.position.copy(o),s.castShadow=!0,this.group.add(s)}this.spectators(d),this.buildCrowd(d)}spectators(e){let t=this.track,n=this.rng,r=[`#ff5b14`,`#2f6bff`,`#f4eee3`,`#1b1c20`,`#ffc23d`,`#e2453c`,`#3cb371`,`#7a3cff`,`#ff8fb1`,`#9be52a`];for(let i of t.gaps){if(i.a0<30||i.b1>t.finishS-30)continue;let a=0,o=1/0;for(let e of[-1,1]){let n=(i.a1+i.b0)/2,r=e*(t.profile(n).half+9),s=Math.abs(t.ground(n,r)-t.height(n,0))+Math.abs(t.ground(n+2,r)-t.ground(n-2,r))*2;s<o&&(o=s,a=e)}if(o>14)continue;let s=n.int(9,18);for(let o=0;o<s;o++){let o=n.range(i.a0-4,i.b0+6),s=t.profile(o).half,c=a*(s+n.range(6.5,12)),l=t.ground(o,c);Math.abs(t.ground(o+1,c)-t.ground(o-1,c))>1.4||e.push({p:Nh(t,o,c,l,new U),c:new W(n.pick(r)),h:n.range(.9,1.08)})}}}buildCrowd(e){if(!e.length)return;let t=new aa(.2,.17,.95,6);t.translate(0,1.025,0);let n=new aa(.15,.12,.6,5);n.translate(0,.3,0);let r=new La(.13,7,5);r.translate(0,1.66,0);let i=new ia(.08,.6,.08);i.translate(.27,1.65,0);let a=i.clone();a.translate(-.54,0,0);let o=Cm([t.toNonIndexed(),n.toNonIndexed(),r.toNonIndexed(),i.toNonIndexed(),a.toNonIndexed()]),s=Lp({kind:`cloth`,color:`#ffffff`,flat:!0}),c=s.onBeforeCompile;s.onBeforeCompile=(e,t)=>{c(e,t),e.uniforms.uCheer=$.uTime,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
{
  vec3 ip = instanceMatrix[3].xyz;
  float ph = fract(sin(dot(ip.xz, vec2(12.9898, 78.233))) * 43758.5453) * 6.28;
  float b = max(0.0, sin(uTime * 7.0 + ph));
  transformed.y += b * 0.12;
  if (position.y > 1.36 && abs(position.x) > 0.2) transformed.y += b * 0.18;
}`)},s.customProgramCacheKey=()=>`hl-crowd`;let l=new Vi(o,s,e.length),u=new ir;e.forEach((e,t)=>{u.position.copy(e.p),u.rotation.set(0,this.rng.range(0,6.28),0),u.scale.set(1,e.h,1),u.updateMatrix(),l.setMatrixAt(t,u.matrix),l.setColorAt(t,e.c)}),l.castShadow=!0,l.receiveShadow=!0,l.computeBoundingSphere(),this.crowd=l,this.group.add(l)}},Fh=[.3,.7,1.2,1.8,2.5,3.3,4.2,5.3,6.6,8,9.6,12],Ih=16,Lh=1.4,Rh=Nd(),zh=class{track;material;detail;cols;constructor(e,t,n=1){this.track=e,this.material=t,this.detail=n,this.cols=17+Fh.length*2+2}colD(e,t,n,r){let i=Fh.length,a=this.track,o,s=!1;(e===0||e===this.cols-1)&&(s=!0);let c=e-1;if(c<0||c<i){let e=Fh[i-1-Math.max(0,c)];o=-(n+Math.min(e,a.reach(t,-1)))}else if(c>i+Ih){let e=Fh[Math.min(i-1,c-i-Ih-1)];o=n+Math.min(e,a.reach(t,1))}else{let e=(c-i)/Ih;o=-n+e*2*n}return r>1e-4&&o>0&&(o=Math.min(o,.85/r)),r<-1e-4&&o<0&&(o=Math.max(o,-.85/-r)),{d:o,skirt:s}}rows(e,t){let n=.5/this.detail,r=new Set;for(let i=e;i<t-1e-6;i+=n)r.add(+i.toFixed(4));r.add(t);for(let n of this.track.featuresNear((e+t)/2).concat(this.track.featuresNear(e),this.track.featuresNear(t)))for(let i of n.keys)for(let n of[-.12,0,.12]){let a=i+n;a>e&&a<t&&r.add(+a.toFixed(4))}return[...r].sort((e,t)=>e-t)}build(e,t){let n=this.track,r=this.rows(e,t),i=[r[0]-(r[1]-r[0]),...r,r[r.length-1]+(r[r.length-1]-r[r.length-2])],a=i.length,o=this.cols,s=new Float32Array(a*o*3),c=new Float32Array(a*o*4),l=new Float32Array(a*o),u=new Uint8Array(a*o);for(let e=0;e<a;e++){let t=i[e];n.frame(t,Rh);let r=n.profile(t).half,a=Math.sin(Rh.h),d=Math.cos(Rh.h),f=n.surfA[Math.round(Y(t/.25,0,n.n-1))];for(let i=0;i<o;i++){l[e*o+i]=f;let{d:p,skirt:m}=this.colD(i,t,r,Rh.k),h=(e*o+i)*3;s[h]=Rh.x-a*p,s[h+2]=Rh.z+d*p,s[h+1]=n.ground(t,p)-(m?Lh:0),u[e*o+i]=+!!m;let g=(e*o+i)*4;c[g]=t,c[g+1]=p,c[g+2]=r,c[g+3]=1}}let d=new Float32Array(a*o*3);for(let e=1;e<a-1;e++)for(let t=0;t<o;t++){let n=u[e*o+t]?t===0?1:o-2:t,r=Math.max(1,n-1),i=Math.min(o-2,n+1),a=((e+1)*o+n)*3,l=((e-1)*o+n)*3,f=(e*o+r)*3,p=(e*o+i)*3,m=s[a]-s[l],h=s[a+1]-s[l+1],g=s[a+2]-s[l+2],_=s[p]-s[f],v=s[p+1]-s[f+1],y=s[p+2]-s[f+2],b=v*g-y*h,x=y*m-_*g,S=_*h-v*m,C=Math.hypot(b,x,S)||1;b/=C,x/=C,S/=C,x<0&&(b=-b,x=-x,S=-S);let w=(e*o+t)*3;d[w]=b,d[w+1]=x,d[w+2]=S;let T=(e*o+n)*3,E=(s[a+1]+s[l+1]+s[f+1]+s[p+1])/4-s[T+1],D=Math.max(.3,Math.hypot(_,y)*.5+Math.hypot(m,g)*.5);c[(e*o+t)*4+3]=Y(1-Math.max(0,E/D)*1.6,.55,1)}let f=a-2,p=new Float32Array(f*o*3),m=new Float32Array(f*o*3),h=new Float32Array(f*o*4),g=new Float32Array(f*o);p.set(s.subarray(o*3,(a-1)*o*3)),m.set(d.subarray(o*3,(a-1)*o*3)),h.set(c.subarray(o*4,(a-1)*o*4)),g.set(l.subarray(o,(a-1)*o));let _=new Uint32Array((f-1)*(o-1)*6),v=0;for(let e=0;e<f-1;e++)for(let t=0;t<o-1;t++){let n=e*o+t,r=n+1,i=n+o,a=i+1;_[v++]=n,_[v++]=r,_[v++]=i,_[v++]=r,_[v++]=a,_[v++]=i}let y=[];for(let e=0;e<f;e+=2)y.push(e);y[y.length-1]!==f-1&&y.push(f-1);let b=[0];for(let e=1;e<o-1;e+=2)b.push(e);b[b.length-1]!==o-2&&b.push(o-2),b.push(o-1);let x=new Uint32Array((y.length-1)*(b.length-1)*6),S=0;for(let e=0;e<y.length-1;e++)for(let t=0;t<b.length-1;t++){let n=y[e]*o+b[t],r=y[e]*o+b[t+1],i=y[e+1]*o+b[t],a=y[e+1]*o+b[t+1];x[S++]=n,x[S++]=r,x[S++]=i,x[S++]=r,x[S++]=a,x[S++]=i}let C=new oi;C.setAttribute(`position`,new G(p,3)),C.setAttribute(`normal`,new G(m,3)),C.setAttribute(`aTrack`,new G(h,4)),C.setAttribute(`aSurf`,new G(g,1));let w=new G(_,1),T=new G(x,1);C.setIndex(w),C.computeBoundingSphere(),C.computeBoundingBox();let E=new K(C,this.material);return E.receiveShadow=!0,E.castShadow=!0,E.matrixAutoUpdate=!1,{mesh:E,s0:e,s1:t,hi:w,lo:T,lod:0}}},Bh=136,Vh=(e,t,n)=>{let r=[],i=e.near,a=i.nx+1,o=(n,r,i)=>{if(i>20)return 0;let a=e.nearestS(n,r,30);if(Number.isNaN(a))return 0;let o=Y(a,0,t.length),s=t.profile(o).half;t.frame(o,Rh);let c=-(n-Rh.x)*Math.sin(Rh.h)+(r-Rh.z)*Math.cos(Rh.h);if(a<-2||a>t.length+2)return .7*X(s+12+1.5,s+12-.5,i);let l=t.reach(o,c);return .7*X(s+l+1.5,s+l-.5,Math.abs(c))};for(let e=0;e<i.nz;e+=64)for(let t=0;t<i.nx;t+=64){let s=Math.min(i.nx,t+64),c=Math.min(i.nz,e+64),l=s-t+1,u=c-e+1,d=!1;for(let n=e;n<=c&&!d;n+=4)for(let e=t;e<=s;e+=4)if(i.dist[n*a+e]<Bh){d=!0;break}if(!d)continue;let f=new Float32Array(l*u*3),p=new Float32Array(l*u*3),m=new Float32Array(l*u*4),h=new Uint8Array(l*u);for(let n=0;n<u;n++)for(let r=0;r<l;r++){let s=(e+n)*a+t+r,c=i.x0+(t+r)*i.cell,u=i.z0+(e+n)*i.cell,d=i.dist[s],g=(n*l+r)*3;f[g]=c,f[g+1]=i.h[s]-o(c,u,d),f[g+2]=u;let _=i.h[(e+n)*a+Math.max(0,t+r-1)],v=i.h[(e+n)*a+Math.min(i.nx,t+r+1)],y=i.h[Math.max(0,e+n-1)*a+t+r],b=i.h[Math.min(i.nz,e+n+1)*a+t+r],x=-(v-_)/(2*i.cell),S=-(b-y)/(2*i.cell),C=Math.hypot(x,1,S);p[g]=x/C,p[g+1]=1/C,p[g+2]=S/C;let w=(n*l+r)*4;m[w]=0,m[w+1]=999,m[w+2]=0;let T=(_+v+y+b)/4;m[w+3]=Y(1-Math.max(0,(T-i.h[s])/i.cell)*1.2,.6,1),h[n*l+r]=+(d<Bh)}let g=e=>{let t=[];for(let n=0;n+e<u;n+=e)for(let r=0;r+e<l;r+=e){let i=n*l+r,a=i+e,o=i+e*l,s=o+e;(h[i]||h[a]||h[o]||h[s])&&t.push(i,o,a,a,o,s)}return t.length?new G(new Uint32Array(t),1):null},_=g(1);if(!_)continue;let v=new oi;v.setAttribute(`position`,new G(f,3)),v.setAttribute(`normal`,new G(p,3)),v.setAttribute(`aTrack`,new G(m,4)),v.setIndex(_),v.computeBoundingSphere();let y=new K(v,n);y.receiveShadow=!0,y.castShadow=!1,y.matrixAutoUpdate=!1,r.push({mesh:y,hi:_,lo:g(2),lod:0})}let s=e.far,c=s.nx+1,l=new Float32Array(c*(s.nz+1)*3),u=new Float32Array(c*(s.nz+1)*4);for(let e=0;e<=s.nz;e++)for(let t=0;t<=s.nx;t++){let n=e*c+t,r=s.x0+t*s.cell,a=s.z0+e*s.cell,o=n*3,d=i.inside(r,a,1)?X(Bh+30,Bh+6,s.dist[n]):0;l[o]=r,l[o+1]=s.h[n]-d*14,l[o+2]=a;let f=n*4;u[f]=0,u[f+1]=999,u[f+2]=0,u[f+3]=1}let d=new Uint32Array(s.nx*s.nz*6),f=0;for(let e=0;e<s.nz;e++)for(let t=0;t<s.nx;t++){let n=e*c+t,r=n+1,i=n+c,a=i+1;d[f++]=n,d[f++]=i,d[f++]=r,d[f++]=r,d[f++]=i,d[f++]=a}let p=new oi;p.setAttribute(`position`,new G(l,3)),p.setAttribute(`aTrack`,new G(u,4)),p.setIndex(new G(d,1)),p.computeVertexNormals(),p.computeBoundingSphere();let m=new K(p,n);return m.receiveShadow=!1,m.matrixAutoUpdate=!1,r.push({mesh:m,hi:p.index,lo:null,lod:0}),r},Hh={scale:1,maxDpr:2,shadow:2048,antialias:!0,props:1,terrain:1},Uh={scale:.8,maxDpr:1.5,shadow:1024,antialias:!1,props:.6,terrain:.7},Wh=Nd(),Gh=new W(`#ff7a2a`),Kh=new W(`#ffffff`),qh=new W(`#fff1c8`),Jh=new jn,Yh=new U,Xh=new U,Zh=new U,Qh=class{renderer;scene=new pr;rig;sun=new Uo(`#ffffff`,3);hemi=new Oo(`#ffffff`,`#886644`,1);sky=new wh;fx=new Hm;world=new ar;chunks=[];landTiles=[];track=null;look=Um.mesa;worldId=`mesa`;bikeModel=null;rider=null;bikeRoot=new ar;tokens=[];env=null;time=0;pixelRatio=1;riderState=mm();whip=0;bar=0;crank=0;dustAcc=0;quality;bailFocus=new U;frames=0;bikeSpin=new U;ambient=`none`;railing=null;props=null;birds=null;helmet=!1;povSnap=!0;ambientAcc=0;constructor(e,t){this.quality=t,this.renderer=new Tu({canvas:e,antialias:t.antialias,powerPreference:`high-performance`,stencil:!1,alpha:!1}),this.renderer.outputColorSpace=Nt,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,this.rig=new zm(e.clientWidth/Math.max(1,e.clientHeight)),this.scene.add(this.sky.mesh,this.sun,this.sun.target,this.hemi,this.world,this.bikeRoot,this.fx.points,this.fx.glow),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(t.shadow,t.shadow);let n=this.sun.shadow.camera;n.left=-26,n.right=26,n.top=26,n.bottom=-26,n.near=1,n.far=260,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.04,this.sun.shadow.radius=2,this.resize()}setQuality(e){e.shadow!==this.quality.shadow&&(this.sun.shadow.mapSize.set(e.shadow,e.shadow),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.quality=e,this.resize()}resize(){let e=this.renderer.domElement,t=e.clientWidth||window.innerWidth,n=e.clientHeight||window.innerHeight;this.pixelRatio=Math.min(window.devicePixelRatio||1,this.quality.maxDpr)*this.quality.scale,this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(t,n,!1),this.rig.resize(t/Math.max(1,n)),this.fx.setViewport(n*this.pixelRatio)}async loadWorld(e){await oh(e,this.renderer);let t=Qm[e];jp({trail:sh(t.trail),ground:sh(t.ground),rock:sh(t.rock),alt:sh(t.alt)}),$.tWallC.value=sh(`town_wall`).c,$.tRoofC.value=sh(`town_roof`).c}setLine(e,t,n){this.dispose(),this.track=e,this.worldId=t;let r=Um[t];this.look=r,Ap(r,n),this.sky.setLook(r);let i=r.sunElev*Math.PI/180,a=r.sunAzim*Math.PI/180+e.hd[0];$.uSunDir.value.set(Math.cos(i)*Math.cos(a),Math.sin(i),Math.cos(i)*Math.sin(a)).normalize(),this.sun.color.set(r.sunColor),this.sun.intensity=r.sunIntensity,this.hemi.color.set(r.hemiSky),this.hemi.groundColor.set(r.hemiGround),this.hemi.intensity=r.hemiIntensity,this.renderer.toneMappingExposure=r.exposure,this.fx.setDust(r.trail),this.env?.dispose(),this.env=Bm(this.renderer,r,$.uSunDir.value),this.scene.environment=this.env,this.scene.environmentIntensity=.55;let o=Lp({kind:`terrain`,color:`#ffffff`,lite:this.quality.terrain<1}),s=new zh(e,o,this.quality.terrain);for(let t=-24;t<e.length+24;t+=48){let n=s.build(t,Math.min(t+48,e.length+40));this.chunks.push(n),this.world.add(n.mesh)}let c=new URLSearchParams(location.search).get(`hide`)??``;if(e.land){this.landTiles=Vh(e.land,e,o);for(let e of this.landTiles)e.mesh.visible=!c.includes(`valley`),this.world.add(e.mesh)}let l=new mh(e,r,n,this.quality.props,t);l.build(),this.props=l;let u=1/0;for(let t=0;t<e.y.length;t+=8)u=Math.min(u,e.y[t]);let d=e.depthA[Math.floor(e.depthA.length/2)];if(r.sea){let t=new K(new Ia(9e3,9e3,1,1),Rp({color:r.sea.color,metalness:0,roughness:.08,envIntensity:1.3}));t.rotation.x=-Math.PI/2,t.position.set(e.x[Math.floor(e.n/2)],u-r.sea.below,e.z[Math.floor(e.n/2)]),this.world.add(t)}$.uLavaY.value=r.lava?u-r.lava.below:-1e6,this.ambient=t===`ember`?`embers`:t===`glacier`?`snow`:t===`pines`?`motes`:`none`,l.group.visible=!c.includes(`props`),this.world.add(l.group),this.birds=new Ch(e,n,t===`town`?3:5),this.world.add(this.birds.mesh);let f=t===`pines`||t===`glacier`?`bark_pine`:`bark`;this.world.add(yh(e,f,`#ffffff`));let p=new Ph(e,r,n);p.build(),this.railing=p.railing,p.group.visible=!c.includes(`struct`),this.world.add(p.group);let m=new aa(.42,.42,.07,28);m.rotateX(Math.PI/2);let h=new Ra(.42,.045,8,32),g=new Xa({color:`#ffc23d`,metalness:1,roughness:.22,emissive:new W(`#ff9d1a`),emissiveIntensity:.35}),_=new vi({color:`#ffd27a`,transparent:!0,opacity:.18,depthWrite:!1});for(let t of e.tokens){let n=new ar,r=new K(m,g),i=new K(h,g),a=new K(new La(.85,16,12),_);n.add(r,i,a),e.frame(t.s,Wh),n.position.set(Wh.x-Math.sin(Wh.h)*t.d,e.height(t.s,t.d)+t.y,Wh.z+Math.cos(Wh.h)*t.d),n.userData.base=n.position.y,r.castShadow=!0,this.tokens.push(n),this.world.add(n)}$.uFogBase.value=(e.land?e.land.lowY:e.baseY(e.length*.5))-Math.min(d,40);let v=e.baseY(0),y=e.baseY(e.length);$.uAltBand.value.set(y+(v-y)*.8,y+(v-y)*.92),this.rig.snap()}studioMatte(e){let t=e!==`plate`;this.world.visible=!t,this.sky.mesh.visible=!t,this.fx.points.visible=this.fx.glow.visible=!1,this.fx.enabled=!1,this.bikeRoot.visible=t,t&&this.renderer.setClearColor(e===`white`?16777215:0,1)}setGarage(e){this.railing&&(this.railing.visible=!e)}setBike(e,t,n){this.bikeModel&&(this.bikeRoot.remove(this.bikeModel.root),this.bikeModel.dispose()),this.bikeModel=new jm(e,t),this.bikeRoot.add(this.bikeModel.root),this.rider?this.rider.setOutfit(n):this.rider=new hm(n),this.rider.group.parent!==this.bikeModel.root&&this.bikeModel.root.add(this.rider.group)}resetTokens(){for(let e of this.tokens)e.visible=!0}setOutfit(e){this.rider?.setOutfit(e)}setPaint(e){this.bikeModel?.setPaint(e)}onEvent(e,t){let n=t.bike,r=new U(n.p.x,n.p.y,n.p.z);if(e.t===`land`&&!e.land.micro&&e.land.quality!==`bail`){let t=e.land.impact;this.fx.emit(`dust`,r,new U(n.v.x*.2,.4,n.v.z*.2),Math.round(10+t*3),1.6),this.fx.emit(`pebble`,r,new U(n.v.x*.3,1.5,n.v.z*.3),Math.round(4+t),1.2),t>4&&this.rig.shake(Y((t-4)/6,.2,1))}if(e.t===`bail`&&(this.fx.emit(`dust`,r,new U(0,.6,0),30,2.2),this.startBail(t)),e.t===`respawn`&&this.endBail(),e.t===`token`){let t=this.tokens[e.index];t&&(this.fx.emit(`spark`,t.position,new U(0,1.5,0),40,2.2,new W(`#ffd27a`)),t.visible=!1)}if(e.t===`finish`){let e=[`#ff5b14`,`#2f6bff`,`#f4eee3`,`#ffc23d`,`#9be52a`];for(let t=0;t<160;t++)this.fx.emit(`confetti`,r.clone().add(new U(0,4,0)),new U(n.v.x*.3,3,n.v.z*.3),1,4,new W(e[t%e.length]))}}startBail(e){let t=this.rider,n=this.bikeModel;if(!t||!n)return;n.root.updateMatrixWorld(!0);let r=n.root.matrixWorld.clone();n.root.remove(t.group),this.scene.add(t.group);let i=e.bike;t.startRagdoll(r,new U(i.v.x,i.v.y+1.5,i.v.z),1.5),this.bikeSpin.set(Math.random()*6-3,Math.random()*4-2,Math.random()*6-3),this.rig.mode=`bail`}endBail(){let e=this.rider,t=this.bikeModel;e&&t&&(e.stopRagdoll(),this.scene.remove(e.group),t.root.add(e.group),this.rig.mode=`chase`,this.rig.snap())}update(e,t,n={}){if(this.time+=e,$.uTime.value=this.time,!this.track)return;for(let e of this.tokens)e.rotation.y=this.time*2.4,e.position.y=e.userData.base+Math.sin(this.time*2+e.position.x)*.12;let r=this.rig.mode===`replay`;t&&this.bikeModel&&this.rider&&!r&&this.syncBike(e,t,n.hold??!1),this.updateLod(),this.props?.update(this.rig.cam.position),this.birds?.update(this.time),this.ambientFx(e),this.fx.update(e),this.sky.follow(this.rig.cam.position);let i=r?null:t?.bike;if(i){let e=Math.cos(i.heading),t=Math.sin(i.heading),n=i.p.x+e*8,r=i.p.z+t*8,a=52/this.quality.shadow,o=$.uSunDir.value;this.sun.target.position.set(Math.round(n/a)*a,i.p.y,Math.round(r/a)*a),this.sun.position.copy(this.sun.target.position).addScaledVector(o,120)}}ambientFx(e){if(this.ambient===`none`)return;this.ambientAcc+=e*(this.ambient===`embers`?14:this.ambient===`snow`?10:6);let t=this.rig.cam.position,n=new U;for(this.rig.cam.getWorldDirection(n);this.ambientAcc>1;){--this.ambientAcc;let e=new U(t.x+n.x*14+(Math.random()-.5)*30,t.y-2+Math.random()*10,t.z+n.z*14+(Math.random()-.5)*30);this.ambient===`embers`?this.fx.emit(`spark`,e.setY(t.y-6+Math.random()*4),new U(0,1.6+Math.random(),0),1,.6,Gh):this.ambient===`snow`?this.fx.emit(`confetti`,e.setY(t.y+6),new U(.6,-.4,.2),1,.8,Kh):this.fx.emit(`spark`,e,new U(.2,.15,.1),1,.3,qh)}}updateLod(){let e=this.rig.cam.position;for(let t of this.chunks){let n=t.mesh.geometry.boundingSphere,r=n.center.distanceTo(e)-n.radius*.35,i=+(r>75);i!==t.lod&&(t.lod=i,t.mesh.geometry.setIndex(i?t.lo:t.hi)),t.mesh.castShadow=r<60}for(let t of this.landTiles){if(!t.lo)continue;let n=t.mesh.geometry.boundingSphere,r=n.center.distanceTo(e)-n.radius*.5,i=+(r>140);i!==t.lod&&(t.lod=i,t.mesh.geometry.setIndex(i?t.lo:t.hi)),t.mesh.castShadow=r<40}}syncBike(e,t,n){let r=t.bike,i=this.bikeModel,a=this.rider,o=this.track;Zh.set(r.F.x,r.F.y,r.F.z),Xh.set(r.U.x,r.U.y,r.U.z),Yh.set(-r.R.x,-r.R.y,-r.R.z);let s=i.root;if(r.mode!==`bail`){if(Jh.makeBasis(Yh,Xh,Zh),s.quaternion.setFromRotationMatrix(Jh),s.position.set(r.p.x,r.p.y,r.p.z),r.mode===`ground`&&o.roughList.length){let e=r.spec.wheelbase*.5,t=o.roughH(r.s+e,r.d),n=o.roughH(r.s-e,r.d);s.position.y+=(t+n)*.5*.55,s.rotateX(-Math.atan2(t-n,e*2)*.6)}}else s.position.set(r.p.x,Math.max(r.p.y,o.height(r.s,r.d)+.3),r.p.z),s.rotation.x+=this.bikeSpin.x*e*Math.max(0,1-r.bailT),s.rotation.z+=this.bikeSpin.z*e*Math.max(0,1-r.bailT);let c=r.style,l=0,u=0;if(c&&(c.kind===`tailwhip`||c.kind===`barspin`)){let e=Math.min(1,c.t/(c.dur*c.n))*Math.PI*2*c.n*(c.kind===`tailwhip`?1:-1);c.kind===`tailwhip`?l=e:u=e}this.whip=l,this.bar=u;let d=r.mode===`ground`&&r.speed<9.6&&!n;d?this.crank+=e*r.speed*1.1:this.crank+=(Math.round(this.crank/Math.PI)*Math.PI+Math.PI/2-this.crank)*Z(6,e)*0;let f=Math.max(.08,r.spec.travel),p=r.mode===`ground`&&r.rough>0?(Math.sin(this.time*47)*.5+.5)*r.rough*Math.min(1,r.speed/10)*.35:0,m=r.mode===`ground`?Math.min(1,r.compress*.9+.12+p)*f:.02;i.pose(r.wheelAngle,-r.bar,this.whip,this.bar,d?this.crank:Math.PI/2+Math.round(this.crank/Math.PI)*Math.PI,m);let h=this.riderState,g=+(r.mode===`air`),_=Z(12,e),v=+(r.mode===`ground`);h.crouch+=(Math.max(r.crouch,r.compress*.9,r.rough*.35*v)-h.crouch)*_;let y=v*Y((-r.pitch-.12)/.4,0,1);h.back+=(Math.max(y,r.braking*.6*v)-h.back)*Z(5,e),h.look+=((v?Y(r.yawRate*.22,-.45,.45):0)-h.look)*Z(4,e),h.lean+=((r.mode===`ground`?-r.lean*.5:0)-h.lean)*_,h.air+=(g-h.air)*Z(6,e);let b=c?.kind===`superman`?c.held?1:Math.max(0,c.recover/.24):0,x=c?.kind===`cancan`?c.held?1:Math.max(0,c.recover/.24):0,S=c?.kind===`nohander`?c.held?1:Math.max(0,c.recover/.24):0,C=c?.kind===`tailwhip`?Math.sin(Math.min(1,c.t/(c.dur*c.n))*Math.PI):0,w=c?.kind===`barspin`?Math.sin(Math.min(1,c.t/(c.dur*c.n))*Math.PI):0;if(h.superman+=(b-h.superman)*Z(14,e),h.cancan+=(x-h.cancan)*Z(14,e),h.nohander+=(S-h.nohander)*Z(14,e),h.feetOff=C,h.handsOff=w,r.mode===`bail`?(a.stepRagdoll(e,o,r.s),this.bailFocus.copy(a.j.pelvis)):a.pose(i,h),r.mode===`ground`&&r.speed>3){this.dustAcc+=e*(r.speed*1.4+r.sliding*40);let t=Math.hypot(r.v.x,r.v.z)||1;for(;this.dustAcc>1;){--this.dustAcc;let e=.6,n=new U(r.p.x-r.v.x/t*e,r.p.y+.05,r.p.z-r.v.z/t*e);this.fx.emit(r.sliding>.3?`spray`:`dust`,n,new U(-r.v.x*.08,.5,-r.v.z*.08),1,.35)}}let T=new U(r.p.x,r.p.y,r.p.z),E=new U(r.v.x,r.v.y,r.v.z);this.rig.rumble=r.mode===`ground`?r.rough*Math.min(1,r.speed/14):0,this.rig.lean=r.mode===`ground`?r.lean:0,this.rig.flow=t.flow;let D=this.helmet&&r.mode!==`bail`&&this.rig.mode===`chase`;if(a.setHead(!D),D){s.updateMatrixWorld(!0);let t=a.j.head.clone().add(new U(0,.1,.12)).applyMatrix4(s.matrixWorld);this.rig.pov(e,t,Zh,Xh,r.speed,this.povSnap),this.povSnap=!1}else this.povSnap=!0,this.rig.update(e,o,T,E,r.s,r.mode===`air`,r.agl,r.speed,r.mode===`bail`?this.bailFocus:void 0)}replayLast=new U;replayWheel=0;startReplay(){this.track&&(this.endBail(),this.rig.setShots(this.track),this.rig.mode=`replay`,this.helmet=!1,this.replayLast.set(NaN,0,0))}replayFrame(e,t){let n=this.track,r=this.bikeModel,i=this.rider;if(!n||!r||!i)return;let a=r.root;a.position.set(t.x,t.y,t.z),a.quaternion.set(t.qx,t.qy,t.qz,t.qw);let o=new U;!Number.isNaN(this.replayLast.x)&&e>0&&o.copy(a.position).sub(this.replayLast).divideScalar(e);let s=Number.isNaN(this.replayLast.x)?0:a.position.distanceTo(this.replayLast);this.replayLast.copy(a.position),this.replayWheel+=s/.36;let c=this.riderState,l=Z(12,e);c.crouch+=(t.crouch-c.crouch)*l,c.air+=(+!!t.air-c.air)*Z(6,e),c.lean+=(0-c.lean)*l;let u=e=>t.style===e?Math.sin(Math.min(1,t.styleT*1.2)*Math.PI*.5):0;if(c.superman+=(u(`superman`)-c.superman)*Z(14,e),c.cancan+=(u(`cancan`)-c.cancan)*Z(14,e),c.nohander+=(u(`nohander`)-c.nohander)*Z(14,e),c.feetOff=t.style===`tailwhip`?Math.sin(t.styleT*Math.PI):0,c.handsOff=t.style===`barspin`?Math.sin(t.styleT*Math.PI):0,r.pose(this.replayWheel,0,t.style===`tailwhip`?t.styleT*Math.PI*2:0,t.style===`barspin`?-t.styleT*Math.PI*2:0,Math.PI/2),i.setHead(!0),i.pose(r,c),!t.air&&o.length()>3)for(this.dustAcc+=e*o.length()*1.2;this.dustAcc>1;)--this.dustAcc,this.fx.emit(`dust`,a.position.clone(),new U(-o.x*.08,.5,-o.z*.08),1,.35);this.rig.replay(e,n,a.position,o,t.s);let d=52/this.quality.shadow,f=$.uSunDir.value;this.sun.target.position.set(Math.round(t.x/d)*d,t.y,Math.round(t.z/d)*d),this.sun.position.copy(this.sun.target.position).addScaledVector(f,120)}render(){this.renderer.render(this.scene,this.rig.cam),this.frames++}dispose(){this.world.traverse(e=>{let t=e;t.isMesh&&t.geometry?.dispose()}),this.scene.remove(this.world),this.world=new ar,this.scene.add(this.world),this.chunks=[],this.landTiles=[],this.tokens=[],this.fx.clear()}get bike(){return null}},$h=new sn;new jn;var eg=class{root=new ar;bike;rider;state=mm();wheel=0;mat;last=new U;constructor(e,t=`#a6e3ff`){this.bike=new jm(e,{frame:t,accent:`#ffffff`,rims:`#ffffff`,tires:`black`}),this.rider=new hm(zp.ember),this.bike.root.add(this.rider.group),this.root.add(this.bike.root),this.mat=new vi({color:t,transparent:!0,opacity:.3,depthWrite:!1,fog:!1}),this.root.traverse(e=>{let t=e;t.isMesh&&(t.material=this.mat,t.castShadow=!1,t.receiveShadow=!1,t.renderOrder=4)}),this.root.visible=!1}update(e,t,n){this.root.visible=!0;let r=this.bike.root;r.position.set(e.x,e.y,e.z),$h.set(e.qx,e.qy,e.qz,e.qw),r.quaternion.copy($h);let i=this.last.distanceTo(r.position);this.last.copy(r.position),this.wheel+=i/.36;let a=this.state;a.crouch+=(e.crouch-a.crouch)*Z(12,t),a.air+=(+!!e.air-a.air)*Z(6,t);let o=t=>e.style===t?Math.sin(Math.min(1,e.styleT*1.2)*Math.PI*.5):0;a.superman+=(o(`superman`)-a.superman)*Z(14,t),a.cancan+=(o(`cancan`)-a.cancan)*Z(14,t),a.nohander+=(o(`nohander`)-a.nohander)*Z(14,t),a.feetOff=e.style===`tailwhip`?Math.sin(e.styleT*Math.PI):0,a.handsOff=e.style===`barspin`?Math.sin(e.styleT*Math.PI):0;let s=e.style===`tailwhip`?e.styleT*Math.PI*2:0,c=e.style===`barspin`?-e.styleT*Math.PI*2:0;this.bike.pose(this.wheel,0,s,c,Math.PI/2),this.rider.pose(this.bike,a);let l=n.distanceTo(r.position);this.mat.opacity=.3*X(1.2,4.5,l)}hide(){this.root.visible=!1}dispose(){this.bike.dispose(),this.rider.dispose(),this.mat.dispose()}},tg=[{id:`first_drop`,name:`First Drop`,text:`Finish your first line.`,points:5},{id:`backflip`,name:`Backflip`,text:`Land a backflip.`,points:10},{id:`frontflip`,name:`Frontflip`,text:`Land a frontflip.`,points:10},{id:`double_back`,name:`Double Trouble`,text:`Land a double backflip.`,points:30},{id:`spin_720`,name:`Seven-Twenty`,text:`Land a 720.`,points:20},{id:`tailwhip`,name:`Whip It`,text:`Land a tailwhip.`,points:10},{id:`double_whip`,name:`Double Whip`,text:`Land a double tailwhip.`,points:25},{id:`barspin`,name:`Barspin`,text:`Land a barspin.`,points:10},{id:`superman`,name:`Superman`,text:`Hold a superman for a full second and land it.`,points:15},{id:`perfect10`,name:`Smooth Operator`,text:`Ten perfect landings in one run.`,points:20},{id:`chain5`,name:`Combo Rider`,text:`Reach a ×5 chain.`,points:15},{id:`chain10`,name:`Unbroken`,text:`Reach a ×10 chain.`,points:40},{id:`canyon`,name:`Canyon Gap`,text:`Clear the Canyon Gap.`,points:20},{id:`big_send`,name:`The Big Send`,text:`Drop The Big Send and ride away.`,points:25},{id:`big_air`,name:`Hang Time`,text:`Stay in the air for 2.5 seconds.`,points:15},{id:`tokens_line`,name:`Collector`,text:`Collect all three tokens on one line.`,points:15},{id:`three_stars`,name:`Three Stars`,text:`Earn three stars on a line.`,points:15},{id:`mesa_master`,name:`Mesa Master`,text:`Three stars on every Red Mesa line.`,points:50},{id:`world_pines`,name:`Into the Pines`,text:`Open Pine Shore.`,points:10},{id:`world_town`,name:`Old Town`,text:`Open Old Town.`,points:15},{id:`world_glacier`,name:`Whiteout`,text:`Open Whiteout.`,points:20},{id:`world_ember`,name:`Ember Peak`,text:`Open Ember Peak.`,points:25},{id:`daily3`,name:`Daily Grind`,text:`Ride the Daily Line three days in a row.`,points:20},{id:`endless10k`,name:`Ridge Runner`,text:`Score 10,000 on the Endless Ridge.`,points:20},{id:`tricks100`,name:`Trick Bag`,text:`Land 100 tricks.`,points:25},{id:`new_bike`,name:`New Wheels`,text:`Buy a bike in the garage.`,points:10}],ng=()=>({v:1,coins:0,lines:{},bikes:[`scout`],bike:`scout`,paints:Object.fromEntries(nd.map(e=>[e.id,{...e.paint}])),outfit:`ember`,settings:{sound:.9,music:.6,haptics:!0,assist:`easy`,invert:!1,lefty:!1,quality:`auto`,camera:`near`,ghost:!0,stick:`float`},tutorial:!1,hints:[],daily:{date:``,best:0,plays:0,streak:0,last:``},endless:{best:0,runs:0},stats:{runs:0,tricks:0,flips:0,spins:0,whips:0,airtime:0,distance:0,bails:0,tokens:0,perfects:0,gaps:0,bestTrick:0,bestTrickName:``},feats:[],games:{},reviewAsked:!1,since:Date.now()}),rg=`huckline.save.v1`,ig=class{data=ng();timer=null;async load(){let e=await se.get(rg);if(e)try{let t=JSON.parse(e),n=ng();this.data={...n,...t,settings:{...n.settings,...t.settings??{}},stats:{...n.stats,...t.stats??{}},daily:{...n.daily,...t.daily??{}},endless:{...n.endless,...t.endless??{}},paints:{...n.paints,...t.paints??{}}}}catch{this.data=ng()}return this.data}save(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,se.set(rg,JSON.stringify(this.data))},300)}flush(){this.timer&&=(clearTimeout(this.timer),null),se.set(rg,JSON.stringify(this.data))}line(e){return this.data.lines[e]??{best:0,stars:0,time:0,tokens:[!1,!1,!1],plays:0}}get stars(){return Object.values(this.data.lines).reduce((e,t)=>e+t.stars,0)}get tokensTotal(){return Object.values(this.data.lines).reduce((e,t)=>e+t.tokens.filter(Boolean).length,0)}},ag={feats:Object.fromEntries(tg.map(e=>[e.id,`huckline.${e.id}`])),boards:{daily:`huckline.daily`,endless:`huckline.endless`,best_trick:`huckline.best_trick`,stars:`huckline.stars`}},og={feats:{first_drop:`CgkIj-z5tJwSEAIQFA`,backflip:`CgkIj-z5tJwSEAIQGA`,frontflip:`CgkIj-z5tJwSEAIQDA`,double_back:`CgkIj-z5tJwSEAIQCA`,spin_720:`CgkIj-z5tJwSEAIQBA`,tailwhip:`CgkIj-z5tJwSEAIQDQ`,double_whip:`CgkIj-z5tJwSEAIQBQ`,barspin:`CgkIj-z5tJwSEAIQEA`,superman:`CgkIj-z5tJwSEAIQAA`,perfect10:`CgkIj-z5tJwSEAIQDw`,chain5:`CgkIj-z5tJwSEAIQAQ`,chain10:`CgkIj-z5tJwSEAIQEQ`,canyon:`CgkIj-z5tJwSEAIQGQ`,big_send:`CgkIj-z5tJwSEAIQFg`,big_air:`CgkIj-z5tJwSEAIQCQ`,tokens_line:`CgkIj-z5tJwSEAIQCg`,three_stars:`CgkIj-z5tJwSEAIQFw`,mesa_master:`CgkIj-z5tJwSEAIQBg`,world_pines:`CgkIj-z5tJwSEAIQFQ`,world_town:`CgkIj-z5tJwSEAIQAg`,world_glacier:`CgkIj-z5tJwSEAIQEg`,world_ember:`CgkIj-z5tJwSEAIQBw`,daily3:`CgkIj-z5tJwSEAIQDg`,endless10k:`CgkIj-z5tJwSEAIQCw`,tricks100:`CgkIj-z5tJwSEAIQEw`,new_bike:`CgkIj-z5tJwSEAIQAw`},boards:{daily:`CgkIj-z5tJwSEAIQGg`,endless:`CgkIj-z5tJwSEAIQGw`,best_trick:`CgkIj-z5tJwSEAIQHA`,stars:`CgkIj-z5tJwSEAIQHQ`}},sg=i.getPlatform(),cg=sg===`android`?a(`PlayGames`):sg===`ios`?a(`GameCenter`):null,lg=sg===`android`?og:ag,ug={supported:cg!==null,name:sg===`ios`?`Game Center`:`Play Games`,player:``,async status(){try{let e=await cg?.status();return this.player=e?.player??``,!!e?.authenticated}catch{return!1}},async signIn(){try{let e=await cg?.signIn();return this.player=e?.player??``,!!e?.authenticated}catch{return!1}},unlock(e){let t=lg.feats[e];cg&&t&&cg.unlock({id:t}).catch(()=>void 0)},submit(e,t){let n=lg.boards[e];cg&&n&&cg.submitScore({id:n,score:Math.max(0,Math.round(t))}).catch(()=>void 0)},async show(e,t){if(!cg)return!1;try{return e===`achievements`?await cg.showAchievements():await cg.showLeaderboards({id:t?lg.boards[t]:void 0}),!0}catch{return!1}}},dg=class{save=new ig;version=`1.1.0`;view;input;ui;hud;run=null;bot=null;def=null;track=null;loadedKey=``;mode=`boot`;kind=`tour`;screen=`none`;linesWorld=`mesa`;timeScale=1;last=performance.now();finishT=-1;garageAngle=0;garageBike=`scout`;countLast=4;tutorial=!1;tutStep=0;coachT=0;coachOn=null;frameMs=16;qualityScale=1;qTimer=0;settingsBack=null;ghost=null;ghostLabel=``;ghostView=null;ghostBike=``;splitNext=0;ghostPose={x:0,y:0,z:0,qx:0,qy:0,qz:0,qw:1,crouch:0,style:null,styleT:0,air:!1,s:0};lastTape=null;replayT=0;resultsArgs=null;servicesName=ug.supported?ug.name:null;async boot(e,t){await this.save.load();let n=this.save.data.settings;this.view=new Qh(t,this.qualityFor(n.quality)),this.input=new Yu(t),this.ui=new vm(e,this),this.hud=new mp(()=>this.pause()),e.append(this.hud.root),cp(()=>{Ju.init(),Ju.play(`tick`,{vol:.6}),F.tick()}),this.input.onAnyInput=()=>Ju.init(),window.addEventListener(`pointerdown`,()=>Ju.init(),{once:!0}),this.applySettings(n,!1),I({pause:()=>{this.mode===`ride`&&this.pause(),Ju.pause(),this.save.flush()},resume:()=>Ju.resume(),back:()=>this.back()}),window.addEventListener(`resize`,()=>this.view.resize());let r=this.nextLine();this.linesWorld=r.world,await this.loadAttract(r.world,!1),this.home(),le(),requestAnimationFrame(this.loop),ug.status(),await this.debugHooks(),window.__ready=!0}async debugHooks(){let e=new URLSearchParams(location.search),t=e.get(`ui`),n=e.get(`play`);if(e.get(`stars`)){let t=Number(e.get(`stars`));for(let e of ad){let n=Math.min(3,t);if(n<=0)break;this.save.data.lines[e.id]={best:e.goals[1]*(.6+n*.2),stars:n,time:e.par-4,tokens:[!0,n>1,n>2],plays:3},t-=n}this.save.data.coins=Number(e.get(`coins`)??12450)}if(t===`lines`&&this.openLines(e.get(`world`)??void 0),t===`garage`&&this.openGarage(),t===`settings`&&this.openSettings(),e.get(`shot`)||e.get(`studio`)){this.save.data.settings.quality=`high`;let t=Number(e.get(`dpr`)??0);this.view.setQuality({...Hh,maxDpr:t>0?t:Hh.maxDpr,shadow:Number(e.get(`shadow`)??Hh.shadow)})}if(n){let r=n===`daily`?cf():n===`endless`?uf(7):sd(n);if(!r)return;if(this.kind=n===`daily`?`daily`:n===`endless`?`endless`:`tour`,await this.startIntro(r),t===`intro`){this.view.rig.introT=Number(e.get(`introT`)??.55);return}this.drop();let i=this.run;i.start(!0);let a=new Bf(i,{...zf,seed:5});e.get(`auto`)===`1`&&(this.bot=a);let o=Number(e.get(`ff`)??0),s=0;for(;o>0&&i.bike.s<o||t===`results`&&i.phase!==`finished`;){i.update(1/120,a.input());for(let e of i.drain())(e.t===`land`||e.t===`bail`||e.t===`token`)&&this.view.onEvent(e,i);if(s++>36e3)break}if(this.hud.reset(this.track.tokens.length,this.kind===`endless`),t===`results`&&(this.finishT=0,this.showResults()),e.get(`shot`)===`1`&&(this.frozen=!0),e.get(`studio`)){let t=Number(e.get(`air`)??.5),n=e.get(`hud`)===`1`,r=0;for(;!(i.bike.mode===`air`&&i.bike.air.t>=t)&&r++<14400;){i.update(1/120,a.input());for(let e of i.drain())n&&this.hud.event(e)}n&&this.hud.hold();let o=e.get(`matte`);(o===`black`||o===`white`||o===`plate`)&&this.view.studioMatte(o);let s=e.get(`pose`)??`superman`;i.bike.setTrickPose(Number(e.get(`pitch`)??0)*(Math.PI/180),Number(e.get(`yaw`)??0)*(Math.PI/180),s===`none`?null:s),this.frozen=!0,this.hud.show(e.get(`hud`)===`1`),e.get(`hud`)!==`1`&&(document.getElementById(`ui`).style.display=`none`),this.studioCam=e.get(`cam`)?.split(`,`).map(Number)??[150,8,6,0]}}}frozen=!1;studioCam=null;qualityFor(e){return e===`battery`?Uh:e===`high`?Hh:{...Hh,scale:this.qualityScale}}async loadLine(e,t,n){let r=`${e.id}:${e.recipe.seed}`;if(r===this.loadedKey&&this.track)return;let i=new URLSearchParams(location.search);(i.has(`shot`)||i.has(`studio`))&&(t=void 0),t!==void 0&&(this.ui.veil(!0,t,n),await fg(320));let a=$d(e.recipe,od(e.world).style);await this.view.loadWorld(e.world),this.view.setLine(a,e.world,e.recipe.seed),this.applyBike(),this.track=a,this.loadedKey=r,Ju.setMusic(e.world),t!==void 0&&(await fg(60),this.ui.veil(!1))}applyBike(){let e=this.save.data,t=rd(this.mode===`garage`?this.garageBike:e.bike);this.view.setBike(t,e.paints[t.id]??t.paint,zp[e.outfit]??zp.ember)}newRun(e,t=!1){let n=rd(this.save.data.bike),r=new ep(this.track,n,{par:e.par,oneLife:t,assist:this.save.data.settings.assist===`pro`?Tf:wf});return r.obstacles=this.obstacles(),r}obstacles(){return(this.view.props?.obstacles??[]).slice().sort((e,t)=>e.s-t.s)}async loadAttract(e,t=!0){let n=cd(e)[0];this.def=n,this.kind=`tour`,await this.loadLine(n,t?od(e).name:void 0,t?`Loading`:void 0),this.startAttract()}startAttract(){if(!this.def||!this.track)return;this.mode=`attract`;let e=rd(this.save.data.bike);this.run=new ep(this.track,e,{par:this.def.par}),this.bot=new Bf(this.run,{...zf,seed:Math.random()*1e9|0}),this.run.start(!0),this.view.rig.mode=`chase`,this.view.helmet=!1,this.view.rig.dist=5.2,this.view.rig.height=1.9,this.view.rig.snap(),this.view.resetTokens(),this.hud.show(!1),ue(!1)}nextLine(){let e=this.save;for(let t of ad)if(this.worldOpen(t.world)&&e.line(t.id).stars===0)return t;return[...ad].filter(e=>this.worldOpen(e.world)).sort((t,n)=>e.line(t.id).stars-e.line(n.id).stars)[0]??ad[0]}worldOpen(e){return this.save.stars>=od(e).unlock}home(){(this.mode===`garage`||this.mode===`results`||this.mode===`pause`||this.mode===`intro`)&&(this.mode===`garage`&&this.applyBike(),this.startAttract()),this.screen=`home`,this.timeScale=1,this.hud.show(!1),this.ui.home(),Ju.duck(!1)}ride(){this.selectLine(this.nextLine().id)}openLines(e){let t=e??this.def?.world??this.linesWorld;this.linesWorld=t,this.mode!==`attract`&&this.startAttract(),this.def?.world!==t&&this.previewWorld(t),this.screen=`lines`,this.ui.lines(t)}async previewWorld(e){this.linesWorld=e,(this.def?.world!==e||this.mode!==`attract`)&&await this.loadAttract(e,!0)}async selectLine(e){let t=sd(e);t&&(this.kind=`tour`,await this.startIntro(t))}async startIntro(e){this.def=e,await this.loadLine(e,e.name,od(e.world).name),await this.loadGhost(e),this.mode=`intro`,this.screen=`none`,this.run=this.newRun(e,this.kind===`endless`),this.bot=null,this.view.resetTokens(),this.view.rig.mode=`intro`,this.view.rig.introT=0,this.applyCamera(),this.ui.intro(e,{oneLife:this.kind===`endless`,daily:this.kind===`daily`}),Ju.play(`open`,{vol:.6})}ghostKey(e){return this.kind===`endless`?null:this.kind===`daily`?`huckline.ghost.daily`:`huckline.ghost.${e.id}`}ghostStamp(e){return`g1|${e.id}|${this.track?this.track.length.toFixed(1):`0`}|`}async loadGhost(e){this.ghost=null,this.rivalJob=null;let t=this.ghostKey(e);if(!t||!this.track)return;let n=await se.get(t),r=this.ghostStamp(e),i=n&&n.startsWith(r)?Uf.decode(n.slice(r.length)):null;if(i){this.ghost=i,this.ghostLabel=`your best`;return}let a=new ep(this.track,rd(this.save.data.bike),{par:e.par});a.obstacles=this.obstacles();let o=new Bf(a,{...zf,seed:td(e.id)});a.start(!0),this.rivalJob={run:a,bot:o,label:e.rival||`rival`,steps:0}}rivalJob=null;stepRival(e){let t=this.rivalJob;if(!t)return;let n=performance.now(),{run:r,bot:i}=t;for(;r.phase!==`finished`&&t.steps<24e3;)if(r.update(1/120,i.input()),r.drain(),t.steps++,!(t.steps&63)&&performance.now()-n>e)return;this.rivalJob=null,r.phase===`finished`&&!this.ghost&&(this.ghost=r.tape,this.ghostLabel=t.label)}drop(){this.run&&this.def&&(this.ui.clear(),this.mode=`ride`,this.screen=`none`,this.run.reset(),this.run.start(!1),this.countLast=4,this.finishT=-1,this.view.rig.mode=`chase`,this.applyCamera(),this.view.rig.snap(),this.view.resetTokens(),this.view.fx.clear(),this.hud.reset(this.track.tokens.length,this.kind===`endless`),this.hud.pro=this.save.data.settings.assist===`pro`,this.hud.show(!0),this.input.reset(),this.timeScale=1,this.tutorial=!this.save.data.tutorial&&this.def.id===`mesa-1`,this.tutStep=0,this.splitNext=0,this.stepRival(1/0),this.prepareGhostView(),this.ghost&&this.ghostView&&!this.save.data.hints.includes(`ghost`)&&(this.save.data.hints.push(`ghost`),this.save.save(),this.ui.toast(this.ghostLabel===`your best`?`Racing your best run`:`Racing ${this.ghostLabel}'s line. Beat it and your run becomes the ghost.`)),this.coach(null),ue(!0),Ju.duck(!1))}prepareGhostView(){let e=!!this.ghost&&this.save.data.settings.ghost,t=this.save.data.bike;this.ghostView&&(!e||this.ghostBike!==t)&&(this.view.scene.remove(this.ghostView.root),this.ghostView.dispose(),this.ghostView=null),e&&!this.ghostView&&(this.ghostView=new eg(rd(t)),this.ghostBike=t,this.view.scene.add(this.ghostView.root)),this.ghostView?.hide()}ghostFrame(e){let t=this.run,n=this.ghost;if(!n)return;this.ghostView&&t.phase!==`ready`&&(n.sample(t.phase===`countdown`?0:t.time,this.ghostPose),this.ghostView.update(this.ghostPose,e,new U(t.bike.p.x,t.bike.p.y,t.bike.p.z)));let r=[.25,.5,.75];if(t.phase===`riding`&&this.splitNext<r.length&&t.progress>=r[this.splitNext]){let e=n.timeAtS(t.bike.s);Number.isNaN(e)||this.hud.split(t.time-e,this.ghostLabel),this.splitNext++}}pause(){this.mode===`ride`&&(this.mode=`pause`,this.hud.show(!1),this.ui.pause(),Ju.play(`open`,{vol:.5}))}resume(){this.mode===`pause`&&(this.mode=`ride`,this.ui.clear(),this.hud.show(!0),this.input.reset(),this.last=performance.now())}restart(){this.def&&(this.kind===`endless`?this.endless():this.drop())}quit(){this.mode=`results`,this.home()}replay(){!this.lastTape||this.lastTape.frames<2||this.mode!==`results`||(this.mode=`replay`,this.replayT=0,this.ghostView?.hide(),this.view.startReplay(),this.ui.replayOverlay(()=>this.endReplay()),Ju.duck(!1))}endReplay(){if(this.mode===`replay`&&(this.mode=`results`,this.view.rig.mode=`finish`,this.resultsArgs)){let[e,t,n]=this.resultsArgs;this.ui.results(e,t,{...n,best:!1,stars:n.stars,prevStars:n.stars})}}replayFrame(e){let t=this.lastTape,n=t.airAround(this.replayT)>.7?.38:1;this.replayT+=e*n,this.replayT>=t.duration?this.endReplay():(t.sample(this.replayT,this.ghostPose),this.view.replayFrame(e*n,this.ghostPose),this.ui.replayProgress(this.replayT/t.duration))}next(){let e=this.def;if(!e||this.kind!==`tour`)return this.home();let t=cd(e.world),n=t.findIndex(t=>t.id===e.id);if(n>=0&&n<t.length-1)return void this.selectLine(t[n+1].id);let r=id[id.findIndex(t=>t.id===e.world)+1];if(r&&this.worldOpen(r.id))return void this.selectLine(cd(r.id)[0].id);this.openLines(e.world)}async daily(){this.kind=`daily`,await this.startIntro(cf())}async endless(){this.kind=`endless`;let e=td(`endless-${Date.now()}`);await this.startIntro(uf(e))}dailyBest(){let e=this.save.data.daily;return e.date===sf()?e.best:0}async trophies(){if(!(await ug.status()||await ug.signIn()))this.ui.toast(`Sign in to ${ug.name} to see your trophies`);else{for(let e of this.save.data.feats)ug.unlock(e);await ug.show(`achievements`)||this.ui.toast(`${ug.name} is not available right now`)}}openGarage(){this.mode=`garage`,this.screen=`none`,this.garageBike=this.save.data.bike,this.hud.show(!1);let e=rd(this.garageBike);this.run=new ep(this.track,e,{}),this.bot=null,this.applyBike(),this.ui.garage(this.garageBike)}openSettings(){let e=this.mode===`pause`?`pause`:`menu`;this.settingsBack=e===`pause`?()=>this.ui.pause():()=>this.home(),this.screen=`settings`,this.ui.settings(()=>this.settingsBack?.())}back(){if(this.mode===`replay`)return this.endReplay();if(this.mode===`ride`)return this.pause();if(this.mode===`pause`)return this.screen===`settings`?this.ui.pause():this.resume();if(this.screen===`home`&&this.mode===`attract`)return pe();this.home()}openLink(e){fe(e)}previewBike(e){this.garageBike=e,this.applyBike()}buyBike(e){let t=this.save.data,n=rd(e);return t.bikes.includes(e)?!0:t.coins<n.price?(Ju.play(`error`),F.warning(),this.ui.toast(`You need ${(n.price-t.coins).toLocaleString(`en-US`)} more coins`),!1):(t.coins-=n.price,t.bikes.push(e),t.bike=e,this.save.save(),Ju.play(`buy`),F.success(),this.unlock(`new_bike`),!0)}equipBike(e){this.save.data.bike=e,this.save.save(),Ju.play(`toggle`)}setPaint(e,t){this.save.data.paints[e]={...t},this.save.save(),this.view.setPaint(t)}setOutfit(e){this.save.data.outfit=e,this.save.save(),this.view.setOutfit(zp[e])}outfitOpen(e){let t=gm[e]??0;return{open:this.save.stars>=t,need:t}}lineStars(e,t){return 1+ +(t>=e.goals[0])+ +(t>=e.goals[1])}applySettings(e,t=!0){this.save.data.settings={...e},Ju.sound=e.sound,Ju.musicVol=e.music,Ju.applyVolumes(),F.enabled=e.haptics,this.input.invertFlip=e.invert,this.input.swap=e.lefty,this.input.fixed=e.stick===`fixed`,this.run&&(this.run.bike.assist=e.assist===`pro`?Tf:wf),this.view.setQuality(this.qualityFor(e.quality)),this.applyCamera(),t&&this.save.save()}applyCamera(){let e=this.save.data.settings.camera,t=e===`far`;this.view.rig.dist=t?4.6:3.7,this.view.rig.height=t?1.9:1.55,this.view.helmet=e===`helmet`&&(this.mode===`ride`||this.mode===`pause`)}loop=e=>{let t=Math.min(.05,(e-this.last)/1e3);this.last=e,this.frameMs+=(t*1e3-this.frameMs)*.05,this.autoQuality(t);let n=t*this.timeScale,r=this.run;if(r){if(this.mode===`attract`&&this.bot){r.update(n,this.bot.input());for(let e of r.drain())this.view.onEvent(e,r),this.sounds(e,.35);r.phase===`finished`?(this.finishT+=t,(this.finishT>2.5||this.finishT<0)&&(this.finishT=0,this.startAttract())):this.finishT=-1}else if(this.mode===`ride`)this.frozen?this.hud.update(r,this.input,t):this.rideFrame(n,t);else if(this.mode===`intro`)this.stepRival(5);else if(this.mode===`replay`)this.replayFrame(t);else if(this.mode===`results`){r.update(n,{steer:0,flip:0,hold:!1,style:null});for(let e of r.drain())this.view.onEvent(e,r)}}if(this.view.setGarage(this.mode===`garage`),this.mode===`garage`&&this.run){this.garageAngle+=t*.35,this.view.update(t,this.run);let e=this.run.bike;this.view.rig.studio(t,new U(e.p.x,e.p.y,e.p.z),e.heading+Math.PI/2+Math.sin(this.garageAngle)*.9,4.3,1.15)}else this.view.update(t,r,{hold:this.input.hold});if(this.studioCam&&r){let e=r.bike,[t,n,i,a,o,s,c]=this.studioCam;Math.hypot(e.v.x,e.v.z);let l=$.uSunDir.value,u=(s?Math.atan2(-l.z,-l.x):Math.atan2(e.v.z,e.v.x))+t*Math.PI/180,d=n*Math.PI/180,f=this.view.rig.cam;f.position.set(e.p.x+Math.cos(u)*Math.cos(d)*i,e.p.y+.9+Math.sin(d)*i,e.p.z+Math.sin(u)*Math.cos(d)*i);let p=new U(e.p.x,e.p.y+.9+(a||0),e.p.z);if(c){let e=p.x-f.position.x,t=p.z-f.position.z,n=Math.hypot(e,t)||1;p.x-=-t/n*c,p.z-=e/n*c}f.lookAt(p),f.fov=o||50,f.updateProjectionMatrix()}if(r){let e=r.bike,t=this.track?Math.max(0,1-Math.abs(e.s-this.track.finishS)/70):0;Ju.ride({speed:e.speed,air:e.mode===`air`,ground:e.mode===`ground`,surface:e.surface,sliding:e.sliding,coasting:e.speed>9.6||this.input.hold,finishNear:t,active:this.mode===`ride`||this.mode===`attract`,rough:e.rough,flow:this.mode===`ride`?r.flow:0})}this.view.render(),window.__frames=this.view.frames,requestAnimationFrame(this.loop)};rideFrame(e,t){let n=this.run,r=this.input;if(n.phase===`countdown`){let e=Math.ceil(n.countdown);e!==this.countLast&&e>0&&e<=3&&(this.countLast=e,this.hud.countdown(String(e)),Ju.play(`count`),F.tick())}n.update(e,this.bot?this.bot.input():{steer:r.stick.x,throttle:n.bike.mode===`ground`?r.stick.ry:0,flip:r.stick.y,hold:r.hold,style:r.consumeStyle()}),r.air=n.bike.mode===`air`;for(let e of n.drain())this.onEvent(e);this.ghostFrame(t),this.hud.update(n,r,t),this.tutorial?this.tutorialStep(t):this.hints(t),n.phase===`finished`&&(this.finishT<0&&(this.finishT=0),this.finishT+=t,this.finishT>(this.kind===`endless`?.6:1.7)&&this.showResults())}onEvent(e){let t=this.run;this.view.onEvent(e,t),this.hud.event(e),this.sounds(e,1);let n=this.save.data.stats;switch(e.t){case`go`:this.hud.countdown(`DROP`),Ju.play(`go`),F.medium();break;case`takeoff`:this.input.anchor(),e.popped&&F.light();break;case`pop`:F.light();break;case`close`:F.light();break;case`land`:{if(e.land.micro||e.land.air.t<.15?this.input.restore():this.input.anchor(),e.land.micro)break;let t=e.land.quality,r=e.land.impact;if(t===`bail`)break;r>9?F.heavy():r>4?F.medium():F.light(),t===`perfect`&&e.trick.trick&&F.success();let i=e.trick;n.airtime+=e.land.air.t,i.trick&&(n.tricks++,i.flips!==0&&(n.flips+=Math.abs(i.flips)),i.spins&&(n.spins+=i.spins),i.points>n.bestTrick&&(n.bestTrick=i.points,n.bestTrickName=i.name,ug.submit(`best_trick`,i.points))),t===`perfect`&&n.perfects++,this.featsForLanding(e);break}case`bail`:n.bails++,F.error(),this.timeScale=1,this.coach(null);break;case`token`:n.tokens++,F.light();break;case`gap`:n.gaps++,(e.name===`Canyon Gap`||e.name===`Mesa Gap`)&&this.unlock(`canyon`),e.name===`The Big Send`&&this.unlock(`big_send`),F.medium();break;case`chain`:t.mult>=5&&this.unlock(`chain5`),t.mult>=10&&this.unlock(`chain10`);break;case`finish`:F.success(),ue(!1),this.ghost&&this.ghost.time>0&&this.hud.split(t.time-this.ghost.time,this.ghostLabel,!0)}}sounds(e,t){let n=this.run;switch(e.t){case`takeoff`:e.popped&&Ju.play(`pop`,{vol:.8*t});break;case`pop`:Ju.play(`pop`,{vol:.8*t});break;case`close`:Ju.play(`whoosh`,{vol:.7*t,rate:1.35});break;case`flow`:e.on&&Ju.play(`unlock`,{vol:.45*t});break;case`style`:Ju.play(e.kind===`tailwhip`?`whip`:e.kind===`barspin`?`barspin`:`whoosh`,{vol:.8*t});break;case`land`:if(e.land.micro){e.land.impact>2&&Ju.play(`land`,{vol:.25*t,rate:1.2});break}if(e.land.quality===`bail`)break;Ju.play(e.land.impact>9?`landHard`:`land`,{vol:Math.min(1,.4+e.land.impact*.07)*t,vary:.1}),e.land.quality===`perfect`&&e.trick.trick&&Ju.play(`perfect`,{vol:.5*t,delay:.05});break;case`bail`:Ju.play(`bail`,{vol:t});break;case`token`:Ju.play(`token`,{vol:.8*t});break;case`gap`:Ju.play(`gap`,{vol:.7*t});break;case`chain`:n&&n.mult>1&&Ju.play(`chain`,{vol:.55*t,variant:Math.min(7,n.mult-2)});break;case`lost`:Ju.play(`lost`,{vol:.6*t});break;case`finish`:Ju.play(`finish`,{vol:.8*t}),Ju.play(`cheer`,{vol:.7*t,delay:.1})}}hintT=0;hints(e){let t=this.run,n=t.bike,r=this.save.data.hints;if(this.coachOn){this.hintT+=e,(this.hintT>4.2||t.phase!==`riding`)&&(this.coach(null),this.timeScale=1);return}if(t.phase!==`riding`||n.mode!==`ground`)return;let i=e=>{r.push(e),this.save.save(),this.hintT=0,this.coach(e)};if(!r.includes(`brake`)){for(let e of this.track.featuresNear(n.s+30))if(e.kind===`corner`&&e.s0-n.s<34&&e.s0>n.s&&e.s1-e.s0>25)return i(`brake`)}if(!r.includes(`roots`)&&this.track.rough(n.s+12)===1)return i(`roots`);if(!r.includes(`flow`)&&t.flow>.45)return i(`flow`)}coach(e){e!==this.coachOn&&(this.coachOn=e,this.coachT=0,this.hud.coach(e))}tutorialStep(e){let t=this.run,n=t.bike;if(this.coachT+=e,t.phase!==`riding`)this.timeScale=1;else switch(this.tutStep){case 0:this.coach(`steer`),(Math.abs(this.input.stick.x)>.3&&this.coachT>1.2||this.coachT>5)&&(this.tutStep=1,this.coach(null));break;case 1:{let e=n.nextLip();n.mode===`ground`&&e!==null&&e-n.s<26&&e-n.s>0&&(this.coach(`pop`),this.timeScale=.55),n.mode===`air`&&(this.timeScale=1,this.coach(null),this.tutStep=2);break}case 2:n.mode===`air`&&n.air.t>.12&&n.landIn>.7&&(this.coach(`flip`),this.timeScale=.4,this.tutStep=3);break;case 3:(n.mode!==`air`||Math.abs(n.air.pitch)>2.2)&&(this.timeScale=1,n.mode!==`air`&&(this.coach(null),this.tutStep=4));break;case 4:n.mode===`air`&&n.air.t>.12&&n.landIn>.6&&(this.coach(`whip`),this.timeScale=.45,this.tutStep=5);break;case 5:(n.style||n.mode!==`air`)&&(this.timeScale=1,n.mode!==`air`&&(this.coach(`chain`),this.tutStep=6));break;case 6:this.coachT>3&&(this.coach(null),this.tutStep=7)}}showResults(){let e=this.run,t=this.def,n=e.result;this.mode=`results`,this.hud.show(!1),this.coach(null),this.timeScale=1,this.view.rig.mode=`finish`;let r=this.save.data;r.stats.runs++,r.stats.distance+=Math.max(0,e.bike.s-e.track.startS);let i=0,a=0,o=!1,s=Math.round(n.score/60)+n.tokens.filter(Boolean).length*40;if(this.kind===`tour`){let e=this.save.line(t.id);a=e.stars,i=this.lineStars(t,n.score),o=n.score>e.best;let c=e.tokens.map((e,t)=>e||!!n.tokens[t]),l=Math.max(0,i-e.stars);s+=l*120,r.lines[t.id]={best:Math.max(e.best,n.score),stars:Math.max(e.stars,i),time:o||!e.time?n.time:Math.min(e.time,n.time),tokens:c,plays:e.plays+1},t.id===`mesa-1`&&(r.tutorial=!0),c.every(Boolean)&&this.unlock(`tokens_line`),i>=3&&this.unlock(`three_stars`),cd(`mesa`).every(e=>this.save.line(e.id).stars>=3)&&this.unlock(`mesa_master`);for(let e of id)e.unlock>0&&this.worldOpen(e.id)&&this.unlock(`world_${e.id}`);ug.submit(`stars`,this.save.stars);let u=id.find(e=>e.unlock>0&&this.save.stars>=e.unlock&&this.save.stars-l<e.unlock);u&&setTimeout(()=>{this.ui.toast(`${u.name} is open`),Ju.play(`unlock`)},2200)}else if(this.kind===`daily`){let e=r.daily,a=sf();if(e.date!==a){let t=sf(new Date(Date.now()-864e5));e.streak=e.last===t?e.streak+1:1,e.date=a,e.best=0,e.plays=0}e.last=a,e.plays++,o=n.score>e.best,e.best=Math.max(e.best,n.score),ug.submit(`daily`,n.score),e.streak>=3&&this.unlock(`daily3`),i=this.lineStars(t,n.score)}else o=n.score>r.endless.best,r.endless.best=Math.max(r.endless.best,n.score),r.endless.runs++,ug.submit(`endless`,n.score),n.score>=1e4&&this.unlock(`endless10k`);this.unlock(`first_drop`),r.stats.tricks>=100&&this.unlock(`tricks100`);let c=this.ghostKey(t);c&&o&&e.phase===`finished`&&(se.set(c,this.ghostStamp(t)+e.tape.encode()),this.ghost=e.tape,this.ghostLabel=`your best`),r.coins+=s,this.save.save(),Ju.duck(!0),setTimeout(()=>Ju.duck(!1),4e3);let l=this.kind===`tour`;this.lastTape=e.tape,this.resultsArgs=[t,n,{stars:i,prevStars:a,best:o,coins:s,oneLife:this.kind===`endless`,daily:this.kind===`daily`,hasNext:l}],this.ui.results(...this.resultsArgs);for(let e=0;e<(this.kind===`endless`?0:i);e++)setTimeout(()=>{Ju.play(`star`,{variant:e}),F.light()},900+e*280);o&&setTimeout(()=>Ju.play(`best`,{vol:.7}),1900),setTimeout(()=>Ju.play(`coin`,{vol:.6}),600),!r.reviewAsked&&i>=3&&r.stats.runs>=6&&(r.reviewAsked=!0,this.save.save(),setTimeout(()=>de(),2600))}featsForLanding(e){let t=e.trick;t.flips>=1&&this.unlock(`backflip`),t.flips<=-1&&this.unlock(`frontflip`),t.flips>=2&&this.unlock(`double_back`),t.spins>=2&&this.unlock(`spin_720`);for(let t of e.land.air.styles)t.kind===`tailwhip`&&this.unlock(t.n>=2?`double_whip`:`tailwhip`),t.kind===`tailwhip`&&t.n>=2&&this.unlock(`tailwhip`),t.kind===`barspin`&&this.unlock(`barspin`),t.kind===`superman`&&t.held>=1&&this.unlock(`superman`);e.land.air.t>=2.5&&this.unlock(`big_air`),this.run&&this.run.perfects>=10&&this.unlock(`perfect10`)}unlock(e){let t=this.save.data;t.feats.includes(e)||tg.some(t=>t.id===e)&&(t.feats.push(e),this.save.save(),ug.unlock(e))}autoQuality(e){if(this.save.data.settings.quality!==`auto`||(this.qTimer+=e,this.qTimer<2.5))return;this.qTimer=0;let t=this.frameMs,n=this.qualityScale;t>21&&n>.6?n=Math.max(.6,n-.1):t<14.5&&n<1&&(n=Math.min(1,n+.05)),n!==this.qualityScale&&(this.qualityScale=n,this.view.setQuality(this.qualityFor(`auto`)))}},fg=e=>new Promise(t=>setTimeout(t,e));(async()=>{await ce();try{await Promise.race([document.fonts.ready,new Promise(e=>setTimeout(e,1500))])}catch{}let e=new dg;window.__game=e,await e.boot(document.getElementById(`ui`),document.getElementById(`gl`))})();export{y as n,o as r,v as t};