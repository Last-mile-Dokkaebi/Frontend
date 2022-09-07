import { FaSpinner } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const FullSizeLoading = () => {
  return (
    <FullPage>
      <Spinner animation={spin}>
        <FaSpinner fontSize="5rem" />
      </Spinner>
    </FullPage>
  );
};

const FullPage = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

export default FullSizeLoading;
