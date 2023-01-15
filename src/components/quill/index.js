import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as S from "./styled";

const Quill = ({ value, onChange }) => {
  return (
    <S.Quill>
      <ReactQuill
        name="category"
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </S.Quill>
  );
};

export default Quill;
