import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/user">My Profile</Link>
          <Link to="/user/my-goals">My Goals</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          <button onClick={logOutUser}>Logout</button>
          <span>{user.username}</span>
          <img src={user.avatarUrl} width="40px" alt="" />
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
