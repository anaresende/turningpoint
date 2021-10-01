import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function LoginPage(props) {
  return (
    <div className="LoginPage">
      <SignupForm />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
