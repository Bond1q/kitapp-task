import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { StoreState } from '../../store/store'

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
