import styled from "styled-components";

import footerImage from "../../assets/footer.svg";

export const Footer = styled.div`
  z-index: -1;
  .footer {
    padding: 10px 50px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;
    background-image: url(${footerImage});
    background-repeat: no-repeat;
    object-fit: cover;
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.white};
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 60px;
    position: relative;
    bottom: 0 !important;
    text-align: center;
  }
  .footer h1 {
    /* padding-top: 30px; */
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 15px;
  }
  .footer small {
    font-style: italic;
    color: ${({ theme }) => theme.colors.primary};
  }

  .copy-right {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
  }
`;
