/* 
  로그인 종류 선택 메인화면
  중첩라우팅에서 폴더에 index 파일을 생성하면 /member 에 index가 뿌려짐
*/

import { NextPage } from 'next';
import MemberLayout from 'components/layout/MemberLayout';
import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Router from "next/router"

const Home:NextPage = () => {

  const onClickLogo = ()=>{
    Router.push("/member");
  }
  const onClickKaKao = ()=>{
    alert("카카오톡 로그인 준비중"); // 나중에 alert말고 모달창을 준비하면 좋을듯. 토스트팝업이나
  }
  const onClickFacebook = () =>{
    alert("페이스북 로그인 준비중");
  }
  const onClickGoogle = () =>{
    alert("구글 로그인 준비중");
  }
  const onClickNormalLogin = ()=>{
    Router.push("/member/login");
  }

  return (
    <MemberLayout>
      <ImageWrapper >
        <Image src={'/assets/img/도깨비메인.PNG'} />
      </ImageWrapper>
      <ButtonWrapper>
        <LoginButton onClick={onClickKaKao} bgcolor="#FEE500" color="#000000">
          <RiKakaoTalkFill size="20" color="#000000" />
          카카오로 시작하기
        </LoginButton>
        <LoginButton onClick={onClickFacebook} bgcolor="#4867AA" color="#ffffff">
          <AiFillFacebook size="20" />
          페이스북 로그인
        </LoginButton>
        <LoginButton onClick={onClickGoogle} bgcolor="white" color="#000000" style={{ border: 'solid 1px #00000025' }}>
          <FcGoogle size="20" />
          구글 로그인
        </LoginButton>
        <LoginButton onClick={onClickNormalLogin} bgcolor="#77b8c0" color="#ffffff">
          일반 로그인
        </LoginButton>
      </ButtonWrapper>
    </MemberLayout>
  );
};


const ImageWrapper = styled.div`
  width: 10rem;
  overflow: hidden;
  margin:50px auto;
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
  margin-top: 50px;
  padding:1rem;
`;

interface LoginButtonTypes {
  bgcolor?: string | 'red' | 'green' | 'blue' | 'rgb(128, 128, 128)' | 'rgba(128, 128, 128, 0.5)';
  color?: string | 'black';
}
const LoginButton = styled.button<LoginButtonTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.color};
  border-radius: 12px;
  height: 50px;
  cursor: pointer;
  padding: 0.5rem 0.25rem 0.5rem 0.25rem;
  margin:0.5rem 0 0.5rem 0;
  & * {
    margin-right: 0.5rem;
  }
  width:100%;
  border:none;
`;

export default Home;
