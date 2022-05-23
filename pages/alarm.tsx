import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import styled from "styled-components"
import {FaBell} from "react-icons/fa"
const alarm: NextPage = () => {

  return (
    <>
     
      <AppLayout>
        <AlarmCard>
            <div className="icon"><FaBell size={24}/></div>
            <div className="contents">
                <div className="content-title">킥보드 배터리 주의</div>
                <div className="content-body">킥보드 배터리가 10% 이하로 떨어졌습니다. 배터리를 충전하여 상태를 유지 해주세요.</div>
            </div>
        </AlarmCard>
        <AlarmCard>
            <div className="icon"><FaBell size={24}/></div>
            <div className="contents">
                <div className="content-title">킥보드 배터리 주의</div>
                <div className="content-body">킥보드 배터리가 10% 이하로 떨어졌습니다. 배터리를 충전하여 상태를 유지 해주세요.</div>
            </div>
        </AlarmCard>
        <AlarmCard>
            <div className="icon"><FaBell size={24}/></div>
            <div className="contents">
                <div className="content-title">킥보드 배터리 주의</div>
                <div className="content-body">킥보드 배터리가 10% 이하로 떨어졌습니다. 배터리를 충전하여 상태를 유지 해주세요.</div>
            </div>
        </AlarmCard>
      </AppLayout>
    </>
  );
};

const AlarmCard = styled.div` 
    box-shadow : rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px;
    border-radius:4px;
    border:solid 1px #eee;
    background-color:white;
    color:rgb(59,59,59);
    display:flex;
    padding:0.5rem 1rem 0.5rem 0.5rem;
    margin:0.5rem;
    .icon{
        display:flex;
        align-items:center;
        justify-content:center;
        padding:1rem 1rem 1rem 0.5rem;
    }
    .content-title{
        font-weight:bold;
    }
    .content-body{
        font-size:14px;
    }


`
export default alarm;
