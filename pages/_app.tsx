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
import { stringify } from 'querystring';

function MyApp({ Component, pageProps }: AppProps) {
  const { isLoggedin, auth, accessToken, refreshToken, logoutDone } = useSelector((state: RootState) => state.user);
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

  //처음 페이지를 이동하면 에러 메시지를 초기화, Client Axios에 토큰 넣기
  useEffect(() => {
    if (errorMessage) {
      dispatch(setErrorAction(null));

      const cookies: { [index: string]: string } = {};
      document.cookie.split(';').forEach((cookieString) => {
        const [key, value] = cookieString.split('=');
        cookies[key] = value;
      });
      axiosInstance.defaults.headers.common.Authorization = cookies[ACCESS_TOKEN];
      axiosInstance.defaults.headers.common.refresh_token = cookies[REFRESH_TOKEN];
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorCount]);

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
  // }
}

interface MyContext extends NextPageContext {
  router: any;
  ctx: any;
}

MyApp.getInitialProps = wrapper.getInitialPageProps((store) => async (context: MyContext) => {
  const res = context.ctx.res;
  const allCookies = cookies(context.ctx);

  const accessToken = allCookies[ACCESS_TOKEN];
  const refreshToken = allCookies[REFRESH_TOKEN];

  const path = context.router.pathname;

  const isPrivate = !path.startsWith('/member');
  const isAdminOnly = path.startsWith('/admin');

  if (accessToken && refreshToken) {
    //로그인 하였던 기록이 있으면 -> 로그인 유지 절차 실행
    if (isPrivate) {
      //private 페이지 이면 내 정보를 요청
      axiosInstance.defaults.headers.common.Authorization = '';
      axiosInstance.defaults.headers.common.refresh_token = '';

      axiosInstance.defaults.headers.common.Authorization = accessToken;
      axiosInstance.defaults.headers.common.refresh_token = refreshToken;
      await store.dispatch(myInfoRequest());
      const auth = store.getState().user.auth;
      const isAdmin = auth === 'ADMIN';

      if (!isAdmin && isAdminOnly) {
        //관리자가 아닌 사람이 관리자 페이지를 들어갈 경우
        res.writeHead(302, { Location: '/' });
        res.end();
      } else if (isAdmin && !isAdminOnly) {
        //관리자가 일반 페이지 들어갈 경우
        res.writeHead(302, { Location: '/admin' });
        res.end();
      }
    } else {
      //로그인이 된 채로 public페이지 접근 하면
      res.writeHead(302, { Location: '/' });
      res.end();
    }
  } else {
    //로그인 하였던 기록이 없으면
    if (isPrivate) {
      res.writeHead(302, { Location: '/member' });
      res.end();
    }
  }
});

export default wrapper.withRedux(MyApp);
