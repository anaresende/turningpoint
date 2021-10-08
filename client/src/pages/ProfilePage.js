import "./ProfilePage.css";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import EditProfile from "../components/EditProfile";

const Profile = (props) => {
  const { user } = useContext(AuthContext);

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
              <h5>
                {user.address}, {user.city}{" "}
              </h5>
            </div>
            <div className="Profile-information mt-3">
              <p>Contacto</p>
              <h5>{user.phone}</h5>
            </div>
            <div className="Profile-information mt-3">
              <p>Password</p>
              <h5>***********</h5>
            </div>
            <div className="Profile-information mt-3">
              {user?.danceClass && <p>Modalidades</p>}
              {user?.danceClass?.map(({ _id, style, level }) => {
                return (
                  <h5 key={_id}>
                    {style} {level}
                  </h5>
                );
              })}
            </div>
            <button
              className="mt-3 button-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalEditProfile"
            >
              Editar Perfil
            </button>

            <EditProfile />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
