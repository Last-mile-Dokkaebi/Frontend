import { ActionReducerMapBuilder, createSlice, current } from '@reduxjs/toolkit';
import {
  adminQnaRequest,
  doneRentalRequest,
  driveRentalRequest,
  enrollScooterRequest,
  noneRentalRequest,
  rentalRentalRequest,
  replyQnaRequest,
  waitRentalRequest,
} from 'actions/admin';
import { DateToString } from 'utils/processing';

interface AdminState {
  noneRental: Array<RequestRental>; //NONE 렌탈 정보
  waitRental: Array<RequestRental>; //WAIT 렌탈 정보
  rentalRental: Array<RequestRental>; //RENTAL 렌탈 정보
  driveRental: Array<RequestRental>; //DRIVE 렌탈 정보

  qnaHistory: Array<Qna>;

  noneRentalLoading: boolean;
  noneRentalDone: boolean;
  noneRentalError: null | string;

  waitRentalLoading: boolean;
  waitRentalDone: boolean;
  waitRentalError: null | string;

  rentalRentalLoading: boolean;
  rentalRentalDone: boolean;
  rentalRentalError: null | string;

  driveRentalLoading: boolean;
  driveRentalDone: boolean;
  driveRentalError: null | string;

  currentDoneRental: null | number;
  doneRentalLoading: boolean;
  doneRentalDone: boolean;
  doneRentalError: null | string;

  enrollScooterLoading: boolean;
  enrollScooterDone: boolean;
  enrollScooterError: null | string;

  adminQnaLoading: boolean;
  adminQnaDone: boolean;
  adminQnaError: null | string;

  replyQnaLoading: boolean;
  replyQnaDone: boolean;
  replyQnaError: null | string;
}

export const initialState: AdminState = {
  noneRental: [],
  waitRental: [],
  rentalRental: [],
  driveRental: [],

  qnaHistory: [],

  noneRentalLoading: false,
  noneRentalDone: false,
  noneRentalError: null,

  waitRentalLoading: false,
  waitRentalDone: false,
  waitRentalError: null,

  rentalRentalLoading: false,
  rentalRentalDone: false,
  rentalRentalError: null,

  driveRentalLoading: false,
  driveRentalDone: false,
  driveRentalError: null,

  currentDoneRental: null,
  doneRentalLoading: false,
  doneRentalDone: false,
  doneRentalError: null,

  enrollScooterLoading: false,
  enrollScooterDone: false,
  enrollScooterError: null,

  adminQnaLoading: false,
  adminQnaDone: false,
  adminQnaError: null,

  replyQnaLoading: false,
  replyQnaDone: false,
  replyQnaError: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AdminState>) =>
    builder
      //NONE 렌탈 정보 불러오기
      .addCase(noneRentalRequest.pending, (state) => {
        state.noneRentalLoading = true;
        state.noneRentalDone = false;
        state.noneRentalError = null;
      })
      .addCase(noneRentalRequest.fulfilled, (state, action) => {
        state.noneRentalLoading = false;
        state.noneRentalDone = true;

        state.noneRental = action.payload;
      })
      .addCase(noneRentalRequest.rejected, (state, action) => {
        state.noneRentalLoading = false;
        state.noneRentalError = action.payload ?? '무언가의 에러';
      })

      //WAIT 렌탈 정보 불러오기
      .addCase(waitRentalRequest.pending, (state) => {
        state.waitRentalLoading = true;
        state.waitRentalDone = false;
        state.waitRentalError = null;
      })
      .addCase(waitRentalRequest.fulfilled, (state, action) => {
        state.waitRentalLoading = false;
        state.waitRentalDone = true;

        state.waitRental = action.payload;
      })
      .addCase(waitRentalRequest.rejected, (state, action) => {
        state.waitRentalLoading = false;
        state.waitRentalError = action.payload ?? '무언가의 에러';
      })

      //RENTAL 렌탈 정보 불러오기
      .addCase(rentalRentalRequest.pending, (state) => {
        state.rentalRentalLoading = true;
        state.rentalRentalDone = false;
        state.rentalRentalError = null;
      })
      .addCase(rentalRentalRequest.fulfilled, (state, action) => {
        state.rentalRentalLoading = false;
        state.rentalRentalDone = true;

        state.rentalRental = action.payload;
      })
      .addCase(rentalRentalRequest.rejected, (state, action) => {
        state.rentalRentalLoading = false;
        state.rentalRentalError = action.payload ?? '무언가의 에러';
      })

      //DRIVE 렌탈 정보 불러오기
      .addCase(driveRentalRequest.pending, (state) => {
        state.driveRentalLoading = true;
        state.driveRentalDone = false;
        state.driveRentalError = null;
      })
      .addCase(driveRentalRequest.fulfilled, (state, action) => {
        state.driveRentalLoading = false;
        state.driveRentalDone = true;

        state.driveRental = action.payload;
      })
      .addCase(driveRentalRequest.rejected, (state, action) => {
        state.driveRentalLoading = false;
        state.driveRentalError = action.payload ?? '무언가의 에러';
      })

      //렌탈 완료 처리
      .addCase(doneRentalRequest.pending, (state, action) => {
        state.doneRentalLoading = true;
        state.doneRentalDone = false;
        state.doneRentalError = null;

        state.currentDoneRental = action.meta.arg.rentalId;
      })
      .addCase(doneRentalRequest.fulfilled, (state) => {
        state.doneRentalLoading = false;
        state.doneRentalDone = true;

        const targetRental = state.waitRental.findIndex((rental) => rental.rentalId === state.currentDoneRental);
        state.waitRental.splice(targetRental, 1);
      })
      .addCase(doneRentalRequest.rejected, (state, action) => {
        state.doneRentalLoading = false;
        state.doneRentalError = action.payload ?? '무언가의 에러';
      })

      //스쿠터 등록 요청
      .addCase(enrollScooterRequest.pending, (state) => {
        state.enrollScooterLoading = true;
        state.enrollScooterDone = false;
        state.enrollScooterError = null;
      })
      .addCase(enrollScooterRequest.fulfilled, (state) => {
        state.enrollScooterLoading = false;
        state.enrollScooterDone = true;
      })
      .addCase(enrollScooterRequest.rejected, (state, action) => {
        state.enrollScooterLoading = false;
        state.enrollScooterError = action.payload ?? '무언가의 에러';
      })

      //문의 사항 조회
      .addCase(adminQnaRequest.pending, (state) => {
        state.adminQnaLoading = true;
        state.adminQnaDone = false;
        state.adminQnaError = null;
      })
      .addCase(adminQnaRequest.fulfilled, (state, action) => {
        state.adminQnaLoading = false;
        state.adminQnaDone = true;

        state.qnaHistory = action.payload.qnaHistory;
      })
      .addCase(adminQnaRequest.rejected, (state, action) => {
        state.adminQnaLoading = false;
        state.adminQnaError = action.payload ?? '문의 사항 조회를 실패했습니다';
      })

      //문의 사항 답변
      .addCase(replyQnaRequest.pending, (state) => {
        state.replyQnaLoading = true;
        state.replyQnaDone = false;
        state.replyQnaError = null;
      })
      .addCase(replyQnaRequest.fulfilled, (state) => {
        state.replyQnaLoading = false;
        state.replyQnaDone = true;
      })
      .addCase(replyQnaRequest.rejected, (state, action) => {
        state.replyQnaLoading = false;
        state.replyQnaError = action.payload ?? '문의 사항 답변에 실패하였습니다';
      }),
});

export default adminSlice.reducer;
