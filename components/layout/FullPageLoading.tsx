import styled, { keyframes } from 'styled-components';

const FullPageLoading = () => {
  return (
    <FullPage>
      <Spinner color="white" animation={spin} />
    </FullPage>
  );
};

const FullPage = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Spinner는 움직이는 icon이 없어서 적당히 만듬
// 이상하면 추후 바꾸는 걸로
interface SpinnerTypes {
  animation: ReturnType<typeof keyframes>;
}
const Spinner = styled.div<SpinnerTypes>`
  width: 75px;
  height: 75px;
  border: 15px solid white;
  border-top: 15px solid black;
  border-radius: 50%;
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

export default FullPageLoading;
