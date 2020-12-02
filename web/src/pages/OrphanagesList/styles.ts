import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const Content = styled.div`
  width: 100%;
  padding: 64px 128px;
  display: flex;
  flex-direction: column;

  header h2 {
    font-weight: 700;
    font-size: 32px;
    color: #4D6F80;
    margin-bottom: 24px;
  }

  header {
    margin-bottom: 40px;
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
`;

export const MainWithOrphanages = styled.main`
  display: flex;

  > div:not(:first-child) {
    margin-left: 40px;
  }
`;

export const MainWithoutOrphanages = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    p {
      color: #8FA7B2;
      font-weight: 600;
      font-size: 24px;
      margin-top: 16px;
    }
  }
`;