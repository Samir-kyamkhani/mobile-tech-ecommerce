import { useEffect, useState } from "react";

export function useIndiConnectSDK() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSDK = () => {
      if (window.MyPG) {
        setLoaded(true);
        return true;
      }
      return false;
    };

    // Already loaded
    if (checkSDK()) return;

    const script = document.createElement("script");
    script.src = import.meta.env.VITE_INDICONNECT_SDK_URL;
    script.async = true;

    script.onload = () => {
      const interval = setInterval(() => {
        if (checkSDK()) clearInterval(interval);
      }, 200);
    };

    script.onerror = () => {
      console.error("[IndiConnect SDK] SDK load FAILED");
      setError("Failed to load IndiConnect SDK");
    };

    document.body.appendChild(script);
  }, []);

  return { loaded, error };
}
