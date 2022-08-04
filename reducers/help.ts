import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit'
import { myQnaRequest } from 'actions/help';



interface HelpState{
  qnaHistory: Array<Qna>;

  myQnaLoading: boolean;
  myQnaDone: boolean;
  myQnaError: string | null;

  postQnaLoading: boolean;
  postQnaDone: boolean;
  postQnaError: string | null;
}

export const initialState: HelpState = {
  qnaHistory: [],

  myQnaLoading: false,
  myQnaDone: false,
  myQnaError: null,

  postQnaLoading: false,
  postQnaDone: false,
  postQnaError: null,
}

const helpSlice = createSlice({
  name:"help",
  initialState,
  reducers:{},
  extraReducers: (builder: ActionReducerMapBuilder<HelpState>) => builder
    //내 QNA 불러오기
    .addCase(myQnaRequest.pending, (state) => {
      state.myQnaLoading = true;
      state.myQnaDone = false;
      state.myQnaError = null;
    })
    .addCase(myQnaRequest.fulfilled, (state, action) => {
      state.myQnaLoading = false;
      state.myQnaDone = true;

      state.qnaHistory = action.payload.qnaHistory
    })
    .addCase(myQnaRequest.rejected, (state, action) => {
      state.myQnaLoading = false;
      state.myQnaError = action.payload ?? "무언가의 에러";
    })

    // //QNA 등록하기
    // .addCase(myQnaRequest.pending, (state) => {
    //   state.myQnaLoading = true;
    //   state.myQnaDone = false;
    //   state.myQnaError = null;
    // })
    // .addCase(myQnaRequest.fulfilled, (state, action) => {
    //   state.myQnaLoading = false;
    //   state.myQnaDone = true;

    //   state.qnaHistory = action.payload.qnaHistory
    // })
    // .addCase(myQnaRequest.rejected, (state, action) => {
    //   state.myQnaLoading = false;
    //   state.myQnaError = action.payload ?? "무언가의 에러";
    // })
})

export default helpSlice.reducer