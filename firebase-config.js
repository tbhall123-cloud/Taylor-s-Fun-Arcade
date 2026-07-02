// ── Taylor's Arcade — Firebase Config ──────────────────────────────
//
//  HOW TO SET UP (takes ~5 minutes):
//  1. Go to console.firebase.google.com and sign in with Google
//  2. Click "Add project" → give it any name → continue
//  3. In the left menu: Build → Realtime Database → Create database
//     → choose a region → Start in TEST MODE → Enable
//  4. In the left menu: Project settings (gear icon) → Your apps
//     → click the </> web icon → register app → copy the firebaseConfig
//  5. Paste the values from that config into the fields below
//  6. Save this file — all games and the main page update automatically
//
// ────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: "AIzaSyA9xCALk939p35fTG4kSdxJSjUZkzDyYb4",
  authDomain: "taylor-s-fun-arcade.firebaseapp.com",
  databaseURL: "https://taylor-s-fun-arcade-default-rtdb.firebaseio.com",
  projectId: "taylor-s-fun-arcade",
  storageBucket: "taylor-s-fun-arcade.firebasestorage.app",
  messagingSenderId: "272766011512",
  appId: "1:272766011512:web:ac2c1db9c4510dab8f858d",
  measurementId: "G-87MWH2R7QT"
};

// Don't touch below this line ─────────────────────────────────────

// Security helpers shared by every page.
// Leaderboard entries come from a shared database that anyone can write to,
// so every value must be escaped before being placed into HTML.
window.arcadeEsc = function (v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};
// Numbers from the database may be strings or garbage — coerce safely.
window.arcadeNum = function (v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
// Clean a player name before saving: letters/digits/basic punctuation, max 12 chars.
window.arcadeCleanName = function (v) {
  return String(v == null ? '' : v)
    .replace(/[^\w \-_.!?]/g, '').trim().slice(0, 12).toUpperCase() || 'PLAYER';
};

(function () {
  const ready = !firebaseConfig.apiKey.startsWith('PASTE') &&
                !firebaseConfig.databaseURL.includes('PASTE_PROJECT_ID');
  if (ready) {
    try {
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      window.arcadeDB = firebase.database();
      console.log('[Arcade] Firebase connected ✓');

      // Test whether the database rules allow reads.
      // Firebase test-mode rules expire after 30 days; when they do, every
      // read/write silently fails with PERMISSION_DENIED.
      window.arcadeDB.ref('arcade').limitToFirst(1).once('value')
        .then(() => {
          window.arcadeRulesOk = true;
          console.log('[Arcade] Firebase rules OK ✓');
        })
        .catch(err => {
          window.arcadeRulesOk = false;
          if (err.code === 'PERMISSION_DENIED') {
            console.error(
              '[Arcade] 🚫 Firebase rules are blocking reads/writes!\n' +
              '  Scores will NOT sync across devices until you fix this.\n' +
              '  Fix: Firebase Console → Realtime Database → Rules\n' +
              '  Set both ".read" and ".write" to true (open rules) or add\n' +
              '  expiry-free rules.\n' +
              '  Direct link: https://console.firebase.google.com/project/' +
              firebaseConfig.projectId + '/database/' +
              firebaseConfig.projectId + '-default-rtdb/rules'
            );
            // Show a dismissible banner on the page so it's hard to miss.
            const showBanner = () => {
              if (document.getElementById('arcade-rules-banner')) return;
              const b = document.createElement('div');
              b.id = 'arcade-rules-banner';
              b.style.cssText =
                'position:fixed;top:0;left:0;right:0;z-index:99999;' +
                'background:#c0392b;color:#fff;padding:10px 16px;' +
                'font:14px/1.4 system-ui,sans-serif;text-align:center;';
              b.innerHTML =
                '⚠️ Firebase rules have expired — leaderboards won\'t sync across devices. ' +
                '<a href="https://console.firebase.google.com/project/' +
                firebaseConfig.projectId + '/database/' +
                firebaseConfig.projectId + '-default-rtdb/rules" ' +
                'target="_blank" rel="noopener noreferrer" style="color:#ffd700;font-weight:bold;">' +
                'Fix in Firebase Console →</a>' +
                '&nbsp;&nbsp;<button onclick="this.parentNode.remove()" ' +
                'style="background:none;border:1px solid rgba(255,255,255,0.5);' +
                'color:#fff;cursor:pointer;padding:2px 8px;border-radius:3px;">' +
                '✕</button>';
              if (document.body) document.body.prepend(b);
              else document.addEventListener('DOMContentLoaded', () => document.body.prepend(b));
            };
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', showBanner);
            } else {
              showBanner();
            }
          }
        });

    } catch (e) {
      window.arcadeDB = null;
      console.warn('[Arcade] Firebase init failed:', e.message);
    }
  } else {
    window.arcadeDB = null;
    console.log('[Arcade] Firebase not configured — using localStorage only');
  }
})();
