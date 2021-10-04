import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function SignupForm(props) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [classes, setClasses] = useState([]);
  const history = useHistory();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const danceClass = Object.keys(classes)
      .map((style) => {
        return form[style].value;
      })
      .filter(Boolean);

    const requestBody = {
      vat: form.vat.value,
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      danceClass: danceClass,
    };

    console.log(requestBody);
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => history.push("/confirm-email"))
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    axios.get(`${API_URL}/user/classes`).then((response) => {
      const classesByStyle = response.data.reduce((acc, current) => {
        acc[current.style] = [...(acc[current.style] || []), current];
        return acc;
      }, []);

      setClasses(classesByStyle);
    });
  }, []);

  return (
    <div className="SignupForm">
      <h1>
        És nosso aluno e ainda não tens conta? <br />
        Regista-te!
      </h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Número de Contribuinte:</label>
        <input type="text" name="vat" minLength="9" maxLength="9" required />
        <br />
        <label>Username:</label>
        <input type="text" name="username" required />
        <br />
        <label>Email:</label>
        <input type="text" name="email" required />
        <br />
        <label>Password:</label>
        <input type="password" name="password" required />
        <br />
        <label>Modalidades:</label>
        {Object.keys(classes).map((style) => {
          console.log(classes[style]);
          return (
            <div key={style}>
              <label htmlFor={`${style}-select`}>{style}</label>
              <select name={style} id={`${style}-select`} defaultValue="">
                <option value="">-- escolhe aqui --</option>

                {Object.keys(classes[style]).map((index) => {
                  const classLevel = classes[style][index];
                  return (
                    <option key={classLevel._id} value={classLevel._id}>
                      {classLevel.level}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
        <button type="submit">Regista-te!</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Ainda não és aluno da nossa escola?</p>
      <Link to={"/contacts"}>Contacta-nos!</Link>
    </div>
  );
}

export default SignupForm;
