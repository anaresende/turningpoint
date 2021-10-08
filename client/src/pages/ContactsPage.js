import { Link } from "react-router-dom";

const ContactsPage = () => (
  <section className="ContactsPags flex-grow-1">
    <div className="container-xxl py-5 mt-5">
      <h2 className="text-rose mb-3">Contactos</h2>

      <div className="mb-2">
        <h4 className="text-orange mb-4">vem dançar connosco !</h4>
      </div>
      <div className="mb-2">
        <p>Rua Combatentes da grande Guerra, nº 93</p>
      </div>
      <div className="mb-2">
        <a className="styled-link" href="mailto:geral@turningpoint.dance">
          geral@turningpoint.dance
        </a>
      </div>
      <div className="mb-2">
        <a className="styled-link" href="tel:934 787 265">
          934 787 265
        </a>
      </div>
      <div className="mt-3 mb-5">
        <a
          className="social-link"
          href="https://www.facebook.com/escola.turningpoint"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bi bi-facebook"></i>
        </a>
        <a
          className="social-link ms-4"
          href="https://www.instagram.com/turningpoint.dance/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bi bi-instagram"></i>
        </a>
      </div>
    </div>
  </section>
);

export default ContactsPage;
