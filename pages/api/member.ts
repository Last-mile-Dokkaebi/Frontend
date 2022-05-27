// Custom Axios에서 instance만든거 가져와서 사용
import axios from 'utils/customAxios';

interface loginReturnTypes{
  accessToken: string;
  auth: string;
  refreshToken: string;
}

/* 로그인을 위한 함수*/
const loginApi = async (identity: string, password: string): Promise<loginReturnTypes> => {
  const body = { identity, password };
  const res = await axios.post("/member/login", body)
  return res.data
};

/* 회원가입을 위한 함수*/
interface joinTypes {
  name: string;
  identity: string;
  password: string;
  phoneNumberArray: string[];
}
const joinApi = async ({ name, identity, password, phoneNumberArray }: joinTypes) => {
  const body = {
    name,
    identity,
    password,
    phoneNumber:phoneNumberArray,
  };
  await axios.post("/member/new", body);
};

export { loginApi, joinApi };