import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="form-container">
      <Form route="/api/user/register" method="register" />
      <br />
      <button className="form-button" onClick={() => navigate("/login")}>
        LogIn
      </button>
    </div>
  );
};

export default Register;
