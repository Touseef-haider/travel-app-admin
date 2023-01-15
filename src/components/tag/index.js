import React from "react";

import * as S from "./styled";

const Tag = (props) => {
  return (
    <S.Tag tip-title="double click to remove" {...props}>
      {props.title}
    </S.Tag>
  );
};

export default Tag;
