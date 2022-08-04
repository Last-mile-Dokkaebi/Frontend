import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppLayout } from 'components/layout';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiKickScooter } from 'react-icons/gi';
import { getScooterInfoApi } from 'pages/api/scooter';
import { useInterval } from 'hooks';

const ride: NextPage = ({ data }: any) => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [paths, setPaths] = useState<Array<{ lat: number; lng: number }>>([]);
  const [soc, setSoc] = useState<number>(0);
  const [driveDist, setDriveDist] = useState<number>(0);
  let count = 0;

  useEffect(() => {
    // api통신해서 불러오는 부분 작성 필요
    const rounded = Math.round((data.driveDist + Number.EPSILON) * 100) / 100;
    setSoc(data.soc);
    setDriveDist(rounded);
    setPosition(data.route[0]);
  }, []);

  useInterval(() => {
    if (count < 5) {
      setPosition(data.route[count + 1]);
      setPaths((prev) => [...prev, data.route[count]]);
      count += 1;
    }
  }, 1000);
  /* 지도상에 경로 그리기 */

  return (
    <AppLayout>
      <MapWrapper>
        <Map center={position} style={{ width: '100%', height: '100%' }} level={3}>
          <MapMarker
            position={position}
            image={{
              src: '/assets/img/marker2.png',
              size: { width: 35, height: 40 },
            }}
          >
            {/*<div style={{ color: '#000',padding:'8px',fontSize:'12px' }}>Hello World!</div>*/}
          </MapMarker>
          <Polyline
            path={paths}
            strokeWeight={3} // 선의 두께입니다
            strokeColor={'#db4040'} // 선의 색깔입니다
            strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
          />
        </Map>
      </MapWrapper>
      <RideInfoWrapper>
        <InfoWrapper>
          <div className="info">
            <div className="icon">
              <AiOutlineClockCircle size="30" />
            </div>

            <div className="value-wrapper">
              <div>이용 시간</div>
              <div className="value">00:00</div>
            </div>
          </div>
          <div className="info">
            <div className="icon">
              <Battery>
                <div
                  className={`battery-level ${soc < 25 && soc >= 10 && 'warn'} ${soc < 10 && 'alert'}`}
                  style={{ height: `${soc}%` }}
                ></div>
              </Battery>
            </div>

            <div className="value-wrapper">
              <div>킥보드 배터리 잔량</div>
              <div className="value">{soc}%</div>
            </div>
          </div>
          <div className="info">
            <div className="icon">
              <GiKickScooter size="30" />
            </div>
            <div className="value-wrapper">
              <div>이동 거리</div>
              <div className="value">{driveDist} km</div>
            </div>
          </div>
        </InfoWrapper>
      </RideInfoWrapper>
    </AppLayout>
  );
};

// 해당 페이지로의 모든 요청 마다 호출되는 함수, SSR
export async function getServerSideProps() {
  // 서버로 API 요청
  const data = await getScooterInfoApi();
  // Page 컴포넌트로 data 전달
  return { props: { data } };
}

const MapWrapper = styled.div`
  width: 100%;
  height: 70%;
  @media (max-height: 650px) {
    height: 65%;
  }
`;

const RideInfoWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  @media (max-height: 650px) {
    height: 35%;
  }
  background-color: white;
  border: solid 1px #d6d6d6;
  border-radius: 4px;
  padding: 0.5rem;

  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 0.5rem 0 0.5rem 0;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .info {
    & * {
      margin-right: 1rem;
    }
    display: grid;
    grid-template-columns: 2fr 8fr;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .value-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    div:nth-child(1) {
      font-size: 12px;
    }
  }
  .value {
    font-weight: bold;
  }
`;

const Battery = styled.div`
  border: 3px solid #333;
  width: 18px;
  height: 28px;
  padding: 2px;
  border-radius: 4px;
  position: relative;
  margin: 15px 0;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 1px solid #fff;
    border-radius: 2px;
  }

  .battery-level {
    background: #30b455;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    width: 100%;

    &.warn {
      background-color: #efaf13;
    }

    &.alert {
      background-color: #e81309;
    }
  }
`;
export default ride;
