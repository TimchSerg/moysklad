import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAllOrders } from 'features/orders/slice'

export const useOrders = () => {
  const orders = useSelector(selectAllOrders)

  return useMemo(() => ({ orders }), [orders])
}