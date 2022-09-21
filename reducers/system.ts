import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import {
  openModalAction,
  closeModalAction,
  startLoadingAction,
  endLoadingAction,
  setErrorAction,
  deleteErrorAction,
} from 'actions/system';

interface SystemState {
  modalIsOpen: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  errorCount: number;
}

const initialState: SystemState = {
  modalIsOpen: false,
  isLoading: false,
  errorMessage: null,
  errorCount: 0,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SystemState>) =>
    builder
      //모달 열기
      .addCase(openModalAction, (state) => {
        state.modalIsOpen = true;
      })
      //모달 닫기
      .addCase(closeModalAction, (state) => {
        state.modalIsOpen = false;
      })
      //로딩 시작
      .addCase(startLoadingAction, (state) => {
        state.isLoading = true;
      })
      //로딩 종료
      .addCase(endLoadingAction, (state) => {
        state.isLoading = false;
      })
      //에러 메시지 설정
      .addCase(setErrorAction, (state, action) => {
        state.errorMessage = action.payload;
        state.errorCount++;
        if (action.payload === null) {
          //error초기화
          state.errorCount = 0;
        }
      })
      //에러 메시지 초기화
      .addCase(deleteErrorAction, (state) => {
        state.errorMessage = null;
        state.errorCount = 0;
      }),
});

export default systemSlice.reducer;
