import { useState } from "react";
import { auth } from "../../firebase/auth"; // tu config de Firebase
import { signOut } from "firebase/auth";

const PerfilUsuario = () => {
  const user = auth.currentUser; // usuario logueado
  const [editando, setEditando] = useState(false);
  const [peliculasFav, setPeliculasFav] = useState([
    "Inception",
    "The Dark Knight",
    "Interstellar",
  ]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg space-y-6">
      {/* Encabezado */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          👋 Hola, {user?.displayName || "Usuario"}
        </h1>
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="foto perfil"
            className="w-24 h-24 mx-auto mt-4 rounded-full border-4 border-indigo-500"
          />
        )}
      </div>

      {/* Información básica */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">📌 Información personal</h2>
        <p><strong>Nombre:</strong> {user?.displayName || "No configurado"}</p>
        <p><strong>Correo:</strong> {user?.email}</p>
        <p><strong>UID:</strong> {user?.uid}</p>
        <button
          className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          onClick={() => setEditando(!editando)}
        >
          {editando ? "Cancelar edición" : "Editar información"}
        </button>
        {editando && (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Nuevo nombre"
              className="w-full p-2 rounded bg-gray-700"
            />
            <input
              type="email"
              placeholder="Nuevo correo"
              className="w-full p-2 rounded bg-gray-700"
            />
            <button className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700">
              Guardar cambios
            </button>
          </div>
        )}
      </div>

      {/* Películas favoritas */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">🎬 Tus películas favoritas</h2>
        <ul className="list-disc pl-6 space-y-1">
          {peliculasFav.map((pelicula, index) => (
            <li key={index}>{pelicula}</li>
          ))}
        </ul>
        <div className="mt-3 space-y-2">
          <input
            type="text"
            placeholder="Agregar nueva película"
            className="w-full p-2 rounded bg-gray-700"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                setPeliculasFav([...peliculasFav, e.target.value]);
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>

      {/* Acciones */}
      <div className="flex justify-between">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Cerrar sesión
        </button>
        <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg">
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
};

export default PerfilUsuario;
