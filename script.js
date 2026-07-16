// =====================================================================
// CONSTELLATIONS — this is the ONLY place you need to edit to add a new
// constellation or a new song. Nothing else in this file needs to change.
//
// Each entry:
//   id            unique string
//   name          shown as the floating sky label
//   isEasterEgg   true suppresses the idle pulse, the sky label, and the
//                 nebula wash — used for the hidden JT cluster
//   mythNote      one-line myth text shown under the name (null = none)
//   stars         [{x,y}, ...] positions as % of the sky (0-100). Array
//                 order is also the order stars reveal on hover.
//   edges         [[i,j], ...] pairs of star indices to connect with a
//                 line once both ends are revealed
//   centerPct     {x,y} % position the camera flies to on activation
//   focusZoom     how far the camera zooms in for focus mode
//   nebulaColor   faint background color wash, or null for none
//   illustrationSrc  path to a mythological reference illustration that
//                 fades in behind the stars on focus, or omit for none.
//                 The image is alpha-matted and cropped at load time —
//                 see preloadIllustrations().
//   illustrationRotation  degrees to rotate the illustration around its
//                 own center before compositing (positive = clockwise).
//                 Optional, defaults to 0 — a per-image alignment knob,
//                 doesn't affect the alpha-matting/crop pass.
//   illustrationMaxAlpha  peak opacity the illustration fades in to.
//                 Optional, defaults to CONFIG.ILLUSTRATION_MAX_ALPHA —
//                 a per-image override for art that reads too faint (or
//                 too strong) at the shared default.
//   skipMatting   true draws the illustration as-is (no background
//                 removal/auto-crop) at low flat opacity — for full
//                 paintings/photos with no flat background to matte out.
//                 Optional, defaults to false. Sizing, centering, fade
//                 timing, and rotation all still work the same either way.
//   illustrationFeather  true fades the illustration's own outer edges
//                 to transparent (see featherCanvasEdges()), so a hard
//                 rectangular image boundary doesn't show against the
//                 sky. Independent of skipMatting — applies after either
//                 the matting pass or the as-is load. Optional, defaults
//                 to false.
//   songs         [{file, title, artist}, ...] a random real song (file
//                 not null) plays on each activation — see pickSong().
//                 Add a real song by filling in a placeholder slot below —
//                 use file:null for a reserved/future slot.
//   visited       whether it has ever been activated (starts false)
// =====================================================================
const CONSTELLATIONS = [
  {
    id: "orion",
    name: "Orion",
    isEasterEgg: false,
    mythNote: "The great hunter, forever chasing the horizon",
    stars: [
      { x: 7.00, y: 10.70 }, { x: 7.28, y: 17.07 }, { x: 8.84, y: 22.79 },
      { x: 10.00, y: 25.87 }, { x: 12.19, y: 37.54 }, { x: 11.17, y: 47.00 },
      { x: 16.50, y: 45.27 }, { x: 16.03, y: 43.67 }, { x: 13.77, y: 35.28 },
      { x: 14.93, y: 27.31 }, { x: 18.97, y: 27.28 }, { x: 19.78, y: 26.45 },
      { x: 20.26, y: 22.22 }, { x: 20.40, y: 21.03 }, { x: 20.33, y: 18.11 },
      { x: 19.59, y: 17.04 }, { x: 13.29, y: 23.61 }, { x: 13.22, y: 22.37 },
      { x: 8.16, y: 16.41 }, { x: 8.72, y: 10.00 },
      { x: 14.35, y: 31.30 },
    ],
    edges: [
      [0, 1], [1, 2], [2, 3],
      [1, 18], [18, 19],
      [3, 4],
      [4, 8],
      [8, 9],
      [9, 17], [17, 16], [16, 3],
      [4, 5],
      [8, 7], [7, 6],
      [9, 13], [15, 14], [14, 13], [13, 12], [12, 11], [11, 10],
    ],
    centerPct: { x: 13.7, y: 28.5 },
    focusZoom: 2.2,
    nebulaColor: "rgba(255,150,60,0.14)",
    illustrationSrc: "illustrations/orion.png",
    illustrationRotation: 0,
    illustrationMaxAlpha: 0.18,
    songs: [
      { file: "audio/night-shift.mp4", title: "Night Shift", artist: "Lucy Dacus" },
      { file: "audio/lover.mp4", title: "Lover You Should've Come Over", artist: "Jeff Buckley" },
      { file: "audio/thecure.mp4", title: "The Cure", artist: "Olivia Rodrigo" },
    ],
    visited: false,
  },
  {
    id: "pleiades",
    name: "Pleiades",
    isEasterEgg: false,
    mythNote: "Seven sisters transformed into stars, still running",
    stars: [
      { x: 48.25, y: 16.21 }, { x: 46.00, y: 17.89 }, { x: 46.07, y: 16.54 },
      { x: 50.16, y: 18.23 }, { x: 51.94, y: 15.30 }, { x: 52.00, y: 12.67 },
      { x: 50.39, y: 12.08 }, { x: 51.43, y: 10.41 }, { x: 50.20, y: 9.77 },
    ],
    edges: [
      [0, 1], [1, 2], [0, 3], [4, 5],
      [5, 7], [7, 6], [6, 4], [0, 6], [4, 3],
    ],
    centerPct: { x: 49, y: 14 },
    focusZoom: 3.5,
    nebulaColor: "rgba(120,160,255,0.12)",
    illustrationSrc: "illustrations/pleiades.jpg",
    skipMatting: true,
    illustrationFeather: true,
    songs: [
      { file: "audio/mirrorball.mp4", title: "Mirrorball", artist: "Taylor Swift" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    visited: false,
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    isEasterEgg: false,
    mythNote: "The vain queen, chained to her throne and spinning through the sky forever",
    stars: [
      { x: 66.00, y: 8.00 }, { x: 70.83, y: 14.00 }, { x: 73.77, y: 11.50 }, { x: 76.76, y: 15.50 }, { x: 82.00, y: 13.50 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    centerPct: { x: 74, y: 11.75 },
    focusZoom: 2.8,
    nebulaColor: "rgba(170,120,255,0.11)",
    illustrationSrc: "illustrations/cass.jpg",
    illustrationRotation: 90,
    illustrationMaxAlpha: 0.20,
    songs: [
      { file: "audio/linger.mp3", title: "Linger", artist: "The Cranberries" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    visited: false,
  },
  {
    id: "leo",
    name: "Leo",
    isEasterEgg: false,
    mythNote: "The Nemean lion, golden and unconquerable",
    stars: [
      { x: 78.00, y: 54.00 }, { x: 81.83, y: 48.06 }, { x: 88.68, y: 46.05 },
      { x: 90.71, y: 47.64 }, { x: 91.47, y: 51.60 }, { x: 82.44, y: 52.12 },
      { x: 88.46, y: 43.37 }, { x: 90.85, y: 40.00 }, { x: 92.00, y: 41.18 },
    ],
    edges: [
      [0, 1], [0, 5], [5, 4], [1, 2], [2, 6], [2, 3], [3, 4], [6, 7], [7, 8],
    ],
    centerPct: { x: 85, y: 47 },
    focusZoom: 2.3,
    nebulaColor: "rgba(110,150,255,0.10)",
    illustrationSrc: "illustrations/leo.png",
    illustrationRotation: 0,
    songs: [
      { file: "audio/alley-rose.mp3", title: "Alley Rose", artist: "Conan Gray" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    visited: false,
  },
  {
    id: "lyra",
    name: "Lyra",
    isEasterEgg: false,
    mythNote: "The lyre of Orpheus, still singing after he was gone",
    stars: [
      { x: 12.50, y: 84.44 }, { x: 14.37, y: 86.03 }, { x: 18.07, y: 76.61 },
      { x: 21.50, y: 74.66 }, { x: 19.22, y: 71.98 }, { x: 15.70, y: 74.86 },
    ],
    edges: [
      [0, 1], [0, 5], [1, 2], [5, 2], [2, 4], [4, 3], [3, 2],
    ],
    centerPct: { x: 17, y: 79 },
    focusZoom: 3.2,
    nebulaColor: "rgba(150,110,255,0.12)",
    illustrationSrc: "illustrations/lyra.jpg",
    illustrationRotation: 0,
    illustrationMaxAlpha: 0.18,
    // Shares its only real song with Aquarius, but song selection is
    // tracked per-constellation (see constellationState), so the two
    // pick independently.
    songs: [
      { file: "audio/sidelines.mp3", title: "Sidelines", artist: "Phoebe Bridgers" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    visited: false,
  },
  {
    id: "aquarius",
    name: "Aquarius",
    isEasterEgg: false,
    mythNote: "The water-bearer, pouring endlessly into the dark",
    stars: [
      { x: 44.88, y: 87.49 }, { x: 44.00, y: 79.74 }, { x: 45.40, y: 77.78 }, { x: 46.41, y: 78.12 },
      { x: 47.34, y: 82.59 }, { x: 46.24, y: 85.13 }, { x: 46.00, y: 88.10 }, { x: 49.82, y: 78.15 },
      { x: 50.72, y: 73.68 }, { x: 49.27, y: 73.09 }, { x: 49.22, y: 72.24 }, { x: 48.55, y: 71.90 },
      { x: 48.29, y: 73.46 }, { x: 53.94, y: 76.55 }, { x: 50.61, y: 82.95 }, { x: 58.00, y: 80.38 },
    ],
    edges: [
      [11, 10], [10, 9], [9, 8], [11, 12], [12, 9],
      [8, 7], [7, 3], [3, 2], [2, 1],
      [3, 4], [4, 5],
      [1, 0], [1, 5], [1, 6],
      [7, 13], [8, 13], [13, 14], [13, 15],
    ],
    centerPct: { x: 51, y: 80 },
    focusZoom: 2.0,
    nebulaColor: "rgba(120,170,255,0.10)",
    illustrationSrc: "illustrations/aquarius.png",
    illustrationRotation: 90,
    songs: [
      { file: "audio/sidelines.mp3", title: "Sidelines", artist: "Phoebe Bridgers" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    visited: false,
  },
  // ---- HIDDEN EASTER EGG -------------------------------------------
  // A small unlabeled cluster shaped like the initials "JT". No pulse,
  // no name, no mythNote — reuses all the normal constellation code via
  // isEasterEgg:true, which just switches off the pulse/label/nebula.
  {
    id: "jt-easter-egg",
    name: "",
    isEasterEgg: true,
    mythNote: null,
    stars: [
      { x: 92, y: 64 }, { x: 92, y: 68 }, { x: 92, y: 71 }, { x: 90, y: 73 }, { x: 88, y: 72 }, // "J"
      { x: 95, y: 64 }, { x: 97, y: 64 }, { x: 99, y: 64 }, { x: 97, y: 69 }, { x: 97, y: 73 }, // "T"
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [6, 8], [8, 9]],
    centerPct: { x: 95, y: 69 },
    focusZoom: 3.2,
    nebulaColor: null,
    songs: [
      { file: "audio/ivy.mp3", title: "Ivy", artist: "Frank Ocean" },
    ],
    visited: false,
  },
];

// =====================================================================
// SHOOTING-STAR QUOTES — edit this list to add or remove quotes. Any
// attribution (" — Movie") is just part of the string itself.
// =====================================================================
const QUOTES = [
  "oink oink mother fucker",
  "I'll be the aspergers and you be the asspancakes - DPL",
  "please just let me keep this one memory. — Eternal Sunshine of the Spotless Mind",
  "You had to leave because you're you. And the reason I liked you is because you're you. And who you are is someone who leaves. — Past Lives",
  "I Want to Eat Your Pancreas",
  "The First time a girl called me daddy I was 10 - DPL",
  "To know how it ends and still begin to sing it again, as if it might turn out this time. - Hermes",
  "I Want To Eat Your Uterus",
];

// =====================================================================
// CONFIG
// =====================================================================
const CONFIG = {
  SKY_W: 1600,
  SKY_H: 900,
  PARALLAX: { far: 0.25, mid: 0.55, near: 1.0 },
  STAR_COUNTS: { far: 880, mid: 560, near: 320 },
  EASE_NORMAL: 0.15,
  EASE_FOCUS: 0.045,
  MIN_ZOOM: 0.6,
  MAX_ZOOM: 4.5,
  DEFAULT_ZOOM: 0.67,
  ROTATION_SENSITIVITY: 0.0006,
  MAX_ROTATION: 0.15,
  HOVER_RADIUS: 55,
  LEAVE_RADIUS: 230,
  FOCUS_DIST_EPS: 150,
  FOCUS_ZOOM_EPS: 0.6,
  CROSSFADE_MS: 1500,
  SHOOTING_STAR_MIN_MS: 30000,
  SHOOTING_STAR_MAX_MS: 60000,
  NUDGE_SPEED: 350,
  MOON_POS: { x: 82, y: 10 },
  ILLUSTRATION_MAX_ALPHA: 0.10,
  ILLUSTRATION_PADDING: 2.2,
  ILLUSTRATION_FADE_IN_RATE: 0.045,
  ILLUSTRATION_FADE_OUT_RATE: 0.065,
  ILLUSTRATION_LUM_THRESHOLD: 20,
  ILLUSTRATION_TINT: [210, 225, 255],
  ILLUSTRATION_EDGE_MARGIN_FRAC: 0.02,
  ILLUSTRATION_CAPTION_GAP_FRAC: 0.04,
  ILLUSTRATION_FEATHER_FRAC: 0.18,
  INTRO: {
    igniteWindow: 1400,
    igniteDur: 400,
    linesStart: 1400,
    linesDur: 500,
    pulseStart: 1900,
    pulseDur: 500,
    subtitleInStart: 2200,
    fadeOutStart: 5700,
    fadeOutDur: 1500,
    dissolveStart: 6200,
    dissolveDur: 2000,
    doneAt: 8200,
  },
};

// =====================================================================
// STATE
// =====================================================================
const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;
let dpr = window.devicePixelRatio || 1;

const camera = {
  panX: 0, panY: 0, zoom: CONFIG.DEFAULT_ZOOM, rotation: 0,
  targetPanX: 0, targetPanY: 0, targetZoom: CONFIG.DEFAULT_ZOOM, targetRotation: 0,
  easeSpeed: CONFIG.EASE_NORMAL,
};

const input = {
  dragging: false,
  dragMoved: false,
  lastX: 0, lastY: 0, startX: 0, startY: 0,
  velX: 0, velY: 0,
  coasting: false,
  pinching: false,
  pinchStartDist: 0,
  lastMidX: 0, lastMidY: 0,
  keysDown: new Set(),
};

const ui = {
  activeFocusId: null,
};

const bgStars = { far: [], mid: [], near: [] };

const constellationState = new Map();

// Processed (alpha-matted, cropped) illustration canvases, keyed by
// constellation id. Populated asynchronously by preloadIllustrations().
const illustrationAssets = new Map();

const audioState = {
  elements: [],
  currentEl: null,
  currentEntry: null,
  currentSong: null,
  crossfade: null,
  ambientCtx: null,
  quoteTimer: null,
  lastQuoteIndex: -1,
};

const seekState = { dragging: false };

const shootingStar = { active: false, nextAt: 0 };

let introDone = false;
let introStart = null;
let introNameStars = [];
let introNameEdges = [];
let introCenterX = 0, introCenterY = 0;

// =====================================================================
// INIT
// =====================================================================
function resizeCanvas() {
  cw = window.innerWidth;
  ch = window.innerHeight;
  dpr = window.devicePixelRatio || 1;
  canvas.width = cw * dpr;
  canvas.height = ch * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  introCenterX = cw / 2;
  introCenterY = ch * 0.38;
}

function randRange(a, b) {
  return a + Math.random() * (b - a);
}

function generateBackgroundStars() {
  const BUFFER_X = CONFIG.SKY_W * 0.5;
  const BUFFER_Y = CONFIG.SKY_H * 0.5;
  for (const layer of ["far", "mid", "near"]) {
    const count = CONFIG.STAR_COUNTS[layer];
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: randRange(-BUFFER_X, CONFIG.SKY_W + BUFFER_X),
        y: randRange(-BUFFER_Y, CONFIG.SKY_H + BUFFER_Y),
        size: layer === "far" ? randRange(0.5, 1.2) : layer === "mid" ? randRange(0.8, 1.8) : randRange(1.2, 2.6),
        baseAlpha: layer === "far" ? randRange(0.2, 0.45) : layer === "mid" ? randRange(0.3, 0.6) : randRange(0.45, 0.85),
        twinkleSpeed: layer === "far" ? randRange(0.3, 0.6) : layer === "mid" ? randRange(0.6, 1.1) : randRange(1.0, 1.8),
        twinkleAmp: layer === "far" ? randRange(0.05, 0.12) : layer === "mid" ? randRange(0.1, 0.2) : randRange(0.15, 0.3),
        phase: randRange(0, Math.PI * 2),
        warm: Math.random() < 0.4,
      });
    }
    bgStars[layer] = arr;
  }
}

function initConstellationState() {
  for (const cs of CONSTELLATIONS) {
    const state = {
      hoverProgress: -1,
      alphas: cs.stars.map(() => 0),
      pulsePhase: Math.random() * Math.PI * 2,
      postSongGlow: 0,
      ripple: null,
      illustrationAlpha: 0,
      illustrationBoxW: 0,
      illustrationBoxH: 0,
      lastSongIndex: -1,
    };
    if (cs.illustrationSrc) {
      // The illustration is fit inside a padded box derived from the
      // constellation's own star spread, so it scales with the star field
      // instead of needing a hand-tuned size per constellation.
      const xs = cs.stars.map((s) => s.x);
      const ys = cs.stars.map((s) => s.y);
      state.illustrationBoxW = ((Math.max(...xs) - Math.min(...xs)) / 100) * CONFIG.SKY_W;
      state.illustrationBoxH = ((Math.max(...ys) - Math.min(...ys)) / 100) * CONFIG.SKY_H;
    }
    constellationState.set(cs.id, state);
  }
}

// Script font used to trace the intro name's letterforms — an installed
// system font, not a bundled asset, so this works offline with no load
// delay. Falls back gracefully across OSes.
const SCRIPT_FONT_STACK = '"Segoe Script", "Brush Script MT", "Lucida Handwriting", "Apple Chancery", cursive';
const GLYPH_TRACE_PX = 220;
const GLYPH_MASK_ALPHA_THRESHOLD = 120;

// Renders one character solid and binarizes it into an ink/no-ink mask —
// the raw material for skeletonization below.
function rasterizeGlyphMask(ch, fontPx, ascent, descent) {
  const pad = Math.ceil(fontPx * 0.18);
  const off = document.createElement("canvas");
  const octx = off.getContext("2d");
  octx.font = `${fontPx}px ${SCRIPT_FONT_STACK}`;
  const advance = octx.measureText(ch).width;
  const w = Math.max(1, Math.ceil(advance + pad * 2));
  const h = Math.ceil(ascent + descent + pad * 2);
  off.width = w;
  off.height = h;
  // Resizing the canvas resets context state, so the font has to be
  // re-applied before drawing.
  octx.font = `${fontPx}px ${SCRIPT_FONT_STACK}`;
  octx.fillStyle = "#fff";
  octx.textBaseline = "alphabetic";
  const baselineY = pad + ascent;
  octx.fillText(ch, pad, baselineY);

  let data;
  try {
    data = octx.getImageData(0, 0, w, h).data;
  } catch (e) {
    return null;
  }
  const mask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) mask[i] = data[i * 4 + 3] >= GLYPH_MASK_ALPHA_THRESHOLD ? 1 : 0;
  return { mask, w, h, advance, baselineY, pad };
}

// Zhang-Suen thinning: erodes the filled glyph down to a 1px-wide medial
// skeleton that still follows every loop, crossbar and branch — unlike a
// per-column average, a loop's skeleton actually goes around the loop
// instead of collapsing it into a flat line through the middle.
function thinMask(mask, w, h) {
  let m = mask.slice();
  const at = (x, y) => (x >= 0 && x < w && y >= 0 && y < h ? m[y * w + x] : 0);
  let changed = true;
  while (changed) {
    changed = false;
    for (const pass of [0, 1]) {
      const toClear = [];
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x;
          if (!m[idx]) continue;
          const p2 = at(x, y - 1), p3 = at(x + 1, y - 1), p4 = at(x + 1, y), p5 = at(x + 1, y + 1);
          const p6 = at(x, y + 1), p7 = at(x - 1, y + 1), p8 = at(x - 1, y), p9 = at(x - 1, y - 1);
          const ring = [p2, p3, p4, p5, p6, p7, p8, p9];
          const B = ring.reduce((s, v) => s + v, 0);
          if (B < 2 || B > 6) continue;
          let A = 0;
          for (let i = 0; i < 8; i++) if (ring[i] === 0 && ring[(i + 1) % 8] === 1) A++;
          if (A !== 1) continue;
          if (pass === 0) {
            if (p2 * p4 * p6 !== 0) continue;
            if (p4 * p6 * p8 !== 0) continue;
          } else {
            if (p2 * p4 * p8 !== 0) continue;
            if (p2 * p6 * p8 !== 0) continue;
          }
          toClear.push(idx);
        }
      }
      if (toClear.length) {
        changed = true;
        for (const idx of toClear) m[idx] = 0;
      }
    }
  }
  return m;
}

// Builds an 8-connected graph out of the skeleton's remaining "on" pixels.
// A diagonal neighbor is dropped whenever EITHER flanking orthogonal pixel
// is also on: that means an orthogonal path already links the two pixels
// one step further round, so also counting the diagonal adds a redundant
// "shortcut" edge. Under plain 8-connectivity, an ordinary staircase-
// shaped stroke is full of these shortcuts — nearly every pixel ends up
// looking like a 3-4-way junction even though the stroke never branches —
// which is what was fragmenting letters into hundreds of tiny segments
// instead of a few clean strokes.
function buildSkeletonGraph(mask, w, h) {
  const at = (x, y) => (x >= 0 && x < w && y >= 0 && y < h ? mask[y * w + x] : 0);
  const nodeOf = new Map();
  const points = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (mask[y * w + x]) {
        nodeOf.set(y * w + x, points.length);
        points.push({ x, y });
      }
    }
  }
  const ORTHO = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  const DIAG = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
  const adjacency = points.map(() => []);
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    for (const [dx, dy] of ORTHO) {
      if (x + dx < 0 || x + dx >= w) continue;
      const ni = nodeOf.get((y + dy) * w + (x + dx));
      if (ni !== undefined) adjacency[i].push(ni);
    }
    for (const [dx, dy] of DIAG) {
      if (x + dx < 0 || x + dx >= w) continue;
      if (at(x + dx, y) || at(x, y + dy)) continue;
      const ni = nodeOf.get((y + dy) * w + (x + dx));
      if (ni !== undefined) adjacency[i].push(ni);
    }
  }
  return { points, adjacency };
}

// Thinning leaves short dangling spurs at rounded stroke caps and near
// junctions — prune any endpoint-to-junction branch shorter than minLen
// so artifacts don't masquerade as real letter features (an extra "hook"
// that isn't part of the actual letterform).
function pruneSpurs(points, adjacency, minLen) {
  const removed = new Set();
  const degree = (i) => adjacency[i].filter((n) => !removed.has(n)).length;
  let prunedAny = true;
  while (prunedAny) {
    prunedAny = false;
    for (let i = 0; i < points.length; i++) {
      if (removed.has(i) || degree(i) !== 1) continue;
      const branch = [i];
      let prev = -1, cur = i;
      while (true) {
        const nbrs = adjacency[cur].filter((n) => !removed.has(n) && n !== prev);
        if (nbrs.length !== 1) break;
        prev = cur;
        cur = nbrs[0];
        branch.push(cur);
        if (degree(cur) !== 2) break;
      }
      if (degree(cur) >= 3 && branch.length < minLen) {
        for (const b of branch.slice(0, -1)) removed.add(b);
        prunedAny = true;
      }
    }
  }
  return removed;
}

function perpendicularDistance(pt, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(pt.x - a.x, pt.y - a.y);
  const t = ((pt.x - a.x) * dx + (pt.y - a.y) * dy) / len2;
  const px = a.x + t * dx, py = a.y + t * dy;
  return Math.hypot(pt.x - px, pt.y - py);
}

// Douglas-Peucker corner-preserving simplification — returns the retained
// indices (not new point objects) so callers can still reach back into
// the original detailed path between two kept vertices.
function simplifyIndices(points, epsilon) {
  if (points.length < 3) return points.map((_, i) => i);
  const keep = new Set([0, points.length - 1]);
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [start, end] = stack.pop();
    if (end <= start + 1) continue;
    let maxDist = 0, index = -1;
    for (let i = start + 1; i < end; i++) {
      const d = perpendicularDistance(points[i], points[start], points[end]);
      if (d > maxDist) { maxDist = d; index = i; }
    }
    if (maxDist > epsilon && index !== -1) {
      keep.add(index);
      stack.push([start, index], [index, end]);
    }
  }
  return Array.from(keep).sort((a, b) => a - b);
}

// Cumulative arc length along a polyline, so bezier controls can be
// placed by distance traveled rather than raw index.
function arcLengthTable(pts) {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  return cum;
}

function pointAtArcLength(pts, cum, target) {
  if (pts.length === 1) return pts[0];
  const total = cum[cum.length - 1];
  const clamped = Math.max(0, Math.min(total, target));
  let i = 0;
  while (i < cum.length - 2 && cum[i + 1] < clamped) i++;
  const segLen = cum[i + 1] - cum[i] || 1;
  const t = (clamped - cum[i]) / segLen;
  return {
    x: pts[i].x + (pts[i + 1].x - pts[i].x) * t,
    y: pts[i].y + (pts[i + 1].y - pts[i].y) * t,
  };
}

// Walks the skeleton graph into polylines: open chains between
// endpoints/junctions, plus whole closed loops (a letter like "o" thins
// to a pure ring with no endpoints at all).
function extractSkeletonSegments(points, adjacency, removed) {
  const alive = (i) => !removed.has(i);
  const degree = (i) => adjacency[i].filter(alive).length;
  const visitedEdge = new Set();
  const edgeKey = (a, b) => (a < b ? a + "_" + b : b + "_" + a);
  const segments = [];

  function walk(start, next) {
    const seg = [points[start], points[next]];
    visitedEdge.add(edgeKey(start, next));
    let prev = start, cur = next;
    while (degree(cur) === 2) {
      const nbrs = adjacency[cur].filter((n) => alive(n) && n !== prev);
      if (nbrs.length !== 1) break;
      const nxt = nbrs[0];
      const key = edgeKey(cur, nxt);
      if (visitedEdge.has(key)) break;
      visitedEdge.add(key);
      seg.push(points[nxt]);
      prev = cur;
      cur = nxt;
    }
    return seg;
  }

  for (let i = 0; i < points.length; i++) {
    if (!alive(i) || degree(i) === 2) continue;
    for (const nb of adjacency[i]) {
      if (!alive(nb) || visitedEdge.has(edgeKey(i, nb))) continue;
      segments.push({ path: walk(i, nb), cycle: false });
    }
  }
  // Whatever edges are still unvisited belong to pure cycles (every node
  // on them has degree 2 — no endpoint/junction to start a walk from).
  for (let i = 0; i < points.length; i++) {
    if (!alive(i)) continue;
    for (const nb of adjacency[i]) {
      if (!alive(nb) || visitedEdge.has(edgeKey(i, nb))) continue;
      const seg = walk(i, nb);
      seg.push(points[i]); // close the ring back to the start
      segments.push({ path: seg, cycle: true });
    }
  }
  return segments;
}

// Samples a letter down to a handful of star points (~6-10) chosen from
// its actual skeleton topology — corners, loop tops/bottoms and crossbars
// survive because this traces the true medial-axis structure instead of
// a per-column average. Each edge carries a bezier control point pulled
// from the true midpoint of the underlying detailed path, so the curve
// between two sparse stars still bows the way the real glyph flows.
function sampleLetterPath(ch, fontPx, ascent, descent) {
  const raster = rasterizeGlyphMask(ch, fontPx, ascent, descent);
  if (!raster) return { points: [], edges: [], advance: 0 };
  const { mask, w, h, advance, baselineY, pad } = raster;
  const thin = thinMask(mask, w, h);
  const { points: pxPoints, adjacency } = buildSkeletonGraph(thin, w, h);
  if (pxPoints.length === 0) return { points: [], edges: [], advance };

  const removed = pruneSpurs(pxPoints, adjacency, Math.max(3, fontPx * 0.06));
  let segments = extractSkeletonSegments(pxPoints, adjacency, removed);

  // A junction can sit right next to another junction (e.g. where a "p"
  // stem passes close to its own loop) with only a few noisy pixels
  // between them — a redundant bridge, not a real letter feature. Drop
  // any short segment whose *both* ends are junctions.
  const degreeMap = new Map();
  for (let i = 0; i < pxPoints.length; i++) {
    if (removed.has(i)) continue;
    degreeMap.set(pxPoints[i].x + "," + pxPoints[i].y, adjacency[i].filter((n) => !removed.has(n)).length);
  }
  const BRIDGE_MIN = Math.max(6, fontPx * 0.1);
  segments = segments.filter((seg) => {
    if (seg.cycle || seg.path.length >= BRIDGE_MIN) return true;
    const first = seg.path[0], last = seg.path[seg.path.length - 1];
    const dFirst = degreeMap.get(first.x + "," + first.y) || 0;
    const dLast = degreeMap.get(last.x + "," + last.y) || 0;
    return !(dFirst >= 3 && dLast >= 3);
  });

  const DP_EPSILON = fontPx * 0.035;
  const CYCLE_UNIT = fontPx * 0.22;
  const chosen = [];
  const localEdges = [];
  // Junction/endpoint pixels are shared by more than one segment — dedupe
  // by pixel coordinate so a shared vertex becomes one star, not a cluster
  // of near-identical duplicates.
  const chosenIndexOf = new Map();
  function getOrAddPoint(x, y) {
    const key = x + "," + y;
    if (chosenIndexOf.has(key)) return chosenIndexOf.get(key);
    const idx = chosen.length;
    chosen.push({ x, y });
    chosenIndexOf.set(key, idx);
    return idx;
  }

  for (const seg of segments) {
    const path = seg.path;
    if (path.length < 2) continue;
    const cum = arcLengthTable(path);
    const total = cum[cum.length - 1];
    let idxList;
    if (seg.cycle) {
      const count = Math.max(5, Math.min(8, Math.round(total / CYCLE_UNIT)));
      idxList = [];
      for (let i = 0; i < count; i++) {
        const target = (i / count) * total;
        let bi = 0;
        while (bi < cum.length - 2 && cum[bi + 1] < target) bi++;
        idxList.push(bi);
      }
    } else {
      idxList = simplifyIndices(path, DP_EPSILON);
    }
    const chosenIdxForRaw = idxList.map((rawIdx) => getOrAddPoint(path[rawIdx].x, path[rawIdx].y));
    const n = idxList.length;
    const pairCount = seg.cycle ? n : n - 1;
    for (let k = 0; k < pairCount; k++) {
      const nextK = (k + 1) % n;
      const targetA = cum[idxList[k]];
      const targetB = nextK === 0 ? total : cum[idxList[nextK]];
      const mid = pointAtArcLength(path, cum, (targetA + targetB) / 2);
      const A = chosen[chosenIdxForRaw[k]], B = chosen[chosenIdxForRaw[nextK]];
      const control = { x: mid.x * 2 - (A.x + B.x) * 0.5, y: mid.y * 2 - (A.y + B.y) * 0.5 };
      localEdges.push([chosenIdxForRaw[k], chosenIdxForRaw[nextK], control]);
    }
  }

  // A fully isolated component (e.g. a dot that thinned to a lone pixel)
  // still gets its own star, just with no connecting line.
  for (let i = 0; i < pxPoints.length; i++) {
    if (removed.has(i)) continue;
    if (adjacency[i].some((n) => !removed.has(n))) continue;
    chosen.push({ x: pxPoints[i].x, y: pxPoints[i].y });
  }

  if (chosen.length === 0) return { points: [], edges: [], advance };

  const points = chosen.map((c) => ({ x: c.x - pad, y: c.y - baselineY }));
  const edges = localEdges.map(([a, b, control]) => [
    a, b, { x: control.x - pad, y: control.y - baselineY },
  ]);
  return { points, edges, advance };
}

function sampleTextToStars(text) {
  const LETTER_SPACING = 1.5;
  const JITTER_PX = 3;

  const off = document.createElement("canvas");
  const octx = off.getContext("2d");
  octx.font = `${GLYPH_TRACE_PX}px ${SCRIPT_FONT_STACK}`;
  const wholeMetrics = octx.measureText(text);
  const ascent = wholeMetrics.fontBoundingBoxAscent || GLYPH_TRACE_PX * 0.85;
  const descent = wholeMetrics.fontBoundingBoxDescent || GLYPH_TRACE_PX * 0.25;
  const SCALE = 14 / (ascent + descent); // maps the font's full height to ~[-7, 7], like the old hand-built skeleton
  const spaceAdvance = octx.measureText(" ").width;

  let cursor = 0;
  const rawPoints = [];
  const edges = [];
  for (const ch of text) {
    if (ch === " ") {
      cursor += spaceAdvance * SCALE;
      continue;
    }
    const letter = sampleLetterPath(ch, GLYPH_TRACE_PX, ascent, descent);
    if (letter.points.length === 0) continue;
    const base = rawPoints.length;
    for (const p of letter.points) rawPoints.push({ x: p.x * SCALE + cursor, y: p.y * SCALE });
    for (const [a, b, control] of letter.edges) {
      edges.push([base + a, base + b, { x: control.x * SCALE + cursor, y: control.y * SCALE }]);
    }
    cursor += letter.advance * SCALE + LETTER_SPACING;
  }
  const localTotalWidth = Math.max(1, cursor - LETTER_SPACING);
  const LETTER_HEIGHT = 14;
  const NAME_LEFT_FRAC = 0.1;
  const NAME_WIDTH_FRAC = 0.8; // name spans cw*0.1 to cw*0.9
  const NAME_HEIGHT_FRAC = 0.10; // letter height as a fraction of ch

  // Points are stored as normalized 0-1 fractions of the viewport (xFrac of
  // cw, yFrac as an offset-of-ch from the name's vertical anchor) — no
  // pixel values baked in here. renderIntro multiplies by cw/ch every
  // frame, so this stays correct even if the window is resized later.
  const points = rawPoints.map((p) => ({
    xFrac: NAME_LEFT_FRAC + (p.x / localTotalWidth) * NAME_WIDTH_FRAC,
    yFrac: (p.y / LETTER_HEIGHT) * NAME_HEIGHT_FRAC,
    sizeMult: randRange(0.75, 1.35),
  }));

  // Bezier control points ride along in the same normalized xFrac/yFrac
  // space as the stars they curve between.
  const scaledEdges = edges.map(([a, b, control]) => [
    a, b,
    NAME_LEFT_FRAC + (control.x / localTotalWidth) * NAME_WIDTH_FRAC,
    (control.y / LETTER_HEIGHT) * NAME_HEIGHT_FRAC,
  ]);

  // Organic jitter: a few screen pixels of offset per star, baked in once
  // (not re-rolled per frame) so nothing lines up in rigid straight runs.
  for (const p of points) {
    p.xFrac += randRange(-JITTER_PX, JITTER_PX) / cw;
    p.yFrac += randRange(-JITTER_PX, JITTER_PX) / ch;
  }

  // Ignite left-to-right across the whole name, with a little jitter, so it
  // reads as a deliberate sweep rather than random twinkling.
  for (const p of points) {
    const frac = (p.xFrac - NAME_LEFT_FRAC) / NAME_WIDTH_FRAC;
    const delay = frac * CONFIG.INTRO.igniteWindow + randRange(-150, 150);
    p.igniteDelay = Math.max(0, Math.min(CONFIG.INTRO.igniteWindow, delay));
  }
  return { points, edges: scaledEdges };
}

// =====================================================================
// ILLUSTRATIONS — mythological reference art that fades in behind a
// focused constellation. Source assets are flat images with an opaque
// background (sometimes a baked-in caption or a hairline frame border)
// in either a dark-bg/light-linework style (Aquarius) or a light-bg/
// dark-silhouette style (Leo). processIllustrationImage() turns either
// into a background-free "ghost": it samples the background color from
// a corner pixel, figures out whether that background is light or dark,
// then alpha-mattes every pixel by how far it deviates from that
// background in the "away from background" direction — so a black
// silhouette on white and white linework on black both matte out to a
// clean, backgroundless shape with no extra per-image flag needed.
//
// Cropping works in two passes so it's robust to more than just a bare
// figure on empty background:
//   1. Walk rows to find which contain content, ignoring a thin margin
//      around the frame edge (skips hairline borders some assets bake
//      in). The vertical span stops at the first large all-background
//      gap, so a caption band sitting below the artwork gets dropped —
//      while art whose content legitimately reaches near the bottom
//      edge (no such gap) is kept in full.
//   2. Within that vertical span, find the horizontal content extent.
// =====================================================================
function processIllustrationImage(img) {
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w || !h) return null;
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  octx.drawImage(img, 0, 0);

  let srcData;
  try {
    srcData = octx.getImageData(0, 0, w, h);
  } catch (e) {
    // Canvas reads can be blocked (e.g. opening index.html via file://
    // without a local server) — skip the illustration rather than throw.
    return null;
  }
  const px = srcData.data;

  const marginX = Math.round(w * CONFIG.ILLUSTRATION_EDGE_MARGIN_FRAC);
  const marginY = Math.round(h * CONFIG.ILLUSTRATION_EDGE_MARGIN_FRAC);

  // Sample the background color just inside the margin, not the absolute
  // corner (0,0) — some source assets have a hairline frame border right
  // at the edge, and sampling that instead of the true background would
  // misjudge whether the image is light-bg or dark-bg entirely.
  const bgIdx = (marginY * w + marginX) * 4;
  const bgLum = 0.299 * px[bgIdx] + 0.587 * px[bgIdx + 1] + 0.114 * px[bgIdx + 2];
  const isLightBg = bgLum > 127.5;
  const contentRange = Math.max(1, isLightBg ? bgLum : 255 - bgLum);
  const contentDiffAt = (idx) => {
    const lum = 0.299 * px[idx] + 0.587 * px[idx + 1] + 0.114 * px[idx + 2];
    return isLightBg ? bgLum - lum : lum - bgLum;
  };

  const rowHasContent = new Array(h).fill(false);
  for (let y = marginY; y < h - marginY; y++) {
    for (let x = marginX; x < w - marginX; x++) {
      if (contentDiffAt((y * w + x) * 4) > CONFIG.ILLUSTRATION_LUM_THRESHOLD) {
        rowHasContent[y] = true;
        break;
      }
    }
  }

  let minY = -1, maxY = -1, gapRun = 0;
  const gapLimit = h * CONFIG.ILLUSTRATION_CAPTION_GAP_FRAC;
  for (let y = marginY; y < h - marginY; y++) {
    if (rowHasContent[y]) {
      if (minY === -1) minY = y;
      maxY = y;
      gapRun = 0;
    } else if (minY !== -1) {
      gapRun++;
      if (gapRun > gapLimit) break;
    }
  }
  if (minY === -1) return null;

  let minX = w, maxX = -1;
  for (let y = minY; y <= maxY; y++) {
    for (let x = marginX; x < w - marginX; x++) {
      if (contentDiffAt((y * w + x) * 4) > CONFIG.ILLUSTRATION_LUM_THRESHOLD) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  if (maxX < minX) return null;

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const outCanvas = document.createElement("canvas");
  outCanvas.width = cropW;
  outCanvas.height = cropH;
  const outCtx = outCanvas.getContext("2d");
  const outData = outCtx.createImageData(cropW, cropH);
  const [tr, tg, tb] = CONFIG.ILLUSTRATION_TINT;
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcIdx = ((y + minY) * w + (x + minX)) * 4;
      const a = Math.max(0, Math.min(1, contentDiffAt(srcIdx) / contentRange));
      const dstIdx = (y * cropW + x) * 4;
      outData.data[dstIdx] = tr;
      outData.data[dstIdx + 1] = tg;
      outData.data[dstIdx + 2] = tb;
      outData.data[dstIdx + 3] = Math.round(a * 255);
    }
  }
  outCtx.putImageData(outData, 0, 0);
  return { canvas: outCanvas, width: cropW, height: cropH };
}

// =====================================================================
// Fades an illustration canvas's outer edges to fully transparent, so a
// hard rectangular image boundary doesn't show as a cutoff against the
// sky behind it. Multiplies each pixel's existing alpha by a mask that's
// 1 across the center and eases down to 0 within `frac` of that edge on
// each side (corners fade fastest, being close to two edges at once).
// Mutates the canvas in place. Independent of processIllustrationImage()
// — it only touches alpha, never color — so it composes with either the
// matted/cropped canvas or a plain as-is (skipMatting) canvas, and can
// be opted into for any illustration via cs.illustrationFeather.
// =====================================================================
function featherCanvasEdges(canvas, frac = CONFIG.ILLUSTRATION_FEATHER_FRAC) {
  const w = canvas.width, h = canvas.height;
  const octx = canvas.getContext("2d");
  const imgData = octx.getImageData(0, 0, w, h);
  const data = imgData.data;
  const featherW = w * frac;
  const featherH = h * frac;
  const smoothstep = (t) => t * t * (3 - 2 * t);
  const edgeFade = (dist, feather) => (feather <= 0 ? 1 : smoothstep(Math.min(1, dist / feather)));

  for (let y = 0; y < h; y++) {
    const fadeY = edgeFade(Math.min(y, h - 1 - y), featherH);
    for (let x = 0; x < w; x++) {
      const fadeX = edgeFade(Math.min(x, w - 1 - x), featherW);
      const mask = fadeX * fadeY;
      if (mask >= 1) continue;
      const idx = (y * w + x) * 4 + 3;
      data[idx] = Math.round(data[idx] * mask);
    }
  }
  octx.putImageData(imgData, 0, 0);
}

function preloadIllustrations() {
  for (const cs of CONSTELLATIONS) {
    if (!cs.illustrationSrc) continue;
    const img = new Image();
    img.onload = () => {
      if (cs.skipMatting) {
        if (cs.illustrationFeather) {
          // Need a real canvas (not the bare <img>) to read/write its
          // alpha channel for the feather pass.
          const off = document.createElement("canvas");
          off.width = img.naturalWidth;
          off.height = img.naturalHeight;
          off.getContext("2d").drawImage(img, 0, 0);
          featherCanvasEdges(off);
          illustrationAssets.set(cs.id, { canvas: off, width: img.naturalWidth, height: img.naturalHeight });
          return;
        }
        // Full paintings/photos with no flat background to matte out —
        // use the loaded image directly (canvas 2D drawImage() accepts an
        // <img> the same as a <canvas>), skipping the pixel-processing
        // pass entirely.
        illustrationAssets.set(cs.id, { canvas: img, width: img.naturalWidth, height: img.naturalHeight });
        return;
      }
      const processed = processIllustrationImage(img);
      if (processed) {
        if (cs.illustrationFeather) featherCanvasEdges(processed.canvas);
        illustrationAssets.set(cs.id, processed);
      }
    };
    img.src = cs.illustrationSrc;
  }
}

function createAudioPool() {
  for (let i = 0; i < 2; i++) {
    const el = document.createElement("audio");
    el.preload = "auto";
    el.volume = 0;
    audioState.elements.push(el);
  }
}

function initAmbientAudio() {
  if (audioState.ambientCtx) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  const ctxA = new Ctx();
  const master = ctxA.createGain();
  master.gain.value = 0;
  master.connect(ctxA.destination);
  master.gain.linearRampToValueAtTime(0.05, ctxA.currentTime + 3);

  const freqs = [55, 82.4, 110];
  const gains = [0.4, 0.32, 0.25];
  let breatheTarget = null;
  freqs.forEach((f, i) => {
    const osc = ctxA.createOscillator();
    osc.type = "sine";
    osc.frequency.value = f;
    const g = ctxA.createGain();
    g.gain.value = gains[i];
    osc.connect(g);
    g.connect(master);
    osc.start();
    if (i === 1) breatheTarget = g;
  });

  const lfo = ctxA.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.07;
  const lfoGain = ctxA.createGain();
  lfoGain.gain.value = 0.08;
  lfo.connect(lfoGain);
  lfoGain.connect(breatheTarget.gain);
  lfo.start();

  audioState.ambientCtx = ctxA;
}

// =====================================================================
// CAMERA
// =====================================================================
function worldToScreenAtLayer(wx, wy, p, cam) {
  const dx = wx - CONFIG.SKY_W / 2;
  const dy = wy - CONFIG.SKY_H / 2;
  const R = cam.rotation * p;
  const cos = Math.cos(R), sin = Math.sin(R);
  const rx = dx * cos - dy * sin;
  const ry = dx * sin + dy * cos;
  return {
    x: cw / 2 + cam.zoom * (rx + cam.panX * p),
    y: ch / 2 + cam.zoom * (ry + cam.panY * p),
  };
}

function screenToWorldAtLayer(sx, sy, p, cam) {
  const rx = (sx - cw / 2) / cam.zoom - cam.panX * p;
  const ry = (sy - ch / 2) / cam.zoom - cam.panY * p;
  const R = cam.rotation * p;
  const cos = Math.cos(R), sin = Math.sin(R);
  const dx = rx * cos + ry * sin;
  const dy = -rx * sin + ry * cos;
  return { x: dx + CONFIG.SKY_W / 2, y: dy + CONFIG.SKY_H / 2 };
}

function applyZoomAtCursor(factor, mx, my) {
  const p = CONFIG.PARALLAX.mid;
  const rx = (mx - cw / 2) / camera.targetZoom - camera.targetPanX * p;
  const ry = (my - ch / 2) / camera.targetZoom - camera.targetPanY * p;
  const newZoom = Math.min(CONFIG.MAX_ZOOM, Math.max(CONFIG.MIN_ZOOM, camera.targetZoom * factor));
  camera.targetPanX = ((mx - cw / 2) / newZoom - rx) / p;
  camera.targetPanY = ((my - ch / 2) / newZoom - ry) / p;
  camera.targetZoom = newZoom;
  camera.easeSpeed = CONFIG.EASE_NORMAL;
}

function applyDragPan(dxScreen, dyScreen) {
  const p = CONFIG.PARALLAX.mid;
  camera.targetPanX += dxScreen / (camera.targetZoom * p);
  camera.targetPanY += dyScreen / (camera.targetZoom * p);
  camera.targetRotation = Math.min(
    CONFIG.MAX_ROTATION,
    Math.max(-CONFIG.MAX_ROTATION, camera.targetRotation + dxScreen * CONFIG.ROTATION_SENSITIVITY)
  );
  camera.easeSpeed = CONFIG.EASE_NORMAL;
}

function focusOnConstellation(cs) {
  const p = CONFIG.PARALLAX.mid;
  const worldX = (cs.centerPct.x / 100) * CONFIG.SKY_W;
  const worldY = (cs.centerPct.y / 100) * CONFIG.SKY_H;
  camera.targetPanX = -(worldX - CONFIG.SKY_W / 2) / p;
  camera.targetPanY = -(worldY - CONFIG.SKY_H / 2) / p;
  camera.targetZoom = cs.focusZoom;
  camera.targetRotation = 0;
  camera.easeSpeed = CONFIG.EASE_FOCUS;
}

function resetCamera() {
  camera.targetPanX = 0;
  camera.targetPanY = 0;
  camera.targetZoom = CONFIG.DEFAULT_ZOOM;
  camera.targetRotation = 0;
  camera.easeSpeed = CONFIG.EASE_FOCUS;
  ui.activeFocusId = null;
}

function updateCameraLerp() {
  camera.panX += (camera.targetPanX - camera.panX) * camera.easeSpeed;
  camera.panY += (camera.targetPanY - camera.panY) * camera.easeSpeed;
  camera.zoom += (camera.targetZoom - camera.zoom) * camera.easeSpeed;
  camera.rotation += (camera.targetRotation - camera.rotation) * camera.easeSpeed;
}

function isConstellationFocused(cs) {
  if (ui.activeFocusId !== cs.id) return false;
  const p = CONFIG.PARALLAX.mid;
  const viewCenter = screenToWorldAtLayer(cw / 2, ch / 2, p, camera);
  const worldX = (cs.centerPct.x / 100) * CONFIG.SKY_W;
  const worldY = (cs.centerPct.y / 100) * CONFIG.SKY_H;
  const dist = Math.hypot(viewCenter.x - worldX, viewCenter.y - worldY);
  return dist < CONFIG.FOCUS_DIST_EPS && Math.abs(camera.zoom - cs.focusZoom) < CONFIG.FOCUS_ZOOM_EPS;
}

// =====================================================================
// INPUT
// =====================================================================
function nearestStarInConstellation(cs, worldPos) {
  let best = -1, bestD = Infinity;
  cs.stars.forEach((star, i) => {
    const wx = (star.x / 100) * CONFIG.SKY_W;
    const wy = (star.y / 100) * CONFIG.SKY_H;
    const d = Math.hypot(wx - worldPos.x, wy - worldPos.y);
    if (d < bestD) { bestD = d; best = i; }
  });
  return { index: best, dist: bestD };
}

function updateHover(clientX, clientY) {
  const p = CONFIG.PARALLAX.mid;
  const worldPos = screenToWorldAtLayer(clientX, clientY, p, camera);
  for (const cs of CONSTELLATIONS) {
    const cState = constellationState.get(cs.id);
    const cx = (cs.centerPct.x / 100) * CONFIG.SKY_W;
    const cy = (cs.centerPct.y / 100) * CONFIG.SKY_H;
    const centroidDist = Math.hypot(cx - worldPos.x, cy - worldPos.y);
    if (centroidDist > CONFIG.LEAVE_RADIUS) {
      cState.hoverProgress = -1;
      continue;
    }
    const { index, dist } = nearestStarInConstellation(cs, worldPos);
    if (dist < CONFIG.HOVER_RADIUS) {
      cState.hoverProgress = Math.max(cState.hoverProgress, index);
    }
  }
}

function tryActivateAt(clientX, clientY) {
  const p = CONFIG.PARALLAX.mid;
  const worldPos = screenToWorldAtLayer(clientX, clientY, p, camera);
  let bestCs = null, bestDist = Infinity;
  for (const cs of CONSTELLATIONS) {
    const { dist } = nearestStarInConstellation(cs, worldPos);
    if (dist < bestDist) { bestDist = dist; bestCs = cs; }
  }
  if (bestCs && bestDist < CONFIG.HOVER_RADIUS) {
    activateConstellation(bestCs);
  }
}

function canvasRelative(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function onPointerDownOnce() {
  initAmbientAudio();
}

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  onPointerDownOnce();
  const pos = canvasRelative(e.clientX, e.clientY);
  const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
  applyZoomAtCursor(factor, pos.x, pos.y);
}, { passive: false });

canvas.addEventListener("mousedown", (e) => {
  onPointerDownOnce();
  const pos = canvasRelative(e.clientX, e.clientY);
  input.dragging = true;
  input.dragMoved = false;
  input.lastX = pos.x; input.lastY = pos.y;
  input.startX = pos.x; input.startY = pos.y;
  input.velX = 0; input.velY = 0;
  input.coasting = false;
});

window.addEventListener("mousemove", (e) => {
  const pos = canvasRelative(e.clientX, e.clientY);
  if (input.dragging) {
    const dx = pos.x - input.lastX;
    const dy = pos.y - input.lastY;
    applyDragPan(dx, dy);
    input.velX = input.velX * 0.8 + dx * 0.2;
    input.velY = input.velY * 0.8 + dy * 0.2;
    input.lastX = pos.x; input.lastY = pos.y;
    if (Math.hypot(pos.x - input.startX, pos.y - input.startY) > 8) input.dragMoved = true;
  } else {
    updateHover(pos.x, pos.y);
  }
});

window.addEventListener("mouseup", (e) => {
  if (!input.dragging) return;
  input.dragging = false;
  const pos = canvasRelative(e.clientX, e.clientY);
  if (!input.dragMoved) {
    tryActivateAt(pos.x, pos.y);
  } else if (Math.hypot(input.velX, input.velY) > 0.5) {
    input.coasting = true;
  }
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  onPointerDownOnce();
  if (e.touches.length === 2) {
    input.pinching = true;
    input.dragging = false;
    const [t0, t1] = e.touches;
    input.pinchStartDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
    input.lastMidX = (t0.clientX + t1.clientX) / 2;
    input.lastMidY = (t0.clientY + t1.clientY) / 2;
  } else if (e.touches.length === 1) {
    input.pinching = false;
    const pos = canvasRelative(e.touches[0].clientX, e.touches[0].clientY);
    input.dragging = true;
    input.dragMoved = false;
    input.lastX = pos.x; input.lastY = pos.y;
    input.startX = pos.x; input.startY = pos.y;
    input.velX = 0; input.velY = 0;
    input.coasting = false;
  }
}, { passive: false });

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (input.pinching && e.touches.length === 2) {
    const [t0, t1] = e.touches;
    const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
    const midX = (t0.clientX + t1.clientX) / 2;
    const midY = (t0.clientY + t1.clientY) / 2;
    const midPos = canvasRelative(midX, midY);
    if (input.pinchStartDist > 0) {
      const scale = dist / input.pinchStartDist;
      applyZoomAtCursor(scale, midPos.x, midPos.y);
    }
    input.pinchStartDist = dist;
    applyDragPan(midX - input.lastMidX, midY - input.lastMidY);
    input.lastMidX = midX; input.lastMidY = midY;
  } else if (input.dragging && e.touches.length === 1) {
    const pos = canvasRelative(e.touches[0].clientX, e.touches[0].clientY);
    const dx = pos.x - input.lastX;
    const dy = pos.y - input.lastY;
    applyDragPan(dx, dy);
    input.velX = input.velX * 0.8 + dx * 0.2;
    input.velY = input.velY * 0.8 + dy * 0.2;
    input.lastX = pos.x; input.lastY = pos.y;
    if (Math.hypot(pos.x - input.startX, pos.y - input.startY) > 8) input.dragMoved = true;
  }
}, { passive: false });

canvas.addEventListener("touchend", (e) => {
  if (input.pinching) {
    if (e.touches.length < 2) input.pinching = false;
    return;
  }
  if (input.dragging) {
    input.dragging = false;
    if (!input.dragMoved) {
      const t = e.changedTouches[0];
      const pos = canvasRelative(t.clientX, t.clientY);
      tryActivateAt(pos.x, pos.y);
    } else if (Math.hypot(input.velX, input.velY) > 0.5) {
      input.coasting = true;
    }
  }
});

document.getElementById("camera-reset-btn").addEventListener("click", () => {
  resetCamera();
});

document.getElementById("player-toggle").addEventListener("click", () => {
  togglePlayPause();
});

function progressFractionFromX(clientX) {
  const rect = document.getElementById("player-progress").getBoundingClientRect();
  if (rect.width <= 0) return 0;
  return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
}

function setProgressFillFraction(frac) {
  document.getElementById("player-progress-fill").style.width = frac * 100 + "%";
}

function seekCurrentTo(frac) {
  const el = audioState.currentEl;
  if (!el || !el.duration) return;
  el.currentTime = frac * el.duration;
}

function startProgressDrag(clientX) {
  if (!audioState.currentEl || !audioState.currentEl.duration) return;
  seekState.dragging = true;
  document.getElementById("player-progress").classList.add("dragging");
  const frac = progressFractionFromX(clientX);
  setProgressFillFraction(frac);
  // A plain click (mousedown immediately followed by mouseup with no
  // movement) should seek right away rather than waiting for mouseup.
  seekCurrentTo(frac);
}

function moveProgressDrag(clientX) {
  if (!seekState.dragging) return;
  setProgressFillFraction(progressFractionFromX(clientX));
}

function endProgressDrag(clientX) {
  if (!seekState.dragging) return;
  seekState.dragging = false;
  document.getElementById("player-progress").classList.remove("dragging");
  const frac = progressFractionFromX(clientX);
  setProgressFillFraction(frac);
  seekCurrentTo(frac);
}

const progressBar = document.getElementById("player-progress");

progressBar.addEventListener("mousedown", (e) => {
  onPointerDownOnce();
  startProgressDrag(e.clientX);
});
window.addEventListener("mousemove", (e) => {
  moveProgressDrag(e.clientX);
});
window.addEventListener("mouseup", (e) => {
  endProgressDrag(e.clientX);
});

progressBar.addEventListener("touchstart", (e) => {
  e.preventDefault();
  onPointerDownOnce();
  startProgressDrag(e.touches[0].clientX);
}, { passive: false });
progressBar.addEventListener("touchmove", (e) => {
  e.preventDefault();
  moveProgressDrag(e.touches[0].clientX);
}, { passive: false });
progressBar.addEventListener("touchend", (e) => {
  endProgressDrag(e.changedTouches[0].clientX);
});

window.addEventListener("keydown", (e) => {
  onPointerDownOnce();
  if (e.code === "Space") {
    e.preventDefault();
    togglePlayPause();
  } else if (e.code === "Escape") {
    resetCamera();
  } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    e.preventDefault();
    input.keysDown.add(e.code);
  }
});

window.addEventListener("keyup", (e) => {
  input.keysDown.delete(e.code);
});

window.addEventListener("resize", resizeCanvas);

function updateKeyboardNudge(dt) {
  if (input.keysDown.size === 0) return;
  const speed = (CONFIG.NUDGE_SPEED * dt) / (camera.targetZoom * CONFIG.PARALLAX.mid);
  if (input.keysDown.has("ArrowLeft")) camera.targetPanX += speed;
  if (input.keysDown.has("ArrowRight")) camera.targetPanX -= speed;
  if (input.keysDown.has("ArrowUp")) camera.targetPanY += speed;
  if (input.keysDown.has("ArrowDown")) camera.targetPanY -= speed;
}

function updateCoasting() {
  if (!input.coasting) return;
  applyDragPan(input.velX, input.velY);
  input.velX *= 0.94;
  input.velY *= 0.94;
  if (Math.hypot(input.velX, input.velY) < 0.05) input.coasting = false;
}

// =====================================================================
// AUDIO
// =====================================================================
function showPlayerBar() {
  document.getElementById("player-bar").classList.add("active");
}

function hidePlayerBar() {
  document.getElementById("player-bar").classList.remove("active");
}

function updatePlayerBarText(cs, song) {
  document.getElementById("player-constellation").textContent = cs.name;
  document.getElementById("player-song").textContent = song.title;
  document.getElementById("player-artist").textContent = song.artist;
}

function togglePlayPause() {
  if (!audioState.currentEl) return;
  if (audioState.currentEl.paused) audioState.currentEl.play().catch(() => {});
  else audioState.currentEl.pause();
}

function playSong(cs, song) {
  const incoming = audioState.elements.find((el) => el !== audioState.currentEl) || audioState.elements[0];
  incoming.src = song.file;
  incoming.currentTime = 0;
  incoming.volume = 0;
  incoming.play().catch(() => {});
  incoming.onended = () => onSongEnded(cs);

  const outgoing = audioState.currentEl;
  audioState.crossfade = { outgoing, incoming, start: performance.now(), duration: CONFIG.CROSSFADE_MS };
  audioState.currentEl = incoming;
  audioState.currentEntry = cs;
  audioState.currentSong = song;

  updatePlayerBarText(cs, song);
  showPlayerBar();
}

function updateCrossfade(now) {
  const cf = audioState.crossfade;
  if (!cf) return;
  const t = Math.max(0, Math.min(1, (now - cf.start) / cf.duration));
  if (cf.outgoing) cf.outgoing.volume = Math.max(0, Math.min(1, 1 - t));
  cf.incoming.volume = Math.max(0, Math.min(1, t));
  if (t >= 1) {
    if (cf.outgoing) { cf.outgoing.pause(); cf.outgoing.currentTime = 0; }
    audioState.crossfade = null;
  }
}

function onSongEnded(cs) {
  if (audioState.currentEntry !== cs) return;
  const cState = constellationState.get(cs.id);
  cState.postSongGlow = 1;
  cState.ripple = { start: performance.now(), duration: 2200 };
  audioState.currentEntry = null;
  hidePlayerBar();
}

function pickSong(cs) {
  const available = cs.songs.map((_, i) => i).filter((i) => cs.songs[i].file);
  if (available.length === 0) return null;
  const cState = constellationState.get(cs.id);
  let idx;
  if (available.length === 1) {
    idx = available[0];
  } else {
    do {
      idx = available[Math.floor(Math.random() * available.length)];
    } while (idx === cState.lastSongIndex);
  }
  cState.lastSongIndex = idx;
  return cs.songs[idx];
}

function activateConstellation(cs) {
  cs.visited = true;
  ui.activeFocusId = cs.id;
  focusOnConstellation(cs);

  const song = pickSong(cs);
  if (song) {
    playSong(cs, song);
  }
}

function updatePlayerProgress() {
  const el = audioState.currentEl;
  const fill = document.getElementById("player-progress-fill");
  const toggleIcon = document.getElementById("icon-play");
  const pauseIcon = document.getElementById("icon-pause");
  // Skip while the user is dragging the handle — the drag's own visual
  // update owns the fill width until they release, so playback position
  // doesn't fight with the pointer.
  if (!seekState.dragging) {
    if (el && el.duration) {
      fill.style.width = (el.currentTime / el.duration) * 100 + "%";
    } else {
      fill.style.width = "0%";
    }
  }
  if (el && !el.paused) {
    toggleIcon.style.display = "none";
    pauseIcon.style.display = "";
  } else {
    toggleIcon.style.display = "";
    pauseIcon.style.display = "none";
  }
}

// =====================================================================
// CONSTELLATION LOGIC
// =====================================================================
function updateConstellationVisuals(dt, now) {
  for (const cs of CONSTELLATIONS) {
    const cState = constellationState.get(cs.id);
    const focused = isConstellationFocused(cs);

    if (!cs.isEasterEgg && !cs.visited) {
      cState.pulsePhase += dt * 1.6;
    }
    const idlePulse = (!cs.isEasterEgg && !cs.visited)
      ? 0.1 + 0.12 * (0.5 + 0.5 * Math.sin(cState.pulsePhase))
      : 0;

    if (cState.postSongGlow > 0) {
      cState.postSongGlow = Math.max(0, cState.postSongGlow - dt * 0.5);
    }

    cs.stars.forEach((star, i) => {
      const hoverTarget = i <= cState.hoverProgress ? 1 : 0;
      const target = Math.max(idlePulse, hoverTarget, focused ? 1 : 0, cState.postSongGlow);
      cState.alphas[i] += (target - cState.alphas[i]) * 0.12;
    });

    if (cs.illustrationSrc) {
      const maxAlpha = cs.illustrationMaxAlpha != null ? cs.illustrationMaxAlpha : CONFIG.ILLUSTRATION_MAX_ALPHA;
      const target = focused ? maxAlpha : 0;
      const rate = target > cState.illustrationAlpha
        ? CONFIG.ILLUSTRATION_FADE_IN_RATE
        : CONFIG.ILLUSTRATION_FADE_OUT_RATE;
      cState.illustrationAlpha += (target - cState.illustrationAlpha) * rate;
    }
  }
}

// =====================================================================
// SHOOTING STARS & QUOTES
// =====================================================================
function scheduleNextShootingStar(now) {
  shootingStar.nextAt = now + randRange(CONFIG.SHOOTING_STAR_MIN_MS, CONFIG.SHOOTING_STAR_MAX_MS);
}

function spawnShootingStar(now) {
  const startX = randRange(cw * 0.1, cw * 0.9);
  const startY = randRange(ch * 0.05, ch * 0.4);
  const angle = randRange(20, 65) * (Math.PI / 180) * (Math.random() < 0.5 ? 1 : -1);
  const distance = Math.hypot(cw, ch) * 0.48;
  const duration = randRange(800, 1400);
  shootingStar.active = true;
  shootingStar.startTime = now;
  shootingStar.duration = duration;
  shootingStar.x0 = startX;
  shootingStar.y0 = startY;
  shootingStar.dx = Math.cos(angle) * distance * (Math.random() < 0.5 ? -1 : 1);
  shootingStar.dy = Math.sin(Math.abs(angle)) * distance;
}

function pickQuote() {
  if (QUOTES.length === 1) return QUOTES[0];
  let idx;
  do { idx = Math.floor(Math.random() * QUOTES.length); } while (idx === audioState.lastQuoteIndex);
  audioState.lastQuoteIndex = idx;
  return QUOTES[idx];
}

function onShootingStarComplete() {
  const quoteEl = document.getElementById("quote-display");
  quoteEl.textContent = pickQuote();
  quoteEl.classList.add("visible");
  clearTimeout(audioState.quoteTimer);
  audioState.quoteTimer = setTimeout(() => quoteEl.classList.remove("visible"), 3800);
}

function updateShootingStar(now) {
  if (!shootingStar.active) {
    if (now >= shootingStar.nextAt) spawnShootingStar(now);
    return;
  }
  const t = (now - shootingStar.startTime) / shootingStar.duration;
  if (t >= 1) {
    shootingStar.active = false;
    onShootingStarComplete();
    scheduleNextShootingStar(now);
  }
}

// =====================================================================
// INTRO
// =====================================================================
function introElapsed(now) {
  return now - introStart;
}

function updateIntro(now) {
  if (introDone) return;
  const elapsed = introElapsed(now);
  const subtitleEl = document.getElementById("intro-subtitle");
  const I = CONFIG.INTRO;
  if (elapsed >= I.subtitleInStart && elapsed < I.fadeOutStart) {
    subtitleEl.classList.add("visible");
  }
  if (elapsed >= I.fadeOutStart) {
    subtitleEl.classList.remove("visible");
  }
  if (elapsed >= I.doneAt) {
    introDone = true;
  }
}

function getIntroNameAlpha(elapsed) {
  const I = CONFIG.INTRO;
  if (elapsed < I.fadeOutStart) return 1;
  if (elapsed > I.fadeOutStart + I.fadeOutDur) return 0;
  return 1 - (elapsed - I.fadeOutStart) / I.fadeOutDur;
}

function getMainSkyAlpha(elapsed) {
  const I = CONFIG.INTRO;
  if (elapsed < I.dissolveStart) return 0;
  if (elapsed > I.dissolveStart + I.dissolveDur) return 1;
  return (elapsed - I.dissolveStart) / I.dissolveDur;
}

function renderIntro(now) {
  const elapsed = introElapsed(now);
  const overallAlpha = getIntroNameAlpha(elapsed);
  if (overallAlpha <= 0) return;
  const I = CONFIG.INTRO;
  // Points are normalized (xFrac of cw, yFrac offset of ch) — multiply by
  // the current viewport every frame so this stays correct on resize.
  const nameAnchorY = ch * 0.42;

  let pulseScale = 1;
  if (elapsed >= I.pulseStart && elapsed <= I.pulseStart + I.pulseDur) {
    const pt = (elapsed - I.pulseStart) / I.pulseDur;
    pulseScale = 1 + 0.4 * Math.sin(Math.PI * pt);
  }

  const lineAlpha = Math.min(1, Math.max(0, (elapsed - I.linesStart) / I.linesDur)) * overallAlpha;

  ctx.save();
  ctx.strokeStyle = `rgba(200,220,255,${lineAlpha * 0.8})`;
  ctx.lineWidth = 1.1;
  for (const [a, b, ctrlXFrac, ctrlYFrac] of introNameEdges) {
    const p1 = introNameStars[a], p2 = introNameStars[b];
    ctx.beginPath();
    ctx.moveTo(p1.xFrac * cw, nameAnchorY + p1.yFrac * ch);
    ctx.quadraticCurveTo(
      ctrlXFrac * cw, nameAnchorY + ctrlYFrac * ch,
      p2.xFrac * cw, nameAnchorY + p2.yFrac * ch
    );
    ctx.stroke();
  }

  for (const star of introNameStars) {
    const igniteAlpha = Math.min(1, Math.max(0, (elapsed - star.igniteDelay) / I.igniteDur));
    const a = igniteAlpha * overallAlpha;
    if (a <= 0) continue;
    const r = 1.7 * pulseScale * star.sizeMult;
    const gx = star.xFrac * cw, gy = nameAnchorY + star.yFrac * ch;
    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, r * 2.3);
    grad.addColorStop(0, `rgba(255,248,225,${a})`);
    grad.addColorStop(1, "rgba(255,248,225,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(gx, gy, r * 2.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.beginPath();
    ctx.arc(gx, gy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// =====================================================================
// RENDER
// =====================================================================
function drawGlow(x, y, radius, colorInner) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
  grad.addColorStop(0, colorInner);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawBackground(alpha) {
  const grad = ctx.createLinearGradient(0, 0, 0, ch);
  grad.addColorStop(0, "#05060e");
  grad.addColorStop(1, "#0a0c1a");
  ctx.fillStyle = grad;
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, cw, ch);
  if (alpha < 1) {
    ctx.fillStyle = "#05060e";
    ctx.globalAlpha = 1 - alpha;
    ctx.fillRect(0, 0, cw, ch);
    ctx.globalAlpha = 1;
  }
}

function drawStarLayer(layer, p, now, alphaMult) {
  for (const star of bgStars[layer]) {
    const pos = worldToScreenAtLayer(star.x, star.y, p, camera);
    if (pos.x < -20 || pos.x > cw + 20 || pos.y < -20 || pos.y > ch + 20) continue;
    const twinkle = star.baseAlpha + Math.sin(now * 0.001 * star.twinkleSpeed + star.phase) * star.twinkleAmp;
    const a = Math.max(0, Math.min(1, twinkle)) * alphaMult;
    if (a <= 0.01) continue;
    ctx.fillStyle = star.warm ? `rgba(255,236,200,${a})` : `rgba(255,255,255,${a})`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawMoon(alphaMult) {
  const wx = (CONFIG.MOON_POS.x / 100) * CONFIG.SKY_W;
  const wy = (CONFIG.MOON_POS.y / 100) * CONFIG.SKY_H;
  const pos = worldToScreenAtLayer(wx, wy, CONFIG.PARALLAX.far, camera);
  ctx.globalAlpha = alphaMult;
  drawGlow(pos.x, pos.y, 90 * camera.zoom, "rgba(230,235,255,0.18)");
  ctx.fillStyle = "rgba(245,248,255,0.9)";
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 22 * Math.min(camera.zoom, 1.4), 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawNebulas(alphaMult) {
  for (const cs of CONSTELLATIONS) {
    if (!cs.nebulaColor) continue;
    const wx = (cs.centerPct.x / 100) * CONFIG.SKY_W;
    const wy = (cs.centerPct.y / 100) * CONFIG.SKY_H;
    const pos = worldToScreenAtLayer(wx, wy, CONFIG.PARALLAX.mid, camera);
    ctx.globalAlpha = alphaMult;
    drawGlow(pos.x, pos.y, 260 * camera.zoom, cs.nebulaColor);
    ctx.globalAlpha = 1;
  }
}

function drawIllustrations(alphaMult) {
  for (const cs of CONSTELLATIONS) {
    if (!cs.illustrationSrc) continue;
    const asset = illustrationAssets.get(cs.id);
    if (!asset) continue;
    const cState = constellationState.get(cs.id);
    const alpha = cState.illustrationAlpha * alphaMult;
    if (alpha <= 0.003) continue;

    // Fit the illustration (preserving its own aspect ratio) inside a
    // padded box derived from the constellation's star spread, so it
    // scales with the star field rather than needing a fixed size.
    const targetWorldW = cState.illustrationBoxW * CONFIG.ILLUSTRATION_PADDING;
    const targetWorldH = cState.illustrationBoxH * CONFIG.ILLUSTRATION_PADDING;
    const fitScale = Math.min(targetWorldW / asset.width, targetWorldH / asset.height);
    const drawWorldW = asset.width * fitScale;
    const drawWorldH = asset.height * fitScale;

    const wx = (cs.centerPct.x / 100) * CONFIG.SKY_W;
    const wy = (cs.centerPct.y / 100) * CONFIG.SKY_H;
    const centerScreen = worldToScreenAtLayer(wx, wy, CONFIG.PARALLAX.mid, camera);
    const screenW = drawWorldW * camera.zoom;
    const screenH = drawWorldH * camera.zoom;
    const skyRotation = camera.rotation * CONFIG.PARALLAX.mid;
    const alignRotation = ((cs.illustrationRotation || 0) * Math.PI) / 180;

    ctx.save();
    ctx.translate(centerScreen.x, centerScreen.y);
    ctx.rotate(skyRotation + alignRotation);
    ctx.globalAlpha = alpha;
    ctx.drawImage(asset.canvas, -screenW / 2, -screenH / 2, screenW, screenH);
    ctx.restore();
    ctx.globalAlpha = 1;
  }
}

function drawConstellations(now, alphaMult) {
  for (const cs of CONSTELLATIONS) {
    const cState = constellationState.get(cs.id);
    const screenPts = cs.stars.map((star) => {
      const wx = (star.x / 100) * CONFIG.SKY_W;
      const wy = (star.y / 100) * CONFIG.SKY_H;
      return worldToScreenAtLayer(wx, wy, CONFIG.PARALLAX.mid, camera);
    });

    for (const [a, b] of cs.edges) {
      const alpha = Math.min(cState.alphas[a], cState.alphas[b]) * alphaMult;
      if (alpha <= 0.02) continue;
      ctx.strokeStyle = `rgba(150,180,230,${alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(screenPts[a].x, screenPts[a].y);
      ctx.lineTo(screenPts[b].x, screenPts[b].y);
      ctx.stroke();
    }

    screenPts.forEach((pos, i) => {
      const alpha = cState.alphas[i] * alphaMult;
      if (alpha <= 0.02) return;
      drawGlow(pos.x, pos.y, 14 * camera.zoom, `rgba(255,244,214,${alpha * 0.55})`);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    if (cState.ripple) {
      const t = (now - cState.ripple.start) / cState.ripple.duration;
      if (t >= 1) {
        cState.ripple = null;
      } else {
        const centerScreen = worldToScreenAtLayer(
          (cs.centerPct.x / 100) * CONFIG.SKY_W,
          (cs.centerPct.y / 100) * CONFIG.SKY_H,
          CONFIG.PARALLAX.mid, camera
        );
        const r = t * 160 * camera.zoom;
        ctx.strokeStyle = `rgba(200,220,255,${(1 - t) * 0.35 * alphaMult})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerScreen.x, centerScreen.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    if (!cs.isEasterEgg && isConstellationFocused(cs)) {
      const labelPos = worldToScreenAtLayer(
        (cs.centerPct.x / 100) * CONFIG.SKY_W,
        (cs.centerPct.y / 100) * CONFIG.SKY_H,
        CONFIG.PARALLAX.mid, camera
      );
      ctx.globalAlpha = alphaMult * 0.9;
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,248,235,0.85)";
      ctx.font = "italic 22px Georgia, 'Times New Roman', serif";
      ctx.fillText(cs.name, labelPos.x, labelPos.y - 60);
      if (cs.mythNote) {
        ctx.font = "italic 14px Georgia, 'Times New Roman', serif";
        ctx.fillStyle = "rgba(230,230,240,0.6)";
        ctx.fillText(cs.mythNote, labelPos.x, labelPos.y - 36);
      }
      ctx.globalAlpha = 1;
    }
  }
}

function drawShootingStar(now) {
  if (!shootingStar.active) return;
  const t = Math.min(1, (now - shootingStar.startTime) / shootingStar.duration);
  const headX = shootingStar.x0 + shootingStar.dx * t;
  const headY = shootingStar.y0 + shootingStar.dy * t;

  // Layered trail: wide soft outer glow, mid-weight glow, and a bright thin
  // core, each with its own tail length so the trail feathers outward.
  const layers = [
    { tailOffset: 0.34, width: 7, alpha: 0.22 },
    { tailOffset: 0.25, width: 3.5, alpha: 0.5 },
    { tailOffset: 0.18, width: 1.4, alpha: 0.95 },
  ];

  for (const layer of layers) {
    const tailT = Math.max(0, t - layer.tailOffset);
    const tailX = shootingStar.x0 + shootingStar.dx * tailT;
    const tailY = shootingStar.y0 + shootingStar.dy * tailT;
    const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(1, `rgba(255,255,255,${layer.alpha})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = layer.width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(headX, headY);
    ctx.stroke();
  }

  drawGlow(headX, headY, 14, "rgba(255,255,255,0.95)");
}

function draw(now) {
  const elapsed = introStart !== null ? introElapsed(now) : CONFIG.INTRO.doneAt;
  const mainAlpha = introDone ? 1 : getMainSkyAlpha(elapsed);

  drawBackground(mainAlpha);
  if (mainAlpha > 0.01) {
    drawNebulas(mainAlpha);
    drawIllustrations(mainAlpha);
    drawStarLayer("far", CONFIG.PARALLAX.far, now, mainAlpha);
    drawMoon(mainAlpha);
    drawStarLayer("mid", CONFIG.PARALLAX.mid, now, mainAlpha);
    drawConstellations(now, mainAlpha);
    drawStarLayer("near", CONFIG.PARALLAX.near, now, mainAlpha);
    drawShootingStar(now);
  }

  if (!introDone) {
    renderIntro(now);
  }
}

// =====================================================================
// MAIN LOOP
// =====================================================================
let lastTime = null;

function tick(now) {
  const dt = lastTime === null ? 0 : Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;

  if (introStart === null) introStart = now;
  updateIntro(now);

  updateKeyboardNudge(dt);
  updateCoasting();
  updateCameraLerp();
  updateCrossfade(now);
  updateConstellationVisuals(dt, now);
  updateShootingStar(now);
  updatePlayerProgress();

  draw(now);

  requestAnimationFrame(tick);
}

// =====================================================================
// BOOTSTRAP
// =====================================================================
function bootstrap() {
  resizeCanvas();
  generateBackgroundStars();
  initConstellationState();
  createAudioPool();
  preloadIllustrations();

  const nameData = sampleTextToStars("Alana Nisperos");
  introNameStars = nameData.points;
  introNameEdges = nameData.edges;

  scheduleNextShootingStar(performance.now());

  requestAnimationFrame(tick);
}

bootstrap();
