import { enrollScooterRequest } from 'actions/admin';
import { logoutAction, myInfoRequest } from 'actions/user';
import { Button, CustomInput } from 'components/common';
import { useInput } from 'hooks';
import router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store/configureStore';

const EnrollScooter = () => {
  const maxLength = 4; //바이크 번호의 자리수를 정함
  const dispatch = useAppDispatch();

  const { enrollScooterLoading, enrollScooterDone } = useSelector((state: RootState) => state.admin);

  const [bikeNumber, onChangeBikeNumber] = useInput<string>('', (e: React.ChangeEvent<HTMLInputElement>) => {
    return e.target.value.substring(0, maxLength);
  });

  const onClickEnroll = async () => {
    if (bikeNumber.length !== 4) {
      alert(`바이크 번호는 ${maxLength}자리 이여야 합니다`);
    } else {
      if (confirm(`${bikeNumber}를 등록합니다`)) {
        await dispatch(enrollScooterRequest({ identity: bikeNumber }));
      }
    }
  };

  useEffect(() => {
    if (enrollScooterDone) {
      alert(`${bikeNumber}를 성공적으로 등록하였습니다`);
      // router.reload();
    }
  }, [enrollScooterDone]);

  return (
    <>
      <h2>스쿠터 등록</h2>
      <CustomInput value={bikeNumber} onChange={onChangeBikeNumber} placeholder="0001" label="스쿠터 번호" />
      <Button onClick={onClickEnroll} bgcolor={'#77b8c0'} loading={enrollScooterLoading}>
        스쿠터 등록
      </Button>
    </>
  );
};

export default EnrollScooter;
