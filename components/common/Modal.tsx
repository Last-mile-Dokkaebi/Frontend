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
  //Modal을 끌 것인지 켤 것인지 설정
  const { modalIsOpen } = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState<any>(PopUp); // keyframe의 Type을 몰라서 일단 any로 해두었음

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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${(props) => props.animation} ${(props) => props.delay}s ease-in-out 0s 1 normal;
`;

const ModalWrapper = styled.div`
  z-index: 10000;
  position: fixed;
  background-color: white;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.14), 0px 0px 12px 6px rgba(0, 0, 0, 0.1);
`;

//Modal이 켜질때 Animation
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

//Modal이 꺼질때 Animation
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
