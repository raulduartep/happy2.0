import styled from 'styled-components';

export const Container = styled.div`
  label {
    display: flex;
    color: #8FA7B3;
    margin-bottom: 8px;
    line-height: 24px;
    font-size: 16px;
  }
`;

export const InputContainer = styled.div`

  display: flex;

  width: 100%;
  height: 64px;
  border: 1px solid #D3E2E5;
  border-radius: 20px;
  background: #F5F8FA;

  &.error {
    border-color: #FFA5C5;
  }

  &.validated {
    border-color: #A1E9C5;
  }

  input {
    background-color: transparent;
    border: none;
    width: 100%;
    color: #5C8599;
    height: 100%;
    padding: 0 16px;
    font-size: 16px;
    outline: none;
    flex-grow: 1
  }
`;

export const ButtonHidden = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  border: none;
  background-color: transparent;
  margin-right: 20px;
  outline: none;
`;