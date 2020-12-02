import styled from 'styled-components';

export const Container = styled.div`
  label {
    display: flex;
    color: #8FA7B3;
    margin-bottom: 8px;
    line-height: 24px;
  }
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  button {
    height: 64px;
    background: #F5F8FA;
    border: 1px solid #D3E2E5;
    color: #5C8599;
    cursor: pointer;

    &.active {
      background: #EDFFF6;
      border: 1px solid #A1E9C5;
      color: #37C77F;
    }

    &:first-child {
      border-radius: 20px 0px 0px 20px;
    }

    &:last-child {
      border-radius: 0 20px 20px 0;
      border-left: 0;
    }
  }
`;
