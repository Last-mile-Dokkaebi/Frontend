import { NextPage } from 'next';
import { AdminLayout } from 'components/layout';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { qnaListApi } from 'pages/api/qna';
import { Button, Title } from 'components/common';
import { useInput } from 'hooks';
import Router from 'next/router';
const list: NextPage = () => {
  const { identity } = useSelector((state: RootState) => state.user);
  const [qnaList, setQnaList] = useState<Array<qna>>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(-1);
  const [comment, commentHandler] = useInput<string>('');

  const ReplyOpen = (qid: number) => {
    if (qid === selectedQuestion) {
      setSelectedQuestion(-1);
    } else {
      setSelectedQuestion(qid);
    }
  };
  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const data = await qnaListApi(identity, true);
    setQnaList(data);
    console.log(data);
  };

  return (
    <AdminLayout>
      <Title title={`QnA 질문 및 답변`} subtitle={`질문을 선택하여 상세 내용을 확인하시고 답변하시면 됩니다.`} />
      <QnaTableWrapper>
        <QnaTable>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="40%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>처리 현황</th>
              <th>작성자 ID</th>
              <th>답변자 ID</th>
              <th>제목</th>
              <th>등록일자</th>
              <th>답변일자</th>
            </tr>
          </thead>
          <tbody>
            <tr
              onClick={() => {
                ReplyOpen(1);
              }}
            >
              <td>1</td>
              <td className="wait">등록됨</td>
              <td>test1</td>
              <td></td>
              <td>문의사항 제목</td>
              <td>2022-06-02 01:12:00</td>
              <td></td>
            </tr>
            {selectedQuestion === 1 && (
              <tr className="reply">
                <td colSpan={7}>
                    <div><strong>질의내용</strong></div>
                  <div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos omnis maxime est unde mollitia, dicta
                    tempora, illo voluptas aperiam, possimus iure. Iusto possimus neque nisi ex? Quaerat esse
                    accusantium impedit.
                  </div>
                  <div>
                      <CustomTextarea onChange={commentHandler} placeholder="답변 입력"/>
                        <Button bgcolor='white'>완료</Button>
                  </div>
                </td>
              </tr>
            )}
            <tr
              onClick={() => {
                ReplyOpen(2);
              }}
            >
              <td>2</td>
              <td className="done">답변 완료</td>
              <td>test1</td>
              <td>admin1</td>
              <td>문의사항 제목</td>
              <td>2022-06-02 01:12:00</td>
              <td>2022-06-02 01:12:00</td>
            </tr>
            {selectedQuestion === 2 && (
              <tr className="reply">
                <td colSpan={7}>
                    <div><strong>질의내용</strong></div>
                  <div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos omnis maxime est unde mollitia, dicta
                    tempora, illo voluptas aperiam, possimus iure. Iusto possimus neque nisi ex? Quaerat esse
                    accusantium impedit.
                  </div>
                  <div><strong>답변내용</strong></div>
                  <div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos omnis maxime est unde mollitia, dicta
                    tempora, illo voluptas aperiam, possimus iure. Iusto possimus neque nisi ex? Quaerat esse
                    accusantium impedit.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </QnaTable>
      </QnaTableWrapper>
    </AdminLayout>
  );
};

const QnaTableWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  margin-top: 1rem;
  padding: 1rem;
`;
const QnaTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: rgb(59, 59, 59);
  font-size: 14px;
  td {
    padding: 1rem;
  }
  thead {
    th {
      border-bottom: solid 2px #d6d6d6;
      text-align: left;
      padding: 0.5rem 1rem 0.5rem 1rem;
    }
  }
  tbody {
    tr {
      border-bottom: solid 1px #eee;
    }
    tr:hover:not(.reply) {
      background-color: #77b8c020;
      border-radius: 4px;
      transition: 0.2s;
    }
  }
  .reply{
      background-color:#eee;
  }
  .done {
    color: #558287;
    font-weight: bold;
  }
  .wait {
    color: grey;
    font-weight: bold;
  }
`;

const CustomTextarea = styled.textarea` 
    width:100%;
    min-height:10rem;
    border: solid 1px #d6d6d6;
    margin: 0.5rem 0 0.5rem 0;
    padding:1rem;
    border-radius:12px;
    resize:none;
`
export default list;
