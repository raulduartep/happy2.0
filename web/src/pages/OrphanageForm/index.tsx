import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { useHistory, useParams } from "react-router-dom";
import { FiCheck, FiPlus, FiX, FiXCircle } from "react-icons/fi";

import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import Button from '../../components/Button';
import mapIcon from "../../utils/mapIcon";
import AuthContext from "../../contexts/auth";
import Sidebar from "../../components/Sidebar";

import {
  Container,
  Form,
  MapContainer,
  MapFooter,
  ImageInput,
  ImagesContainer,
  ImagePreviewContainer,
  NewImage,
  ButtonConfirm,
  ButtonDraft,
  FooterPending,
  Footer
} from './styles';

interface OrphanageFormProps {
  variant?: 'create' | 'edit' | 'pending';
}

interface OrphanageParams {
  id: string;
}

interface Orphanage {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  whatsapp: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string,
  }>
}

const OrphangeForm: React.FC<OrphanageFormProps> = ({ variant = 'create' }) => {


  const history = useHistory()
  const { id } = useParams<OrphanageParams>()
  const { api } = useContext(AuthContext);

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([])


  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages([...selectedImages, ...images])

    const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image))

    setPreviewImages([...selectedImagesPreview, ...previewImages])
  }

  function deleteImage(indexDeleted: number) {
    const newImages = images.filter((image, index) => index !== indexDeleted);
    const newImagesPreview = previewImages.filter((image, index) => index !== indexDeleted);

    setImages(newImages)
    setPreviewImages(newImagesPreview)
  }

  async function handleSubmit(pending = false) {

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', whatsapp);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('pending', String(pending));

    images.forEach(image => data.append('images', image));

    if (variant === 'create') {
      await api.post(`/orphanages`, data);
      alert('Orfanato criado com sucesso');
    } else {
      await api.put(`/orphanages/${id}`, data);
      alert('Orfanato atualizado com sucesso');
    }

    history.push('/dashboard');
  }

  useEffect(() => {
    if (variant === 'edit' || variant === 'pending') {
      api.get(`/${variant === 'edit' ? 'orphanages/list' : 'orphanages/pending'}/${id}`).then(response => {
        const data = response.data as Orphanage;

        setName(data.name);
        setAbout(data.about);
        setWhatsapp(data.whatsapp);
        setInstructions(data.instructions);
        setOpeningHours(data.opening_hours);
        setOpenOnWeekends(data.open_on_weekends);
        setPosition({ latitude: data.latitude, longitude: data.longitude });

        Promise.all(
          data.images.map(async image => {
            const response = await fetch(image.url);
            const blob = await response.blob();

            const filename = image.url.split(/[/\\]/).pop()?.replace(/(^.*_)/g, '');
            const file = new File([blob], filename ? filename : 'no-name')

            return file;
          })).then(files => setImages(files))

        const imagesPreview = data.images.map(image => image.url);
        setPreviewImages(imagesPreview);

      })
    }
  }, [api, id, variant]);

  return (
    <Container>
      <Sidebar />

      <main>
        <Form>
          <main>
            <fieldset>
              <legend>Dados</legend>

              <MapContainer>
              <Map
                center={[-27.6703636, -48.6881254]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onClick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )}

              </Map>
              <MapFooter>
                <p>Clique no mapa para adicionar a localização</p>
              </MapFooter>
              </MapContainer>

              <Input
                label='Nome'
                name='name'
                value={name}
                onChange={event => setName(event.target.value)}
                className='input-block'
              />

              <TextArea
                label='Sobre'
                name="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
                className='input-block'
              />

              <Input
                label='Número de Whatsapp'
                name='whatsapp'
                value={whatsapp}
                onChange={event => setWhatsapp(event.target.value)}
                className='input-block'
              />

              <ImageInput className='input-block'>
                <label htmlFor="images">Fotos</label>

                <ImagesContainer>

                  {previewImages.map((image, index) => (
                    <ImagePreviewContainer key={index}>
                      <img src={image} alt="Preview" />
                      <button type="button" onClick={() => deleteImage(index)}>
                        <FiX color="#FF669D" size={25} />
                      </button>
                    </ImagePreviewContainer>
                  ))}

                  <NewImage htmlFor="image[]">
                    <FiPlus size={24} color="#15b6d6" />
                  </NewImage>

                  <input
                    multiple
                    type="file"
                    id="image[]"
                    hidden
                    onChange={handleSelectImages}
                  />
                </ImagesContainer>
              </ImageInput>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <TextArea
                label='Instruções'
                name="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
                className='input-block'
              />

              <Input
                label='Horário de funcionamento'
                name='opening_hours'
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
                className='input-block'
              />
              <Select
                name='open_on_weekends'
                label='Atende fim de semana'
                onChange={value => setOpenOnWeekends(value)}
                value={open_on_weekends}
                className='input-block'
              />
            </fieldset>
          </main>

          {
            variant !== 'pending'
              ? variant !== 'edit'
                ? (
                  <Footer>
                    <ButtonConfirm type='button' onClick={() => handleSubmit()}>
                      Confirmar
                </ButtonConfirm>
                    <ButtonDraft variant='yellow' type='button' onClick={() => handleSubmit(true)}>
                      Salvar como rascunho
                </ButtonDraft>
                  </Footer>
                )
                : (
                  (
                    <Footer>
                      <ButtonConfirm type='button' onClick={() => handleSubmit()}>
                        Confirmar
                </ButtonConfirm>
                    </Footer>
                  )
                )
              : (
                <FooterPending>
                  <Button variant='red' type='button' onClick={() => history.push('/dashboard')}>
                    <FiXCircle size={24} />
                    <span>Recusar</span>
                  </Button>
                  <Button type='button' onClick={() => handleSubmit()}>
                    <FiCheck size={24} />
                    <span>Aceitar</span>
                  </Button>
                </FooterPending>
              )
          }
        </Form>
      </main>
    </Container>
  );
}

export default OrphangeForm;