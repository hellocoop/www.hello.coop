!function(){"use strict";function e(){}const t=e=>e;function n(e){return e()}function r(){return Object.create(null)}function o(e){e.forEach(n)}function s(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let i;function l(e,t){return i||(i=document.createElement("a")),i.href=t,e===i.href}const u="undefined"!=typeof window;let c=u?()=>window.performance.now():()=>Date.now(),d=u?e=>requestAnimationFrame(e):e;const p=new Set;function f(e){p.forEach((t=>{t.c(e)||(p.delete(t),t.f())})),0!==p.size&&d(f)}function h(e){let t;return 0===p.size&&d(f),{promise:new Promise((n=>{p.add(t={c:e,f:n})})),abort(){p.delete(t)}}}function m(e,t){e.appendChild(t)}function v(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function y(e){const t=b("style");return function(e,t){m(e.head||e,t)}(v(e),t),t}function g(e,t,n){e.insertBefore(t,n||null)}function w(e){e.parentNode.removeChild(e)}function b(e){return document.createElement(e)}function E(e){return document.createTextNode(e)}function _(){return E(" ")}function T(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function $(e,t,n,r){e.style.setProperty(t,n,r?"important":"")}function x(e){const t={};for(const n of e)t[n.name]=n.value;return t}const A=new Set;let C,N=0;function S(e,t,n,r,o,s,a,i=0){const l=16.666/r;let u="{\n";for(let e=0;e<=1;e+=l){const r=t+(n-t)*s(e);u+=100*e+`%{${a(r,1-r)}}\n`}const c=u+`100% {${a(n,1-n)}}\n}`,d=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(c)}_${i}`,p=v(e);A.add(p);const f=p.__svelte_stylesheet||(p.__svelte_stylesheet=y(e).sheet),h=p.__svelte_rules||(p.__svelte_rules={});h[d]||(h[d]=!0,f.insertRule(`@keyframes ${d} ${c}`,f.cssRules.length));const m=e.style.animation||"";return e.style.animation=`${m?`${m}, `:""}${d} ${r}ms linear ${o}ms 1 both`,N+=1,d}function O(e,t){const n=(e.style.animation||"").split(", "),r=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),o=n.length-r.length;o&&(e.style.animation=r.join(", "),N-=o,N||d((()=>{N||(A.forEach((e=>{const t=e.__svelte_stylesheet;let n=t.cssRules.length;for(;n--;)t.deleteRule(n);e.__svelte_rules={}})),A.clear())})))}function k(e){C=e}function L(e){(function(){if(!C)throw new Error("Function called outside component initialization");return C})().$$.on_mount.push(e)}const M=[],D=[],R=[],P=[],j=Promise.resolve();let F=!1;function H(e){R.push(e)}let Q=!1;const I=new Set;function U(){if(!Q){Q=!0;do{for(let e=0;e<M.length;e+=1){const t=M[e];k(t),q(t.$$)}for(k(null),M.length=0;D.length;)D.pop()();for(let e=0;e<R.length;e+=1){const t=R[e];I.has(t)||(I.add(t),t())}R.length=0}while(M.length);for(;P.length;)P.pop()();F=!1,Q=!1,I.clear()}}function q(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}let G;function Y(){return G||(G=Promise.resolve(),G.then((()=>{G=null}))),G}function z(e,t,n){e.dispatchEvent(function(e,t,n=!1){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,!1,t),r}(`${t?"intro":"outro"}${n}`))}const V=new Set;let W;function J(){W={r:0,c:[],p:W}}function X(){W.r||o(W.c),W=W.p}function B(e,t){e&&e.i&&(V.delete(e),e.i(t))}function Z(e,t,n,r){if(e&&e.o){if(V.has(e))return;V.add(e),W.c.push((()=>{V.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}}const K={duration:0};function ee(n,r,o){let a,i,l=r(n,o),u=!1,d=0;function p(){a&&O(n,a)}function f(){const{delay:r=0,duration:o=300,easing:s=t,tick:f=e,css:m}=l||K;m&&(a=S(n,0,1,o,r,s,m,d++)),f(0,1);const v=c()+r,y=v+o;i&&i.abort(),u=!0,H((()=>z(n,!0,"start"))),i=h((e=>{if(u){if(e>=y)return f(1,0),z(n,!0,"end"),p(),u=!1;if(e>=v){const t=s((e-v)/o);f(t,1-t)}}return u}))}let m=!1;return{start(){m||(m=!0,O(n),s(l)?(l=l(),Y().then(f)):f())},invalidate(){m=!1},end(){u&&(p(),u=!1)}}}function te(n,r,a){let i,l=r(n,a),u=!0;const d=W;function p(){const{delay:r=0,duration:s=300,easing:a=t,tick:p=e,css:f}=l||K;f&&(i=S(n,1,0,s,r,a,f));const m=c()+r,v=m+s;H((()=>z(n,!1,"start"))),h((e=>{if(u){if(e>=v)return p(0,1),z(n,!1,"end"),--d.r||o(d.c),!1;if(e>=m){const t=a((e-m)/s);p(1-t,t)}}return u}))}return d.r+=1,s(l)?Y().then((()=>{l=l(),p()})):p(),{end(e){e&&l.tick&&l.tick(1,0),u&&(i&&O(n,i),u=!1)}}}function ne(e,t){-1===e.$$.dirty[0]&&(M.push(e),F||(F=!0,j.then(U)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function re(t,a,i,l,u,c,d,p=[-1]){const f=C;k(t);const h=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:u,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:a.context||[]),callbacks:r(),dirty:p,skip_bound:!1,root:a.target||f.$$.root};d&&d(h.root);let m=!1;if(h.ctx=i?i(t,a.props||{},((e,n,...r)=>{const o=r.length?r[0]:n;return h.ctx&&u(h.ctx[e],h.ctx[e]=o)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](o),m&&ne(t,e)),n})):[],h.update(),m=!0,o(h.before_update),h.fragment=!!l&&l(h.ctx),a.target){if(a.hydrate){const e=function(e){return Array.from(e.childNodes)}(a.target);h.fragment&&h.fragment.l(e),e.forEach(w)}else h.fragment&&h.fragment.c();a.intro&&B(t.$$.fragment),function(e,t,r,a){const{fragment:i,on_mount:l,on_destroy:u,after_update:c}=e.$$;i&&i.m(t,r),a||H((()=>{const t=l.map(n).filter(s);u?u.push(...t):o(t),e.$$.on_mount=[]})),c.forEach(H)}(t,a.target,a.anchor,a.customElement),U()}k(f)}let oe;function se(e){return Math.sin(-13*(e+1)*Math.PI/2)*Math.pow(2,-10*e)+1}"function"==typeof HTMLElement&&(oe=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:e}=this.$$;this.$$.on_disconnect=e.map(n).filter(s);for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(e,t,n){this[e]=n}disconnectedCallback(){o(this.$$.on_disconnect)}$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}});"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function ae(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ie,le=ae((function(e,t){"undefined"!=typeof self&&self,e.exports=(()=>{var e={75:function(e){(function(){var t,n,r,o,s,a;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(e.exports=function(){return(t()-s)/1e6},n=process.hrtime,o=(t=function(){var e;return 1e9*(e=n())[0]+e[1]})(),a=1e9*process.uptime(),s=o-a):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)},4087:(e,t,n)=>{for(var r=n(75),o="undefined"==typeof window?n.g:window,s=["moz","webkit"],a="AnimationFrame",i=o["request"+a],l=o["cancel"+a]||o["cancelRequest"+a],u=0;!i&&u<s.length;u++)i=o[s[u]+"Request"+a],l=o[s[u]+"Cancel"+a]||o[s[u]+"CancelRequest"+a];if(!i||!l){var c=0,d=0,p=[];i=function(e){if(0===p.length){var t=r(),n=Math.max(0,16.666666666666668-(t-c));c=n+t,setTimeout((function(){var e=p.slice(0);p.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c)}catch(e){setTimeout((function(){throw e}),0)}}),Math.round(n))}return p.push({handle:++d,callback:e,cancelled:!1}),d},l=function(e){for(var t=0;t<p.length;t++)p[t].handle===e&&(p[t].cancelled=!0)}}e.exports=function(e){return i.call(o,e)},e.exports.cancel=function(){l.apply(o,arguments)},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=i,e.cancelAnimationFrame=l}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{n.d(r,{default:()=>x});var e=n(4087),t=n.n(e);const o=function(e){return new RegExp(/<[a-z][\s\S]*>/i).test(e)},s=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes},a=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};var i="TYPE_CHARACTER",l="REMOVE_CHARACTER",u="REMOVE_ALL",c="REMOVE_LAST_VISIBLE_NODE",d="PAUSE_FOR",p="CALL_FUNCTION",f="ADD_HTML_TAG_ELEMENT",h="CHANGE_DELETE_SPEED",m="CHANGE_DELAY",v="CHANGE_CURSOR",y="PASTE_STRING",g="HTML_TAG";function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){$(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function E(e){return function(e){if(Array.isArray(e))return _(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const x=function(){function n(r,w){var _=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),$(this,"state",{cursorAnimation:null,lastFrameTime:null,pauseUntil:null,eventQueue:[],eventLoop:null,eventLoopPaused:!1,reverseCalledEvents:[],calledEvents:[],visibleNodes:[],initialOptions:null,elements:{container:null,wrapper:document.createElement("span"),cursor:document.createElement("span")}}),$(this,"options",{strings:null,cursor:"|",delay:"natural",pauseFor:1500,deleteSpeed:"natural",loop:!1,autoStart:!1,devMode:!1,skipAddStyles:!1,wrapperClassName:"Typewriter__wrapper",cursorClassName:"Typewriter__cursor",stringSplitter:null,onCreateTextNode:null,onRemoveNode:null}),$(this,"setupWrapperElement",(function(){_.state.elements.container&&(_.state.elements.wrapper.className=_.options.wrapperClassName,_.state.elements.cursor.className=_.options.cursorClassName,_.state.elements.cursor.innerHTML=_.options.cursor,_.state.elements.container.innerHTML="",_.state.elements.container.appendChild(_.state.elements.wrapper),_.state.elements.container.appendChild(_.state.elements.cursor))})),$(this,"start",(function(){return _.state.eventLoopPaused=!1,_.runEventLoop(),_})),$(this,"pause",(function(){return _.state.eventLoopPaused=!0,_})),$(this,"stop",(function(){return _.state.eventLoop&&((0,e.cancel)(_.state.eventLoop),_.state.eventLoop=null),_})),$(this,"pauseFor",(function(e){return _.addEventToQueue(d,{ms:e}),_})),$(this,"typeOutAllStrings",(function(){return"string"==typeof _.options.strings?(_.typeString(_.options.strings).pauseFor(_.options.pauseFor),_):(_.options.strings.forEach((function(e){_.typeString(e).pauseFor(_.options.pauseFor).deleteAll(_.options.deleteSpeed)})),_)})),$(this,"typeString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(o(e))return _.typeOutHTMLString(e,t);if(e){var n=(_.options||{}).stringSplitter,r="function"==typeof n?n(e):e.split("");_.typeCharacters(r,t)}return _})),$(this,"pasteString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return o(e)?_.typeOutHTMLString(e,t,!0):(e&&_.addEventToQueue(y,{character:e,node:t}),_)})),$(this,"typeOutHTMLString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=s(e);if(r.length>0)for(var o=0;o<r.length;o++){var a=r[o],i=a.innerHTML;a&&3!==a.nodeType?(a.innerHTML="",_.addEventToQueue(f,{node:a,parentNode:t}),n?_.pasteString(i,a):_.typeString(i,a)):a.textContent&&(n?_.pasteString(a.textContent,t):_.typeString(a.textContent,t))}return _})),$(this,"deleteAll",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"natural";return _.addEventToQueue(u,{speed:e}),_})),$(this,"changeDeleteSpeed",(function(e){if(!e)throw new Error("Must provide new delete speed");return _.addEventToQueue(h,{speed:e}),_})),$(this,"changeDelay",(function(e){if(!e)throw new Error("Must provide new delay");return _.addEventToQueue(m,{delay:e}),_})),$(this,"changeCursor",(function(e){if(!e)throw new Error("Must provide new cursor");return _.addEventToQueue(v,{cursor:e}),_})),$(this,"deleteChars",(function(e){if(!e)throw new Error("Must provide amount of characters to delete");for(var t=0;t<e;t++)_.addEventToQueue(l);return _})),$(this,"callFunction",(function(e,t){if(!e||"function"!=typeof e)throw new Error("Callbak must be a function");return _.addEventToQueue(p,{cb:e,thisArg:t}),_})),$(this,"typeCharacters",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(e){_.addEventToQueue(i,{character:e,node:t})})),_})),$(this,"removeCharacters",(function(e){if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(){_.addEventToQueue(l)})),_})),$(this,"addEventToQueue",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return _.addEventToStateProperty(e,t,n,"eventQueue")})),$(this,"addReverseCalledEvent",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return _.options.loop?_.addEventToStateProperty(e,t,n,"reverseCalledEvents"):_})),$(this,"addEventToStateProperty",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3?arguments[3]:void 0,o={eventName:e,eventArgs:t||{}};return _.state[r]=n?[o].concat(E(_.state[r])):[].concat(E(_.state[r]),[o]),_})),$(this,"runEventLoop",(function(){_.state.lastFrameTime||(_.state.lastFrameTime=Date.now());var e=Date.now(),n=e-_.state.lastFrameTime;if(!_.state.eventQueue.length){if(!_.options.loop)return;_.state.eventQueue=E(_.state.calledEvents),_.state.calledEvents=[],_.options=b({},_.state.initialOptions)}if(_.state.eventLoop=t()(_.runEventLoop),!_.state.eventLoopPaused){if(_.state.pauseUntil){if(e<_.state.pauseUntil)return;_.state.pauseUntil=null}var r,o=E(_.state.eventQueue),s=o.shift();if(!(n<=(r=s.eventName===c||s.eventName===l?"natural"===_.options.deleteSpeed?a(40,80):_.options.deleteSpeed:"natural"===_.options.delay?a(120,160):_.options.delay))){var w=s.eventName,T=s.eventArgs;switch(_.logInDevMode({currentEvent:s,state:_.state,delay:r}),w){case y:case i:var $=T.character,x=T.node,A=document.createTextNode($),C=A;_.options.onCreateTextNode&&"function"==typeof _.options.onCreateTextNode&&(C=_.options.onCreateTextNode($,A)),C&&(x?x.appendChild(C):_.state.elements.wrapper.appendChild(C)),_.state.visibleNodes=[].concat(E(_.state.visibleNodes),[{type:"TEXT_NODE",character:$,node:C}]);break;case l:o.unshift({eventName:c,eventArgs:{removingCharacterNode:!0}});break;case d:var N=s.eventArgs.ms;_.state.pauseUntil=Date.now()+parseInt(N);break;case p:var S=s.eventArgs,O=S.cb,k=S.thisArg;O.call(k,{elements:_.state.elements});break;case f:var L=s.eventArgs,M=L.node,D=L.parentNode;D?D.appendChild(M):_.state.elements.wrapper.appendChild(M),_.state.visibleNodes=[].concat(E(_.state.visibleNodes),[{type:g,node:M,parentNode:D||_.state.elements.wrapper}]);break;case u:var R=_.state.visibleNodes,P=T.speed,j=[];P&&j.push({eventName:h,eventArgs:{speed:P,temp:!0}});for(var F=0,H=R.length;F<H;F++)j.push({eventName:c,eventArgs:{removingCharacterNode:!1}});P&&j.push({eventName:h,eventArgs:{speed:_.options.deleteSpeed,temp:!0}}),o.unshift.apply(o,j);break;case c:var Q=s.eventArgs.removingCharacterNode;if(_.state.visibleNodes.length){var I=_.state.visibleNodes.pop(),U=I.type,q=I.node,G=I.character;_.options.onRemoveNode&&"function"==typeof _.options.onRemoveNode&&_.options.onRemoveNode({node:q,character:G}),q&&q.parentNode.removeChild(q),U===g&&Q&&o.unshift({eventName:c,eventArgs:{}})}break;case h:_.options.deleteSpeed=s.eventArgs.speed;break;case m:_.options.delay=s.eventArgs.delay;break;case v:_.options.cursor=s.eventArgs.cursor,_.state.elements.cursor.innerHTML=s.eventArgs.cursor}_.options.loop&&(s.eventName===c||s.eventArgs&&s.eventArgs.temp||(_.state.calledEvents=[].concat(E(_.state.calledEvents),[s]))),_.state.eventQueue=o,_.state.lastFrameTime=e}}})),r)if("string"==typeof r){var T=document.querySelector(r);if(!T)throw new Error("Could not find container element");this.state.elements.container=T}else this.state.elements.container=r;w&&(this.options=b(b({},this.options),w)),this.state.initialOptions=b({},this.options),this.init()}var r;return(r=[{key:"init",value:function(){var e,t;this.setupWrapperElement(),this.addEventToQueue(v,{cursor:this.options.cursor},!0),this.addEventToQueue(u,null,!0),!window||window.___TYPEWRITER_JS_STYLES_ADDED___||this.options.skipAddStyles||(e=".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}",(t=document.createElement("style")).appendChild(document.createTextNode(e)),document.head.appendChild(t),window.___TYPEWRITER_JS_STYLES_ADDED___=!0),!0===this.options.autoStart&&this.options.strings&&this.typeOutAllStrings().start()}},{key:"logInDevMode",value:function(e){this.options.devMode&&console.log(e)}}])&&T(n.prototype,r),n}()})(),r.default})()}(ie={exports:{}},ie.exports),ie.exports));function ue(t){let n,r,o,s,a;return{c(){n=b("h1"),n.textContent="say Hellō how",o=_(),s=b("h1"),s.textContent="you want",T(n,"class","text-2xl md:text-4xl font-bold absolute"),$(n,"color","#303030"),T(s,"class","text-2xl md:text-4xl font-bold absolute mt-8 md:mt-12"),$(s,"color","#303030")},m(e,t){g(e,n,t),g(e,o,t),g(e,s,t)},p:e,i(e){r||H((()=>{r=ee(n,t[5],{type:"text"}),r.start()})),a||H((()=>{a=ee(s,t[5],{type:"text"}),a.start()}))},o:e,d(e){e&&w(n),e&&w(o),e&&w(s)}}}function ce(t){let n,r,o;return{c(){n=b("h1"),T(n,"id","say-hello-with"),T(n,"class","text-2xl md:text-4xl absolute font-bold"),$(n,"color","#303030")},m(e,r){g(e,n,r),t[9](n),o=!0},p:e,i(e){o||(r&&r.end(1),o=!0)},o(e){r=te(n,t[6],{duration:200}),o=!1},d(e){e&&w(n),t[9](null),e&&r&&r.end()}}}function de(t){let n,r,o=t[0],s=pe(t);return{c(){s.c(),n=E("")},m(e,t){s.m(e,t),g(e,n,t),r=!0},p(t,r){1&r&&a(o,o=t[0])?(J(),Z(s,1,1,e),X(),s=pe(t),s.c(),B(s),s.m(n.parentNode,n)):s.p(t,r)},i(e){r||(B(s),r=!0)},o(e){Z(s),r=!1},d(e){e&&w(n),s.d(e)}}}function pe(e){let t,n,r,o,s,a;return{c(){t=b("img"),l(t.src,n=e[4][e[0]].link)||T(t,"src",n),T(t,"alt",r=e[4][e[0]].alt),T(t,"class","mt-10 md:mt-12 absolute h-6 md:h-8")},m(e,n){g(e,t,n),a=!0},p(e,o){(!a||1&o&&!l(t.src,n=e[4][e[0]].link))&&T(t,"src",n),(!a||1&o&&r!==(r=e[4][e[0]].alt))&&T(t,"alt",r)},i(n){a||(H((()=>{s&&s.end(1),o=ee(t,e[5],{}),o.start()})),a=!0)},o(n){o&&o.invalidate(),s=te(t,e[6],{}),a=!1},d(e){e&&w(t),e&&s&&s.end()}}}function fe(t){let n,r,o,s,a,i,l;const u=[ce,ue],c=[];function d(e,t){return e[3]?1:0}r=d(t),o=c[r]=u[r](t);let p=t[4].length&&t[2]&&de(t);return{c(){n=b("div"),o.c(),s=_(),p&&p.c(),a=_(),i=b("link"),this.c=e,T(n,"class","flex flex-col items-center"),T(i,"href","https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"),T(i,"rel","stylesheet")},m(e,t){g(e,n,t),c[r].m(n,null),m(n,s),p&&p.m(n,null),g(e,a,t),g(e,i,t),l=!0},p(e,[t]){let a=r;r=d(e),r===a?c[r].p(e,t):(J(),Z(c[a],1,1,(()=>{c[a]=null})),X(),o=c[r],o?o.p(e,t):(o=c[r]=u[r](e),o.c()),B(o,1),o.m(n,s)),e[4].length&&e[2]?p?(p.p(e,t),4&t&&B(p,1)):(p=de(e),p.c(),B(p,1),p.m(n,null)):p&&(J(),Z(p,1,1,(()=>{p=null})),X())},i(e){l||(B(o),B(p),l=!0)},o(e){Z(o),Z(p),l=!1},d(e){e&&w(n),c[r].d(),p&&p.d(),e&&w(a),e&&w(i)}}}function he(e,n,r){let o,{data:s="[]"}=n,a=JSON.parse(s);L((()=>{l()}));const i=e=>document.createTextNode(e);function l(){return new le(o,{loop:!1,delay:50,onCreateTextNode:i}).typeString("say Hellō with").start().callFunction((e=>{!function(e){e.elements.cursor.style.visibility="hidden",r(2,d=!0),r(8,u=setInterval((()=>{r(0,c++,c)}),1e3))}(e)}))}let u,c=0,d=!1,p=!1;return e.$$set=e=>{"data"in e&&r(7,s=e.data)},e.$$.update=()=>{257&e.$$.dirty&&a.length&&c>=a.length&&(r(0,c=0),clearInterval(u),r(2,d=!1),r(3,p=!0),setTimeout((()=>{r(3,p=!1),setTimeout((()=>{l()}),300)}),2250))},[c,o,d,p,a,function(e,n){const{delay:r=0,duration:o=500,easing:s=se,type:a="logo"}=n;return{delay:r,duration:"logo"===a?o:4e3,easing:"logo"===a?t:se,css:e=>`transform: rotateX(${90-90*e}deg)  translateZ(${30*e-30}px)`}},function(e,n){const{delay:r=0,duration:o,easing:s=se,type:a="logo"}=n;return{delay:r,duration:"logo"===a?o:4e3,easing:"logo"===a?t:se,css:e=>`transform: rotateX(${90*e-90}deg)  translateZ(${30*e-30}px)`}},s,u,function(e){D[e?"unshift":"push"]((()=>{o=e,r(1,o)}))}]}customElements.define("flip-anim",class extends oe{constructor(e){super(),this.shadowRoot.innerHTML="<style>img{transform-style:preserve-3d}</style>",re(this,{target:this.shadowRoot,props:x(this.attributes),customElement:!0},he,fe,a,{data:7},null),e&&(e.target&&g(e.target,this,e.anchor),e.props&&(this.$set(e.props),U()))}static get observedAttributes(){return["data"]}get data(){return this.$$.ctx[7]}set data(e){this.$$set({data:e}),U()}})}();
//# sourceMappingURL=bundle.js.map
