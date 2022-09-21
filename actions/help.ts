import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'utils/customAxios';
import { getBrowserToken } from 'utils/token';
import { myInfoRequest } from './user';

/* 내 QNA 전부 조회 */
interface MyQnaSuccess {
  qnaHistory: Array<Qna>;
}

export const myQnaRequest = createAsyncThunk<MyQnaSuccess, void, { rejectValue: string }>(
  'help/myQna',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/help/qna');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.description ?? '내 정보 불러오기 에러');
    }
  },
);

/* QNA 등록 */
interface PostQnaRequest {
  title: string;
  comment: string;
}

export const postQnaRequest = createAsyncThunk<void, PostQnaRequest, { rejectValue: string }>(
  'help/postQna',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const cookies = getBrowserToken();
      if (cookies !== null) {
        const { accessToken, refreshToken } = cookies;
        await dispatch(myInfoRequest({ accessToken, refreshToken }));
      }
      await axiosInstance.post('/help/qna', data);
    } catch (error: any) {
      return rejectWithValue(error.response.data ?? 'QNA 등록 실패');
    }
  },
);

/* QNA 추가 등록 */
interface ReplyQnaRequest {
  qnaId: number;
  comment: string;
}

export const replyQnaRequest = createAsyncThunk<void, ReplyQnaRequest, { rejectValue: string }>(
  'help/replyQna',
  async ({ qnaId, comment }: ReplyQnaRequest, { dispatch, rejectWithValue }) => {
    try {
      const cookies = getBrowserToken();
      if (cookies) {
        const { accessToken, refreshToken } = cookies;
        await dispatch(myInfoRequest({ accessToken, refreshToken }));
      }
      await axiosInstance.post<void>(`/help/qna/${qnaId}/content`, { comment });
    } catch (error: any) {
      return rejectWithValue(
        typeof error.response.data === 'string' ? error.response.data : '문의사항 추가문의에 실패하였습니다',
      );
    }
  },
);

/* QNA 완료 처리 */
interface DoneQnaRequest {
  qnaId: number;
}

export const doneQnaRequest = createAsyncThunk<void, DoneQnaRequest, { rejectValue: string }>(
  'help/doneQna',
  async ({ qnaId }: DoneQnaRequest, { dispatch, rejectWithValue }) => {
    try {
      const cookies = getBrowserToken();
      if (cookies) {
        const { accessToken, refreshToken } = cookies;
        await dispatch(myInfoRequest({ accessToken, refreshToken }));
      }
      await axiosInstance.patch<void>(`/help/qna/${qnaId}`);
    } catch (error: any) {
      return rejectWithValue(
        typeof error.response.data === 'string' ? error.response.data : '문의사항 완료처리에 실패하였습니다',
      );
    }
  },
);
