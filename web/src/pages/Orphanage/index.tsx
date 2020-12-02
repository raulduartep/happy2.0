import React, { useEffect, useState } from "react";
import { FiClock, FiInfo, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaWhatsapp } from 'react-icons/fa'
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../../components/Sidebar";

import api from "../../services/publicApi";

import mapIcon from "../../utils/mapIcon";

import {
  Container,
  OrphanageDetails,
  ImagesContainer,
  Images,
  ImagesScrollRight,
  ImagesScrollLeft,
  Content,
  MapContainer,
  OpenDetails,
  Hour,
  OpenOnWeekends,
  NoOpenOnWeekends,
  ContactButton
} from './styles';

interface Orphanage {

  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  whatsapp: string;
  images: Array<{
    id: number;
    url: string,
  }>
}

interface OrphanageParams {
  id: string;
}

const Orphanage: React.FC = () => {

  const { id } = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [imageScrollIndex, setImageScrollIndex] = useState(0);

  function handleImageScrollRight() {
    setImageScrollIndex(imageScrollIndex + 1)
  }

  function handleImageScrollLeft() {
    setImageScrollIndex(imageScrollIndex - 1)
  }

  useEffect(() => {
    api.get(`public/orphanages/${id}`).then(response => {
      setOrphanage(response.data);
    })
  }, [id])

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <Sidebar />

      <main>
        <OrphanageDetails>
          {
            orphanage.images.length > 0 && <img src={orphanage.images[0].url} alt={orphanage.name} />
          }
          <Content>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>
            <ImagesContainer>
              <ImagesScrollLeft disabled={imageScrollIndex === 0 ? true : false} onClick={handleImageScrollLeft}>
                <FiArrowLeft size={24} color="#15B6D6" />
              </ImagesScrollLeft>
              <Images>
                {orphanage.images.filter((image, index) =>
                  index >= 0 + imageScrollIndex && index < 3 + imageScrollIndex
                ).map(image => (
                  <button
                    key={image.id}
                    type="button"
                  >
                    <img src={image.url} alt={orphanage.name} />
                  </button>
                ))}
              </Images>
              <ImagesScrollRight disabled={imageScrollIndex + 3 >= orphanage.images.length ? true : false} onClick={handleImageScrollRight}>
                <FiArrowRight size={24} color="#15B6D6" />
              </ImagesScrollRight>
            </ImagesContainer>

            <MapContainer>
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude}, ${orphanage.longitude}`} rel="noopener noreferrer" target="_blank">Ver rotas no Google Maps</a>
              </footer>
            </MapContainer>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <OpenDetails>
              <Hour>
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </Hour>
              {orphanage.open_on_weekends
                ? (
                  <OpenOnWeekends>
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </OpenOnWeekends>
                )
                : (
                  <NoOpenOnWeekends>
                    <FiInfo size={32} color="#FF6690" />
                    Não atendemos <br />
                    fim de semana
                  </NoOpenOnWeekends>
                )}
            </OpenDetails>

            <ContactButton
              target="_blank"
              href={`https://wa.me/${orphanage.whatsapp}`}
              type="button"
              rel='noopener noreferrer'
            >
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </ContactButton>
          </Content>
        </OrphanageDetails>
      </main>
    </Container>
  );
}

export default Orphanage;