import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [Credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log("Clicked");
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Credentials.email,
        password: Credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    console.log(json.success);
    if (json.success) {
      localStorage.setItem("Auth-token", json.authToken);
      props.showAlert("Login Successfull", "success")
      navigate("/");
    }
    else {
      console.log(json.success);
      props.showAlert("Invalid Credentials", "danger")
    }
  };

  return (
    <div className="cotainer my-4">
      <div class="alert alert-primary" role="alert">
        Please login to continue
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email1"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
            value={Credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            value={Credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
