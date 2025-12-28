// logout.js
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth"; // importa tu configuración de Firebase

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada correctamente");
    // Opcional: redirigir al login
    window.location.href = "/auth"; // ajusta la ruta según tu proyecto
  } catch (error) {
    console.error("Error al cerrar sesión: ", error);
  }
};

export default logout; 
