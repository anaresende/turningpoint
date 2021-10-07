import { Link } from "react-router-dom";

const ConfirmEmailPage = () => (
  <div className="container centered-container">
    <h3>Por favor confirme o seu email</h3>
    <Link className="styled-link" to="/">
      Voltar para a página principal
    </Link>
  </div>
);

export default ConfirmEmailPage;
