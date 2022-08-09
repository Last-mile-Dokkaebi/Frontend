import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'actions/user';
import { RootState } from 'store/configureStore';
import { Button } from 'components/common';
import { FaQuestionCircle, FaUserAlt, FaRegMap } from 'react-icons/fa';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import { BsCreditCard2Back } from 'react-icons/bs';
import Router from 'next/router';
import { deleteToken } from 'utils/token';

const mypage: NextPage = () => {
  const dispatch = useDispatch();
  const { identity } = useSelector((state: RootState) => state.user);
  const onClickLogout = () => {
    dispatch(logoutAction());
    deleteToken();
    location.href = '/member';
  };

  const onClickRentalHistory = () => {
    Router.push('/mypage/rental');
  };
  const onClickFAQ = () => {
    Router.push('/support/faq');
  };
  const onClickQNA = () => {
    Router.push('/support/qna/list');
  };
  return (
    <>
      <AppLayout>
        <ContentBox>
          <strong>{identity}</strong>님, 안녕하세요 😄
        </ContentBox>
        <ContentBox>
          <div className="menu-title">관리</div>
          <ul className="menu-list">
            <li>
              <FaUserAlt />
              사용자 정보 수정
            </li>
            <li>
              <BsCreditCard2Back />
              결제 관리
            </li>
            <li onClick={onClickRentalHistory}>
              <FaRegMap />
              이용기록 조회
            </li>
          </ul>
        </ContentBox>
        <ContentBox>
          <div className="menu-title">지원</div>
          <ul className="menu-list">
            <li onClick={onClickFAQ}>
              <MdOutlineQuestionAnswer />
              자주 하는 질문
            </li>
            <li>
              <FaQuestionCircle />
              서비스 이용 안내
            </li>
            <li onClick={onClickQNA}>
              <BiSupport />
              고객 문의 게시판
            </li>
          </ul>
        </ContentBox>
        <Button onClick={onClickLogout}>로그아웃</Button>
      </AppLayout>
    </>
  );
};
const ContentBox = styled.div`
  border-radius: 4px;
  background-color: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  .menu-title {
    font-size: 14px;
    color: grey;
  }
  .menu-list {
    padding: 1rem 0 1rem 0;
    list-style: none;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      padding: 0.5rem 0 0.5rem 0;
      & * {
        margin-right: 0.5rem;
      }
      &:hover,
      &:active {
        cursor: pointer;
        background-color: #eee;
        padding: 0.5rem;
        border-radius: 4px;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
`;
export default mypage;
