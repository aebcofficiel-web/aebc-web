import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/layout/ScrollToTop"; 
import ScrollToTopOnNavigation from "./components/utils/ScrollToTopOnNavigation";

// Pages
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";
import Organisation from "./pages/Organisation";
import Actualites from "./pages/Actualites";
import ActualiteDetail from "./pages/ActualiteDetail";
import Projets from "./pages/Projets";
import Galerie from "./pages/Galerie";
import Publications from "./pages/Publications";
import PublicationViewer from "./pages/PublicationViewer";
import Contact from "./pages/Contact";
import NonTrouve from "./pages/NonTrouve";
import Don from "./pages/Don";
import DonMTN from "./pages/DonMTN";
import DonAirtel from "./pages/DonAirtel";
import DevenirBenevole from "./pages/DevenirBenevole";
import DevenirPartenaire from "./pages/DevenirPartenaire";
import NotreMission from "./pages/NotreMission";

function App() {
  return (
    <Router>
      {/* Logique : Remonte en haut de page lors d'un changement de route */}
      <ScrollToTopOnNavigation />
      
      {/* UI : Bouton flottant "Retour en haut" */}
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/organisation" element={<Organisation />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/actualites/:id" element={<ActualiteDetail />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publication/view/:id" element={<PublicationViewer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/don" element={<Don />} />
          <Route path="/don-mtn" element={<DonMTN />} />
          <Route path="/don-airtel" element={<DonAirtel />} />
          <Route path="/benevolat" element={<DevenirBenevole />} />
          <Route path="/partenaires" element={<DevenirPartenaire />} />
          <Route path="/notre-mission" element={<NotreMission />} />
        </Route>

        <Route path="*" element={<NonTrouve />} />
      </Routes>
    </Router>
  );
}

export default App;