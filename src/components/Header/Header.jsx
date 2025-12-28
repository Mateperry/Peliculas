import { useState, useEffect, useRef } from "react"; 
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X, ChevronDown } from "lucide-react";
import SearchSuggestions from "./SearchSuggestions";
import PerfilPequeño from "../../Sections/Users/Perfilpequeño";
import { auth } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [otrasOpen, setOtrasOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [perfilOpen, setPerfilOpen] = useState(false);

  const navigate = useNavigate();
  const otrasRef = useRef(null);
  const searchRef = useRef(null);

  // Manejar autenticación real
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Manejar resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click fuera menú "Otras"
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (otrasRef.current && !otrasRef.current.contains(e.target)) {
        setOtrasOpen(false);
      }
    };
    if (otrasOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [otrasOpen]);

  // Click fuera de sugerencias
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    if (showSuggestions) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSuggestions]);

  const toggleMenu = () => {
    if (isMobile) setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/buscar/${encodeURIComponent(q)}`);
    setSearchQuery("");
    setMenuOpen(false);
    setShowSuggestions(false);
  };

  return (
    <>
      <header className="w-full bg-[#0e1726] text-white shadow-md">
        <div className="flex items-center justify-between px-4 py-5 md:px-6 gap-3">
          {/* IZQUIERDA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="md:hidden text-gray-300 hover:text-indigo-400 transition"
              onClick={toggleMenu}
              aria-label="Abrir menú"
            >
              <Menu className="w-7 h-7" />
            </button>

            <NavLink to="/" className="flex items-center gap-2">
              <svg
                className="w-7 h-7 text-indigo-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L15.09 8H24L17.45 12.97L20.54 21L12 16.02L3.46 21L6.55 12.97L0 8H8.91L12 0Z" />
              </svg>
              <span className="font-semibold text-2xl hidden md:inline">StreamNow</span>
            </NavLink>
          </div>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 text-xl font-medium text-gray-300 relative">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative transition hover:text-indigo-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-indigo-400 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "text-indigo-400 after:scale-x-100" : ""}`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/nuevas"
              className={({ isActive }) =>
                `relative transition hover:text-indigo-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-indigo-400 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "text-indigo-400 after:scale-x-100" : ""}`
              }
            >
              Nuevas
            </NavLink>
            <NavLink
              to="/animadas"
              className={({ isActive }) =>
                `relative transition hover:text-indigo-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-indigo-400 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "text-indigo-400 after:scale-x-100" : ""}`
              }
            >
              Animadas
            </NavLink>

            {/* Menú Otras */}
            <div className="relative" ref={otrasRef}>
              <button
                onClick={() => setOtrasOpen(!otrasOpen)}
                className="flex items-center gap-1 hover:text-indigo-400 transition"
              >
                Otras <ChevronDown className="w-4 h-4" />
              </button>
              {otrasOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[#1c2434] rounded-md shadow-lg py-2 w-40 z-50">
                  <NavLink
                    to="/terror"
                    className="block px-4 py-2 hover:bg-[#2a334a] transition"
                    onClick={() => setOtrasOpen(false)}
                  >
                    Terror
                  </NavLink>
                  <NavLink
                    to="/romance"
                    className="block px-4 py-2 hover:bg-[#2a334a] transition"
                    onClick={() => setOtrasOpen(false)}
                  >
                    Romance
                  </NavLink>
                  <NavLink
                    to="/clasicas"
                    className="block px-4 py-2 hover:bg-[#2a334a] transition"
                    onClick={() => setOtrasOpen(false)}
                  >
                    Clásicas
                  </NavLink>
                  <NavLink
                    to="/documentales"
                    className="block px-4 py-2 hover:bg-[#2a334a] transition"
                    onClick={() => setOtrasOpen(false)}
                  >
                    Documentales
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/descubre"
              className={({ isActive }) =>
                `relative transition hover:text-indigo-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-indigo-400 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? "text-indigo-400 after:scale-x-100" : ""}`
              }
            >
              Descubre qué ver
            </NavLink>
          </nav>

          {/* SEARCH */}
          <div ref={searchRef} className="relative flex-1 max-w-xs md:max-w-[12rem]">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-[#1c2434] rounded-md px-3 py-1 w-full"
            >
              <Search className="text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.trim().length > 0);
                }}
                placeholder="Buscar"
                className="bg-transparent outline-none text-sm text-gray-200 ml-2 w-full"
              />
            </form>
            {showSuggestions && (
              <SearchSuggestions
                query={searchQuery}
                onSelect={(q) => {
                  setSearchQuery(q);
                  setShowSuggestions(false);
                  navigate(`/buscar/${encodeURIComponent(q)}`);
                }}
              />
            )}
          </div>

          {/* DERECHA */}
          <div className="flex items-center gap-3 flex-shrink-0 relative">
            {isAuthenticated ? (
              <>
                <button
                  className="text-gray-400 hover:text-indigo-400 transition"
                  aria-label="Notificaciones"
                >
                  <Bell className="w-6 h-6" />
                </button>

                <img
                  src="https://i.pravatar.cc/40"
                  alt="Perfil"
                  className="w-9 h-9 rounded-full border-2 border-gray-700 cursor-pointer"
                  onClick={() => setPerfilOpen(!perfilOpen)}
                />

                {perfilOpen && <PerfilPequeño onClose={() => setPerfilOpen(false)} />}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/auth"
                  className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 transition text-sm font-medium"
                >
                  Iniciar sesión
                </NavLink>
                <NavLink
                  to="/auth"
                  className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 transition text-sm font-medium"
                >
                  Registrarse
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {isMobile && menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* DRAWER MÓVIL */}
      {isMobile && (
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-[#0e1726] text-white shadow-lg z-50 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!menuOpen}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-indigo-400"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X className="w-7 h-7" />
          </button>

          <nav className="mt-16 px-6">
            <ul className="flex flex-col space-y-5 text-lg font-medium">
              {["/", "/nuevas", "/animadas", "/terror", "/romance", "/clasicas", "/documentales", "/descubre"].map(
                (path) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `hover:text-indigo-400 ${isActive ? "text-indigo-400" : ""}`
                      }
                    >
                      {path === "/" ? "Inicio" :
                       path === "/nuevas" ? "Nuevas" :
                       path === "/animadas" ? "Animadas" :
                       path === "/terror" ? "Terror" :
                       path === "/romance" ? "Romance" :
                       path === "/clasicas" ? "Clásicas" :
                       path === "/documentales" ? "Documentales" :
                       "Descubre qué ver"}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Header;
