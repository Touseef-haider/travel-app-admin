import styled from "styled-components";

export const Category = styled.div`
  .section {
    padding: 0 30px;
  }
  .cat-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: 30px;
  }
  .card {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;
    padding: 30px 60px;
    position: relative;
    cursor: pointer;
    border: 1px;
  }
  .card img {
    position: absolute;
    right: 10px;
    cursor: pointer;
    top: 5px;
  }
`;
