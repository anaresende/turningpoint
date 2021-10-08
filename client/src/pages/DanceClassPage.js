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
          <h2 className="text-rose">
            {danceClass.style} - {danceClass.level}
          </h2>
        )}
        {danceClassContent.length === 0 && (
          <h5 className="mt-3">sem conteúdo</h5>
        )}
        {danceClassContent.map((media) => {
          return (
            <div className="my-5 py-2">
              <h5 className="text-orange mb-3">{media.title}</h5>
              {media.fileType?.includes("audio") && (
                <audio controls src={media.fileUrl}></audio>
              )}
              {media.fileType?.includes("image") && (
                <img src={media.fileUrl} width="600px" alt={`${media.title}`} />
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
