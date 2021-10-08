import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

import imageDocumentPlaceholder from "../assets/images/document-placeholder.jpg";
import "./InvoicesPage.css";

const API_URL = process.env.REACT_APP_API_URL;

const Invoices = (props) => {
  const { user } = useContext(AuthContext);
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
    <section className="Invoices">
      <div className="container-xxl">
        <h2 className="text-rose">as minhas faturas</h2>

        <div className="row row-cols-auto mt-5">
          {documents.map(({ value, date, document_id }) => {
            console.log(documents);
            return (
              <div
                className="Invoices-item col-sm-12 col-md-6 col-lg-4 d-flex pb-5"
                key={document_id}
              >
                <div className="me-4">
                  <img
                    src={imageDocumentPlaceholder}
                    alt="document placholder"
                  />
                </div>
                <div className="info d-flex flex-column">
                  <h5 className="text-orange mb-2">{date}</h5>
                  <p>valor: {value}</p>
                  <button
                    className="button-secondary mt-auto mb-1"
                    onClick={() => handleDownloadDocument(document_id)}
                  >
                    download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Invoices;
