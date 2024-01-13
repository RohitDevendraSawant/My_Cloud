import React,{useState} from "react";
import { useNavigate } from "react-router-dom";


function Signup(props) {
  const [Credentials, setCredentials] = useState({name : "",email : "", password : "" });
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    console.log("Clicked");
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser",{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name : Credentials.name,
        email: Credentials.email,
        password: Credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("Auth-token", json.authToken);
      props.showAlert("Account Created","success")
      navigate("/login/"); 
    }
    else{
      props.showAlert("Invalid details","danger")
    }
    
  };

  const onChange = (e)=>{
    setCredentials({...Credentials, [e.target.name]:e.target.value})
  }

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name = "name"
            onChange={onChange}
            required
            minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            required
            
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
