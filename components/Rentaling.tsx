import { GoCheck } from 'react-icons/go';
import styled from 'styled-components';
import { DateToString } from 'utils/processing';
import { RootState } from 'store/configureStore';
import { useSelector } from 'react-redux';

const Rentaling = () => {
  const { startDate, endDate } = useSelector((state: RootState) => state.bike);

  return (
    <Wrapper>
      <GoCheck fontSize={'5rem'} />
      <h3>현재 대여를 진행중입니다</h3>
      <div>
        대여 시작 날짜 : <strong>{startDate}</strong>
      </div>
      <div>
        대여 종료 날짜 : <strong>{endDate}</strong>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export default Rentaling;
