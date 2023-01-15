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
  multiple,
}) => {
  return (
    <S.Select {...props}>
      <p className="label">{label}</p>
      <select
        name={name}
        value={value}
        placeholder={placeholder}
        multiple={multiple}
        onChange={onChange}
        {...props}
      >
        <option value="" disabled selected>
          Select province
        </option>
        {options?.map((opt) => (
          <option key={opt?.item} value={opt?.value}>
            {opt?.item}
          </option>
        ))}
      </select>
      <small className="error">{error ? error : ""}</small>
    </S.Select>
  );
};

export default Select;
