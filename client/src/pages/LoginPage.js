import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function LoginPage(props) {
  return (
    <section className="LoginPage">
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
            <LoginForm />
            <button
              type="button"
              className="button-secondary mt-5"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              criar conta
            </button>
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
