import styled from 'styled-components';
import { BsClockHistory, BsFillBellFill, BsFileEarmarkBarGraph, BsFillPersonFill } from 'react-icons/bs';
const Navbar = () => {
  return (
    <nav>
      <MenuWrapper>
        <MenuButtonWrapper>
          <BsClockHistory size={24} />
          <div>히스토리</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper>
          <BsFillBellFill size={24} />
          <div>알람</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper>
          <BsFileEarmarkBarGraph size={24} />
          <div>통계</div>
        </MenuButtonWrapper>
        <MenuButtonWrapper>
          <BsFillPersonFill size={24} />
          <div>마이페이지</div>
        </MenuButtonWrapper>
      </MenuWrapper>
    </nav>
  );
};

const MenuWrapper = styled.ul`
  width: 100%;
  display: flex;
  padding:0;
  margin:0;
  border-top:solid 1px rgba(119,184,192,0.5);
`;
const MenuButtonWrapper = styled.li`
  width: 100%;
  font-size: 10px;
  display: flex;
  align-items:center;
  flex-direction: column;
  padding:0.5rem;
  transition:0.2s;
  color: #77b8c0;
  /* 아이콘 margin 추가 */
  *:nth-child(1) {
    margin-bottom: 4px;
  }
  &:hover {
    background-color: #77b8c0;
    color:white;
    font-weight:bold;
  }
`;
export default Navbar;
