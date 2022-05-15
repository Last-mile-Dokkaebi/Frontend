/* 
  로그인 종류 선택 메인화면
  중첩라우팅에서 폴더에 index 파일을 생성하면 /member 에 index가 뿌려짐
*/

import MemberLayout from 'components/layout/MemberLayout';
import styled from 'styled-components';

const Home = () => {
  return (
    <MemberLayout>
      <ImageWrapper>
        <Image src={'/assets/img/도깨비메인.PNG'} />
      </ImageWrapper>
      <ButtonWrapper>
        <LoginButton bgcolor="#FEE500" color="#00000085">카카오로 시작하기</LoginButton>
        <LoginButton bgcolor="#4867AA">페이스북 로그인</LoginButton>
        <LoginButton bgcolor="white" border="#00000005">구글 로그인</LoginButton>
        <LoginButton bgcolor="#77b8c0">일반 로그인</LoginButton>
      </ButtonWrapper>
    </MemberLayout>
  );
};

const ImageWrapper = styled.div`
  width: 10rem;
  overflow: hidden;
  margin: 0 auto;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface LoginButtonTypes {
  bgcolor?: string | 'red' | 'green' | 'blue' | 'rgb(128, 128, 128)' | 'rgba(128, 128, 128, 0.5)';
  border?: string | '1px solid black';
}
const LoginButton = styled.button<LoginButtonTypes>`
  font-size: 12px;
  background-color: ${(props) => props.bgcolor || 'none'};
  border-radius: 12px;
  width: 400px;
  border: ${(props) => props.border || 'none'};
  cursor: pointer;
  padding: 0.5rem 0.25rem 0.5rem 0.25rem;
`;
export default Home;
