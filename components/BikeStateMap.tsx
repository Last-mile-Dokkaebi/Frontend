import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import styled from 'styled-components';

const BikeStateMap = () => {
  const { lat, lng, soc, endDate } = useSelector((state: RootState) => state.bike);

  return (
    <MapWrapper>
      <Map center={{ lat, lng }} style={{ width: '100%', height: 'calc(100% - 2rem)' }} level={5}>
        <MapMarker
          position={{ lat, lng }}
          image={{
            src: '/assets/img/marker2.png',
            size: { width: 35, height: 40 },
          }}
        />
      </Map>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
`;

export default BikeStateMap;
