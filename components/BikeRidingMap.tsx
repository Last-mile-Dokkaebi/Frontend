import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { Button } from 'components/common';
import React from 'react';
import { RootState, useAppDispatch } from 'store/configureStore';
import { useSelector } from 'react-redux';
import { scooterFinishRequest } from 'actions/bike';

const BikeRidingMap = () => {
  const dispatch = useAppDispatch();
  const { bikeNumber, lat, lng, soc, rentalId } = useSelector((state: RootState) => state.bike);

  const onClickEndRiding = async () => {
    await dispatch(scooterFinishRequest({ identity: bikeNumber, act: 'off' }));
  };

  return (
    <Wrapper>
      <Map center={{ lat, lng }} style={{ width: '100%', height: 'calc(100% - 8rem)' }} level={5}>
        <MapMarker
          position={{ lat, lng }}
          image={{
            src: '/assets/img/marker2.png',
            size: { width: 35, height: 40 },
          }}
        />
      </Map>

      <div>
        배터리는 <strong>{soc}%</strong>남았습니다
      </div>
      <div>
        <Button onClick={onClickEndRiding}>주행종료</Button>
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

export default BikeRidingMap;
