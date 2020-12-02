import React, { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import * as Yup from 'yup';

import ShowPasswordIcon from '../../assets/images/show_password.svg';
import HiddenPasswordIcon from '../../assets/images/hidden_password.svg';

import { Container, InputContainer, ButtonHidden } from './styles';

export type StateValidation = 'error' | 'validated' | 'noValidated'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validation?: boolean,
  schemaValidation?: Yup.Schema<string, object> | Yup.Ref | Yup.MixedSchema<string, object>;
  onValidate?: (state: StateValidation) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  validation = false,
  schemaValidation,
  type = 'text',
  className,
  value,
  onValidate,
  ...rest }) => {

  const [hidden, setHidden] = useState(type === 'password');
  const [stateValidation, setStateValidation] = useState<StateValidation>('noValidated');

  function handleToggleHidden() {
    setHidden(!hidden)
  }

  useEffect(() => {
    (async () => {
      if (String(value).length > 0 && validation && schemaValidation) {

        const schema = Yup.object().shape({
          value: schemaValidation
        });

        let state: StateValidation = 'noValidated';

        try {
          await schema.validate({ value });
          state = 'validated';

        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            state = 'error';
          }
        }

        setStateValidation(state);
        if (onValidate) onValidate(state);
      }
    })()
  }, [value, setStateValidation, onValidate, schemaValidation, validation])

  return (
    <Container className={className}>
      <label htmlFor={rest.name}>{label}</label>
      <InputContainer
        className={stateValidation}
      >
        <input
          type={
            !hidden
              ? type === 'password'
                ? 'text'
                : type
              : 'password'
          }
          value={value}
          {...rest}
        />
        {type === 'password' && (
          <ButtonHidden onClick={handleToggleHidden} type="button">
            {
              hidden
                ? <img src={ShowPasswordIcon} alt='Mostrar senha' />
                : <img src={HiddenPasswordIcon} alt='Esconder senha' />
            }
          </ButtonHidden>
        )}
      </InputContainer>
    </Container>
  );
}

export default Input;