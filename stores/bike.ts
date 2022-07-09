import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { LabelTooltipType } from "antd/lib/form/FormItemLabel";

// user 스토어 타입 정의
interface BikeTypes{
  lat: number;  // 바이크의 현재 위도
  lng: number;  // 바이크의 현재 경도

  soc: number;  // 바이크의 현재 SOC
  
  date: string; // 최근 바이크 사용시간, Date타입으로 할 수 없어서 string으로 저장
}

// system스토어의 초기값을 설정
const initialState:BikeTypes = {
  lat: 0,
  lng: 0,

  soc: 0,

  date: Date().toString(),  //그냥 오늘 날짜를 String으로 변환한 것임
}

// system스토어 동작부 설계
const bikeSlice = createSlice({
  name: 'bike', //name을 지정
  initialState,
  reducers:{
    setCurrentBikeStateAction: (state: BikeTypes, action: PayloadAction<{lat:number, lng:number, soc:number, date:string}>) => {  //최근 바이크 사용기록 한 건
      const {lat, lng, soc, date} = action.payload;
      state.lat = lat;
      state.lng = lng;
      state.soc = soc;
      state.date = date;
    }
  }
})

/*
  추후 사용은 dispatch로 dispatch(action이름())의 형식으로
*/
export const {setCurrentBikeStateAction} = bikeSlice.actions;

//export할려면 이렇게 .reducer로
export default bikeSlice.reducer;