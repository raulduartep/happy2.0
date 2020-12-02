import React from 'react';

import { Container, Buttons } from './styles';

interface InputProps {
  label: string;
  name: string;
  onChange?: (value: boolean) => void;
  value: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, name, className, value, onChange }) => {

  function handleOnChange(clickedValue: boolean) {
    if (onChange && value !== clickedValue) onChange(clickedValue) 
  }

  return (
    <Container className={className}>
      <label htmlFor={name}>
        {label}
      </label>

      <Buttons>
        <button
          type="button"
          className={value ? 'active' : ''}
          onClick={() => handleOnChange(true)}
        >
          Sim
        </button>
        <button
          type="button"
          className={!value ? 'active' : ''}
          onClick={() => handleOnChange(false)}
        >
          Não
        </button>
      </Buttons>
    </Container>
  );
}

export default Input;