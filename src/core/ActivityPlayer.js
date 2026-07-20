import * as THREE from 'three';

/**
 * ActivityPlayer class
 * Interprets JSON activity sheets, coordinates overlays, and executes step transitions.
 * Under Phase 1, it renders high-fidelity placeholder shapes (spheres, boxes, grids)
 * to confirm spatial overlay rendering without fetching full GLB models.
 */
export default class ActivityPlayer {
  constructor(webGLRenderer, activityJson) {
    this.renderer = webGLRenderer;
    this.activity = activityJson;
    
    this.currentStepIndex = 0;
    
    // Track references to active 3D meshes so we can clean/toggle them dynamically
    this.loadedMeshes = {};
    
    // Group containing current step's 3D components, attached to renderer's objectRoot
    this.stepGroup = new THREE.Group();
    this.renderer.objectRoot.add(this.stepGroup);
    
    this.init();
  }

  /**
   * Load JSON assets and build initial placeholders
   */
  init() {
    console.log(`[ActivityPlayer] Launching activity: ${this.activity.title}`);
    
    // Setup Phase 1: Build virtual 3D nodes based on JSON layout
    this.loadPlaceholders();
    
    // Set first step visibility
    this.setStep(0);
  }

  /**
   * Generates beautiful spatial placeholders in place of GLB files
   */
  loadPlaceholders() {
    console.log('[ActivityPlayer] Constructing 3D overlay meshes...');
    
    const assets = this.activity.assets || {};
    
    Object.keys(assets).forEach((key) => {
      // Build different colored meshes based on keys to simulate GLB loading
      let geometry, material;

      if (key.toLowerCase().includes('prism')) {
        // Transparent cyan prism shape
        geometry = new THREE.ConeGeometry(0.2, 0.4, 3);
        material = new THREE.MeshPhysicalMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.7,
          roughness: 0.1,
          transmission: 0.6, // Glass look
          thickness: 0.5
        });
      } else if (key.toLowerCase().includes('ray') || key.toLowerCase().includes('vector')) {
        // Red glow vector arrow
        geometry = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8);
        material = new THREE.MeshBasicMaterial({
          color: 0xef4444
        });
      } else if (key.toLowerCase().includes('lever') || key.toLowerCase().includes('beam')) {
        // Wooden-colored beam bar
        geometry = new THREE.BoxGeometry(0.8, 0.03, 0.06);
        material = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.8
        });
      } else {
        // Default generic purple box sphere
        geometry = new THREE.SphereGeometry(0.12, 16, 16);
        material = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          roughness: 0.4
        });
      }

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      // Store in references
      this.loadedMeshes[key] = mesh;
    });
  }

  /**
   * Advances/reverts to a specific activity step
   * @param {number} stepIndex 
   */
  setStep(stepIndex) {
    if (!this.activity.steps || stepIndex < 0 || stepIndex >= this.activity.steps.length) {
      return;
    }
    
    this.currentStepIndex = stepIndex;
    const stepConfig = this.activity.steps[stepIndex];
    console.log(`[ActivityPlayer] Advancing to step ${stepIndex}: ${stepConfig.instruction}`);

    // Clear active overlays in stepGroup
    while(this.stepGroup.children.length > 0){
      this.stepGroup.remove(this.stepGroup.children[0]);
    }

    // Attach overlays configured for this step
    const overlays = stepConfig.overlays || [];
    overlays.forEach((overlay) => {
      const mesh = this.loadedMeshes[overlay.assetKey];
      if (mesh) {
        // Reset transform values
        mesh.position.set(
          overlay.position?.[0] || 0,
          overlay.position?.[1] || 0,
          overlay.position?.[2] || 0
        );
        
        if (overlay.scale) {
          mesh.scale.set(overlay.scale[0], overlay.scale[1], overlay.scale[2]);
        } else {
          mesh.scale.set(1, 1, 1);
        }

        // Add to active group
        this.stepGroup.add(mesh);
      }
    });
  }

  /**
   * Move to next step
   */
  nextStep() {
    if (this.currentStepIndex < this.activity.steps.length - 1) {
      this.setStep(this.currentStepIndex + 1);
    }
  }

  /**
   * Revert to previous step
   */
  prevStep() {
    if (this.currentStepIndex > 0) {
      this.setStep(this.currentStepIndex - 1);
    }
  }

  /**
   * Handles 3D touch node intersection logic (Phase 1 Stub)
   * @param {THREE.Intersection} intersection 
   */
  handleInteraction(intersection) {
    console.log('[ActivityPlayer] 3D mesh tapped:', intersection.object);
    // Future physics modifications will happen here
  }

  /**
   * Cleans references and removes groups
   */
  destroy() {
    this.renderer.objectRoot.remove(this.stepGroup);
    
    // Dispose loaded local materials/geometries
    Object.values(this.loadedMeshes).forEach((mesh) => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
    
    this.loadedMeshes = {};
    console.log('[ActivityPlayer] Activity dismantled.');
  }
}
