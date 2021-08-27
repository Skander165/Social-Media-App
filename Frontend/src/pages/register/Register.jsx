import "./register.css";

export default function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">ChtiouiSocial</h3>
          <span className="registerDesc">
            Connect With Friends And The World Around You On ChtiouiSocial
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
              <input placeholder="Username" className="registerInput" />
              <input placeholder="Email" className="registerInput" />
              <input placeholder="Password" className="registerInput" />
              <input placeholder="Password Again" className="registerInput" />
              <button className="registerButton">Register</button>
              <span className="registerForgot">Forgot Password?</span>
              <button className="registerRegisterButton">Log Into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
