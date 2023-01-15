import styled from "styled-components";

export const SideBar = styled.div`
  width: 10%;
  height: 100vh;
  top: 20px;
  position: sticky;
  padding: 20px 30px;
  border: 1px solid ${({ theme }) => theme.colors.primary} !important;
  color: ${({ theme }) => theme.colors.secondary};
  div {
    margin-bottom: 20px;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
  a.active {
    color: ${({ theme }) => theme.colors.grey};
    text-decoration: underline;
  }
`;
