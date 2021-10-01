import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
  
  const { to, exact, component: Component, ...restProps } = props;
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) return <Redirect to="/login" />;


	return <Route to={to} exact={exact} component={Component} {...restProps} />
}

export default PrivateRoute;