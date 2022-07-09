import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import { Button } from 'components/common';
import wrapper, { RootState } from 'stores';
import { Context } from 'next-redux-wrapper';
import { getScooterLocationApi } from './api/scooter';
import { useSelector } from 'react-redux';
import Rental from 'components/Rental';
// content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" 는 아이폰 확대방지

const Home: NextPage = () => {
  const { bikeNumber } = useSelector((state: RootState) => state.user);
  const isRentaled = bikeNumber === '' ? false : true; //빌린 바이크가 있는지

  return (
    <div>
      <Head>
        <title>DOKKAEBI - LAST MILE 모빌리티</title>
        <meta name="description" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        {!isRentaled && <Rental />}
        {isRentaled && <div>빌린 바이크 있음</div>}
      </AppLayout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: Context) => {
  // try {
  //   const res = await getScooterLocationApi();
  //   console.log(res);
  // } catch (err) {
  //   console.log(err);
  // }
  // console.log(store.getState().user);

  return { props: {} };
});

export default Home;
