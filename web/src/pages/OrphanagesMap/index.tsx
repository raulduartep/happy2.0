import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../../services/publicApi';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../../assets/images/map-marker.svg'
import mapIcon from '../../utils/mapIcon';

import {
  Container,
  Aside
} from './styles';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {

  const { url } = useRouteMatch();
  const { goBack } = useHistory();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('/public/orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, [])

  return (
    <Container>
      <Aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <div>
            <strong>Biguaçu</strong>
            <span>Santa Catarina</span>
          </div>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </Aside>

      <Map
        center={[-27.6703636, -48.6881254]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {
          orphanages.map(orphanage => (
            <Marker
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`${url}/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={32} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          ))
        }

      </Map>
    </Container>
  );
}
export default OrphanagesMap;