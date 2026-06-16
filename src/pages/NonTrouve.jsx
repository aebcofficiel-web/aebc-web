// src_new/pages/NonTrouve.jsx
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NonTrouve() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl mt-4">Page non trouvée</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2 mt-6">
          <Home size={18} /> Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}
