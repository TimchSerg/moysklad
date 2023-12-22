import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectUser, selectManagers } from '../features/auth/slice'

export const useUser = () => {
  const user = useSelector(selectUser)

  return useMemo(() => ({ user }), [user])
}

export const useManagers = () => {
  const managers = useSelector(selectManagers)

  return useMemo(() => ({ managers }), [managers])
}