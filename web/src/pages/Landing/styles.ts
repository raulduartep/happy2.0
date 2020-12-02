import styled from 'styled-components';

import backgroundImg from '../../assets/images/landing.svg';


export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  position: relative;

  width: 100%;
  max-width: 1050px;

  margin: 0 50px;

  height: 100%;
  max-height: 680px;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 30% 70%;

  background: url(${backgroundImg}) no-repeat 80% center;

  header {
    align-self: flex-start;
    justify-self: flex-start;

    display: flex;
  }

  main {
    align-self: flex-end;
    justify-self: flex-start;

    max-width: 350px;

    h1 {
      font-size: 76px;
      font-weight: 900;
      line-height: 70px;
    }

    p {
      margin-top: 40px;
      font-size: 24px;
      line-height: 34px;
    }

    @media (max-width: 900px) {
      grid-area: 2;
    }
  }

  .enter-app {

    align-self: flex-end;
    justify-self: flex-end;

    width: 80px;
    height: 80px;
    
    background: #ffd666;
    border-radius: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color .2s;

    &:hover {
      background: #96FEFF;
    }

    @media (max-width: 900px) {
      grid-area: 3 / 1;

      align-self: center;
      justify-self: flex-end;
    }
  }

  .restrict-area {

    align-self: flex-start;
    justify-self: flex-end;

    padding: 13px 40px;
    background: #12D4E0;
    border-radius: 20px;

    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color .2s, color .2s;

    &:hover {
      background: #96FEFF;
      color: #15C3D6;
    }

    @media (max-width: 900px) {
      grid-area: 3 / 1;

      align-self: center;
      justify-self: flex-start;

    }
  }

  @media (max-width: 1100px) {
    background-position: 100%;
    background-size: 50%;
  }

  @media (max-width: 900px) {
    background-position: 100% 30%;

    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  @media (max-width: 730px) {
    background: none;
  }
`;

export const Location = styled.div`
  font-size: 24px;
  line-height: 34px;
  text-align: right;
  margin-left: 64px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  strong {
    font-weight: 800;
  }

  span {
    display: flex;
    flex-shrink: 0;
    width: max-content;
  }
`