import "./App.css";
import { Switch, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import MyGoals from "./pages/MyGoals";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";

// Components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={() => <h1>Sobre Nós</h1>} />
        <Route
          exact
          path="/dance-styles"
          component={() => <h1>Modalidades</h1>}
        />
        <Route exact path="/schedules" component={() => <h1>Horários</h1>} />
        <Route exact path="/teachers" component={() => <h1>Professores</h1>} />
        <Route exact path="/gallery" component={() => <h1>Galeria</h1>} />
        <Route exact path="/contacts" component={() => <h1>Contactos</h1>} />
        <Route
          exact
          path="/competition"
          component={() => <h1>Grupo de competição</h1>}
        />
        <Route
          path="/confirm-email"
          component={() => <h1>Por favor confirme o seu email</h1>}
        />
        <Route path="/auth/confirm/:confirmationCode" component={Welcome} />

        {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
        <PrivateRoute exact path="/user" component={Profile} />
        <PrivateRoute
          exact
          path="/user/my-invoices"
          component={() => <h1>my invoices</h1>}
        />
        <PrivateRoute exact path="/user/my-goals" component={MyGoals} />
        <PrivateRoute
          exact
          path="/user/my-practices"
          component={() => <h1>my practices</h1>}
        />

        {/* <AnonRoute exact path="/signup" component={SignupPage} /> */}
        <AnonRoute exact path="/login" component={LoginPage} />

        {/* an invalid path -> Error page */}
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
