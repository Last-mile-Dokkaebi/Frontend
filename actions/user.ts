import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "utils/customAxios";
import { deleteToken, setToken } from "utils/token";

/* 내 정보 액션 */
interface MyInfoRequest{
  accessToken: string;
  refreshToken: string;
}

interface MyInfoSuccess{
  identity: string;
  auth: string | "USER" | "ADMIN";
}

interface ReIssueSuccess{
  accessToken: string;
  refreshToken: string;
}

export const myInfoRequest = createAsyncThunk<MyInfoSuccess, MyInfoRequest, {rejectValue: string}>('user/myInfo', async({accessToken, refreshToken}:MyInfoRequest, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get("/member");
    return response.data;
  } catch(error: any){
    const {errorCode, description}  = error.response.data
    if(errorCode === 302){  //Access Token 만료로 다시 발급
      try{
        axiosInstance.defaults.headers.common.refresh_token = refreshToken

        const response = await axiosInstance.post<ReIssueSuccess>("/member/reissue")

        delete axiosInstance.defaults.headers.common?.refresh_token
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} = response.data
        setToken(newAccessToken, newRefreshToken)
        console.log("토큰 재발급 완료")
        console.log(accessToken)
        console.log(newAccessToken)
        const memberResponse = await axiosInstance.get("/member");
        return memberResponse.data;

      } catch(error: any){
        delete axiosInstance.defaults.headers.common?.refresh_token
        // console.log(error.response)
      }
    }

    return rejectWithValue("내 정보 불러오기 에러")
  }
})

/* 로그인 액션 */
interface LoginRequest{
  identity: string;
  password: string;
}

interface LoginSuccess{
  identity: string;
  auth: string | "USER" | "ADMIN";
  accessToken: string;
  refreshToken: string;
  bikeNumber: string;
}

export const loginRequest = createAsyncThunk<LoginSuccess, LoginRequest, {rejectValue: string}>('user/login', async(data, {rejectWithValue}) => {
  try{
    deleteToken()
    const response = await axiosInstance.post('/member/login', data);
    return Object.assign(response.data, {identity:data.identity});
  }catch(error: any){
    return rejectWithValue("아이디 또는 비밀번호를 확인해주세요");
  }
});

/* 로그아웃 액션 */
export const logoutAction = createAction('user/logout')


/* 회원가입 액션 */
interface SignupRequest{
  name: string;
  identity: string;
  password: string;
  phoneNumberArray: string[]
}

export const signupRequest = createAsyncThunk<any, SignupRequest, {rejectValue: string}>("user/signup", async(data, {rejectWithValue}) => {
  try{
    deleteToken()
    await axiosInstance.post("/member/new", Object.assign(data, {auth:"USER"}))
  }
  catch(error: any){
    return rejectWithValue(error.response.data ?? "무언가의 에러")
  }
})