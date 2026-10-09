// Change the admission session text in one place
const SESSION = "2027–28";
document.querySelectorAll(".session").forEach(e=>e.textContent=SESSION);
document.getElementById("yr").textContent = new Date().getFullYear();

// header shadow + mobile menu
const hd=document.querySelector("header"),nav=document.querySelector("nav"),mb=document.querySelector(".menu-btn");
addEventListener("scroll",()=>hd.classList.toggle("scrolled",scrollY>10),{passive:true});
mb.onclick=()=>{const o=nav.classList.toggle("open");mb.classList.toggle("open",o);mb.setAttribute("aria-expanded",o)};
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>{nav.classList.remove("open");mb.classList.remove("open")});

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));

// years counter
const yEl=document.getElementById("years"),yTo=new Date().getFullYear()-2014;
new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){ob.disconnect();let s=null;const f=t=>{s=s||t;const p=Math.min((t-s)/1400,1);yEl.textContent=Math.round(yTo*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}}).observe(yEl);
yEl.textContent=yTo;

// testimonial slider
const tr=document.querySelector(".track"),n=tr.children.length,dots=document.getElementById("dots");let i=0,tm;
for(let k=0;k<n;k++){const b=document.createElement("button");b.setAttribute("aria-label","Testimonial "+(k+1));b.onclick=()=>{go(k);auto()};dots.appendChild(b)}
function go(k){i=k;tr.style.transform=`translateX(-${i*100}%)`;[...dots.children].forEach((d,j)=>d.classList.toggle("on",j===i))}
function auto(){clearInterval(tm);tm=setInterval(()=>go((i+1)%n),6000)}
go(0);auto();

// gallery lightbox
const lb=document.getElementById("lb"),lbi=lb.querySelector("img");
document.querySelectorAll("#gal button").forEach(b=>b.onclick=()=>{const im=b.querySelector("img");lbi.src=im.src;lbi.alt=im.alt;lb.classList.add("on")});
lb.onclick=()=>lb.classList.remove("on");
addEventListener("keydown",e=>{if(e.key==="Escape")lb.classList.remove("on")});

// Distinguished guests: add real entries here (name, role, quote, optional photo URL)
const GUESTS = [
  // { name:"Full name", role:"ACP / Colonel / Brigadier ...", quote:"Their words about the school.", photo:"" }
];
const gc=document.getElementById("guestCards");
GUESTS.forEach(g=>{const d=document.createElement("div");d.className="gc rv in";
 const p=document.createElement("p");p.textContent="“"+g.quote+"”";
 const w=document.createElement("div");w.className="who";
 if(g.photo){const im=document.createElement("img");im.src=g.photo;im.alt=g.name;w.appendChild(im)}
 const t=document.createElement("div");const b=document.createElement("b");b.textContent=g.name;const s=document.createElement("span");s.textContent=g.role;t.append(b,s);w.appendChild(t);
 d.append(p,w);gc.appendChild(d)});

// callback form -> WhatsApp message
document.getElementById("enq").addEventListener("submit",e=>{e.preventDefault();
 const f=new FormData(e.target);
 const m=`Hello, I want admission information for ${f.get("c")}. Parent name: ${f.get("n")}. Phone: ${f.get("p")}.`;
 window.open("https://wa.me/919389310591?text="+encodeURIComponent(m),"_blank","noopener");
});
