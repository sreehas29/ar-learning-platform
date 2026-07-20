/**
 * Abstract TrackingManager class
 * Handles camera acquisition, MindAR library loading, targets parsing, and event-based pose resolution.
 * Under Phase 1, it implements a mock tracking update loop to verify coordination without active camera dependencies.
 */
export default class TrackingManager {
  constructor(videoElement, canvasElement, activityConfig) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.config = activityConfig;
    this.mindARController = null;
    this.listeners = [];
    this.isTracking = false;
    this.simulatedTrackingInterval = null;
  }

  /**
   * Initializes the camera permissions and loads MindAR configurations
   * @returns {Promise<boolean>} Success of initialization
   */
  async init() {
    console.log('[TrackingManager] Initializing camera streams & loading compiled targets...');
    if (!this.config || !this.config.mindFile) {
      console.warn('[TrackingManager] No MindAR target config found.');
      return false;
    }
    // Simulate async WASM compiler loading
    await new Promise((resolve) => setTimeout(resolve, 800));
    return true;
  }

  /**
   * Starts tracking image targets
   */
  start() {
    if (this.isTracking) return;
    this.isTracking = true;
    console.log('[TrackingManager] MindAR tracking loop started.');

    // Phase 1 Mock tracking generator:
    // Periodically reports target visibility and dummy positions
    this.simulatedTrackingInterval = setInterval(() => {
      if (!this.isTracking) return;

      // Select a target from the config to simulate detection
      if (this.config && this.config.targets && this.config.targets.length > 0) {
        const targetIndex = 0; // Simulate detecting the first target
        const simulatedPose = {
          position: [
            Math.sin(Date.now() / 1000) * 0.05, // Subtle hover
            0,
            -0.5 // 50cm in front of camera
          ],
          rotation: [
            0,
            Math.sin(Date.now() / 1500) * 10, // Subtle tilt
            0
          ],
          scale: [1, 1, 1]
        };

        const resolvedPose = this.resolvePose(targetIndex, simulatedPose);
        this.notifyListeners({
          targetIndex,
          visible: true,
          pose: resolvedPose
        });
      }
    }, 1000 / 30); // 30 FPS updates
  }

  /**
   * Stops tracking loops and camera stream
   */
  stop() {
    this.isTracking = false;
    if (this.simulatedTrackingInterval) {
      clearInterval(this.simulatedTrackingInterval);
      this.simulatedTrackingInterval = null;
    }
    console.log('[TrackingManager] MindAR tracking loop stopped.');
  }

  /**
   * Registers a pose update listener
   * @param {Function} callback 
   */
  onPoseUpdate(callback) {
    this.listeners.push(callback);
  }

  /**
   * Unregisters a pose update listener
   * @param {Function} callback 
   */
  removePoseListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  /**
   * Internal dispatcher for listeners
   */
  notifyListeners(data) {
    this.listeners.forEach((listener) => {
      try {
        listener(data);
      } catch (err) {
        console.error('[TrackingManager] Listener error:', err);
      }
    });
  }

  /**
   * Resolves the coordinate system. Translates raw marker camera pose to unified object origin.
   * Applying: T_object = T_marker_pose * (T_marker_offset_in_object)^-1
   * @param {number} targetIndex 
   * @param {object} rawPose 
   * @returns {object} Resolved coordinate pose
   */
  resolvePose(targetIndex, rawPose) {
    const targetConfig = this.config?.targets?.find(t => t.targetIndex === targetIndex);
    if (!targetConfig) return rawPose;

    const offset = targetConfig.relativeOffset || { position: [0,0,0], rotation: [0,0,0] };

    // Basic vector offset translation for Phase 1 visualization
    return {
      position: [
        rawPose.position[0] - (offset.position[0] || 0),
        rawPose.position[1] - (offset.position[1] || 0),
        rawPose.position[2] - (offset.position[2] || 0)
      ],
      rotation: [
        rawPose.rotation[0] - (offset.rotation[0] || 0),
        rawPose.rotation[1] - (offset.rotation[1] || 0),
        rawPose.rotation[2] - (offset.rotation[2] || 0)
      ],
      scale: rawPose.scale
    };
  }
}
