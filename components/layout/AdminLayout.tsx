/* 
  관리자로 로그인하였을 경우, 보여질 화면들을 관리 (이 화면은 PC 기준 )

*/
import React from 'react';
import styled from 'styled-components';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <AdminWrapper>
      <AdminHeader>
        <AdminHeaderContents>
          <div className="logo">
            <MdOutlineAdminPanelSettings />
            <div>도깨비 관리자</div>
          </div>
          <AdminNav>
            <ul>
              <li>사용자 관리</li>
              <li>데이터 통계</li>
              <li>질의응답 관리</li>
            </ul>
          </AdminNav>
        </AdminHeaderContents>
      </AdminHeader>
    </AdminWrapper>
  );
};

const AdminWrapper = styled.div`
  color: rgb(59, 59, 59);
`;
const AdminHeader = styled.header`
  display: flex;
  border-bottom: solid 1px #d6d6d6;
  width: 100%;
  height: 80px;
  .logo {
    display: flex;
    font-size: 28px;
    font-family: 'BinggraeSamanco-Bold';
    div {
      margin-left: 0.5rem;
    }
  }
`;
const AdminHeaderContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  margin: 0 auto;
`;
const AdminNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    li {
      padding: 1rem;
      &:hover {
        background-color: #77b8c020;
        transition: 0.2s;
        color: rgb(59, 59, 59);
        cursor: pointer;
        font-weight:bold;
      }
    }
  }
`;
export default AppLayout;
