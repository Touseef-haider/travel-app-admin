import styled from "styled-components";

export const Header = styled.div`
  header {
    width: 100%;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h1 {
    padding: 10px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
    cursor: pointer;
  }
`;
