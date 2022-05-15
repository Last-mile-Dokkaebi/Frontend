import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BACKEND_DEVELOP2
    : process.env.NEXT_PUBLIC_BACKEND_DEVELOP2;
// axios.defaults.withCredentials = true;

interface LoginResponseObjectType {
  isSuccess?:boolean
}
/* 로그인을 위한 함수*/
const loginApi = async ( identity:string, password:string ) => {
  const body = {
    identity: identity,
    password: password,
  };
  
/*
  const res: { isSuccess: boolean, accessToken: string,refreshToken:string,auth:string,data:string } = {
    name: 'a',
    age: 20
  };*/

  let loginObj:LoginResponseObjectType ={
    isSuccess:true,
  }
  try {
    const res = await axios.post("/member/login", body);
  } catch (err) {
    loginObj.isSuccess=false;
  }

  return loginObj;
};


export {
  loginApi,
};