import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from 'stores/user';
import { setModal } from 'stores/system';
import { RootState } from 'stores';
import Button from 'components/common/Button';
import { useEffect, useState } from 'react';
import { AppLayout } from 'components/layout';
import { Modal } from 'components/common';
import { useInput } from 'hooks';

const test: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedin, nickname } = useSelector((state: RootState) => state.user);

  const [input, setInput] = useState<string>('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // changeEvent예시
  const [value1, onChangeValue1] = useInput<string>('lower_value');
  const [value2, onChangeValue2] = useInput<string>('UPPER_VALUE', (e) => {
    return e.target.value.toUpperCase();
  });

  //만약 e자체로 바꾸고 싶으면 이렇게
  //근데 이 경우에는 e가 object이므로 제대로 동작 안함
  // const [value3, onChangeValue3] = useInput<string>('value3', (e) => {
  //   return e
  // });

  const onClickLogin = () => {
    alert('로그인하기');
    dispatch(loginAction({ nickname: input }));
  };
  const onClickModal = () => {
    dispatch(setModal(true));
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
          {/* <div>{value3}</div>
          <input value={value3} onChange={onChangeValue3} /> */}
        </div>
      </AppLayout>
    </>
  );
};

export default test;
