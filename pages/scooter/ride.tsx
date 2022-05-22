import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppLayout } from 'components/layout';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiKickScooter } from 'react-icons/gi';
const ride: NextPage = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  const [battery, setBattery] = useState<number>(100);
  useEffect(() => {
    // api통신해서 불러오는 부분 작성 필요
    console.log(process.env.NEXT_PUBLIC_KAKAOMAP)
    setPosition({ lat: dummyData.lat, lng: dummyData.lng });
  }, []);

  return (
    <AppLayout>
      <MapWrapper></MapWrapper>
      <RideInfoWrapper>
        <div className="title">주행중...🛴</div>

        <InfoWrapper>
          <div className="info">
            <div className="icon">
              <AiOutlineClockCircle size="30" />
            </div>

            <div className="value-wrapper">
              <div>이용 시간</div>
              <div className="value">1:21</div>
            </div>
          </div>
          <div className="info">
            <div className="icon">
              <Battery>
                <div
                  className={`battery-level ${battery < 25 && battery >= 10 && 'warn'} ${battery < 10 && 'alert'}`}
                  style={{ height: `${battery}%` }}
                ></div>
              </Battery>
            </div>

            <div className="value-wrapper">
              <div>킥보드 배터리 잔량</div>
              <div className="value">80%</div>
            </div>
          </div>
          <div className="info">
            <div className="icon">
              <GiKickScooter size="30" />
            </div>
            <div className="value-wrapper">
              <div>이동 거리</div>
              <div className="value">2.6 km</div>
            </div>
          </div>
        </InfoWrapper>
      </RideInfoWrapper>
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
  height: 73%;
`;

const RideInfoWrapper = styled.div`
  width: 100%;
  height: 27%;
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
