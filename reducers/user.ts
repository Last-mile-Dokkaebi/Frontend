import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { myInfoRequest, loginRequest, logoutAction, signupRequest } from 'actions/user';
import { deleteToken, setToken } from "utils/token";
import axiosInstance from 'utils/customAxios'

interface UserState{
  isLoggedin: boolean;              //false일 경우 로그인이 안 된 상태, true일 경우 로그인 된 상태
  identity: string;                 // user의 identity
  auth: string | 'USER' | 'ADMIN';  //로그인 사람의 접근권한
  bikeNumber: string;               //빌린 바이크 번호, 없으면 ""으로 초기화
  accessToken: string;
  refreshToken: string;

  myInfoLoading: boolean;
  myInfoDone: boolean;
  myInfoError: string | null;

  loginLoading: boolean;
  loginDone: boolean;
  loginError: string | null;

  signupLoading: boolean;
  signupDone: boolean;
  signupError: string | null;
}

export const initialState: UserState = {
  isLoggedin: false,
  identity: "",
  auth: 'USER',                     //일단 초기값은 USER인걸로
  bikeNumber: '',
  accessToken: "",
  refreshToken: "",

  myInfoLoading: false,
  myInfoDone: false,
  myInfoError: null,

  loginLoading: false,
  loginDone: false,
  loginError: null,

  signupLoading: false,
  signupDone: false,
  signupError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    loginAction:(state) => {
      state.isLoggedin= false,
      deleteToken()
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => builder
    //내 정보
    .addCase(myInfoRequest.pending, (state) => {
      state.myInfoLoading = true;
      state.myInfoDone = false;
      state.myInfoError = null;
    })
    .addCase(myInfoRequest.fulfilled, (state, action) => {
      const {identity, auth} = action.payload;
      state.myInfoLoading = false;
      state.myInfoDone = true;

      state.isLoggedin = true;
      state.identity = identity;
      state.auth = auth;
    })
    .addCase(myInfoRequest.rejected, (state, action) => {
      state.myInfoLoading = false;
      state.myInfoError = action.payload ?? "무언가의 에러";

      state.isLoggedin = true;  //임시로 설정 추후 삭제 해야됨
    })

    //로그인
    .addCase(loginRequest.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    })
    .addCase(loginRequest.fulfilled, (state, action) => {
      const {identity, auth, bikeNumber, accessToken, refreshToken} = action.payload;
      state.loginLoading = false;
      state.loginDone = true;

      state.isLoggedin = true;
      state.identity = identity;
      state.auth = auth;
      state.bikeNumber = bikeNumber;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      setToken(accessToken, refreshToken);
    })
    .addCase(loginRequest.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload ?? "무언가의 에러";
    })

    //로그아웃
    .addCase(logoutAction, (state) => {
      state.isLoggedin = false;
      state.identity = "";
      state.auth = "USER";
      state.bikeNumber = "";
      state.accessToken = "";
      state.refreshToken = "";

      deleteToken();
      delete axiosInstance.defaults.headers.common?.Authorization
    })

    //회원가입
    .addCase(signupRequest.pending, (state) => {
      state.signupLoading = true;
      state.signupDone = false;
      state.signupError = null;
    })
    .addCase(signupRequest.fulfilled, (state) => {
      state.signupLoading = false;
      state.signupDone = true;
    })
    .addCase(signupRequest.rejected, (state, action) => {
      state.signupLoading = false;
      state.signupError = action.payload ?? "무언가의 에러";
    })
})

export default userSlice.reducer;