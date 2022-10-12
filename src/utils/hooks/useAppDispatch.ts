import { useDispatch } from 'react-redux'
import type { StoreDispatch } from '../../store/store'

export const useAppDispatch: () => StoreDispatch = useDispatch
