import React, { useEffect } from 'react';
import { Button } from './common';
import { MdCalendarToday, MdLocationPin, MdElectricScooter, MdPerson } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store/configureStore';
import { doneRentalRequest } from 'actions/admin';

interface RentalRequestCardTypes {
  request: RequestRental;
}

const RentalRequestCard = ({ request }: RentalRequestCardTypes) => {
  const { doneRentalLoading, doneRentalDone, currentDoneRental } = useSelector((state: RootState) => state.admin);
  const dispatch = useAppDispatch();

  const onClickFinishRental = async (request: RequestRental) => {
    if (confirm(`유저 ID : ${request.identity}\n시작날짜 : ${request.startDate}\n종료날짜 : ${request.endDate}`)) {
      await dispatch(doneRentalRequest({ rentalId: request.rentalId }));
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
      <Button
        style={{ marginBottom: '0.25rem' }}
        onClick={() => onClickFinishRental(request)}
        loading={doneRentalLoading && currentDoneRental === request.rentalId}
      >
        대여완료
      </Button>
    </li>
  );
};

export default RentalRequestCard;
