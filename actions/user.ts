import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/configureStore';
import axiosInstance from 'utils/customAxios';
import { deleteToken, setToken } from 'utils/token';

/* 내 정보 액션 */
interface MyInfoRequest {
  accessToken: string;
  refreshToken: string;
}

interface MyInfoSuccess {
  identity: string;
  auth: string | 'USER' | 'ADMIN';
}

export const myInfoRequest = createAsyncThunk<MyInfoSuccess, MyInfoRequest, { rejectValue: string }>(
  'user/myInfo',
  async ({ accessToken, refreshToken }: MyInfoRequest, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await axiosInstance.get('/member');
      return response.data;
    } catch (error: any) {
      const { errorCode, description } = error.response.data;
      if (errorCode === 302) {
        //Access Token 만료로 다시 발급
        // try {
        await dispatch(reissueRequest({ accessToken, refreshToken })); //재발급 요청
        try {
          const response = await axiosInstance.get('/member');
          return response.data;
        } catch (error) {
          console.log(error);
          return rejectWithValue('토큰 재발급 요청실패');
        }
      } else {
        return rejectWithValue(
          typeof description === 'string' ? description : '내 정보를 불러오는 중 에러가 발생하였습니다',
        );
      }
    }
  },
);

/* 로그인 액션 */
interface LoginRequest {
  identity: string;
  password: string;
}

interface LoginSuccess {
  identity: string;
  auth: string | 'USER' | 'ADMIN';
  accessToken: string;
  refreshToken: string;
  bikeNumber: string;
}

export const loginRequest = createAsyncThunk<LoginSuccess, LoginRequest, { rejectValue: string }>(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      deleteToken();
      const response = await axiosInstance.post('/member/login', data);
      return Object.assign(response.data, { identity: data.identity });
    } catch (error: any) {
      return rejectWithValue('아이디 또는 비밀번호를 확인해주세요');
    }
  },
);

/* 로그아웃 액션 */
export const logoutAction = createAction('user/logout');

/* 토큰 셋팅 액션 */
interface SetTokenAction {
  accessToken: string;
  refreshToken: string;
}

export const setTokenAction = createAction<SetTokenAction>('user/logout');

/* 회원가입 액션 */
interface SignupRequest {
  name: string;
  identity: string;
  password: string;
  phoneNumberArray: string[];
}

export const signupRequest = createAsyncThunk<void, SignupRequest, { rejectValue: string }>(
  'user/signup',
  async (data, { rejectWithValue }) => {
    try {
      deleteToken();
      await axiosInstance.post('/member/new', Object.assign(data, { auth: 'USER' }));
    } catch (error: any) {
      return rejectWithValue(error.response.data ?? '무언가의 에러');
    }
  },
);

/* JWT 재발급  */
interface ReissueSuccess {
  accessToken: string;
  refreshToken: string;
}

interface ReissueRequest {
  accessToken: string;
  refreshToken: string;
}

export const reissueRequest = createAsyncThunk<ReissueSuccess, ReissueRequest, { rejectValue: string }>(
  'user/reissue',
  async ({ accessToken, refreshToken }, { dispatch, rejectWithValue }) => {
    delete axiosInstance.defaults.headers.common.refresh_token;
    axiosInstance.defaults.headers.common.refresh_token = refreshToken; //Refresh Token을 헤더에 삽입
    try {
      const response = await axiosInstance.post<ReissueSuccess>('/member/reissue');
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      setToken(newAccessToken, newRefreshToken);

      delete axiosInstance.defaults.headers.common?.refresh_token;
      console.log('재발급 완료');

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error: any) {
      //토큰 재발급 실패로 로그아웃
      return rejectWithValue('로그아웃 되었습니다');
    }
  },
);
