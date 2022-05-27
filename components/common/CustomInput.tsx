import React from 'react';
import styled from 'styled-components';


// rest로 해서 너무 기본적인 props들은 그냥 처리되도록 변경
const CustomInput = ({ ...rest }) => {
  return (
    <DesignedInput {...rest}/>
  );
};


const DesignedInput = styled.input`
  width: 100%;
  border: solid 1px #d6d6d6;
  border-radius: 12px;
  padding-left: 1rem;
  height: 3rem;
  margin: 0.5rem 0 0.5rem 0;
`;

export default CustomInput;
