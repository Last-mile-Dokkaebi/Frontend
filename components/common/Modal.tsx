import { useDispatch, useSelector } from 'react-redux';
import { setModal } from 'stores/system';
import { RootState } from 'stores';
import styled, { keyframes } from 'styled-components';
import React, { useCallback, useRef, useEffect, useState } from 'react';

interface DialogTypes {
  delay?: number; //열고 닫는 delay를 몇초 줄 것인지 ex) 0.5
  children?: React.ReactNode;
}

const Modal = ({ delay = 0.5, children }: DialogTypes) => {
  const { modalIsOpen } = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState<any>(PopUp); //Type을 몰라서 일단 any로 해두었음

  const closeModal = useCallback(() => {
    //Delay를 주고 닫는다
    setTimeout(() => {
      dispatch(setModal(false));
    }, delay * 900);
    //닫는 Animation으로 변경
    setAnimation(PopDown);
  }, []);

  useEffect(() => {
    if (animation === PopDown) {
      setAnimation(PopUp);
    }
  }, [modalIsOpen]);

  return (
    <>
      {modalIsOpen && (
        <Background onClick={closeModal} animation={animation} open={modalIsOpen} delay={delay}>
          {/* Modal component클릭시 background 컴포넌트 클릭 방지 */}
          <ModalWrapper onClick={(e) => e.stopPropagation()}>{children}</ModalWrapper>
        </Background>
      )}
    </>
  );
};
// };

interface BackgroundTypes {
  animation: any;
  open: boolean;
  delay: number;
}

const Background = styled.div<BackgroundTypes>`
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')}
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${(props) => props.animation} ${(props) => props.delay}s ease-in-out 0s 1 normal;
`;

const ModalWrapper = styled.div`
  z-index: 10000;
  position: fixed;
`;

const PopUp = keyframes`
  from{
    opacity: 0%;
    transform: scale(0, 0);
  }
  to{
    opacity: 100%;
    transform: scale(100%, 100%);
  }
`;

const PopDown = keyframes`
  from{
    opacity: 100%;
    transform: scale(100%, 100%);
  }
  to{
    opacity: 0%;
    transform: scale(0, 0);
  }
`;

export default Modal;
