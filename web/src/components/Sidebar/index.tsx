import React, { useContext } from 'react';
import { FiAlertCircle, FiArrowLeft, FiMapPin, FiPower } from 'react-icons/fi';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';

import AuthContext from '../../contexts/auth';
import mapMarkerImg from '../../assets/images/map-marker.svg';

import { Container, Buttons, BadgeContainer, Badge } from './styles';

interface SidebarProps {
  isDashboard?: boolean,
}

const Sidebar: React.FC<SidebarProps> = ({ isDashboard = false }) => {

  const { goBack } = useHistory();
  const { signOut } = useContext(AuthContext);
  
  return (
    <Container>
      <img src={mapMarkerImg} alt="Happy" />

      {
        isDashboard && (
          <Buttons>
            <NavLink to={'/dashboard/orphanages/list'} activeClassName='active'>
              <FiMapPin size={24} />
            </NavLink>
            <NavLink to={'/dashboard/orphanages/pending'} activeClassName='active'>
              <BadgeContainer>
                <FiAlertCircle size={24} />
                <Badge className={'hidden'} />
              </BadgeContainer>
            </NavLink>
          </Buttons>
        )
      }

      <footer>
        <button type="button" onClick={isDashboard ? signOut : goBack}>
          {
            isDashboard
            ? <FiPower size={24} color="#FFF" />
            : <FiArrowLeft size={24} color="#FFF" />
          }
        </button>
      </footer>
    </Container>
  );
}

export default Sidebar;