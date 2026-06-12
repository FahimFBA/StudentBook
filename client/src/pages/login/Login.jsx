import { Link } from "react-router-dom";
import "./login.scss";
import { use, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { isDemoMode } from "../../config";
import { demoCredentials } from "../../demo/demoApi";

const Login = () => {
  const [inputs, setInputs] = useState({
    user_name: isDemoMode ? demoCredentials.user_name : "",
    user_password: isDemoMode ? demoCredentials.user_password : "",
    // passwordAgain: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = use(AuthContext);

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
          <p className="eyebrow">Campus network</p>
          <h1>StudentBook</h1>
          <p>
            Stay close to classmates, articles, announcements, and career posts
            in one focused student space.
          </p>
          <Link to="/register" className="authLink">
            <button type="button">Create account</button>
          </Link>
        </div>
        <div className="right">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in</h2>
          </div>
          <form onSubmit={handleLogin}>
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
            {isDemoMode && (
              <div className="demoAccount">
                <span>Static demo account</span>
                <strong>{demoCredentials.user_name}</strong>
                <small>{demoCredentials.user_password}</small>
              </div>
            )}
            {err && <div className="authError">{err}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
