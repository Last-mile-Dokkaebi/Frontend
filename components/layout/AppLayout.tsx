/* 
  모든 페이지에서 AppLayout을 import해와서 사용하면됨. 
  FiexedWidth 컴포넌트로 페이지의 너비를 고정시킨 후 , 
  모든 페이지에서 볼 수 있는 상단 헤더와 하단 메뉴바(NavBar)를 고정 부착함.
  로그인 이후의 페이지 레이아웃을 관리함

*/
import React from 'react';
import styled from 'styled-components';
import Header from 'components/layout/Header';
import NavBar from 'components/layout/NavBar';
const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <Centering>
      <FixedWidth>
        <Header />
        <Body>
          {props.children} {/* 라우터 별 화면 표시 */}
        </Body>
        <NavBar />
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
  padding-bottom: 60px;
  margin-top: 50px;
  height: 100%;
  background-color: #fafbfc;
  min-height: calc(100vh - 110px);
  @media (max-width: 500px) {
    width: 100%;
  }
`;
export default AppLayout;
