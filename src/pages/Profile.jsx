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
            <div className="user-info">
              <p><strong>Pontos de Voto:</strong>  {user.pontos}</p>
              <button onClick={logout} >Votar</button>
            </div>    
          </div>
          <button onClick={logout} className="button">Sair</button>
        </>
      ) : (
        <p>Você precisa estar logado para ver esta página.</p>
      )}
    </div>
  );
}