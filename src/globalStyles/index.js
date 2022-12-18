import { createGlobalStyle, css } from "styled-components";

const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  sub,
  sup,
  tt,
  var,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    /* line-height: 1; */
  }
  img {
    vertical-align: middle;
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      transition: 0.3s;
    }
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-family: "Poppins-Light";
  }
  .input {
    font-family: "Poppins-Light";
  }

  * {
    font-family: "Poppins-Light";
  }

  html {
    scroll-behavior: smooth;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .mt-50 {
    margin-top: 50px;
  }

  .primary {
    color: ${({ theme }) => theme.colors.primary};
  }

  .secondary {
    color: ${({ theme }) => theme.colors.primary};
  }

  .two-column-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
  }

  .text-align-center {
    text-align: center;
  }

  .display-none {
    display: none;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.small}) {
    .two-column-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

export default GlobalStyle;
