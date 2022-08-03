import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { Button } from 'components/common';
import React from 'react';
import { endRidingApi } from 'pages/api/scooter';
import { DateToString, TimeToString } from 'utils/processing';
import { useRouter } from 'next/router';

const BikeRidingMap = () => {
  const router = useRouter();
  /* 테스트용 더미 데이터*/
  const lat = 36.144765;
  const lng = 128.392134;
  const soc = 40;
  const endDate = DateToString(new Date());
  const endTime = TimeToString(new Date());
  /*---------------------*/

  const onClickEndRiding = () => {
    try {
      //API호출 부 필요
      // async endRidingApi()
      // setIsRiding(false); //주행중이 아니라고 바꿈
      alert('주행을 종료합니다');
      router.push('/'); //새로고침
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
        에 주행을 시작하였습니다
      </div>
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
