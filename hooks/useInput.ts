import React, { useState, useCallback } from 'react';
/*
  제네릭(Generic)사용해서 다양한 타입 지원하게 변경
  https://velog.io/@edie_ko/TypeScript-Generic-%EC%A0%9C%EB%84%A4%EB%A6%AD-feat.-TypeScript-%EB%91%90-%EB%8B%AC%EC%B0%A8-%ED%9B%84%EA%B8%B0
*/

/**
 * onChange가 불릴때마다 state를 업데이트 합니다.
 * @param initialState 초기state를 설정
 * @param callback callback이 주어질 경우 해당 절차에 따라 값을 처리합니다, <T>타입에 맞추어 값을 return해야됩니다
 * @returns [value, handler]
 */
const useInput = <T>(initialState: T, callback?: (e: any)=>T): [T, (e: any)=>void, (e: T) => void] => {
  const [value, setValue] = useState<T>(initialState)
  
  //callback이 주어질 경우 callback에 맞추어 처리
  //주어지지 않을 경우 e.target.value로 간주
  const handler = useCallback((e: any) => {
    const targetValue = callback ? callback(e) :  e.target.value as unknown as T
    setValue(targetValue)
  }, [])

  return [value, handler, setValue]
}

export default useInput;
