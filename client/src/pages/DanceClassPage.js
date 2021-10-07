import { useEffect, useState } from "react";
import axios from "axios";
import "./DanceClassPage.css";

const API_URL = process.env.REACT_APP_API_URL;

function DanceClass(props) {
  console.log(props);
  const [danceClassContent, setDanceClassContent] = useState([]);
  const [danceClass, setDanceClass] = useState(null);

  useEffect(() => {
    const danceClassId = props.match.params.id;

    axios
      .get(`${API_URL}/user/dance-class/${danceClassId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setDanceClass(response.data.danceClass);
        setDanceClassContent(response.data.media);
      })
      .catch(() => {
        setDanceClass(null);
        setDanceClassContent([]);
      });
  }, [props.match.params.id]);

  console.log(danceClassContent, danceClass);
  return (
    <section className="DanceClass">
      <div className="container-xxl py-5">
        {danceClass && (
          <h3>
            {danceClass.style} - {danceClass.level}
          </h3>
        )}
        {danceClassContent.length === 0 && <h5>Sem conteudo</h5>}
        {danceClassContent.map((media) => {
          return (
            <div>
              {media.title} <br />
              {media.fileType?.includes("audio") && (
                <audio controls src={media.fileUrl}></audio>
              )}
              {media.fileType?.includes("image") && (
                <img src={media.fileUrl} width="400px" alt={`${media.title}`} />
              )}
              {media.fileType?.includes("video") && (
                <video src={media.fileUrl} controls width="400px"></video>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DanceClass;
