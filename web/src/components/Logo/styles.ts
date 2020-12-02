import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100%;
  width: 60%;

  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);

  @media (max-width: 1100px) {
    width: 100%;
    height: max-content;
    padding: 24px 0;
    flex-direction: row;
  }
`;

export const Location = styled.div`
  margin-top: 100px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 1100px) {
    display: none;
`;
