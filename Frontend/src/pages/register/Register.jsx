import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login")
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="register" onSubmit={handleSubmit}>
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">ChtiouiSocial</h3>
          <span className="registerDesc">
            Connect With Friends And The World Around You On ChtiouiSocial
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox">
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              type="email"
              ref={email}
              className="registerInput"
            />
            <input
              placeholder="Password"
              required
              type="password"
              ref={password}
              className="registerInput"
            />
            <input
              placeholder="Password Again"
              required
              type="password"
              ref={passwordAgain}
              className="registerInput"
            />
            <button type="submit" className="registerButton">
              Register
            </button>
            <button className="registerRegisterButton">Log Into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
