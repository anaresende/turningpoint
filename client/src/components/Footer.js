import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer container-xxl">
      <div className="row d-flex align-items-center">
        <div className="col-12 col-sm-6 d-none d-sm-block ">
          <p>Turning Point © copyright</p>
        </div>
        <div className="col-12 col-sm-6 d-flex justify-content-end">
          <a
            className="email-link me-4"
            href="mailto:geral.turningpoint@gmail.com"
          >
            geral.turningpoint@gmail.com
          </a>
          <a
            className="social-link me-4"
            href="https://www.facebook.com/escola.turningpoint"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="bi bi-facebook"></i>
          </a>
          <a
            className="social-link"
            href="https://www.instagram.com/turningpoint.dance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
