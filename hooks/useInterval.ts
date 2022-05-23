import React, {useEffect} from 'react'

/**
 * 시간간격에 맞추어 callback함수를 실행합니다
 * @param callback 수행할 함수를 지정합니다.
 * @param ms 시간간격을 ms단위로 입력합니다
 * @param deps useEffect의 dependency를 입력
 */
const useInterval = (callback: () => void, ms: number, deps?: React.DependencyList,) => {
  useEffect(() => {
    callback();
    let intervalId = setInterval(callback, ms)
    return () => {clearInterval(intervalId)}
  }, deps ?? [])
}

export default useInterval