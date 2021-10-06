import { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

function LoginForm(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const history = useHistory();

  const { logInUser } = useContext(AuthContext);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    console.log(requestBody);
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        const token = response.data.authToken;
        logInUser(token);
        history.push("/");
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Error";
        console.log("error front", error?.response);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginForm">
      <h4>Bem-vindo de volta!</h4>

      <form onSubmit={handleLoginSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="vat"
          value={username}
          onChange={handleUsername}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LoginForm;
