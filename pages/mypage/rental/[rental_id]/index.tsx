import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';
// 장기 렌탈 이용 기간 별 탑승 내역 목록 조회
const RideHistoryList: NextPage = () => {
  const router = useRouter();
  const { rental_id } = router.query;
  return (
    <>
      <AppLayout>
        <HistoryTitleBox>
          <div className="title">대여 별 상세 탑승 기록</div>
          <div className="subtitle">
            대여 기간 동안의 상세 탑승 내역을 확인하세요! <br />
            내역을 클릭하면 상세 탑승 내역 (경로, 거리, 시간 등)을 확인 하실 수 있습니다!
          </div>
        </HistoryTitleBox>
        <TotalWrapper>
          <div className="content">
            <div>총 탑승 횟수</div>
            <div>
              <strong>3</strong>회
            </div>
          </div>
          <div className="content">
            <div>총 누적 거리</div>
            <div>
              <strong>10.3</strong>km
            </div>
          </div>
        </TotalWrapper>
        <Box>
          <div className="title">대여 결제 상세 내역</div>
          <div className="content">
            <RentalUseInformation>
              <div className="info-row">
                <div className="info-title">대여 ID</div>
                <div>{rental_id}</div>
              </div>
              <div className="info-row">
                <div className="info-title">대여 기간</div>
                <div>2022.04.25 ~ 2022.05.25</div>
              </div>
              <div className="info-row">
                <div className="info-title">대여 총 일수</div>
                <div>30일</div>
              </div>
              <div className="info-row">
                <div className="info-title">이용 금액</div>
                <div>55,000</div>
              </div>
              <div className="info-row">
                <div className="info-title">할인</div>
                <div className="bold discount">-3,000</div>
              </div>
              <hr />
              <div className="info-row">
                <div className="info-title">최종 결제 금액</div>
                <div className="bold total-price">52,000</div>
              </div>
            </RentalUseInformation>
          </div>
        </Box>
        <Box>
          <div className="title">
            상세 내역 <span>(3건)</span>
          </div>
          <div className="content">
            <Link href={`/mypage/rental/${rental_id}/1`}>
              <RentalHistoryLink>
                <div className="history_contents">
                  <div className="rental_period">2022.04.30 12:00:00 ~ 2022.04.30 12:05:30</div>
                  <div className="rental_days">00:05:00</div>
                  <div className="rental_days">2.5km</div>
                </div>
                <div className="go_detail">
                  <MdKeyboardArrowRight />
                </div>
              </RentalHistoryLink>
            </Link>
            <Link href={`/mypage/rental/${rental_id}/2`}>
              <RentalHistoryLink>
                <div className="history_contents">
                  <div className="rental_period">2022.05.05 17:30:00 ~ 2022.05.05 17:40:55</div>
                  <div className="rental_days">00:10:55</div>
                  <div className="rental_days">4.2km</div>
                </div>
                <div className="go_detail">
                  <MdKeyboardArrowRight />
                </div>
              </RentalHistoryLink>
            </Link>
            <Link href={`/mypage/rental/${rental_id}/3`}>
              <RentalHistoryLink>
                <div className="history_contents">
                  <div className="rental_period">2022.05.10 13:44:10 ~ 2022.05.10 14:02:40</div>
                  <div className="rental_days">00:08:30</div>
                  <div className="rental_days">3.6km</div>
                </div>
                <div className="go_detail">
                  <MdKeyboardArrowRight />
                </div>
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
const TotalWrapper = styled.div`
  background-color: #77b8c0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content:space-between;
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
const Box = styled.div`
  background-color: white;
  border-radius: 4px;
  margin-bottom: 1rem;
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
      font-size: 16px;
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
const RentalUseInformation = styled.div`
  font-size: 14px;
  color: rgb(59, 59, 59);
  .info-row{
    margin:0.5rem 0 0.5rem 0;
    display:flex;
    .info-title {
    font-weight:bold;
    min-width:6rem;
    margin-right:1rem;
    }
    .bold{
      font-weight:bold
    }
    .discount{
      color:#558287;
    }
    .total-price{
      color: #ff003e; /* 빨간색이긴 한데 ... */
    }
  }
  
`;
export default RideHistoryList;
