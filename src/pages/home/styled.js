import styled from "styled-components";

export const Home = styled.div`
  padding: 0 30px;
  .album {
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;
    margin: 10px;
  }
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    height: 200px;
  }
  .gallery {
    width: 100%;
    height: 100%;
  }
`;
