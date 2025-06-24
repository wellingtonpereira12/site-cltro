import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Download from "./pages/Download";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// Componente NavMenu separado para evitar problemas de contexto
function NavMenu() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav-menu">
      <Link to="/">Home</Link>
      <Link to="/criar-conta">Crie sua conta</Link>
      <Link to="/download">Download</Link>

      {user ? (
        <>
          <Link to="/perfil">Perfil</Link>
          <button onClick={logout} className="logout-button">
            Sair
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}

      <a
        href="https://discord.gg/6qX5VEKakP"
        target="_blank"
        rel="noopener noreferrer"
      >
        Discord
      </a>
      <a
        href="https://cltro.gitbook.io/cltro/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wiki
      </a>
    </nav>
  );
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-conta" element={<CreateAccount />} />
        <Route path="/download" element={<Download />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavMenu />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
