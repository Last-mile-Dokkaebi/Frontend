import React, { useState, useCallback } from 'react';
/*
  제네릭(Generic)사용해서 다양한 타입 지원하게 변경
  https://velog.io/@edie_ko/TypeScript-Generic-%EC%A0%9C%EB%84%A4%EB%A6%AD-feat.-TypeScript-%EB%91%90-%EB%8B%AC%EC%B0%A8-%ED%9B%84%EA%B8%B0
*/
const useInput = <T>(initialState: T, keys?: Array<string>): [T, (e: any)=>void] => {
  const [value, setValue] = useState<T>(initialState)
  
  let handler;

  //keys가 주어져있으면, 해당 key를 순차적으로 들어간 후 value를 변경해줌
  if (keys !== undefined){
    handler = useCallback((e: any) => {
      let targetValue = e
      keys.forEach((key: string) => {
        targetValue = targetValue[key]
      })
      //Generic Type으로 type casting
      targetValue = targetValue as unknown as T
      setValue(targetValue)
    }, [])
  }
  else{ 
    //keys가 주어져있지 않으면 changeEvent라고 가정
    //changeEvent가 아닐 경우 keys를 입력해서 직접 key들을 지정
    handler = useCallback((e: any) => {
      //Generic Type으로 type casting
      const targetValue = e.target.value as unknown as T
      setValue(targetValue)
    }, [])
  }

  return [value, handler]
}

export default useInput;
