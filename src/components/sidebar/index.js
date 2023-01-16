import { NavLink } from "react-router-dom";
import * as S from "./styled";

const SideBar = () => {
  return (
    <S.SideBar>
      <div>
        <NavLink to="/alerts" title="Alerts">
          Add Places
        </NavLink>
      </div>
      <div>
        <NavLink to="/category" title="Category">
          Add Category
        </NavLink>
      </div>
      <div>
        <NavLink to="/province" title="Province">
          Add Province
        </NavLink>
      </div>
      <div>
        <NavLink to="/hotel" title="Hotel">
          Add Hotel
        </NavLink>
      </div>
    </S.SideBar>
  );
};

export default SideBar;
