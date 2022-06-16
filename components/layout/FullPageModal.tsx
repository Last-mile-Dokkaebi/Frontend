import styled from 'styled-components';
import { Modal } from 'components/common';
import { setModal } from 'stores/system';
import { MemberLayout } from 'components/layout';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from 'stores';
import { useEffect } from 'react';
import Router from 'next/router';
const FullPageModal = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.user);
  const onClickConfirm = ()=>{
    // admin 으면 /admin 으로, user면 / 로.
    Router.push(auth==="ADMIN" ? "/admin" : "/")
  }
  useEffect(() => {
    dispatch(setModal(true));
  }, []);
  return (
    <>
      <Modal
        iconUrl={'/assets/img/information-icon.png'}
        title={'접근 불가'}
        subtitle={'접근 권한 없음 안내'}
        confirmAction={onClickConfirm}
      >
        <div>해당하신 권한으로는 해당 페이지에 접근하실 수 없습니다. 확인 버튼을 누르시면 메인페이지로 돌아갑니다.</div>
      </Modal>
    </>
  );
};

export default FullPageModal;
