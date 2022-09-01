import cookie from 'react-cookies';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constant';
import axiosInstance from 'utils/customAxios';
import { access } from 'fs';

/*
  cookie를 이용해서 token들 관리
  참고한 자료
  https://yamoo9.github.io/axios/guide/config-defaults.html#%EA%B8%80%EB%A1%9C%EB%B2%8C-axios-%EA%B8%B0%EB%B3%B8-defaults-%EC%84%A4%EC%A0%95
  https://lemontia.tistory.com/1012
*/
const HTTP_ONLY = process.env.NODE_ENV === 'development' ? false : true;

// accessToken, refreshToken을 받아 cookie에 저장
const setToken = (accessToken: string, refreshToken: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = accessToken;

  const accessExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const refreshExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  cookie.save(ACCESS_TOKEN, accessToken, {
    path: '/',
    expires: accessExpires,
    httpOnly: HTTP_ONLY,
  });
  cookie.save(REFRESH_TOKEN, refreshToken, {
    path: '/',
    expires: refreshExpires,
    httpOnly: HTTP_ONLY,
  });
};

//cookie에서 token들을 삭제
const deleteToken = () => {
  const expires = new Date(Date.now() + 1);

  cookie.save(ACCESS_TOKEN, '', {
    path: '/',
    expires,
    httpOnly: HTTP_ONLY,
  });
  cookie.save(REFRESH_TOKEN, '', {
    path: '/',
    expires,
    httpOnly: HTTP_ONLY,
  });

  delete axiosInstance.defaults.headers.common?.Authorization;
  delete axiosInstance.defaults.headers.common?.refresh_token;
};

interface GetBrowserTokenSuccess {
  accessToken: string;
  refreshToken: string;
}

const getBrowserToken = (): GetBrowserTokenSuccess | null => {
  if (typeof window === 'object') {
    const cookies: { [index: string]: string } = {};
    document.cookie.split(';').forEach((cookieString) => {
      const [key, value] = cookieString.split('=');
      if (typeof key === 'string' && typeof value === 'string') {
        cookies[key.trim()] = value.trim();
      }
    });

    const accessToken = cookies[ACCESS_TOKEN];
    const refreshToken = cookies[REFRESH_TOKEN];

    return { accessToken, refreshToken };
  } else {
    return null;
  }
};

export { setToken, deleteToken, getBrowserToken };
