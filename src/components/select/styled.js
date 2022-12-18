import styled from "styled-components";

export const Select = styled.div`
  margin-bottom: 20px;
  width: 100%;
  select {
    width: 100%;
    padding: 0;
    border: 1px solid
      ${({ theme, error }) => (error ? theme.colors.red : theme.colors.grey)};
    height: 40px;
  }

  select:focus {
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
