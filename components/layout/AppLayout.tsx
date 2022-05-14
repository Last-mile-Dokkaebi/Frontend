/* 
  index.tsx 에서 파일의 기본 레이아웃을 세팅할 수 있음. 
  FiexedWidth 컴포넌트로 페이지의 너비를 고정시킨 후 , 
  모든 페이지에서 볼 수 있는 상단 헤더와 하단 메뉴바(NavBar)를 고정 부착함.

*/
import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Navbar from './NavBar';
const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Centering>
      <FixedWidth>
        <Header />
        <Body>
          {props.children} {/* 라우터 별 화면 표시 */}
        </Body>

        <Navbar />
      </FixedWidth>
    </Centering>
  );
};

const Centering = styled.div`
  /* 화면 중앙 정렬*/
  display: flex;
  justify-content: center;
`;
const FixedWidth = styled.main`
  /* 화면 너비 고정*/
  width: 500px; /* 500px 정도로 화면의 width 를 고정. 카카오도 이정도로 쓰길래.. */
`;
const Body = styled.div`
  padding: 0.5rem;
  margin-top:50px;
`;
export default Layout;
