import * as S from "./styled";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => {
  return (
    <S.Loader>
      <ReactLoading type={type} color={color} />
    </S.Loader>
  );
};

export default Loader;
