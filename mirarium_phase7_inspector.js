/* Phase 7 diagnostic: add via <script src="mirarium_phase7_inspector.js"></script> on a test page only. */
(()=>{if(new URLSearchParams(location.search).get('collisionDebug')!=='1')return;
const p=document.createElement('aside');p.id='phase7Inspect';p.style.cssText='position:fixed;bottom:12px;left:12px;z-index:2147483640;background:#14273def;color:white;padding:12px;border-radius:12px;font:12px sans-serif;max-width:310px';
p.innerHTML='<b>セル判定診断</b><div id="phase7Result">マップをタップしてください</div><button id="phase7Copy">座標をコピー</button><button id="phase7Close">閉じる</button>';document.body.append(p);let last=null;
document.getElementById('phase7Close').onclick=()=>{p.remove();document.removeEventListener('click',inspect,true)};
document.getElementById('phase7Copy').onclick=()=>{if(last)navigator.clipboard?.writeText(JSON.stringify(last,null,2))};
function inspect(e){if(!p.isConnected||p.contains(e.target)||e.target.closest('#collisionInspector'))return;
if(typeof view==='undefined'||!['field','space'].includes(view))return;
const stage=document.getElementById(view==='space'?'space':'field');if(!stage?.contains(e.target))return;
const key=typeof area!=='undefined'?area:null,g=typeof COLL!=='undefined'?COLL[key]:null;if(!g?.bytes)return;
const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,b=(1-(e.clientY-r.top)/r.height)*100;
if(x<0||x>=100||b<0||b>100)return;
const gx=Math.min(g.w-1,Math.floor(x*g.w/100)),gy=Math.min(g.h-1,Math.floor((100-b)*g.h/100)),grid=g.bytes[gy*g.w+gx];
const depth=typeof blockDepth==='function'?blockDepth(view,x,b):null,zone=typeof zoneDepth==='function'?zoneDepth(view,x,b):null;
last={map:key,cell:[gx,gy],x:+x.toFixed(3),b:+b.toFixed(3),grid,zoneDepth:zone,blockDepth:depth};
document.getElementById('phase7Result').textContent=key+' ('+gx+','+gy+') grid='+grid+' zone='+zone?.toFixed(3)+' total='+depth?.toFixed(3);
}document.addEventListener('click',inspect,true)})();