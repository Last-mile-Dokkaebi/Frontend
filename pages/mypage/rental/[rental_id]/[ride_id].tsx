import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
// 탑승 내역 상세 조회
const RideDetail: NextPage = () => {
  const router = useRouter();
  const { ride_id } = router.query;
  return (
    <>
      <AppLayout>
        <HistoryTitleBox>
          <div className="title">상세 주행 내역</div>
          <div className="subtitle">
            상세 주행 내역 입니다. 주행 정보 및 이동 경로를 확인하실 수 있습니다
          </div>
        </HistoryTitleBox>
        <RideInformationBox>
          <div className="info-row">
            <div className="info-title">주행 ID</div>
            <div>{ride_id}</div>
          </div>
          <div className="info-row">
            <div className="info-title">이용 거리</div>
            <div>2.6km</div>
          </div>
          <div className="info-row">
            <div className="info-title">이용 시간</div>
            <div>00:05:23</div>
          </div>
          <div className="info-row">
            <div className="info-title">평균 속도</div>

            <div>20km</div>
          </div>
        </RideInformationBox>
        <MapWrapper>
          <Map zoomable={false} center={pathDummyData[0]} style={{ width: '100%', height: '100%' }} level={4}>
            <MapMarker
              position={pathDummyData[0]}
              image={{
                src: '/assets/img/marker2.png',
                size: { width: 35, height: 40 },
              }}
            ></MapMarker>
            <Polyline
              path={pathDummyData}
              strokeWeight={3}
              strokeColor={'#db4040'}
              strokeOpacity={1}
              strokeStyle={'solid'}
            />
          </Map>
        </MapWrapper>
      </AppLayout>
    </>
  );
};

const pathDummyData: Array<{ lat: number; lng: number }> = [
  { lat: 36.1380118168383, lng: 128.3971064771416 },
  { lat: 36.13804234559214, lng: 128.3971931156942 },
  { lat: 36.13806644119365, lng: 128.39725186692135 },
  { lat: 36.13817223734296, lng: 128.39725929773016 },
  { lat: 36.13829679754699, lng: 128.39720318252768 },
  { lat: 36.13839172066914, lng: 128.3971770923829 },
  { lat: 36.13847345358921, lng: 128.3971229948324 },
  { lat: 36.1385572120789, lng: 128.3970883745254 },
  { lat: 36.13863209069576, lng: 128.39704248729234 },
  { lat: 36.138704554966495, lng: 128.39701044393294 },
  { lat: 36.138777148801616, lng: 128.39696729339025 },
  { lat: 36.1388519949827, lng: 128.39692418270369 },
  { lat: 36.13891786409766, lng: 128.39687813541894 },
  { lat: 36.13898817313703, lng: 128.39683772149996 },
  { lat: 36.1390848950831, lng: 128.3968505457385 },
  { lat: 36.13910876408891, lng: 128.396928735208 },
  { lat: 36.13911728763819, lng: 128.3969705468501 },
  { lat: 36.13919012536812, lng: 128.39709959735086 },
  { lat: 36.13931217397436, lng: 128.3970656556867 },
  { lat: 36.13940291628963, lng: 128.39701171716786 },
  { lat: 36.13945520648857, lng: 128.3969709836453 },
  { lat: 36.139500804378514, lng: 128.39692457664978 },
  { lat: 36.13960052368403, lng: 128.39687357438936 },
  { lat: 36.139666846241944, lng: 128.3967886512613 },
  { lat: 36.1397353239394, lng: 128.39671209836607 },
  { lat: 36.13987150195037, lng: 128.396625635872 },
  { lat: 36.13993518336727, lng: 128.39657399419482 },
  { lat: 36.140030397811195, lng: 128.3965229113742 },
  { lat: 36.140121658007345, lng: 128.3964245424846 },
  { lat: 36.14022160377336, lng: 128.3963541013758 },
  { lat: 36.14028969266421, lng: 128.39631086959886 },
  { lat: 36.140351121591934, lng: 128.39625918748263 },
  { lat: 36.14043549499703, lng: 128.39617180551258 },
  { lat: 36.14051500750326, lng: 128.39611488881383 },
];

const MapWrapper = styled.div`
  width: 100%;
  height: 50%;

  @media (max-height: 680px) {
    height: 45%;
  }
`;

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
const RideInformationBox = styled.div`
  font-size: 14px;
  color: rgb(59, 59, 59);
  border-radius: 4px;
  padding:1rem;
  margin-bottom: 1rem;
  background-color:white;
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
export default RideDetail;
