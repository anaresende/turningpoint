import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer container-xxl">
      <div className="row d-flex align-items-center">
        <div className="col-6">
          <p>Turning Point © copyright</p>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <a href="mailto:geral@turningpoint.dance">geral@turningpoint.dance</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
