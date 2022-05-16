/* 
  FiexedWidth 컴포넌트로 페이지의 너비를 고정시킨 후 , 
  모든 페이지에서 볼 수 있는 상단 헤더와 하단 메뉴바(NavBar)를 고정 부착함.

*/
import React from 'react';
import styled from 'styled-components';
const MemberLayout = (props: { children: React.ReactNode }) => {
  return (
    <Centering>
      <FixedWidth>
          {props.children}
      </FixedWidth>
    </Centering>
  );
};

const Centering = styled.div`
  display: flex;
  justify-content: center;
  
`;
const FixedWidth = styled.main`
  width: 500px; 
`;

export default MemberLayout;
