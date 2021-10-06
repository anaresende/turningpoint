import "./ProfilePage.css";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = (props) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <section className="Profile">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="Profile-picture">
              <img src={user.avatarUrl} alt="" width="60px" />
            </div>
          </div>
          <div className="col-6">
            <h3 className="Profile-title">
              Olá <span>{user.username}</span> !
            </h3>
            <div className="Profile-information mt-3">
              <p>E-mail</p>
              <h5>{user.email}</h5>
            </div>
            <div className="Profile-information mt-3">
              <p>Morada</p>
              <h5>a minha address aqui</h5>
            </div>
            <div className="Profile-information mt-3">
              <p>Contacto</p>
              <h5>910000000</h5>
            </div>
            <div className="Profile-information mt-3">
              <p>Password</p>
              <h5>***********</h5>
            </div>
            <div className="Profile-information mt-3">
              <p>Modalidades</p>
              {user.danceClass.map(({ style, level }) => {
                return (
                  <h5>
                    {style} {level}
                  </h5>
                );
              })}
            </div>
            <button className="mt-3 button-primary">Editar Perfil</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
