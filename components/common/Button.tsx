import React from 'react';
import styled from 'styled-components';

//Button에 사용될 타입 지정
interface ButtonTypes {
  color?: string;
  bgcolor?:string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ color="rgb(59,59,59)",bgcolor = 'grey',width="100%",height="3rem", children, onClick }: ButtonTypes) => {
  return (
    <CustomButton color={color} bgcolor={bgcolor}width={width} height={height} onClick={onClick}>
      {children}
    </CustomButton>
  );
};
// GlobalStyle에서 사용할 변수 타입 지정
interface ColorProps {
  bgcolor?: string;
  color: string;
  width: string;
  height: string;
}

const CustomButton = styled.button<ColorProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 12px;
  border: none;
  background-color: ${(props) => props.bgcolor};
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props.color};
  font-weight: bold;
  margin:1rem 0 1rem 0;
`;

export default Button;
