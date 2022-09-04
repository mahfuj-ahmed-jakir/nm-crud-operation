import React, { useState, useContext, useEffect } from "react";
import { Store } from "../context/store";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  let { state, dispatch } = useContext(Store);
  let user = state.userInfo;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  let handleSubmit = async () => {
    if (!email && !password) {
      setErr("Fill the all details!");
    } else if (!email) {
      setErr("Enter your email!");
    } else if (!password) {
      setErr("Enter your password!");
    } else if (password.length < 7) {
      setErr("Password need minimum 8 character!");
    } else {
      const { data } = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      });
      setErr("");
      navigate("/");
      dispatch({ type: "USER_INFO", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data.currentUser));
    }
  };

  return (
    <div className="reg">
      <div id="singup">
        <div className="singup">
          <h2>Login your account!</h2>
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
          <p>{err}</p>
          <button onClick={handleSubmit}>Login</button>
          <Link to="/registration">You have don't account? Registration</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
