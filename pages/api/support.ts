import axios from 'utils/customAxios'

interface createQnaTypes{
  title: string;
  content: string;
  media: any;
}

/*
  문의사항 등록
*/ 
const createQnaApi = async({title, content, media}:createQnaTypes) => {
  await axios.post("/help/qna", {title, content, media})
}

/*
  내 문의사항 보기
*/
interface getMyQnaInputTypes{
  identity: string;
}
const getMyQnaApi = async({identity}:getMyQnaInputTypes) => {
  const res = await axios.get(`/help/qna/${identity}`);

  return res.data;
}

export{
  createQnaApi,
  getMyQnaApi
}