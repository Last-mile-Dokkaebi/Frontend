import type { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '../components/layout/AppLayout' // 메인화면 레이아웃 지정

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DOKKAEBI - LAST MILE 모빌리티</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div>메인화면이 될 예정!</div>
      </AppLayout>
      

    </div>
  )
}

export default Home
