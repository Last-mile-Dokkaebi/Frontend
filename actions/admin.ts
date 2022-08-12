import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from 'utils/customAxios'
import { getBrowserToken } from 'utils/token';
import { myInfoRequest } from './user';

/* NONE 렌탈 요청 정보 조회 */
export const noneRentalRequest = createAsyncThunk<Array<RequestRental>, void, {rejectValue: string}>('admin/noneRental', async(_:void, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get(`/rental/admin?status=NONE`)
    return response.data;
  }
  catch(error: any){
    return rejectWithValue(typeof error.response.data ==="string" 
    ? error.response.data 
    : "렌탈 요청 정보를 읽어오는 데 실패하였습니다")
  }
})

/* WAIT 렌탈 요청 정보 조회 */
export const waitRentalRequest = createAsyncThunk<Array<RequestRental>, void, {rejectValue: string}>('admin/waitRental', async(_:void, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get(`/rental/admin?status=WAIT`)
    return response.data;
  }
  catch(error: any){
    return rejectWithValue(typeof error.response.data ==="string" 
    ? error.response.data 
    : "렌탈 요청 정보를 읽어오는 데 실패하였습니다")
  }
})

/* RENTAL 렌탈 요청 정보 조회 */
export const rentalRentalRequest = createAsyncThunk<Array<RequestRental>, void, {rejectValue: string}>('admin/rentalRental', async(_:void, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get(`/rental/admin?status=RENTAL`)
    return response.data;
  }
  catch(error: any){
    return rejectWithValue(typeof error.response.data ==="string" 
    ? error.response.data 
    : "렌탈 요청 정보를 읽어오는 데 실패하였습니다")
  }
})

/* DRIVE 렌탈 요청 정보 조회 */
export const driveRentalRequest = createAsyncThunk<Array<RequestRental>, void, {rejectValue: string}>('admin/driveRental', async(_:void, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get(`/rental/admin?status=DRIVE`)
    return response.data;
  }
  catch(error: any){
    return rejectWithValue(typeof error.response.data ==="string" 
    ? error.response.data 
    : "렌탈 요청 정보를 읽어오는 데 실패하였습니다")
  }
})


/* 스쿠터 등록 */
interface EnrollScooterRequest{
  identity: string;
}

export const enrollScooterRequest = createAsyncThunk<void, EnrollScooterRequest, {rejectValue: string}>('admin/enrollScooter', async(data:EnrollScooterRequest, {dispatch, rejectWithValue}) => {
  try{
    const cookies = getBrowserToken();
    if (cookies) {
      const { accessToken, refreshToken } = cookies;
      await dispatch(myInfoRequest({ accessToken, refreshToken }));
    }
    const response = await axiosInstance.post("/scooter/new", data);
    return response.data;
  }
  catch(error: any){
    return rejectWithValue(typeof error.response.data==="string" 
    ? error.response.data 
    : "스쿠터 등록을 실패하였습니다")
  }
})

/* 문의 사항 조회 */
interface AdminQnaRequest{
  status: "REGISTERED"| "RESPONDED"| "COMPLETE";
}

interface AdminQnaSuccess{
  qnaHistory: Array<Qna>;
}

export const adminQnaRequest = createAsyncThunk<AdminQnaSuccess, AdminQnaRequest, {rejectValue: string}>('admin/qnaHistory', async({status}:AdminQnaRequest, {dispatch, rejectWithValue}) => {
  try{
    const cookies = getBrowserToken()
    if(cookies){
      const { accessToken, refreshToken } = cookies;
      await dispatch(myInfoRequest({ accessToken, refreshToken }));
    }

    const response = await axiosInstance.get<AdminQnaSuccess>(`/help/qna/admin?status=${status}`)
    return response.data;
  }
  catch(error: any){
    return rejectWithValue(typeof error.response.data==="string" 
    ? error.response.data
    : "문의사항 조회를 실패하였습니다")
  }
})


/* 렌탈 완료 처리 */
// interface EnrollScooterRequest{
//   identity: string;
// }

// export const enrollScooterRequest = createAsyncThunk<void, EnrollScooterRequest, {rejectValue: string}>('admin/enrollScooter', async(data:EnrollScooterRequest, {dispatch, rejectWithValue}) => {
//   try{
//     const cookies = getBrowserToken();
//     if (cookies) {
//       const { accessToken, refreshToken } = cookies;
//       await dispatch(myInfoRequest({ accessToken, refreshToken }));
//     }
//     const response = await axiosInstance.post("/scooter/new", data);
//     return response.data;
//   }
//   catch(error: any){
//     return rejectWithValue(typeof error.response.data==="string" 
//     ? error.response.data 
//     : "스쿠터 등록을 실패하였습니다")
//   }
// })
