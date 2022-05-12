// 이곳에서 전역 스타일 관리. 일반 CRA에서의 index.js 와 같은 역할을 함.
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
