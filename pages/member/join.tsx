/* 일반회원 회원가입 */
import { NextPage } from 'next';
import MemberLayout from 'components/layout/MemberLayout';
import styled from 'styled-components';
import Button from 'components/common/Button';
const join : NextPage= () => {
  
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
          <CustomInput type="text" placeholder="이름" />
          <CustomInput type="text" placeholder="아이디 5 ~ 15자 입력" />
          <CustomInput type="password" placeholder="패스워드 8 ~ 20자 입력" />
          <CustomInput type="password" placeholder="패스워드 확인" />
          <CustomInput type="number" placeholder="휴대폰 번호 '-' 없이 입력" /> {/* 얘는 가공해서 쓸거임. */}
        </JoinFormWrapper>
      </FormWrapper>
      <FormWrapper>
        <FormTitle>약관동의</FormTitle>
        <TOSWrapper>뭐시기뭐시기 약관~ 나중에 체크형식으로 변경. 당장 중요한건 아닌데 구현리스트에 있길래..</TOSWrapper>
      </FormWrapper>
      <FormWrapper>
        <Button width={'100%'} height={'3rem'} bgcolor={'#77b8c0'} color={'white '}>
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
const CustomInput = styled.input`
  width: 100%;
  border: solid 1px #d6d6d6;
  border-radius: 12px;
  padding-left: 1rem;
  height: 3rem;
  margin: 0.5rem 0 0.5rem 0;
`;

export default join;
