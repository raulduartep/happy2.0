import React, { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

interface ButtonPros extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'green' | 'red' | 'yellow';
}

const Button: React.FC<ButtonPros> = ({ children, loading = false, variant = 'green', className, ...rest }) => {
  return (
    <Container
      {...rest}
      className={className ? `${className} ${variant}` : variant}
    >
      {
        loading
          ? <ReactLoading 
            height='1.6rem'
            width='1.6rem'
            type='bubbles'
          />
          : children
      }
    </Container>
  );
}

export default Button;