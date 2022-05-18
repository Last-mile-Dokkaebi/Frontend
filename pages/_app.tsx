// 이곳에서 전역 스타일 관리. 일반 CRA에서의 index.js 와 같은 역할을 함.
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script';
import wrapper, { persistor } from 'stores';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 카카오맵 관련 설정부분
      https://react-kakao-maps-sdk.jaeseokim.dev/docs/setup/next/ */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </>
  );
}

export default wrapper.withRedux(MyApp);
