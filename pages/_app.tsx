// 이곳에서 전역 스타일 관리. 일반 CRA에서의 index.js 와 같은 역할을 함.
import 'styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import wrapper, { store, persistor, RootState } from 'stores';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { FullPageLoading } from 'components/layout';
import cookies from 'next-cookies';
import { NextPageContext } from 'next';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/constant';
import { setToken } from 'utils/token';
import axios from 'utils/customAxios';

function MyApp({ Component, pageProps }: AppProps) {
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  //접근권한 참고 페이지 : https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
  //현재 `/member`페이지를 제외하고 모두 private으로 설정
  const isPrivate = !router.pathname.startsWith('/member');

  useEffect(() => {
    if (!isLoading && isPrivate && !isLoggedin) router.push('/member'); //로그인이 안된 상태로 private 페이지
    if (!isLoading && !isPrivate && isLoggedin) router.push('/'); //로그인이 된 상태로 public페이지
    setIsLoading(false);
  }, [isLoading, isPrivate, isLoggedin]);

  // 로그인 안된 상태로 private에 접근하면 로딩창부터 띄움
  if ((isLoading || !isLoggedin) && isPrivate) {
    return (
      <>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <FullPageLoading />
          </PersistGate>
        </Provider>
      </>
    );
  } else {
    return (
      <>
        {/* 카카오맵 관련 설정부분
      https://react-kakao-maps-sdk.jaeseokim.dev/docs/setup/next/ */}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

//cookie에서 token을 가져와서 axios의 header에 추가
MyApp.getInitialProps = async (context: NextPageContext) => {
  const { ctx, Component } = context;
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const allCookies = cookies(ctx);
  const accessToken = allCookies[ACCESS_TOKEN];
  if (accessToken !== undefined) {
    const refreshToken = allCookies[REFRESH_TOKEN] || '';
    setToken(accessToken, refreshToken);
  }
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  return { pageProps };
};

export default wrapper.withRedux(MyApp);
