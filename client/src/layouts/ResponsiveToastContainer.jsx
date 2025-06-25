import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function ResponsiveToastContainer() {
  const [position, setPosition] = useState("top-right");

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 640) {
        // Small screen (mobile)
        setPosition("bottom-center");
      } else {
        // Desktop/tablet
        setPosition("top-right");
      }
    };

    updatePosition(); // set on mount
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return <ToastContainer position={position} autoClose={3000} />;
}
