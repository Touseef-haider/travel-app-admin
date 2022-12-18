import * as S from "./styled";

const Input = (props) => {
  return (
    <S.Input {...props}>
      <p className="label">{props?.label}</p>
      <input
        value={props?.value}
        placeholder={props?.placeholder}
        onChange={props?.onChange}
        {...props}
      />
      <small className="error">{props?.error ? props?.error : ""}</small>
    </S.Input>
  );
};

export default Input;
