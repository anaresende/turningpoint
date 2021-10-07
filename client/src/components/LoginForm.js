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

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        const token = response.data.authToken;
        logInUser(token);
        history.push("/");
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Error";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginForm">
      <h4 className="mb-3">Bem-vindo de volta!</h4>

      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <label htmlFor="login-username" className="form-label">
            username
          </label>
          <input
            id="login-username"
            type="text"
            name="vat"
            className="form-control"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="login-password" className="form-label">
            password
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <p className="error-message">{errorMessage && errorMessage}</p>

        <button className="button-primary mt-3 mx-auto d-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
