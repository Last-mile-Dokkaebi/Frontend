// 이곳에서 전역 스타일 관리. 일반 CRA에서의 index.js 와 같은 역할을 함.
import 'styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FullPageLoading } from 'components/layout';
import axiosInstance from 'utils/customAxios';
import wrapper from 'store/configureStore';
import { RootState } from 'store/configureStore';
import { setErrorAction } from 'actions/system';
import { NextPageContext } from 'next';
import { myInfoRequest } from 'actions/user';
import cookies from 'next-cookies';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/constant';

function MyApp({ Component, pageProps }: AppProps) {
  const { isLoggedin, auth, accessToken, refreshToken } = useSelector((state: RootState) => state.user);
  const { errorMessage, errorCount } = useSelector((state: RootState) => state.system);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  //접근권한 참고 페이지 : https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
  //현재 `/member`페이지를 제외하고 모두 private으로 설정
  const isPrivate = !router.pathname.startsWith('/member');

  //현재 `/admin`페이지를 AdminOnly로 지정
  const isAdminOnly = router.pathname.startsWith('/admin');
  const isAdmin = auth === 'ADMIN';

  //처음 페이지를 이동하면 에러 메시지를 초기화
  useEffect(() => {
    if (errorMessage) {
      dispatch(setErrorAction(null));
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorCount]);

  useEffect(() => {
    if (!isLoading && isAdminOnly && !isAdmin) router.push('/'); //관리자가 아닌 사람이 관리페이지에 접속할려는 경우
    if (!isLoading && !isAdminOnly && isAdmin) router.push('/admin'); //관리자가 일반페이지에 접속할려는 경우
    if (!isLoading && isPrivate && !isLoggedin) router.push('/member'); //로그인이 안된 상태로 private 페이지
    if (!isLoading && !isPrivate && isLoggedin) router.push('/'); //로그인이 된 상태로 public페이지
    setIsLoading(false);
  }, [isLoading, isPrivate, isLoggedin, isAdminOnly, isAdmin]);

  useEffect(() => {
    if (isPrivate && accessToken !== '') {
      axiosInstance.defaults.headers.common.Authorization = accessToken;
    }
  }, [accessToken]);

  // 로그인 안된 상태로 private에 접근하면
  const notLoginAndPrivate = (isLoading || !isLoggedin) && isPrivate;
  // 로그인 된 상태로 public에 접근하면
  const loggedinAndPublic = (isLoading || isLoggedin) && !isPrivate;
  // 관리자용 페이지를 관리자가 아닌 사람이 접근 할려고 하면
  const notAdminAndAdminOnly = (isLoading || !isAdmin) && isAdminOnly;
  // 일반 페이지를 관리자가 접근할려고 하면
  const isAdminAndPrivate = (isLoading || isAdmin) && !isAdminOnly;

  //로딩창부터 띄워서 화면접근 막기
  if (notLoginAndPrivate || loggedinAndPublic || notAdminAndAdminOnly || isAdminAndPrivate) {
    return (
      <>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <FullPageLoading />
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
        <Component {...pageProps} />
      </>
    );
  }
}

interface MyContext extends NextPageContext {
  router: any;
  ctx: any;
}

MyApp.getInitialProps = wrapper.getInitialPageProps((store) => async (context: MyContext) => {
  const allCookies = cookies(context.ctx);
  const accessToken = allCookies[ACCESS_TOKEN];
  const refreshToken = allCookies[REFRESH_TOKEN];

  console.log('--------------------');
  console.log(context.ctx.req.headers.cookie);
  console.log(allCookies);
  console.log('--------------------');

  const path = context.router.pathname;

  const isPrivate = !path.startsWith('/member');
  const isAdminOnly = path.startsWith('/admin');

  if (isPrivate) {
    //private 페이지 이면 내 정보를 요청
    axiosInstance.defaults.headers.common.Authorization = '';
    axiosInstance.defaults.headers.common.refresh_token = '';

    if (accessToken && refreshToken) {
      axiosInstance.defaults.headers.common.Authorization = accessToken;
      axiosInstance.defaults.headers.common.refresh_token = refreshToken;
      console.log('내정보 요청');
      await store.dispatch(myInfoRequest());
      const state = store.getState();
      console.log(state);
    }
  }
});

export default wrapper.withRedux(MyApp);
