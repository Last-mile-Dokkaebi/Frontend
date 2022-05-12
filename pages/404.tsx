import Layout from '../components/layout/Layout';
import Image from 'next/image';
import styled from 'styled-components';
const Custom404 = () => {
  return (
    <Layout>
      <Custom404Wrapper>
        404 NOT FOUND!
      </Custom404Wrapper>
    </Layout>
  );
};

const Custom404Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Custom404;
