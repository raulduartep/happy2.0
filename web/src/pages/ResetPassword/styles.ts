import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;

  main {
    display: flex;
    justify-content: center;

    height: 100%;
    width: 40%;

    background-color: #FFFFFF;

    @media (max-width: 1100px) {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  width: 100%;
  align-self: center;

  header {
    margin-bottom: 40px;

    @media (max-width: 1100px) {
      text-align: center;
      margin: 20px 0;
    }

    > h2{
      font-size: 32px;
      font-weight: 600;
      color: #5C8599;
      line-height: 4.6rem;
    }
  }

  .button-submit {
    margin-top: 40px;
  }
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
  display: grid;
  height: 100%;
  grid-template-rows: auto min-content;
`;

export const Inputs = styled.div`
  
  div:last-child{
    margin-top: 16px;
  }
`;

export const ContainerDescription = styled.div`
  color: #5C8599;
  font-weight: 600;
  font-size: 18px;
`;