import React, { useState } from "react";
import axios from "axios";
import CreateUser from "./User";
import "./app.css";
import chritmas from "./christmas-tree.png";

const LoginForm = () => {
  const [user, setUser] = useState({
    loginUsername: "",
    loginPassword: "",
  });
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = {
      loginUsername: user.loginUsername,
      loginPassword: user.loginPassword,
    };
    axios.post("../../login", loginInfo).then((response) => {
      console.log(response);
      if (response.data === "pass") {
        localStorage.setItem("username", user.loginUsername);
        localStorage.setItem("password", user.loginPassword);
        window.location.reload();
      } else {
        setError("Incorect Username or Password");
      }
    });
  };

  function handleChanges(event) {
    const { name, value } = event.target;

    setUser((prevNote) => {
      if (name === "loginUsername") {
        return {
          ...prevNote,
          [name]: value,
        };
      } else if (name === "loginPassword") {
        return {
          ...prevNote,
          [name]: value,
        };
      }
    });
  }

  const signup = () => {
    setNewUser(!newUser);
  };
  if (newUser === false) {
    return (
      <div className="text-center body">
        <main className="form-signin">
          <img class="mb-4" src={chritmas} alt="" width="144" height="114" />
          <h1 className="title">jMessage Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating">
              <input
                type="text"
                name="loginUsername"
                value={user.loginUsername}
                onChange={handleChanges}
                className="form-control input"
                placeholder="Username"
                required
              />
              <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                name="loginPassword"
                value={user.loginPassword}
                onChange={handleChanges}
                className="form-control input"
                placeholder="Password"
                required
              />
              <label for="floatingPassword">Password</label>
            </div>

            <button type="submit" className="w-100 btn btn-lg btn-primary">
              <span>Start Chatting</span>
            </button>

            <h2 className="error">{error}</h2>
          </form>
          <button className="w-50 btn btn-sm btn-secondary" onClick={signup}>
            Sign up
          </button>
          <div>{newUser}</div>
        </main>
      </div>
    );
  } else {
    return <CreateUser newUser={signup} />;
  }
};

export default LoginForm;
