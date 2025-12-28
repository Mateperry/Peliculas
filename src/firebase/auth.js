import { getAuth, GoogleAuthProvider } from "firebase/auth";
import app from "./config";

// Inicializar Auth
const auth = getAuth(app);

// Proveedor de Google
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
