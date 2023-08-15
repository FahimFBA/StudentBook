import { Link } from "react-router-dom";
import { useState } from "react";
import "./register.scss"

const Register = () => {

  const[inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    // passwordAgain: "",
    name: ""
  })

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Student
            Book</h1>
          <p>
            The only social media
            you need for your
            education and career needs.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login!</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" required />
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            {/* <input type="password" placeholder="Retype Password" required /> */}
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;