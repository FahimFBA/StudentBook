import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_password: "",
    // passwordAgain: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // await login(inputs).then((res) => {
      //   navigate("/");
      // });
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
      // console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Student Book</h1>
          <p>
            The only social media you need for your education and career needs.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register!</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="user_name"
              onChange={handleChange}
              required
              value={inputs.user_name}
            />
            <input
              type="password"
              placeholder="Password"
              name="user_password"
              onChange={handleChange}
              required
              value={inputs.user_password}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
