import React from 'react';
import styled from 'styled-components';

interface TitleTypes {
  title?: string;
  subtitle?: string;
}
const Title = ({ title, subtitle }: TitleTypes) => {
  return (
    <TitleWrapper>
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 4px;
    color: #1a3336;
  }
  .subtitle {
    font-size: 13px;
    color: grey;
  }
  margin: 0 0 1rem 0;
  padding: 0.5rem;
`;

export default Title;
