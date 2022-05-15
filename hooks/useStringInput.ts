/* 일단 string만 받을 수 있도록... */
/* 보아하니 ?: ... 로 쓴다면... */
import { useState,useCallback,ChangeEvent } from 'react';

// ts는 타입추론이 가능하여 초기세팅을 string으로 해두면 string타입으로 인식

type StringInputProps = [string, (e: ChangeEvent<HTMLInputElement>) => void];

const useStringInput = (initialString= ""):StringInputProps => {
  const [value, setValue] = useState<string>(initialString);


const handler= useCallback((e: React.ChangeEvent<HTMLInputElement>):void=>{
  setValue(e.target.value);
},[])

  
  return [value, handler];
};

export default useStringInput;
