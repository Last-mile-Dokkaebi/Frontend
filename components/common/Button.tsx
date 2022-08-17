import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

//Button에 사용될 타입 지정
interface ButtonTypes {
  /**
   * background-color를 지정
   * @default "#eeeeee"
   */
  bgcolor?: string;

  /**
   * 버튼색상을 지정
   * @default false
   */
  isPrimary?: boolean;

  loading?: boolean;

  children?: React.ReactNode;

  [x: string]: any;
}

// rest로 해서 너무 기본적인 props들은 그냥 처리되도록 변경
const Button = ({ bgcolor = '#eeeeee', isPrimary = false, loading, children, ...rest }: ButtonTypes) => {
  return (
    <CustomButton bgcolor={isPrimary ? '#77b8c0' : bgcolor} disabled={loading} {...rest}>
      {loading && (
        <Spinner animation={spin}>
          <FaSpinner fontSize="1rem" />
        </Spinner>
      )}
      {children}
    </CustomButton>
  );
};

interface SpinnerTypes {
  animation: ReturnType<typeof keyframes>;
}
const Spinner = styled.div<SpinnerTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  animation: ${(props) => props.animation} 1s cubic-bezier(0.2, 0.6, 0.5, 0.1) infinite;
`;

const spin = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

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
