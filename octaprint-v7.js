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
/* ===== v7 · 17/11/2026 · galetes, analítica, calculadora i formulari ===== */
(function(){
  var GA='G-4HCK0L348S', GTM='GTM-T5TDSWLL', K='op-consent';
  var L=(document.documentElement.lang||'ca').slice(0,2); if(['ca','es','en'].indexOf(L)<0)L='en';
  var T={
    ca:{t:'Galetes',p:'Fem servir galetes d’analítica i publicitat de Google només si les acceptes, per saber quines pàgines són útils i mesurar les campanyes.',m:'Més informació',a:'Acceptar',r:'Rebutjar',u:'/legal.html#cookies'},
    es:{t:'Cookies',p:'Usamos cookies de analítica y publicidad de Google solo si las aceptas, para saber qué páginas son útiles y medir las campañas.',m:'Más información',a:'Aceptar',r:'Rechazar',u:'/legal-es.html#cookies'},
    en:{t:'Cookies',p:'We use Google analytics and advertising cookies only if you accept them, to learn which pages are useful and to measure campaigns.',m:'More information',a:'Accept',r:'Reject',u:'/legal-en.html#cookies'}
  }[L];
  window.dataLayer=window.dataLayer||[];
  function gtag(){window.dataLayer.push(arguments);} window.gtag=gtag;
  gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted'});
  var on=false;
  function load(){
    if(on)return; on=true;
    gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA;document.head.appendChild(s);
    gtag('js',new Date()); gtag('config',GA);
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtm.js?id='+GTM;document.head.appendChild(g);
  }
  function wipe(){document.cookie.split(';').forEach(function(c){var n=c.split('=')[0].trim();if(/^(_ga|_gid|_gcl|_gat)/.test(n)){['',';domain=.octaprint.cat',';domain=octaprint.cat'].forEach(function(d){document.cookie=n+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'+d;});}});}
  function read(){try{var v=JSON.parse(localStorage.getItem(K)||'null');if(v&&(Date.now()-v.t)<365*864e5)return v.v;}catch(e){}return null;}
  function save(v){try{localStorage.setItem(K,JSON.stringify({v:v,t:Date.now()}));}catch(e){}}
  var box=document.createElement('div');box.className='cc';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-labelledby','cc-t');
  box.innerHTML='<h2 id="cc-t">'+T.t+'</h2><p>'+T.p+' <a href="'+T.u+'">'+T.m+'</a></p><div class="b"><button type="button" data-v="no">'+T.r+'</button><button type="button" data-v="all">'+T.a+'</button></div>';
  document.body.appendChild(box);
  box.addEventListener('click',function(e){var v=e.target.getAttribute&&e.target.getAttribute('data-v');if(!v)return;save(v);box.hidden=true;
    if(v==='all'){load();}else{gtag('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});wipe();}});
  document.querySelectorAll('.ck-open').forEach(function(b){b.addEventListener('click',function(){box.hidden=false;box.querySelector('button').focus();});});
  var c=read(); if(c==='all')load(); else if(c!=='no')box.hidden=false;
  /* esdeveniments */
  window.opTrack=function(name,p){if(!on)return;p=p||{};p.page_lang=L;gtag('event',name,p);var o={event:'op_'+name};for(var k in p)o[k]=p[k];window.dataLayer.push(o);};
  document.addEventListener('click',function(e){var a=e.target.closest?e.target.closest('a'):null;if(!a)return;var h=a.getAttribute('href')||'',n=null;
    if(h.indexOf('wa.me/')>-1)n='whatsapp_click';else if(h.indexOf('tel:')===0)n='phone_click';else if(h.indexOf('mailto:')===0)n='email_click';else if(h.indexOf('wallpen.com')>-1)n='wallpen_verify_click';
    if(!n)return;var sec=a.closest('section,header,footer');window.opTrack(n,{cta_text:(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,80),cta_section:(sec&&(sec.id||sec.className))||''});},true);
})();
(function(){
  var f=document.getElementById('calc');if(!f)return;
  var L=(document.documentElement.lang||'ca').slice(0,2),loc={ca:'ca-ES',es:'es-ES',en:'en-GB'}[L]||'es-ES';
  var fm=new Intl.NumberFormat(loc,{maximumFractionDigits:0});
  var o1=document.getElementById('c-res'),o2=document.getElementById('c-be'),wa=document.getElementById('c-wa'),used=false;
  var M={ca:['feines','Hola Octaprint! He fet servir la calculadora de la wallPen E2:','Valor per feina','Cost per feina','Feines al mes','Costos fixos','Quota','Resultat mensual','Punt d’equilibri','M’agradaria comentar-ho.','€/mes','feina'],
         es:['trabajos','¡Hola Octaprint! He usado la calculadora de la wallPen E2:','Valor por trabajo','Coste por trabajo','Trabajos al mes','Costes fijos','Cuota','Resultado mensual','Punto de equilibrio','Me gustaría comentarlo.','€/mes','trabajo'],
         en:['jobs','Hello Octaprint! I used the wallPen E2 calculator:','Value per job','Cost per job','Jobs per month','Fixed costs','Payment','Monthly result','Break-even','I would like to discuss it.','€/month','job']}[L]||[];
  function num(n){var v=(f.elements[n].value||'').replace(/\./g,'').replace(',','.');var x=parseFloat(v);return isFinite(x)?x:null;}
  function run(){
    var v=num('v'),c=num('c')||0,n=num('n'),fx=num('f')||0,q=num('q')||0;
    if(v===null||n===null){o1.textContent='—';o2.textContent='—';o1.className='';wa.hidden=true;return;}
    var r=n*(v-c)-fx-q;o1.textContent=fm.format(Math.round(r))+' €';o1.className=r<0?'neg':'';
    var m=v-c;var be=m>0?Math.ceil((fx+q)/m):null;o2.textContent=be===null?'—':be+' '+(be===1?M[11]:M[0]);
    if(!used){used=true;if(window.opTrack)window.opTrack('calculator_use',{});}
    var t=M[1]+'\n'+M[2]+': '+fm.format(v)+' €\n'+M[3]+': '+fm.format(c)+' €\n'+M[4]+': '+fm.format(n)+'\n'+M[5]+': '+fm.format(fx)+' €\n'+M[6]+': '+fm.format(q)+' €\n'+M[7]+': '+o1.textContent+'\n'+M[8]+': '+o2.textContent+'\n'+M[9];
    wa.href='https://wa.me/34622655514?text='+encodeURIComponent(t);wa.hidden=false;
  }
  f.addEventListener('input',run);f.addEventListener('submit',function(e){e.preventDefault();run();});
  var ex=document.getElementById('c-ex');if(ex)ex.addEventListener('click',function(){['v','c','n','f','q'].forEach(function(k){f.elements[k].value=f.elements[k].getAttribute('data-ex')||'';});run();});
  var rs=document.getElementById('c-rs');if(rs)rs.addEventListener('click',function(){f.reset();run();});
  run();
})();
(function(){
  var f=document.getElementById('lead');if(!f)return;
  var L=(document.documentElement.lang||'ca').slice(0,2);
  var M={ca:['Hola Octaprint! M’interessa la wallPen E2.','Perfil','Nom','Empresa','Població','Vull veure la inversió en quota mensual.','M’agradaria rebre una mostra impresa.','Si us plau, tria el teu perfil i escriu el teu nom.','Informació sobre la wallPen E2'],
         es:['¡Hola Octaprint! Me interesa la wallPen E2.','Perfil','Nombre','Empresa','Población','Quiero ver la inversión en cuota mensual.','Me gustaría recibir una muestra impresa.','Por favor, elige tu perfil y escribe tu nombre.','Información sobre la wallPen E2'],
         en:['Hello Octaprint! I am interested in the wallPen E2.','Profile','Name','Company','Town','I would like to see the investment as a monthly payment.','I would like to receive a printed sample.','Please choose your profile and enter your name.','Information about the wallPen E2']}[L];
  var err=f.querySelector('.err'),via='wa';
  f.querySelectorAll('button[data-ch]').forEach(function(b){b.addEventListener('click',function(){via=b.getAttribute('data-ch');});});
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var p=f.querySelector('input[name=perfil]:checked'),nom=(f.elements.nom.value||'').trim();
    if(!p||!nom){err.textContent=M[7];(p?f.elements.nom:f.querySelector('input[name=perfil]')).focus();return;}
    err.textContent='';
    var lines=[M[0],M[1]+': '+p.parentNode.textContent.trim(),M[2]+': '+nom];
    var emp=(f.elements.empresa.value||'').trim(),pob=(f.elements.poblacio.value||'').trim();
    if(emp)lines.push(M[3]+': '+emp); if(pob)lines.push(M[4]+': '+pob);
    if(f.elements.quota.checked)lines.push(M[5]); if(f.elements.mostra.checked)lines.push(M[6]);
    var txt=lines.join('\n');
    if(window.opTrack)window.opTrack('generate_lead',{lead_profile:p.value,lead_channel:via,wants_financing:f.elements.quota.checked?'yes':'no',wants_sample:f.elements.mostra.checked?'yes':'no'});
    if(via==='mail'){location.href='mailto:info@octaprint.cat?subject='+encodeURIComponent(M[8])+'&body='+encodeURIComponent(txt);}
    else{var u='https://wa.me/34622655514?text='+encodeURIComponent(txt),w=window.open(u,'_blank');if(w){try{w.opener=null;}catch(x){}}else location.href='https://wa.me/34622655514?text='+encodeURIComponent(txt);}
  });
})();

/* vídeos propis: només es reprodueixen quan es veuen (v18) */
(function(){
  var vs=document.querySelectorAll('video[data-inview]');if(!vs.length)return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  vs.forEach(function(v){v.removeAttribute('autoplay');v.muted=true;if(reduce){v.setAttribute('controls','');}});
  if(reduce||!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;
    if(e.isIntersecting){if(v.preload!=='auto')v.preload='auto';var p=v.play();if(p&&p.catch)p.catch(function(){});}else{v.pause();}});},{threshold:0.35});
  vs.forEach(function(v){io.observe(v)});
})();
