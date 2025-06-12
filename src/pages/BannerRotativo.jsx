import { useEffect, useState } from 'react';

const banners = [
  { id: 1, src: '/banners/banner1.png', alt: 'Evento de Verão - Recompensas em Dobro!' },
  { id: 2, src: '/banners/banner2.png', alt: 'Nova Classe Disponível - Desperte seu Poder!' },
  { id: 3, src: '/banners/banner3.png', alt: 'Atualização Recente - Explore Novas Áreas!' },
  { id: 4, src: '/banners/banner4.png', alt: 'Batalha de Guildas - Conquiste o Ranking!' }, // Adicione mais banners para um ciclo mais interessante
];

const TRANSITION_DURATION = 500; // Duração da transição em ms
const AUTOPLAY_INTERVAL = 5000; // Tempo de exibição de cada banner em ms

export default function BannerRotativo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Controla o autoplay

  // Função para avançar o banner
  const nextBanner = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      setIsTransitioning(false);
    }, TRANSITION_DURATION); // Espera a transição de saída para mudar o index
  };

  // Função para ir para um banner específico
  const goToBanner = (index) => {
    if (index === currentIndex) return; // Não faz nada se já estiver no banner atual
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  };

  // Efeito para o autoplay
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(nextBanner, AUTOPLAY_INTERVAL);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, currentIndex]); // Reinicia o intervalo se isPlaying ou currentIndex mudar

  return (
    <div
      className="banner-carousel"
      onMouseEnter={() => setIsPlaying(false)} // Pausa no hover
      onMouseLeave={() => setIsPlaying(true)} // Retoma ao sair
    >
      <div className="banner-slide-wrapper">
        <img
          src={banners[currentIndex].src}
          alt={banners[currentIndex].alt}
          className={`banner-img ${isTransitioning ? 'fade-out' : 'fade-in'}`}
        />
      </div>

      {/* Navegação por Dots */}
      <div className="banner-dots">
        {banners.map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`dot ${dotIndex === currentIndex ? 'active' : ''}`}
            onClick={() => goToBanner(dotIndex)}
            aria-label={`Ir para o banner ${dotIndex + 1}`}
          ></span>
        ))}
      </div>

      {/* Navegação por Setas (Opcional, mas útil) */}
      <button
        className="banner-nav-arrow prev"
        onClick={() => goToBanner((currentIndex - 1 + banners.length) % banners.length)}
        aria-label="Banner anterior"
      >
        &#10094; {/* Caractere para seta esquerda */}
      </button>
      <button
        className="banner-nav-arrow next"
        onClick={() => goToBanner((currentIndex + 1) % banners.length)}
        aria-label="Próximo banner"
      >
        &#10095; {/* Caractere para seta direita */}
      </button>
    </div>
  );
}