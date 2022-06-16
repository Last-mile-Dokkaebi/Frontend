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
  console.log(res)
  return res.data
};

/* 회원가입을 위한 함수*/

const joinApi = async ({ name, identity, password, phone,birth,gender,email,city,street,auth }: userInfo) => {
  const body = {
    name,
    identity,
    password,
    phone,
    birth,
    gender,
    email,
    city,
    street,
    auth
  };
  console.log(body)
  await axios.post("/member/new", body);
};

/* 마이페이지 조회를 위한 함수 */
const getUserInfoApi = async (identity:string): Promise<userInfo> => {
  const res = await axios.get(`/mypage/${identity}`);
  return res.data.member

};
export { loginApi, joinApi,getUserInfoApi };