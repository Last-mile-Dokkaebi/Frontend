import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
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
    const data = await qnaListApi(identity,true);
    setQnaList(data);
    console.log(data);
  };


  return (
    <>
      <AppLayout>
        
      </AppLayout>
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
