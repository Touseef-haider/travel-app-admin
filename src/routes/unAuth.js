import { get } from "../utils/storage";
import { Navigate } from "react-router-dom";

const UnAuth = ({ children }) => {
  const token = get("token");

  if (token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default UnAuth;
