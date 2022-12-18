import styled from "styled-components";

export const AuthHeader = styled.div`
  width: 100%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul {
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
  }
  li {
    padding: 0 30px;
  }

  a {
    color: ${({ theme }) => theme.colors.grey};
    text-decoration: none;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  h1 {
    padding: 10px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
    cursor: pointer;
  }

  .profile-section {
    border-left: 1px solid #eee;
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .profile {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .profile-box {
    position: absolute;
    bottom: -86px;
    width: 150px;
    z-index: 22 !important;
    padding: 10px;
    right: 5px;
    margin: 0 5px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;
  }
  .profile-box a {
    margin: 10px;
    display: block;
    text-decoration: underline;
  }

  .name {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 10px;
  }

  .email {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.lightGrey};
  }

  .circle {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.green};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(1.2rem);
  }
`;
