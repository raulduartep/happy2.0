import styled, { css } from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 64px;
  border: 0;
  background: #3CDC8C;
  border-radius: 20px;
  color: #FFFFFF;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s, opacity 0.1s;

  &.green {
    background-color: #3CDC8C;
  }

  &.red {
    background-color:  #FF669D;
  }

  &.yellow {
    background-color: #FFD666;
  }

  ${({ disabled }) => disabled
    ? css`
      cursor: default;
      opacity: 0.5;
    `
    : css`
      cursor: pointer;
      opacity: 1;

      &.green {
        &:hover {
          background-color: #36CF82;
        }
      }

      &.red {
        &:hover {
          background-color: #E35085;
        }
      }

      &.yellow {
        &:hover {
          background-color: #FFDB79;
        }
      }
    `
  }

`;
