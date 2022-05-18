import React, {useEffect} from 'react'

const useInterval = (callback: () => void, ms: number, deps?: React.DependencyList,) => {
  useEffect(() => {
    callback();
    let intervalId = setInterval(callback, ms)

    return () => {clearInterval(intervalId)}
  }, deps ?? [])
}

export default useInterval