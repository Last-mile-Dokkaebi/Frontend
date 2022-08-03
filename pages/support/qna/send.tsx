import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import { CustomInput, Button } from 'components/common';
import { useInput } from 'hooks';
import { useAppDispatch } from 'store/configureStore';

const send: NextPage = () => {
  const dispatch = useAppDispatch();

  const [title, onChangeTitle] = useInput<string>('');
  const [content, onChangeContent] = useInput<string>('');

  const onClickSubmit = (e: any) => {
    e.preventDefault();
    dispatch();
  };

  return (
    <>
      <QnaLayout>
        <FormWrapper>
          <CustomInput type="text" placeholder="제목" onChange={onChangeTitle} />
          <CustomTextarea placeholder="본문" onChange={onChangeContent} />
          {/* <input type="file"></input> */}
        </FormWrapper>
        <Button onClick={onClickSubmit}>보내기</Button>
      </QnaLayout>
    </>
  );
};

const FormWrapper = styled.div`
  display: flex;
  background-color: white;
  border-radius: 4px;
  margin-top: 1rem;
  flex-direction: column;
  padding: 1rem;
`;
const CustomTextarea = styled.textarea`
  min-height: 10rem;
  border: solid 1px #d6d6d6;
  margin: 0.5rem 0 0.5rem 0;
  padding: 1rem;
  border-radius: 12px;
  resize: none;
`;

export default send;
