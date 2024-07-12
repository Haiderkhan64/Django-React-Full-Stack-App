import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import NotFound from "./pages/notFound.jsx";
import Home from "./pages/home.jsx";

const Logout = () => {
  localStorage.clear();

  return <Navigate to="/login" />;
};

const RegisterLogin = () => {
  localStorage.clear();
  return <Register />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home Logout={Logout} />
            </ProtectedRoute>
          }
        />
        s
        <Route path="/register" element={<RegisterLogin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
