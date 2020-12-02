import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const Content = styled.div`
  width: 100%;
  margin: 64px 128px;

  header h2 {
    font-weight: 700;
    font-size: 32px;
    color: #4D6F80;
    margin-bottom: 24px;
  }

  header {
    margin-bottom: 40px;
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