import { useState, useRef } from 'react'
import type { Dispatch, SetStateAction, MutableRefObject } from 'react'
import { isFunction } from '@/utils'

function useRefState<S>(
  initialState: S | (() => S)
): [S, MutableRefObject<S>, Dispatch<SetStateAction<S>>]
function useRefState<S = undefined>(): [
  S | undefined,
  MutableRefObject<S | undefined>,
  Dispatch<SetStateAction<S | undefined>>
]
function useRefState<S>(initialStateAction?: S | (() => S)) {
  const initialState = isFunction(initialStateAction)
    ? initialStateAction()
    : initialStateAction
  const [state, setState] = useState(initialState)
  const ref = useRef(initialState)

  const nextSetState = (action: SetStateAction<S>) => {
    const nextState = isFunction(action) ? action(state) : action
    setState(nextState)
    ref.current = nextState
  }

  return [state, ref, nextSetState]
}

export default useRefState
