import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Link } from "react-router-dom";

const Welcome = (props) => {
  const { verifyUser } = useContext(AuthContext);

  if (props.match.path === "/auth/confirm/:confirmationCode") {
    verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div className="container centered-container">
      <h3>conta confirmada</h3>
      <Link className="styled-link" to="/login">
        fazer login
      </Link>
    </div>
  );
};

export default Welcome;
