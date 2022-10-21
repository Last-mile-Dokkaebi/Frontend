import styled from 'styled-components';
import { BsFillQuestionCircleFill, BsFileEarmarkBarGraph } from 'react-icons/bs';
import { GiKickScooter } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineManageAccounts } from 'react-icons/md';

import router from 'next/router';
import { useDispatch } from 'react-redux';
import { logoutAction } from 'actions/user';

const AdminNavBar = () => {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <NavWrapper>
      <MenuWrapper>
        <MenuButtonWrapper onClick={() => router.push('/admin/scooter')}>
          <GiKickScooter size={24} />
          <div>스쿠터</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper onClick={() => router.push('/admin/help')}>
          <BsFillQuestionCircleFill size={24} />
          <div>문의</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper onClick={() => router.push('/admin/statistics')}>
          <BsFileEarmarkBarGraph size={24} />
          <div>통계</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper onClick={() => router.push('/admin/manage')}>
          <MdOutlineManageAccounts size={24} />
          <div>관리</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper onClick={onClickLogout}>
          <FiLogOut size={24} />
          <div>로그아웃</div>
        </MenuButtonWrapper>
      </MenuWrapper>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  width: 500px;
  height: 60px;
  position: fixed;
  bottom: -2px;
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (max-width: 320px) {
    font-size: 12px;
  }
`;
const MenuWrapper = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  border-top: solid 1px rgba(119, 184, 192, 0.5);
`;
const MenuButtonWrapper = styled.li`
  width: 100%;
  font-size: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  transition: 0.2s;
  color: #77b8c0;
  background-color: white;
  /* 아이콘 margin 추가 */
  *:nth-child(1) {
    margin-bottom: 4px;
  }
  &:hover {
    background-color: #77b8c0;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;
export default AdminNavBar;
