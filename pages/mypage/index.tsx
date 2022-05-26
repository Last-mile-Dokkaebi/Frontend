import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'stores/user';
import { RootState } from 'stores';
import Button from 'components/common/Button';
import { FaQuestionCircle, FaUserAlt,FaRegMap } from 'react-icons/fa';
import { MdOutlineQuestionAnswer, MdInfoOutline } from 'react-icons/md';
import Router from 'next/router';
const mypage: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoggedin, nickname } = useSelector((state: RootState) => state.user);
  const onClickLogout = () => {
    dispatch(logoutAction());
  };
  const onClickRentalHistory = () => {
    Router.push("/mypage/rental")
  };
  return (
    <>
      <AppLayout>
        <ContentBox><strong>{nickname}</strong>님, 안녕하세요 😄</ContentBox>
        <ContentBox>
          <div className="menu-title">관리</div>
          <ul className="menu-list">
            <li>
              <FaUserAlt />
              사용자 정보 수정
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
            <li>
              <FaQuestionCircle />
              자주 하는 질문
            </li>
            <li>
              <MdInfoOutline />
              서비스 이용 안내
            </li>
            <li>
              <MdOutlineQuestionAnswer />
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
  border: solid 1px #eee;
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
    }
  }
`;
export default mypage;
