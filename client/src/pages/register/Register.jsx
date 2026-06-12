import { Link } from "react-router-dom";
import { useState } from "react";
import "./register.scss";
import { makeRequest } from "../../axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_fullname: "",
    user_occ: "",
    user_email: "",
    user_password: "",
    // passwordAgain: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await makeRequest.post("/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <p className="eyebrow">Join the network</p>
          <h1>StudentBook</h1>
          <p>
            Build your campus profile and stay connected to the people, posts,
            and opportunities that matter.
          </p>
          <Link to="/login" className="authLink">
            <button type="button">Sign in instead</button>
          </Link>
        </div>
        <div className="right">
          <div>
            <p className="eyebrow">Create account</p>
            <h2>Register</h2>
          </div>
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              name="user_name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Name"
              name="user_fullname"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Occupation"
              name="user_occ"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="user_email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="user_password"
              onChange={handleChange}
              required
            />
            {err && <div className="authError">{err}</div>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
