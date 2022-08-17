import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Navbar.css";
import logoTurningPoint from "./../assets/images/logo-turningpoint.png";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);

  return (
    <header className="Navbar-nav">
      <nav class="container-xxl navbar navbar-expand-lg navbar-light ">
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="26px"
            height="26px"
          >
            <path
              stroke="#ea5e53"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="2"
              d="M4 7h22M4 15h22M4 23h22"
            />
          </svg>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="Navbar-nav-left">
            <div className="dropdown">
              <button
                className="btn Navbar-nav-link dropdown-toggle ps-0 border-0 "
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                escola
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item Navbar-nav-link" to="/about">
                    sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item Navbar-nav-link"
                    to="/teachers"
                  >
                    equipa docente
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item Navbar-nav-link"
                    to="/competition"
                  >
                    grupo de competição
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item Navbar-nav-link"
                    to="/contacts"
                  >
                    contactos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle Navbar-nav-link"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                modalidades
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <HashLink
                    className="dropdown-item Navbar-nav-link"
                    to="/dance-styles#ballet"
                    smooth
                  >
                    ballet
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    className="dropdown-item Navbar-nav-link"
                    to="/dance-styles#contemporaneo"
                    smooth
                  >
                    contemporâneo
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    className="dropdown-item Navbar-nav-link"
                    to="/dance-styles#commercial"
                    smooth
                  >
                    commercial
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    className="dropdown-item Navbar-nav-link"
                    to="/dance-styles#jazz"
                    smooth
                  >
                    jazz
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    className="dropdown-item Navbar-nav-link"
                    to="/dance-styles#pilates"
                    smooth
                  >
                    pilates clínico
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    className="dropdown-item Navbar-nav-link"
                    to="/dance-styles#latinas"
                    smooth
                  >
                    latinas
                  </HashLink>
                </li>
              </ul>
            </div>

            <Link className="Navbar-nav-link" to="/schedules">
              horários
            </Link>
          </div>
        </div>
        <div className="Navbar-nav-center">
          <Link to="/">
            <img src={logoTurningPoint} alt="logo turning point" />
          </Link>
        </div>
        {/* <div className="Navbar-nav-right">
          {isLoggedIn ? (
            <>
              {user?.danceClass?.length > 0 && (
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle Navbar-nav-link"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    turmas
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {user?.danceClass?.map((item) => {
                      return (
                        <li key={`nav-item-${item._id}`}>
                          <Link
                            className="dropdown-item Navbar-nav-link"
                            to={`/dance-class/${item._id}`}
                          >
                            {item.style} - {item.level}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <Link className="Navbar-nav-link" to="/user/my-goals">
                objectivos
              </Link>
              <div className="dropdown">
                <button
                  className="btn Navbar-nav-link dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="dropdownMenuButtonLogged"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.avatarUrl && (
                    <div className="Navbar-nav-avatar me-3">
                      <img src={user.avatarUrl} alt="avatar" />
                    </div>
                  )}
                  <p>{user.username}</p>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButtonLogged"
                >
                  <li>
                    <Link className="dropdown-item  Navbar-nav-link" to="/user">
                      meu perfil
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link
                        className="dropdown-item  Navbar-nav-link"
                        to="/admin"
                      >
                        admin
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      className="dropdown-item Navbar-nav-link"
                      to="/user/my-invoices"
                    >
                      documentos
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item Navbar-nav-link"
                      onClick={logOutUser}
                    >
                      logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link className="Navbar-nav-link" to="/login">
                Login
              </Link>
            </>
          )}
        </div> */}
      </nav>
    </header>
  );
}

export default Navbar;
