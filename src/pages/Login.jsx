import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [loginn, setloginn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginn, password);
      navigate('/perfil');
    } catch (err) {
      setError(err.message);
      console.error('Erro no login:', err);
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login:</label>
          <input
            type="login"
            id="login"
            value={loginn}
            onChange={(e) => setloginn(e.target.value)}
            required
            autoComplete="login"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="button">Entrar</button>
      </form>
      <p>
        Ainda não tem uma conta? <a href="/criar-conta">Crie uma aqui</a>.
      </p>
    </div>
  );
}