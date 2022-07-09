import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { Button } from 'components/common';
import React from 'react';
import { startRidingApi } from 'pages/api/scooter';

interface BikeStateMapTypes {
  lat: number;
  lng: number;
  soc: number;
  endDate: string;
  endTime: string;
  setIsRiding: (state: boolean) => void;
}

const BikeStateMap = ({ lat, lng, soc, endDate, endTime, setIsRiding }: BikeStateMapTypes) => {
  const onClickStartRiding = () => {
    try {
      //API호출 부 필요
      // async startRidingApi()
      setIsRiding(true); //주행중이라고 바꿈
      alert('주행을 시작합니다');
    } catch (err) {
      alert(err);
    }
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
