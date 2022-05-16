import axios from 'axios';

// axios.defaults.baseURL =
//   process.env.NODE_ENV === 'development'
//     ? process.env.NEXT_PUBLIC_BACKEND_DEVELOP2
//     : process.env.NEXT_PUBLIC_BACKEND_DEVELOP2;
// // axios.defaults.withCredentials = true;

const tempBaseUrl :string = "http://115.85.181.24:8083"
interface LoginResponseObjectType {
  isSuccess?: boolean;
}
/* 로그인을 위한 함수*/
const loginApi = async (identity: string, password: string) => {
  const body = { identity, password };

  /*
  const res: { isSuccess: boolean, accessToken: string,refreshToken:string,auth:string,data:string } = {
    name: 'a',
    age: 20
  };*/

  let loginObj: LoginResponseObjectType = {
    isSuccess: true,
  };
  try {
    const res = await axios.post(`${tempBaseUrl}/member/login`, body);
    console.log(res)
  } catch (err) {
    loginObj.isSuccess = false;
  }

  return loginObj;
};

/* 회원가입을 위한 함수*/
interface joinTypes {
  name: string;
  identity: string;
  password: string;
  phoneNumberArray: string[];
}
const joinApi = async ({ name, identity, password, phoneNumberArray }: joinTypes) => {
  let res:{isSuccess:boolean,memberId:number|null} = {
    isSuccess: false,
    memberId: null,
  };
  const body = {
    name,
    identity,
    password,
    phoneNumber:phoneNumberArray,
  };
  try {
    const rawResult = await axios.post(`${tempBaseUrl}/member/new`, body);
    res.isSuccess = true;
    res.memberId = rawResult.data
    console.log(rawResult)
  } catch (err) {
    console.log(err)
    res.isSuccess = false;
  }
  return res;
};

export { loginApi, joinApi };
