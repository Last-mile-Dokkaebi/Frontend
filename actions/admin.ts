import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from 'utils/customAxios'

/* 렌탈 요청 정보 조회 */
export const requestRentalRequest = createAsyncThunk<Array<RequestRental>, void, {rejectValue: string}>('admin/requestRental', async(_: void, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get("/rental/admin?status=WAIT")
    return response.data;
  }
  catch(error: any){
    return rejectWithValue("렌탈 요청 정보를 읽어오는 데 실패하였습니다")
  }
})


/* 스쿠터 등록 */
interface EnrollScooterRequest{
  identity: string;
}

export const enrollScooterRequest = createAsyncThunk<void, EnrollScooterRequest, {rejectValue: string}>('admin/enrollScooter', async(data:EnrollScooterRequest, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.post("/scooter/new", data);
    return response.data;
  }
  catch(error: any){
    return rejectWithValue(typeof error.response.data==="string" 
    ? error.response.data 
    : "스쿠터 등록을 실패하였습니다")
  }
})
