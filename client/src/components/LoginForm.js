import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

const API_URL = "http://localhost:5005";


function LoginForm(props) {
  const [password, setPassword] = useState("");
  const [vat, setVat] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);


 
  const handlePassword = (e) => setPassword(e.target.value);
  const handleVat = (e) => setVat(e.target.value)

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { vat, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        
        const token = response.data.authToken;
        logInUser(token);
        props.history.push("/");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    	})
  };
  
  return (
    <div className="LoginForm">
      <h1>Bem-vindo de volta!</h1>

      <form onSubmit={handleLoginSubmit}>
      <label>Número de Contribuinte:</label>
        <input type="number" name="vat" value={vat} onChange={handleVat} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

      

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Ainda não és aluno da nossa escola?</p>
      <Link to={"/contactos"}>Clica aqui para saber mais!</Link>
    </div>
  )
}

export default LoginForm;