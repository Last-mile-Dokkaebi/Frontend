/*
  자주 쓰일 것 같은 type들은 여기서 관리
  tsconfig.json에서 d.ts파일 includes되기때문에 global로 써지는 듯
  참조 : https://stackoverflow.com/questions/69403269/global-type-declarations-within-a-nx-and-nextjs-monorepo
*/

interface ScooterState{
  lat: number;  //Scooter의 latitude
  lng: number;  //Scooter의 Longitude
  soc: number;  //Scooter의 SOC
}

interface userInfo{
  birth:string|null; // 생일
  city:string|null; // 거주 도시
  email:string|null; // 이메일
  gender:string|null; // 성별 MALE , FEMALE
  identity:string; // id
  name:string; // 이름
  password:string; // 비밀번호
  phone:string; // 휴대전화번호
  street:string|null; // 거주 지역
}

interface qna{
  adminId:string | null;
  comment:string | null;
  content:string;
  qnaId:number;
  questionerId:string;
  regiDate:string;
  replyDate:string|null;
  status:string;
  title:string;
}