import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import wrapper from 'store/configureStore';
import axios from 'axios';
import styled from 'styled-components';

interface DataTypes {
  id: number;
  lat: number;
  lng: number;
  power: number;
  shock: number;
  soc: number;
  stat: string;
  temp: number;
  time: string;
  volt: number;
  drive_log_id: number;
  scooter_id: number;
  current: number;
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
            <th>drive_log_id</th>
            <th>scooter_id</th>
            <th>current</th>
          </tr>
          {data.map((d) => {
            return (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.lat}</td>
                <td>{d.lng}</td>
                <td>{d.power}</td>
                <td>{d.shock}</td>
                <td>{d.soc}</td>
                <td>{d.stat}</td>
                <td>{d.temp}</td>
                <td>{d.time.toString().substring(10, 8)}</td>
                <td>{d.volt}</td>
                <td>{d.drive_log_id}</td>
                <td>{d.scooter_id}</td>
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
    font-size: 0.55rem;
    border-bottom: 2px solid black;
  }
  td {
    font-size: 0.65rem;
  }
`;

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/scooter/test`);

  const data = res.data;

  // const data = [
  //   {
  //     id: 6808,
  //     lat: 36.14533,
  //     lng: 128.39234,
  //     pow: 0,
  //     shock: 0,
  //     soc: 94,
  //     stat: 'AA',
  //     temp: 24,
  //     time: '2022-10-12 17:57:54.424466',
  //     volt: 53.65,
  //     drive_log_id: null,
  //     scoter_id: 1,
  //     current: 0,
  //   },
  //   {
  //     id: 6807,
  //     lat: 36.14533,
  //     lng: 128.39234,
  //     pow: 0,
  //     shock: 0,
  //     soc: 94,
  //     stat: 'AA',
  //     temp: 24,
  //     time: '2022-10-12 17:57:44.425084',
  //     volt: 53.65,
  //     drive_log_id: null,
  //     scoter_id: 1,
  //     current: 0,
  //   },
  //   {
  //     id: 6806,
  //     lat: 36.14533,
  //     lng: 128.39234,
  //     pow: 0,
  //     shock: 0,
  //     soc: 94,
  //     stat: 'AA',
  //     temp: 24,
  //     time: '2022-10-12 17:57:34.426806',
  //     volt: 53.65,
  //     drive_log_id: null,
  //     scoter_id: 1,
  //     current: 0,
  //   },
  //   {
  //     id: 6805,
  //     lat: 36.14533,
  //     lng: 128.39234,
  //     pow: 0,
  //     shock: 0,
  //     soc: 94,
  //     stat: 'AA',
  //     temp: 24,
  //     time: '2022-10-12 17:57:24.426619',
  //     volt: 53.65,
  //     drive_log_id: null,
  //     scoter_id: 1,
  //     current: 0,
  //   },
  // ];

  return {
    props: { data },
  };
}

export default test;
