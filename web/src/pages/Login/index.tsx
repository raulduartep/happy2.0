import React, { FormEvent, useEffect, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import Input, { StateValidation } from '../../components/Input';
import Logo from '../../components/Logo';
import AuthContext from '../../contexts/auth';
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';

import { Container, Form, Complement, Content, Inputs, BackButton } from './styles';

const Login: React.FC = () => {

  const location = useLocation()
  const history = useHistory();

  const { from } = location.state as any || { from: { pathname: '/dashboard' } }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkedRemember, setCheckedRemember] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [emailStateValidation, setEmailStateValidation] = useState<StateValidation>('noValidated');
  const [passwordStateValidation, setPasswordStateValidation] = useState<StateValidation>('noValidated');

  const { signIn, signed } = useContext(AuthContext);

  function handleCheckedRemember() {
    setCheckedRemember(!checkedRemember)
  }

  useEffect(() => {
    (async () => {
        const login = localStorage.getItem('@HappyAuth:login');

        if (login) {
          const { email, password } = JSON.parse(login);

          setEmail(email);
          setPassword(password);
          setCheckedRemember(true);
          setEmailStateValidation('validated');
          setPasswordStateValidation('validated');
        }
      }
    )()
  }, [])


  async function handleSignIn(event: FormEvent) {
    event.preventDefault()

    setLoadingButton(true)

    const storageLogin = localStorage.getItem('@HappyAuth:login')

    if (checkedRemember) {

      if (!storageLogin || JSON.parse(storageLogin).email !== email)
        localStorage.setItem(
          '@HappyAuth:login',
          JSON.stringify({ email, password })
        )
    } else if (storageLogin) {
      localStorage.removeItem('@HappyAuth:login')
    }

    try {
      await signIn(email, password)
    } catch (err) {
      setLoadingButton(false)
    }

  }


  if (signed) {
    history.push(from);
  }

  return (
    <Container>
      <Logo />

      <main>
        <Content>
          <BackButton type='button' onClick={() => history.push('/')}>
            <FiArrowLeft size={24} color='#15C3D6' strokeWidth={3} />
          </BackButton>
          <Form onSubmit={handleSignIn} noValidate>
            <header>
              <h2>Fazer login</h2>
            </header>

            <Inputs>
              <Input
                name='email'
                label='E-mail'
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                type='email'
                validation
                schemaValidation={Yup.string().email().required()}
                onValidate={setEmailStateValidation}
              />
              <Input
                name='password'
                label='Senha'
                type='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                validation
                schemaValidation={Yup.string().required()}
                onValidate={setPasswordStateValidation}
              />
            </Inputs>
            <Complement>
              <div>
                <CheckBox
                  checked={checkedRemember}
                  onClick={handleCheckedRemember}
                />
                  Lembrar-me
                </div>
              <Link to='/forgot_password'>
                Esqueci minha senha
              </Link>
            </Complement>

            <Button
              type='submit'
              className='button-submit'
              disabled={
                emailStateValidation === 'validated'
                  ? passwordStateValidation === 'validated'
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

export default Login;