import { Navigate } from "react-router-dom";
import { get } from "../utils/storage";

const Auth = ({ children }) => {
  const token = get("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Auth;
