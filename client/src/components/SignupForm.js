import { useState, useEffect } from "react";
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <form onSubmit={handleSignupSubmit} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">
                Regista-te!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="avatarUrl" className="form-label">
                  foto de perfil
                </label>
                <input
                  id="avatarUrl"
                  type="file"
                  name="avatarUrl"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="register-vat" className="form-label">
                  número de contribuinte
                </label>
                <input
                  id="register-vat"
                  type="text"
                  name="vat"
                  minLength="9"
                  maxLength="9"
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="register-username" className="form-label">
                  username
                </label>
                <input
                  id="register-username"
                  type="text"
                  name="username"
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="register-email" className="form-label">
                  email
                </label>
                <input
                  id="register-email"
                  type="text"
                  name="email"
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="register-password" className="form-label">
                  password
                </label>
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  className="form-control"
                  required
                />
              </div>
              {classes && <h5 className="mb-1">modalidades</h5>}
              {Object.keys(classes).map((style) => {
                const styles = classes[style];

                return (
                  <div className="mb-3" key={style}>
                    <label htmlFor={`${style}-select`} className="form-label">
                      {style}
                    </label>
                    <select
                      className="form-select"
                      name={style}
                      id={`${style}-select`}
                      defaultValue=""
                    >
                      <option value="">- escolhe a tua turma -</option>

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
            </div>
            <div className="modal-footer">
              <p className="error-message">{errorMessage && errorMessage}</p>
              <div>
                <button
                  type="button"
                  id="button-dismiss-modal-register"
                  className="button-secondary me-2"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
