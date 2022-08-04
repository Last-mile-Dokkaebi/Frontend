import { AdminLayout } from 'components/layout';
import { NextPage } from 'next';
import { testApi } from 'pages/api/scooter';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MdCalendarToday, MdLocationPin, MdElectricScooter, MdPerson } from 'react-icons/md';
import { Button } from 'components/common';
import wrapper from 'store/configureStore';
import { requestRentalRequest } from 'actions/admin';

const dummy = [
  {
    id: 1,
    identity: 'cilab1',
    address: '금오공대 디지털관 232호',
    requestDate: '2022-06-30',
    startDate: '2022-07-01',
    endDate: '2022-07-10',
    bikeNumber: '0001',
  },
  {
    id: 2,
    identity: 'cilab2',
    address: '금오공대 디지털관 332호',
    requestDate: '2022-06-20',
    startDate: '2022-07-02',
    endDate: '2022-07-20',
    bikeNumber: '0002',
  },
  {
    id: 4,
    identity: 'cilab4',
    address: '금오공대 DB102',
    requestDate: '2022-07-01',
    startDate: '2022-07-05',
    endDate: '2022-07-20',
    bikeNumber: '0004',
  },
];

const AdminHome: NextPage = () => {
  const [requested, setRequested] = useState<
    Array<{
      id: number;
      identity: string;
      address: string;
      requestDate: string;
      startDate: string;
      endDate: string;
      bikeNumber: string;
    }>
  >([]);

  useEffect(() => {
    setRequested(dummy);
    testApi();
  }, []);

  const onClickFinishRental = (req: any) => {
    let dialog = confirm(`id : ${req.id}`);
    if (dialog) {
      alert('대여를 완료하였습니다.');
    }
  };

  return (
    <AdminLayout>
      <RentalList>
        {requested.map((req) => (
          <li>
            <div id="request">{req.requestDate}</div>
            <div id="date">
              <MdCalendarToday className="icon" />
              {req.startDate} ~ {req.endDate}
            </div>
            <div id="address">
              <MdLocationPin className="icon" />
              {req.address}
            </div>
            <div id="bikeNumber">
              <MdElectricScooter className="icon" />
              {req.bikeNumber}
            </div>
            <div id="identity">
              <MdPerson className="icon" />
              {req.identity}
            </div>
            <Button style={{ marginBottom: '0.25rem' }} onClick={() => onClickFinishRental(req)}>
              대여완료
            </Button>
          </li>
        ))}
      </RentalList>
    </AdminLayout>
  );
};

const RentalList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  li {
    width: 100%;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    background-color: rgba(119, 184, 192, 0.25);

    .icon {
      color: rgb(100, 172, 180);
      margin-right: 0.5rem;
    }

    & #request {
      text-align: right;
      font-size: 0.75rem;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.4);
    }

    & #date {
      font-weight: bold;
    }

    & #address {
      padding-top: 0.25rem;
    }
    & #bikeNumber {
      font-weight: bold;
    }
    & #identity {
      font-weight: bold;
    }
  }
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(requestRentalRequest());

  return {
    props: {},
  };
});

export default AdminHome;
