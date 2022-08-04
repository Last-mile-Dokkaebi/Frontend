/* 일반회원 회원가입 */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { MemberLayout } from 'components/layout';
import styled from 'styled-components';
import { Button, CustomInput } from 'components/common';
import { useInput } from 'hooks';
import Router from 'next/router';
import { useAppDispatch, RootState } from 'store/configureStore';
import { signupRequest } from 'actions/user';
import { useSelector } from 'react-redux';

const join: NextPage = () => {
  const dispatch = useAppDispatch();

  const [name, nameHandler] = useInput<string>('');
  const [identity, identityHandler] = useInput<string>('');
  const [password, passwordHandler] = useInput<string>('');
  const [passwordConfirm, passwordConfirmHandler] = useInput<string>('');
  const [phoneNumber, phoneNumberHandler] = useInput<string>('');
  const [errorMessage, setErrorMessage] = useState<string[]>([]); // 0: 이름에러, 1: 아이디 에러 2: 비밀번호에러 3: 전화번호 에러
  const { signupLoading, signupDone, signupError } = useSelector((state: RootState) => state.user);

  const onClickJoin = async () => {
    if (joinCheck()) {
      const phoneNumberArray: string[] = [];
      phoneNumberArray[0] = phoneNumber.slice(0, 3);
      phoneNumberArray[1] = phoneNumber.slice(3, 7);
      phoneNumberArray[2] = phoneNumber.slice(7, 11);

      dispatch(signupRequest({ name, identity, password, phoneNumberArray }));
    }
  };

  useEffect(() => {
    if (signupDone) {
      alert('회원가입을 환영합니다! 🤗');
      Router.push('/member/login');
    }
  }, [signupDone]);

  const joinCheck = () => {
    let err: string[] = ['', '', '', ''];
    if (name === '') {
      err[0] += '이름을 입력해주세요. ';
    }
    if (identity === '') {
      err[1] += '아이디를 입력해주세요. ';
    } else if (identity.length > 15 || identity.length < 5) {
      err[1] += '아이디는 5 ~ 15자 이어야 합니다. ';
    }
    if (password === '' && passwordConfirm === '') {
      err[2] += '비밀번호와 비밀번호 확인을 입력해주세요. ';
    } else if (password.length > 20 || password.length < 8) {
      err[2] += '비밀번호는 8 ~ 20자 이어야 합니다. ';
    }
    if (password !== passwordConfirm) {
      err[2] += '비밀번호와 비밀번호 확인이 일치하지 않습니다. ';
    }

    if (phoneNumber === '') {
      err[3] += '휴대폰 번호를 입력해주세요';
    } else if (!!Number(phoneNumber) === false) {
      err[3] += '휴대폰번호 양식이 일치하지 않습니다. ';
    } else if (phoneNumber.length !== 11) {
      err[3] += '휴대폰번호 양식이 일치하지 않습니다. ';
    }
    setErrorMessage(err); // 얘는 그저 출력용..
    return err.join('') === ''; // true시 가입 가능
  };

  return (
    <MemberLayout>
      <ImageWrapper>
        <Image src={'/assets/img/도깨비메인.PNG'} />
      </ImageWrapper>
      <Info>
        아래의 폼을 모두 입력해주세요. <br />
        회원가입시 <strong>약관에 동의</strong>한 것으로 간주합니다.
      </Info>
      <FormWrapper>
        <FormTitle>회원정보 입력</FormTitle>
        <JoinFormWrapper>
          <CustomInput type="text" onChange={nameHandler} placeholder="이름" />
          <ErrorMessage>{errorMessage[0]}</ErrorMessage>
          <CustomInput type="text" maxLength={15} onChange={identityHandler} placeholder="아이디 5 ~ 15자 입력" />
          <ErrorMessage>{errorMessage[1]}</ErrorMessage>
          <CustomInput type="password" maxLength={20} onChange={passwordHandler} placeholder="패스워드 8 ~ 20자 입력" />
          <CustomInput type="password" maxLength={20} onChange={passwordConfirmHandler} placeholder="패스워드 확인" />
          <ErrorMessage>{errorMessage[2]}</ErrorMessage>
          <CustomInput
            type="text"
            maxLength={11}
            onChange={phoneNumberHandler}
            placeholder="휴대폰 번호 '-' 없이 입력 ( 01012345678 )"
          />
          <ErrorMessage>{errorMessage[3]}</ErrorMessage>
          {/* 얘는 가공해서 쓸거임. */}
        </JoinFormWrapper>
      </FormWrapper>
      <FormWrapper>
        <FormTitle>약관동의</FormTitle>
        <TOSWrapper>뭐시기뭐시기 약관~ 나중에 체크형식으로 변경. 당장 중요한건 아닌데 구현리스트에 있길래..</TOSWrapper>
      </FormWrapper>
      <FormWrapper>
        <Button
          onClick={onClickJoin}
          width={'100%'}
          height={'3rem'}
          bgcolor={'#77b8c0'}
          color={'white '}
          loading={signupLoading}
        >
          회원가입
        </Button>
      </FormWrapper>
    </MemberLayout>
  );
};

const ImageWrapper = styled.div`
  width: 7rem;
  overflow: hidden;
  margin: 50px auto;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  font-size: 12px;
  color: rgb(59, 59, 59);
  text-align: center;
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const FormTitle = styled.div`
  font-weight: bold;
  text-align: center;
  margin: 1rem 0 1rem 0;
`;
const JoinFormWrapper = styled.div``;
const TOSWrapper = styled.div`
  width: 100%;
  border: solid 1px #d6d6d6;
  border-radius: 12px;
  padding: 1rem;
  font-size: 14px;
`;
const ErrorMessage = styled.div`
  color: #ff003e; /* 빨간색이긴 한데 ... */
  margin: 0.5rem 0 0.5rem 0;
  font-size: 12px;
  padding-left: 4px;
`;

export default join;
