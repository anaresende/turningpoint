import heroCompetition from "../assets/images/hero-competition.jpg";
import competitionImage1 from "../assets/images/competition-image-1.jpg";
import competitionImage2 from "../assets/images/competition-image-2.jpg";
import competitionImage3 from "../assets/images/competition-image-3.jpg";

import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CompetitionGroupPage.css";

function CompetitionGroupPage() {
  return (
    <section className="Competition-page">
      <div className="Competition-hero-image">
        <img src={heroCompetition} alt="" />
      </div>
      <div className="Competition-hero container-xxl text-center mt-5 pt-3 pb-3">
        <h1>Grupo de Competição</h1>
        <h4 className="mt-4 mb-5 mx-auto">
          Integer luctus magna sit amet rutrum porta. Sed ultricies metus quis
          ante tristique, eu pulvinar nisi tempus.
        </h4>
      </div>
      <div className="container-xxl mt-5 pt-5 pb-5">
        <div className="row mb-5 ">
          <div className="col-12 col-lg-4">
            <img src={competitionImage1} alt="grupo de competição 1" />
          </div>
          <div className="col-12 col-lg-4">
            <img src={competitionImage2} alt="grupo de competição 2" />
          </div>
          <div className="col-12 col-lg-4">
            <img src={competitionImage3} alt="grupo de competição 3" />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12 col-lg-4">
            <h5>Criação de peças artísticas</h5>
          </div>
          <div className="col-12 col-lg-4">
            <h5>Participção em concursos e competições</h5>
          </div>
          <div className="col-12 col-lg-4">
            <h5>Colaboração em projectos artísticos</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              turpis non vitae mattis mauris egestas ipsum, enim interdum.
              Praesent nisl placerat id suspendisse quam enim, felis faucibus.
              Est aliquam nunc egestas quis. Augue ultrices magna sagittis amet
              eget magna nunc aliquam tincidunt.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed turpis non vitae mattis mauris
              egestas ipsum, enim.
            </p>
          </div>
          <div className="col-12 col-lg-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              turpis non vitae mattis mauris egestas ipsum, enim interdum.
              Praesent nisl placerat id suspendisse quam enim, felis faucibus.
              Est aliquam nunc egestas quis.{" "}
            </p>
          </div>
          <div className="col-12 col-lg-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              turpis non vitae mattis mauris egestas ipsum, enim interdum.
              Praesent nisl placerat id suspendisse quam enim, felis faucibus.
              Est aliquam nunc egestas quis. Augue ultrices magna sagittis amet
              eget magna nunc aliquam tincidunt.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed turpis non vitae mattis mauris
              egestas ipsum, enim.
            </p>
          </div>
        </div>
      </div>
      <div className="Competition-carousel mt-5 pt-5 mb-5 pb-5">
        <Carousel
          infiniteLoop
          centerMode
          centerSlidePercentage={60}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
        >
          <div>
            <iframe
              width="100%"
              height="450px"
              src="https://www.youtube.com/embed/rHRjVmBiQ54"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              height="450px"
              src="https://www.youtube.com/embed/87TDfeYdo0A"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <iframe
              width="100%"
              height="450px"
              src="https://www.youtube.com/embed/RxwLtTIi0PM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default CompetitionGroupPage;
