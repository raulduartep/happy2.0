import React from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiArrowRight, FiEdit3, FiTrash } from 'react-icons/fi'
import { Link, useRouteMatch } from 'react-router-dom';

import mapIcon from "../../utils/mapIcon";

import { ButtonWithMargin, Container } from './styles';

interface OrphanageCardProps {
  variant?: 'pending' | 'normal';
  orphanage: Orphanage;
  onClickButtonDelete?: () => void;
}

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanageCard: React.FC<OrphanageCardProps> = ({ variant = 'normal', orphanage, onClickButtonDelete }) => {

  const { url } = useRouteMatch()

  return (
    <Container>
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
        <h3>{orphanage.name}</h3>
        <div>
          {
            variant === 'normal'
              ? (
                <>
                  <ButtonWithMargin type='button' onClick={onClickButtonDelete}>
                    <FiTrash size={24} />
                  </ButtonWithMargin>
                  <Link to={`${url}/edit/${orphanage.id}`}>
                    <FiEdit3 size={24} />
                  </Link>
                </>
              )
              : (
                <>
                  <ButtonWithMargin type='button' onClick={onClickButtonDelete}>
                    <FiTrash size={24} />
                  </ButtonWithMargin>
                  <Link to={`${url}/edit/${orphanage.id}`}>
                    <FiArrowRight size={24} />
                  </Link>
                </>
              )
          }
        </div>
      </footer>
    </Container>
  );
}

export default OrphanageCard;