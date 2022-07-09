import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppLayout } from 'components/layout';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Button } from 'components/common';
import Router from 'next/router';

const index: NextPage = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  useEffect(() => {
    // api통신해서 불러오는 부분 작성 필요
    setPosition({ lat: dummyData.lat, lng: dummyData.lng });
  }, []);
  const rideStart = () => {
    Router.push('/scooter/ride');
  };

  return (
    <AppLayout>
      <MapWrapper>
        <Map center={position} style={{ width: '100%', height: '100%' }} level={5}>
          {dummayDatas.map((position, index) => (
            <MapMarker
              key={index}
              position={{ lat: position.lat, lng: position.lng }} // 마커를 표시할 위치
              image={{
                src: '/assets/img/marker2.png',
                size: { width: 35, height: 40 },
              }}
            />
          ))}
        </Map>
      </MapWrapper>
      <Button onClick={rideStart}>탑승 시작</Button>
    </AppLayout>
  );
};

const dummyData: ScooterState = {
  lat: 36.144765,
  lng: 128.392134,
  soc: 30,
};

const dummayDatas: Array<ScooterState> = [
  {
    lat: 36.144765,
    lng: 128.392134,
    soc: 30,
  },
  {
    lat: 36.14694,
    lng: 128.3909,
    soc: 77,
  },
];

const MapWrapper = styled.div`
  width: 100%;
  height: 70%;
`;

export default index;
