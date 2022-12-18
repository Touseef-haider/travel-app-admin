import React from "react";
import Header from "../components/header/";
const UnAuthLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default UnAuthLayout;
