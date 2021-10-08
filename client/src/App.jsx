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
import SchedulePage from "./pages/SchedulePage";
import CompetitionGroupPage from "./pages/CompetitionGroupPage";
import ContactsPage from "./pages/ContactsPage";

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
          <Route exact path="/contacts" component={ContactsPage} />

          <Route path="/dance-styles" component={DanceStylesPage} />
          <Route exact path="/schedules" component={SchedulePage} />
          <Route exact path="/competition" component={CompetitionGroupPage} />
          <Route path="/confirm-email" component={ConfirmEmailPage} />
          <Route path="/auth/confirm/:confirmationCode" component={Welcome} />

          <PrivateRoute exact path="/user" component={ProfilePage} />
          <PrivateRoute
            exact
            path="/user/my-invoices"
            component={InvoicesPage}
          />
          <PrivateRoute path="/dance-class/:id" component={DanceClassPage} />
          <PrivateRoute exact routeAdmin path="/admin" component={AdminPage} />
          <PrivateRoute exact path="/user/my-goals" component={MyGoals} />

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
