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
import { RiInputCursorMove } from 'react-icons/ri';

const test: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedin, identity } = useSelector((state: RootState) => state.user);

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
    dispatch(loginAction({ identity: input }));
  };
  const onClickModal = () => {
    dispatch(setModal(true));
  };

  const onClickLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      {/* <Dialog delay={1}>
        <div>Dialog 테스트</div>
      </Dialog> */}

      <Modal iconUrl={'/assets/img/information-icon.png'} title={'모달 제목은 여기에'} subtitle={'테스트 모달 안내입니다. 아이콘은 있으면 띄우고 없으면 안띄우고..'}>
        <div>여기는 아무 내용 아무 컴포넌트 막 들어가도 됩니다..</div>
      </Modal>
      <AppLayout>
        <div>당신의 닉네임은 {identity}</div>
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
        </div>
        <div>현재 시간은 {JSON.stringify(time)}</div>
        <Button onClick={onClickLogout}>logoutAction</Button>
      </AppLayout>
    </>
  );
};

export default test;

