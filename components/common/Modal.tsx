import { useDispatch, useSelector } from 'react-redux';
import { setModal } from 'stores/system';
import { RootState } from 'stores';
import styled, { keyframes } from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';

interface ModalTypes {
  /**
   * 열고 닫는 delay를 s단위로 입력
   * @default 0.5
   */
  delay?: number;

  children?: React.ReactNode;
}

const Modal = ({ delay = 0.5, children }: ModalTypes) => {
  //Modal을 끌 것인지 켤 것인지 설정
  const { modalIsOpen } = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState<ReturnType<typeof keyframes>>(PopUp);

  //열때는 다시 PopUp애니메이션으로 변경
  useEffect(() => {
    if (animation === PopDown) {
      setAnimation(PopUp);
    }
  }, [modalIsOpen]);

  const closeModal = useCallback(() => {
    //Delay를 주고 닫는다
    setTimeout(() => {
      dispatch(setModal(false));
    }, delay * 900);
    //닫는 Animation으로 변경
    setAnimation(PopDown);
  }, []);

  return (
    <>
      {modalIsOpen && (
        <Background onClick={closeModal} open={modalIsOpen}>
          {/* Modal component클릭시 background 컴포넌트 클릭 방지 */}
          <ModalWrapper animation={animation} delay={delay} onClick={(e) => e.stopPropagation()}>
            {children}
          </ModalWrapper>
        </Background>
      )}
    </>
  );
};
// };

interface BackgroundTypes {
  open: boolean;
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
`;

interface ModalWrapperTypes {
  animation: ReturnType<typeof keyframes>;
  delay: number;
}

const ModalWrapper = styled.div<ModalWrapperTypes>`
  z-index: 10000;
  position: fixed;
  background-color: white;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.14), 0px 0px 12px 6px rgba(0, 0, 0, 0.1);
  animation: ${(props) => props.animation} ${(props) => props.delay}s ease-in-out 0s 1 normal;
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
