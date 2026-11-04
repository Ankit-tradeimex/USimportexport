'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { feature } from 'topojson-client';
import { geoEquirectangular, geoPath } from 'd3-geo';
import landTopo from 'world-atlas/land-110m.json';

const R = 2; // globe radius

/* ------------------------------------------------------------------ */
/* Data: ports and trade lanes (edit freely)                           */
/* ------------------------------------------------------------------ */
const HUBS = {
  // U.S. ports
  LAX: { name: 'Los Angeles', country: 'United States', lat: 33.74, lon: -118.27, us: true },
  NYC: {
    name: 'New York / New Jersey',
    country: 'United States',
    lat: 40.68,
    lon: -74.04,
    us: true,
  },
  HOU: { name: 'Houston', country: 'United States', lat: 29.73, lon: -95.27, us: true },
  SAV: { name: 'Savannah', country: 'United States', lat: 32.08, lon: -81.09, us: true },
  // partners
  SHA: { name: 'Shanghai', country: 'China', lat: 31.23, lon: 121.47 },
  RTM: { name: 'Rotterdam', country: 'Netherlands', lat: 51.92, lon: 4.48 },
  SIN: { name: 'Singapore', country: 'Singapore', lat: 1.26, lon: 103.82 },
  BOM: { name: 'Mumbai', country: 'India', lat: 18.95, lon: 72.84 },
  DXB: { name: 'Dubai', country: 'UAE', lat: 25.01, lon: 55.06 },
  SSZ: { name: 'Santos', country: 'Brazil', lat: -23.96, lon: -46.33 },
  TYO: { name: 'Tokyo', country: 'Japan', lat: 35.65, lon: 139.77 },
  HAM: { name: 'Hamburg', country: 'Germany', lat: 53.54, lon: 9.97 },
  ZLO: { name: 'Manzanillo', country: 'Mexico', lat: 19.05, lon: -104.31 },
};

const ROUTES = [
  // exports: U.S. -> world
  { from: 'LAX', to: 'SHA', type: 'export' },
  { from: 'NYC', to: 'RTM', type: 'export' },
  { from: 'HOU', to: 'SSZ', type: 'export' },
  { from: 'SAV', to: 'SIN', type: 'export' },
  { from: 'NYC', to: 'DXB', type: 'export' },
  // imports: world -> U.S.
  { from: 'TYO', to: 'LAX', type: 'import' },
  { from: 'HAM', to: 'SAV', type: 'import' },
  { from: 'ZLO', to: 'HOU', type: 'import' },
  { from: 'BOM', to: 'NYC', type: 'import' },
  { from: 'SIN', to: 'LAX', type: 'import' },
];

const LIGHT_COLORS = {
  export: 0x0a3161,
  import: 0xb31942,
  usHub: 0x1a1a3a,
  hub: 0x0a3161,
  land: 0x0a3161,
  ocean: 0xf4f2ff,
};

const DARK_COLORS = {
  export: 0x00bc7d,
  import: 0xb31942,
  usHub: 0xfbbf24,
  hub: 0x00bc7d,
  land: 0x00bc7d,
  ocean: 0x111c30,
};
/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function latLonToVec3(lat, lon, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

const easeInOutSine = (u) => -(Math.cos(Math.PI * u) - 1) / 2;

/* ---- intro animation helpers ---- */
const INTRO_S = 3.4; // seconds the "assemble + zoom out" intro takes
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOutCubic = (u) => 1 - Math.pow(1 - u, 3);
const easeOutQuart = (u) => 1 - Math.pow(1 - u, 4);
const easeOutBack = (u) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2);
};

// Rasterise the land polygons once, then sample a fibonacci sphere against it.
function buildLandPoints(count = 16000) {
  const w = 1440;
  const h = 720;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const projection = geoEquirectangular()
    .scale(w / (2 * Math.PI))
    .translate([w / 2, h / 2]);
  const land = feature(landTopo, landTopo.objects.land);
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  geoPath(projection, ctx)(land);
  ctx.fill();
  const data = ctx.getImageData(0, 0, w, h).data;

  const out = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * (i + 0.5)) / count;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = ((((i * golden) % (2 * Math.PI)) - Math.PI) * 180) / Math.PI;
    const px = Math.min(w - 1, Math.floor(((lon + 180) / 360) * w));
    const py = Math.min(h - 1, Math.floor(((90 - lat) / 180) * h));
    if (data[(py * w + px) * 4 + 3] > 128) {
      const v = latLonToVec3(lat, lon, R * 1.001);
      out.push(v.x, v.y, v.z);
    }
  }
  return new Float32Array(out);
}

function makeDotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.beginPath();
  g.arc(32, 32, 30, 0, Math.PI * 2);
  g.fillStyle = '#fff';
  g.fill();
  return new THREE.CanvasTexture(c);
}

// Small low-poly airplane, nose pointing +Z
function buildPlaneGeometries() {
  // Main fuselage (long airplane body)
  const body = new THREE.CapsuleGeometry(0.014, 0.18, 6, 12);
  body.rotateX(Math.PI / 2);

  // Main wings (wide wingspan)
  const wing = new THREE.BoxGeometry(0.24, 0.006, 0.055);
  wing.translate(0, 0, 0.005);

  // Rear horizontal stabilizer
  const tail = new THREE.BoxGeometry(0.09, 0.005, 0.03);
  tail.translate(0, 0, -0.095);

  // Vertical tail fin
  const fin = new THREE.BoxGeometry(0.008, 0.045, 0.035);
  fin.translate(0, 0.023, -0.095);

  return [body, wing, tail, fin];
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function TradeGlobe({ className = '' }) {
  const mountRef = useRef(null);
  const tipRef = useRef(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const mount = mountRef.current;
    const tip = tipRef.current;
    const COLORS = isDark ? DARK_COLORS : LIGHT_COLORS;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 0 -> 1 while the intro plays; 1 once the globe has settled
    let introP = reduceMotion ? 1 : 0;
    let introDone = reduceMotion;

    /* ---------- renderer / scene / camera ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = 'pan-y'; // page still scrolls on touch
    if (!reduceMotion) {
      const c = renderer.domElement;
      c.style.opacity = '0';
      c.style.transform = 'scale(0.82)';
      c.style.transition = 'opacity 1.1s ease-out, transform 2s cubic-bezier(0.22, 1, 0.36, 1)';
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          c.style.opacity = '1';
          c.style.transform = 'scale(1)';
        }),
      );
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    // start over the U.S.
    const baseCam = latLonToVec3(28, -95, 9.2);
    const baseDir = baseCam.clone().normalize();
    const Y_AXIS = new THREE.Vector3(0, 1, 0);
    camera.position.copy(baseCam);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(6, 8, 6);
    scene.add(sun);

    /* ---------- globe ---------- */
    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(R, 64, 64),
      new THREE.MeshBasicMaterial({
        color: COLORS.ocean,
        transparent: true,
        opacity: reduceMotion ? 1 : 0,
      }),
    );
    scene.add(ocean);

    // soft atmosphere rim
    // const atmosphere = new THREE.Mesh(
    //   new THREE.SphereGeometry(R * 1.14, 64, 64),
    //   new THREE.ShaderMaterial({
    //     transparent: true,
    //     side: THREE.BackSide,
    //     depthWrite: false,
    //     vertexShader: `
    //       varying vec3 vN;
    //       void main() {
    //         vN = normalize(normalMatrix * normal);
    //         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //       }`,
    //     fragmentShader: `
    //       varying vec3 vN;
    //       void main() {
    //         float i = pow(max(0.62 - dot(vN, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
    //         gl_FragColor = vec4(0.42, 0.38, 0.94, clamp(i * 1.6, 0.0, 0.55));
    //       }`,
    //   })
    // );
    // scene.add(atmosphere);

    // dotted continents
    const dotTex = makeDotTexture();
    const landGeo = new THREE.BufferGeometry();
    const landTarget = buildLandPoints(); // final resting positions
    const landCur = new Float32Array(landTarget.length);
    landCur.set(landTarget);
    landGeo.setAttribute('position', new THREE.BufferAttribute(landCur, 3));
    // each dot gets a random start distance + delay, so they fly in as a swirl
    const landN = landTarget.length / 3;
    const landStartK = new Float32Array(landN);
    const landDelay = new Float32Array(landN);
    for (let i = 0; i < landN; i++) {
      landStartK[i] = 2.2 + Math.random() * 3.5;
      landDelay[i] = Math.random() * 0.45;
    }
    const land = new THREE.Points(
      landGeo,
      new THREE.PointsMaterial({
        color: COLORS.land,
        size: 0.05,
        map: dotTex,
        alphaTest: 0.5,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
      }),
    );
    land.frustumCulled = false; // dots start far outside the final bounds
    scene.add(land);

    /* ---------- hubs ---------- */
    const hubList = [];
    const hubMeshes = []; // invisible, larger hit-targets for the raycaster
    const m4 = new THREE.Matrix4();
    const up = new THREE.Vector3(0, 1, 0);

    Object.entries(HUBS).forEach(([id, h]) => {
      const p = latLonToVec3(h.lat, h.lon, R * 1.004);
      const color = h.us ? COLORS.usHub : COLORS.hub;

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(h.us ? 0.05 : 0.04, 20, 20),
        new THREE.MeshBasicMaterial({ color }),
      );
      dot.position.copy(p);
      scene.add(dot);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.05, 0.065, 40),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      ring.position.copy(p);
      m4.lookAt(p.clone().multiplyScalar(2), p, up);
      ring.quaternion.setFromRotationMatrix(m4);
      scene.add(ring);

      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.position.copy(p);
      scene.add(hit);

      const hub = {
        id,
        ...h,
        pos: p,
        dot,
        ring,
        glow: 0,
        phase: Math.random(),
        lanes: ROUTES.filter((r) => r.from === id || r.to === id).length,
      };
      hit.userData.hub = hub;
      hubList.push(hub);
      hubMeshes.push(hit);
    });

    /* ---------- routes + planes ---------- */
    const planeGeos = buildPlaneGeometries();
    const planeMats = {
      export: new THREE.MeshStandardMaterial({
        color: COLORS.export,
        roughness: 0.4,
        emissive: COLORS.export,
        emissiveIntensity: 0.25,
      }),
      import: new THREE.MeshStandardMaterial({
        color: COLORS.import,
        roughness: 0.4,
        emissive: COLORS.import,
        emissiveIntensity: 0.25,
      }),
    };

    const SAMPLES = 120;
    const routes = ROUTES.map((r, idx) => {
      const a = HUBS[r.from];
      const b = HUBS[r.to];
      const p0 = latLonToVec3(a.lat, a.lon, R * 1.004);
      const p1 = latLonToVec3(b.lat, b.lon, R * 1.004);
      const angle = p0.angleTo(p1);
      const H = 0.45 + (angle / Math.PI) * 1.1; // cruise altitude
      const c1 = p0
        .clone()
        .lerp(p1, 0.28)
        .normalize()
        .multiplyScalar(R + H);
      const c2 = p0
        .clone()
        .lerp(p1, 0.72)
        .normalize()
        .multiplyScalar(R + H);
      const curve = new THREE.CubicBezierCurve3(p0, c1, c2, p1);
      const pts = curve.getSpacedPoints(SAMPLES);

      const baseGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const baseMat = new THREE.LineBasicMaterial({
        color: COLORS[r.type],
        transparent: true,
        opacity: 0.22,
      });
      scene.add(new THREE.Line(baseGeo, baseMat));
      baseMat.opacity = 0; // faded in at the end of the intro

      const brightGeo = new THREE.BufferGeometry().setFromPoints(pts);
      brightGeo.setDrawRange(0, 0);
      const brightMat = new THREE.LineBasicMaterial({
        color: COLORS[r.type],
        transparent: true,
        opacity: 1,
      });
      scene.add(new THREE.Line(brightGeo, brightMat));

      const plane = new THREE.Group();
      planeGeos.forEach((g) => plane.add(new THREE.Mesh(g, planeMats[r.type])));
      plane.visible = false;
      scene.add(plane);

      const dur = 7 + (idx % 4) * 0.9 + angle * 1.2;
      return {
        ...r,
        curve,
        brightGeo,
        brightMat,
        baseMat,
        plane,
        fromHub: hubList.find((h) => h.id === r.from),
        toHub: hubList.find((h) => h.id === r.to),
        dur,
        pause: 2.2,
        offset: (idx / ROUTES.length) * 11,
        flying: false,
      };
    });

    /* ---------- controls ---------- */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = (5 * Math.PI) / 6;
    controls.rotateSpeed = 0.6;
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 0.45;
    controls.enabled = reduceMotion; // switched on when the intro finishes

    let resumeAt = 0;
    let dragging = false;
    controls.addEventListener('start', () => {
      dragging = true;
      focusDir = null;
      controls.autoRotate = false;
    });
    controls.addEventListener('end', () => {
      dragging = false;
      resumeAt = performance.now() + 2500;
    });

    /* ---------- hover tooltip + click-to-focus ---------- */
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let hoverHub = null;
    let focusDir = null;
    let downX = 0;
    let downY = 0;

    const pick = (e) => {
      if (introP < 1) return null;
      const r = renderer.domElement.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      // include the globe so ports on the far side are occluded
      const hits = raycaster.intersectObjects([ocean, ...hubMeshes], false);
      if (hits.length && hits[0].object.userData.hub) {
        return hits[0].object.userData.hub;
      }
      return null;
    };

    const onMove = (e) => {
      if (dragging) return;
      const hub = pick(e);
      hoverHub = hub;
      renderer.domElement.style.cursor = hub ? 'pointer' : '';
      if (!tip) return;
      if (hub) {
        const r = mount.getBoundingClientRect();
        tip.textContent = `${hub.name}, ${hub.country} · ${hub.lanes} active lane${
          hub.lanes > 1 ? 's' : ''
        }`;
        tip.style.left = `${e.clientX - r.left + 14}px`;
        tip.style.top = `${e.clientY - r.top + 14}px`;
        tip.style.display = 'block';
      } else {
        tip.style.display = 'none';
      }
    };
    const onLeave = () => {
      hoverHub = null;
      if (tip) tip.style.display = 'none';
    };
    const onDown = (e) => {
      downX = e.clientX;
      downY = e.clientY;
    };
    const onClick = (e) => {
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 5) return; // was a drag
      const hub = pick(e);
      if (hub) {
        focusDir = hub.pos.clone().normalize();
        controls.autoRotate = false;
        resumeAt = performance.now() + 4500;
        hub.glow = 1;
      }
    };
    const el = renderer.domElement;
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('click', onClick);

    /* ---------- sizing ---------- */
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      el.style.width = '100%';
      el.style.height = '100%';
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    /* ---------- animation ---------- */
    const tan = new THREE.Vector3();
    const pos = new THREE.Vector3();
    const ahead = new THREE.Vector3();
    const qI = new THREE.Quaternion();
    const qStep = new THREE.Quaternion();
    const curDir = new THREE.Vector3();

    const updateRoutes = (t) => {
      routes.forEach((r) => {
        if (introP < 1) {
          // lanes fade in just before the planes start flying
          r.plane.visible = false;
          r.brightGeo.setDrawRange(0, 0);
          r.baseMat.opacity = 0.22 * clamp01((introP - 0.7) / 0.3);
          return;
        }
        r.baseMat.opacity = 0.22;
        const cycle = r.dur + r.pause;
        const phase = (t + r.offset) % cycle;
        const flying = phase < r.dur;

        if (flying) {
          const u = phase / r.dur;
          const te = easeInOutSine(u);
          r.curve.getPointAt(te, pos);
          r.curve.getTangentAt(te, tan);
          ahead.copy(pos).add(tan);
          m4.lookAt(ahead, pos, pos.clone().normalize());
          r.plane.position.copy(pos);
          r.plane.quaternion.setFromRotationMatrix(m4);
          r.plane.scale.setScalar(0.85 + 0.55 * Math.sin(Math.PI * te));
          r.plane.visible = true;
          r.brightGeo.setDrawRange(0, Math.max(2, Math.floor(te * SAMPLES)));
          r.brightMat.opacity = 1;
          if (!r.flying) r.fromHub.glow = 1; // takeoff
        } else {
          r.plane.visible = false;
          r.brightGeo.setDrawRange(0, SAMPLES + 1);
          r.brightMat.opacity = Math.max(0, 1 - (phase - r.dur) / (r.pause * 0.9));
          if (r.flying) r.toHub.glow = 1; // landing
        }
        r.flying = flying;
      });
    };

    const updateHubs = (t) => {
      // ports pop in one after another near the end of the intro
      hubList.forEach((h, i) => {
        const pop = easeOutBack(clamp01((introP - 0.62 - i * 0.02) / 0.22));
        h.glow *= 0.96;
        const hoverBoost = hoverHub === h ? 0.8 : 0;
        h.dot.scale.setScalar(Math.max(0.0001, (1 + h.glow * 0.9 + hoverBoost) * pop));
        const ph = (t * 0.45 + h.phase) % 1;
        h.ring.scale.setScalar(Math.max(0.0001, (1 + ph * 2.2 + h.glow * 0.8) * pop));
        h.ring.material.opacity = ((1 - ph) * 0.45 + h.glow * 0.3) * clamp01(pop);
      });
    };

    /* ---------- intro: dots swirl in, camera pulls back and settles ---------- */
    const updateIntro = (p) => {
      // continents assemble from a scattered cloud
      for (let i = 0; i < landN; i++) {
        const lp = clamp01((p - landDelay[i]) / 0.55);
        const e = easeOutCubic(lp);
        const k = landStartK[i] + (1 - landStartK[i]) * e;
        const ang = (1 - e) * 2.2;
        const c = Math.cos(ang);
        const s = Math.sin(ang);
        const x = landTarget[i * 3];
        const y = landTarget[i * 3 + 1];
        const z = landTarget[i * 3 + 2];
        landCur[i * 3] = (x * c + z * s) * k;
        landCur[i * 3 + 1] = y * k;
        landCur[i * 3 + 2] = (-x * s + z * c) * k;
      }
      landGeo.attributes.position.needsUpdate = true;
      land.material.opacity = 0.75 * clamp01(p * 4);
      ocean.material.opacity = clamp01((p - 0.3) / 0.5);

      // camera starts close and spinning, then pulls back and settles over the U.S.
      const e = easeOutQuart(p);
      const dist = 5.4 + (baseCam.length() - 5.4) * e;
      const spin = (1 - e) * Math.PI * 1.15;
      camera.position.copy(baseDir).multiplyScalar(dist).applyAxisAngle(Y_AXIS, spin);
      camera.lookAt(0, 0, 0);
    };

    let raf = 0;
    let visible = true;
    const timer = new THREE.Timer();
    // reduced motion: freeze on a nice mid-flight snapshot
    const STATIC_T = 3.5;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      timer.update();
      const t = reduceMotion ? STATIC_T : timer.getElapsed();

      if (!reduceMotion && !dragging && performance.now() > resumeAt) {
        controls.autoRotate = true;
      }

      if (focusDir && !dragging) {
        curDir.copy(camera.position).normalize();
        if (curDir.angleTo(focusDir) < 0.01) {
          focusDir = null;
        } else {
          qStep.setFromUnitVectors(curDir, focusDir);
          qStep.copy(qI).slerp(qStep, 0.07);
          camera.position.applyQuaternion(qStep);
        }
      }

      if (!introDone) {
        introP = clamp01((t - 0.1) / INTRO_S);
        updateIntro(introP);
        if (introP >= 1) {
          introDone = true;
          controls.enabled = true;
          resumeAt = performance.now() + 600;
          hubList.forEach((h) => h.us && (h.glow = 1)); // little landing pulse
        }
      }

      updateRoutes(t);
      updateHubs(t);
      if (introDone) controls.update();
      renderer.render(scene, camera);
    };
    frame();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(mount);

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('click', onClick);
      controls.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        }
      });
      planeGeos.forEach((g) => g.dispose());
      Object.values(planeMats).forEach((m) => m.dispose());
      dotTex.dispose();
      timer.dispose();
      renderer.dispose();
      if (el.parentNode === mount) mount.removeChild(el);
    };
  }, [isDark]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="Interactive 3D globe showing U.S. import and export shipping lanes. Drag to rotate, click a port to focus on it."
      />
      <div
        ref={tipRef}
        className="pointer-events-none absolute z-10 hidden whitespace-nowrap rounded-md bg-[#1a1a3a] px-2.5 py-1.5 text-xs font-medium text-white shadow-lg"
      />
    </div>
  );
}
