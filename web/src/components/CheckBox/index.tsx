import React, { MouseEvent, ButtonHTMLAttributes } from 'react';

import { Container, CheckedIcon } from './styles';

interface CheckBoxProps {
  onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
  checked: boolean;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, CheckBoxProps {}

const CheckBox: React.FC<Props> = ({ onClick, type = 'button', checked, ...rest }) => {

  return (
    <Container checked={checked} type={type} onClick={onClick} {...rest}>
      {
        checked && <CheckedIcon />
      }
    </Container>
  );
}

export default CheckBox;