/* The homepage's behaviour: the *** <-> pot flip, the pothole that watches you, the counters, the sign-up forms
   and swerve practice. Moved here unchanged from the old index.html script so the port can be diffed line by line;
   it works on the server-rendered markup by id and class, so keep those in sync with components/home.
   It runs once per page load (React runs effects twice in development). */
let started = false;

export function startHome() {
  if (started) return;
  started = true;
  'use strict';

  /* ======================================================================
     CONFIG — wire up the subscribe forms here.
     Set `endpoint` to the URL of your Google Apps Script web app (it ends in /exec;
     see google-apps-script.gs), or to any other URL that accepts a JSON POST
     (Formspree, a Vercel / Supabase function, your own API). Until it is set,
     sign-ups are NOT sent anywhere (preview mode) and a console warning says so.
     ====================================================================== */
  var CONFIG = { endpoint: 'https://script.google.com/macros/s/AKfycbzpR_pp42QrOUaAGSoE37UHaZI4ljenb3-xTUXW-ho0RVMWU2HcMLs0xQRk27s13AgYBA/exec', storageKey: 'pothole-india-genz:subscribed', bestKey: 'pothole-india-genz:best' };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- reveal + counters ---------- */
  function fmt(el, v) {
    var d = parseInt(el.dataset.decimals || '0', 10);
    return (el.dataset.prefix || '') + new Intl.NumberFormat('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v) + (el.dataset.suffix || '');
  }
  var counters = $$('[data-count]');
  if (!reduce) counters.forEach(function (el) { el.textContent = fmt(el, 0); });
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    if (reduce) { el.textContent = fmt(el, target); return; }
    var t0 = null;
    (function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / 1700, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(el, target * e);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var hasIO = 'IntersectionObserver' in window;
  if (hasIO) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        $$('[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
    counters.forEach(function (el) { el.textContent = fmt(el, parseFloat(el.dataset.count)); });
  }
  // highlighter marks + checklist animate in with the hero
  setTimeout(function () { $('#lead').classList.add('in'); $('#checks').classList.add('on'); }, 250);

  /* ---------- the censor: *** <-> pot ---------- */
  var censor = $('#censor'), note = $('#note'), hero = $('.hero');
  var auto = false, hover = false, pinned = false, tA, tB;
  function render() {
    var on = auto || hover || pinned;
    censor.classList.toggle('is-pot', on);
    note.classList.toggle('on', on);
    hero.classList.toggle('pot-on', on);
  }
  function cycle() {
    clearTimeout(tA); clearTimeout(tB);
    if (reduce) return;
    tA = setTimeout(function () {
      auto = true; render();
      tB = setTimeout(function () { auto = false; render(); cycle(); }, 1900);
    }, 2600);
  }
  censor.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hover = true; render(); } });
  censor.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hover = false; render(); } });
  censor.addEventListener('click', function () { pinned = !pinned; render(); });
  setTimeout(cycle, 1400);
  // reserve exactly the width of the visible face, so "***" hugs "hole" and the word slides when "pot" flips in
  function sizeCensor() {
    var s = $('.stars', censor), p = $('.pot', censor);
    censor.style.setProperty('--ws', s.offsetWidth + 'px');
    censor.style.setProperty('--wp', (p.offsetWidth + parseFloat(getComputedStyle(censor).fontSize) * 0.08) + 'px');
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeCensor);
  window.addEventListener('load', sizeCensor);
  if (window.ResizeObserver) new ResizeObserver(sizeCensor).observe($('.hl-wrap')); else window.addEventListener('resize', sizeCensor);
  sizeCensor();

  /* ---------- the hole watches you ---------- */
  var pupils = $$('.pupil'), hole = $('#hole'), lastMove = 0;
  function look(dx, dy, m) { pupils.forEach(function (p) { p.style.transform = 'translate(' + (dx * m * 55) + '%,' + (dy * m * 55) + '%)'; }); }
  window.addEventListener('pointermove', function (e) {
    lastMove = Date.now();
    var r = hole.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1;
    look(dx / d, dy / d, Math.min(1, d / 260));
  }, { passive: true });
  if (!reduce) setInterval(function () {      // idle wander (phones, or a still mouse)
    if (Date.now() - lastMove < 3000) return;
    var a = Math.random() * Math.PI * 2; look(Math.cos(a), Math.sin(a), Math.random());
  }, 1700);

  /* ---------- parallax stickers ---------- */
  if (fine && !reduce) {
    var raf = 0, mx = 0, my = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2; my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(function () {
        hero.style.setProperty('--mx', mx.toFixed(3)); hero.style.setProperty('--my', my.toFixed(3)); raf = 0;
      });
    }, { passive: true });
    $$('.px', hero).forEach(function (el, i) { el.style.setProperty('--depth', (i % 2 ? -18 : 22)); });
  }

  /* ---------- custom cursor ---------- */
  if (fine && !reduce) {
    var cur = $('#cursor'), x = -100, y = -100, tx = -100, ty = -100, shown = false;
    document.documentElement.classList.add('has-cursor');
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; x = tx; y = ty; cur.classList.add('show'); }
      var t = e.target;
      cur.classList.toggle('hide', !!(t.closest && t.closest('input')));
      cur.classList.toggle('big', !!(t.closest && t.closest('a, button, .censor, .card, canvas, label')));
    }, { passive: true });
    document.addEventListener('pointerleave', function () { cur.classList.remove('show'); shown = false; });
    (function loop() {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      cur.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- subscribe ---------- */
  var forms = $$('.sub'), EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function markDone(email) { forms.forEach(function (f) { f.classList.add('is-done'); }); lsSet(CONFIG.storageKey, email || '1'); }
  function setMsg(form, t) { $('.sub-msg', form).textContent = t || ''; $('.sub-row', form).classList.toggle('is-invalid', !!t); }
  function busy(form, on) {
    var b = $('button[type="submit"]', form); b.classList.toggle('is-loading', on); b.disabled = on; $('.lbl', b).textContent = on ? 'sending' : 'notify me';
  }
  function send(email, source) {
    if (!CONFIG.endpoint) {
      console.warn('[Cars24 Patch] No subscribe endpoint configured — this email was NOT sent anywhere. Set CONFIG.endpoint in the page.');
      return new Promise(function (r) { setTimeout(r, 700); });
    }
    var payload = JSON.stringify({ email: email, source: source, page: /^https?:$/.test(location.protocol) ? location.origin + location.pathname : 'local-preview', at: new Date().toISOString() });
    // A Google Apps Script web app can't answer a CORS preflight, so send a plain request and don't read the reply.
    if (/^https:\/\/script\.google(usercontent)?\.com\//.test(CONFIG.endpoint)) {
      return fetch(CONFIG.endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: payload });
    }
    return fetch(CONFIG.endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: payload
    }).then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); });
  }
  function confetti(x, y) {
    if (reduce) return;
    var cols = ['#FFD60A', '#3B2BFF', '#FF5FA2', '#121212', '#ffffff'];
    for (var i = 0; i < 46; i++) {
      var el = document.createElement('i'); el.className = 'cf';
      var s = 7 + Math.random() * 9;
      el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + s + 'px;height:' + s + 'px;background:' + cols[i % 5] + ';border:2px solid #121212;border-radius:' + (Math.random() < 0.4 ? '50%' : '2px');
      document.body.appendChild(el);
      var a = Math.random() * Math.PI * 2, v = 140 + Math.random() * 340, dx = Math.cos(a) * v, dy = Math.sin(a) * v - 200;
      el.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + dx + 'px,' + (dy + 520) + 'px) rotate(' + (Math.random() * 900 - 450) + 'deg)', opacity: 0 }
      ], { duration: 1400 + Math.random() * 900, easing: 'cubic-bezier(.15,.7,.3,1)' }).onfinish = (function (n) { return function () { n.remove(); }; })(el);
    }
  }
  forms.forEach(function (form) {
    var input = $('input[type="email"]', form);
    input.addEventListener('input', function () { setMsg(form, ''); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!email) { setMsg(form, 'type your email first.'); input.focus(); return; }
      if (!EMAIL.test(email)) { setMsg(form, 'that email looks off. check it?'); input.focus(); return; }
      if ($('.hp', form).value) { markDone(); return; }
      setMsg(form, ''); busy(form, true);
      var btn = $('button[type="submit"]', form), r = btn.getBoundingClientRect();
      send(email, form.dataset.source).then(function () {
        busy(form, false); markDone(email); confetti(r.left + r.width / 2, r.top + r.height / 2);
      }).catch(function () { busy(form, false); setMsg(form, 'something broke on our side. try again?'); });
    });
  });
  if (lsGet(CONFIG.storageKey)) forms.forEach(function (f) { f.classList.add('is-done'); });

  /* ---------- swerve practice ---------- */
  (function game() {
    var cv = $('#game'); if (!cv) return;
    var ctx = cv.getContext('2d'), ov = $('#game-ov'), ovT = $('#ov-title'), ovS = $('#ov-sub'), playBtn = $('#play');
    var elScore = $('#g-score'), elBest = $('#g-best');
    var W = 0, H = 0, dpr = 1, lane = 1, px = 0, lean = 0, holes = [], speed = 0, score = 0, best = parseInt(lsGet(CONFIG.bestKey) || '0', 10) || 0;
    var state = 'idle', last = 0, spawn = 0, off = 0, shake = 0, vis = false, raf = 0, edgeCol = '#FFD60A';
    elBest.textContent = best;

    function laneW() { return W / 3; }
    function cx(l) { return laneW() * (l + 0.5); }
    function py() { return H * 0.8; }
    function resize() {
      var r = cv.getBoundingClientRect(); if (!r.width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2); W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      px = cx(lane); draw();
    }
    function reset() { lane = 1; px = cx(1); lean = 0; holes = []; score = 0; spawn = 0.6; speed = H * 0.5; off = 0; shake = 0; elScore.textContent = 0; }
    function addHoles() {
      var l = Math.floor(Math.random() * 3);
      holes.push({ l: l, y: -H * 0.08, done: false });
      if (score > 5 && Math.random() < 0.38) { var l2 = (l + 1 + Math.floor(Math.random() * 2)) % 3; holes.push({ l: l2, y: -H * 0.08, done: false }); }
    }
    function update(dt) {
      speed = H * (0.5 + Math.min(score, 60) * 0.011);
      off += speed * dt;
      var tgt = cx(lane); px += (tgt - px) * Math.min(1, dt * 14); lean = (tgt - px) / laneW() * 0.9;
      spawn -= dt;
      if (spawn <= 0) { addHoles(); spawn = Math.max(0.44, 0.95 - score * 0.02) * (0.85 + Math.random() * 0.3); }
      var rx = laneW() * 0.3, ry = rx * 0.6;
      for (var i = holes.length - 1; i >= 0; i--) {
        var h = holes[i]; h.y += speed * dt;
        if (Math.abs(h.y - py()) < ry + laneW() * 0.08 && Math.abs(cx(h.l) - px) < laneW() * 0.34) { over(); return; }
        if (!h.done && h.y > py() + ry + 22) { h.done = true; score++; elScore.textContent = score; }
        if (h.y > H + 60) holes.splice(i, 1);
      }
    }
    function draw() {
      if (!W) return;
      ctx.save();
      if (shake > 0 && !reduce) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      ctx.fillStyle = '#262626'; ctx.fillRect(-20, -20, W + 40, H + 40);
      // edges
      ctx.fillStyle = edgeCol; ctx.fillRect(5, -20, 4, H + 40); ctx.fillRect(W - 9, -20, 4, H + 40);
      // lane dashes
      var dash = H * 0.07, gap = H * 0.07, per = dash + gap, o = off % per;
      ctx.fillStyle = 'rgba(255,255,255,.85)';
      for (var l = 1; l <= 2; l++) for (var y = -per + o; y < H + per; y += per) ctx.fillRect(laneW() * l - 2, y, 4, dash);
      // potholes
      var rx = laneW() * 0.3, ry = rx * 0.6;
      holes.forEach(function (h) {
        var x = cx(h.l);
        ctx.beginPath(); ctx.ellipse(x, h.y, rx + 5, ry + 4, 0, 0, Math.PI * 2); ctx.fillStyle = '#4a4a4a'; ctx.fill();
        ctx.beginPath(); ctx.ellipse(x, h.y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = '#000'; ctx.fill();
        ctx.beginPath(); ctx.ellipse(x - rx * 0.2, h.y - ry * 0.25, rx * 0.35, ry * 0.2, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fill();
      });
      // rider
      var s = laneW() * 0.62;
      ctx.beginPath(); ctx.ellipse(px, py() + s * 0.46, s * 0.42, s * 0.14, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fill();
      ctx.save(); ctx.translate(px, py()); ctx.rotate(lean * 0.5);
      ctx.font = s + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🛵', 0, 0);
      ctx.restore();
      ctx.restore();
    }
    function frame(t) {
      raf = 0;
      if (!vis || document.hidden) { last = 0; return; }
      if (!last) last = t;
      var dt = Math.min(0.05, (t - last) / 1000); last = t;
      if (state === 'play') update(dt);
      else if (state === 'idle' && !reduce) off += H * 0.1 * dt;
      if (shake > 0) shake = Math.max(0, shake - 60 * dt);
      draw();
      if (state !== 'over' || shake > 0) raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf && vis) { last = 0; raf = requestAnimationFrame(frame); } }
    function start() {
      reset(); state = 'play'; ov.hidden = true; kick();
    }
    function over() {
      state = 'over'; shake = 16;
      if (score > best) { best = score; lsSet(CONFIG.bestKey, String(best)); elBest.textContent = best; }
      ovT.textContent = 'bonk.';
      ovS.textContent = 'you swerved past ' + score + ' and hit one. that’s exactly why we’re filling them.';
      playBtn.firstChild.textContent = 'again ';
      ov.hidden = false; playBtn.focus({ preventScroll: true });
      kick();
    }
    function move(d) { if (state === 'play') lane = Math.max(0, Math.min(2, lane + d)); }

    playBtn.addEventListener('click', start);
    window.addEventListener('keydown', function (e) {
      if (state !== 'play') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { move(-1); e.preventDefault(); }
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { move(1); e.preventDefault(); }
    });
    cv.addEventListener('pointerdown', function (e) { var r = cv.getBoundingClientRect(); move(e.clientX - r.left < r.width / 2 ? -1 : 1); });
    $('#g-left').addEventListener('pointerdown', function (e) { e.preventDefault(); move(-1); });
    $('#g-right').addEventListener('pointerdown', function (e) { e.preventDefault(); move(1); });
    $('#g-left').addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') move(-1); });
    $('#g-right').addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') move(1); });

    if (window.ResizeObserver) new ResizeObserver(resize).observe(cv); else window.addEventListener('resize', resize);
    if (hasIO) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; if (vis) kick(); }, { threshold: 0.1 }).observe(cv);
    else { vis = true; kick(); }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });
    function readEdge() { edgeCol = (getComputedStyle(document.documentElement).getPropertyValue('--edge') || '').trim() || '#FFD60A'; draw(); }
    window.__potholeTheme = readEdge;
    resize(); reset(); readEdge();
  })();
}
