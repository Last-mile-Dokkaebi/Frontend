import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit'
import { myQnaRequest, postQnaRequest } from 'actions/help';



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
      state.myQnaError = action.payload ?? "문의내역 조회 실패";
    })

    //QNA 등록하기
    .addCase(postQnaRequest.pending, (state) => {
      state.postQnaLoading = true;
      state.postQnaDone = false;
      state.postQnaError = null;
    })
    .addCase(postQnaRequest.fulfilled, (state, action) => {
      state.postQnaLoading = false;
      state.postQnaDone = true;
    })
    .addCase(postQnaRequest.rejected, (state, action) => {
      state.postQnaLoading = false;
      state.postQnaError = action.payload ?? "무언가의 에러";
    })
})

export default helpSlice.reducer