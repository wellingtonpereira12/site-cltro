import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav-menu text-[10px] min-[425px]:text-[12px] min-[500px]:text-[14px] min-[640px]:text-[16px] flex gap-2 min-[375px]:gap-3 min-[425px]:gap-4 min-[640px]:gap-8 text-center">
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
