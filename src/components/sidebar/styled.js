import styled from "styled-components";

export const SideBar = styled.div`
  width: 15%;
  height: 100vh;
  border: 1px solid ${({ theme }) => theme.colors.primary} !important;
  color: ${({ theme }) => theme.colors.secondary};
`;
