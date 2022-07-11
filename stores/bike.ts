import {createSlice, PayloadAction} from "@reduxjs/toolkit"

// user 스토어 타입 정의
interface BikeTypes{
  lat: number;
  lng: number;

  soc: number;

  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

// system스토어의 초기값을 설정
const initialState:BikeTypes = {
  lat: 36.144765,
  lng: 128.392134,

  soc: 0,
  
  year: 0,
  month: 0, 
  day: 0, 
  hour: 0,
  minute:0,
  second:0,
}

// system스토어 동작부 설계
const bikeSlice = createSlice({
  name: 'bike', //name으로 지정한 부분이 추후 useSelector에서의 이름이 됨 ex) 이경우 useSelector(state=>state.system)
  initialState,
  reducers:{
    setBikeStateAction: (state: BikeTypes, action: PayloadAction<{lat:number, lng:number, soc:number, year: number,month: number,day: number,hour: number,minute: number,second: number,}>) => {
      const {lat, lng, soc, year,month, day, hour, minute, second} = action.payload;
      state.lat = lat;
      state.lng = lng;
      state.soc = soc;
      
      state.year = year;
      state.month = month;
      state.day = day;
      state.hour = hour;
      state.minute = minute;
      state.second = second;
    },
  }
})

/*
  추후 사용은 dispatch로 dispatch(action이름())의 형식으로
*/
export const {setBikeStateAction} = bikeSlice.actions;

//export할려면 이렇게 .reducer로
export default bikeSlice.reducer;