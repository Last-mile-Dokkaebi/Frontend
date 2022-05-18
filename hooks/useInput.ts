import React, { useState, useCallback } from 'react';
/*
  제네릭(Generic)사용해서 다양한 타입 지원하게 변경
  https://velog.io/@edie_ko/TypeScript-Generic-%EC%A0%9C%EB%84%A4%EB%A6%AD-feat.-TypeScript-%EB%91%90-%EB%8B%AC%EC%B0%A8-%ED%9B%84%EA%B8%B0
*/
const useInput = <T>(initialState: T, func?: (e: any)=>T): [T, (e: any)=>void] => {
  const [value, setValue] = useState<T>(initialState)
  
  let handler;

  //값에 대한 처리절차인 func가 주어질 경우 해당 절차에 따라 처리
  if(func !== undefined){
    handler = useCallback((e: any) => {
      const targetValue = func(e)
      setValue(targetValue)
    })
  }
  else{ 
    //func가 주어져있지 않으면 단순 changeEvent라고 가정
    //changeEvent가 func를 주어줘서 적절하게 처리 하도록
    handler = useCallback((e: any) => {
      //Generic Type으로 type casting
      const targetValue = e.target.value as unknown as T
      setValue(targetValue)
    }, [])
  }

  return [value, handler]
}

export default useInput;
