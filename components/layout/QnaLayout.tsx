import AppLayout from './AppLayout';
import styled, { css } from 'styled-components';
import { Title } from 'components/common';
import Link from 'next/link';
import { useRouter } from 'next/router';

const QnaLayout = (props: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <AppLayout>
      <Title
        title={'고객 문의 게시판'}
        subtitle={'FAQ에 없는 문제상황을 1:1로 문의해주세요! 신고하실 내용을 입력하여 보내주시면 됩니다.'}
      />
      <QnaMenu>
        <Link href={'/support/qna/send'}>
          <CustomLinkButton active={router.pathname === '/support/qna/send'}>1:1 문의 보내기</CustomLinkButton>
        </Link>
        <Link href={'/support/qna/list'}>
          <CustomLinkButton active={router.pathname === '/support/qna/list'}>문의내역</CustomLinkButton>
        </Link>
      </QnaMenu>
      {props.children} {/* 라우터 별 화면 표시 */}
    </AppLayout>
  );
};

const QnaMenu = styled.div`
  background-color: #77b8c0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`;

interface ButtonProps {
  active?: boolean;
}

const CustomLinkButton = styled.a<ButtonProps>`
  border: none;
  width: 100%;
  margin: 4px;
  font-weight: bold;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  ${(props) =>
    props.active
      ? css`
          color: rgb(59, 59, 59);
          background-color: white;
        `
      : css`
          background-color: #77b8c0;
          color: white;
        `}
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    transition: 0.2s;
    color: rgb(59, 59, 59);
    cursor: pointer;
  }
`;

export default QnaLayout;
