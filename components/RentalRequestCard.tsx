import React from 'react';
import { Button } from './common';
import { MdCalendarToday, MdLocationPin, MdElectricScooter, MdPerson } from 'react-icons/md';

interface RentalRequestCardTypes {
  request: RequestRental;
}

const RentalRequestCard = ({ request }: RentalRequestCardTypes) => {
  const onClickFinishRental = (request: RequestRental) => {
    if (confirm(`유저 ID : ${request.identity}\n시작날짜 : ${request.startDate}\n종료날짜 : ${request.endDate}`)) {
      alert('대여를 완료하였습니다.');
    }
  };

  return (
    <li>
      <div id="request">{request.date}</div>
      <div id="date">
        <MdCalendarToday className="icon" />
        {request.startDate} ~ {request.endDate}
      </div>
      <div id="address">
        <MdLocationPin className="icon" />
        {request.address}
      </div>
      <div id="bikeNumber">
        <MdElectricScooter className="icon" />
        {/* {request.bikeNumber} */}
      </div>
      <div id="identity">
        <MdPerson className="icon" />
        {request.identity}
      </div>
      <Button style={{ marginBottom: '0.25rem' }} onClick={() => onClickFinishRental(request)}>
        대여완료
      </Button>
    </li>
  );
};

export default RentalRequestCard;
