import styled, { css } from 'styled-components';
import { FiCheck } from 'react-icons/fi'

interface CheckBoxProps {
  readonly checked: boolean
}

export const CheckedIcon = styled(FiCheck)`
  width: 14px;
  height: auto;
  transition: color .1s;
  stroke-width: 3px;
  color: #FFFFFF;
`;

export const Container = styled.button<CheckBoxProps>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color .1s;

  ${ ({ checked }) => checked
    ? css`
      background-color: #37C77F;
      border: 1px solid #37C77F;
    `
    : css`
      background-color: #F5F8FA;
      border: 1px solid #D3E2E5;
    `
  }
`;
