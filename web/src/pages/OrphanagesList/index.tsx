import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import Card from '../../components/OrphanageCard';
import Divider from '../../components/Divider';
import AuthContext from '../../contexts/auth';
import Sidebar from '../../components/Sidebar';

import imgLogoSad from '../../assets/images/logo-sad.svg';

import { Container, Content, MainWithOrphanages, MainWithoutOrphanages } from './styles';


interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

interface OrphanageListProps {
  variant: 'pending' | ''
}

const OrphanagesList: React.FC = () => {

  const { api } = useContext(AuthContext)

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {

    api.get('orphanages/list').then(response => {
      setOrphanages(response.data ? response.data : []);
    })
  }, [api])

  async function handleDeleteOrphanage(id: number) {
    await api.delete(`/orphanages/${id}`);
    setOrphanages((oldState) => oldState.filter(orphanage => orphanage.id !== id))
  }

  return (
    <Container>
      <Sidebar isDashboard={true} />
      <Content>
        <header>
          <h2>Orfanatos Cadastrados</h2>
          <Divider />
        </header>
        {
          orphanages.length > 0
            ? (
              <MainWithOrphanages>
                {orphanages.map(orphanage =>
                  <Card
                    key={orphanage.id}
                    orphanage={orphanage}
                    onClickButtonDelete={() => handleDeleteOrphanage(orphanage.id)}
                  />)}
              </MainWithOrphanages>
            )
            : (
              <MainWithoutOrphanages>
                <div>
                  <img src={imgLogoSad} alt="No orphanage" />
                  <p>Nenhum no momento</p>
                </div>
              </MainWithoutOrphanages>
            )
        }
        <Link to="/orphanages/create" className="create-orphanage" >
          <FiPlus size={32} color="#FFF" />
        </Link>
      </Content>
    </Container>
  );
}

export default OrphanagesList;