// 랜딩 가운데 3D 무대. three.js 는 이 파일을 쓸 때만 따로 내려받는다(랜딩 외 페이지엔 0KB).
//
// 모델 교체: public/models/ 에 파일을 넣고 src/lib/site.ts 의 HERO.model 에 경로를 적는다.
//   .glb / .gltf (권장 — 작고 빠름) 또는 .fbx 둘 다 된다.
//   크기·위치는 자동으로 화면 가운데에 맞춰지고, 파일에 애니메이션이 있으면 첫 번째 클립이 반복 재생된다.
// 모델이 없으면 자리표시용 빨간 상자(대표 이미지)가 나온다.
import * as THREE from 'three';

export type Stage = {
  /** 마우스 위치 -1..1 (화면 기준) */
  point(nx: number, ny: number): void;
  /** 클릭 인사 */
  wave(): void;
  destroy(): void;
};

type Opts = { model?: string; reduced: boolean; onError?: (e: unknown) => void };

export async function mountStage(host: HTMLElement, opts: Opts): Promise<Stage> {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  // 조명: 흰 종이 위 그림처럼 그림자는 옅게
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd9d6cf, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 4, 5);
  scene.add(key);

  // pivot(마우스 따라 회전) ⟶ hop(인사 점프) ⟶ 모델
  const pivot = new THREE.Group();
  const hop = new THREE.Group();
  pivot.add(hop);
  scene.add(pivot);

  let mixer: THREE.AnimationMixer | null = null;
  const object = opts.model ? await loadModel(opts.model) : placeholder();
  fit(object, 2.2);
  hop.add(object);

  if (object.animations?.length) {
    mixer = new THREE.AnimationMixer(object);
    mixer.clipAction(object.animations[0]).play();
  }

  /* 크기 맞추기 */
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // 세로로 긴 틀에서도 모델이 잘리지 않게 거리 보정
    camera.position.z = 6 * Math.max(1, 0.8 / camera.aspect);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  /* 마우스 따라가기 (부드럽게 감속) */
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  let jump = 0; // 인사 진행 0..1
  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(host);

  const timer = new THREE.Timer();
  let raf = 0;
  const loop = (now?: number) => {
    raf = requestAnimationFrame(loop);
    timer.update(now);
    if (!visible || document.hidden) return;
    const dt = Math.min(timer.getDelta(), 0.05);
    const t = timer.getElapsed();
    const k = 1 - Math.pow(0.0015, dt); // 프레임 독립 감속
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    pivot.rotation.y = cur.x * 0.7;
    pivot.rotation.x = -cur.y * 0.35;
    if (!opts.reduced) hop.position.y = Math.sin(t * 1.6) * 0.04; // 숨쉬기
    if (jump > 0) {
      jump = Math.max(0, jump - dt / 0.9);
      const p = 1 - jump;
      hop.position.y += Math.sin(p * Math.PI) * 0.35;
      hop.rotation.y = p * Math.PI * 2;
    } else hop.rotation.y = 0;
    mixer?.update(dt);
    renderer.render(scene, camera);
  };
  loop();

  return {
    point(nx, ny) { target.x = nx; target.y = ny; },
    wave() { if (!opts.reduced) jump = 1; },
    destroy() {
      cancelAnimationFrame(raf);
      timer.dispose();
      ro.disconnect();
      io.disconnect();
      mixer?.stopAllAction();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((mat) => {
          Object.values(mat).forEach((v) => (v as THREE.Texture)?.isTexture && (v as THREE.Texture).dispose());
          mat.dispose();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

async function loadModel(path: string): Promise<THREE.Object3D> {
  const url = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  const ext = path.split('.').pop()!.toLowerCase();
  if (ext === 'fbx') {
    const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');
    return new FBXLoader().loadAsync(url);
  }
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
  const gltf = await new GLTFLoader().loadAsync(url);
  gltf.scene.animations = gltf.animations;
  return gltf.scene;
}

/** 자리표시: 빨간 상자 + 손그림 같은 검은 모서리 */
function placeholder(): THREE.Object3D {
  const g = new THREE.Group();
  const geo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
  g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xe23b2a, roughness: 0.85 })));
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x111111 }));
  edges.scale.setScalar(1.002);
  g.add(edges);
  g.rotation.set(0.45, 0.6, 0);
  return g;
}

/** 모델을 원점 가운데에 놓고 가장 긴 변이 size 가 되게 */
function fit(obj: THREE.Object3D, size: number) {
  const box = new THREE.Box3().setFromObject(obj);
  const dim = box.getSize(new THREE.Vector3());
  const s = size / Math.max(dim.x, dim.y, dim.z || 1);
  obj.scale.multiplyScalar(s);
  const c = new THREE.Box3().setFromObject(obj).getCenter(new THREE.Vector3());
  obj.position.sub(c);
}
