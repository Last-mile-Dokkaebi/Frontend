import {createSlice, PayloadAction} from "@reduxjs/toolkit"

// user 스토어 타입 정의
interface SystemTypes{
  modalIsOpen: boolean; // false일 경우 dialog를 없애고, true일 경우 dialog를 띄움
}

// system스토어의 초기값을 설정
const initialState:SystemTypes = {
  modalIsOpen: false,
}

// system스토어 동작부 설계
const systemSlice = createSlice({
  name: 'system', //name으로 지정한 부분이 추후 useSelector에서의 이름이 됨 ex) 이경우 useSelector(state=>state.system)
  initialState,
  reducers:{
    setModal: (state: SystemTypes, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload
    }
  }
})

/*
  추후 사용은 dispatch로 dispatch(action이름())의 형식으로
*/
export const {setModal} = systemSlice.actions;

//export할려면 이렇게 .reducer로
export default systemSlice.reducer;