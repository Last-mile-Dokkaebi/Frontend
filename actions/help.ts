import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'utils/customAxios'

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

export const postQnaRequest = createAsyncThunk<void, PostQnaRequest, {rejectValue: string}>("help/postQna", async(data, {rejectWithValue}) => {
  try{
    await axiosInstance.post("/help/qna", data);
  } catch(error: any){
    console.log(error.response)
    return rejectWithValue(error.response.data.description ?? "QNA 등록 실패")
  }
})