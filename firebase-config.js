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
(function () {
  const ready = !firebaseConfig.apiKey.startsWith('PASTE') &&
                !firebaseConfig.databaseURL.includes('PASTE_PROJECT_ID');
  if (ready) {
    try {
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      window.arcadeDB = firebase.database();
      console.log('[Arcade] Firebase connected ✓');
    } catch (e) {
      window.arcadeDB = null;
      console.warn('[Arcade] Firebase init failed:', e.message);
    }
  } else {
    window.arcadeDB = null;
    console.log('[Arcade] Firebase not configured — using localStorage only');
  }
})();
