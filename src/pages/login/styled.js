import styled from "styled-components";

export const Login = styled.div`
  max-width: 760px;
  width: 100%;
  border-radius: 10px;
  margin: 0 auto;
  transform: translateY(50%);
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 16%);
  h1 {
    color: ${({ theme }) => theme.colors.primary};
  }
  .section {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .login-section {
    width: 40%;
    padding: 10px 20px;
  }
  .login-title {
    text-align: center;
    padding: 24px 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    font-size: 26px;
  }
  .txt {
    color: #37454d;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .reg-txt {
    font-size: 16px;

    margin-bottom: 20px;
  }

  .register-btn {
    margin-top: "-10px";
    margin-bottom: "20px";
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.small}) {
    .login-section {
      width: auto;
    }
  }
`;
