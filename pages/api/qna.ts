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
  await axios.post('/help/qna/registry', body);
};

/* QNA 목록 조회를 위한 함수 */
const qnaListApi = async (identity: string, admin?: boolean): Promise<Array<qna>> => {
  if (admin) {
    const res = await axios.get(`/help/qna/`);
    return res.data;
  } else {
    let config = {
      params: {
        identity,
      },
    };
    const res = await axios.get('/help/qna', config);
    return res.data;
  }
};
export { qnaRegistrationApi, qnaListApi };
