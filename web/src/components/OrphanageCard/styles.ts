import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 20px;
  background-color: #FFFFFF;
  border: 1px solid #D3E2E5;
  width: 100%;
  max-width: 550px;

  .leaflet-container {
    border-bottom: 1px solid #DDE3F0;
    border-radius: 20px;
    max-height: 230px;
    z-index: 1;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;

    h3 {
      color: #4D6F80;
      font-weight: 700;
      font-size: 24px;
      padding: 24px 0;
    }

    div {
      display: flex;
    }

    a, button {
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: #EBF2F0;
      border: none;
      color: #15C3D6;
      height: 48px;
      width: 48px;
      border-radius: 16px;
      cursor: pointer;

      &:hover {
        background-color: #F8FBFA;
      }
    }
    
  }
`;

export const ButtonWithMargin = styled.button`
  margin-right: 8px;
`;
