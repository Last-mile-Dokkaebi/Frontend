/* 일반회원 회원가입 */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Router from 'next/router';

import MemberLayout from 'components/layout/MemberLayout';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useInput } from 'hooks';

/* redux */
import { useSelector } from 'react-redux';
import { loginRequest } from 'actions/user';
import { RootState, useAppDispatch } from 'store/configureStore';

const login: NextPage = () => {
  const dispatch = useAppDispatch();

  const { loginLoading, loginDone, loginError, auth } = useSelector((state: RootState) => state.user);

  const [identity, identityHandler] = useInput<string>(''); // 값을 넣지 않으면 "" 로 초기화
  const [password, passwordHandler] = useInput<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (loginDone) {
      if (auth === 'ADMIN') {
        location.href = '/admin';
      } else {
        location.href = '/';
      }
    }
  }, [loginDone]);

  const onClickJoin = () => {
    Router.push('/member/join');
  };

  const onClickLogin = async () => {
    if (identity === '' || password === '') {
      setErrorMessage('아이디 또는 비밀번호를 입력해주세요');
    } else {
      dispatch(loginRequest({ identity, password }));
    }
  };
  return (
    <MemberLayout>
      <ImageWrapper>
        <Image src={'/assets/img/도깨비메인.PNG'} />
      </ImageWrapper>
      <LoginFormWrapper>
        <CustomInput type="text" placeholder="아이디" onChange={identityHandler} />
        <CustomInput type="password" placeholder="비밀번호" onChange={passwordHandler} />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button
          onClick={onClickLogin}
          width={'100%'}
          height={'3rem'}
          bgcolor={'#77b8c0'}
          color={'white'}
          loading={loginLoading}
        >
          로그인
        </Button>
        <Button onClick={onClickJoin} width={'100%'} height={'3rem'} bgcolor={'#eeeeee'} color={'black'}>
          회원가입
        </Button>
      </LoginFormWrapper>
    </MemberLayout>
  );
};

const ImageWrapper = styled.div`
  width: 10rem;
  overflow: hidden;
  margin: 50px auto;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoginFormWrapper = styled.div`
  padding: 1rem;
`;
const CustomInput = styled.input`
  width: 100%;
  border: solid 1px #d6d6d6;
  border-radius: 12px;
  padding-left: 1rem;
  height: 3rem;
  margin: 0.5rem 0 0.5rem 0;
`;
const ErrorMessage = styled.div`
  color: #ff003e; /* 빨간색이긴 한데 ... */
  margin: 0.5rem 0 0.5rem 0;
  font-size: 12px;
  padding-left: 4px;
`;
export default login;
