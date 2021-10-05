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

    let formData = new FormData();
    formData.append("avatarUrl", form.avatarUrl.files[0]);
    formData.append("vat", form.vat.value);
    formData.append("username", form.username.value);
    formData.append("email", form.email.value);
    formData.append("password", form.password.value);
    formData.append("danceClass", danceClass);

    console.log("danceClass", danceClass);
    console.log(formData);
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, formData)
      .then((response) => history.push("/confirm-email"))
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "error";
        console.log("error front", error?.response);
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user/classes`)
      .then((response) => {
        const classesByStyle = response.data.reduce((acc, current) => {
          acc[current.style] = [...(acc[current.style] || []), current];
          return acc;
        }, []);

        setClasses(classesByStyle);
      })
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <div className="SignupForm">
      <h1>
        És nosso aluno e ainda não tens conta? <br />
        Regista-te!
      </h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Foto:</label>
        <input type="file" name="avatarUrl" id="avatarUrl" />
        <br />
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
        {classes && <label>Modalidades:</label>}
        {Object.keys(classes).map((style) => {
          const styles = classes[style];

          return (
            <div key={style}>
              <label htmlFor={`${style}-select`}>{style}</label>
              <select name={style} id={`${style}-select`} defaultValue="">
                <option value="">-- escolhe aqui --</option>

                {Object.keys(styles).map((index) => {
                  const classLevel = styles[index];
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
        <br />

        <button type="submit">Regista-te!</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Ainda não és aluno da nossa escola?</p>
      <Link to={"/contacts"}>Contacta-nos!</Link>
    </div>
  );
}

export default SignupForm;
