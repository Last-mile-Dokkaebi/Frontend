import type { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from 'components/common';

const Custom404: NextPage = () => {
  return (
    <AppLayout>
      <Custom404Wrapper>
        <ImageWrapper>
          <Image src={'/assets/img/도깨비notfound.jpg'} />
        </ImageWrapper>
        <ExplainWrapper>
          <p>해당 사이트를 찾을 수 없습니다 😥</p>
          <p>페이지의 주소가 정확한지 다시 한번 확인해주세요 🤍</p>
          <Button color="#77b8c0">
            <Link href="/">홈으로 이동</Link>
          </Button>
        </ExplainWrapper>
      </Custom404Wrapper>
    </AppLayout>
  );
};

const Custom404Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const ImageWrapper = styled.div`
  width: 10rem;
  overflow: hidden;
  margin: 0 auto;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ExplainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p:nth-child(1) {
    font-size: 16px;
    font-weight: bold;
  }
  p:nth-child(2) {
    font-size: 12px;
  }
`;
export default Custom404;
