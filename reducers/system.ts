import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit'
import { openModalAction, closeModalAction, startLoadingAction, endLoadingAction } from 'actions/system';

interface SystemState{
  modalIsOpen: boolean;
  isLoading: boolean;
}

const initialState:SystemState = {
  modalIsOpen: false,
  isLoading: false,
}

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers:{  },
  extraReducers: (builder: ActionReducerMapBuilder<SystemState>) => builder
    //모달 열기
    .addCase(openModalAction, (state) =>{
      state.modalIsOpen = true;
    })
    //모달 닫기
    .addCase(closeModalAction, (state) =>{
      state.modalIsOpen = false;
    })
    //로딩 시작
    .addCase(startLoadingAction, (state) =>{
      state.isLoading = true;
    })
    //로딩 종료
    .addCase(endLoadingAction, (state) =>{
      state.isLoading = false;
    })
})

export default systemSlice.reducer