import "./Navbar.css";
import logoTurningPoint from "./../assets/images/logo-turningpoint.png";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);

  console.log("user", user);
  return (
    <header className="Navbar-nav">
      <nav className="container-xxl">
        <div className="Navbar-nav-left">
          <div className="dropdown">
            <button
              className="btn Navbar-nav-link dropdown-toggle ps-0"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              escola
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link className="dropdown-item Navbar-nav-link" to="/about">
                  sobre nós
                </Link>
              </li>
              <li>
                <Link className="dropdown-item Navbar-nav-link" to="/teachers">
                  equipa docente
                </Link>
              </li>
              <li>
                <Link className="dropdown-item Navbar-nav-link" to="/gallery">
                  galeria
                </Link>
              </li>
              <li>
                <Link className="dropdown-item Navbar-nav-link" to="/contacts">
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
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link
                  className="dropdown-item Navbar-nav-link"
                  to="/dance-styles#ballet"
                >
                  ballet
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item Navbar-nav-link"
                  to="/dance-styles#contemporaneo"
                >
                  contemporâneo
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item Navbar-nav-link"
                  to="/dance-styles#commercial"
                >
                  commercial
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item Navbar-nav-link"
                  to="/dance-styles#jazz"
                >
                  jazz
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item Navbar-nav-link"
                  to="/dance-styles#latinas"
                >
                  latinas
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item Navbar-nav-link"
                  to="/dance-styles#pilates-clinico"
                >
                  pilates clínico
                </Link>
              </li>
            </ul>
          </div>

          <Link className="Navbar-nav-link" to="/schedules">
            horários
          </Link>
        </div>
        <div className="Navbar-nav-center">
          <Link to="/">
            <img src={logoTurningPoint} alt="logo turning point" />
          </Link>
        </div>
        <div className="Navbar-nav-right">
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
