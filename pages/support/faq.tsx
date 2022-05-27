import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import Link from 'next/link';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import {Title} from 'components/common';

const faq: NextPage = () => {

  return (
    <>
      <AppLayout>
        <Title title={'자주 하는 질문'} subtitle={'자주 하는 질문들을 확인하시고 문제점을 해결해보세요!'} />
        <QuestionListWrapper>
          <Question >
            <summary className="question">
              <div className="question-title">이용 금액은 어떻게 되나요?</div>
              <MdOutlineKeyboardArrowDown color={"grey"}/>
            </summary>
            <div className="answer">예.. 아직 모릅니다 무료~</div>
          </Question>
          <Question >
            <summary className="question">
              <div className="question-title">킥보드가 고장났어요</div>
              <MdOutlineKeyboardArrowDown color={"grey"}/>
            </summary>
            <div className="answer">신속하게 연락을 주세요</div>
          </Question>
          <Question >
            <summary className="question">
              <div className="question-title">FAQ가 무슨 뜻이에요?</div>
              <MdOutlineKeyboardArrowDown color={"grey"}/>
            </summary>
            <div className="answer">그건 바로 .. 자주하는 질문!</div>
          </Question>
        </QuestionListWrapper>
      </AppLayout>
    </>
  );
};

const QuestionListWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  margin-top: 1rem;
`;
const Question = styled.details`
  border-bottom: solid 1px #eee;
  padding:1rem;
  cursor:pointer;
  &:nth-last-child(1) {
    border: none;
  }

  .question {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::-webkit-details-marker{
        display: none;
    }
    margin-bottom:0.5rem;
  }
  &[open]{
        .question-title{
            font-weight:bold;
            color:#558287;
        }
    }
  .answer{
      font-size:14px;
      padding:1rem;
      background-color:#77b8c020;

  }
`;
export default faq;
