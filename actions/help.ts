import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/constant';
import axiosInstance from 'utils/customAxios'
import { getBrowserToken } from 'utils/token';
import { myInfoRequest } from './user';

/* 내 QNA 전부 조회 */
interface MyQnaSuccess{
  qnaHistory: Array<Qna>;
}

export const myQnaRequest = createAsyncThunk<MyQnaSuccess, void, {rejectValue: string}>("help/myQna", async(_:void, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get("/help/qna");
    return response.data;
  } catch(error: any){
    return rejectWithValue(error.response.data.description ?? "내 정보 불러오기 에러")
  }
})

/* QNA 등록 */
interface PostQnaRequest{
  title: string;
  comment: string;
}

export const postQnaRequest = createAsyncThunk<void, PostQnaRequest, {rejectValue: string | object}>("help/postQna", async(data, {dispatch, rejectWithValue}) => {
  try{
    const cookies = getBrowserToken();
    if(cookies !== null){
      const {accessToken, refreshToken} = cookies;
      await dispatch(myInfoRequest({accessToken, refreshToken}))
    }
    await axiosInstance.post("/help/qna", data);
  } catch(error: any){
    return rejectWithValue(error.response.data ?? "QNA 등록 실패")
  }
})