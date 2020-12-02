import React, { FormEvent, useState } from 'react';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input, { StateValidation } from '../../components/Input';
import Logo from '../../components/Logo';

import { Container, Content, Form, ContainerDescription, Inputs } from './styles';


const ForgotPassword: React.FC = () => {

  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [passwordStateValidation, setPasswordStateValidation] = useState<StateValidation>('noValidated');
  const [repeatedPasswordStateValidation, setRepeatedPasswordStateValidation] = useState<StateValidation>('noValidated');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setLoadingButton(true)
  }

  return (
    <Container>
      <Logo />

      <main>
        <Content>
          <Form onSubmit={handleSubmit} noValidate>
            <header>
              <h2>Redefinição de senha</h2>
              <ContainerDescription>
                <p>Escolha uma nova senha para você acessar o dashboard do Happy.</p>
              </ContainerDescription>
            </header>
            <Inputs>
              <Input
                name='password'
                label='Nova senha'
                type='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                validation
                schemaValidation={Yup.string().required()}
                onValidate={setPasswordStateValidation}
              />
              <Input
                name='password'
                label='Repetir senha'
                type='password'
                value={repeatedPassword}
                onChange={event => setRepeatedPassword(event.target.value)}
                required
                validation
                schemaValidation={Yup.string().required()}
                onValidate={setRepeatedPasswordStateValidation}
              />
            </Inputs>
            <Button
              type='submit'
              className='button-submit'
              disabled={
                passwordStateValidation === 'validated'
                  ? repeatedPasswordStateValidation === 'validated'
                    ? false
                    : true
                  : true
              }
              loading={loadingButton}
            >
              Entrar
            </Button>
          </Form>
        </Content>
      </main>
    </Container>
  );
}

export default ForgotPassword;