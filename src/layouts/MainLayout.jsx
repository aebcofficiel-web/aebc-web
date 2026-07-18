// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";

const MainLayout = () => {
  const location = useLocation();

  return (
    // Application de l'arrière-plan de base sombre (#0b241a) et du texte blanc cassé sur tout le site
    <div className="min-h-screen flex flex-col dark:bg-[#0b241a] text-dark dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow">
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