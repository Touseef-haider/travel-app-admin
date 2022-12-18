import styled from "styled-components";

export const Input = styled.div`
  margin-bottom: 20px;
  width: 100%;

  input {
    width: 100%;
    padding: 0;
    border: 1px solid
      ${({ theme, error }) => (error ? theme.colors.red : theme.colors.grey)};
    height: 40px;
  }

  input:focus {
    outline: none !important;
  }

  .label {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.darkGrey};
    font-weight: 600 !important;
    font-size: 14px;
  }

  .error {
    font-size: small;
    color: ${({ theme }) => theme.colors.red};
  }
`;
