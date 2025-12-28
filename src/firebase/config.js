// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjnVKe-E8VrIhiLK_ugnt78jrgtU1FwB0",
  authDomain: "proyectopeliculas-fc407.firebaseapp.com",
  projectId: "proyectopeliculas-fc407",
  storageBucket: "proyectopeliculas-fc407.appspot.com",
  messagingSenderId: "287388405743",
  appId: "1:287388405743:web:771baacc359082ffe2f01a",
  measurementId: "G-MZ6TWY33C8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Exporta app para poder usarlo en auth.js
export default app;
