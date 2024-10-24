import { useState } from 'react'

function useOptimistic<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState)
  const [optimisticState, setOptimisticState] = useState<T>(initialState)

  const updateOptimistic = (updateFn: (currentState: T) => T) => {
    setOptimisticState(updateFn)
  }

  const resetOptimistic = () => {
    setOptimisticState(state)
  }

  const commitOptimistic = () => {
    setState(optimisticState)
  }

  return {
    state,
    optimisticState,
    updateOptimistic,
    resetOptimistic,
    commitOptimistic,
    setState,
  }
}

export default useOptimistic
