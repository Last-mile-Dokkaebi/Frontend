import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import { CustomInput,Button } from 'components/common';
import { useInput } from 'hooks';
import { RootState } from 'stores';
import { useSelector } from 'react-redux';
import { qnaRegistrationApi } from 'pages/api/qna';
const send: NextPage = () => {
  const { identity } = useSelector((state: RootState) => state.user);
  const [title, titleHandler] = useInput<string>('');
  const [content, contentHandler] = useInput<string>('');

  const onClickSend = async ()=>{
    if (title === '' || content === '') {
      alert('제목 및 내용을 모두 입력해주세요.');
    } 
    else if(content.length > 255){
      alert('본문의 내용은 255자를 넘을 수 없습니다.');
    }
    else {
      try {
        await qnaRegistrationApi({title,content,identity});
        alert("등록 완료!")
        
      } catch (error: any) { // 타입을 모르겠습니다.. 
        alert(error.response.data.description); // 벡엔드에서 주는 에러 메세지를 바로 출력
      }
    }
  }

  return (
    <>
      <QnaLayout>
        <FormWrapper>
          <CustomInput type="text" placeholder="제목" onChange={titleHandler} />
          <CustomTextarea placeholder="본문" onChange={contentHandler}/>
          <CharacterCount>({content.length}/255)</CharacterCount>
        </FormWrapper>
        <Button onClick={onClickSend}>보내기</Button>
      </QnaLayout>
    </>
  );
};

const FormWrapper = styled.div`
  display: flex;
  background-color:white;
  border-radius:4px;
  margin-top:1rem;
  flex-direction: column;
  padding: 1rem;
`;
const CustomTextarea = styled.textarea` 
    min-height:10rem;
    border: solid 1px #d6d6d6;
    margin: 0.5rem 0 0.5rem 0;
    padding:1rem;
    border-radius:12px;
    resize:none;
`
const CharacterCount = styled.div` 
  text-align:right;
  font-size:12px;
`
export default send;
