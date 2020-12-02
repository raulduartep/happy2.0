import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input, { StateValidation } from '../../components/Input';
import Logo from '../../components/Logo';

import { Container, Content, BackButton, Form, ContainerDescription } from './styles';

const ForgotPassword: React.FC = () => {

  const [email, setEmail] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setLoadingButton(true)
  }

  function handleValidate(state: StateValidation) {
    if (state === 'validated') {
      setDisabledButton(false);
    }else {
      setDisabledButton(true);
    }
  }

  return (
    <Container>
      <Logo />

      <main>
        <Content>
          <BackButton type='button'>
            <FiArrowLeft size={24} color='#15C3D6' strokeWidth={3} />
          </BackButton>
          <Form onSubmit={handleSubmit} noValidate>
            <header>
              <h2>Esqueci a senha</h2>
              <ContainerDescription>
                <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
              </ContainerDescription>
            </header>
            <Input
              name='email'
              label='E-mail'
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
              type='email'
              validation
              schemaValidation={Yup.string().email().required()}
              onValidate={handleValidate}
            />
            <Button
              type='submit'
              className='button-submit'
              disabled={disabledButton}
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