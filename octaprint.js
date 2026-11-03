(function(){var v=document.getElementById('hero-video'),b=document.querySelector('.vpause');if(!v||!b)return;
function s(p){b.classList.toggle('paused',p);b.setAttribute('aria-label',p?b.dataset.lPlay:b.dataset.lPause);}
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){v.removeAttribute('autoplay');v.pause();s(true);}
b.addEventListener('click',function(){if(v.paused){v.play();s(false);}else{v.pause();s(true);}});})();
(function(){var b=document.querySelector('.burger'),m=document.getElementById('menu');if(!b||!m)return;
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded','false');}});})();
(function(){
  if(!window.matchMedia||!window.matchMedia('(min-width:961px) and (hover:hover)').matches)return;
  var imgs=document.querySelectorAll('img[data-zoom]');if(!imgs.length)return;
  var lang=(document.documentElement.lang||'ca').slice(0,2);
  var T={ca:['Amplia la imatge','Tanca'],es:['Ampliar la imagen','Cerrar'],en:['Enlarge image','Close']}[lang]||['Enlarge image','Close'];
  var ov=document.createElement('div');ov.className='lb';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.hidden=true;
  ov.innerHTML='<button class="lb-x" type="button" aria-label="'+T[1]+'">\u00d7</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(ov);
  var big=ov.querySelector('img'),cap=ov.querySelector('figcaption'),x=ov.querySelector('.lb-x'),last=null;
  function open(el){last=el;big.src=el.currentSrc||el.src;big.alt=el.alt;cap.textContent=el.alt;ov.hidden=false;document.body.style.overflow='hidden';requestAnimationFrame(function(){ov.classList.add('on')});x.focus();}
  function close(){ov.classList.remove('on');document.body.style.overflow='';setTimeout(function(){ov.hidden=true;big.removeAttribute('src')},180);if(last)last.focus();}
  imgs.forEach(function(el){el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('aria-label',T[0]+': '+el.alt);
    el.addEventListener('click',function(e){e.preventDefault();open(el)});
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(el)}});});
  ov.addEventListener('click',function(e){if(e.target!==big)close()});
  document.addEventListener('keydown',function(e){if(!ov.hidden&&(e.key==='Escape'||e.key==='Tab')){if(e.key==='Tab'){e.preventDefault();x.focus()}else close()}});
})();
