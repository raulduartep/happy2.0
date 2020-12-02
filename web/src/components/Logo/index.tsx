import React from 'react';

import logo from '../../assets/images/logo-vertical.svg';

import { Container, Location } from './styles';

const Logo: React.FC = () => {
  return (
    <Container>
      <img src={logo} alt='Happy' />
      <Location>
        <strong>Biguaçu</strong>
        <span>Santa Catarina</span>
      </Location>
    </Container>
  );
}

export default Logo;