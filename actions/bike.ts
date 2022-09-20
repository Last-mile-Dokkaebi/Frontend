import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/constant';
import axiosInstance from 'utils/customAxios';
import { DateToString } from 'utils/processing';
import { getBrowserToken, requestClientInfo } from 'utils/token';
import { myInfoRequest } from './user';

/* 스쿠터 정보 요청 */
interface ScooterStateSuccess {
  status: 'NONE' | 'WAIT' | 'RENTAL' | 'DRIVE';
  startDate: string;
  endDate: string;
}

export const scooterStateRequest = createAsyncThunk<ScooterStateSuccess, void, { rejectValue: string }>(
  'bike/scooterState',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/scooter/state');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        typeof error.response.data === 'string'
          ? error.response.data
          : '서버로부터 대여정보를 읽어오는 데 실패하였습니다',
      );
    }
  },
);

/* 대여 가격 요청 */
interface RentalPriceRequest {
  startDate: Date;
  endDate: Date;
}

export const rentalPriceRequest = createAsyncThunk<number, RentalPriceRequest, { rejectValue: string }>(
  'bike/rentalPrice',
  async (data, { rejectWithValue }) => {
    try {
      const startDate = DateToString(data.startDate);
      const endDate = DateToString(data.endDate);

      const cookies: { [index: string]: string } = {};
      document.cookie.split(';').forEach((cookieString) => {
        const [key, value] = cookieString.split('=');
        cookies[key] = value;
      });

      delete axiosInstance.defaults.headers.common?.Authorization;
      delete axiosInstance.defaults.headers.common?.refresh_token;

      const response = await axiosInstance.post('/rental/price', { startDate, endDate });

      axiosInstance.defaults.headers.common.Authorization = cookies[ACCESS_TOKEN];

      return response.data;
    } catch (error: any) {
      return rejectWithValue('가격 불러오기를 실패하였습니다');
      // return rejectWithValue(error.response.data ?? "대여 요청을 실패하였습니다")
    }
  },
);

/* 스쿠터 대여 요청 */
interface ScooterRentalRequest {
  price: number;
  startDate: Date;
  endDate: Date;
}

interface ScooterRentalSuccess {
  startDate: string;
  endDate: string;
}

export const scooterRentalRequest = createAsyncThunk<
  ScooterRentalSuccess,
  ScooterRentalRequest,
  { rejectValue: string }
>('bike/scooterRental', async (data, { dispatch, rejectWithValue }) => {
  try {
    await requestClientInfo(dispatch);

    const startDate = DateToString(data.startDate);
    const endDate = DateToString(data.endDate);
    const price = data.price;

    await axiosInstance.post('/rental/new', { price, startDate, endDate });

    return { startDate, endDate };
  } catch (error: any) {
    return rejectWithValue(error.response.data.description ?? '대여 요청을 실패하였습니다');
  }
});

/* 스쿠터 반납 요청 */
export const scooterReturnRequest = createAsyncThunk<void, void, { rejectValue: string }>(
  'bike/scooterReturn',
  async (_: void, { dispatch, rejectWithValue }) => {
    try {
      await requestClientInfo(dispatch);

      await axiosInstance.post('/rental/return');
    } catch (error: any) {
      return rejectWithValue(error.response.data.description ?? error.response.data ?? '반납 요청을 실패하였습니다');
    }
  },
);
