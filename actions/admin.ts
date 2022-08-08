import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from 'utils/customAxios'

/* 렌탈 요청 정보 조회 */
export const requestRentalRequest = createAsyncThunk<Array<RequestRental>, void, {rejectValue: string}>('admin/requestRental', async(_: void, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.get("/rental/admin?status=WAIT")
    console.log(response.data)
    return response.data;
  }
  catch(error: any){
    console.log(error.response.data)
    return rejectWithValue("렌탈 요청 정보를 읽어오는 데 실패하였습니다")
  }
})
