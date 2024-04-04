import React, { useState } from "react";
import "./Authentication.scss";
import Logo from "../../logo.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Link } from "react-router-dom";
import { auth } from "../../DB/database";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MdError } from "react-icons/md";

function Login() {
  const navigate = useNavigate(); // Use useNavigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // Implement login logic here
    if (email === "" || password === "") {
      // Add validation for empty fields
      setErrorMessage("Email and password cannot be empty.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        let userInfo = userCredential.user;

        // Navigate to the main/ page upon successful login
        navigate("/main/", {
          state: {
            userInfo: {
              userToken: userInfo.accessToken,
              userEmail: userInfo.email,
              userUid: auth.currentUser.uid,
            },
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-email":
            setErrorMessage("The email address is not valid.");
            break;
          case "auth/invalid-credential":
            setErrorMessage("Invalid credentials provided. Try again !");
            break;
          case "auth/user-disabled":
            setErrorMessage("The user account has been disabled.");
            break;
          case "auth/user-not-found":
            setErrorMessage(
              "There is no user corresponding to the given email."
            );
            break;
          case "auth/wrong-password":
            setErrorMessage("The password is incorrect.");
            break;
          case "auth/network-request-failed":
            setErrorMessage(
              "A network error occurred while trying to sign in."
            );
            break;
          case "auth/too-many-requests":
            setErrorMessage(
              "Too many unsuccessful login attempts. Please try again later."
            );
            break;
          case "auth/operation-not-allowed":
            setErrorMessage("The sign-in method is not enabled for this app.");
            break;
          case "auth/internal-error":
            setErrorMessage(
              "An internal error occurred. Please try again later."
            );
            break;
          case "auth/app-not-authorized":
            setErrorMessage(
              "This app is not authorized to use Firebase Authentication."
            );
            break;
          case "auth/expired-action-code":
            setErrorMessage(
              "The action code has expired. Please request a new one."
            );
            break;
          default:
            setErrorMessage(errorMessage);
        }
      });
  };
  const submitHandler = (event)=>{
    event.preventDefault();
    handleLogin();
  }
  return (
    <div className="container">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
        <p className="text">Sign In for QuickPickList</p>
      </div>
      <form className="input-container"  name= "loginForm" onSubmit={submitHandler}>
        <label htmlFor = "email" className="label">Email</label>
        <input
          className="input"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="label">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <p className="error">
            <MdError />
            {errorMessage}
          </p>
        )}

        <button className="button">
          Login
        </button>
        <Link to="/register" className="button-register">
          Not registered? Create an account
        </Link>
      </form>
    </div>
  );
}

export default Login;
