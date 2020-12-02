import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {
  Container,
  Content,
  Location
} from './styles';

import logoImg from '../../assets/images/logo.svg';

const Landing: React.FC = () => {
  return (
    <Container>
      <Content>

        <header>
          <img src={logoImg} alt="Happy" />
          <Location>
            <strong>Biguaçu</strong>
            <span>Santa Catarina</span>
          </Location>
        </header>

        <Link to="/login" className="restrict-area">
          Acesso restrito
        </Link>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </Content>
    </Container>
  );
}

export default Landing;