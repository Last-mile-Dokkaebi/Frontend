import { driveRentalRequest, noneRentalRequest, rentalRentalRequest, waitRentalRequest } from 'actions/admin';
import { EnrollScooter } from 'components';
import { AdminLayout } from 'components/layout';
import { NextPage } from 'next';
import wrapper from 'store/configureStore';

const scooter: NextPage = () => {
  return (
    <AdminLayout>
      <EnrollScooter />
    </AdminLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(noneRentalRequest());
  await store.dispatch(waitRentalRequest());
  await store.dispatch(rentalRentalRequest());
  await store.dispatch(driveRentalRequest());

  console.log(store.getState().admin);

  return {
    props: {},
  };
});

export default scooter;
