import banner from '../assets/banner.png'; // ou onde sua imagem estiver

export default function BannerPage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <img src={banner} alt="Banner promocional" style={{ maxWidth: '100%' }} />
    </div>
  );
}
