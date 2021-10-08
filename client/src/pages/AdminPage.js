import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

import "./AdminPage.css";

const API_URL = process.env.REACT_APP_API_URL;

const AdminPage = (props) => {
  const { user } = useContext(AuthContext);
  const [mediaContent, setMediaContent] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [classes, setClasses] = useState([]);
  const [mediaMode, setMediaMode] = useState(false);
  const [mediaInsertLoading, setMediaInsertLoading] = useState(false);
  const closeModal = document.getElementById("button-dismiss-modal-add-media");

  const handleMediaSubmit = (e) => {
    setMediaInsertLoading(true);
    e.preventDefault();
    const form = e.currentTarget;
    let formData = new FormData();

    formData.append("fileUrl", form.fileUrl.files[0]);
    formData.append("danceClass", form.danceClass.value);
    formData.append("title", form.title.value);

    axios
      .post(`${API_URL}/admin/add-media-content`, formData)
      .then((response) => {
        setMediaMode(false);
        setMediaInsertLoading(false);
        closeModal.click();
        form.title.value = "";
        form.fileUrl.value = [];
      })
      .catch((error) => {
        const errorDescription =
          error?.response?.data?.message || "problem in uploading";

        setErrorMessage(errorDescription);
        setMediaInsertLoading(false);
        setMediaMode(false);
        setErrorMessage(false);
      });
  };

  const updateMediaList = () => {
    axios
      .get(`${API_URL}/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setClasses(response.data.classes);
        setMediaContent(response.data.media);
      });
  };

  useEffect(() => {
    updateMediaList();
  }, [mediaMode]);

  const handleDeleteMedia = (mediaId) => {
    axios
      .post(
        `${API_URL}/admin/delete-media`,
        {
          _id: mediaId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        updateMediaList();
      });
  };

  return (
    <section className="Admin">
      <div className="container-xxl py-5">
        <div className="Admin-hero mb-5 pb-4">
          <h2 className="text-rose">Olá {user.username}</h2>
          <h4 className="mt-5 mb-3">
            Adiciona conteúdos que queres partilhar com cada turma
          </h4>

          <button
            className="button-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalAddAdminContent"
            onClick={() => setMediaMode(true)}
          >
            Inserir Conteúdo
          </button>
        </div>

        {mediaContent &&
          mediaContent.map((item) => {
            return (
              <div className="Admin-item my-5 py-4" key={item._id}>
                <div className="d-flex justify-content-between">
                  <h5 className="text-orange">{item.title}</h5>
                  <button
                    className="button-secondary d-block"
                    type="submit"
                    onClick={() => handleDeleteMedia(item._id)}
                  >
                    Remover
                  </button>
                </div>
                <p className="mb-3">
                  {item.danceClass.style} - {item.danceClass.level}
                </p>

                {item.fileType?.includes("audio") && (
                  <audio controls src={item.fileUrl}></audio>
                )}
                {item.fileType?.includes("image") && (
                  <img src={item.fileUrl} alt={`${item.title}`} />
                )}
                {item.fileType?.includes("video") && (
                  <video src={item.fileUrl} controls></video>
                )}
              </div>
            );
          })}
        <div
          className="modal fade"
          id="modalAddAdminContent"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <form className="modal-content" onSubmit={handleMediaSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Insira Conteudo Media
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="button-dismiss-modal-add-media"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="danceClass" className="form-label">
                    Selecione a turma
                  </label>
                  <select
                    name="danceClass"
                    className="form-select"
                    id="danceClass"
                  >
                    {classes.map((danceClass, index) => {
                      return (
                        <option
                          key={danceClass._id}
                          value={danceClass._id}
                        >{`${danceClass.style} - ${danceClass.level}`}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="fileUrl">
                    Selecione o ficheiro media
                  </label>
                  <br />
                  <input
                    className="form-control"
                    type="file"
                    name="fileUrl"
                    id="fileUrl"
                  />
                </div>
              </div>
              <div className="modal-footer flex-column align-items-end">
                <p className="error-message">{errorMessage && errorMessage}</p>
                <div>
                  <button
                    type="button"
                    className="button-secondary me-2"
                    data-bs-dismiss="modal"
                    id="button-dismiss-modal-add-goal"
                  >
                    Cancelar
                  </button>
                  <button className="button-primary" type="submit">
                    {mediaInsertLoading && (
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    Inserir Media
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
