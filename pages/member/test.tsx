import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import axios from 'axios';
import styled from 'styled-components';
import wrapper from 'store/configureStore';

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
}

interface TestTypes {
  data: Array<DataTypes>;
}

const test: NextPage<TestTypes> = ({ data }) => {
  return (
    <div>
      <Head>
        <title>DOKKAEBI - LAST MILE 모빌리티</title>
        <meta name="description" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <DataTable>
          <tr>
            <th>id</th>
            <th>lat</th>
            <th>lng</th>
            <th>power</th>
            <th>shock</th>
            <th>soc</th>
            <th>stat</th>
            <th>temp</th>
            <th>time</th>
            <th>volt</th>
            <th>current</th>
          </tr>
          {data.map((d) => {
            return (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.lat}</td>
                <td>{d.lng}</td>
                <td>{d.pow}</td>
                <td>{d.shock}</td>
                <td>{d.soc}</td>
                <td>{d.stat}</td>
                <td>{d.temp}</td>
                <td>{d.time}</td>
                <td>{d.volt}</td>
                <td>{d.current}</td>
              </tr>
            );
          })}
        </DataTable>
      </AppLayout>
    </div>
  );
};

const DataTable = styled.table`
  th {
    font-size: 1rem;
    border-bottom: 2px solid black;
  }
  td {
    font-size: 0.8rem;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/scooter/test`);

  const data: Array<DataTypes> = res.data.map((d: any) => {
    return { ...d, time: d.time.toString().substring(11, 11 + 8) };
  });

  const sortedData = data.sort((a: DataTypes, b: DataTypes) => b.id - a.id);

  return {
    props: { data: sortedData },
  };
});

export default test;
