// Custom Axios에서 instance만든거 가져와서 사용
import axios from 'utils/customAxios';
import {DateToString} from 'utils/processing'

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
const scooterOnApi = async() => {
  // await axios.post()
  return true;
}

export {getScooterInfoApi, getScooterLocationApi, getRentalPriceApi, rentalScooterApi, scooterOnApi}
