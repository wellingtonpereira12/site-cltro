import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="page">
      <h2>Seu Perfil</h2>
      {user ? (
        <>
          <div className="user-info">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>E-mail:</strong> {user.email}</p>
            <p><strong>Data de Criação:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <button onClick={logout} className="button">Sair</button>
        </>
      ) : (
        <p>Você precisa estar logado para ver esta página.</p>
      )}
    </div>
  );
}