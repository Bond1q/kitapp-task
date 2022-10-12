import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import currencies from './reducers/currenciesSlice'

const reducers = combineReducers({
   currencies,
})

export const store = configureStore({
   reducer: reducers,
})

export type StoreState = ReturnType<typeof reducers>
export type StoreDispatch = typeof store.dispatch
