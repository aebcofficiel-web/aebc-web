// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
// Importation du composant SocialLinks (ajustez le chemin selon votre structure de dossiers)
import SocialLinks from '../sections/SocialLinks' 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/organisation', label: 'Organisation' },
    { path: '/projets', label: 'Projets' },
    { path: '/publications', label: 'Publications' },
    { path: '/actualites', label: 'Actualités' },
    { path: '/galerie', label: 'Galerie' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-3 flex items-center justify-between">
        
        {/* Logo - shrink-0 empêche le logo de se faire écraser si l'espace manque */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <img
            src="https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/lg-G-aebc-02.png"
            alt="AEBC Logo"
            className="h-[55px] w-auto object-contain shrink-0"
            style={{ minWidth: '55px' }} // Évite que la largeur tombe à 0px au chargement initial
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-dark hover:text-primary transition ${
                  isActive ? 'text-primary font-semibold border-b-2 border-primary' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Bouton Faire un don */}
          <Link
            to="/don"
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition shrink-0"
          >
            Faire un don
          </Link>
        </div>

        {/* Mobile button */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t py-4 px-4 flex flex-col space-y-3">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 ${
                  isActive ? 'text-primary font-semibold' : 'text-dark'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Bouton Faire un don (mobile) */}
          <Link
            to="/don"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition"
          >
            Faire un don
          </Link>

          {/* Intégration de SocialLinks en bas du menu mobile */}
          <div className="pt-4 border-t border-gray-100 flex justify-center">
            <SocialLinks />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar