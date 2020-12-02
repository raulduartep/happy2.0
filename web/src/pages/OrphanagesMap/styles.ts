import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;

  display: flex;

  .leaflet-container {
    z-index: 5;
  }

  .map-popup .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255);
    border-radius: 20px;
    box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
  }

  .map-popup .leaflet-popup-content {
    color: #0089a5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .map-popup .leaflet-popup-content a {
    width: 40px;
    height: 40px;
    background: #15c3d6;
    border-radius: 12px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .map-popup .leaflet-popup-tip-container {
    display: none;
  }

  .create-orphanage {

    z-index: 10;

    position: absolute;
    right: 40px;
    bottom: 40px;

    width: 64px;
    height: 64px;
    background: #15c3d6;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color .2s;
  }

  .create-orphanage:hover {
    background: #17d6eb;
  }

  @media (max-width: 1100px){
    flex-direction: column;
  }
`;

export const Aside = styled.aside`
  width: 440px;
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
  padding: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    font-size: 40px;
    font-weight: 800;
    line-height: 42px;
    margin-top: 64px;
  }

  p {
    line-height: 28px;
    margin-top: 24px;
  }

  footer {

    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;

      line-height: 24px;

      strong {
        font-weight: 800;
      }
    }

    button {
      width: 48px;
      height: 48px;
      border: 0;

      background: #12AFCB;
      border-radius: 16px;

      cursor: pointer;

      transition: background-color 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    button:hover {
      background: #17D6EB;
    }
  }

  @media (max-width: 1100px){
    width: 100%;
    padding: 40px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    header {
      display: flex;
      align-items: center;
      width: 100%;
    }

    h2 {
      margin: 0 40px;
      font-size: 24px;
      flex-shrink: 0;
    }

    p {
      display: none;
    }

    footer {
      justify-content: space-around;
      width: 100%;
    }

  }
`;
