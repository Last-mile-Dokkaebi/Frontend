/* 
  관리자로 로그인하였을 경우, 보여질 화면들을 관리 (이 화면은 PC 기준 )

*/
import React from 'react';
import styled from 'styled-components';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Router from 'next/router';
import { logoutAction } from 'stores/user';
import { useDispatch } from 'react-redux';
const AppLayout = (props: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const onClickQnA = () => {
    Router.push('/admin/qna');
  };
  const onClickMain = () => {
    Router.push('/admin');
  };

  const onClickLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <AdminWrapper>
      <AdminHeader>
        <AdminHeaderContents>
          <div className="logo" onClick={onClickMain}>
            <MdOutlineAdminPanelSettings />
            <div>도깨비 관리자 admin님</div>
          </div>
          <AdminNav>
            <ul>
              <li>사용자 관리</li>
              <li>데이터 통계</li>
              <li onClick={onClickQnA}>질의응답 관리</li>
              <li onClick={onClickLogout}>로그아웃</li>
            </ul>
          </AdminNav>
        </AdminHeaderContents>
      </AdminHeader>
      <AdminBody>{props.children}</AdminBody>
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
        font-weight: bold;
      }
    }
  }
`;
const AdminBody = styled.div`
  width: 90%;
  margin: 2rem auto;
`;
export default AppLayout;
