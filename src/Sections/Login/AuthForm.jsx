import { useState, useEffect } from "react";
import { auth, googleProvider } from "../../firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_API_URL;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [posters, setPosters] = useState([]);

  const [popup, setPopup] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  // Traer posters
  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const resMovies = await fetch(
          `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=es-ES&page=1`
        );
        const resSeries = await fetch(
          `${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=es-ES&page=1`
        );

        const moviesData = await resMovies.json();
        const seriesData = await resSeries.json();

        const combined = [...moviesData.results, ...seriesData.results]
          .sort(() => 0.5 - Math.random())
          .slice(0, 21);

        setPosters(
          combined.map((item) => `https://image.tmdb.org/t/p/w500${item.poster_path}`)
        );
      } catch (error) {
        console.error("Error cargando posters:", error);
      }
    };
    fetchPosters();
  }, []);

  // Mostrar popup
  const showPopup = (message) => {
    setPopup({ show: true, message });

    // Cierre automático después de 3 segundos
    setTimeout(() => {
      setPopup({ show: false, message: "" });
      navigate("/");
    }, 3000);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showPopup("Las contraseñas no coinciden");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showPopup("¡Gracias! Registro exitoso");
    } catch (error) {
      showPopup(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showPopup("¡Bienvenido! Login exitoso");
    } catch (error) {
      showPopup(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      showPopup("¡Bienvenido! Login con Google exitoso");
    } catch (error) {
      showPopup(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? handleLogin() : handleRegister();
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black">
      {/* Fondo en grid responsive */}
      <div className="absolute inset-0 grid grid-rows-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 p-5 opacity-[0.39] z-0 overflow-hidden">
        {posters.map((poster, index) => (
          <img
            key={index}
            src={poster}
            alt="poster"
            className="w-full h-full object-cover rounded-md"
          />
        ))}
      </div>

      {/* Caja de login */}
      <div className="relative z-10 bg-black/85 p-8 sm:p-12 rounded-xl w-full max-w-md text-center shadow-xl text-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
          Encuentra lo mejor para ver hoy
        </h1>
        <p className="text-white/90 mb-6 text-sm sm:text-base">
          La mejor forma de descubrir tus películas y series favoritas
        </p>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-white font-medium border-b-2 pb-1 ${
              isLogin ? "border-red-600 font-bold" : "border-transparent"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-white font-medium border-b-2 pb-1 ${
              !isLogin ? "border-red-600 font-bold" : "border-transparent"
            }`}
          >
            Registro
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-md border-none focus:outline-none text-black"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-md border-none focus:outline-none text-black"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md border-none focus:outline-none text-black"
            />
          )}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 rounded-md text-white font-bold hover:bg-red-700 transition"
          >
            {isLogin ? "Iniciar Sesión" : "Registrar"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 py-3 bg-blue-600 rounded-md text-white font-bold hover:bg-blue-700 transition"
        >
          Iniciar sesión con Google
        </button>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center shadow-xl animate-scaleUp">
            <h2 className="text-lg font-bold mb-4 text-gray-800">{popup.message}</h2>
            <button
              onClick={() => {
                setPopup({ show: false, message: "" });
                navigate("/");
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Animación del modal */}
      <style>
        {`
          @keyframes scaleUp {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scaleUp {
            animation: scaleUp 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default AuthForm;
