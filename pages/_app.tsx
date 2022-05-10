// 이곳에서 전역 스타일 관리. 
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider} from "../styles/styled-components";
import {GlobalStyle} from "../styles/global-styles";
import {theme} from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
