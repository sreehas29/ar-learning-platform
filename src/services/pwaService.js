import { useState, useEffect } from "react";
import { activitiesData } from "../utils/activityData";

const CACHE_NAME = "ncert-webar-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
];

// Pre-cache NCERT 3D WebAR Activity Data & Assets in Browser CacheStorage
export async function preCacheWebARAssets() {
  if (!("caches" in window)) return false;

  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS_TO_CACHE);

    // Cache activity datasets in localStorage for offline fallback
    localStorage.setItem("ncert_activities_cache", JSON.stringify(activitiesData));
    return true;
  } catch (err) {
    console.warn("PWA pre-cache warning:", err);
    return false;
  }
}

// React Hook for tracking Live Network Online/Offline Status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check if offline cache is ready
    preCacheWebARAssets().then((res) => setIsCached(res));

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, isCached };
}

// Register PWA Service Worker for Offline Execution
export function registerPwaServiceWorker() {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("PWA SW registered:", reg.scope))
        .catch((err) => console.warn("PWA SW registration error:", err));
    });
  }
}
