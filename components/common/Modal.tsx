import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { RootState } from 'store/configureStore';
interface ModalTypes {
  /**
   * 열고 닫는 delay를 s단위로 입력
   * @default 0.15
   */
  delay?: number;
  iconUrl?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Modal = ({ delay = 0.15, iconUrl, title, subtitle, children }: ModalTypes) => {
  //Modal을 끌 것인지 켤 것인지 설정
  const { modalIsOpen } = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState<ReturnType<typeof keyframes>>(PopDown);

  //열때는 다시 PopUp애니메이션으로 변경
  useEffect(() => {
    if (animation === PopDown) {
      setAnimation(PopUp);
    }
  }, [modalIsOpen]);
  const closeModal = useCallback(() => {
    //Delay를 주고 닫는다
    // setTimeout(() => {
    //   dispatch(setModal(false));
    // }, delay * 100);
    //닫는 Animation으로 변경
    setAnimation(PopDown);
  }, []);

  return (
    <>
      {modalIsOpen && (
        <>
          <Background onClick={closeModal}>
            {/* Modal component클릭시 background 컴포넌트 클릭 방지 */}
            <ModalWrapper animation={animation} delay={delay} onClick={(e) => e.stopPropagation()}>
              <div className="close-button-wrapper" onClick={closeModal}>
                <MdClose size={30} />
              </div>
              {iconUrl && (
                <div className="icon-wrapper">
                  <img src={iconUrl} />
                </div>
              )}
              <div className="modal-title-wrapper">
                <div className="modal-title">{title}</div>
                <div className="modal-subtitle">{subtitle}</div>
              </div>
              <div className="modal-body-wrapper">{children}</div>
              <div className="modal-action-wrapper">
                <button className="modal-action-btn">확인</button>
              </div>
            </ModalWrapper>
          </Background>
        </>
      )}
    </>
  );
};
// };

// interface BackgroundTypes {
//   open: boolean;
// }

const Background = styled.div`
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3); /* 밝기 조절*/
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

interface ModalWrapperTypes {
  animation: ReturnType<typeof keyframes>;
  delay: number;
}

const ModalWrapper = styled.div<ModalWrapperTypes>`
  z-index: 200;
  background-color: white;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 1rem;
  animation: ${(props) => props.animation} ${(props) => props.delay}s ease-in-out 0s 1 normal;
  width: 250px; /* 모달창 기본 사이즈 */
  font-size: 14px;
  color: rgb(59, 59, 59);
  .close-button-wrapper {
    display: flex;
    justify-content: right;
    color: #d6d6d6;
  }
  .icon-wrapper {
    display: flex;
    justify-content: center;
    margin: 1rem 0 1rem 0;
    img {
      width: 50px;
    }
  }
  .modal-title-wrapper {
    padding: 1rem;
    .modal-title {
      color: #1a3336;
      font-weight: bold;
      padding: 0.5rem 0 0.5rem 0;
      font-size: 16px;
    }
    .modal-subtitle {
    }
  }
  .modal-body-wrapper {
    padding: 1rem;
  }
  .modal-action-wrapper {
    display: flex;
    justify-content: center;
    padding: 1rem;
    .modal-action-btn {
      border-radius: 4px;
      background-color: #77b8c0;
      color: white;
      font-weight: bold;
      border: none;
      width: 100%;
      height: 2rem;
    }
  }
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
