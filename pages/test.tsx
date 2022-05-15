import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from 'stores/user';
import { RootState } from 'stores';
import Button from 'components/common/Button';
import { useEffect, useState } from 'react';
import { AppLayout } from 'components/layout';

const test: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedin, nickname } = useSelector((state: RootState) => state.user);

  const [input, setInput] = useState<string>('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    console.log(isLoggedin);
    console.log(nickname);
  }, [isLoggedin, nickname]);

  const onClickLogin = () => {
    alert('로그인하기');
    dispatch(loginAction({ nickname: input }));
  };

  return (
    <AppLayout>
      <div>당신의 닉네임은 {nickname}</div>
      <div>
        <Button onClick={onClickLogin} color="red">
          로그인
        </Button>
        <input value={input} onChange={onChangeInput} />
      </div>
    </AppLayout>
  );
};

export default test;
