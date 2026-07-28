import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as THREE from "three";

export default function ARSceneCanvas({
  activity,
  isWireframe = false,
  manualRotation = 0,
  scaleFactor = 1,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x22c55e, 1, 10);
    pointLight.position.set(-5, -5, -2);
    scene.add(pointLight);

    // 4. Create Dynamic 3D Mesh based on Activity
    const group = new THREE.Group();
    scene.add(group);

    let mainMesh;
    let extraObjects = [];

    const activityId = activity?.id || "";
    const subject = activity?.subject || "math";

    if (subject === "math" || activityId.includes("math")) {
      // 3D Polyhedron / Geometry
      const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const material = new THREE.MeshStandardMaterial({
        color: 0x1565c0,
        roughness: 0.3,
        metalness: 0.2,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(geometry, material);
      group.add(mainMesh);

      // Outer Wireframe Box Frame
      const wireGeo = new THREE.WireframeGeometry(geometry);
      const wireMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
      const wireframeLines = new THREE.LineSegments(wireGeo, wireMat);
      wireframeLines.scale.set(1.05, 1.05, 1.05);
      group.add(wireframeLines);
      extraObjects.push(wireframeLines);
    } else if (activityId.includes("sci-6-1") || activityId.includes("astronomy")) {
      // Solar System Planet + Moon
      const planetGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.4,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(planetGeo, planetMat);
      group.add(mainMesh);

      // Planet Ring
      const ringGeo = new THREE.RingGeometry(1.5, 2.0, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        wireframe: isWireframe,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.5;
      group.add(ringMesh);

      // Orbiting Moon
      const moonGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.set(2.2, 0, 0);
      group.add(moonMesh);
      extraObjects.push(moonMesh);
    } else if (activityId.includes("sci-9-1") || activityId.includes("atomic")) {
      // Bohr Atomic Model Nucleus + Electrons
      const nucleusGeo = new THREE.SphereGeometry(0.7, 32, 32);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.2,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
      group.add(mainMesh);

      // Electron Orbit Rings
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.6 + i * 0.4, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = (Math.PI / 3) * i;
        ringMesh.rotation.y = (Math.PI / 4) * i;
        group.add(ringMesh);

        // Electron Sphere
        const electronGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const electronMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
        const electronMesh = new THREE.Mesh(electronGeo, electronMat);
        electronMesh.position.set(1.6 + i * 0.4, 0, 0);
        group.add(electronMesh);
        extraObjects.push({ mesh: electronMesh, radius: 1.6 + i * 0.4, speed: 1.5 + i * 0.5, axis: i });
      }
    } else {
      // General Science / Cell / Default Mesh (Icosahedron)
      const geometry = new THREE.IcosahedronGeometry(1.3, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        roughness: 0.3,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(geometry, material);
      group.add(mainMesh);
    }

    // 5. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Constant gentle auto rotation
      group.rotation.y = elapsedTime * 0.5 + (manualRotation * Math.PI) / 180;
      group.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2;
      group.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Animate extra objects (e.g. electrons/moons)
      extraObjects.forEach((obj) => {
        if (obj.radius) {
          const angle = elapsedTime * obj.speed;
          obj.mesh.position.x = Math.cos(angle) * obj.radius;
          obj.mesh.position.z = Math.sin(angle) * obj.radius;
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // 6. Handle Window Resize
    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activity, isWireframe, manualRotation, scaleFactor]);

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
        pointerEvents: "none",
      }}
    />
  );
}
