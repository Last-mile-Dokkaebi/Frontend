import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import { useSelector } from 'react-redux';
import { Rental, BikeStateMap, BikeRidingMap, Rentaling } from 'components';
import wrapper, { RootState } from 'store/configureStore';
import { scooterStateRequest } from 'actions/bike';
import { useEffect } from 'react';

// content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" 는 아이폰 확대방지

interface HomeTypes {
  isRentaled: boolean;
  riding: boolean;
  lat: number;
  lng: number;
  soc: number;
  startDate: string;
  endDate: string;
}

const Home: NextPage<HomeTypes> = () => {
  const { status } = useSelector((state: RootState) => state.bike);
  const { scooterRentalDone, scooterStartDone, scooterFinishDone } = useSelector((state: RootState) => state.bike);

  useEffect(() => {
    if (scooterRentalDone) {
      alert('스쿠터 대여신청을 성공하였습니다');
      //이 부분은 임시로 새로고침 하기
      window.location.href = '/';
    }
  }, [scooterRentalDone]);

  useEffect(() => {
    if (scooterStartDone) {
      alert('주행을 시작합니다');
      window.location.href = '/';
    }
  }, [scooterStartDone]);

  useEffect(() => {
    if (scooterFinishDone) {
      alert('주행을 종료합니다');
      window.location.href = '/';
    }
  }, [scooterFinishDone]);

  return (
    <div>
      <Head>
        <title>DOKKAEBI - LAST MILE 모빌리티</title>
        <meta name="description" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        {/* 빌린 상태가 아니면 */}
        {status === 'NONE' && <Rental />}
        {/* 대여신청을 하였으며 현재 진행중인 경우 => 현재 미구현*/}
        {status === 'WAIT' && <Rentaling />}
        {/* 빌린 상태이면서 주행중이 아니면 */}
        {status === 'RENTAL' && <BikeStateMap />}
        {/* 빌린 상태이면서 주행중이면 */}
        {status === 'DRIVE' && <BikeRidingMap />}
      </AppLayout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(scooterStateRequest());
  return {
    props: {},
  };
});

export default Home;
