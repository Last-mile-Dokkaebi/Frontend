import { NextPage } from 'next';
import { QnaLayout } from 'components/layout';
import styled from 'styled-components';

const list: NextPage = () => {
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
              <tr>
                <td className="wait">대기중</td>
                <td>웨 않되요?</td>
                <td>22.05.27</td>
              </tr>
              <tr>
                <td className="done">답변완료</td>
                <td>질문..할게없네</td>
                <td>22.04.24</td>
              </tr>
            </tbody>
          </QnaTable>
        </QnaTableWrapper>
      </QnaLayout>
    </>
  );
};

const QnaTableWrapper = styled.div`
  background-color:white;
  border-radius:4px;
  margin-top:1rem;
  padding: 1rem;
`;
const QnaTable = styled.table`
    width:100%;
    border-collapse:collapse;
    color:rgb(59,59,59);
    font-size:14px;
    td{
        padding: 1rem;
    }
    thead{
        th{
            border-bottom:solid 1px #d6d6d6;
            text-align:left;
            padding: 0.5rem 1rem 0.5rem 1rem;
        }
        
    }
    tbody{
        tr:hover{
            background-color:#77b8c020;
            border-radius:4px;
            transition:0.2s;
        }
    }
    .done{
        color:#558287;
        font-weight:bold;
    }
    .wait{
        color:grey;
        font-weight:bold;
    }
`;
export default list;
