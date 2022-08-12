import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import wrapper, { RootState } from 'store/configureStore';
import { myQnaRequest } from 'actions/help';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { DateToString } from 'utils/processing';
import { openModalAction } from 'actions/system';
import { Modal } from 'components/common';

const list: NextPage = () => {
  const dispatch = useDispatch();
  const { qnaHistory } = useSelector((state: RootState) => state.help);
  const [currentQna, setCurrentQna] = useState<Qna | null>(null);

  const onClickDetail = (index: number) => {
    setCurrentQna(qnaHistory[index]);
    dispatch(openModalAction());
  };

  return (
    <>
      <QnaLayout>
        <QnaTableWrapper>
          <QnaTable>
            <thead>
              <tr>
                <th>처리 현황</th>
                <th>제목</th>
                <th>등록일자</th>
              </tr>
            </thead>
            <tbody>
              {qnaHistory.map((qna: Qna, index: number) => {
                return (
                  <tr
                    key={qna.qnaId}
                    onClick={() => {
                      onClickDetail(index);
                    }}
                  >
                    <td className={qna.status}>{qna.status}</td>
                    <td>{qna.title}</td>
                    <td>{DateToString(new Date(qna.contents[0].date))}</td>
                  </tr>
                );
              })}
            </tbody>
          </QnaTable>
        </QnaTableWrapper>
      </QnaLayout>

      {currentQna !== null && (
        <Modal delay={0.5} title={currentQna.title} subtitle={DateToString(new Date(currentQna.contents[0].date))}>
          <History>
            {currentQna.contents.map((content: Content, index: number) => {
              return (
                <div className={content.writer} key={index}>
                  <div className="content">
                    <div>{content.comment}</div>
                    <div className="date">{DateToString(new Date(content.date))}</div>
                  </div>
                </div>
              );
            })}
          </History>
        </Modal>
      )}
    </>
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
      border-bottom: solid 1px #d6d6d6;
      text-align: left;
      padding: 0.5rem 1rem 0.5rem 1rem;
    }
  }
  tbody {
    tr:hover {
      cursor: pointer;
      background-color: #77b8c020;
      border-radius: 4px;
      transition: 0.2s;
    }
  }
  .COMPLETE {
    color: #558287;
    font-weight: bold;
  }
  .REGISTERED {
    color: grey;
    font-weight: bold;
  }
  .RESPONDED {
    color: orange;
    font-weight: bold;
  }
`;

const History = styled.div`
  width: 80vw;

  .ADMIN {
    display: flex;
    justify-content: start;

    .content {
      background-color: rgb(119, 184, 192, 0.2);
      padding: 0.5rem;
      border: 2px solid rgba(119, 184, 192, 0.7);
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: start;
    }
  }
  .USER {
    display: flex;
    justify-content: end;

    .content {
      background-color: rgb(250, 250, 250);
      padding: 0.5rem;
      border: 2px solid rgba(119, 184, 192, 0.7);
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: end;
    }
  }
  .date {
    font-size: 0.25rem;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(myQnaRequest());

  return {
    props: {},
  };
});

export default list;
