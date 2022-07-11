import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';

const CurrentBikeMap = () => {
  const { lat, lng } = useSelector((state: RootState) => state.bike);

  return (
    <Map center={{ lat, lng }} style={{ width: '100%', height: '100%' }} level={5}>
      <MapMarker
        position={{ lat, lng }} // 마커를 표시할 위치
        image={{
          src: '/assets/img/marker2.png',
          size: { width: 35, height: 40 },
        }}
      />
    </Map>
  );
};

export default CurrentBikeMap;
