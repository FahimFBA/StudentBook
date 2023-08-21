import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_email: "",
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
            />
            <input
              type="password"
              placeholder="Password"
              name="user_password"
              onChange={handleChange}
              required
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>

    // <section class="bg-gray-50 dark:bg-gray-900">
    //   <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //     <a
    //       href="#"
    //       class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    //     >
    //       <img
    //         class="w-8 h-8 mr-2"
    //         src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
    //         alt="logo"
    //       />
    //       StudentBook
    //     </a>
    //     <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //       <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    //         <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //           Sign in to your account
    //         </h1>
    //         <form class="space-y-4 md:space-y-6" action="#">
    //           <div>
    //             <input
    //               type="text"
    //               placeholder="Username"
    //               name="user_name"
    //               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               onChange={handleChange}
    //               required
    //             />
    //             {/* <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
    //             {/* <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/> */}
    //           </div>
    //           <div>
    //             <input
    //               type="password"
    //               placeholder="••••••••"
    //               name="user_password"
    //               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               onChange={handleChange}
    //               required=""
    //             />
    //           </div>
    //           <div class="flex items-center justify-between">
    //             <div class="flex items-start">
    //               <div class="flex items-center h-5">
    //                 <input
    //                   id="remember"
    //                   aria-describedby="remember"
    //                   type="checkbox"
    //                   class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
    //                   required=""
    //                 />
    //               </div>
    //               <div class="ml-3 text-sm">
    //                 <label
    //                   for="remember"
    //                   class="text-gray-500 dark:text-gray-300"
    //                 >
    //                   Remember me
    //                 </label>
    //               </div>
    //             </div>
    //             <a
    //               href="#"
    //               class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
    //             >
    //               Forgot password?
    //             </a>
    //           </div>
    //           {err && err}
    //           <button
    //             onClick={handleLogin}
    //             class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //           >
    //             Sign in
    //           </button>
    //           <p class="text-sm font-light text-gray-500 dark:text-gray-400">
    //             Don’t have an account yet?{" "}
    //             <a
    //               href="#"
    //               class="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //             >
    //               Sign up
    //             </a>
    //           </p>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Login;
