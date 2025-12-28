// PerfilPequeño.jsx
import React from "react";
import { Link } from "react-router-dom";
import logout from "../Login/logout"; // 👈 sin {}

const PerfilPequeño = () => {
  return (
    <div className="absolute top-full mt-2 right-0 w-48 bg-[#1c2434] text-white rounded-md shadow-lg z-50">
      <ul className="py-2">
        <li>
          <Link
            to="/perfil"
            className="block px-4 py-2 hover:bg-[#2a334a] cursor-pointer"
          >
            Mi Perfil
          </Link>
        </li>
        <li>
        </li>
        <li
          className="px-4 py-2 hover:bg-[#2a334a] cursor-pointer"
          onClick={logout}
        >
          Cerrar sesión
        </li>
      </ul>
    </div>
  );
};

export default PerfilPequeño;
