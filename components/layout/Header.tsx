/* 모든 페이지에 항상 노출될 헤더 컴포넌트. */
import styled from 'styled-components';
import Router from "next/router"
const Header = () => {
    const goHome = ()=>{
         Router.push("/");
    }
  return (
    <HeaderWrapper>
      <LogoTitle onClick={goHome}>도깨비</LogoTitle>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #77b8c0;
  display:flex;
  justify-content:center;
  align-items:center;
`;
const LogoTitle = styled.div`
  /* 출처 눈누 무료 폰트 */
  @font-face {
    font-family: 'BinggraeSamanco-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/BinggraeSamanco-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'BinggraeSamanco-Bold';
  font-size: 30px;
  font-weight: bold;
  color: white;
  transition:0.2s;
  &:hover{
      color:#558287;
      cursor:pointer;
  }
`;
export default Header;
