import { NavLink } from "react-router-dom";
import * as S from "./styled";

const SideBar = () => {
  return (
    <S.SideBar>
      <NavLink to="/alerts" title="Alerts">
        Alerts
      </NavLink>
    </S.SideBar>
  );
};

export default SideBar;
