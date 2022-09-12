import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import wrapper, { RootState, useAppDispatch } from 'store/configureStore';
import { doneQnaRequest, myQnaRequest, replyQnaRequest } from 'actions/help';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { DateToString } from 'utils/processing';
import { openModalAction } from 'actions/system';
import { Button, CustomInput, Modal } from 'components/common';
import { useInput } from 'hooks';
import router from 'next/router';

const list: NextPage = () => {
  const maxLength = 240;

  const dispatch = useAppDispatch();
  const { qnaHistory, replyQnaLoading, replyQnaDone, doneQnaLoading, doneQnaDone } = useSelector(
    (state: RootState) => state.help,
  );
  const [currentQna, setCurrentQna] = useState<Qna | null>(null);

  const replyInput = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [reply, onChangeReply, setReply] = useInput<string>('', (e) => {
    const value = e.target.value;
    if (value.length > maxLength) {
      alert(`본문은 ${maxLength}자를 넘길 수 없습니다`);
      return value.substring(0, maxLength);
    } else {
      return value;
    }
  });

  const onClickDetail = async (index: number) => {
    setReply('');
    setCurrentQna(qnaHistory[index]);
    await dispatch(openModalAction());
    replyInput.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onClickReply = async () => {
    const qnaId = currentQna?.qnaId;

    if (qnaId === undefined) {
      alert('잘못 된 접근입니다');
      return;
    }
    if (confirm(`"${reply}"\n로 추가 문의를 등록합니다`)) {
      await dispatch(replyQnaRequest({ qnaId, comment: reply }));
    }
  };

  const onClickDone = async () => {
    const qnaId = currentQna?.qnaId;

    if (qnaId === undefined) {
      alert('잘못 된 접근입니다');
      return;
    }
    if (confirm(`해당문의를 완료처리합니다`)) {
      await dispatch(doneQnaRequest({ qnaId }));
    }
  };

  useEffect(() => {
    if (replyQnaDone) {
      alert('문의 등록에 성공하였습니다');
      router.reload();
    }
  }, [replyQnaDone]);

  useEffect(() => {
    if (doneQnaDone) {
      alert('성공적으로 문의사항 완료처리를 하였습니다');
      router.reload();
    }
  }, [doneQnaDone]);

  return (
    <>
      <QnaLayout>
        {qnaHistory.length === 0 && <Empty>조회 된 QnA가 없습니다</Empty>}
        {qnaHistory.length !== 0 && (
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
        )}
      </QnaLayout>

      {currentQna !== null && (
        <Modal
          delay={0.5}
          title={currentQna.title}
          subtitle={DateToString(new Date(currentQna.contents[0].date))}
          backgroundClose={false}
        >
          <History>
            {currentQna.contents.map((content: Content, index: number) => {
              return (
                <div
                  className={content.writer}
                  key={index}
                  ref={index + 1 === currentQna.contents.length ? replyInput : null}
                >
                  <div className="content">
                    <div className="writer">{content.writer === 'USER' ? currentQna.writer : '관리자'}</div>
                    <div>{content.comment}</div>
                    <div className="date">{DateToString(new Date(content.date))}</div>
                  </div>
                </div>
              );
            })}
          </History>
          {currentQna.status !== 'COMPLETE' && (
            <>
              <Reply>
                <div className="left">
                  <CustomInput placeholder="문의 답변" onChange={onChangeReply} value={reply} />
                </div>
                <div className="right">
                  <Button
                    isPrimary={reply.length > 0}
                    disabled={reply.length === 0}
                    onClick={onClickReply}
                    loading={replyQnaLoading}
                  >
                    추가문의
                  </Button>
                </div>
              </Reply>

              <Button isPrimary={true} loading={doneQnaLoading} onClick={onClickDone}>
                문의완료
              </Button>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

const Empty = styled.div`
  margin-top: 1rem;
  background-color: rgb(255, 255, 255, 0.5);
  text-align: center;
  font-size: 1.5rem;
`;

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

  & > div {
    margin-bottom: 0.25rem;
  }

  .ADMIN {
    display: flex;
    justify-content: start;

    .content {
      max-width: 80%;
      background-color: rgb(119, 184, 192, 0.2);
      padding: 0.5rem;
      border: 2px solid rgba(119, 184, 192, 0.7);
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: start;

      .writer {
        font-size: 0.75rem;
        color: gray;
        border-bottom: 1px solid gray;
      }
    }
  }
  .USER {
    display: flex;
    justify-content: end;

    .content {
      max-width: 80%;
      background-color: rgb(250, 250, 250);
      padding: 0.5rem;
      border: 2px solid rgba(119, 184, 192, 0.7);
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: end;

      .writer {
        font-size: 0.75rem;
        color: gray;
        border-bottom: 1px solid gray;
      }
    }
  }
  .date {
    font-size: 0.25rem;
  }
`;

const Reply = styled.div`
  display: flex;
  align-items: center;

  .left {
    width: 80%;
  }
  .right {
    width: 20%;
  }
`;

// const Empty = styled.div`
//   margin-top: 1rem;
//   background-color: rgb(255, 255, 255, 0.5);
//   text-align: center;
//   font-size: 1.5rem;
// `;

// const QnaTableWrapper = styled.div`
//   background-color: white;
//   border-radius: 4px;
//   margin-top: 1rem;
//   padding: 1rem;
// `;
// const QnaTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   color: rgb(59, 59, 59);
//   font-size: 14px;
//   td {
//     padding: 1rem;
//   }
//   thead {
//     th {
//       border-bottom: solid 1px #d6d6d6;
//       text-align: left;
//       padding: 0.5rem 1rem 0.5rem 1rem;
//     }
//   }
//   tbody {
//     tr:hover {
//       cursor: pointer;
//       background-color: #77b8c020;
//       border-radius: 4px;
//       transition: 0.2s;
//     }
//   }
//   .COMPLETE {
//     color: #558287;
//     font-weight: bold;
//   }
//   .REGISTERED {
//     color: grey;
//     font-weight: bold;
//   }
//   .RESPONDED {
//     color: orange;
//     font-weight: bold;
//   }
// `;

// const History = styled.div`
//   width: 80vw;

//   .ADMIN {
//     display: flex;
//     justify-content: start;

//     .content {
//       background-color: rgb(119, 184, 192, 0.2);
//       padding: 0.5rem;
//       border: 2px solid rgba(119, 184, 192, 0.7);
//       border-radius: 0.5rem;
//       display: flex;
//       flex-direction: column;
//       align-items: start;
//     }
//   }
//   .USER {
//     display: flex;
//     justify-content: end;

//     .content {
//       background-color: rgb(250, 250, 250);
//       padding: 0.5rem;
//       border: 2px solid rgba(119, 184, 192, 0.7);
//       border-radius: 0.5rem;
//       display: flex;
//       flex-direction: column;
//       align-items: end;
//     }
//   }
//   .date {
//     font-size: 0.25rem;
//   }
// `;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(myQnaRequest());

  return {
    props: {},
  };
});

export default list;
