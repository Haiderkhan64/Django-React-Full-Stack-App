import Form from "../components/Form.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="form-container">
      <Form route="/api/token/" method="login" />
      <br />

      <button className="form-button" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default Login;
