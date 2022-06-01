import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { qnaListApi } from 'pages/api/qna';
import Router from 'next/router';
const list: NextPage = () => {
  const { identity } = useSelector((state: RootState) => state.user);
  const [qnaList, setQnaList] = useState<Array<qna>>([]);
  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const data = await qnaListApi(identity);
    setQnaList(data);
    console.log(data);
  };

  const onClickQnaDetail = (qna: qna) => {
    Router.push(
      {
        pathname: '/support/qna/detail',
        query: { ...qna },
      },
      `/support/qna/detail`,
    );
  };

  return (
    <>
      <QnaLayout>
        <QnaTableWrapper>
          {qnaList.length === 0 ? (
            <div className="no-data">문의 내역이 없습니다</div>
          ) : (
            <QnaTable>
              <colgroup>
                <col width="25%" />
                <col width="45%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th>처리 현황</th>
                  <th>제목</th>
                  <th>등록일자</th>
                </tr>
              </thead>
              <tbody>
                {qnaList.map((qna: qna, index: number) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        onClickQnaDetail(qna);
                      }}
                    >
                      <td className="wait">등록됨</td>
                      <td>{qna.title}</td>
                      <td>{qna.regiDate.substring(2, 10)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </QnaTable>
          )}
        </QnaTableWrapper>
      </QnaLayout>
    </>
  );
};

const QnaTableWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  margin-top: 1rem;
  padding: 1rem;
  .no-data{
    padding:3rem;
    text-align:center;
  }
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
      background-color: #77b8c020;
      border-radius: 4px;
      transition: 0.2s;
    }
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
export default list;
