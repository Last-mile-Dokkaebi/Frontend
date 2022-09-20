import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { scooterStateRequest, rentalPriceRequest, scooterRentalRequest, scooterReturnRequest } from 'actions/bike';

interface BikeState {
  status: 'NONE' | 'WAIT' | 'RENTAL' | 'DRIVE';
  startDate: string;
  endDate: string;
  bikeNumber: string;
  rentalPrice: number;

  scooterStateLoading: boolean;
  scooterStateDone: boolean;
  scooterStateError: string | null;

  rentalPriceLoading: boolean;
  rentalPriceDone: boolean;
  rentalPriceError: string | null;

  scooterRentalLoading: boolean;
  scooterRentalDone: boolean;
  scooterRentalError: string | null;

  scooterReturnLoading: boolean;
  scooterReturnDone: boolean;
  scooterReturnError: string | null;
}

const initialState: BikeState = {
  status: 'NONE',
  startDate: '',
  endDate: '',
  bikeNumber: '',
  rentalPrice: 0,

  scooterStateLoading: false,
  scooterStateDone: false,
  scooterStateError: null,

  rentalPriceLoading: false,
  rentalPriceDone: false,
  rentalPriceError: null,

  scooterRentalLoading: false,
  scooterRentalDone: false,
  scooterRentalError: null,

  scooterReturnLoading: false,
  scooterReturnDone: false,
  scooterReturnError: null,
};

const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<BikeState>) =>
    builder
      //스쿠터 대여정보 확인
      .addCase(scooterStateRequest.pending, (state) => {
        state.scooterStateLoading = true;
        state.scooterStateDone = false;
        state.scooterStateError = null;
      })
      .addCase(scooterStateRequest.fulfilled, (state, action) => {
        const { status, startDate, endDate } = action.payload;
        state.status = status;
        state.startDate = startDate;
        state.endDate = endDate;
        state.scooterStateLoading = false;
        state.scooterStateDone = true;
      })
      .addCase(scooterStateRequest.rejected, (state, action) => {
        state.scooterStateLoading = false;
        state.scooterStateError = action.payload ?? '무언가의 에러';
      })

      //대여 가격 요청
      .addCase(rentalPriceRequest.pending, (state) => {
        state.rentalPriceLoading = true;
        state.rentalPriceDone = false;
        state.rentalPriceError = null;
      })
      .addCase(rentalPriceRequest.fulfilled, (state, action) => {
        state.rentalPriceLoading = false;
        state.rentalPriceDone = true;

        state.rentalPrice = action.payload;
      })
      .addCase(rentalPriceRequest.rejected, (state, action) => {
        state.rentalPriceLoading = false;
        state.rentalPriceError = action.payload ?? '요금 정보를 불러오는데 실패하였습니다';
      })

      //스쿠터 대여 요청
      .addCase(scooterRentalRequest.pending, (state) => {
        state.scooterRentalLoading = true;
        state.scooterRentalDone = false;
        state.scooterRentalError = null;
      })
      .addCase(scooterRentalRequest.fulfilled, (state, action) => {
        state.scooterRentalLoading = false;
        state.scooterRentalDone = true;

        state.status = 'WAIT';
        state.startDate = action.payload.startDate;
        state.endDate = action.payload.endDate;
      })
      .addCase(scooterRentalRequest.rejected, (state, action) => {
        state.scooterRentalLoading = false;
        state.scooterRentalError = action.payload ?? '스쿠터 대여에 실패하였습니다';
      })

      //스쿠터 반납 요청
      .addCase(scooterReturnRequest.pending, (state) => {
        state.scooterReturnLoading = true;
        state.scooterReturnDone = false;
        state.scooterReturnError = null;
      })
      .addCase(scooterReturnRequest.fulfilled, (state, action) => {
        state.scooterReturnLoading = false;
        state.scooterReturnDone = true;
      })
      .addCase(scooterReturnRequest.rejected, (state, action) => {
        state.scooterReturnLoading = false;
        state.scooterReturnError = action.payload ?? '스쿠터 반납에 실패하였습니다';
      }),
});

export default bikeSlice.reducer;
