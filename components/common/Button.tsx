import React from 'react';
import styled from 'styled-components';

//Button에 사용될 타입 지정
interface ButtonTypes {
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ color = 'grey', children, onClick, ...rest }: ButtonTypes) => {
  return (
    <CustomButton color={color} onClick={onClick} {...rest}>
      {children}
    </CustomButton>
  );
};
// GlobalStyle에서 사용할 변수 타입 지정
interface ColorProps {
  color: string;
}

const CustomButton = styled.button<ColorProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.color};
  cursor: pointer;
  font-size: 12px;
  color: white;
  font-weight: bold;
`;

export default Button;
