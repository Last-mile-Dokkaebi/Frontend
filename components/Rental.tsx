import { getRentalPriceApi, rentalScooterApi } from 'pages/api/scooter';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from 'styled-components';
import { Button } from './common';

const Rental = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [price, setPrice] = useState<number>(0);

  const onChangeStartDate = (e: Date) => {
    const target = new Date(e.getFullYear(), e.getMonth(), e.getDate());
    const current = new Date();
    const current_date = new Date(current.getFullYear(), current.getMonth(), current.getDate());

    if (target < current_date) {
      //오늘날짜 이전은 선택할 수 없음
      alert('날짜가 잘못되었습니다');
      setStartDate((prev) => {
        return prev;
      });
    } else {
      setStartDate(e);
    }
  };
  const onChangeEndDate = (e: Date) => {
    setEndDate(e);
  };

  const onClickRental = async () => {
    if (startDate > endDate) {
      alert('날짜가 잘못되었습니다');
    } else {
      try {
        await rentalScooterApi({ start: startDate, end: endDate });
        alert('성공적으로 렌탈요청을 하였습니다');
      } catch (err) {
        JSON.stringify(err);
      }
    }
  };

  const getPrice = async () => {
    try {
      let res = await getRentalPriceApi({ start: startDate, end: endDate });
      res = res <= 0 ? 0 : res;
      setPrice(res);
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  useEffect(() => {
    getPrice();
  }, [startDate, endDate]);

  return (
    <div>
      <details>
        <summary>시작날짜 설정</summary>
        <Centering>
          <Calendar onChange={onChangeStartDate} value={startDate} />
        </Centering>
      </details>
      <details>
        <summary>종료날짜 설정</summary>
        <Centering>
          <Calendar onChange={onChangeEndDate} value={endDate} />
        </Centering>
      </details>
      <div>
        <strong>{price}</strong>원
      </div>
      <Button onClick={onClickRental}>렌탈하기</Button>
    </div>
  );
};

const Centering = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export default Rental;
