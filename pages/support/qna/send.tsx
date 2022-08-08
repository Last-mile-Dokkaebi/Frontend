import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import { CustomInput, Button } from 'components/common';
import { useInput } from 'hooks';
import { RootState, useAppDispatch } from 'store/configureStore';
import { postQnaRequest } from 'actions/help';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';

const send: NextPage = () => {
  const dispatch = useAppDispatch();
  const { postQnaDone, postQnaLoading } = useSelector((state: RootState) => state.help);

  const [title, onChangeTitle] = useInput<string>('', (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 30;

    if (e.target.value.length > maxLength) {
      alert(`제목은 ${maxLength}자를 넘길 수 없습니다`);
      return e.target.value.substring(0, maxLength);
    } else {
      return e.target.value;
    }
  });
  const [comment, onChangeComment] = useInput<string>('', (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 240;
    if (e.target.value.length > maxLength) {
      alert(`본문은 ${maxLength}자를 넘길 수 없습니다`);
      return e.target.value.substring(0, maxLength);
    } else {
      return e.target.value;
    }
  });

  const onClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(postQnaRequest({ title, comment }));
  };

  useEffect(() => {
    if (postQnaDone) {
      alert('문의를 성공적으로 등록하였습니다');
      router.push('/support/qna/list');
    }
  }, [postQnaDone]);

  return (
    <>
      <QnaLayout>
        <FormWrapper>
          <CustomInput type="text" placeholder="제목" onChange={onChangeTitle} />
          <CustomTextarea placeholder="본문" onChange={onChangeComment} />
          <Button onClick={onClickSubmit} loading={postQnaLoading}>
            보내기
          </Button>
        </FormWrapper>
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
