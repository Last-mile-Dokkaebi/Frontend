import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from 'stores/user';
import { setDialog } from 'stores/system';
import { RootState } from 'stores';
import Button from 'components/common/Button';
import { useEffect, useState } from 'react';
import { AppLayout } from 'components/layout';
import { Dialog } from 'components/common';

const test: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedin, nickname } = useSelector((state: RootState) => state.user);

  const [input, setInput] = useState<string>('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClickLogin = () => {
    alert('로그인하기');
    dispatch(loginAction({ nickname: input }));
  };
  const onClickDialog = () => {
    dispatch(setDialog(true));
  };

  return (
    <>
      <Dialog delay={1}>
        <div>Dialog 테스트</div>
      </Dialog>
      
      <AppLayout>
        <div>당신의 닉네임은 {nickname}</div>
        <div>
          <Button onClick={onClickLogin} color="red">
            로그인
          </Button>
          <input value={input} onChange={onChangeInput} />
          <div>{process.env.NEXT_PUBLIC_BACKEND}</div>
          <Button onClick={onClickDialog}>Dialog 테스트</Button>
        </div>
      </AppLayout>
    </>
  );
};

export default test;
