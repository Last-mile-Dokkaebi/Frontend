import type { NextPage } from 'next';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정
import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button } from 'components/common';
import { ExportToCsv } from 'export-to-csv';
import { useAppDispatch } from 'store/configureStore';
import { logoutAction } from 'actions/user';

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
  altitude: number;
}

const test: NextPage = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<DataTypes>>([]);

  const dataFetch = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/scooter/test`);

    const sortedData = res.data.sort((a: DataTypes, b: DataTypes) => b.id - a.id);
    setData(sortedData);
  };

  const onClickLogout = () => {
    dispatch(logoutAction());
  };

  const onClickDownload = () => {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      // showTitle: true,
      // title: data[0].time.toString().substring(0, 19),
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: data[0].time.toString().substring(0, 19),
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const temperature = window.prompt('현재 기온 입력');
    const humidity = window.prompt('현재 습도 입력');

    const csvExporter = new ExportToCsv(options);

    const csvData = data
      .sort((a, b) => a.id - b.id)
      .map((d, index) =>
        Object.assign(d, {
          envTemperature: temperature,
          humidity,
          distance: `=IFERROR(ACOS(COS(RADIANS(90-H${index + 1}))*COS(RADIANS(90-H${index + 2}))+SIN(RADIANS(90-H${
            index + 1
          })) *SIN(RADIANS(90-H${index + 2}))*COS(RADIANS(I${index + 1}-I${index + 2})))*6371, 0)`,
        }),
      );
    csvExporter.generateCsv(csvData);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <>
      <AppLayout>
        <Button isPrimary={true} onClick={onClickDownload}>
          csv로 내보내기
        </Button>
        <Button onClick={onClickLogout}>로그아웃</Button>
        <div style={{ textAlign: 'center' }}>
          <h1>{data[0] && data[0].time.substring(11, 11 + 8)}</h1>
        </div>
        <DataTable>
          <thead>
            <tr>
              <th>id</th>
              <th>time</th>
              <th>lat</th>
              <th>lng</th>
              <th>alt</th>
              <th>pow</th>
              <th>soc</th>
              <th>temp</th>
              <th>volt</th>
              <th>current</th>
              <th>speed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.time.toString().substring(11, 11 + 8)}</td>
                  <td>{d.lat}</td>
                  <td>{d.lng}</td>
                  <td>{d.altitude}</td>
                  <td>{d.pow}</td>
                  <td>{d.soc}</td>
                  <td>{d.temp}</td>
                  <td>{d.volt}</td>
                  <td>{d.current}</td>
                  <td>{d.speed}</td>
                </tr>
              );
            })}
          </tbody>
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
