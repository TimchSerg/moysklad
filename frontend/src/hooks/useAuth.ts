import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/slice'

export const useAuth = () => {
  const isAuth = useSelector(selectAuth)

  return useMemo(() => ({ isAuth }), [isAuth])
}