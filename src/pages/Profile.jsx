import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout, computaVoto } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Tempo restante em segundos
  const [isProcessingPoints, setIsProcessingPoints] = useState(false);
  const timerRef = useRef(null); // Referência para o timer

  // Efeito para o contador regressivo
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
      // Quando o timer acabar, mostrar os pontos reais
      setIsProcessingPoints(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft]);

  const handleVote = async (btnvotar) => {
    try {
      setError(null);
      setSuccess(false);
      setIsLoading(true);
      setIsProcessingPoints(true); // Inicia o estado de processamento
      
      window.open('https://www.topragnarok.com.br/vote/23945', '_blank');
      
      await computaVoto(btnvotar);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 60000);

      setTimeLeft(60);
    } catch (err) {
      setError(err.message);
      setIsProcessingPoints(false); // Para o processamento em caso de erro
      console.error('Erro ao computar voto:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Seu Perfil</h2>
      
      {error && <div className="error">{error}</div>}
      {success && (
        <div className="success">
          Aguarde pois estamos processando seu voto.
        </div>
      )}
      
      {user ? (
        <>
          <div className="user-info">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>E-mail:</strong> {user.email}</p>
            <div className="user-info">
              <p><strong>Pontos de Voto:</strong> 
                {isProcessingPoints ? ' Processando...' : ` ${user.pontos}`}
                <p><strong>Top Ragnarok Brasil: </strong>
                  <button 
                    onClick={() => handleVote(1)}
                  > 
                    Votar 
                  </button>
                </p>
              </p>
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