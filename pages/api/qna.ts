import axios from 'utils/customAxios';

interface qnaPropsType {
  identity: string;
  title: string;
  content: string;
}
/* QNA 등록 */
const qnaRegistrationApi = async ({ identity, title, content }: qnaPropsType) => {
  const body = {
    questionerId: identity,
    title,
    content,
  };
  await axios.post('/help/qna/', body);
};

/* QNA 목록 조회를 위한 함수 */
const qnaListApi = async (identity: string, admin?: boolean): Promise<Array<qna>> => {
  if (admin) {
    const res = await axios.put(`/help/qna/${identity}`);
    return res.data;
  } else {
    const res = await axios.get(`/help/qna/${identity}`);
    return res.data;
  }
};
export { qnaRegistrationApi, qnaListApi };
