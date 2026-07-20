import * as THREE from 'three';

/**
 * Core Three.js WebGL rendering layer.
 * Manages canvas initialization, light, shadow setup, rendering loops, and memory disposes.
 */
export default class WebGLRenderer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationFrameId = null;
    
    // Unified anchor group representing the tracked physical object in 3D space
    this.objectRoot = new THREE.Group();
    
    // Callbacks to drive custom animations in the current activity
    this.updateCallbacks = [];
    
    this.init();
  }

  /**
   * Initializes the Three.js canvas workspace
   */
  init() {
    console.log('[WebGLRenderer] Initializing Three.js context...');
    
    // 1. Create Scene
    this.scene = new THREE.Scene();
    
    // Add our root anchor node
    this.scene.add(this.objectRoot);

    // 2. Camera Setup (matching standard phone camera fields-of-view ~40-50 degrees)
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 0); // Position at camera origins, look forwards

    // 3. WebGLRenderer with transparency and anti-aliasing
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(2, 4, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);

    // Build standard grid helper for physical context reference (Phase 1)
    const gridHelper = new THREE.GridHelper(10, 10, 0x8b5cf6, 0x3f3f46);
    gridHelper.position.y = -1; // Sit below camera
    this.scene.add(gridHelper);

    // Bind Resize Listener
    window.addEventListener('resize', this.onResize.bind(this));
    
    // Start rendering frame loop
    this.tick();
  }

  /**
   * Main ticks/update loop
   */
  tick() {
    this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
    
    const deltaTime = 0.016; // Approx 60 FPS delta
    
    // Execute activity-specific update loops
    this.updateCallbacks.forEach((cb) => {
      try {
        cb(deltaTime);
      } catch (err) {
        console.error('[WebGLRenderer] Frame tick error:', err);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Resizes renderer boundaries
   */
  onResize() {
    if (!this.canvas || !this.renderer) return;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height, false);
  }

  /**
   * Updates the spatial orientation of the object root
   * @param {object} pose { position: [x,y,z], rotation: [rx, ry, rz] }
   */
  updateObjectRootPose(pose) {
    if (!pose || !this.objectRoot) return;

    // Direct offset mapping
    this.objectRoot.position.set(pose.position[0], pose.position[1], pose.position[2]);
    
    // Translate degrees to radians
    this.objectRoot.rotation.set(
      THREE.MathUtils.degToRad(pose.rotation[0]),
      THREE.MathUtils.degToRad(pose.rotation[1]),
      THREE.MathUtils.degToRad(pose.rotation[2])
    );
  }

  /**
   * Registers a custom activity loop tick handler
   * @param {Function} callback 
   */
  registerUpdateCallback(callback) {
    this.updateCallbacks.push(callback);
  }

  /**
   * Unregisters an update tick handler
   * @param {Function} callback 
   */
  removeUpdateCallback(callback) {
    this.updateCallbacks = this.updateCallbacks.filter(cb => cb !== callback);
  }

  /**
   * Recursively clean up geometries, textures, materials to prevent memory leaks in WebGL
   * @param {THREE.Object3D} object 
   */
  cleanObject(object) {
    object.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });
  }

  /**
   * Dismantles context
   */
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    window.removeEventListener('resize', this.onResize);
    
    // Clean root elements
    this.cleanObject(this.scene);
    
    this.renderer.dispose();
    console.log('[WebGLRenderer] Three.js context destroyed.');
  }
}
