import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function DanceClass(props) {
  console.log(props);
  const [danceClassContent, setDanceClassContent] = useState([]);

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
        setDanceClassContent(response.data);
      });
  }, []);

  return (
    <div>
      <h4>Hello {props.match.params.id}!</h4>
      <h2>Dance Class</h2>
      {danceClassContent.map((media) => {
        return (
          <div>
            {media.title} <br />
            <img src={media.fileUrl} alt="" width="300px" />
          </div>
        );
      })}
    </div>
  );
}

export default DanceClass;
