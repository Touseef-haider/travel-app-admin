import * as S from "./styled";

const Select = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  options,
  name,
  props,
}) => {
  return (
    <S.Select {...props}>
      <p className="label">{label}</p>
      <select
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      >
        {options?.map((opt) => (
          <option value={opt?.value}>{opt?.item}</option>
        ))}
      </select>
      <small className="error">{error ? error : ""}</small>
    </S.Select>
  );
};

export default Select;
