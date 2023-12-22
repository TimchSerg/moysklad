import { selectAllWindows } from 'features/windows/slice'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const restaurants = () => {
  
}

export const useWindows = () =>{
  const windows = useSelector(selectAllWindows)
  return useMemo(() => ({ ...windows }), [windows])
}