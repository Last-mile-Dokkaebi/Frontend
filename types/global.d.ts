/*
  자주 쓰일 것 같은 type들은 여기서 관리
  tsconfig.json에서 d.ts파일 includes하여서 사용 됨
  참조 : https://stackoverflow.com/questions/69403269/global-type-declarations-within-a-nx-and-nextjs-monorepo
*/

interface ScooterState{
  lat: number;  //Scooter의 latitude
  lng: number;  //Scooter의 Longitude
  soc: number;  //Scooter의 SOC
}