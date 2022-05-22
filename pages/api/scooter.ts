// Custom Axios에서 instance만든거 가져와서 사용
import axios from 'utils/customAxios';


/* 킥보드(스쿠터)로 부터 주행 정보를 불러오는 함수 */
const getScooterInfo = async ()=>{
  let res:{isSuccess:boolean,data:any|null} = {
    isSuccess: false,
    data: null,
  };
  let config = {
    params: {
      scooterId:"0001",
      useCount:"1"
    },
  };
  try {
    const response = await axios.get("/scooter",config);
    res.data = response.data;
    res.data.route = res.data.route.map((item:{lat:number,lon:number})=>{return {lat:item.lat,lng:item.lon}})
  } catch (err) {
    res.isSuccess = false;
  }
  return res;
}

export {getScooterInfo}
