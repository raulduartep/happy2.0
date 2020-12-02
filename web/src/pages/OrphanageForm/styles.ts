import styled from 'styled-components';
import Button from '../../components/Button';

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`;

export const Form = styled.form`
  width: 700px;
  height: max-content;
  margin: 64px auto;

  background: #FFFFFF;
  border: 1px solid #D3E2E5;
  border-radius: 20px;

  overflow: hidden;

  main {
    padding: 64px 80px;
  }

  .leaflet-container {
    z-index: 1;
    border: 1px solid #D3e2E5;
    border-bottom-width: 0;
    border-radius: 20px 20px 0 0;
  }

  fieldset {
    border: 0;

    legend {
      width: 100%;

      font-size: 32px;
      line-height: 34px;
      color: #5C8599;
      font-weight: 700;

      border-bottom: 1px solid #D3E2E5;
      margin-bottom: 40px;
      padding-bottom: 24px;
    }
  }

  fieldset + fieldset {
    margin-top: 80px;
  }

  .input-block + .input-block {
    margin-top: 24px;
  }
`;

export const ImageInput = styled.div`
  label {
    display: flex;
    color: #8FA7B3;
    margin-bottom: 8px;
    line-height: 24px;
  }
`;

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid #D3E2E5;
  border-radius: 20px;
  height: 96px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: -2px;
    right: -2px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #FFFFFF;
    border: 1px solid #D3E2E5;
    border-radius: 0 20px;
  }
`;

export const NewImage = styled.label`
  height: 96px;
  background: #F5F8FA;
  border: 1px dashed #96D2F0;
  border-radius: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonConfirm = styled(Button)`
  margin-top: 64px;
`;

export const FooterPending =styled.footer`
  display: flex;
  background-color: #F5F8FA;
  border-top: 1px solid #D3E2E5;
  padding: 48px 80px;

  button span {
    margin-left: 16px
  }

  button:last-child {
    margin-left: 20px;
  }
`;

export const Footer = styled.footer`
  padding: 0px 80px 48px;
`;

export const ButtonDraft = styled(Button)`
  margin-top: 24px;
`;

export const MapContainer = styled.div`
  margin-bottom: 40px;
`;

export const MapFooter = styled.footer`
  background-color: #F5F8FA;
  color: #0089A5;
  border-radius: 0 0 20px 20px;
  text-align: center;
  border: 1px solid #D3e2E5;
  
  p {
    font-weight: bold;
    font-size: 14px;
    padding: 12px 0;
  }
`;