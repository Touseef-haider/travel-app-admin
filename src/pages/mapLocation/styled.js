import styled from "styled-components";

export const MapLocation = styled.div`
  /* display: flex; */
  .mapLocation {
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
    width: 100%;
    object-fit: cover;
  }
`;
