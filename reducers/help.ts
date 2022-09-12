import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { doneQnaRequest, myQnaRequest, postQnaRequest, replyQnaRequest } from 'actions/help';

interface HelpState {
  qnaHistory: Array<Qna>;

  myQnaLoading: boolean;
  myQnaDone: boolean;
  myQnaError: string | null;

  postQnaLoading: boolean;
  postQnaDone: boolean;
  postQnaError: string | null;

  replyQnaLoading: boolean;
  replyQnaDone: boolean;
  replyQnaError: string | null;

  doneQnaLoading: boolean;
  doneQnaDone: boolean;
  doneQnaError: string | null;
}

export const initialState: HelpState = {
  qnaHistory: [],

  myQnaLoading: false,
  myQnaDone: false,
  myQnaError: null,

  postQnaLoading: false,
  postQnaDone: false,
  postQnaError: null,

  replyQnaLoading: false,
  replyQnaDone: false,
  replyQnaError: null,

  doneQnaLoading: false,
  doneQnaDone: false,
  doneQnaError: null,
};

const helpSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<HelpState>) =>
    builder
      //내 QNA 불러오기
      .addCase(myQnaRequest.pending, (state) => {
        state.myQnaLoading = true;
        state.myQnaDone = false;
        state.myQnaError = null;
      })
      .addCase(myQnaRequest.fulfilled, (state, action) => {
        state.myQnaLoading = false;
        state.myQnaDone = true;

        state.qnaHistory = action.payload.qnaHistory;
      })
      .addCase(myQnaRequest.rejected, (state, action) => {
        state.myQnaLoading = false;
        state.myQnaError = action.payload ?? '문의내역 조회 실패';
      })

      //QNA 등록하기
      .addCase(postQnaRequest.pending, (state) => {
        state.postQnaLoading = true;
        state.postQnaDone = false;
        state.postQnaError = null;
      })
      .addCase(postQnaRequest.fulfilled, (state) => {
        state.postQnaLoading = false;
        state.postQnaDone = true;
      })
      .addCase(postQnaRequest.rejected, (state, action) => {
        state.postQnaLoading = false;
        state.postQnaError = action.payload ?? 'QNA 등록에 실패하였습니다';
      })

      //추가문의 등록하기
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
        state.replyQnaError = action.payload ?? '추가문의 등록에 실패하였습니다';
      })

      //문의 완료처리
      .addCase(doneQnaRequest.pending, (state) => {
        state.doneQnaLoading = true;
        state.doneQnaDone = false;
        state.doneQnaError = null;
      })
      .addCase(doneQnaRequest.fulfilled, (state) => {
        state.doneQnaLoading = false;
        state.doneQnaDone = true;
      })
      .addCase(doneQnaRequest.rejected, (state, action) => {
        state.doneQnaLoading = false;
        state.doneQnaError = action.payload ?? '문의 완료처리에 실패하였습니다';
      }),
});

export default helpSlice.reducer;
