import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import debounce from 'lodash.debounce'

export type TDebouncedState = <StateType>(
  initialValue: StateType,
  delay?: number,
) => [StateType, Dispatch<SetStateAction<StateType>>]

export const useDebouncedState: TDebouncedState = function <StateType>(
  initialValue: StateType,
  delay = 300,
) {
  const [value, setValue] = useState(initialValue)

  const debouncedSetValue = useCallback(
    debounce((nextValue: SetStateAction<StateType>) => setValue(nextValue), delay),
    [delay],
  )

  return [value, debouncedSetValue]
}
