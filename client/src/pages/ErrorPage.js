import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container centered-container">
    <h3>oops, esta página não existe</h3>
    <Link className="styled-link" to="/">
      Voltar para a página principal
    </Link>
  </div>
);

export default NotFound;
