import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import axios from 'axios';
import styled from 'styled-components';
import wrapper from 'store/configureStore';
import { useEffect, useState } from 'react';

interface DataTypes {
  id: number;
  lat: number;
  lng: number;
  pow: string;
  shock: number;
  soc: number;
  stat: string;
  temp: number;
  time: string;
  volt: number;
  current: string;
  speed: number;
}

// interface TestTypes {
//   data: Array<DataTypes>;
// }

const test: NextPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);

  const dataFetch = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/scooter/test`);

    const data: Array<DataTypes> = res.data.map((d: any) => {
      return { ...d, time: d.time.toString().substring(11, 11 + 8) };
    });

    const sortedData = data.sort((a: DataTypes, b: DataTypes) => b.id - a.id);
    setData(sortedData.slice(0, 500)); //500건만 자르기
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <>
      <AppLayout>
        <DataTable>
          <thead>
            <tr>
              <th>id</th>
              <th>time</th>
              <th>lat</th>
              <th>lng</th>
              <th>pow</th>
              <th>soc</th>
              <th>temp</th>
              <th>volt</th>
              <th>current</th>
              <th>speed</th>
            </tr>
          </thead>
          {/* <th>id</th>
          <th>time</th>
          <th>lat</th>
          <th>lng</th>
          <th>pow</th>
          <th>soc</th>
          <th>temp</th>
          <th>volt</th>
          <th>curr</th>
          <th>speed</th> */}
          {data.map((d) => {
            return (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.time}</td>
                <td>{d.lat}</td>
                <td>{d.lng}</td>
                <td>{d.pow}</td>
                <td>{d.soc}</td>
                <td>{d.temp}</td>
                <td>{d.volt}</td>
                <td>{d.current}</td>
                <td>{d.speed}</td>
              </tr>
            );
          })}
        </DataTable>
      </AppLayout>
    </>
  );
};

const DataTable = styled.table`
  th {
    font-size: 0.85rem;
    border-bottom: 2px solid black;
  }
  td {
    font-size: 0.65rem;
  }
`;

// export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/scooter/test`);

//   console.log(res.data);

//   const data: Array<DataTypes> = res.data.map((d: any) => {
//     return { ...d, time: d.time.toString().substring(11, 11 + 8) };
//   });

//   const sortedData = data.sort((a: DataTypes, b: DataTypes) => b.id - a.id);

//   return {
//     props: { data: sortedData },
//   };
// });

export default test;
