import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useHistory } from "react-router-dom";
import "./EditProfile.css";

const API_URL = process.env.REACT_APP_API_URL;

function EditProfile() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, logInUser } = useContext(AuthContext);

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const danceClass = Object.keys(classes)
      .map((style) => {
        return form[style].value;
      })
      .filter(Boolean);

    let formData = new FormData();
    formData.append("avatarUrl", form.avatarUrl.files[0]);
    formData.append("username", form.username.value);
    formData.append("oldPassword", form.oldPassword.value);
    formData.append("newPassword", form.newPassword.value);
    formData.append("danceClass", danceClass);

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/user/edit/${user._id}`, formData)
      .then((response) => {
        const token = response.data.authToken;
        logInUser(token);
        setIsLoading(false);
        document.getElementById("button-dismiss-modal").click();
      })
      .catch((error) => {
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
    <div
      className="modal fade"
      id="modalEditProfile"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Perfil
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleEditProfileSubmit}>
            <div className="modal-body">
              <label>
                <p className="modal-labels">Foto:</p>
              </label>
              <br />
              <input type="file" name="avatarUrl" id="avatarUrl" />
              <br />
              <label>
                <p className="modal-labels">Username:</p>
              </label>
              <br />
              <input
                type="text"
                name="username"
                defaultValue={user.username}
                required
              />
              <br />
              <label>
                <p className="modal-labels">Antiga Password:</p>
              </label>
              <br />
              <input type="password" name="oldPassword" />
              <br />
              <label>
                <p className="modal-labels">Nova Password:</p>
              </label>
              <br />
              <input type="password" name="newPassword" />
              <br />
              {classes && (
                <label>
                  <p className="modal-labels">Modalidades:</p>
                </label>
              )}
              {Object.keys(classes).map((style) => {
                const styles = classes[style];

                const defaultValue = user.danceClass.find(
                  (item) => item.style === style
                );

                return (
                  <div key={style}>
                    <label
                      className="modal-option-class"
                      htmlFor={`${style}-select`}
                    >
                      {style}
                    </label>
                    <select
                      name={style}
                      id={`${style}-select`}
                      defaultValue={defaultValue?._id}
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
                    <br />
                  </div>
                );
              })}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn button-secondary"
                data-bs-dismiss="modal"
                id="button-dismiss-modal"
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
                Editar
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
