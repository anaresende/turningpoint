import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const AdminPage = (props) => {
  const { user, logInUser, isAdmin } = useContext(AuthContext);
  const [mediaContent, setMediaContent] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [classes, setClasses] = useState([]);
  const [mediaMode, setMediaMode] = useState(false);
  const [mediaInsertLoading, setMediaInsertLoading] = useState(false);

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
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log(error);
        setErrorMessage("problem in uploading");
        setMediaInsertLoading(false);

        setTimeout(() => {
          setMediaMode(false);
          setErrorMessage(false);
        }, 1500);
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

  console.log(mediaContent);

  return (
    <div className="container">
      <h1>
        <strong>Hello Admin {user.username}</strong>
      </h1>
      {!mediaMode && (
        <>
          <ul>
            {mediaContent &&
              mediaContent.map((item) => {
                return (
                  <li key={item._id}>
                    <p>
                      <strong>{item.title}</strong>
                      <br />
                      {item.danceClass.style} - {item.danceClass.level}
                    </p>
                    {item.fileType?.includes("audio") && (
                      <audio controls src={item.fileUrl}></audio>
                    )}
                    {item.fileType?.includes("image") && (
                      <img src={item.fileUrl} width="40px" />
                    )}
                    {item.fileType?.includes("video") && (
                      <video src={item.fileUrl} controls width="400px"></video>
                    )}
                    <br />

                    <button
                      type="submit"
                      onClick={() => handleDeleteMedia(item._id)}
                    >
                      remover media
                    </button>
                  </li>
                );
              })}
          </ul>
          <br />
          <br />

          <button onClick={() => setMediaMode(true)}>Add Media Content</button>
        </>
      )}
      {mediaMode && (
        <>
          <h3>Insira Conteudo Media</h3>
          <form onSubmit={handleMediaSubmit}>
            <label htmlFor="title">Título</label> <br />
            <input type="text" name="title" id="title" />
            <br />
            <br />
            <label htmlFor="danceClass">Selecione a turma</label>
            <br />
            <select name="danceClass" id="danceClass">
              {classes.map((danceClass) => {
                return (
                  <option
                    key={danceClass._id}
                    value={danceClass._id}
                  >{`${danceClass.style} - ${danceClass.level}`}</option>
                );
              })}
            </select>
            <br />
            <br />
            <label htmlFor="">Selecione o ficheiro media</label>
            <br />
            <input type="file" name="fileUrl" id="fileUrl" />
            <br />
            <br />
            <button type="submit">Inserir Media</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </>
      )}
      {mediaInsertLoading && <p>Loading insertion....</p>}
    </div>
  );
};

export default AdminPage;
