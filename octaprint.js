(function(){var v=document.getElementById('hero-video'),b=document.querySelector('.vpause');if(!v||!b)return;
function s(p){b.classList.toggle('paused',p);b.setAttribute('aria-label',p?b.dataset.lPlay:b.dataset.lPause);}
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){v.removeAttribute('autoplay');v.pause();s(true);}
b.addEventListener('click',function(){if(v.paused){v.play();s(false);}else{v.pause();s(true);}});})();
