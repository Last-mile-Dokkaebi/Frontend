import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const detail: NextPage = () => {
  const router = useRouter()
  const { title,regiDate,content } = router.query

  return (
    <>
      <QnaLayout>
        <Wrapper>
          <div>
            <strong>제목</strong>{title}
          </div>
          <div>
            <strong>작성일시</strong>{regiDate}
          </div>
          <div>
            <strong>처리현황</strong>대기중
          </div>
        </Wrapper>
        <Wrapper>
          <div>
            {content}
          </div>
        </Wrapper>
        <Wrapper>
        <div>
            <strong>관리자 ID</strong>admin
          </div>
          <div>
            <strong>답변일시</strong>2022.05.29 18:41:00
          </div>
          
        </Wrapper>
        <Wrapper>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit a molestias provident adipisci aliquam
            recusandae eveniet praesentium dolore, deleniti incidunt labore nesciunt blanditiis tempora laborum cumque
            voluptas optio quae autem!
          </div>
        </Wrapper>
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
export default detail;
