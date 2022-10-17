import styled from 'styled-components';
import { BsFileEarmarkBarGraph, BsFillPersonFill, BsFillEyeFill } from 'react-icons/bs';
import Router from 'next/router';
import { GiKickScooter } from 'react-icons/gi';
const NavBar = () => {
  const onClickMypage = () => {
    Router.push('/mypage');
  };
  return (
    <NavWrapper>
      <MenuWrapper>
        <MenuButtonWrapper>
          <BsFileEarmarkBarGraph size={24} />
          <div>통계</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper onClick={() => Router.push('/')}>
          <GiKickScooter size={24} />
          <div>메인</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper onClick={onClickMypage}>
          <BsFillPersonFill size={24} />
          <div>마이페이지</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper onClick={() => Router.push('/member/test')}>
          <BsFillEyeFill size={24} />
          <div>테스트페이지</div>
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
export default NavBar;
