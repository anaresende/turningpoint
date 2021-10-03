import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { useHistory } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vat, setVat] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const history = useHistory();

  const { logInUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleVat = (e) => setVat(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { vat, username, email, password };

    console.log(requestBody);
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => history.push("/confirm-email"))
      .catch((error) => {
        console.log("cenas", error);
        // const errorDescription = error.response.data.message;
        setErrorMessage("error");
      });
  };

  return (
    <div className="SignupForm">
      <h1>
        És nosso aluno e ainda não tens conta? <br />
        Regista-te!
      </h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Número de Contribuinte:</label>
        <input
          type="text"
          name="vat"
          value={vat}
          minLength="9"
          maxLength="9"
          required
          onChange={handleVat}
        />
        <br />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={handleUsername}
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          required
          onChange={handleEmail}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={handlePassword}
        />

        <button type="submit">Regista-te!</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Ainda não és aluno da nossa escola?</p>
      <Link to={"/contacts"}>Contacta-nos!</Link>
    </div>
  );
}

export default SignupForm;
