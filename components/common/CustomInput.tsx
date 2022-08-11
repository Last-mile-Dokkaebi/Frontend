import React from 'react';
import styled from 'styled-components';

interface CustomInputTypes {
  label?: string;
  [x: string]: any;
}

// rest로 해서 너무 기본적인 props들은 그냥 처리되도록 변경
const CustomInput = ({ label, ...rest }: CustomInputTypes) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <DesignedInput {...rest} />
    </>
  );
};

const Label = styled.div`
  color: gray;
  font-size: 0.9rem;
`;

const DesignedInput = styled.input`
  width: 100%;
  border: solid 1px #d6d6d6;
  border-radius: 12px;
  padding-left: 1rem;
  height: 3rem;
  margin: 0.5rem 0 0.5rem 0;
`;

export default CustomInput;
