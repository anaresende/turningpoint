import "./Homepage.css";
import homeHero from "./../assets/videos/home-hero.mp4";

function HomePage() {
  return (
    <div className="Homepage-hero">
      <div className="Homepage-video-wrapper">
        <video
          className="Homepage-video"
          loop={true}
          autoPlay={true}
          muted={true}
        >
          <source src={homeHero} type="video/mp4" />
        </video>
      </div>
      <h1>Bem-vindo à tua escola de dança!</h1>
    </div>
  );
}

export default HomePage;
