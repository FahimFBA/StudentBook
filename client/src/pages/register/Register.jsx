import "./register.scss"

const Register = () => {
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
          <button>Login!</button>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" required />
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;