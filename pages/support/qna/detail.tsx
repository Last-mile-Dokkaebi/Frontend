import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const detail: NextPage = () => {
  const router = useRouter();
  const { title, regiDate, content, comment } = router.query;

  return (
    <>
      <QnaLayout>
        <Wrapper>
          <Info>
            <div className="title">제목</div>
            <div>{title}</div>
          </Info>
          <Info>
            <div className="title">작성일시</div>
            <div>{regiDate}</div>
          </Info>
          <Info>
            <div className="title">처리현황</div>
            <div>대기중</div>
          </Info>
        </Wrapper>
        <Wrapper>
          <div>{content}</div>
        </Wrapper>
        {comment && (
          <>
            <Wrapper>
              <Info>
                <div className="title">관리자 ID</div>
                <div>admin</div>
              </Info>
              <Info>
                <div className="title">답변일시</div>
                <div>2022.05.29 18:41:00</div>
              </Info>
            </Wrapper>
            <Wrapper>
              <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit a molestias provident adipisci aliquam
                recusandae eveniet praesentium dolore, deleniti incidunt labore nesciunt blanditiis tempora laborum
                cumque voluptas optio quae autem!
              </div>
            </Wrapper>
          </>
        )}
      </QnaLayout>
    </>
  );
};

const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  margin: 0.5rem 0 0.5rem 0;
  color: rgb(59, 59, 59);
  padding: 1rem;
`;
const Info = styled.div`
  display: flex;
  padding: 0.25rem 0 0.25rem 0;
  .title {
    width: 5rem;
    font-weight: bold;
  }
`;
export default detail;
