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

export {getScooterInfoApi}
