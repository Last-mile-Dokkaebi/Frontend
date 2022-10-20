// 이곳에서 전역 스타일 관리. 일반 CRA에서의 index.js 와 같은 역할을 함.
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from 'utils/customAxios';
import wrapper from 'store/configureStore';
import { RootState } from 'store/configureStore';
import { deleteErrorAction, setErrorAction } from 'actions/system';
import { NextPageContext } from 'next';
import { logoutAction, logoutDoneAction, myInfoRequest } from 'actions/user';
import cookies from 'next-cookies';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/constant';
import { getBrowserToken, setToken } from 'utils/token';

function MyApp({ Component, pageProps }: AppProps) {
  const { accessToken, refreshToken, reissueDone, logoutDone, myInfoError, reissueError } = useSelector(
    (state: RootState) => state.user,
  );
  const { errorMessage, errorCount } = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();

  //처음 페이지를 이동하면 에러 메시지를 초기화, Client Axios에 토큰 넣기
  useEffect(() => {
    if (errorMessage) {
      dispatch(setErrorAction(null));
    }
    const cookies = getBrowserToken();
    if (cookies !== null) {
      const { accessToken, refreshToken } = cookies;
      axiosInstance.defaults.headers.common.Authorization = accessToken;
      axiosInstance.defaults.headers.common.refresh_token = refreshToken;
    }
  }, []);

  useEffect(() => {
    if (reissueDone) {
      if (typeof window === 'object') {
        setToken(accessToken, refreshToken);
      }
    }
  }, [reissueDone]);

  useEffect(() => {
    if (reissueError) {
      delete axiosInstance.defaults.headers.common?.Authorization;
      delete axiosInstance.defaults.headers.common?.refresh_token;
      dispatch(logoutAction());
    }
  }, [reissueError]);

  useEffect(() => {
    if (logoutDone) {
      dispatch(logoutDoneAction());
      window.location.href = '/member';
    }
  }, [logoutDone]);

  const restoreError = async () => {
    await dispatch(deleteErrorAction());
  };

  useEffect(() => {
    if (errorMessage && errorCount) {
      alert(errorMessage);
      restoreError();
    }
  }, [errorCount]);

  useEffect(() => {
    if (myInfoError) {
      restoreError();
    }
  }, [myInfoError]);

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
  await store.dispatch(deleteErrorAction());

  console.log('페이지 이동 됨');
  const res = context.ctx.res;
  const allCookies = cookies(context.ctx);

  const accessToken = allCookies[ACCESS_TOKEN];
  const refreshToken = allCookies[REFRESH_TOKEN];

  const path = context.router.pathname;

  const isPrivate = !path.startsWith('/member');
  const isAdminOnly = path.startsWith('/admin');

  //기존의 요청값들 지우기
  delete axiosInstance.defaults.headers.common['Authorization'];
  delete axiosInstance.defaults.headers.common['refresh_token'];

  //임시로 /member/test 페이지는 그냥 들어갈 수 있도록 설정
  if (!(path === '/member/test')) {
    if (accessToken && refreshToken) {
      //로그인 하였던 기록이 있으면 -> 로그인 유지 절차 실행
      if (isPrivate) {
        //private 페이지 이면 내 정보를 요청

        axiosInstance.defaults.headers.common.Authorization = accessToken;
        // axiosInstance.defaults.headers.common.refresh_token = refreshToken;
        await store.dispatch(myInfoRequest({ accessToken, refreshToken }));
        if (store.getState().user.myInfoError) {
          await store.dispatch(logoutAction());
          // res.writeHead(302, { location: '/member' });
          return;
        }
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
      // 로그인 하였던 기록이 없으면
      if (isPrivate) {
        res.writeHead(302, { Location: '/member' });
        res.end();
      }
    }
  }
});

export default wrapper.withRedux(MyApp);
