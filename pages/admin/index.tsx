import { AdminLayout } from 'components/layout';
import { NextPage } from 'next';
import styled from 'styled-components';
import wrapper, { RootState } from 'store/configureStore';
import { requestRentalRequest } from 'actions/admin';
import { RentalRequestCard } from 'components';
import { useSelector } from 'react-redux';

const AdminHome: NextPage = () => {
  const { requestRental } = useSelector((state: RootState) => state.admin);

  return (
    <AdminLayout>
      <RentalList>
        {requestRental.map((request: RequestRental) => {
          return <RentalRequestCard request={request} key={request.rentalId} />;
        })}
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
  console.log(store.getState().admin);

  return {
    props: {},
  };
});

export default AdminHome;
