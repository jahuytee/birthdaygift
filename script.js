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
//   songs         [{file, title, artist}, ...] rotates on each activation.
//                 Add a real song by filling in a placeholder slot below —
//                 use file:null for a reserved/future slot.
//   rotationIndex which song plays on the NEXT activation (starts at 0)
//   visited       whether it has ever been activated (starts false)
// =====================================================================
const CONSTELLATIONS = [
  {
    id: "orion",
    name: "Orion",
    isEasterEgg: false,
    mythNote: "The great hunter, forever chasing the horizon",
    stars: [
      { x: 13, y: 18 }, { x: 22, y: 16 },
      { x: 15, y: 28 }, { x: 18, y: 30 }, { x: 21, y: 32 },
      { x: 23, y: 44 }, { x: 12, y: 42 },
    ],
    edges: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 6], [4, 5]],
    centerPct: { x: 17, y: 30 },
    focusZoom: 2.4,
    nebulaColor: "rgba(255,150,60,0.14)",
    songs: [
      { file: "audio/night-shift.mp3", title: "Night Shift", artist: "Lucy Dacus" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    rotationIndex: 0,
    visited: false,
  },
  {
    id: "pleiades",
    name: "Pleiades",
    isEasterEgg: false,
    mythNote: "Seven sisters transformed into stars, still running",
    stars: [
      { x: 48, y: 28 }, { x: 51, y: 26 }, { x: 54, y: 29 },
      { x: 50, y: 32 }, { x: 53, y: 33 }, { x: 46, y: 31 },
    ],
    edges: [[0, 1], [1, 2], [0, 3], [3, 4], [0, 5]],
    centerPct: { x: 50, y: 30 },
    focusZoom: 3.0,
    nebulaColor: "rgba(120,160,255,0.12)",
    songs: [
      { file: "audio/mirrorball.mp3", title: "Mirrorball", artist: "Taylor Swift" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    rotationIndex: 0,
    visited: false,
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    isEasterEgg: false,
    mythNote: "The vain queen, chained to her throne and spinning through the sky forever",
    stars: [
      { x: 74, y: 28 }, { x: 78, y: 34 }, { x: 82, y: 27 }, { x: 86, y: 33 }, { x: 90, y: 26 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    centerPct: { x: 82, y: 30 },
    focusZoom: 2.6,
    nebulaColor: "rgba(170,120,255,0.11)",
    songs: [
      { file: "audio/linger.mp3", title: "Linger", artist: "The Cranberries" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    rotationIndex: 0,
    visited: false,
  },
  {
    id: "leo",
    name: "Leo",
    isEasterEgg: false,
    mythNote: "The Nemean lion, golden and unconquerable",
    stars: [
      { x: 77, y: 65 }, { x: 80, y: 61 }, { x: 83, y: 64 },
      { x: 82, y: 70 }, { x: 87, y: 73 }, { x: 85, y: 81 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    centerPct: { x: 82, y: 70 },
    focusZoom: 2.3,
    nebulaColor: "rgba(110,150,255,0.10)",
    songs: [
      { file: "audio/alley-rose.mp3", title: "Alley Rose", artist: "Conan Gray" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    rotationIndex: 0,
    visited: false,
  },
  {
    id: "lyra",
    name: "Lyra",
    isEasterEgg: false,
    mythNote: "The lyre of Orpheus, still singing after he was gone",
    stars: [
      { x: 17, y: 60 }, { x: 14, y: 68 }, { x: 20, y: 70 }, { x: 15, y: 76 }, { x: 21, y: 77 },
    ],
    edges: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4]],
    centerPct: { x: 17, y: 70 },
    focusZoom: 2.8,
    nebulaColor: "rgba(150,110,255,0.12)",
    // Starts on the same song as Aquarius, but keeps its own rotationIndex
    // below — the two rotations advance independently.
    songs: [
      { file: "audio/sidelines.mp3", title: "Sidelines", artist: "Phoebe Bridgers" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    rotationIndex: 0,
    visited: false,
  },
  {
    id: "aquarius",
    name: "Aquarius",
    isEasterEgg: false,
    mythNote: "The water-bearer, pouring endlessly into the dark",
    stars: [
      { x: 46, y: 60 }, { x: 50, y: 64 }, { x: 48, y: 70 }, { x: 53, y: 73 }, { x: 51, y: 78 }, { x: 56, y: 76 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5]],
    centerPct: { x: 50, y: 70 },
    focusZoom: 2.3,
    nebulaColor: "rgba(120,170,255,0.10)",
    songs: [
      { file: "audio/sidelines.mp3", title: "Sidelines", artist: "Phoebe Bridgers" },
      { file: null, title: "-- reserved for future song --", artist: "" },
      { file: null, title: "-- reserved for future song --", artist: "" },
    ],
    rotationIndex: 0,
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
      { x: 92.52, y: 89.57 }, { x: 92.52, y: 90.84 }, { x: 92.52, y: 91.80 }, { x: 91.89, y: 92.43 }, { x: 91.25, y: 92.11 }, // "J"
      { x: 93.48, y: 89.57 }, { x: 94.11, y: 89.57 }, { x: 94.75, y: 89.57 }, { x: 94.11, y: 91.16 }, { x: 94.11, y: 92.43 }, // "T"
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [6, 8], [8, 9]],
    centerPct: { x: 93, y: 91 },
    focusZoom: 6.5,
    nebulaColor: null,
    songs: [
      { file: "audio/ivy.mp3", title: "Ivy", artist: "Frank Ocean" },
    ],
    rotationIndex: 0,
    visited: false,
  },
];

// =====================================================================
// SHOOTING-STAR QUOTES — edit this list to add or remove quotes. Any
// attribution (" — Movie") is just part of the string itself.
// =====================================================================
const QUOTES = [
  "oink oink mother fucker",
  "I'll be the aspergers and you be the asspancakes",
  "please just let me keep this one memory. — Eternal Sunshine of the Spotless Mind",
  "You had to leave because you're you. And the reason I liked you is because you're you. And who you are is someone who leaves. — Past Lives",
];

// =====================================================================
// CONFIG
// =====================================================================
const CONFIG = {
  SKY_W: 1600,
  SKY_H: 900,
  PARALLAX: { far: 0.25, mid: 0.55, near: 1.0 },
  STAR_COUNTS: { far: 220, mid: 140, near: 80 },
  EASE_NORMAL: 0.15,
  EASE_FOCUS: 0.045,
  MIN_ZOOM: 0.6,
  MAX_ZOOM: 10,
  ROTATION_SENSITIVITY: 0.0006,
  MAX_ROTATION: 0.15,
  HOVER_RADIUS: 55,
  CLICK_RADIUS: 90,
  LEAVE_RADIUS: 230,
  FOCUS_DIST_EPS: 150,
  FOCUS_ZOOM_EPS: 0.6,
  DEEP_ZOOM_MULT: 1.6,
  DOUBLE_CLICK_MS: 350,
  DOUBLE_CLICK_DIST: 40,
  CROSSFADE_MS: 1500,
  SHOOTING_STAR_MIN_MS: 30000,
  SHOOTING_STAR_MAX_MS: 60000,
  SHOOTING_STAR_TAIL_FRAC: 0.34,
  SHOOTING_STAR_HIT_TOLERANCE: 18,
  NUDGE_SPEED: 350,
  MOON_POS: { x: 82, y: 10 },
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
const subtitleEl = document.getElementById("intro-subtitle");

let cw = window.innerWidth;
let ch = window.innerHeight;
let dpr = window.devicePixelRatio || 1;

const camera = {
  panX: 0, panY: 0, zoom: 1, rotation: 0,
  targetPanX: 0, targetPanY: 0, targetZoom: 1, targetRotation: 0,
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
  lastClickTime: 0,
  lastClickCs: null,
  lastClickX: 0,
  lastClickY: 0,
};

const ui = {
  activeFocusId: null,
  closeFocusId: null,
  isDefaultView: true,
};

const bgStars = { far: [], mid: [], near: [] };

const constellationState = new Map();

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

const shootingStar = { active: false, nextAt: 0 };

let introDone = false;
let introStart = null;
let introNameStars = [];
let introNameEdges = [];
let introCenterX = 0, introCenterY = 0;

// =====================================================================
// INIT
// =====================================================================
function computeFitZoom() {
  return Math.min(cw / CONFIG.SKY_W, ch / CONFIG.SKY_H) * 0.9;
}

function updateIntroLayout() {
  const subtitleH = subtitleEl.getBoundingClientRect().height || 40;
  const NAME_H = 100;
  const GAP = 28;
  const blockH = NAME_H + GAP + subtitleH;
  introCenterX = cw / 2;
  introCenterY = ch / 2 - blockH / 2 + NAME_H / 2;
  subtitleEl.style.top = `${introCenterY + NAME_H / 2 + GAP + subtitleH / 2}px`;
}

function resizeCanvas() {
  cw = window.innerWidth;
  ch = window.innerHeight;
  dpr = window.devicePixelRatio || 1;
  canvas.width = cw * dpr;
  canvas.height = ch * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  updateIntroLayout();
  if (ui.isDefaultView) {
    camera.targetZoom = computeFitZoom();
    camera.zoom = camera.targetZoom;
  }
}

function randRange(a, b) {
  return a + Math.random() * (b - a);
}

function generateBackgroundStars() {
  for (const layer of ["far", "mid", "near"]) {
    const count = CONFIG.STAR_COUNTS[layer];
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: randRange(0, CONFIG.SKY_W),
        y: randRange(0, CONFIG.SKY_H),
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
    constellationState.set(cs.id, {
      hoverProgress: -1,
      alphas: cs.stars.map(() => 0),
      pulsePhase: Math.random() * Math.PI * 2,
      postSongGlow: 0,
      ripple: null,
    });
  }
}

function sampleTextToStars(text) {
  const off = document.createElement("canvas");
  off.width = 1400;
  off.height = 340;
  const octx = off.getContext("2d");
  octx.fillStyle = "#000";
  octx.fillRect(0, 0, off.width, off.height);
  octx.fillStyle = "#fff";
  octx.font = "128px 'Segoe Script', 'Brush Script MT', 'Bradley Hand', cursive";
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.fillText(text, off.width / 2, off.height / 2);
  const data = octx.getImageData(0, 0, off.width, off.height).data;
  const cell = 7;
  const points = [];
  for (let gy = 0; gy < off.height; gy += cell) {
    for (let gx = 0; gx < off.width; gx += cell) {
      for (let tries = 0; tries < 5; tries++) {
        const jx = gx + randRange(0, cell);
        const jy = gy + randRange(0, cell);
        const idx = (Math.floor(jy) * off.width + Math.floor(jx)) * 4;
        if (data[idx] > 128) {
          points.push({ x: jx - off.width / 2, y: jy - off.height / 2, igniteDelay: randRange(0, CONFIG.INTRO.igniteWindow) });
          break;
        }
      }
    }
  }
  const linkRadius = cell * 1.8;
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    const candidates = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      if (d < linkRadius) candidates.push({ j, d });
    }
    candidates.sort((a, b) => a.d - b.d);
    for (const { j } of candidates.slice(0, 2)) {
      const pair = i < j ? [i, j] : [j, i];
      if (!edges.some(e => e[0] === pair[0] && e[1] === pair[1])) edges.push(pair);
    }
  }
  return { points, edges };
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
  ui.isDefaultView = false;
}

function closeFocusOnConstellation(cs) {
  const p = CONFIG.PARALLAX.mid;
  const worldX = (cs.centerPct.x / 100) * CONFIG.SKY_W;
  const worldY = (cs.centerPct.y / 100) * CONFIG.SKY_H;
  camera.targetPanX = -(worldX - CONFIG.SKY_W / 2) / p;
  camera.targetPanY = -(worldY - CONFIG.SKY_H / 2) / p;
  camera.targetZoom = Math.min(CONFIG.MAX_ZOOM, cs.focusZoom * CONFIG.DEEP_ZOOM_MULT);
  camera.targetRotation = 0;
  camera.easeSpeed = CONFIG.EASE_FOCUS;
  ui.closeFocusId = cs.id;
  ui.isDefaultView = false;
}

function resetCamera() {
  camera.targetPanX = 0;
  camera.targetPanY = 0;
  camera.targetZoom = computeFitZoom();
  camera.targetRotation = 0;
  camera.easeSpeed = CONFIG.EASE_FOCUS;
  ui.activeFocusId = null;
  ui.closeFocusId = null;
  ui.isDefaultView = true;
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

function isCloseFocused(cs) {
  if (ui.closeFocusId !== cs.id) return false;
  const p = CONFIG.PARALLAX.mid;
  const viewCenter = screenToWorldAtLayer(cw / 2, ch / 2, p, camera);
  const worldX = (cs.centerPct.x / 100) * CONFIG.SKY_W;
  const worldY = (cs.centerPct.y / 100) * CONFIG.SKY_H;
  const dist = Math.hypot(viewCenter.x - worldX, viewCenter.y - worldY);
  const deepZoom = Math.min(CONFIG.MAX_ZOOM, cs.focusZoom * CONFIG.DEEP_ZOOM_MULT);
  return dist < CONFIG.FOCUS_DIST_EPS && Math.abs(camera.zoom - deepZoom) < CONFIG.FOCUS_ZOOM_EPS;
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
  if (!bestCs || bestDist >= CONFIG.CLICK_RADIUS) return;

  const now = performance.now();
  const isDouble = bestCs === input.lastClickCs
    && (now - input.lastClickTime) < CONFIG.DOUBLE_CLICK_MS
    && Math.hypot(clientX - input.lastClickX, clientY - input.lastClickY) < CONFIG.DOUBLE_CLICK_DIST;
  input.lastClickTime = now;
  input.lastClickCs = bestCs;
  input.lastClickX = clientX;
  input.lastClickY = clientY;

  if (isDouble) {
    if (ui.closeFocusId === bestCs.id) {
      resetCamera();
    } else {
      ui.activeFocusId = bestCs.id;
      closeFocusOnConstellation(bestCs);
    }
    return;
  }

  activateConstellation(bestCs);
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
    if (!tryHitShootingStar(e.clientX, e.clientY)) tryActivateAt(pos.x, pos.y);
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
      if (!tryHitShootingStar(t.clientX, t.clientY)) tryActivateAt(pos.x, pos.y);
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

function activateConstellation(cs) {
  cs.visited = true;
  ui.activeFocusId = cs.id;
  focusOnConstellation(cs);

  const song = cs.songs[cs.rotationIndex];
  cs.rotationIndex = (cs.rotationIndex + 1) % cs.songs.length;

  if (song.file) {
    playSong(cs, song);
  }
}

function updatePlayerProgress() {
  const el = audioState.currentEl;
  const fill = document.getElementById("player-progress-fill");
  const toggleIcon = document.getElementById("icon-play");
  const pauseIcon = document.getElementById("icon-pause");
  if (el && el.duration) {
    fill.style.width = (el.currentTime / el.duration) * 100 + "%";
  } else {
    fill.style.width = "0%";
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
    const focused = isConstellationFocused(cs) || isCloseFocused(cs);

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
  const distance = Math.hypot(cw, ch) * 0.32;
  const duration = randRange(3000, 4000);
  shootingStar.active = true;
  shootingStar.quoteShown = false;
  shootingStar.startTime = now;
  shootingStar.duration = duration;
  shootingStar.x0 = startX;
  shootingStar.y0 = startY;
  shootingStar.dx = Math.cos(angle) * distance * (Math.random() < 0.5 ? -1 : 1);
  shootingStar.dy = Math.sin(Math.abs(angle)) * distance;
}

function getShootingStarSegment(now) {
  const t = Math.min(1, (now - shootingStar.startTime) / shootingStar.duration);
  const headX = shootingStar.x0 + shootingStar.dx * t;
  const headY = shootingStar.y0 + shootingStar.dy * t;
  const tailT = Math.max(0, t - CONFIG.SHOOTING_STAR_TAIL_FRAC);
  const tailX = shootingStar.x0 + shootingStar.dx * tailT;
  const tailY = shootingStar.y0 + shootingStar.dy * tailT;
  return { headX, headY, tailX, tailY };
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  let t = lenSq > 0 ? ((px - x1) * dx + (py - y1) * dy) / lenSq : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function tryHitShootingStar(clientX, clientY) {
  if (!shootingStar.active || shootingStar.quoteShown) return false;
  const now = performance.now();
  const { headX, headY, tailX, tailY } = getShootingStarSegment(now);
  const pos = canvasRelative(clientX, clientY);
  if (distToSegment(pos.x, pos.y, tailX, tailY, headX, headY) < CONFIG.SHOOTING_STAR_HIT_TOLERANCE) {
    shootingStar.quoteShown = true;
    onShootingStarComplete();
    return true;
  }
  return false;
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

  let pulseScale = 1;
  if (elapsed >= I.pulseStart && elapsed <= I.pulseStart + I.pulseDur) {
    const pt = (elapsed - I.pulseStart) / I.pulseDur;
    pulseScale = 1 + 0.4 * Math.sin(Math.PI * pt);
  }

  const lineAlpha = Math.min(1, Math.max(0, (elapsed - I.linesStart) / I.linesDur)) * overallAlpha;

  ctx.save();
  ctx.strokeStyle = `rgba(200,220,255,${lineAlpha * 0.5})`;
  ctx.lineWidth = 1;
  for (const [a, b] of introNameEdges) {
    const p1 = introNameStars[a], p2 = introNameStars[b];
    ctx.beginPath();
    ctx.moveTo(introCenterX + p1.x, introCenterY + p1.y);
    ctx.lineTo(introCenterX + p2.x, introCenterY + p2.y);
    ctx.stroke();
  }

  for (const star of introNameStars) {
    const igniteAlpha = Math.min(1, Math.max(0, (elapsed - star.igniteDelay) / I.igniteDur));
    const a = igniteAlpha * overallAlpha;
    if (a <= 0) continue;
    const r = 1.6 * pulseScale;
    const gx = introCenterX + star.x, gy = introCenterY + star.y;
    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, r * 4);
    grad.addColorStop(0, `rgba(255,248,225,${a})`);
    grad.addColorStop(1, "rgba(255,248,225,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(gx, gy, r * 4, 0, Math.PI * 2);
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

    const glowR = (cs.isEasterEgg ? 8 : 14) * camera.zoom;
    const dotR = cs.isEasterEgg ? 1.0 : 1.8;
    const glowAlphaMult = cs.isEasterEgg ? 0.35 : 0.55;
    const dotAlphaMult = cs.isEasterEgg ? 0.75 : 1;
    screenPts.forEach((pos, i) => {
      const alpha = cState.alphas[i] * alphaMult;
      if (alpha <= 0.02) return;
      drawGlow(pos.x, pos.y, glowR, `rgba(255,244,214,${alpha * glowAlphaMult})`);
      ctx.fillStyle = `rgba(255,255,255,${alpha * dotAlphaMult})`;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, dotR, 0, Math.PI * 2);
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

    if (!cs.isEasterEgg && (isConstellationFocused(cs) || isCloseFocused(cs))) {
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
  const { headX, headY, tailX, tailY } = getShootingStarSegment(now);

  ctx.save();
  ctx.strokeStyle = "rgba(210,225,255,0.12)";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(headX, headY);
  ctx.stroke();
  ctx.restore();

  const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(1, "rgba(255,255,255,0.9)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(headX, headY);
  ctx.stroke();
  drawGlow(headX, headY, 11, "rgba(255,255,255,0.9)");
}

function draw(now) {
  const elapsed = introStart !== null ? introElapsed(now) : CONFIG.INTRO.doneAt;
  const mainAlpha = introDone ? 1 : getMainSkyAlpha(elapsed);

  drawBackground(mainAlpha);
  if (mainAlpha > 0.01) {
    drawNebulas(mainAlpha);
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
  camera.zoom = camera.targetZoom = computeFitZoom();
  generateBackgroundStars();
  initConstellationState();
  createAudioPool();

  const nameData = sampleTextToStars("Alana Nisperos");
  introNameStars = nameData.points;
  introNameEdges = nameData.edges;

  scheduleNextShootingStar(performance.now());

  requestAnimationFrame(tick);
}

bootstrap();
