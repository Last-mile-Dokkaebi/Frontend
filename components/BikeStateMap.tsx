import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { Button } from 'components/common';
import React from 'react';
import { RootState, useAppDispatch } from 'store/configureStore';
import { useSelector } from 'react-redux';
import { scooterStartRequest } from 'actions/bike';

const BikeStateMap = () => {
  const { bikeNumber, lat, lng, soc, rentalId } = useSelector((state: RootState) => state.bike);

  const dispatch = useAppDispatch();
  const endDate = '2022-20-20';
  const endTime = '22:22';

  const onClickStartRiding = async () => {
    await dispatch(scooterStartRequest({ identity: bikeNumber, act: 'on', rentalId }));
  };

  return (
    <Wrapper>
      <Map center={{ lat, lng }} style={{ width: '100%', height: 'calc(100% - 6rem)' }} level={5}>
        <MapMarker
          position={{ lat, lng }}
          image={{
            src: '/assets/img/marker2.png',
            size: { width: 35, height: 40 },
          }}
        />
      </Map>
      <div className="time">
        <strong>
          {endDate} {endTime}
        </strong>
        에 주행을 종료하였습니다
      </div>
      <div>
        배터리는 <strong>{soc}%</strong>남았습니다
      </div>
      <div>
        <Button onClick={onClickStartRiding}>주행시작</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 5rem);

  .time {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;

export default BikeStateMap;
