// Custom Axios에서 instance만든거 가져와서 사용
import axios from 'utils/customAxios';

interface LoginResponseObjectType {
  isSuccess?: boolean;
}
/* 로그인을 위한 함수*/
const loginApi = async (identity: string, password: string) => {
  const body = { identity, password };
  const res = await axios.post("/member/login", body)
  return res

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
    const rawResult = await axios.post(`/member/new`, body);
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
