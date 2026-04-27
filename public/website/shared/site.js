/* Shared JS — tweaks toggle for spec overlay across all templates. */
(function() {
  const STATE_KEY = 'cb-tpl-state';

  // Load saved state
  let state = { specs: false };
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) state = Object.assign(state, JSON.parse(saved));
  } catch (e) {}

  function applyState() {
    document.body.classList.toggle('specs-on', state.specs);
    const t = document.querySelector('[data-toggle="specs"]');
    if (t) t.classList.toggle('is-on', state.specs);
  }

  function saveState() {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function injectTweaksPanel() {
    if (document.querySelector('.cb-tweaks')) return;
    const html = `
      <div class="cb-tweaks">
        <div class="cb-tweaks__title">
          <span>Tweaks</span>
          <button class="cb-tweaks__close" aria-label="Close">×</button>
        </div>
        <div class="cb-tweaks__row">
          <label>Spec overlay</label>
          <button class="cb-toggle" data-toggle="specs" aria-label="Toggle spec overlay"></button>
        </div>
        <div class="cb-tweaks__row">
          <label>Copy screen</label>
          <button class="cb-copy-btn" data-action="copy-screen" aria-label="Copy screenshot to clipboard" style="appearance:none;background:rgba(41,151,255,.16);border:1px solid rgba(41,151,255,.40);color:#84c4ff;font:600 11px/1 'SF Pro Text',sans-serif;letter-spacing:.02em;padding:7px 12px;border-radius:8px;cursor:pointer;transition:all 180ms cubic-bezier(.4,0,.2,1);white-space:nowrap">📋 Copy</button>
        </div>
        <div class="cb-tweaks__row" style="border-top:1px solid rgba(255,255,255,.06); padding-top:10px">
          <span style="font-family:'SF Mono',monospace; font-size:10px; color:rgba(255,255,255,.45)">tip · press S to toggle · paste w/ ⌘V</span>
        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div.firstElementChild);

    document.querySelector('[data-toggle="specs"]').addEventListener('click', () => {
      state.specs = !state.specs; applyState(); saveState();
    });
    document.querySelector('.cb-tweaks__close').addEventListener('click', () => {
      document.body.classList.remove('tweaks-on');
      window.parent.postMessage({type: '__edit_mode_dismissed'}, '*');
    });

    // ===== Copy screen to clipboard =====
    const copyBtn = document.querySelector('[data-action="copy-screen"]');
    let h2cLoading = null;
    function loadH2C() {
      if (window.html2canvas) return Promise.resolve(window.html2canvas);
      if (h2cLoading) return h2cLoading;
      h2cLoading = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        s.onload = () => resolve(window.html2canvas);
        s.onerror = reject;
        document.head.appendChild(s);
      });
      return h2cLoading;
    }
    function setBtn(label, color) {
      copyBtn.textContent = label;
      if (color === 'ok') { copyBtn.style.background = 'rgba(48,209,88,.18)'; copyBtn.style.borderColor = 'rgba(48,209,88,.45)'; copyBtn.style.color = '#86efac'; }
      else if (color === 'err') { copyBtn.style.background = 'rgba(255,69,58,.18)'; copyBtn.style.borderColor = 'rgba(255,69,58,.45)'; copyBtn.style.color = '#fca5a5'; }
      else { copyBtn.style.background = 'rgba(41,151,255,.16)'; copyBtn.style.borderColor = 'rgba(41,151,255,.40)'; copyBtn.style.color = '#84c4ff'; }
    }
    copyBtn.addEventListener('click', async () => {
      const panel = document.querySelector('.cb-tweaks');
      try {
        setBtn('… loading', null);
        const h2c = await loadH2C();
        // Hide the tweaks panel during capture so the screenshot is clean
        panel.style.visibility = 'hidden';
        await new Promise(r => requestAnimationFrame(r));
        const canvas = await h2c(document.body, {
          backgroundColor: null,
          useCORS: true,
          scale: Math.min(window.devicePixelRatio || 1, 2),
          windowWidth: document.documentElement.scrollWidth,
          windowHeight: document.documentElement.scrollHeight,
          x: window.scrollX,
          y: window.scrollY,
          width: window.innerWidth,
          height: window.innerHeight,
        });
        panel.style.visibility = '';
        setBtn('… copying', null);
        const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
        if (!blob) throw new Error('no blob');
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setBtn('✓ copied — ⌘V', 'ok');
        setTimeout(() => setBtn('📋 Copy', null), 2400);
      } catch (err) {
        panel.style.visibility = '';
        console.error('[copy-screen]', err);
        setBtn('✗ failed', 'err');
        setTimeout(() => setBtn('📋 Copy', null), 2400);
      }
    });
  }

  // Edit-mode protocol — listener FIRST, then announce.
  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === '__activate_edit_mode') {
      document.body.classList.add('tweaks-on');
    } else if (e.data.type === '__deactivate_edit_mode') {
      document.body.classList.remove('tweaks-on');
    }
  });
  try { window.parent.postMessage({type: '__edit_mode_available'}, '*'); } catch (e) {}

  // Keyboard shortcut: S toggles spec overlay
  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input,textarea,select')) return;
    if (e.key === 's' || e.key === 'S') {
      state.specs = !state.specs; applyState(); saveState();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    injectTweaksPanel();
    applyState();
  });
})();
