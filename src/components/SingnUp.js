import React, { useContext, useState } from "react";
import authContext from "../context/authentication/authContext";

function SingnUp() {
  const context = useContext(authContext);
  const { singnUp } = context;

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // Handle OnChange
  const onChangeInputs = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };
  const signUp = (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.cpassword) {
      alert("Password do not match");
    } else {
      singnUp(signUpData);
    }
  };
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            iNotebook sign-up form
          </h1>
          <p className="col-lg-10 fs-4">
            The iNotebook signup page is designed for a smooth and secure
            account creation process, ensuring you can start using the
            application with ease.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form method="post"
            onSubmit={signUp}
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Sahil kashyap"
                value={signUpData.name}
                onChange={onChangeInputs}
                required
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={signUpData.email}
                onChange={onChangeInputs}
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
                minLength={5}
                value={signUpData.password}
                onChange={onChangeInputs}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder="Password"
                minLength={5}
                value={signUpData.cpassword}
                onChange={onChangeInputs}
                required
              />
              <label htmlFor="cpassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign up
            </button>
            <hr className="my-4" />
            <small className="text-body-dark">
              By clicking Sign up, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SingnUp;
