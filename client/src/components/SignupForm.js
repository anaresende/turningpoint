import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

const API_URL = "http://localhost:5005";


function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vat, setVat] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleVat = (e) => setVat(e.target.value)

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { vat, email, password };

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
    <div className="SignupForm">
      <h1>És nosso aluno e ainda não tens conta? <br/>Regista-te!</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Número de Contribuinte:</label>
        <input type="number" name="vat" value={vat} onChange={handleVat} />

        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <button type="submit">Regista-te!</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Ainda não és aluno da nossa escola?</p>
      <Link to={"/contacts"}>Contacta-nos!</Link>
    </div>
  )
}

export default SignupForm;