import styled from "styled-components";

export const Tag = styled.span`
  cursor: pointer;
  background-color: ${({ color, theme }) =>
    color === "primary" ? theme.colors.primary : theme.colors.secondary};
  border: 1px solid
    ${({ color, theme }) =>
      color === "secondary" ? theme.colors.primary : "none"};
  padding: 10px 30px;
  margin: 5px 15px;
  border-radius: 20px;
  width: fit-content;
  position: relative;

  &:hover::before {
    visibility: visible;
  }

  &::before {
    content: "double click to remove";
    font-size: x-small;
    position: absolute;
    width: 100%;
    color: #fff;
    top: -25px;
    left: 50%;
    transform: translate(-50%, 0);
    visibility: hidden;
    background-color: ${({ theme }) => theme.colors.grey};
    padding: 5px;
    border-radius: 10px;
  }
`;
