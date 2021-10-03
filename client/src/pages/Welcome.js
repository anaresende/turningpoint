import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Link } from "react-router-dom";

const Welcome = (props) => {
  const { verifyUser } = useContext(AuthContext);

  if (props.match.path === "/auth/confirm/:confirmationCode") {
    verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div className="container">
      <h1>
        <strong>Account confirmed!</strong>
      </h1>
      <Link to={"/login"}>Please Login</Link>
    </div>
  );
};

export default Welcome;
