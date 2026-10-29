(function(){var v=document.getElementById('hero-video'),b=document.querySelector('.vpause');if(!v||!b)return;
function s(p){b.classList.toggle('paused',p);b.setAttribute('aria-label',p?b.dataset.lPlay:b.dataset.lPause);}
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){v.removeAttribute('autoplay');v.pause();s(true);}
b.addEventListener('click',function(){if(v.paused){v.play();s(false);}else{v.pause();s(true);}});})();
(function(){var b=document.querySelector('.burger'),m=document.getElementById('menu');if(!b||!m)return;
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded','false');}});})();
