import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import wrapper, { RootState } from 'stores';
import { Context } from 'next-redux-wrapper';
import { useSelector } from 'react-redux';
import { Rental, BikeStateMap, BikeRidingMap, Rentaling } from 'components';
import { DateToString, TimeToString } from 'utils/processing';
import { useState } from 'react';
import cookies from 'next-cookies';
import { memberScooterStatusApi } from './api/scooter';
import { ACCESS_TOKEN } from 'utils/constant';
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

const Home: NextPage<HomeTypes> = ({ isRentaled, riding, lat, lng, soc, startDate, endDate }) => {
  const [isRiding, setIsRiding] = useState<boolean>(riding);
  // const isRentaled = bikeNumber === '' ? false : true; //빌린 바이크가 있는지

  const endTime = DateToString(new Date());

  return (
    <div>
      <Head>
        <title>DOKKAEBI - LAST MILE 모빌리티</title>
        <meta name="description" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        {/* 빌린 상태가 아니면 */}
        {!isRentaled && <Rental />}
        {/* 대여신청을 하였으며 현재 진행중인 경우 => 현재 미구현*/}
        {/* <Rentaling /> */}
        {/* 빌린 상태이면서 주행중이 아니면 */}
        {isRentaled && !isRiding && (
          <BikeStateMap lat={lat} lng={lng} soc={soc} endDate={endTime} endTime={endDate} setIsRiding={setIsRiding} />
        )}{' '}
        {/* 빌린 상태이면서 주행중이면 */}
        {isRentaled && isRiding && <BikeRidingMap setIsRiding={setIsRiding} />}
      </AppLayout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: Context) => {
  const allCookies = cookies(context);
  const accessToken = allCookies.ACCESS_TOKEN;
  console.log(accessToken);

  let isRentaled = false;
  let riding = false;
  let lat = 0;
  let lng = 0;
  let soc = 0;
  let startDate = '';
  let endDate = '';
  let status;
  if (accessToken !== '' && accessToken !== null) {
    try {
      const res = await memberScooterStatusApi();
      console.log(res);
      status = res.status;
      startDate = res.startDate;
      endDate = res.endDate;

      isRentaled = status === 'RENTAL' || status === 'DRIVE';
      riding = status === 'DRIVE'; //임시로 현재 주행중이 아니라고 표시

      if (!riding) {
        //주행중이 아니면 최근 바이크 위치만 받아오기
        // try {
        //   const res = await getScooterLocationApi();
        //   console.log(res);
        // } catch (err) {
        //   console.log(err);
        // }

        lat = 36.144765;
        lng = 128.392134;
        soc = 40;
        // endDate = DateToString(new Date());
        // endTime = TimeToString(new Date());
      }
    } catch (err) {
      console.log(err);
    }
  }

  return { props: { isRentaled, riding, lat, lng, soc, startDate, endDate } };
});

export default Home;
