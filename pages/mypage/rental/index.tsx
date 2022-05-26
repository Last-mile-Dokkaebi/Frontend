import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import Link from 'next/link';
import styled from 'styled-components';
import {MdKeyboardArrowRight} from "react-icons/md"
// 장기 렌탈 이용 내역 목록 조회 ( 장기 렌탈 회차별 목록 제공 )
const RentalHistoryList: NextPage = () => {
  return (
    <>
      <AppLayout>
        <HistoryTitleBox>
          <div className="title">장기 대여 이용 기록</div>
          <div className="subtitle">
            장기 대여 이용 내역을 확인해보세요! <br />
            내역을 클릭하면 해당 대여 기간 동안의 상세 탑승 내역을 확인할 수 있습니다!
          </div>
        </HistoryTitleBox>
        <TotalWrapper>
          <div className="content">
            <div>총 대여 횟수</div>
            <div>
              <strong>2</strong>회
            </div>
          </div>
          <div className="content">
            <div>총 누적 거리</div>
            <div>
              <strong>30</strong>km
            </div>
          </div>
        </TotalWrapper>
        <Box>
          <div className="title">
            상세 내역 <span>(2건)</span>
          </div>
          <div className="content">
            <Link href="/mypage/rental/1" >
              <RentalHistoryLink>
                <div className="history_contents">
                  <div className="rental_period">2022.04.25 ~ 2022.05.25</div>
                  <div className="rental_days">30일</div>
                </div>
                <div className="go_detail"><MdKeyboardArrowRight/></div>
              </RentalHistoryLink>
            </Link>
            <Link href="/mypage/rental/2" >
              <RentalHistoryLink>
                <div className="history_contents">
                  <div className="rental_period">2022.05.25 ~ 2022.06.01</div>
                  <div className="rental_days">7일</div>
                </div>
                <div className="go_detail"><MdKeyboardArrowRight/></div>
              </RentalHistoryLink>
            </Link>
          </div>
        </Box>
      </AppLayout>
    </>
  );
};

const HistoryTitleBox = styled.div`
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 4px;
    color: #1a3336;
  }
  .subtitle {
    font-size: 13px;
    color: grey;
  }
  margin: 0 0 1rem 0;
  padding: 0.5rem;
`;
const Box = styled.div`
  background-color: white;
  border-radius: 4px;
  .title {
    border-bottom: solid 1px #eee;
    padding: 1rem;
    font-weight: bold;
    color: rgb(59, 59, 59);
    font-size: 14px;
    span {
      color: #1a3336;
    }
  }
  .content {
    padding: 1rem;
  }
`;
const TotalWrapper = styled.div`
  display: flex;
  justify-content:space-between;
  background-color: #77b8c0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  .content {
    width:100%;
    margin: 4px;
    background-color: white;
    color: rgb(59, 59, 59);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    div:nth-child(1) {
      font-size: 12px;
      margin-bottom: 4px;
    }
    strong {
      color: #558287;
      font-size: 20px;
      margin-right: 4px;
    }
  }
`;
const RentalHistoryLink = styled.a`
  background-color: white;
  display: flex;
  padding: 1rem 0.5rem 1rem 0.5rem;
  justify-content: space-between;
  .history_contents {
    .rental_period {
      font-size: 12px;
      color: grey;
      margin-bottom: 4px;
    }
    .rental_days {
      font-weight: bold;
      font-size: 20px;
      color: #77b8c0;
    }
  }
  .go_detail {
    color: #558287;
  }
  border-bottom: solid 1px #eee;
  &:nth-last-child(1) {
    border: none;
  }
`;
export default RentalHistoryList;
