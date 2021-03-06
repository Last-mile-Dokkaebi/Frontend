/* 모든 페이지에 항상 노출될 헤더 컴포넌트. */
import styled from 'styled-components';
import Router from 'next/router';

interface HeaderTypes {
  route?: string;
}

const Header = ({ route = '/' }: HeaderTypes) => {
  const onClickLogo = () => {
    Router.push(route);
  };
  return (
    <HeaderWrapper>
      <LogoTitle onClick={onClickLogo}>도깨비</LogoTitle>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 500px;
  height: 50px;
  background-color: #77b8c0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;

  @media (max-width: 500px) {
    width: 100%;
  }
`;
const LogoTitle = styled.div`
  font-family: 'BinggraeSamanco-Bold';
  font-size: 30px;
  font-weight: bold;
  color: white;
  transition: 0.2s;
  &:hover {
    color: #558287;
    cursor: pointer;
  }
`;
export default Header;
