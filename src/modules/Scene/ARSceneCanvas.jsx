import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as THREE from "three";
import { getModelConfigForActivity } from "../../registry/modelRegistry";

export default function ARSceneCanvas({
  activity,
  isWireframe = false,
  manualRotation = 0,
  scaleFactor = 1,
  lightingPreset = "studio",
  cameraView = "isometric",
  isAnimPaused = false,
  animSpeed = 1.0,
  isExploded = false,
  showDimensions = false,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Model Registry Configuration
    const config = getModelConfigForActivity(activity?.id);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

    // Set Initial Camera Snap Position
    if (cameraView === "top") {
      camera.position.set(0, 6, 0.001);
    } else if (cameraView === "front") {
      camera.position.set(0, 0, 6);
    } else {
      camera.position.set(3, 3, 5); // Isometric default
    }
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lighting Studio Presets
    let ambientLight, dirLight, pointLight;

    if (lightingPreset === "contrast") {
      ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
      dirLight.position.set(10, 15, 10);
      pointLight = new THREE.PointLight(0x38bdf8, 2.0, 12);
      pointLight.position.set(-8, -5, -4);
    } else if (lightingPreset === "sunlight") {
      ambientLight = new THREE.AmbientLight(0xfff7ed, 0.9);
      dirLight = new THREE.DirectionalLight(0xfacc15, 2.0);
      dirLight.position.set(8, 12, 5);
      pointLight = new THREE.PointLight(0xf97316, 1.5, 10);
      pointLight.position.set(-5, -5, 2);
    } else if (lightingPreset === "cyber") {
      ambientLight = new THREE.AmbientLight(0x0f172a, 0.5);
      dirLight = new THREE.DirectionalLight(0xa855f7, 2.2);
      dirLight.position.set(-5, 10, 5);
      pointLight = new THREE.PointLight(0x38bdf8, 2.5, 10);
      pointLight.position.set(5, -5, 5);
    } else {
      // Studio Default
      ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      dirLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
      dirLight.position.set(5, 10, 7);
      pointLight = new THREE.PointLight(config.primaryColor, 1.2, 10);
      pointLight.position.set(-5, -5, -2);
    }

    scene.add(ambientLight);
    scene.add(dirLight);
    scene.add(pointLight);

    // 5. Create Dynamic 3D Mesh & Sub-components
    const group = new THREE.Group();
    scene.add(group);

    let mainMesh;
    let extraObjects = [];
    let subParts = []; // Sub-components for exploded deconstruction

    const geomType = config.geometryType;

    if (geomType === "box" || geomType === "cylinder" || geomType === "octahedron") {
      let geometry;
      if (geomType === "box") geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      else if (geomType === "cylinder") geometry = new THREE.CylinderGeometry(0.9, 0.9, 1.8, 32);
      else geometry = new THREE.OctahedronGeometry(1.4);

      const material = new THREE.MeshStandardMaterial({
        color: config.primaryColor,
        roughness: 0.3,
        metalness: 0.2,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(geometry, material);
      group.add(mainMesh);

      // Outer Wireframe Frame
      const wireGeo = new THREE.WireframeGeometry(geometry);
      const wireMat = new THREE.LineBasicMaterial({ color: config.secondaryColor, linewidth: 2 });
      const wireframeLines = new THREE.LineSegments(wireGeo, wireMat);
      wireframeLines.scale.set(1.04, 1.04, 1.04);
      group.add(wireframeLines);

      // Exploded Net Plates (Top, Bottom, Sides)
      const faceGeo = new THREE.PlaneGeometry(1.5, 1.5);
      const faceMat = new THREE.MeshStandardMaterial({
        color: config.secondaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        wireframe: isWireframe,
      });

      const directions = [
        { pos: [0, 0.85, 0], rot: [-Math.PI / 2, 0, 0], dir: [0, 1, 0] },
        { pos: [0, -0.85, 0], rot: [Math.PI / 2, 0, 0], dir: [0, -1, 0] },
        { pos: [0, 0, 0.85], rot: [0, 0, 0], dir: [0, 0, 1] },
        { pos: [0, 0, -0.85], rot: [0, Math.PI, 0], dir: [0, 0, -1] },
        { pos: [0.85, 0, 0], rot: [0, Math.PI / 2, 0], dir: [1, 0, 0] },
        { pos: [-0.85, 0, 0], rot: [0, -Math.PI / 2, 0], dir: [-1, 0, 0] },
      ];

      directions.forEach((d) => {
        const plate = new THREE.Mesh(faceGeo, faceMat);
        plate.position.set(...d.pos);
        plate.rotation.set(...d.rot);
        group.add(plate);
        subParts.push({ mesh: plate, basePos: d.pos, dir: d.dir });
      });
    } else if (geomType === "solar-system") {
      // Solar System Planet + Ring + Moon
      const planetGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: config.primaryColor,
        roughness: 0.4,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(planetGeo, planetMat);
      group.add(mainMesh);

      const ringGeo = new THREE.RingGeometry(1.5, 2.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: config.secondaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        wireframe: isWireframe,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.5;
      group.add(ringMesh);
      subParts.push({ mesh: ringMesh, basePos: [0, 0, 0], dir: [0, 0.8, 0.5] });

      const moonGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, wireframe: isWireframe });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.set(2.2, 0, 0);
      group.add(moonMesh);
      extraObjects.push({ mesh: moonMesh, radius: 2.2, speed: 1.2 });
      subParts.push({ mesh: moonMesh, basePos: [2.2, 0, 0], dir: [1, 0.5, 0] });
    } else if (geomType === "atomic") {
      // Bohr Atomic Model Nucleus + Electrons
      const nucleusGeo = new THREE.SphereGeometry(0.7, 32, 32);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: config.primaryColor,
        roughness: 0.2,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
      group.add(mainMesh);

      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.6 + i * 0.4, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: config.secondaryColor, wireframe: isWireframe });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = (Math.PI / 3) * i;
        ringMesh.rotation.y = (Math.PI / 4) * i;
        group.add(ringMesh);
        subParts.push({ mesh: ringMesh, basePos: [0, 0, 0], dir: [0, 0.5 * (i + 1), 0.5 * (i + 1)] });

        const electronGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const electronMat = new THREE.MeshBasicMaterial({ color: config.wireframeColor, wireframe: isWireframe });
        const electronMesh = new THREE.Mesh(electronGeo, electronMat);
        electronMesh.position.set(1.6 + i * 0.4, 0, 0);
        group.add(electronMesh);
        extraObjects.push({ mesh: electronMesh, radius: 1.6 + i * 0.4, speed: 1.5 + i * 0.5 });
      }
    } else {
      // Default Icosahedron Mesh
      const geometry = new THREE.IcosahedronGeometry(1.3, 1);
      const material = new THREE.MeshStandardMaterial({
        color: config.primaryColor,
        roughness: 0.3,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(geometry, material);
      group.add(mainMesh);
    }

    // 6. 3D Bounding Box Dimension Rulers
    let boxHelper = null;
    if (showDimensions && mainMesh) {
      boxHelper = new THREE.BoxHelper(mainMesh, 0x10b981);
      scene.add(boxHelper);
    }

    // 7. Interactive Pointer Drag & Orbit State
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let gestureRotation = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointer.x;
      const deltaY = e.clientY - prevPointer.y;

      gestureRotation.y += deltaX * 0.008;
      gestureRotation.x += deltaY * 0.008;

      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.style.pointerEvents = "auto";
    domElement.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 8. Animation Frame Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let accumulatedTime = 0;
    let explodeProgress = 0;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isAnimPaused) {
        accumulatedTime += delta * animSpeed;
      }

      // Smooth Explode / Unfold Transition
      const targetExplode = isExploded ? 1 : 0;
      explodeProgress += (targetExplode - explodeProgress) * 0.08;

      subParts.forEach((part) => {
        const offset = 0.8 * explodeProgress;
        part.mesh.position.x = part.basePos[0] + part.dir[0] * offset;
        part.mesh.position.y = part.basePos[1] + part.dir[1] * offset;
        part.mesh.position.z = part.basePos[2] + part.dir[2] * offset;
      });

      // Combine Auto-Rotation + Manual Rotation + Direct Pointer Gesture
      group.rotation.y = accumulatedTime * config.autoRotateSpeed + (manualRotation * Math.PI) / 180 + gestureRotation.y;
      group.rotation.x = Math.sin(accumulatedTime * 0.3) * 0.2 + gestureRotation.x;

      const combinedScale = config.initialScale * scaleFactor;
      group.scale.set(combinedScale, combinedScale, combinedScale);

      extraObjects.forEach((obj) => {
        if (obj.radius) {
          const angle = accumulatedTime * obj.speed;
          obj.mesh.position.x = Math.cos(angle) * obj.radius;
          obj.mesh.position.z = Math.sin(angle) * obj.radius;
        }
      });

      if (boxHelper) {
        boxHelper.update();
      }

      renderer.render(scene, camera);
    }

    animate();

    // 9. Resize Handler
    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [
    activity,
    isWireframe,
    manualRotation,
    scaleFactor,
    lightingPreset,
    cameraView,
    isAnimPaused,
    animSpeed,
    isExploded,
    showDimensions,
  ]);

  return (
    <Box
      ref={mountRef}
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: "auto",
      }}
    />
  );
}
