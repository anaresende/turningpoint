import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../context/auth.context"; // <== IMPORT

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/user/my-goals">My Goals</Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user.name}</span>
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
