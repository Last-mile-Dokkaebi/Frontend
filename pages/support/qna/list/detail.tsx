import { QnaLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

const QnaDetail = () => {
  const [qna, setQna] = useState<Qna | null>(null);

  useEffect(() => {
    const { qnaId } = router.query;
    if (typeof qnaId === 'string') {
      setQna(
        qnaHistory.filter((qna: Qna) => {
          qna.qnaId !== parseInt(qnaId);
        }),
      );
    }
  }, []);

  return <QnaLayout>{qna && <div>{qna.qnaId}</div>}</QnaLayout>;
};

export default QnaDetail;
