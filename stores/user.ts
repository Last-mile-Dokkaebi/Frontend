import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from 'utils/customAxios'

// user 스토어 타입 정의
interface UserTypes{
  isLoggedin: boolean;              //false일 경우 로그인이 안 된 상태, true일 경우 로그인 된 상태
  identity: string;                 // user의 identity
  auth: string | 'USER' | 'ADMIN';  //로그인 사람의 접근권한
  bikeNumber: string;               //빌린 바이크 번호, 없으면 ""으로 초기화
}

// user스토어의 초기값을 설정
const initialState:UserTypes = {
  isLoggedin: false,
  identity: "",
  auth: 'USER',                     //일단 초기값은 USER인걸로
  bikeNumber: '',
}

// user스토어 동작부 설계
const userSlice = createSlice({
  name: 'user', //name으로 지정한 부분이 추후 useSelector에서의 이름이 됨 ex) 이경우 useSelector(state=>state.user)
  initialState,
  reducers:{
    loginAction: (state:UserTypes, action: PayloadAction<{identity: string, 
                                                          auth: string | 'USER'|'ADMIN', 
                                                          bikeNumber: string}>) => {
      const {identity, auth, bikeNumber} = action.payload;
      state.isLoggedin = true;
      state.identity = identity;
      state.auth = auth;
      state.bikeNumber = bikeNumber;
    },
    logoutAction: (state:UserTypes) => {
      state.isLoggedin = false;
      state.identity = "";
      state.auth = 'USER';
      state.bikeNumber = '';
      delete axios.defaults.headers.common["access_token"]; //로그아웃하면 accessToken삭제
    },
  }
})

/*
  createSlice에서 reducers로 만든 action들을 여기서 export
  추후 사용은 dispatch로 dispatch(loginAction({nickname : 입력값}))의 형식으로
*/

export const {loginAction, logoutAction } = userSlice.actions;

//userSlice를 export할려면 이렇게 .reducer로
export default userSlice.reducer;