import ballet from "./../assets/images/balletclassico.png";
import TeacherProfile from "./../components/TeacherProfile";
import Ana from "./../assets/images/ana.jpg";
import Catarina from "./../assets/images/catarina.jpg";
import Marcia from "./../assets/images/marcia.jpg";
import Liliana from "./../assets/images/liliana.jpg";
import Catia from "./../assets/images/catia.jpg";

const DanceStylesPage = () => (
  <section className="Homepage-block">
    <div className="container-xxl">
      <div id="ballet" className="pt-header row">
        <div className="col-6">
          <h2>Ballet Clássico</h2>
        </div>
        <div className="col-12">
          <img src={ballet} alt="imagem escola" />
        </div>
        <div className="pt-5 pb-5 mt-5 row">
          <div className="col-12 mb-5 d-flex ">
            <div className="col-6">
              <TeacherProfile photo={Ana} name="Filipa Gual" />
              <TeacherProfile photo={Catarina} name="Ana Resende" />
              <TeacherProfile photo={Marcia} name="Márcia Teixeira" />
              <TeacherProfile photo={Catia} name="Catia Caetano" />
            </div>
            <div className="col-6">
              <h4 className="text-rose mb-5">Ballet Clássico </h4>
              <p>
                Ballet Clássico é o estilo de dança que pode ser considerado a
                base para todos os outros estilos de dança. Na Turning Point
                temos turmas de ballet para todas as idades, desde os mais
                pequeninos, a partir dos 3 anos, até turmas para adultos. Na
                nossa escola, as aulas de ballet são lecionadas por professoras
                certificadas pela
                <i> IDTA — International Dance Teachers Association</i>,
                permitindo aos nossos alunos a realização de exames vocacionais
                nesta modalidade.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="contemporaneo" className="pt-header row">
        <h2>Dança Contemporânea</h2>
        <div className="col-12">
          <img src={ballet} alt="imagem escola" />
        </div>
        <div className="pt-5 pb-5 mt-5 row">
          <div className="col-12 mb-5 d-flex ">
            <div className="col-6">
              <TeacherProfile photo={Ana} name="Filipa Gual" />
            </div>
            <div className="col-6">
              <h4 className="text-rose mb-5">Dança Contemporânea</h4>
              <p>
                A dança Contemporânea é a expressão do corpo e movimento,
                fundindo várias técnicas e vários estilos. Este género de dança
                permite trabalhar flexibilidade, força e a qualidade
                interpretativa dos alunos, reforçando a vertente performativa
                deste estilo de dança. <br></br>
                Na Turning Point, as turmas de contemporâneo são divididas por
                idade e nível de dificuldade, sendo possível frequentar esta
                modalidade a partir dos 6 anos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="commercial" className="pt-header row">
        <h2>Commercial Dance</h2>
        <div className="col-12">
          <img src={ballet} alt="imagem escola" />
        </div>
        <div className="pt-5 pb-5 mt-5 row">
          <div className="col-12 mb-5 d-flex ">
            <div className="col-6">
              <TeacherProfile photo={Catarina} name="Ana Resende" />
            </div>
            <div className="col-6">
              <h4 className="text-rose mb-5">Commercial Dance</h4>
              <p>
                Commercial Dance é o estilo ideal para quem não consegue ouvir
                uma música sem começar a dançar. Com base nas danças urbanas, o
                estilo comercial combina várias influências do hip hop e do
                street jazz, resultando numa aula divertida e cheia de ritmo.
                <br></br>
                Na nossa escola, temos turmas para crianças a partir dos 3 anos,
                até jovens adultos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="jazz" className="pt-header row">
        <h2>Modern Jazz</h2>
        <div className="col-12">
          <img src={ballet} alt="imagem escola" />
        </div>
        <div className="pt-5 pb-5 mt-5 row">
          <div className="col-12 mb-5 d-flex ">
            <div className="col-6">
              <TeacherProfile photo={Ana} name="Filipa Gual" />
            </div>
            <div className="col-6">
              <h4 className="text-rose mb-5">Modern Jazz</h4>
              <p>
                Modern Jazz é a fusão entre a dança contemporânea e o jazz e
                alia a vertente interpretativa do contemporâneo com a componente
                mais técnica do jazz. Na Turning Point, os alunos de Modern Jazz
                podem fazer uma formação certificada nesta modalidade, pela
                <i> IDTA — International Dance Teachers Association</i>, fazendo
                exames vocacionais, que lhes permitem uma evolução enquanto
                bailarinos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="latinas" className="pt-header row">
        <h2>Danças Latinas</h2>
        <div className="col-12">
          <img src={ballet} alt="imagem escola" />
        </div>
        <div className="pt-5 pb-5 mt-5 row">
          <div className="col-12 mb-5 d-flex ">
            <div className="col-6">
              <TeacherProfile photo={Liliana} name="Liliana Mota" />
            </div>
            <div className="col-6">
              <h4 className="text-rose mb-5">Danças Latinas</h4>
              <p>
                As danças latinas são danças principalmente oriundas da América
                latina, ao som de ritmos melodiosos que incorporam sons de
                guitarra e percussão. Os movimentos são muito graciosos e a
                harmonia de ritmos faz com que a mistura da música e a dança se
                convertam numa fantástica explosão cheia de ritmo. Dentro das
                danças latinas encontramos ritmos como a salsa, o cha-cha-chá, o
                mambo, a bachata e o merengue por mencionar as mais importantes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="pilates" className="pt-header row">
        <h2>Pilates Clínico</h2>
        <div className="col-12">
          <img src={ballet} alt="imagem escola" />
        </div>
        <div className="pt-5 pb-5 mt-5 row">
          <div className="col-12 mb-5 d-flex ">
            <div className="col-6">
              <TeacherProfile photo={Ana} name="Filipa Gual" />
            </div>
            <div className="col-6">
              <h4 className="text-rose mb-5">Pilates Clínico</h4>
              <p>
                Pilates Clínico consiste num conjunto de exercícios, adaptados
                dos exercícios originais desenvolvidos por Joseph Pilates,
                divididos em vários níveis de dificuldade, permitindo assim
                direcioná-los para a reabilitação. Esta adaptação feita desde os
                anos 90 por Fisioterapeutas, tem bases científicas atuais e
                reconhecidas internacionalmente, continuando a evoluir de uma
                forma rápida e significativa a nível mundial. <br></br>Na
                Turning Point esta modalidade é lecionada pela fisioterapeuta
                certificada Filipa Gual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DanceStylesPage;
