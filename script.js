const header=document.getElementById("site-header");
const menuButton=document.getElementById("menu-button");
const nav=document.getElementById("main-nav");
const languageToggle=document.getElementById("language-toggle");
const rotatorLines=[...document.querySelectorAll(".rotator-line")];
const heroMedia=document.querySelector(".hero-media");

function updateHeader(){if(header)header.classList.toggle("scrolled",window.scrollY>24)}
window.addEventListener("scroll",()=>{
  updateHeader();
  if(heroMedia && window.innerWidth>760){
    heroMedia.style.transform=`scale(1.04) translateY(${window.scrollY*0.08}px)`;
  }
},{passive:true});
updateHeader();

if(menuButton&&nav){
  menuButton.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded",String(open));
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
  }));
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

let lang=localStorage.getItem("siteLanguage")||"en";
function applyLanguage(value){
  document.documentElement.lang=value;
  document.querySelectorAll("[data-en][data-ja]").forEach(el=>el.textContent=el.dataset[value]);
  if(languageToggle){
    languageToggle.textContent=value==="en"?"日本語":"English";
    languageToggle.setAttribute("aria-label",value==="en"?"日本語に切り替える":"Switch to English");
  }
  localStorage.setItem("siteLanguage",value);
}
if(languageToggle)languageToggle.addEventListener("click",()=>{
  lang=lang==="en"?"ja":"en";
  applyLanguage(lang);
});
applyLanguage(lang);

let index=0;
function showLine(i){rotatorLines.forEach((line,n)=>line.classList.toggle("active",n===i))}
if(rotatorLines.length){
  showLine(index);
  setInterval(()=>{index=(index+1)%rotatorLines.length;showLine(index)},2600);
}
const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();
