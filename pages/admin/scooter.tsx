import { driveRentalRequest, noneRentalRequest, rentalRentalRequest, waitRentalRequest } from 'actions/admin';
import { myInfoRequest } from 'actions/user';
import { EnrollScooter } from 'components';
import { AdminLayout } from 'components/layout';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import wrapper, { RootState } from 'store/configureStore';

const sortByAsc = (a: RequestRental, b: RequestRental) => {
  const aNumber = parseInt(a.bikeNm);
  const bNumber = parseInt(b.bikeNm);
  if (aNumber > bNumber) return 1;
  else if (aNumber < bNumber) return -1;
  else return 0;
};

const scooter: NextPage = () => {
  const { noneRental, waitRental, rentalRental, driveRental } = useSelector((state: RootState) => state.admin);

  const allRental = [...noneRental, ...waitRental, ...rentalRental, ...driveRental].sort(sortByAsc);

  return (
    <AdminLayout>
      {allRental.map((rental: RequestRental, index) => {
        return <div>{rental.bikeNm}</div>;
      })}
      <EnrollScooter />
    </AdminLayout>
  );
};

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
