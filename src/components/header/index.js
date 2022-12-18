import * as S from "./styled";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <header>
        <h1 onClick={() => navigate("/")}>Travel App</h1>
      </header>
    </S.Header>
  );
};

export default Header;
