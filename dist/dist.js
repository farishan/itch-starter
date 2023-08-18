(()=>{var m=class{constructor(){let e={};this.observe=(t,o)=>{e[t]||(e[t]=[]),e[t].push(o)},this.unobserve=(t,o)=>{e[t]||(e[t]=[]),e[t]=e[t].filter(r=>r!==o)},this.getObservers=t=>e[t]||[]}notify(e,t){let o=this.getObservers(e);for(let r=0;r<o.length;r++){let s=o[r];s(t)}}};var i=class{constructor(){let e=document.createElement("div");this.get=()=>e,this.set=t=>{this.clear(),this.append(t)},this.clear=()=>e.innerHTML="",this.append=t=>e.append(t)}};var h=class extends m{constructor(){super();let e=this,t=new i,o=document.createElement("div"),r=0,s=!1;o.innerHTML=`frame: ${r}`,t.set(o);function d(){r++,e.notify("frame",r),o.innerHTML=`[loop.js] frame: ${r}`,s&&requestAnimationFrame(d)}this.start=()=>{s||(s=!0,requestAnimationFrame(d))},this.stop=()=>s=!1,this.get=t.get}},k=new h,l=k;var v=class{constructor(){let e=new i,t=document.createElement("div");t.innerHTML=new Date().toString(),setInterval(()=>{t.innerHTML=new Date().toString()},1e3),e.set(t),this.get=e.get}},B=new v;var w=class{constructor(){let e=new i,t=document.createElement("div");t.innerHTML="hello from player",e.set(t),this.get=e.get}},J=new w;var y=class{constructor(){let e=new i,t=document.createElement("div"),o=document.createElement("div"),r=document.createElement("div"),s=[];d();function d(){o.innerHTML="logger head";let c=document.createElement("button");c.onclick=()=>{r.style.display=r.style.display==="none"?"block":"none"},c.innerText="toggle logger visibility",o.append(c),r.innerHTML="logger body",t.style.border="1px solid",t.style.maxHeight="200px",t.style.overflowY="auto",t.append(o),t.append(r),e.set(t)}this.log=c=>{s.push(c),this.render()},this.render=()=>{r.innerHTML="";for(let c=s.length-1;c>=0;c--){let H=s[c];r.innerHTML+=H+"<br>"}},this.get=e.get}},N=new y,L=N;var b=class{view=new i;eventListener={};constructor(){let e=this.view.get();e.style.border="1px solid",e.style.padding="1rem"}addEventListener(e,t,o){this.eventListener[e]||(this.eventListener[e]={}),this.eventListener[e][t]=o,window.addEventListener(e,o),this.update()}removeEventListener(e,t){window.removeEventListener(e,this.eventListener[e][t]),delete this.eventListener[e][t],this.update()}update(){let e=[];Object.keys(this.eventListener).forEach(r=>{Object.keys(this.eventListener[r]).forEach(s=>{e.push(r+"/"+s)})});let t=document.createElement("pre"),o=document.createElement("code");t.append(o),o.innerHTML=JSON.stringify(e,[" "],2),this.view.set(t)}get(){return this.view.get()}},O=new b,p=O;var j={on:(n,e)=>{p.addEventListener(n,"keyboard",e)},addNamedListener:(n,e,t)=>{p.addEventListener(n,`keyboard_${e}`,t)},removeNamedListener:(n,e)=>{p.removeEventListener(n,`keyboard_${e}`)}},a=j;var f=class{constructor(e){this.destroy=()=>e.remove()}};var V=document.body,u=class{constructor(e){this.render=()=>V.append(e)}};var $="p";function x(n){let e=document.createElement($);return e.innerHTML=n,Object.assign({},new f(e),new u(e))}var M="sendMessageToPlayer";function g(n,e,t){let o=x(n);o.render(),a.addNamedListener("keypress",M,r=>{r.key===e&&(o.destroy(),a.removeNamedListener("keypress",M),t())})}var E=class{constructor(){let e=!1;g('press "f" to start the machine',"f",()=>this.start());let t=new i;this.start=()=>{g('Welcome!<br>press "l" to start the logger',"l",()=>{t.append(L.get());let o=document.createElement("div");t.append(o),a.on("keypress",s=>{s.key==="a"&&l.start(),s.key==="s"&&l.stop()}),L.log('press "a" to start loop engine, "s" to stop it');let r=document.createElement("div");o.append(r),l.observe("frame",s=>{r.innerText=`[game.js] frame: ${s}`})}),e=!0},this.get=t.get}},A=new E,T=A;document.body.append(T.get());})();
