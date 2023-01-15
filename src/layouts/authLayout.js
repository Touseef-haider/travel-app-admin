import React from "react";
import AuthHeader from "../components/authHeader";
import SideBar from "../components/sidebar/";
import * as S from "./styled";

const AuthLayout = ({ children, showFooter }) => {
  return (
    <S.Layouts>
      <AuthHeader />
      <div className="menu">
        <SideBar />
        <div className="right-section">{children}</div>
      </div>
    </S.Layouts>
  );
};

export default AuthLayout;
