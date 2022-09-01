/*
  자주 쓰일 것 같은 type들은 여기서 관리
  tsconfig.json에서 d.ts파일 includes되기때문에 global로 써지는 듯
  참조 : https://stackoverflow.com/questions/69403269/global-type-declarations-within-a-nx-and-nextjs-monorepo
*/

interface ScooterState {
  lat: number; //Scooter의 latitude
  lng: number; //Scooter의 Longitude
  soc: number; //Scooter의 SOC
}

interface Qna {
  qnaId: number;
  title: string;
  status: 'REGISTERED' | 'RESPONDED' | 'COMPLETE';
  contents: Array<Content>;
  writer: string;
}

interface Content {
  comment: string;
  date: string;
  writer: 'ADMIN' | 'USER';
}

interface RequestRental {
  rentalId: number;
  identity: string;
  address: string;
  date: string;
  startDate: string;
  endDate: string;
  bikeNm: string;
}
