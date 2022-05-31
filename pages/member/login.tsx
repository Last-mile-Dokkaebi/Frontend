/* 일반회원 회원가입 */
import { NextPage } from 'next';
import { useState } from 'react';
import Router from 'next/router';

import MemberLayout from 'components/layout/MemberLayout';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useInput } from 'hooks';

/* redux */
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, setAccessToken, setRefreshToken } from 'stores/user';
import { RootState } from 'stores';
import { loginApi } from 'pages/api/member'; // 로그인 api
import { setToken } from 'utils/token';

const login: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedin, identity } = useSelector((state: RootState) => state.user);

  const [inputIdentity, inputIdentityHandler] = useInput<string>(''); // 값을 넣지 않으면 "" 로 초기화
  const [inputPassword, inputPasswordHandler] = useInput<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const onClickJoin = () => {
    Router.push('/member/join');
  };
  const onClickLogin = async () => {
    if (inputIdentity === '' || inputPassword === '') {
      setErrorMessage('아이디 또는 비밀번호를 입력해주세요');
    } else {
      try {
        const { accessToken, refreshToken } = await loginApi(inputIdentity, inputPassword);
        dispatch(loginAction({ identity: inputIdentity }));
        setToken(accessToken, refreshToken);
        Router.push('/');
      } catch (error: any) { // 타입을 모르겠습니다.. 
        setErrorMessage(error.response.data.description); // 벡엔드에서 주는 에러 메세지를 바로 출력
      }
    }
  };
  return (
    <MemberLayout>
      <ImageWrapper>
        <Image src={'/assets/img/도깨비메인.PNG'} />
      </ImageWrapper>
      <LoginFormWrapper>
        <CustomInput type="text" placeholder="아이디" onChange={inputIdentityHandler} />
        <CustomInput type="password" placeholder="비밀번호" onChange={inputPasswordHandler} />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button onClick={onClickLogin} width={'100%'} height={'3rem'} bgcolor={'#77b8c0'} color={'white'}>
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
