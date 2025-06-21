import { Outlet } from "react-router-dom";
import Navbar from "../landing pages/components/Navbar";
import Footer from "../landing pages/components/Footer";

function LandingPageLayout() {
  return (
    <div className="bg-white min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-grow overflow-hidden">
        <Outlet />
      </main>
      <div className="overflow-hidden">
        <Footer />
      </div>
    </div>
  );
}

export default LandingPageLayout;
