import * as S from "./styled";

const TextArea = (props) => {
  return (
    <S.TextArea {...props}>
      <p className="label">{props?.label}</p>
      <textarea
        placeholder={props?.placeholder}
        onChange={props?.onChange}
        rows={7}
        cols={5}
        {...props}
      >
        {props?.value}
      </textarea>
      <small className="error">{props?.error ? props?.error : ""}</small>
    </S.TextArea>
  );
};

export default TextArea;
