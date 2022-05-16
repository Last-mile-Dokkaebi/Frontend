import type { NextPage } from 'next';
import Head from 'next/head';
import { AppLayout } from 'components/layout'; // 메인화면 레이아웃 지정

// content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" 는 아이폰 확대방지 
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DOKKAEBI - LAST MILE 모빌리티</title>
        <meta name="description" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div>메인화면이 될 예정!zzzzzzzzzzzzzzzzzzzzzzzzzzzz</div>
      </AppLayout>
    </div>
  );
};

export default Home;
