import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import { CustomInput,Button } from 'components/common';
const send: NextPage = () => {
  return (
    <>
      <QnaLayout>
        <FormWrapper>
          <CustomInput type="text" placeholder="제목" />
          <CustomTextarea placeholder="본문" />
          <input type="file"></input>
        </FormWrapper>
        <Button>보내기</Button>
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
`

export default send;
