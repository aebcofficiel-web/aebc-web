// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* key={location.pathname} force le remount → relance l’animation */}
        <div key={location.pathname} className="page-fade">
          <Outlet />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
