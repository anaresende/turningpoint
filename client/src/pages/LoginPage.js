import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function LoginPage(props) {
  return (
    <section className="LoginPage">
      <div className="container-xxl ">
        <div className="row justify-content-center">
          <div className="col-4">
            <LoginForm />
            <div className="text-center">
              <p className="mt-4">és nosso aluno e não estás registado ?</p>
              <button
                type="button"
                className="styled-link mt-1 mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                criar conta
              </button>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
