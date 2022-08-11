import { Button, CustomInput } from 'components/common';
import { AdminLayout } from 'components/layout';
import { useInput } from 'hooks';
import { NextPage } from 'next';

const enroll: NextPage = () => {
  const [bikeNumber, onChangeBikeNumber] = useInput<string>('', (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 4;
    return e.target.value.substring(0, maxLength);
  });

  const onClickEnroll = () => {
    if (confirm(`${bikeNumber}를 등록합니다`)) {
      alert(`바이크 번호 : ${bikeNumber}`);
    }
  };

  return (
    <AdminLayout>
      <h2>스쿠터 등록</h2>
      <CustomInput value={bikeNumber} onChange={onChangeBikeNumber} placeholder="0001" label="스쿠터 번호" />
      <Button onClick={onClickEnroll}>스쿠터 등록</Button>
    </AdminLayout>
  );
};

export default enroll;
