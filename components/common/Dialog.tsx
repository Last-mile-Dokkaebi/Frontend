import { useDispatch, useSelector } from 'react-redux';
import { setDialog } from 'stores/system';
import { RootState } from 'stores';
import styled, { keyframes } from 'styled-components';
import React, { useCallback, useRef, useEffect, useState } from 'react';

interface DialogTypes {
  delay?: number; //열고 닫는 delay를 몇초 줄 것인지 ex) 0.5
  children?: React.ReactNode;
}

const Dialog = ({ delay = 0.5, children }: DialogTypes) => {
  const { dialogIsOpen } = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState<any>(PopUp); //Type을 몰라서 일단 any로 해두었음

  let timerId: any;

  const closeDialog = useCallback(() => {
    //닫는 Animation으로 변경하고
    setAnimation(PopDown);
    //Delay를 주고 닫는다
    timerId = setTimeout(() => {
      dispatch(setDialog(false));
    }, delay * 1000);
  }, []);

  useEffect(() => {
    //페이지를 나갈때도 Dialog를 닫아준다.
    return () => {
      clearTimeout(timerId);
      dispatch(setDialog(false));
    };
  }, []);

  //Dialog가 닫혀있으면
  if (dialogIsOpen === false) {
    return null;
  } else {
    //Dialog가 열려있으면
    return (
      <Background onClick={closeDialog} animation={animation} delay={delay}>
        <DialogWrapper>{children}</DialogWrapper>
      </Background>
    );
  }
};

interface BackgroundTypes {
  animation: any;
  delay: number;
}

const Background = styled.div<BackgroundTypes>`
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

const DialogWrapper = styled.div`
  z-index: 10000;
  position: fixed;
`;

const PopUp = keyframes`
  from{
    opacity: 0%;
    transfrom: scale(0, 0);
  }
  to{
    opacity: 100%;
    transform: scale(100%, 100%);
  }
`;

const PopDown = keyframes`
  from{
    opacity: 100%;
    transfrom: scale(100%, 100%);
  }
  to{
    opacity: 0%;
    transform: scale(0, 0);
  }
`;

export default Dialog;
