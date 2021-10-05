import "./Navbar.css";
import logoTurningPoint from "./../assets/images/logo-turningpoint.png";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);

  return (
    <nav className="Navbar-nav">
      <div class="container">
        <div className="Navbar-nav-left">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Link className="Navbar-nav-link" to="/about">
                sobre nós
              </Link>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="#">
                  <Link className="Navbar-nav-link" to="/teachers">
                    equipa docente
                  </Link>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <Link className="Navbar-nav-link" to="/gallery">
                    galeria
                  </Link>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <Link className="Navbar-nav-link" to="/contacts">
                    contactos
                  </Link>
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Link className="Navbar-nav-link" to="/dance-styles">
                modalidades
              </Link>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
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
              <Link className="Navbar-nav-link" to="/user">
                My Profile
              </Link>
              <Link className="Navbar-nav-link" to="/user/my-goals">
                My Goals
              </Link>
              {isAdmin && (
                <Link className="Navbar-nav-link" to="/admin">
                  Admin
                </Link>
              )}
              <button onClick={logOutUser}>Logout</button>
              <span>{user.username}</span>
              <img src={user.avatarUrl} width="40px" alt="" />
            </>
          ) : (
            <>
              <Link className="Navbar-nav-link" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
