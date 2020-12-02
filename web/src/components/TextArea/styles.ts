import styled from 'styled-components';

export const Container = styled.div`
  label {
    display: flex;
    color: #8FA7B3;
    margin-bottom: 8px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: #8FA7B3;
      margin-left: 24px;
      line-height: 24px;
    }
  }

  textarea {
    width: 100%;
    background: #F5F8FA;
    border: 1px solid #D3E2E5;
    border-radius: 20px;
    outline: none;
    color: #5C8599;
    min-height: 120px;
    max-height: 240px;
    resize: vertical;
    padding: 16px;
    line-height: 28px;
    }
`;
