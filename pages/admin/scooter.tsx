import { driveRentalRequest, noneRentalRequest, rentalRentalRequest, waitRentalRequest } from 'actions/admin';
import { EnrollScooter } from 'components';
import { AdminLayout } from 'components/layout';
import { NextPage } from 'next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import wrapper, { RootState } from 'store/configureStore';
import styled from 'styled-components';

const sortByBikeNmAsc = (a: RequestRental, b: RequestRental) => {
  const aNumber = parseInt(a.bikeNm);
  const bNumber = parseInt(b.bikeNm);
  if (aNumber > bNumber) return 1;
  else if (aNumber < bNumber) return -1;
  else return 0;
};

const sortByKey = (key: string, order: 'desc' | 'asc', type: 'string' | 'number' | 'date') => (a: any, b: any) => {
  let typeConvert;
  if (type === 'string') typeConvert = String;
  else if (type === 'date') typeConvert = Date.parse;
  else typeConvert = Number;

  const isAsc = order === 'asc' ? 1 : -1;

  const aTarget = typeConvert(a[key]);
  const bTarget = typeConvert(b[key]);

  if (aTarget > bTarget) return 1 * isAsc;
  else if (aTarget < bTarget) return -1 * isAsc;
  else return 0;
};

const scooter: NextPage = () => {
  const { noneRental, waitRental, rentalRental, driveRental } = useSelector((state: RootState) => state.admin);
  const [orderStatus, setorderStatus] = useState<'asc' | 'desc'>('desc');
  const [orderbikeNumber, setorderbikeNumber] = useState<'asc' | 'desc'>('asc');
  const [orderDate, setorderDate] = useState<'asc' | 'desc'>('desc');
  const [orderIdentity, setorderIdentity] = useState<'asc' | 'desc'>('desc');
  const [orderAddress, setorderAddress] = useState<'asc' | 'desc'>('desc');
  const [orderStart, setorderStart] = useState<'asc' | 'desc'>('desc');
  const [orderEnd, setorderEnd] = useState<'asc' | 'desc'>('desc');

  const allRental: Array<any> = [];
  noneRental.forEach((rental: RequestRental) => {
    allRental.push({ ...rental, status: 'None' });
  });
  waitRental.forEach((rental: RequestRental) => {
    allRental.push({ ...rental, status: 'Wait' });
  });
  rentalRental.forEach((rental: RequestRental) => {
    allRental.push({ ...rental, status: 'Rental' });
  });
  driveRental.forEach((rental: RequestRental) => {
    allRental.push({ ...rental, status: 'Drive' });
  });

  allRental.sort(sortByBikeNmAsc);

  const [rentals, setRentals] = useState<Array<any>>(allRental);

  const onClickSort = (key: string) => {
    if (key === 'status') {
      setRentals([...rentals].sort(sortByKey(key, orderStatus, 'string')));
      setorderStatus(orderStatus === 'asc' ? 'desc' : 'asc');
    } else if (key === 'bikeNm') {
      setRentals([...rentals].sort(sortByKey(key, orderbikeNumber, 'number')));
      setorderbikeNumber(orderbikeNumber === 'asc' ? 'desc' : 'asc');
    } else if (key === 'date') {
      setRentals([...rentals].sort(sortByKey(key, orderDate, 'date')));
      setorderDate(orderDate === 'asc' ? 'desc' : 'asc');
    } else if (key === 'identity') {
      setRentals([...rentals].sort(sortByKey(key, orderIdentity, 'string')));
      setorderIdentity(orderIdentity === 'asc' ? 'desc' : 'asc');
    } else if (key === 'address') {
      setRentals([...rentals].sort(sortByKey(key, orderAddress, 'string')));
      setorderAddress(orderAddress === 'asc' ? 'desc' : 'asc');
    } else if (key === 'startDate') {
      setRentals([...rentals].sort(sortByKey(key, orderStart, 'date')));
      setorderStart(orderStart === 'asc' ? 'desc' : 'asc');
    } else if (key === 'endDate') {
      setRentals([...rentals].sort(sortByKey(key, orderEnd, 'date')));
      setorderEnd(orderEnd === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <AdminLayout>
      <EnrollScooter />
      <br />
      <h2>현재 스쿠터 상태</h2>
      <RentalTableWrapper>
        <RentalTable>
          <thead>
            <tr>
              <th
                onClick={() => {
                  onClickSort('status');
                }}
              >
                상태
              </th>
              <th
                onClick={() => {
                  onClickSort('bikeNm');
                }}
              >
                바이크번호
              </th>
              <th
                onClick={() => {
                  onClickSort('date');
                }}
              >
                날짜
              </th>
              <th
                onClick={() => {
                  onClickSort('identity');
                }}
              >
                대상
              </th>
              <th
                onClick={() => {
                  onClickSort('address');
                }}
              >
                주소
              </th>
              <th
                onClick={() => {
                  onClickSort('startDate');
                }}
              >
                시작날짜
              </th>
              <th
                onClick={() => {
                  onClickSort('endDate');
                }}
              >
                종료날짜
              </th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => {
              return (
                <tr key={rental.rentalId} className={rental.status}>
                  <td>{rental.status.substring(0, 1)}</td>
                  <td>{rental.bikeNm}</td>
                  <td>{rental.date ?? '·'}</td>
                  <td>{rental.identity}</td>
                  <td>{rental.address ?? '·'}</td>
                  <td>{rental.startDate}</td>
                  <td>{rental.endDate}</td>
                </tr>
              );
            })}
          </tbody>
        </RentalTable>
      </RentalTableWrapper>
    </AdminLayout>
  );
};

const RentalTableWrapper = styled.div`
  background-color: white;
  border-raidus: 4px;
  margin-top: 1rem;
  padding: 1rem;
`;

const RentalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: rgb(59, 59, 59);
  font-size: 14px;
  td {
    padding: 1rem;
  }
  thead {
    th {
      border-bottom: solid 1px #d6d6d6;
      text-align: left;
      padding: 0.1rem 0.2rem 0.1rem 0.2rem;
      font-size: 0.75rem;
    }
    th:hover {
      cursor: pointer;
      background-colore: rgba(0, 0, 0, 0.25);
    }
  }
  tbody {
    tr {
      td {
        font-size: 0.75rem;
        text-align: left;
      }
    }
    tr.None {
      background-color: rgba(0, 0, 0, 0.1);
    }
    tr.Wait {
      background-color: rgba(0, 128, 255, 0.1);
    }
    tr.Rental {
      background-color: rgba(0, 255, 0, 0.1);
    }
    tr.Drive {
      background-color: rgba(255, 0, 0, 0.1);
    }

    tr:hover {
      cursor: pointer;
      // background-color: #77b8c020;
      background-color: rgb(80, 80, 80);
      border-radius: 4px;
      transition: 0.2s;
      td {
        color: white;
      }
    }
  }
  .COMPLETE {
    color: #558287;
    font-weight: bold;
  }
  .REGISTERED {
    color: grey;
    font-weight: bold;
  }
  .RESPONDED {
    color: orange;
    font-weight: bold;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await Promise.all([
    store.dispatch(noneRentalRequest()),
    store.dispatch(waitRentalRequest()),
    store.dispatch(rentalRentalRequest()),
    store.dispatch(driveRentalRequest()),
  ]);

  return {
    props: {},
  };
});

export default scooter;
