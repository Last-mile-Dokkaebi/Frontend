import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, logoutAction } from 'stores/user';
import { setModal } from 'stores/system';
import { RootState } from 'stores';
import Button from 'components/common/Button';
import { useEffect, useState } from 'react';
import { AppLayout } from 'components/layout';
import { Modal } from 'components/common';
import { useDebounce, useInput, useInterval } from 'hooks';

const test: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedin, nickname } = useSelector((state: RootState) => state.user);

  const [input, setInput] = useState<string>('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // useInput예시
  const [value1, onChangeValue1] = useInput<string>('value');
  const [value2, onChangeValue2] = useInput<string>('UPPER_VALUE', (e) => {
    return e.target.value.toUpperCase();
  });
  const [value3, onChangeValue3] = useInput<string>('lower_value', (e) => {
    return e.target.value.toLowerCase();
  });

  // useInterval 예시
  const [time, setTime] = useState<Date>(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);

  const onClickLogin = () => {
    alert('로그인하기');
    dispatch(loginAction({ nickname: input }));
  };
  const onClickModal = () => {
    dispatch(setModal(true));
  };

  const onClickLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <Modal>
        <div style={{ width: '250px', height: '250px' }}>Dialog 테스트</div>
      </Modal>
      <AppLayout>
        <div>당신의 닉네임은 {nickname}</div>
        <div>
          <Button onClick={onClickLogin} color="red">
            로그인
          </Button>
          <input value={input} onChange={onChangeInput} />
          <div>{process.env.NEXT_PUBLIC_BACKEND}</div>
          <Button onClick={onClickModal}>Dialog 테스트</Button>
          <div>{value1}</div>
          <input value={value1} onChange={onChangeValue1} />
          <div>{value2}</div>
          <input value={value2} onChange={onChangeValue2} />
          <div>{value3}</div>
          <input value={value3} onChange={onChangeValue3} />
          <Modal></Modal>
        </div>
        <div>현재 시간은 {JSON.stringify(time)}</div>
        <Button onClick={onClickLogout}>logoutAction</Button>
      </AppLayout>
    </>
  );
};

export default test;
