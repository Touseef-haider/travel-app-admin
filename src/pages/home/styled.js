import styled from "styled-components";

export const Home = styled.div`
  h1 {
    color: ${({ theme }) => theme.colors.grey};
    font-size: 20px;
    margin-bottom: 10px;
  }
  .album {
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;
    margin: 10px;
  }
`;
