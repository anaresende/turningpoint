import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function LoginPage(props) {
  return (
    <div className="LoginPage">
      <div className="container-xxl mt-5 pt-5">
        <div className="row">
          <div className="col-6">
            <SignupForm />
          </div>
          <div className="col-6 ps-5 border-start">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
