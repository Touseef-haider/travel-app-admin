import styled from "styled-components";

export const TextArea = styled.div`
  margin-bottom: 20px;
  width: 100%;

  textarea {
    width: 100%;
    padding: 0;
    border: 1px solid
      ${({ theme, error }) => (error ? theme.colors.red : theme.colors.grey)};
  }

  textarea:focus {
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
