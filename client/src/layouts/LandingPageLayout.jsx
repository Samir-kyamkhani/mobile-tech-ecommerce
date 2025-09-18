import { Outlet } from "react-router-dom";
import Navbar from "../landingPages/components/Navbar";
import Footer from "../landingPages/components/Footer";

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
