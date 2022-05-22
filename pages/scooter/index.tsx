import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppLayout } from 'components/layout';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const index: NextPage = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  useEffect(() => {
    // api통신해서 불러오는 부분 작성 필요
    setPosition({ lat: dummyData.lat, lng: dummyData.lng });
  },[]);

  return (
    <AppLayout>
      <MapWrapper>
        <Map center={position} style={{ width: '100%', height: '100%' }} level={5}>
          <MapMarker
            position={position}
            image={{
              src: '/assets/img/marker.png',
              size: { width: 30, height: 38 },
            }}
          >
            <div style={{ color: '#000' }}>Hello World!</div>
          </MapMarker>
        </Map>
      </MapWrapper>
    </AppLayout>
  );
};

const dummyData: ScooterState = {
  lat: 36.144765,
  lng: 128.392134,
  soc: 30,
};

const MapWrapper = styled.div`
  width: 100%;
  height: 70%;
`;

export default index;
