import styled from 'styled-components';

export const Container = styled.aside`
  position: fixed;
  z-index: 50;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 48px;
  }

  footer a,
  footer button {
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

  footer a:hover,
  footer button:hover {
    background: #17D6EB;
  }

  @media (max-width: 1100px){
    width: 100%;
    height: 100px;

    flex-direction: row;
    align-items: center;

    padding: 0 40px;

  }
`;

export const Buttons = styled.main`
  a {
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;
    background: #12AFCB;
    color: #FFFFFF;

    &:hover {
      background: #17D6EB;
    }

    &:last-child {
      margin-top: 16px;
    }

    &.active{
      background: #FFD666;
      color: #0089A5;

      &:hover {
        background: #FFDB79;
      }
    }
  }
`;

export const BadgeContainer = styled.div`
  position: relative;
  display: flex;
`;

export const Badge = styled.div`
  position: absolute;
  height: 10px;
  width: 10px;
  background-color: #FFD666;
  border-radius: 50%;
  top: 0;
  right: 0;
  border: 2px solid #12AFCB;

  &.hidden {
    display: none;
  }
`;