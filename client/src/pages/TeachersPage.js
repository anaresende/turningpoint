import homeEscola from "./../assets/images/home-escola.jpg";
import "./TeachersPage.css";

const TeachersPage = () => (
  <section className="TeachersPage">
    <div className="container-xxl">
      <div className="mt-5 pt-5 pb-5 mt-5 row">
        <h1 className="text-orange">equipa docente</h1>
      </div>
      <div className="mt-5 pt-5 pb-5 mt-5 row justify-content-between d-flex">
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
          <img src={homeEscola} alt="imagem escola" />
        </div>
      </div>
      <div className="mt-5 pt-5 pb-5 mt-5 row justify-content-between d-flex">
        <div className="col-5">
          <img src={homeEscola} alt="imagem modalidades" />
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
      <div className="mt-5 pt-5 pb-5 mt-5 row justify-content-between d-flex">
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
          <img src={homeEscola} alt="imagem escola" />
        </div>
      </div>
      <div className="mt-5 pt-5 pb-5 mt-5 row justify-content-between d-flex">
        <div className="col-5">
          <img src={homeEscola} alt="imagem modalidades" />
        </div>
        <div className="col-6">
          <h2>Cátia Caetano</h2>
          <h4 class="text-rose mb-5">ballet clássico</h4>
          <p>
            A Turning Point — Escola de Dança é um espaço idealizado e criado
            por Ana Catarina Resende e Ana Filipa Gual. A escola dispõe de dois
            estúdios, com um ambiente moderno e descontraído que reflete a
            missão Turning Point, oferecer uma formação de qualidade em dança,
            num ambiente relaxado em que todos os alunos se sintam bem-vindos.
          </p>
        </div>
      </div>
      <div className="mt-5 pt-5 pb-5 mt-5 row justify-content-between d-flex">
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
        <div className="col-5 ps-5">
          <img src={homeEscola} alt="imagem escola" />
        </div>
      </div>
    </div>
  </section>
);

export default TeachersPage;
