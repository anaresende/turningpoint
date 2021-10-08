import homeEscola from "./../assets/images/home-escola.jpg";

const AboutPage = () => (
  <section className="flex-grow-1">
    <div className="container-xxl">
      <div className="pt-5 pb-5 mt-5 row">
        <div className="col-6 ">
          <h2 className="text-rose">a tua escola</h2>
          <h4 className="text-orange mb-5">pronto para dançar ?</h4>
          <p className="pe-5">
            A Turning Point — Escola de Dança é um espaço em São João da
            Madeira, dedicado ao ensino livre de dança. Idealizada e criada por
            Ana Catarina Resende e Ana Filipa Gual, a escola oferece as
            modalidades de Ballet Clássico, Modern Jazz, Dança Contemporânea,
            Commercial Dance, Danças Latinas, Pilates Clínico e PBT -
            Progressive Ballet Technique. Localizada na Rua Combatentes da
            Grande Guerra, a escola dispõe de dois estúdios, num espaço
            recentemente renovado com um ambiente moderno e descontraído que
            reflete a missão Turning Point, oferecer uma formação de qualidade
            em dança, num ambiente relaxado em que todos os alunos se sintam
            bem-vindos. Os alunos da Turning Point têm a possibilidade de fazer
            cursos certificados pela IDTA — International Dance Teacher's
            Association nas modalidades de Ballet Clássico e Modern Jazz, sendo
            toda a equipa docente certificada pela mesma instituição.
          </p>
        </div>
        <div className="col-6 d-flex align-items-center">
          <img src={homeEscola} alt="imagem escola" />
        </div>
      </div>
    </div>
  </section>
);

export default AboutPage;
