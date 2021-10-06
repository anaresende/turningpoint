import "./Errorpage.css";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container error-page">
    <h3>oops, esta página não existe</h3>
    <Link className="link" to="/">
      Voltar para a página principal
    </Link>
  </div>
);

export default NotFound;
