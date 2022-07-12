// Custom Axios에서 instance만든거 가져와서 사용
import axios from 'utils/customAxios';
import {DateToString} from 'utils/processing'

/* 멤버의 상태를 확인하기 위한 함수 */
interface memberScooterStatusOutputTypes{
  status: 'NONE' | 'RENTAL' | 'DRIVE' | 'notRiding',
  startDate: string;
  endDate: string;
}
const memberScooterStatusApi = async(): Promise<memberScooterStatusOutputTypes> => {
  const res = await axios.get("/scooter/state");


  console.log(`${JSON.stringify(res.data)}`)

  return res.data;
}

interface getScooterInfoReturnTypes{
  driveDist: number;
  route: Array<{lat:number, lng: number}>;
  soc: number;
  startTime: Date;
}
/* 킥보드(스쿠터)로 부터 주행 정보를 불러오는 함수 */
const getScooterInfoApi = async (): Promise<getScooterInfoReturnTypes>=>{
  let config = {
    params: {
      scooterId:"0001",
      useCount:"1"
    },
  };
  const res = await axios.get("/scooter",config);

  return res.data
}
/* 주행중이 아닐때 킥보드의 정보를 받아옴*/
interface getScooterLocationTypes{
  lat: number;
  lng: number;
  soc: number;
  endDate: Date;
}
const getScooterLocationApi = async(): Promise<getScooterLocationTypes> => {
  const res = await axios.get("/scooter/location")

  return res.data
}

/* 스쿠터를 빌릴때 가격을 불러옴 */
interface getRentalPriceInput{
  start: Date;
  end: Date;
}
const getRentalPriceApi = async({start, end}: getRentalPriceInput): Promise<number> => {
  const startDate = DateToString(start);
  const endDate = DateToString(end);

  const res = await axios.post('/rental/price', {startDate, endDate})

  return res.data
}

/* 스쿠터를 빌리기 위한 API */
const rentalScooterApi = async({start, end}: getRentalPriceInput): Promise<number> => {
  const startDate = DateToString(start);
  const endDate = DateToString(end);

  const res = await axios.post('/rental/price', {startDate, endDate})

  return res.data
}

/* 대여한 스쿠터를 켜기위한 API */
const startRidingApi = async() => {
  // await axios.post()
  return true;
}
/* 대여한 스쿠터를 끄기위한 API */
const endRidingApi = async() => {
  // await axios.post()
  return true;
}

/* TEST용 */
const testApi = async() => {
  // const res = await axios.get("http://lwc421.iptime.org:5000/")
  // console.log(res)
  const voltage = new Array(32).fill(0).map((value, index)=>index*0.01)
  const current = new Array(32).fill(0).map((value, index)=>index)
  const temperature = new Array(32).fill(0).map((value, index)=>index)
  console.log(voltage)

  const res = await axios.post("http://lwc421.iptime.org:5000/remainTime", {voltage, current, temperature})
  console.log(res.data)
  return res.data
}

export {
  memberScooterStatusApi,
  getScooterInfoApi, 
  getScooterLocationApi, 
  getRentalPriceApi, 
  rentalScooterApi, 
  startRidingApi, 
  endRidingApi, 
  testApi
}
