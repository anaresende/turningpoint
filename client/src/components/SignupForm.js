import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function SignupForm(props) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [classes, setClasses] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const closeModal = document.getElementById("button-dismiss-modal-register");
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
      .then((response) => {
        setIsLoading(false);
        closeModal.click();
        history.push("/confirm-email");
      })
      .catch((error) => {
        setIsLoading(false);

        const errorDescription = error?.response?.data?.message || "Error";
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
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">
                És nosso aluno e ainda não tens conta? <br />
                Regista-te!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSignupSubmit}>
              <div className="modal-body">
                <label>Foto:</label>
                <input type="file" name="avatarUrl" id="avatarUrl" />
                <br />
                <label>Número de Contribuinte:</label>
                <input
                  type="text"
                  name="vat"
                  minLength="9"
                  maxLength="9"
                  required
                />
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
                      <select
                        name={style}
                        id={`${style}-select`}
                        defaultValue=""
                      >
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
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="button-dismiss-modal-register"
                  className="button-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="button-primary">
                  {isLoading && (
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  Regista-te
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
