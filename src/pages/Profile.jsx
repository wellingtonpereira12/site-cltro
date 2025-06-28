import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  // Estados e hooks permanecem os mesmos
  const { user, logout, computaVoto } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isProcessingPoints, setIsProcessingPoints] = useState(false);
  const timerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('perfil');

  // --- DADOS DE EXEMPLO (MOCK) PARA AS DOAÇÕES ---
  // Quando o back-end estiver pronto, você substituirá isso por uma chamada de API.
  const mockDonations = [
    //{ id: 1, status: 'Processando', amount: 50.00, date: '27/06/2025 10:30:23' },
   // { id: 2, status: 'Pago', amount: 25.50, date: '27/06/2025 10:30:23' },
   // { id: 3, status: 'Cancelado', amount: 100.00, date: '26/06/2025 10:30:23' },
   // { id: 4, status: 'Pago', amount: 75.00, date: '25/06/2025 10:30:23' },
   // { id: 5, status: 'Pago', amount: 15.00, date: '25/06/2025 10:30:23' },
  ];

  // --- CÁLCULO DO TOTAL DE DOAÇÕES ---
  const totalDonated = 0 + ' ₵';

  // Efeitos e Handlers (sem alterações)
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isProcessingPoints) {
      setIsProcessingPoints(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isProcessingPoints]);

  const handleVote = async (btnvotar) => {
    try {
      setError(null); setSuccess(false); setIsLoading(true); setIsProcessingPoints(true);
      window.open('https://www.topragnarok.com.br/vote/23945', '_blank');
      await computaVoto(btnvotar);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 60000);
      setTimeLeft(60);
    } catch (err) {
      setError(err.message); setIsProcessingPoints(false);
      console.error('Erro ao computar voto:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page profile-container">
      <h2>Minha Conta</h2>
      
      {user ? (
        <>
          {/* Navegação das Abas (sem alterações) */}
          <div className="profile-tab-navigation">
            <button className={`profile-tab-button ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>Perfil</button>
            <button className={`profile-tab-button ${activeTab === 'vote' ? 'active' : ''}`} onClick={() => setActiveTab('vote')}>Vote & Ganhe</button>
            <button className={`profile-tab-button ${activeTab === 'doacao' ? 'active' : ''}`} onClick={() => setActiveTab('doacao')}>Doação</button>
          </div>

          {/* Conteúdo das Abas */}
          <div className="profile-tab-content">
            {/* Aba Perfil (sem alterações) */}
            {activeTab === 'perfil' && (
              <div className="profile-tab-pane">
                 <h3>Informações do Perfil</h3>
                 <div className="profile-user-info">
                   <p><strong>Nome:</strong> {user.name}</p>
                   <p><strong>E-mail:</strong> {user.email}</p>
                   <p><strong>Pontos de Voto:</strong> {user.pontos}</p>
                   <p><strong>Cash:</strong> {totalDonated} </p>
                 </div>
                 <button onClick={logout} className="profile-button profile-logout-button">Sair</button>
              </div>
            )}

            {/* Aba Vote (sem alterações) */}
            {activeTab === 'vote' && (
              <div className="profile-tab-pane">
                 <h3>Vote para ganhar pontos!</h3>
                 <p>Vote em nosso servidor para ganhar pontos que podem ser trocados por itens no jogo.</p>
                 {error && <div className="profile-error">{error}</div>}
                 {success && <div className="profile-success">Obrigado pelo seu voto! Estamos processando seus pontos.</div>}
                 <div className="profile-vote-area">
                   <div className="profile-vote-points">
                     <strong>Seus Pontos:</strong> 
                     <span>
                       {isLoading || isProcessingPoints || timeLeft > 0? ' Processando...' : ` ${user.pontos}`}
                     </span>
                   </div>
                   <div className="profile-vote-option">
                     <strong>Top Ragnarok Brasil:</strong>
                     <button onClick={() => handleVote(1)} disabled={isLoading || timeLeft > 0}>
                       {timeLeft > 0 ? `Aguarde ${timeLeft}s` : 'Votar Agora'}
                     </button>
                   </div>
                 </div>
              </div>
            )}

            {/* --- ABA DOAÇÃO ATUALIZADA --- */}
            {activeTab === 'doacao' && (
              <div className="profile-tab-pane">
                <h3>Apoie o Servidor</h3>
                {/* Campo de Total Arrecadado */}
                <div className="profile-donation-total">
                  <span>Total Cash</span>
                  <strong>
                    {totalDonated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </strong>
                </div>

                <p>
                  Contribua e receba cash em troca! Sua doação ajuda a manter o servidor online e cheio de novidades.
                </p>

                <p>
                  <strong>R$10</strong> = 10.000 cash &nbsp;&nbsp;|&nbsp;&nbsp;
                  <strong>R$25</strong> = 30.000 cash &nbsp;&nbsp;|&nbsp;&nbsp;
                  <strong>R$50</strong> = 70.000 cash &nbsp;&nbsp;|&nbsp;&nbsp;
                  <strong>R$100</strong> = 150.000 cash
                </p>

                <div className="profile-donation-actions">
                  <button className="profile-button profile-donation-button">Doar R$10</button>
                  <button className="profile-button profile-donation-button">Doar R$25</button>
                  <button className="profile-button profile-donation-button">Doar R$50</button>
                  <button className="profile-button profile-donation-button">Doar R$100</button>
                </div>


                {/* Grid de Últimas Doações */}
                <h4 className="profile-donations-grid-title">Últimas Doações</h4>
                <div className="profile-donations-grid">
                  <table className="profile-donations-table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDonations.map((donation) => (
                        <tr key={donation.id}>
                          <td>{donation.id}</td>
                          <td>{donation.date}</td>
                          <td>{donation.status}</td>
                          <td>{donation.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Você precisa estar logado para ver esta página.</p>
      )}
    </div>
  );
}