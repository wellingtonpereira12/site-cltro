import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  // Estados e hooks permanecem os mesmos
  const { user, pagamento, totalCash, totalPagamento, logout, computaVoto, gerarLinkPagamentoMP, processarCash } = useAuth();
  const [error, setError] = useState(null);
  const [errorDoacao, setErrorDoacao] = useState(null);
  const [errorProcessarCash, setErrorProcessarCash] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successDoacao, setSuccessDoacao] = useState(false);
  const [successProcessarCash, setSuccessProcessarCash] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingbtn2, setIsLoadingbtn2] = useState(false);
  const [isLoadingDoacao, setIsLoadingDoacao] = useState(false);
  const [isLoadingProcessarCash, setIsLoadingProcessarCash] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeLeftbtn2, setTimeLeftbtn2] = useState(0);
  const [timeLeftProcessarCash, setTimeLeftProcessarCash] = useState(0);
  const [timeLeftDoacao, setTimeLeftDoacao] = useState(0);
  const [isProcessingPoints, setIsProcessingPoints] = useState(false);
  const [isProcessingCash, setIsProcessingCash] = useState(false);
  const [isProcessingProcessarCash, setIsProcessingProcessarCash] = useState(false);
  const timerRef = useRef(null);
  const timerRefBtn2 = useRef(null);
  const timerRefProcessarCash = useRef(null);
  const [activeTab, setActiveTab] = useState('perfil');

  // Efeitos e Handlers (sem alterações)
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isProcessingPoints) {
      setIsProcessingPoints(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isProcessingPoints]);

  useEffect(() => {
    if (timeLeftbtn2 > 0) {
      timerRefBtn2.current = setTimeout(() => setTimeLeftbtn2(timeLeftbtn2 - 1), 1000);
    }
    return () => clearTimeout(timerRefBtn2.current);
  }, [timeLeftbtn2]);

  useEffect(() => {
    if (timeLeftProcessarCash > 0) {
      timerRefProcessarCash.current = setTimeout(() => {
        setTimeLeftProcessarCash((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timerRefProcessarCash.current);
  }, [timeLeftProcessarCash]);


  // Efeitos e Handlers (sem alterações)
  const handleVote = async (btnvotar) => {
    if (btnvotar === 1) {
      try {
        setError(null);
        setSuccess(false);
        setIsLoading(true);
        setIsProcessingPoints(true);

        window.open('https://www.topragnarok.com.br/vote/23945', '_blank');
        await computaVoto(btnvotar);

        setSuccess(true);
        setTimeout(() => setSuccess(false), 60000);
        setTimeLeft(60); // ← CONTADOR PARA BOTÃO 1
      } catch (err) {
        setError(err.message);
        setIsProcessingPoints(false);
        console.error('Erro ao computar voto:', err);
      } finally {
        setIsLoading(false);
      }
    } else if (btnvotar === 2) {
      try {
        setError(null);
        setSuccess(false);
        setIsLoadingbtn2(true);
        setIsProcessingPoints(true);

        window.open('http://www.topragnarok.org/votar/id8941/', '_blank');
        await computaVoto(btnvotar);

        setSuccess(true);
        setTimeout(() => setSuccess(false), 60000);
        setTimeLeftbtn2(60); // ← CONTADOR PARA BOTÃO 2
      } catch (err) {
        setError(err.message);
        setIsProcessingPoints(false);
        console.error('Erro ao computar voto:', err);
      } finally {
        setIsLoadingbtn2(false);
      }
    }
  };

  const handlePagamento = async (btnPagamento) => {
    try {
      setErrorDoacao(null); setSuccessDoacao(false); setIsLoadingDoacao(true); setIsProcessingCash(true);

      const linkPagamento = await gerarLinkPagamentoMP(btnPagamento);
      if (linkPagamento.resposta.success == true) {
        window.open(linkPagamento.resposta.init_point, '_blank');
        setSuccessDoacao(true);
        setTimeout(() => setSuccessDoacao(false), 60000);
        setTimeLeftDoacao(60);
      } else {
        setErrorDoacao('Não foi possivel gerar o link de doação');
      }
    } catch (err) {
      console.error('Erro ao gerar link de pagamento:', err);
      setErrorDoacao(err.message);
    } finally {
      setIsLoadingDoacao(false);
      setIsProcessingCash(false);
    }
  };

  const handleProcessarCash = async () => {
    try {
      setErrorProcessarCash(null);
      setIsLoadingProcessarCash(true);
      setIsProcessingProcessarCash(true);

      const processar = await processarCash();
      if (processar.success === true) {
        setSuccessProcessarCash(true);
        setTimeout(() => setSuccessProcessarCash(false), 60000);
        setTimeLeftProcessarCash(20);
      } else {
        setErrorDoacao('Não foi possível processar o Cash');
      }
    } catch (err) {
      console.error('Erro ao processar o Cash:', err);
      setErrorDoacao(err.message);
    } finally {
      setIsLoadingProcessarCash(false);
      setIsProcessingProcessarCash(false);
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
                   <p><strong>Cash:</strong> {totalCash?.valor}</p>
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
                     <strong>Top Ragnarok Org:</strong>
                     <button onClick={() => handleVote(2)} disabled={isLoadingbtn2 || timeLeftbtn2 > 0}>
                       {timeLeftbtn2 > 0 ? `Aguarde ${timeLeftbtn2}s` : 'Votar Agora'}
                     </button>
                   </div>
                 </div>
              </div>
            )}

            {/* --- ABA DOAÇÃO ATUALIZADA --- */}
            {activeTab === 'doacao' && (
              <div className="profile-tab-pane">
                <h3>Apoie o Servidor</h3>
                {errorDoacao && <div className="profile-error">{errorDoacao}</div>}
                {successDoacao && <div className="profile-success">Obrigado pelo seu donate! Quando o pagamento for aprovado você poderá transformar em cash.</div>}
                {/* Campo de Total Arrecadado */}
                <div className="profile-donation-total">
                  <span>Total de doação para troca</span>
                  <strong>
                    {isLoadingProcessarCash || timeLeftProcessarCash > 0
                      ? 'Processando...'
                      : (typeof totalPagamento?.valor === 'number'
                          ? totalPagamento.valor.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })
                          : 'R$ 0,00')}
                  </strong>
                  <button onClick={() => handleProcessarCash()} disabled={totalPagamento.valor == 0}>
                    {isLoadingProcessarCash || timeLeftProcessarCash > 0 ? `Processando ${timeLeftProcessarCash}s` : 'Processar cash'}
                  </button>
                  <span>Total Cash na sua conta</span>
                  <strong>
                    {isLoadingProcessarCash || timeLeftProcessarCash> 0? 'Processando...' : totalCash?.valor}
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
                  <button
                    className="profile-button profile-donation-button"
                    onClick={() => handlePagamento(1)}
                  >
                    Doar R$10
                  </button>
                  <button
                    className="profile-button profile-donation-button"
                    onClick={() => handlePagamento(2)}
                  >
                    Doar R$25
                  </button>
                  <button
                    className="profile-button profile-donation-button"
                    onClick={() => handlePagamento(3)}
                  >
                    Doar R$50
                  </button>
                  <button
                    className="profile-button profile-donation-button"
                    onClick={() => handlePagamento(4)}
                  >
                    Doar R$100
                  </button>
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
                     {pagamento?.map((donation) => (
                        <tr key={donation.id}>
                          <td>{donation.id}</td>
                          <td>{new Date(donation.data).toLocaleString('pt-BR')}</td>
                          <td>{donation.status}</td>
                          <td>{Number(donation.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
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