import React from 'react';
import styled from 'styled-components';

//Button에 사용될 타입 지정
interface ButtonTypes {
  /**
   * background-color를 지정
   * @default "#eeeeee"
   */
  bgcolor?: string;

  children?: React.ReactNode;
  [x: string]: any;
}

// rest로 해서 너무 기본적인 props들은 그냥 처리되도록 변경
const Button = ({ bgcolor = '#eeeeee', children, ...rest }: ButtonTypes) => {
  return (
    <CustomButton bgcolor={bgcolor} {...rest}>
      {children}
    </CustomButton>
  );
};

// GlobalStyle에서 사용할 변수 타입 지정
interface ColorProps {
  bgcolor?: string;
  color?: string;
  width?: string;
  height?: string;
}

const CustomButton = styled.button<ColorProps>`
  width: ${(props) => props?.width || '100%'};
  height: ${(props) => props?.height || '3rem'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 12px;
  border: none;
  background-color: ${(props) => props.bgcolor};
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props?.color || 'rgb(59, 59, 59)'};
  font-weight: bold;
  margin: 1rem 0 1rem 0;
`;

export default Button;
