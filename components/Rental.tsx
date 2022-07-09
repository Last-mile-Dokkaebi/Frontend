import { getRentalPriceApi, rentalScooterApi } from 'pages/api/scooter';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Button } from './common';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import { DateToString } from 'utils/processing';

const Rental = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [startDateString, setStartDateString] = useState<string>(DateToString(startDate));
  const [endDateString, setEndDateString] = useState<string>(DateToString(endDate));

  const [price, setPrice] = useState<number>(0);

  const onChangeStartDate = (e: Date) => {
    const target = new Date(e.getFullYear(), e.getMonth(), e.getDate());
    const current = new Date();
    const current_date = new Date(current.getFullYear(), current.getMonth(), current.getDate());

    if (target < current_date) {
      //오늘날짜 이전은 선택할 수 없음
      alert('잘못된 날짜선택입니다');
      setStartDate((prev) => {
        return prev;
      });
    } else {
      setStartDate(e);
      setStartDateString(DateToString(e));
    }
  };
  const onChangeEndDate = (e: Date) => {
    const target = new Date(e.getFullYear(), e.getMonth(), e.getDate());
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    if (target < start) {
      alert('종료날짜는 시작날짜 이전일 수 없습니다');
      return;
    } else {
      setEndDate(e);
      setEndDateString(DateToString(e));
    }
  };

  const onClickRental = async () => {
    if (startDate > endDate) {
      alert('종료날짜는 시작날짜 이전일 수 없습니다');
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
    <Wrapper>
      <div className="title">현재 대여중인 킥보드가 없습니다</div>
      <div className="comment">날짜를 선택한 후 대여신청을 눌러주세요</div>
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
        <strong>{startDateString}</strong>에서 <strong>{endDateString}</strong>까지 대여 시
      </div>
      <div>
        비용은 <strong>{price}</strong>원입니다
      </div>
      <Button onClick={onClickRental}>대여신청</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .comment {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const Centering = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export default Rental;
