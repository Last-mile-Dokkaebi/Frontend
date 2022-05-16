import axios from 'utils/customAxios';

interface LoginResponseObjectType {
  isSuccess?: boolean;
}
/* 로그인을 위한 함수*/
const loginApi = async (identity: string, password: string) => {
  const body = { identity, password };
  let loginObj: LoginResponseObjectType = {
    isSuccess: true,
  };
  try {
    const res = await axios.post("/member/login", body);
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
  let res = {
    isSuccess: false,
    data: null,
  };
  const body = {
    name,
    identity,
    password,
    phoneNumber:phoneNumberArray,
  };
  try {
    await axios.post("/member/new", body);
    res.isSuccess = true;
  } catch (err) {
    console.log(err)
    res.isSuccess = false;
  }
  return res;
};

export { loginApi, joinApi };
