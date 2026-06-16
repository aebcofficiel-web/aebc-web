// src/components/layout/ScrollToTop.jsx
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react"; // Importation d'une icône plus pro

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      className={`
        fixed bottom-8 right-8 p-3 rounded-full shadow-2xl z-[9999]
        transition-all duration-300 transform
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        bg-primary hover:bg-secondary text-white hover:scale-110 active:scale-95
      `}
      aria-label="Retour en haut"
    >
      <ChevronUp size={28} />
    </button>
  );
}