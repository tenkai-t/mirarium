/* Development-only overlay. To activate, include this script in the HTML and add ?collisionDebug=1 to the URL. */
(()=>{if(new URLSearchParams(location.search).get("collisionDebug")!=="1")return;
const field=document.getElementById("field");if(!field)return;
const canvas=document.createElement("canvas");canvas.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;image-rendering:pixelated";
field.appendChild(canvas);let key="",mask;
function draw(){if(typeof view==="undefined"||view!=="field"||typeof area==="undefined"||typeof COLL==="undefined"){canvas.style.display="none";return;}canvas.style.display="";const g=COLL[area];if(!g||!g.bytes)return;
if(key!==area){key=area;mask=document.createElement("canvas");mask.width=g.w;mask.height=g.h;const c=mask.getContext("2d"),img=c.createImageData(g.w,g.h);for(let i=0;i<g.bytes.length;i++){const p=i*4,b=g.bytes[i]!==0;img.data[p]=b?235:30;img.data[p+1]=b?40:210;img.data[p+2]=b?40:60;img.data[p+3]=b?110:45;}c.putImageData(img,0,0);}
const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;canvas.width=w;canvas.height=h;const c=canvas.getContext("2d");c.imageSmoothingEnabled=false;c.drawImage(mask,0,0,w,h);
if(typeof MAP_BLOCKS!=="undefined"){const m=MAP_BLOCKS[area];if(m){c.strokeStyle="#ffbf00";c.lineWidth=2;for(const p of m.circles||[]){c.beginPath();c.ellipse(p.x*w/100,(100-p.b)*h/100,p.r*w/100,p.r*1.5*h/100,0,0,Math.PI*2);c.stroke();}}}
if(typeof SIGNS!=="undefined"){c.strokeStyle="#00e5ff";for(const p of SIGNS[area]||[]){c.beginPath();c.arc(p.x*w/100,(100-p.b)*h/100,5,0,Math.PI*2);c.stroke();}}
}setInterval(draw,250);})();