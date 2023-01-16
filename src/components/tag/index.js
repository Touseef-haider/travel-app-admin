import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

const Tag = (props) => {
  return (
    <S.Tag
      tip-title={props?.tipTitle ? props?.tipTitle : "double click to remove"}
      {...props}
    >
      {props.title}
    </S.Tag>
  );
};

Tag.defaultProps = {
  tipTitle: true,
};

Tag.propType = {
  tipTitle: PropTypes.bool,
};

export default Tag;
