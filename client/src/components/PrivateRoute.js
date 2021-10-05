import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { useHistory } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(props) {
  const { to, exact, component: Component, routeAdmin, ...restProps } = props;
  const history = useHistory();
  const { isLoggedIn, isLoading, isAdmin } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) return <Redirect to="/login" />;

  // If route is only for admins user without permissions cannot access and
  // stay on the same page
  if (routeAdmin && !isAdmin) {
    console.log(history);
    return history.goBack();
  }

  return <Route to={to} exact={exact} component={Component} {...restProps} />;
}

export default PrivateRoute;
