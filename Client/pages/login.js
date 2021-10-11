import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("nomi@hmao.com");
  const [password, setPassword] = useState("1111");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      console.log("login response", data);
      // toast.success("Registration Successfull pleasL login");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-3 mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            required
          />
          <input
            type="password"
            className="form-control mb-4 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            required
          />
          <button
            type="submit"
            className="btn col-md-4 offset-md-4 btn-primary "
          >
            Submit
          </button>
        </form>
        <p className="text-center p-3">
          Not yet registered?
          <Link href="/register">
            <a> Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
