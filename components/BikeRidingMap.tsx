import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { Button } from 'components/common';
import React, { useEffect } from 'react';
import { DateToString, TimeToString } from 'utils/processing';
import { RootState, useAppDispatch } from 'store/configureStore';
import { useSelector } from 'react-redux';
import { scooterFinishRequest } from 'actions/bike';

const BikeRidingMap = () => {
  const dispatch = useAppDispatch();
  const { bikeNumber } = useSelector((state: RootState) => state.bike);

  /* 테스트용 더미 데이터*/
  const lat = 36.144765;
  const lng = 128.392134;
  const soc = 40;
  const endDate = DateToString(new Date());
  const endTime = TimeToString(new Date());
  /*---------------------*/

  const onClickEndRiding = async () => {
    await dispatch(scooterFinishRequest({ identity: bikeNumber, act: 'off' }));
  };

  return (
    <Wrapper>
      {/* <Map center={{ lat, lng }} style={{ width: '100%', height: 'calc(100% - 6rem)' }} level={5}>
        <MapMarker
          position={{ lat, lng }}
          image={{
            src: '/assets/img/marker2.png',
            size: { width: 35, height: 40 },
          }}
        />
      </Map> */}
      {/* <div className="time">
        <strong>
          {endDate} {endTime}
        </strong>
        에 주행을 시작하였습니다
      </div>
      <div>
        배터리는 <strong>{soc}%</strong>남았습니다
      </div> */}
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
