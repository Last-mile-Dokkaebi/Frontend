import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import wrapper, { RootState } from 'stores';
import { Context } from 'next-redux-wrapper';
import { useSelector } from 'react-redux';
import { Rental, BikeStateMap, BikeRidingMap } from 'components';
import { DateToString, TimeToString } from 'utils/processing';
import { useState } from 'react';
// content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" 는 아이폰 확대방지

interface HomeTypes {
  riding: boolean;
  lat: number;
  lng: number;
  soc: number;
  endDate: string;
  endTime: string;
}

const Home: NextPage<HomeTypes> = ({ riding, lat, lng, soc, endDate, endTime }) => {
  const [isRiding, setIsRiding] = useState<boolean>(riding);
  const { bikeNumber } = useSelector((state: RootState) => state.user);
  // const isRentaled = bikeNumber === '' ? false : true; //빌린 바이크가 있는지
  const isRentaled = true; //임시 확인용

  return (
    <div>
      <Head>
        <title>DOKKAEBI - LAST MILE 모빌리티</title>
        <meta name="description" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        {!isRentaled && <Rental />} {/* 빌린 상태가 아니면 */}
        {isRentaled && !isRiding && (
          <BikeStateMap lat={lat} lng={lng} soc={soc} endDate={endDate} endTime={endTime} setIsRiding={setIsRiding} />
        )}{' '}
        {/* 빌린 상태이면서 주행중이 아니면 */}
        {isRentaled && isRiding && <BikeRidingMap setIsRiding={setIsRiding} />} {/* 빌린 상태이면서 주행중이면 */}
      </AppLayout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: Context) => {
  const riding = false; //임시로 현재 주행중이 아니라고 표시

  let lat = 0;
  let lng = 0;
  let soc = 0;
  let endDate = '';
  let endTime = '';

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
    endDate = DateToString(new Date());
    endTime = TimeToString(new Date());
  }

  return { props: { riding, lat, lng, soc, endDate, endTime } };
});

export default Home;
