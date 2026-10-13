/* Octaprint — main.js
 * Fitxer únic compartit per /, /es/ i /en/. Sense gestors inline (compatible amb la CSP).
 */
(function () {
  'use strict';

  var LANG = (document.documentElement.lang || 'ca').slice(0, 2);
  var T = {
    ca: { sending: 'Enviant...', consent: 'Has d\'acceptar la política de privacitat per enviar la sol·licitud.',
          error: 'No s\'ha pogut enviar el formulari. Escriu-nos a info@octaprint.cat o per WhatsApp.', wa: 'Obrir WhatsApp' },
    es: { sending: 'Enviando...', consent: 'Debes aceptar la política de privacidad para enviar la solicitud.',
          error: 'No se ha podido enviar el formulario. Escríbenos a info@octaprint.cat o por WhatsApp.', wa: 'Abrir WhatsApp' },
    en: { sending: 'Sending...', consent: 'Please accept the privacy policy to send your request.',
          error: 'The form could not be sent. Please email info@octaprint.cat or message us on WhatsApp.', wa: 'Open WhatsApp' }
  }[LANG] || null;
  if (!T) { T = { sending: 'Enviant...', consent: 'Accepta la política de privacitat.', error: 'Error d\'enviament.', wa: 'WhatsApp' }; }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // CURSOR PERSONALITZAT — només amb ratolí i sense "reduir moviment"
  var dot = document.getElementById('dot'), ring = document.getElementById('ring');
  if (dot && ring) {
    if (finePointer && !reduceMotion) {
      document.documentElement.classList.add('has-cursor');
      var mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      }, { passive: true });
      (function tick() { rx += (mx - rx) * .11; ry += (my - ry) * .11; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(tick); })();
      document.querySelectorAll('.i').forEach(function (el) {
        el.addEventListener('mouseenter', function () { dot.style.width = '10px'; dot.style.height = '10px'; });
        el.addEventListener('mouseleave', function () { dot.style.width = '7px'; dot.style.height = '7px'; });
      });
    } else {
      dot.remove(); ring.remove();
    }
  }

  // LOADER — més curt (abans 1,4 s) per no penalitzar el LCP
  var loader = document.getElementById('loader');
  function hideLoader() { if (loader) loader.classList.add('out'); }
  if (document.readyState === 'complete') { hideLoader(); } else { window.addEventListener('load', function () { setTimeout(hideLoader, reduceMotion ? 0 : 300); }); }
  setTimeout(hideLoader, 2500); // mai bloquejar la pàgina si un recurs extern no carrega

  // VÍDEO HERO — alternativa si no carrega
  var vid = document.querySelector('#hero video');
  var hfb = document.getElementById('hfb');
  function vidFallback() { if (vid) vid.style.display = 'none'; if (hfb) hfb.style.display = 'block'; }
  if (vid) {
    if (reduceMotion) { vid.removeAttribute('autoplay'); try { vid.pause(); } catch (e) {} }
    setTimeout(function () { if (vid.readyState === 0) vidFallback(); }, 3000);
    vid.addEventListener('error', vidFallback);
  }

  // SCROLL + BARRA DE PROGRÉS
  var nav = document.getElementById('nav'), prog = document.getElementById('progress');
  window.addEventListener('scroll', function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    if (nav) nav.classList.toggle('solid', window.scrollY > 60);
  }, { passive: true });

  // ENLLAÇ ACTIU AL MENÚ
  if ('IntersectionObserver' in window) {
    var navAs = document.querySelectorAll('.nav-links a[href^="#"]');
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) navAs.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { threshold: .35 });
    document.querySelectorAll('section[id],div[id]').forEach(function (s) { if (s.id) io.observe(s); });
  }

  // MENÚ MÒBIL
  var burger = document.getElementById('burger'), mob = document.getElementById('mobnav');
  function closeMenu() { if (!burger || !mob) return; burger.classList.remove('on'); mob.classList.remove('on'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  if (burger && mob) {
    burger.setAttribute('aria-controls', 'mobnav');
    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', function () {
      var open = !mob.classList.contains('on');
      burger.classList.toggle('on', open); mob.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  // DESPLAÇAMENT SUAU
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
    });
  });

  // APARICIONS
  if ('IntersectionObserver' in window && !reduceMotion) {
    var rio = new IntersectionObserver(function (ents) { ents.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('on'); }); }, { threshold: .08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { rio.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('on'); });
  }

  // FAQ — accessible amb teclat
  var fqs = document.querySelectorAll('.fq');
  function toggleFq(item) {
    var wasOpen = item.classList.contains('on');
    fqs.forEach(function (i) { i.classList.remove('on'); var q = i.querySelector('.fq-q'); if (q) q.setAttribute('aria-expanded', 'false'); });
    if (!wasOpen) { item.classList.add('on'); var q = item.querySelector('.fq-q'); if (q) q.setAttribute('aria-expanded', 'true'); }
  }
  fqs.forEach(function (item) {
    var q = item.querySelector('.fq-q');
    if (!q) return;
    q.addEventListener('click', function () { toggleFq(item); });
    q.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFq(item); } });
  });

  // FORMULARI
  var form = document.getElementById('theform');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('csub');
      var consent = document.getElementById('fconsent');
      var errBox = document.getElementById('cerr');
      function showErr(msg) { if (errBox) { errBox.textContent = msg; errBox.style.display = 'block'; } }
      if (errBox) errBox.style.display = 'none';
      if (consent && !consent.checked) { showErr(T.consent); consent.focus(); return; }
      if (form.querySelector('input[name="_honey"]').value) return; // bot
      var orig = btn.textContent;
      btn.disabled = true; btn.style.opacity = '.6'; btn.textContent = T.sending;

      fetch('https://formsubmit.co/ajax/info@octaprint.cat', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (data) {
          // FormSubmit respon {success:"true"} o {success:"false", message:...}
          if (!data || String(data.success) !== 'true') throw new Error((data && data.message) || 'send failed');
          form.querySelectorAll('input,textarea,button,label,.cn,.cf-legal,.cf-consent').forEach(function (el) { el.style.display = 'none'; });
          document.getElementById('csuc').style.display = 'block';
        })
        .catch(function () {
          btn.disabled = false; btn.style.opacity = '1'; btn.textContent = orig;
          showErr(T.error);
          var n = document.getElementById('fn').value, msg = document.getElementById('fm').value;
          var link = document.getElementById('cerr-wa');
          if (link) {
            link.href = 'https://wa.me/34622655514?text=' + encodeURIComponent('Hola Octaprint! ' + n + '. ' + msg);
            link.textContent = T.wa; link.style.display = 'inline-block';
          }
        });
    });
  }
})();
