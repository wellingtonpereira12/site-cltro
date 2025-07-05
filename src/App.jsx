import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Download from "./pages/Download";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import BannerPage from "./pages/banner";
import Navbar from "./interface/Navbar";

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
        <Route path="/banner" element={<BannerPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
