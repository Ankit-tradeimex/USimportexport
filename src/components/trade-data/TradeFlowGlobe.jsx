'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HUBS } from '../../data/tradeData';

/**
 * 3D globe that shows the direction of trade.
 *   direction="import" -> red routes flow INTO the USA
 *   direction="export" -> blue routes flow OUT of the USA
 */
const US = { lat: 39, lon: -98 };

const THEMES = {
  light: {
    ocean: 0xf1f4fb,
    dots: 0x8fa0c4,
    dotOpacity: 0.85,
    import: 0xb31942,
    export: 0x0a3161,
    hub: 0x0a3161,
    glow: false,
  },
  dark: {
    ocean: 0x0b1530,
    dots: 0x5dbaf6,
    dotOpacity: 0.9,
    import: 0xff4d6d,
    export: 0x4da3ff,
    hub: 0xffffff,
    glow: true,
  },
};

const readMode = () => {
  const el = document.documentElement;
  return el.classList.contains('dark') || el.dataset.theme === 'dark' ? 'dark' : 'light';
};

function ll(lat, lon, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function arc(a, b) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const d = a.distanceTo(b);
  mid.normalize().multiplyScalar(1 + d * 0.8);
  return new THREE.QuadraticBezierCurve3(a, mid, b);
}

export default function TradeFlowGlobe({ direction = 'import' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const usV = ll(US.lat, US.lon);
    camera.position.copy(usV).multiplyScalar(4.1);
    camera.position.y += 0.7;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.7;
    controls.minPolarAngle = 0.7;
    controls.maxPolarAngle = Math.PI - 0.7;

    const world = new THREE.Group();
    scene.add(world);

    /* ocean sphere (hides the dots on the far side) */
    const oceanMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    world.add(new THREE.Mesh(new THREE.SphereGeometry(0.995, 64, 64), oceanMat));

    /* dotted surface */
    const N = 2600;
    const pos = new Float32Array(N * 3);
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = ga * i;
      pos[i * 3] = Math.cos(th) * rad;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(th) * rad;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dotMat = new THREE.PointsMaterial({ size: 0.013, transparent: true, depthWrite: false });
    world.add(new THREE.Points(dotGeo, dotMat));

    /* atmosphere glow (dark mode only) */
    const glowMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        c: { value: new THREE.Color(0x4da3ff) },
      },
      vertexShader: `
    varying vec3 n;

    void main() {
      n = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
      fragmentShader: `
    uniform vec3 c;
    varying vec3 n;

    void main() {
      float i = pow(0.62 - dot(n, vec3(0.0, 0.0, 1.0)), 3.0);
      gl_FragColor = vec4(c, 1.0) * i;
    }
  `,
    });

    const glow = new THREE.Mesh(new THREE.SphereGeometry(1.16, 48, 48), glowMat);

    scene.add(glow);

    /* routes */
    const routeMats = [];
    const accentMats = [];
    const packets = [];
    const hubMat = new THREE.MeshBasicMaterial();
    const hubGeo = new THREE.SphereGeometry(0.014, 12, 12);
    const packetGeo = new THREE.SphereGeometry(0.02, 12, 12);
    const haloGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const toUS = direction === 'import';

    HUBS.forEach((h, i) => {
      const hv = ll(h.lat, h.lon, 1.002);
      const marker = new THREE.Mesh(hubGeo, hubMat);
      marker.position.copy(hv);
      world.add(marker);

      const curve = toUS
        ? arc(hv, usV.clone().multiplyScalar(1.002))
        : arc(usV.clone().multiplyScalar(1.002), hv);

      const lineMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.35 });
      routeMats.push(lineMat);
      world.add(
        new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)), lineMat),
      );

      for (let k = 0; k < 2; k++) {
        const mat = new THREE.MeshBasicMaterial({ transparent: true });
        const haloMat = new THREE.MeshBasicMaterial({
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        accentMats.push(mat, haloMat);
        const mesh = new THREE.Mesh(packetGeo, mat);
        mesh.add(new THREE.Mesh(haloGeo, haloMat));
        world.add(mesh);
        packets.push({
          mesh,
          mat,
          haloMat,
          curve,
          speed: 0.11 + (i % 4) * 0.012,
          offset: i * 0.173 + k * 0.5,
        });
      }
    });

    /* USA hub + pulse rings */
    const usMat = new THREE.MeshBasicMaterial();
    const usDot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 20, 20), usMat);
    usDot.position.copy(usV).multiplyScalar(1.004);
    world.add(usDot);
    const rings = [0, 0.5].map((phase) => {
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      accentMats.push(mat);
      const m = new THREE.Mesh(new THREE.RingGeometry(0.034, 0.042, 64), mat);
      m.position.copy(usV).multiplyScalar(1.006);
      m.lookAt(usV.clone().multiplyScalar(3));
      world.add(m);
      return { m, mat, phase };
    });

    /* theme */
    const applyTheme = () => {
      const T = THEMES[readMode()];
      const accent = T[direction];

      oceanMat.color.setHex(T.ocean);

      dotMat.color.setHex(T.dots);
      dotMat.opacity = T.dotOpacity;

      hubMat.color.setHex(T.hub);

      usMat.color.setHex(accent);

      routeMats.forEach((m) => m.color.setHex(accent));
      accentMats.forEach((m) => m.color.setHex(accent));

      // Outer atmosphere glow follows import/export color
      glow.visible = T.glow;
      glowMat.uniforms.c.value.setHex(accent);
    };
    applyTheme();
    const mo = new MutationObserver(applyTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    /* size */
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* only render while on screen */
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(mount);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = reduce ? 0.35 : performance.now() / 1000;

      packets.forEach((p) => {
        const u = (t * p.speed + p.offset) % 1;
        const s = Math.sin(u * Math.PI);
        p.mesh.position.copy(p.curve.getPoint(u));
        p.mesh.scale.setScalar(0.6 + s * 0.8);
        p.mat.opacity = 0.2 + 0.8 * s;
        p.haloMat.opacity = 0.35 * s;
      });
      rings.forEach((r) => {
        const u = reduce ? 0.4 : (t * 0.6 + r.phase) % 1;
        r.m.scale.setScalar(1 + u * 5);
        r.mat.opacity = 0.9 * (1 - u);
      });

      controls.update();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      io.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        const m = o.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m?.dispose?.();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [direction]);

  return <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />;
}
