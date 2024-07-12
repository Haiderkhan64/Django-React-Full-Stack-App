import api from "./../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

const Form = ({ route, method }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  isLoading;
  const navigate = useNavigate();

  const pageName = method === "login" ? "LogIn" : "Register";

  const formHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={formHandler} className="form-container">
      <h1>{pageName}</h1>
      <input
        className="input-form"
        type="text"
        value={username}
        placeholder="UserName"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className="input-form"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {isLoading && (
        <div>
          <div>
            <LoadingIndicator />
          </div>
        </div>
      )}
      <br />
      <button className="form-button">{pageName}</button>
    </form>
  );
};

Form.propTypes = {
  route: PropTypes.node.isRequired,
  method: PropTypes.node.isRequired,
};

export default Form;
