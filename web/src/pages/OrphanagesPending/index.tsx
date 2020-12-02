import React, { useState, useEffect, useContext } from 'react';

import Card from '../../components/OrphanageCard';
import Divider from '../../components/Divider';
import AuthContext from '../../contexts/auth';

import imgLogoSad from '../../assets/images/logo-sad.svg';

import { Container, Content, MainWithOrphanages, MainWithoutOrphanages } from './styles';
import Sidebar from '../../components/Sidebar';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesPending: React.FC = () => {

  const { api } = useContext(AuthContext)

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages/pending').then(response => {
      setOrphanages(response.data);
    })
  }, [api])

  async function handleDeleteOrphanage(id: number) {
    await api.delete(`/orphanages/${id}`);
    setOrphanages((oldState) => oldState.filter(orphanage => orphanage.id !== id))
  }

  return (
    <Container>
      <Sidebar isDashboard/>
      <Content>
        <header>
          <h2>Cadastros pendentes</h2>
          <Divider />
        </header>
        {
          orphanages.length > 0
            ? (
              <MainWithOrphanages>
                {orphanages.map(orphanage =>
                  <Card
                    variant='pending'
                    key={orphanage.id}
                    orphanage={orphanage}
                    onClickButtonDelete={() => handleDeleteOrphanage(orphanage.id)}
                  />
                )}
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
      </Content>
    </Container>
  );
}

export default OrphanagesPending;