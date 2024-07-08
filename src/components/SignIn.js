import React, { useContext, useState } from "react";
import authContext from "../context/authentication/authContext";

function SignIn(props) {
  const context = useContext(authContext);
  const { logging } = context;

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  // Handle OnChange
  const onChangeInputs = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const signIn = (e) => {
    e.preventDefault();
    logging(loginData);
  };
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            iNotebook sign-in form
          </h1>
          <p className="col-lg-10 fs-4">
            The iNotebook login page is designed to provide a secure, intuitive,
            and quick access point to your notes. Here’s what you need to know:
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            onSubmit={signIn}
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
          >
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={loginData.email}
                onChange={onChangeInputs}
                placeholder="name@example.com"
                required
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={onChangeInputs}
                value={loginData.password}
                minLength={5}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-dark" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
