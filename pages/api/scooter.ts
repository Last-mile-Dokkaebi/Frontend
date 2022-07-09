// Custom Axios에서 instance만든거 가져와서 사용
import axios from 'utils/customAxios';


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
  const startYear  = start.getFullYear();
  const startMonth = start.getMonth();
  const startDay   = start.getDate();

  const endYear  = end.getFullYear();
  const endMonth = end.getMonth();
  const endDay   = end.getDate();

  const startDate  = `${startYear}-${startMonth.toString().padStart(2, '0')}-${startDay.toString().padStart(2, '0')}`
  const endDate  = `${endYear}-${endMonth.toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`

  const res = await axios.post('/rental/price', {startDate, endDate})

  return res.data
}

/* 스쿠터를 빌리기 위한 API */
const rentalScooterApi = async({start, end}: getRentalPriceInput): Promise<number> => {
  const startYear  = start.getFullYear();
  const startMonth = start.getMonth();
  const startDay   = start.getDate();

  const endYear  = end.getFullYear();
  const endMonth = end.getMonth();
  const endDay   = end.getDate();

  const startDate  = `${startYear}-${startMonth.toString().padStart(2, '0')}-${startDay.toString().padStart(2, '0')}`
  const endDate  = `${endYear}-${endMonth.toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`

  const res = await axios.post('/rental/price', {startDate, endDate})

  return res.data
}


export {getScooterInfoApi, getScooterLocationApi, getRentalPriceApi, rentalScooterApi}
