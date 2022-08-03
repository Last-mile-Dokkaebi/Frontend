import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "utils/customAxios";
import { deleteToken } from "utils/token";

/* 내 정보 액션 */
interface MyInfoSuccess{
  identity: string;
  auth: string | "USER" | "ADMIN";
}

interface ReIssueSuccess{
  accessToken: string;
  refreshToken: string;
}

export const myInfoRequest = createAsyncThunk<MyInfoSuccess, void, {rejectValue: string}>('user/myInfo', async(_:void, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get("/member");
    return response.data;
  } catch(error: any){
    console.log("내정보 불러오기 에러")
    console.log(error.response.data)
    if(error.response.status === 401){  //Access Token만료로 인한 재발급 필요
      // 코드 수정 필요
      try{
        const response = await axiosInstance.post<ReIssueSuccess>("/member/reissue")
        console.log("Re Issue")
        console.log(response.data)
      } catch(error: any){
        console.log("Re Issue Error")
        console.log(error.response)
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
    await axiosInstance.post("/member/new", Object.assign(data, {auth:"USER"}))
  }
  catch(error: any){
    return rejectWithValue(error.response.data ?? "무언가의 에러")
  }
})