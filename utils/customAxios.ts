import axios, {  AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BACKEND
    : process.env.NEXT_PUBLIC_BACKEND,
  timeout: 10000,
  headers:{
    'Content-Type' : 'application/json'
  }
})

//요청 전에 발생
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //요청 성공 직전 호출
    return config;
  },
  (error: AxiosError) => {
    //요청 에러 직전 호출
    return Promise.reject(error)
  }
)

// //요청 후 Request에 따라 발생
// instance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     //status가 200인 경우 호출
//     return response;
//   },
//   async (error: AxiosError) => {
//     //status가 200이 아닌 경우 호출 됨
//     const {config, response} = error;
//     if(response !== undefined){
//       if(response.status === 400){
//         // 서버에서 유효성 체크를 해서 실패한 경우
//         // ex) 로그인시 비밀번호가 맞지 않다거나...
//         throw response?.data || "무언가 잘못 된거같습니다."
//       }
//       if(response.status === 401){
//         /*
//           Access Token 만료로 인한 401에러
//           Access Token 재발송 요청 및 Request의 Header부분 수정되어야 됨
//           이부분은 아직 access token사용을 안하므로  구현 pass
//         */

//         // const originalRequest: AxiosRequestConfig = config;
//         // const refreshToken = localStorage.getItem(REFRESH_TOKEN);

//         // const { data } = await axios.post('/refresh/token', { refreshToken });
//         // const { newAccessToken, newRefreshToken } = data;
//         // localStorage.setItem(ACCESS_TOKEN, newAccessToken);
//         // localStorage.setItem(REFRESH_TOKEN, newRefreshToken);

//         // if (originalRequest.headers === undefined) {
//         //   originalRequest.headers = {};
//         // }
//         // //이전 요청의 accessToken을 새로운 accessToken으로 변경
//         // instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//         // originalRequest.headers.Authorization = 'bearer ' + newAccessToken;

//         // // 401로 실패한 요청을 새로운 accessToken으로 재요청
//         // return instance(originalRequest);
//       }
//     }

//     return Promise.reject(error);
//   }
// )

export default instance;