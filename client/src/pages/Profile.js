import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = (props) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container">
      <h1>
        <strong>Hello {user.username}</strong>
        <img src={user.avatarUrl} alt="" width="60px" />
      </h1>
    </div>
  );
};

export default Profile;
