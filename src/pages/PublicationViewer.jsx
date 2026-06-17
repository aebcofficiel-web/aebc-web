// src/pages/PublicationViewer.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PublicationViewer = () => {
  const { id } = useParams(); // Ici id contient l'URL encodée du PDF
  const navigate = useNavigate();
  const fileUrl = decodeURIComponent(id);

  return (
    <div className="fixed inset-0 bg-gray-900 z-[9999] flex flex-col">
      {/* BARRE DE CONTRÔLE SUPÉRIEURE */}
      <div className="bg-white p-4 flex justify-between items-center shadow-lg">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-primary font-bold transition"
        >
          <span className="text-xl">←</span> Retour à la bibliothèque
        </button>
        
        <div className="text-sm font-medium text-gray-500 hidden md:block">
          Visionneuse de documents AEBC
        </div>
      </div>

      {/* ZONE DE LECTURE DU PDF */}
      <div className="flex-grow bg-gray-800">
        <iframe
          src={`${fileUrl}#toolbar=1&navpanes=0`}
          title="Lecteur PDF"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};

export default PublicationViewer;