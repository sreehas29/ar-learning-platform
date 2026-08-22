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
  simParams = {},
  sliceParams = {},
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

    // Configure 3D GPU Clipping Plane for Cross-Section Slicing
    if (sliceParams?.enabled) {
      const norm =
        sliceParams.axis === "y"
          ? new THREE.Vector3(0, -1, 0)
          : sliceParams.axis === "z"
          ? new THREE.Vector3(0, 0, -1)
          : new THREE.Vector3(-1, 0, 0);
      const clipPlane = new THREE.Plane(norm, sliceParams.depth || 0);
      renderer.clippingPlanes = [clipPlane];
      renderer.localClippingEnabled = true;
    }

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
      ambientLight = new THREE.AmbientLight(0xffedd5, 0.9);
      dirLight = new THREE.DirectionalLight(0xf97316, 2.8);
      dirLight.position.set(15, 20, 5);
      pointLight = new THREE.PointLight(0xeab308, 1.5, 15);
      pointLight.position.set(5, 10, 5);
    } else if (lightingPreset === "cyber") {
      ambientLight = new THREE.AmbientLight(0x0f172a, 0.5);
      dirLight = new THREE.DirectionalLight(0xec4899, 3.0);
      dirLight.position.set(-10, 10, 10);
      pointLight = new THREE.PointLight(0x06b6d4, 3.0, 15);
      pointLight.position.set(8, -5, 5);
    } else {
      // Default Studio Preset
      ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
      dirLight.position.set(5, 10, 7);
      pointLight = new THREE.PointLight(0x1565c0, 1.0, 10);
      pointLight.position.set(-5, 5, -5);
    }

    dirLight.castShadow = true;
    scene.add(ambientLight);
    scene.add(dirLight);
    scene.add(pointLight);

    // 5. Build High-Fidelity 3D WebGL Models & Assemblies
    const group = new THREE.Group();
    scene.add(group);

    const geomType = config.geometryType || "box";
    let mainMesh = null;
    let pulseMesh = null;
    const subParts = [];
    const extraObjects = [];

    if (geomType === "pythagoras") {
      // 3D Pythagoras Theorem Proof Geometry
      const legAVal = simParams.legA || 3;
      const legBVal = simParams.legB || 4;
      const scaleA = (legAVal / 3) * 1.6;
      const scaleB = (legBVal / 4) * 1.2;

      const triShape = new THREE.Shape();
      triShape.moveTo(0, 0);
      triShape.lineTo(scaleA, 0);
      triShape.lineTo(0, scaleB);
      triShape.closePath();

      const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 };
      const triGeo = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
      const triMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, wireframe: isWireframe });
      mainMesh = new THREE.Mesh(triGeo, triMat);
      mainMesh.position.set(-scaleA / 2, -scaleB / 2, 0);
      group.add(mainMesh);

      // Block A² (Base)
      const blockAGeo = new THREE.BoxGeometry(scaleA, scaleA, 0.4);
      const blockAMat = new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: isWireframe });
      const blockA = new THREE.Mesh(blockAGeo, blockAMat);
      blockA.position.set(0, -scaleB / 2 - scaleA / 2, 0);
      group.add(blockA);
      subParts.push({ mesh: blockA, basePos: [0, -scaleB / 2 - scaleA / 2, 0], dir: [0, -1, 0] });

      // Block B² (Vertical)
      const blockBGeo = new THREE.BoxGeometry(scaleB, scaleB, 0.4);
      const blockBMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe: isWireframe });
      const blockB = new THREE.Mesh(blockBGeo, blockBMat);
      blockB.position.set(-scaleA / 2 - scaleB / 2, 0, 0);
      group.add(blockB);
      subParts.push({ mesh: blockB, basePos: [-scaleA / 2 - scaleB / 2, 0, 0], dir: [-1, 0, 0] });

    } else if (geomType === "prism-refraction") {
      // 3D Glass Prism Refraction + Dispersion Spectrum Rays
      const iorVal = simParams.refractiveIndex || 1.5;
      const angleVal = simParams.laserAngle || 45;

      const prismGeo = new THREE.CylinderGeometry(1.2, 1.2, 2.0, 3);
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: 0x93c5fd,
        transmission: 0.9,
        opacity: 1,
        transparent: true,
        roughness: 0.1,
        ior: iorVal,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(prismGeo, prismMat);
      group.add(mainMesh);

      // Incident White Beam
      const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.5);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.rotation.z = (angleVal * Math.PI) / 180;
      beam.position.set(-1.4, 0, 0);
      group.add(beam);

      // Spectrum Rainbow Rays
      const colors = [0xef4444, 0xf97316, 0xeab308, 0x10b981, 0x06b6d4, 0x3b82f6, 0x8b5cf6];
      colors.forEach((col, idx) => {
        const rayGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.2);
        const rayMat = new THREE.MeshBasicMaterial({ color: col });
        const ray = new THREE.Mesh(rayGeo, rayMat);
        ray.rotation.z = -Math.PI / 3.5 - idx * 0.04 * (iorVal / 1.5);
        ray.position.set(1.4, -0.2 + idx * 0.08, 0);
        group.add(ray);
        subParts.push({ mesh: ray, basePos: [1.4, -0.2 + idx * 0.08, 0], dir: [1, idx * 0.2, 0] });
      });

    } else if (geomType === "plant-cell") {
      // 3D Plant Cell Wall + Nucleus + Chloroplasts + Vacuole
      const cellWallGeo = new THREE.CylinderGeometry(1.4, 1.4, 1.8, 6);
      const cellWallMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        wireframe: isWireframe,
        transparent: true,
        opacity: 0.7,
      });
      mainMesh = new THREE.Mesh(cellWallGeo, cellWallMat);
      group.add(mainMesh);

      // Central Nucleus
      const nucGeo = new THREE.SphereGeometry(0.45, 32, 32);
      const nucMat = new THREE.MeshStandardMaterial({ color: 0x9333ea, wireframe: isWireframe });
      const nucMesh = new THREE.Mesh(nucGeo, nucMat);
      nucMesh.position.set(-0.4, 0, 0);
      group.add(nucMesh);

      // Vacuole Liquid
      const vacGeo = new THREE.BoxGeometry(0.8, 1.0, 0.8);
      const vacMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6, wireframe: isWireframe });
      const vacMesh = new THREE.Mesh(vacGeo, vacMat);
      vacMesh.position.set(0.4, 0, 0);
      group.add(vacMesh);

      // Chloroplast Discs
      for (let i = 0; i < 4; i++) {
        const cpGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16);
        const cpMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, wireframe: isWireframe });
        const cpMesh = new THREE.Mesh(cpGeo, cpMat);
        const angle = (Math.PI / 2) * i;
        cpMesh.position.set(Math.cos(angle) * 0.9, 0.4 * (i % 2 ? 1 : -1), Math.sin(angle) * 0.9);
        group.add(cpMesh);
        subParts.push({ mesh: cpMesh, basePos: [Math.cos(angle) * 0.9, 0.4 * (i % 2 ? 1 : -1), Math.sin(angle) * 0.9], dir: [Math.cos(angle), 0, Math.sin(angle)] });
      }

    } else if (geomType === "heart-circulation") {
      // 3D Pulsating Human Heart Mesh + Aorta Tubes
      const heartGeo = new THREE.DodecahedronGeometry(1.2, 2);
      const heartMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.3,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(heartGeo, heartMat);
      pulseMesh = mainMesh;
      group.add(mainMesh);

      // Aorta Tube Top
      const aortaGeo = new THREE.TorusGeometry(0.6, 0.15, 16, 32, Math.PI);
      const aortaMat = new THREE.MeshStandardMaterial({ color: 0xef4444, wireframe: isWireframe });
      const aorta = new THREE.Mesh(aortaGeo, aortaMat);
      aorta.position.set(0, 1.1, 0);
      group.add(aorta);

      // Moving Blood Particles
      for (let i = 0; i < 6; i++) {
        const pGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        group.add(pMesh);
        extraObjects.push({ mesh: pMesh, radius: 0.8, speed: 2.0 + i * 0.3 });
      }

    } else if (geomType === "solenoid-magnetic") {
      // 3D Solenoid Helical Coil + Magnetic Field Lines
      const helixGeo = new THREE.TorusGeometry(0.8, 0.08, 16, 100);
      const helixMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.8, roughness: 0.2, wireframe: isWireframe });

      for (let i = 0; i < 5; i++) {
        const ring = new THREE.Mesh(helixGeo, helixMat);
        ring.position.set(0, (i - 2) * 0.35, 0);
        group.add(ring);
      }

      // Magnetic Field Torus Loops
      for (let i = 0; i < 3; i++) {
        const fieldGeo = new THREE.TorusGeometry(1.4 + i * 0.4, 0.02, 16, 100);
        const fieldMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: isWireframe });
        const fieldLine = new THREE.Mesh(fieldGeo, fieldMat);
        fieldLine.rotation.x = Math.PI / 2;
        group.add(fieldLine);
        subParts.push({ mesh: fieldLine, basePos: [0, 0, 0], dir: [0.5 * (i + 1), 0, 0] });
      }

    } else if (geomType === "hydrocarbon") {
      // 3D Dynamic Bohr Atom / Tetrahedral Hydrocarbon Bond
      const atomicNum = simParams.atomicNumber || 6;

      const carbonGeo = new THREE.SphereGeometry(0.65, 32, 32);
      const carbonMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2, wireframe: isWireframe });
      mainMesh = new THREE.Mesh(carbonGeo, carbonMat);
      group.add(mainMesh);

      // Render Electrons / Hydrogens based on atomicNum
      for (let i = 0; i < atomicNum; i++) {
        const angle = (Math.PI * 2 * i) / atomicNum;
        const pos = [Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, (i % 2 ? 0.4 : -0.4)];

        const bondGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.5);
        const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const bond = new THREE.Mesh(bondGeo, bondMat);
        bond.position.set(pos[0] / 2, pos[1] / 2, pos[2] / 2);
        bond.lookAt(pos[0], pos[1], pos[2]);
        bond.rotation.x += Math.PI / 2;
        group.add(bond);

        const hGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const hMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, wireframe: isWireframe });
        const hMesh = new THREE.Mesh(hGeo, hMat);
        hMesh.position.set(...pos);
        group.add(hMesh);
        subParts.push({ mesh: hMesh, basePos: pos, dir: [pos[0] * 0.8, pos[1] * 0.8, pos[2] * 0.8] });
      }

    } else if (geomType === "conic-sections") {
      // 3D Double-Cone Geometry + Translucent Cutting Plane
      const cone1Geo = new THREE.ConeGeometry(1.2, 1.5, 32);
      const coneMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, wireframe: isWireframe, transparent: true, opacity: 0.7 });
      const cone1 = new THREE.Mesh(cone1Geo, coneMat);
      cone1.position.set(0, 0.75, 0);
      group.add(cone1);

      const cone2 = new THREE.Mesh(cone1Geo, coneMat);
      cone2.rotation.z = Math.PI;
      cone2.position.set(0, -0.75, 0);
      group.add(cone2);

      // Cutting Plane Sheet
      const planeGeo = new THREE.PlaneGeometry(2.4, 2.4);
      const planeMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.65 });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.rotation.x = Math.PI / 4;
      group.add(plane);
      subParts.push({ mesh: plane, basePos: [0, 0, 0], dir: [0, 0.8, 0.8] });

    } else if (geomType === "balance-scale") {
      // 3D Mechanical Balance Scale Assembly
      const pillarGeo = new THREE.CylinderGeometry(0.12, 0.25, 2.4);
      const metalMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2, wireframe: isWireframe });
      mainMesh = new THREE.Mesh(pillarGeo, metalMat);
      mainMesh.position.set(0, -0.2, 0);
      group.add(mainMesh);

      // Tilting Arm
      const armGeo = new THREE.BoxGeometry(2.8, 0.1, 0.1);
      const arm = new THREE.Mesh(armGeo, metalMat);
      arm.position.set(0, 0.9, 0);
      group.add(arm);

      // Suspended Pans
      [-1.3, 1.3].forEach((xPos, idx) => {
        const panGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.05, 32);
        const panMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, wireframe: isWireframe });
        const pan = new THREE.Mesh(panGeo, panMat);
        pan.position.set(xPos, 0.2, 0);
        group.add(pan);
        subParts.push({ mesh: pan, basePos: [xPos, 0.2, 0], dir: [0, -0.6 * (idx ? 1 : -1), 0] });
      });

    } else {
      // Standard Geometric Mesh Generator
      let geometry;
      if (geomType === "cylinder") {
        geometry = new THREE.CylinderGeometry(1.2, 1.2, 2.2, 32);
      } else if (geomType === "cone") {
        geometry = new THREE.ConeGeometry(1.4, 2.4, 32);
      } else if (geomType === "sphere") {
        geometry = new THREE.SphereGeometry(1.4, 32, 32);
      } else if (geomType === "torus") {
        geometry = new THREE.TorusGeometry(1.2, 0.45, 16, 100);
      } else {
        geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
      }

      const material = new THREE.MeshStandardMaterial({
        color: config.color || 0x1565c0,
        roughness: 0.3,
        metalness: 0.2,
        wireframe: isWireframe,
      });

      mainMesh = new THREE.Mesh(geometry, material);
      mainMesh.castShadow = true;
      mainMesh.receiveShadow = true;
      group.add(mainMesh);
    }

    // 6. Real-Time 3D Dimension Bounding Box Helper
    let boxHelper = null;
    if (showDimensions && group) {
      boxHelper = new THREE.BoxHelper(group, 0x38bdf8);
      scene.add(boxHelper);
    }

    // Apply Global Scale Factor
    group.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // 7. Interactive Pointer Drag & Orbit Gestures
    let isDragging = false;
    let previousPointerPos = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      previousPointerPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointerPos.x;
      const deltaY = e.clientY - previousPointerPos.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      previousPointerPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 8. Three.js Animation Render Loop
    let animationFrameId;
    let accumulatedTime = 0;
    const speedMult = simParams.orbitSpeed || 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isAnimPaused) {
        accumulatedTime += 0.015 * animSpeed * speedMult;

        // Auto-rotation when not dragging
        if (!isDragging) {
          group.rotation.y += 0.005 * animSpeed * speedMult;
        }

        // Heartbeat pulsation
        if (pulseMesh) {
          const s = 1.0 + Math.sin(accumulatedTime * 5) * 0.08;
          pulseMesh.scale.set(s, s, s);
        }

        // Moving blood particles / orbits
        extraObjects.forEach((item) => {
          const t = accumulatedTime * item.speed;
          item.mesh.position.set(Math.cos(t) * item.radius, Math.sin(t) * item.radius, Math.sin(t * 2) * 0.3);
        });

        // Exploded View / Polyhedra Deconstruction Animation
        subParts.forEach((part) => {
          const targetOffset = isExploded ? 0.8 : 0;
          part.mesh.position.x = THREE.MathUtils.lerp(part.mesh.position.x, part.basePos[0] + part.dir[0] * targetOffset, 0.08);
          part.mesh.position.y = THREE.MathUtils.lerp(part.mesh.position.y, part.basePos[1] + part.dir[1] * targetOffset, 0.08);
          part.mesh.position.z = THREE.MathUtils.lerp(part.mesh.position.z, part.basePos[2] + part.dir[2] * targetOffset, 0.08);
        });
      }

      // Manual rotation prop override
      if (manualRotation) {
        group.rotation.y = manualRotation;
      }

      if (boxHelper) {
        boxHelper.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      domElem.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
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
    simParams,
    sliceParams,
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
        touchAction: "none",
      }}
    />
  );
}
