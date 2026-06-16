import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

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
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/img-AEBC-logo_rogna-01.png"
            alt="AEBC Logo"
            className="h-[55px] w-auto"
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
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition"
          >
            Faire un don
          </Link>
        </div>

        {/* Mobile button */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
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
        </div>
      )}
    </nav>
  )
}

export default Navbar
