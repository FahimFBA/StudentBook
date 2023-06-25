import "./login.scss"

const Login = () => {
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Student
                        Book</h1>
                    <p>
                        The only social media
                        you need for your
                        education and career needs.
                    </p>
                    <span>Don't you have an account?</span>
                    <button>Register!</button>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" required />
                        <input type="password" placeholder="Password" required />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login