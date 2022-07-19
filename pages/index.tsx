import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import wrapper, { RootState } from 'stores';
import { Context } from 'next-redux-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Rental, BikeStateMap, BikeRidingMap, Rentaling } from 'components';
import { DateToString, TimeToString } from 'utils/processing';
import { useEffect, useState } from 'react';
import cookies from 'next-cookies';
import { memberScooterStatusApi, testApi } from './api/scooter';
import { Button } from 'components/common';
import { endLoadingAction, startLoadingAction } from 'stores/system';
import { setRentaledAction, setRidingAction } from 'stores/bike';
// content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" 는 아이폰 확대방지

import axios from 'utils/customAxios';

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
  const dispatch = useDispatch();

  const { isRentaled, isRentaling, isRiding } = useSelector((state: RootState) => state.bike);

  const fetch = async () => {
    try {
      const res = await memberScooterStatusApi();
      console.log(`Member Scooter State : ${JSON.stringify(res)}`);

      switch (res.status) {
        case 'NONE': //대여중이 아닐 경우
          dispatch(setRentaledAction({ isRentaled: false }));
          dispatch(setRidingAction({ isRiding: false }));
          break;
        case 'RENTAL': //대여중이면서 운행중이 아닌 경우
          dispatch(setRentaledAction({ isRentaled: true }));
          dispatch(setRidingAction({ isRiding: false }));
          break;
        case 'DRIVE': //대여중이면서 운행중일 경우
          dispatch(setRentaledAction({ isRentaled: true }));
          dispatch(setRidingAction({ isRiding: true }));
          break;
      }
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  useEffect(() => {
    dispatch(startLoadingAction());
    fetch();
    dispatch(endLoadingAction());
  }, []);

  const endTime = DateToString(new Date());

  const onClickTest = async () => {
    await testApi();
  };

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
        {isRentaled && !isRiding && <BikeStateMap />}
        {/* 빌린 상태이면서 주행중이면 */}
        {/* {isRentaled && isRiding && <BikeRidingMap setIsRiding={setIsRiding} />} */}
        {/* <Button onClick={onClickTest}>테스트용</Button> */}
      </AppLayout>
    </div>
  );
};

export default Home;
