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
  name: 'user', //name으로 지정한 부분이 추후 useSelector에서의 이름이 됨 ex) 이경우 useSelector(state=>state.user)
  initialState,
  reducers:{
    loginAction: (state:UserTypes, action: PayloadAction<{nickname: string}>) => {
      state.isLoggedin = true,
      state.nickname = action.payload.nickname
    },
    logoutAction: (state:UserTypes) => {
      state.isLoggedin = false,
      state.nickname = ""
    }
  }
})

/*
  createSlice에서 reducers로 만든 action들을 여기서 export
  추후 사용은 dispatch로 dispatch(loginAction({nickname : 입력값}))의 형식으로
*/
export const {loginAction, logoutAction} = userSlice.actions;

//userSlice를 export할려면 이렇게 .reducer로
export default userSlice.reducer;