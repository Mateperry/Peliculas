import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import {
  Home,
  Film,
  ChevronDown,
  Clapperboard,
  Popcorn
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈 nuevo


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.trim() !== "") {
    navigate(`/buscar/${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setMenuOpen(false); // cierra menú móvil si está abierto
  }
};
 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  return (
    <>
      {/* Header principal */}
      <header className="fixed left-1/2 top-5 transform -translate-x-1/2 z-20 w-[90%] xl:w-[80%] bg-transparent backdrop-blur-md p-4 rounded-full shadow-md flex items-center justify-between text-white">
        

        {/* Botón menú en móvil */}
        {isMobile ? (
          <button className="text-3xl" onClick={() => setMenuOpen(true)}>
            <FiMenu />
          </button>
        ) : (
          <nav className="hidden xl:flex items-center gap-6 text-lg font-medium text-[#023E8A]">
            <Link to="/" className="flex items-center gap-2 hover:text-yellow-400">
              <Home size={20} />
              
              Inicio
            </Link>
            <Link to="/nuevas" className="flex items-center gap-2 hover:text-yellow-400">
              <Popcorn size={20} />
              Nuevas
            </Link>
            <Link to="/Clasicas" className="flex items-center gap-2 hover:text-yellow-400">
              <Clapperboard size={20} />
              Clásicas
            </Link>
            <Link to="/Animadas" className="flex items-center gap-2 hover:text-yellow-400">
              <Clapperboard size={20} />
              Animadas
            </Link>

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:text-yellow-400"
              >
                <Film size={20} />
                Otras
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2  bg-[#3A77BF] rounded-md shadow-md w-48 z-50 text-[#FFFFFF] ">
                  <Link to="/terror" className=" px-4 py-2 hover:bg-yellow-100 flex items-center gap-2">
                    <Clapperboard size={18} />
                    Terror
                  </Link>
                  <Link to="/romance" className=" px-4 py-2 hover:bg-yellow-100 flex items-center gap-2">
                    <Film size={18} />
                    Romance
                  </Link>
                  <Link to="/documentales" className=" px-4 py-2 hover:bg-yellow-100 flex items-center gap-2">
                    <Clapperboard size={18} />
                    Documentales
                  </Link>

                </div>
              )}
            </div>

            {/* Botón búsqueda */}
            <button
             
              className="ml-2 hover:text-yellow-400"
            >
              <FiSearch size={22} />
            </button>

            
              <form onSubmit={handleSearch} className="flex items-center ml-1 bg-white rounded-md overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar películas..."
                  className="px-2 py-1 text-sm text-black w-64 focus:outline-none"
                />
                <button type="submit" className="bg-[#002631] px-3 py-1 text-white hover:bg-yellow-500 transition">
                  Buscar
                </button>
              </form>
            
          </nav>
        )}
      </header>

      {/* Menú lateral mobile */}
      {isMobile && (
        <>
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-[9998] transition-opacity duration-300 ${
              menuOpen ? "block" : "hidden"
            }`}
            onClick={() => setMenuOpen(false)}
          ></div>

          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-[9999] transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button className="absolute top-4 right-4 text-3xl" onClick={() => setMenuOpen(false)}>
              <FiX />
            </button>

            <nav className="mt-16 px-6">
              <ul className="flex flex-col space-y-4 text-lg font-medium">
                <li>
                  <Link to="/" className="flex items-center gap-2 py-2">
                    <Home size={20} />
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/nuevas" className="flex items-center gap-2 py-2">
                    <Popcorn size={20} />
                    Nuevas
                  </Link>
                </li>
                <li>
                  <Link to="/Clasicas" className="flex items-center gap-2 py-2">
                    <Clapperboard size={20} />
                    Clásicas
                  </Link>
                </li>
                <li>
                  <Link to="/Animadas" className="flex items-center gap-2 py-2">
                    <Clapperboard size={20} />
                    Animadas
                  </Link>
                </li>
                <li>
                  <Link to="/terror" className="flex items-center gap-2 py-2">
                    <Clapperboard size={20} />
                    Terror
                  </Link>
                </li>
                <li>
                  <Link to="/romance" className="flex items-center gap-2 py-2">
                    <Film size={20} />
                    Romance
                  </Link>
                </li>
                <li>
                  <Link to="/documentales" className="flex items-center gap-2 py-2">
                    <Popcorn size={20} />
                    Documentales
                  </Link>
                </li>
                <li>

                </li>
              </ul>

              {/* Buscar en mobile */}
              <form onSubmit={handleSearch} className="mt-6 bg-white rounded-md overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar películas..."
                  className="px-3 py-2 text-sm text-black w-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#002631] px-3 py-2 text-white hover:bg-yellow-500 transition"
                >
                  Buscar
                </button>
              </form>
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;
