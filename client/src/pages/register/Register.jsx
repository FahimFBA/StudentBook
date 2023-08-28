import { Link } from "react-router-dom";
import { useState } from "react";
import "./register.scss";
import axios from "axios";

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
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Student Book</h1>
          <p>
            The only social media you need for your education and career needs.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login!</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
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
            {/* <input type="password" placeholder="Retype Password" required /> */}
            {/* {err && <span className="error">Something went wrong!</span>} */}
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
