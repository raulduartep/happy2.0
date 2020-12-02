import React, { TextareaHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...rest }) => {
  return (
    <Container className={className}>
      <label htmlFor={rest.name}>
        {label}
        {
          rest.maxLength && (
            <span>Máximo de {rest.maxLength} caracteres</span>
          )
        }
      </label>
      <textarea {...rest} />
    </Container>
  );
}

export default Input;