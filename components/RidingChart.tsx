import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';

interface RidingChartTypes {
  data: Array<any>;
}

const RidingChart = ({ data }: RidingChartTypes) => {
  {
    data.length === 0 && <Empty>표시할 데이터가 없습니다</Empty>;
  }
  {
    data.length !== 0 && <ResponsiveLine data={data} />;
  }
};

const Empty = styled.div`
  font-size: 2rem;
`;

export default RidingChart;
