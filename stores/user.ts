import {createSlice, PayloadAction} from "@reduxjs/toolkit"

// user 스토어 타입 정의
interface UserTypes{
  isLoggedin: boolean; //false일 경우 로그인이 안 된 상태, true일 경우 로그인 된 상태
  nickname: string; // user의 nickname, name으로 할지 nickname으로 할지 생각 해봐야됨
}

// user스토어의 초기값을 설정
const initialState:UserTypes = {
  isLoggedin: false,
  nickname: "",
}

// user스토어 동작부 설계
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    loginAction: (state, action: PayloadAction<{nickname: string}>) => {
      state.isLoggedin = true,
      state.nickname = action.payload.nickname
    }
  }
})


//createSlice에서 reducers로 만든 action들을 여기서 export
export const {loginAction} = userSlice.actions;

//userSlice를 export할려면 이렇게 .reducer로
export default userSlice.reducer;