import "./Homepage.css";
import homeHero from "./../assets/videos/home-hero.mp4";
import homeEscola from "./../assets/images/home-escola.jpg";
import homeModalidades from "./../assets/images/home-modalidades.jpg";
import homeProfessores from "./../assets/images/home-professores.jpg";
import { ReactComponent as IconArrowRight } from "./../assets/icons/arrow-right.svg";

function HomePage() {
  return (
    <>
      <section className="Homepage-hero">
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
        <div className="container-xxl Homepage-hero-slogan">
          <h1>
            Bem-vindo <br /> à tua escola <br /> de dança!
          </h1>
        </div>
      </section>
      <section className="Homepage-block">
        <div className="container-xxl">
          <div className="mt-5 pt-5 pb-5 mt-5 row">
            <div className="col-6">
              <h2>a escola</h2>
              <p className="pe-5">
                A Turning Point — Escola de Dança é um espaço idealizado e
                criado por Ana Catarina Resende e Ana Filipa Gual. A escola
                dispõe de dois estúdios, com um ambiente moderno e descontraído
                que reflete a missão Turning Point, oferecer uma formação de
                qualidade em dança, num ambiente relaxado em que todos os alunos
                se sintam bem-vindos.
              </p>
            </div>
            <div className="col-6">
              <img src={homeEscola} alt="imagem escola" />
            </div>
          </div>
          <div className="mt-5 pt-5 pb-5 mt-5 row">
            <div className="col-6">
              <img src={homeModalidades} alt="imagem modalidades" />
            </div>
            <div className="col-6">
              <h2 className="ps-5">modalidades</h2>
              <p className="ps-5">
                Se gostas de dançar a Turning Point é a escola ideal para ti.
                Temos vários estilos nos quais podes aprofundar e tua formação
                em dança, permitindo que te tornes num melhor bailarino. Desde o
                Ballet Clássico, Jazz, Contemporâneo e Commercial Dance,
                passando pelas Danças Latinas e de Salão e até mesmo Pilates
                Clínico, a nossa oferta formativa permite-te escolher o estilo
                que mais gostas, independentemente da tua idade.
              </p>
            </div>
          </div>
          {/* <div className="mt-5 pt-5 pb-5 mt-5 row">
            <div className="col-6">
              <h2>equipa docente</h2>
              <p className="pe-5">
                A Turning Point — Escola de Dança é um espaço idealizado e
                criado por Ana Catarina Resende e Ana Filipa Gual. A escola
                dispõe de dois estúdios, com um ambiente moderno e descontraído
                que reflete a missão Turning Point, oferecer uma formação de
                qualidade em dança, num ambiente relaxado em que todos os alunos
                se sintam bem-vindos.
              </p>
            </div>
            <div className="col-6">
              <img src={homeProfessores} alt="imagem professoras" />
            </div>
          </div> */}
        </div>
      </section>
      <section>
        <div className="Homepage-callAction">
          <div className="container-xxl">
            <a href="mailto:geral@turningpoint.dance">
              <h3>
                vem fazer parte da nossa escola
                <IconArrowRight className="ms-3 Homepage-icon-right" />
              </h3>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
