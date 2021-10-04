import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = (props) => {
  const { user, logInUser } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/my-invoices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setDocuments(response.data);
      });
  }, []);

  const handleDownloadDocument = (document_id) => {
    axios
      .get(`${API_URL}/user/download-document/${document_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const { url } = response.data;
        const directDownloadUrl = url.replace(
          "downloads/?",
          "downloads/index.php?action=getDownload&"
        );
        window.open(directDownloadUrl);
      });
  };

  return (
    <div className="container">
      <h1>
        <strong>Hello {user.username}</strong>
      </h1>
      <h3>Faturas</h3>
      <div>
        {documents.map(({ value, date, document_id }) => {
          return (
            <div key={document_id}>
              {value} <br />
              {date} <br />
              <button onClick={() => handleDownloadDocument(document_id)}>
                download
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
