import * as S from "./styled";
const Button = (props) => (
  <S.Section {...props}>
    <button {...props}>{props?.title}</button>
  </S.Section>
);

export default Button;
