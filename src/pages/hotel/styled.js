import styled from "styled-components";

export const Hotel = styled.div`
  .section {
    padding: 0 30px;
  }
  .images {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }
  .image-holder {
    box-shadow: rgb(0 0 0 / 16%) 0px 0px 3px 0px;
    display: flex;
    height: 30vh;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    position: relative;
    margin-bottom: 10px;
  }
  .image-delete-btn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 3px;
    cursor: pointer;
  }
  .image-holder .image {
    width: 100px;
    height: 100px;
    align-self: center;
  }
  .cat-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: 30px;
  }
  .card {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;
    padding: 10px;
    position: relative;
    cursor: pointer;
    border: 1px;
  }
  .card > * {
    margin: 10px;
  }
  .card .delete {
    position: absolute;
    right: 10px;
    object-fit: cover;
    cursor: pointer;
    top: 5px;
  }
`;
