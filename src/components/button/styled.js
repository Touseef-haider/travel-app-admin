import styled, { css } from "styled-components";

export const Section = styled.div`
  display: inline;
  button {
    transition: all 0.1s;
    margin: 10px 20px 10px 0;
    font-size: 16px;
    height: 44px;
    cursor: pointer;
    border: 1px solid
      ${(props) =>
        props?.hasBackground
          ? props.theme.colors.primary
          : props.theme.colors.darkGrey};
    background-color: ${(props) =>
      props?.hasBackground
        ? props.theme.colors.primary
        : props.theme.colors.white};
    color: ${(props) =>
      props?.hasBackground
        ? props.theme.colors.white
        : props.theme.colors.darkGrey};
    ${({ size }) => {
      switch (size) {
        case "x-small":
          return `
      width: 110px !important;
      `;
        case "small":
          return `
      width: 130px;
    
      `;
        case "auto":
          return `
      width: auto;
      `;
        case "large":
          return `
        width: 100% !important;
        `;

        default:
          return css`
            height: 32px;
          `;
      }
    }}
  }

  button:hover {
    border: 1px solid
      ${(props) =>
        props?.hasBackground
          ? props.theme.colors.primary
          : props.theme.colors.darkGrey};
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.small}) {
    button {
      padding: 10px;
      ${({ size }) => {
        switch (size) {
          case "x-small":
            return `
        width: auto !important;
        `;
          case "small":
            return `
        width: auto  !important;
      
        `;
          case "auto":
            return `
        width: auto  !important;
        `;
          case "large":
            return `
          width: 100% !important;
          `;

          default:
            return css`
              height: 32px;
            `;
        }
      }}
    }
  }
`;
