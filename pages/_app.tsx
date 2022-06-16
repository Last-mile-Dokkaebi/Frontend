// 이곳에서 전역 스타일 관리. 일반 CRA에서의 index.js 와 같은 역할을 함.
import 'styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import wrapper, { persistor, RootState } from 'stores';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FullPageLoading,FullPageModal } from 'components/layout';
import cookies from 'next-cookies';
import { NextPageContext } from 'next';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/constant';
import { setToken } from 'utils/token';
import { Modal } from 'components/common';

function MyApp({ Component, pageProps }: AppProps) {
  const { isLoggedin,auth } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  //접근권한 참고 페이지 : https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
  const isPrivate = !router.pathname.startsWith('/member');   //현재 `/member`라우터를 제외하고 모두 private으로 설정
  const isAdminPage = router.pathname.startsWith('/admin');  //현재 `/admin` 으로 시작하는 라우터는 모두 관리자 전용 페이지로 설정 
  const isUserPage = isPrivate && !isAdminPage; // 현재 `/member`와 `/admin` 으로 시작하는 라우터를 제외한 모든 라우터는 사용자 전용 페이지로 설정
  useEffect(() => {
    if (!isLoading && isPrivate && !isLoggedin) router.push('/member'); //로그인이 안된 상태로 private 페이지
    if ((!isLoading && !isPrivate && isLoggedin) && auth==="ADMIN") router.push('/admin'); //관리자 로그인이 된 상태로 public페이지
    if ((!isLoading && !isPrivate && isLoggedin) && auth==="USER") router.push('/'); //사용자 로그인이 된 상태로 public페이지
   
    setIsLoading(false);
  }, [isLoading, isPrivate, isLoggedin,auth]);

  // 로그인 안된 상태로 private에 접근하면 로딩창부터 띄움
  /* 
    사용자는 관리자의 화면에 접근할 수 없음. 접근 권한이 없다는 modal을 띄울 예정
    관리자는 사용자의 화면에 접근할 수 없음. 접근 권한이 없다는 modal을 띄울 예정
    redux persist에 auth정보를 저장하고 auth정보와 isLoggedin 둘 중 하나라도 없으면 로그인 창으로 redirect
    
  */
  if ((isLoading || !isLoggedin) && isPrivate) {
    return (
      <>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <PersistGate persistor={persistor}>
          <FullPageLoading />
        </PersistGate>
      </>
    );
  } else {
    if((isAdminPage && auth==="USER") || (isUserPage && auth==="ADMIN")){
      return (
        <>
          <PersistGate persistor={persistor}>
            <FullPageModal />
          </PersistGate>
        </>
      );
    }
    else{
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
     
    
  }
}

//cookie에서 token을 가져와서 axios의 header에 추가
// 이 과정에서 cookie에 token이 존재하지 않다면 "" 값이 헤더에 저장되지 않도록 예외처리 해두었음 utils/token.ts 
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

  return { pageProps };
};

export default wrapper.withRedux(MyApp);
