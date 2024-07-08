import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";
function AuthState(props) {
  const navigate = useNavigate();

  let url = "http://localhost:5000/api/v1/";

  const logging = async ({ email, password }) => {
    const response = await fetch(`${url}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: String(email),
        password: String(password),
      }),
    });
    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem("auth-token", json.authtoken);
      console.log(json.authtoken);
      navigate("/");
    } else {
      console.log("Invalid credentials");
    }
  };

  const singnUp = async ({ name, email, password }) => {
    const response = await fetch(`${url}auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: String(email),
        password: String(password),
      }),
    });
    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem("auth-token", json.authtoken);
      console.log(json.authtoken);
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ logging, singnUp }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
