import {createSlice, PayloadAction} from "@reduxjs/toolkit"

// user 스토어 타입 정의
interface BikeTypes{
  isRentaled: boolean,  //렌탈 하였는지 여부
  isRentaling: boolean, //렌탈 진행중인지 여부
  isRiding: boolean,    //현재 주행중인지 여부

  lat: number;
  lng: number;

  soc: number;

  endDate: string;
}

// system스토어의 초기값을 설정
const initialState:BikeTypes = {
  isRentaled: false,
  isRentaling: false,
  isRiding: false,
  lat: 36.144765,
  lng: 128.392134,

  soc: 0,
  
  endDate: "",
}

// system스토어 동작부 설계
const bikeSlice = createSlice({
  name: 'bike', //name으로 지정한 부분이 추후 useSelector에서의 이름이 됨 ex) 이경우 useSelector(state=>state.system)
  initialState,
  reducers:{
    setRentaledAction: (state:BikeTypes, action: PayloadAction<{isRentaled:boolean}>) => {
      state.isRentaled = action.payload.isRentaled;
    },
    setRentalingAction: (state:BikeTypes, action: PayloadAction<{isRentaling:boolean}>) => {
      state.isRentaling = action.payload.isRentaling;
    },
    setRidingAction: (state:BikeTypes, action: PayloadAction<{isRiding:boolean}>) => {
      state.isRiding = action.payload.isRiding;
    },
    setBikeStateAction: (state: BikeTypes, action: PayloadAction<{lat:number, lng:number, soc:number, endDate: string}>) => {
      const {lat, lng, soc, endDate} = action.payload;
      state.lat = lat;
      state.lng = lng;
      state.soc = soc;
      
      state.endDate = endDate
    },
  }
})

/*
  추후 사용은 dispatch로 dispatch(action이름())의 형식으로
*/
export const {setRentaledAction, setRentalingAction, setRidingAction, setBikeStateAction} = bikeSlice.actions;

//export할려면 이렇게 .reducer로
export default bikeSlice.reducer;