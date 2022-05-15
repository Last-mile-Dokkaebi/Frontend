import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BACKEND_DEVELOP2
    : process.env.NEXT_PUBLIC_BACKEND_DEVELOP2;
// axios.defaults.withCredentials = true;

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
    const res = await axios.post('/member/login', body);
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
  phoneNumber: string;
}
const joinApi = async ({ name, identity, password, phoneNumber }: joinTypes) => {
  let res = {
    isSuccess: false,
    data: null,
  };
  const body = {
    name,
    identity,
    password,
    phoneNumber,
  };
  try {
    await axios.post(`/member/new`, body);
    res.isSuccess = true;
  } catch (err) {
    res.isSuccess = false;
  }
  return res;
};

export { loginApi, joinApi };
