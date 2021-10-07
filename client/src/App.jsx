import "./App.css";
import { Switch, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import MyGoals from "./pages/MyGoals";
import Welcome from "./pages/Welcome";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import DanceClassPage from "./pages/DanceClassPage";
import InvoicesPage from "./pages/InvoicesPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import TeachersPage from "./pages/TeachersPage";
import AboutPage from "./pages/AboutPage";
import DanceStylesPage from "./pages/DanceStylesPage";

// Components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import Footer from "./components/Footer";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <main className="App-main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/teachers" component={TeachersPage} />
          <Route exact path="/gallery" component={() => <h1>Galeria</h1>} />
          <Route exact path="/contacts" component={() => <h1>Contactos</h1>} />

          <Route path="/dance-styles" component={DanceStylesPage} />
          <Route exact path="/schedules" component={() => <h1>Horários</h1>} />
          <Route
            exact
            path="/competition"
            component={() => <h1>Grupo de competição</h1>}
          />
          <Route path="/confirm-email" component={ConfirmEmailPage} />
          <Route path="/auth/confirm/:confirmationCode" component={Welcome} />

          {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
          <PrivateRoute exact path="/user" component={ProfilePage} />
          <PrivateRoute
            exact
            path="/user/my-invoices"
            component={InvoicesPage}
          />
          <PrivateRoute path="/dance-class/:id" component={DanceClassPage} />
          <PrivateRoute exact routeAdmin path="/admin" component={AdminPage} />
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
