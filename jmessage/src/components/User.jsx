import React, { useState } from "react";
import axios from "axios";

function CreateUser(props) {
  const [error, setError] = useState("");
  const [box, setBox] = useState({
    username: "",
    first: "",
    last: "",
    secret: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setBox((prevNote) => {
      if (name === "username") {
        return {
          ...prevNote,
          [name]: value,
        };
      } else if (name === "first") {
        return {
          ...prevNote,
          [name]: value,
        };
      } else if (name === "last") {
        return {
          ...prevNote,
          [name]: value,
        };
      } else if (name === "secret") {
        return {
          ...prevNote,
          [name]: value,
        };
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const createU = {
      username: box.username,
      first: box.first,
      last: box.last,
      secret: box.secret,
    };
    axios.post("../../user", createU).then((response) => {
      console.log(response);
      if (response.data === "pass") {
        window.location.reload();
      } else {
        setError("Username already taken");
      }
    });
  };

  return (
    <div className="body">
      <main className="form-signin">
        <h1 className="title">Sign-Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="box1"
              name="username"
              onChange={handleChange}
              value={box.username}
              placeholder="Username"
              required
            />
            <label for="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="box2"
              name="first"
              onChange={handleChange}
              value={box.first}
              placeholder="First Name"
              required
            />
            <label for="floatingInput">First Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="box3"
              name="last"
              onChange={handleChange}
              value={box.last}
              placeholder="Last Name"
              required
            />
            <label for="floatingInput">Last Name</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="box4"
              name="secret"
              onChange={handleChange}
              value={box.secret}
              placeholder="Password"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button type="submit" className="w-100 btn btn-lg btn-primary">
            Register
          </button>
          <h2>{error}</h2>
        </form>
        <button
          onClick={props.newUser}
          className="w-50 btn btn-sm btn-secondary"
        >
          Already registered?
        </button>
      </main>
    </div>
  );
}

export default CreateUser;
