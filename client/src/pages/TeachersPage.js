import "./TeachersPage.css";
import Catarina from "./../assets/videos/catarina-resende.mp4";
import Ana from "./../assets/videos/ana-gual.mp4";
import Marcia from "./../assets/videos/marcia-teixeira.mp4";
import Catia from "./../assets/videos/catia-caetano.mp4";
import Liliana from "./../assets/videos/liliana-mota.mp4";

const TeachersPage = () => (
  <section className="TeachersPage">
    <div className="container-xxl">
      <div className="mt-5 pt-3 pb-5 mt-5 row">
        <h1 className="text-orange">equipa docente</h1>
      </div>
      <div className="mt-5 pt-3 row justify-content-between d-flex">
        <div className="col-6">
          <h2>Ana Resende</h2>
          <h4 class="text-rose mb-5">ballet clássico, commercial dance</h4>
          <p>
            A Turning Point — Escola de Dança é um espaço idealizado e criado
            por Ana Catarina Resende e Ana Filipa Gual. A escola dispõe de dois
            estúdios, com um ambiente moderno e descontraído que reflete a
            missão Turning Point, oferecer uma formação de qualidade em dança,
            num ambiente relaxado em que todos os alunos se sintam bem-vindos.
          </p>
        </div>
        <div className="col-5 ps-5">
          <div className="Teachers-video-wrapper">
            <video
              className="Teachers-video"
              loop={true}
              autoPlay={true}
              muted={true}
            >
              <source src={Catarina} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-5 pb-5 row justify-content-between d-flex">
        <div className="col-5">
          <div className="Teachers-video-wrapper">
            <video
              className="Teachers-video"
              loop={true}
              autoPlay={true}
              muted={true}
            >
              <source src={Ana} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="col-6">
          <h2>Filipa Gual</h2>
          <h4 class="text-rose mb-5">
            ballet clássico, contemporâneo, jazz, pilates clínico
          </h4>
          <p>
            A Turning Point — Escola de Dança é um espaço idealizado e criado
            por Ana Catarina Resende e Ana Filipa Gual. A escola dispõe de dois
            estúdios, com um ambiente moderno e descontraído que reflete a
            missão Turning Point, oferecer uma formação de qualidade em dança,
            num ambiente relaxado em que todos os alunos se sintam bem-vindos.
          </p>
        </div>
      </div>
      <div className="mt-5 pt-5 pb-5 row justify-content-between d-flex">
        <div className="col-6">
          <h2>Márcia Teixeira</h2>
          <h4 class="text-rose mb-5">ballet clássico</h4>
          <p>
            A Turning Point — Escola de Dança é um espaço idealizado e criado
            por Ana Catarina Resende e Ana Filipa Gual. A escola dispõe de dois
            estúdios, com um ambiente moderno e descontraído que reflete a
            missão Turning Point, oferecer uma formação de qualidade em dança,
            num ambiente relaxado em que todos os alunos se sintam bem-vindos.
          </p>
        </div>
        <div className="col-5 ps-5">
          <div className="Teachers-video-wrapper">
            <video
              className="Teachers-video"
              loop={true}
              autoPlay={true}
              muted={true}
            >
              <source src={Marcia} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-5 pb-5 row justify-content-between d-flex">
        <div className="col-5">
          <div className="Teachers-video-wrapper">
            <video
              className="Teachers-video"
              loop={true}
              autoPlay={true}
              muted={true}
            >
              <source src={Liliana} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="col-6">
          <h2>Liliana Mota</h2>
          <h4 class="text-rose mb-5">danças latinas, danças de salão</h4>
          <p>
            A Turning Point — Escola de Dança é um espaço idealizado e criado
            por Ana Catarina Resende e Ana Filipa Gual. A escola dispõe de dois
            estúdios, com um ambiente moderno e descontraído que reflete a
            missão Turning Point, oferecer uma formação de qualidade em dança,
            num ambiente relaxado em que todos os alunos se sintam bem-vindos.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default TeachersPage;
