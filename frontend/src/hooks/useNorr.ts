import { selectNorr } from 'features/norr/slice'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useNorr = () =>{
  const norr = useSelector(selectNorr)
  return useMemo(() => ({ ...norr }), [norr])
}