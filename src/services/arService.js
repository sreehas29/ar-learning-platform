export async function checkWebXRSupport() {
  if (typeof window === "undefined" || !navigator) {
    return { supported: false, mode: "Unsupported" };
  }

  if (navigator.xr) {
    try {
      const isArSupported = await navigator.xr.isSessionSupported("immersive-ar");
      if (isArSupported) {
        return { supported: true, mode: "Immersive WebXR AR" };
      }
    } catch (e) {
      console.warn("WebXR Session check error:", e);
    }
  }

  return { supported: false, mode: "Fallback 3D WebGL Camera Mode" };
}

export async function checkCameraAvailability() {
  if (typeof window === "undefined" || !navigator.mediaDevices) {
    return { available: false, label: "Camera API unavailable" };
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((d) => d.kind === "videoinput");
    return {
      available: videoDevices.length > 0,
      count: videoDevices.length,
      label: videoDevices.length > 0 ? `${videoDevices.length} Camera(s) Detected` : "No video cameras found",
    };
  } catch (err) {
    return { available: false, label: "Permission required for camera detection" };
  }
}

export function exportCanvasSnapshot(fileName = "ar-learning-snapshot.png") {
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    console.warn("No WebGL canvas element found for snapshot export.");
    return false;
  }

  try {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.error("Canvas snapshot error:", err);
    return false;
  }
}
