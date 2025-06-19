import BannerRotativo from './BannerRotativo'; // Mantenha seu banner rotativo aqui
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    navigate(user ? '/perfil' : '/criar-conta');
  };

  return (
    <div className="page-container">
      <header className="hero-section">
        <div className="hero-content">
          {user && (
            <div className="welcome-message">
              <h2>Bem-vindo de volta, {user.name}!</h2>
              <p>Continue sua aventura no CLTRO!</p>
            </div>
          )}
          
          <h1 className="main-title">
            Bem-vindo ao <span className="highlight">CLTRO!</span>
          </h1>
          <p className="subtitle">
            Seu servidor privado de Ragnarok. Feito para quem tem a agenda cheia, mas não abre mão da diversão!
          </p>
          <button className="cta-button" onClick={handleClick}>
            Comece a Jogar Agora!
          </button>
          <p className="small-text">
            *Crie sua conta em menos de 2 minutos e mergulhe na aventura.
          </p>
        </div>
      </header>

      {/* Seção de Destaques/Benefícios */}
      <section className="features-section">
        <div className="feature-item">
          <i className="icon fas fa-hourglass-half"></i> {/* Ícone de ampulheta ou relógio */}
          <h2>Otimizado para a Sua Rotina</h2>
          <p>Progresso significativo sem precisar de horas infinitas. Desfrute do jogo no seu tempo livre.</p>
        </div>
        <div className="feature-item">
          <i className="icon fas fa-users"></i> {/* Ícone de grupo de pessoas */}
          <h2>Comunidade Amigável</h2>
          <p>Encontre outros jogadores que entendem seu ritmo. Jogue em grupo e faça novas amizades.</p>
        </div>
        <div className="feature-item">
          <i className="icon fas fa-bolt"></i> {/* Ícone de raio/velocidade */}
          <h2>Ação e Diversão Rápida</h2>
          <p>Eventos dinâmicos e mecânicas que maximizam a diversão em sessões de jogo mais curtas.</p>
        </div>
      </section>

      {/* Seção do Banner Rotativo (se tiver promoções, novidades, etc.) */}
      <section className="banner-rotativo-section">
        <BannerRotativo />
      </section>

      {/* Seção Sobre o CLTRO */}
      <section className="about-cltro">
        <h2>O Que É o CLTRO?</h2>
        <p>
          O **CLTRO** é o destino perfeito para quem ama **Ragnarok Online** mas tem uma vida agitada. Somos um servidor privado focado em oferecer uma experiência de jogo equilibrada, onde a diversão não depende de horas e horas de grind. Se você é um profissional, estudante ou tem pouco tempo, nosso servidor é desenhado para se encaixar na sua rotina, garantindo que você aproveite ao máximo cada momento no mundo de Rune-Midgard. Venha redescobrir a magia de Ragnarok, feito para você!
        </p>
      </section>

      {/* Seção de Chamada para Ação Final */}
      <section className="final-cta-section">
        <h3>Pronto para Sua Aventura?</h3>
        <p>Junte-se à nossa comunidade e comece a escrever sua lenda no CLTRO hoje mesmo!</p>
        <button className="cta-button secondary" onClick={handleClick}>
          Criar Minha Conta Grátis!
        </button>
      </section>

      <footer className="site-footer">
        <p>&copy; 2025 CLTRO - Ragnarok Online. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}