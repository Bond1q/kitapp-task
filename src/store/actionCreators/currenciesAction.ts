import { createAsyncThunk } from '@reduxjs/toolkit'
import { requestCurrenciesSymbols, requestCurrencyRate } from '../../utils/api/api'

export const getCurrenciesSymbols = createAsyncThunk(
   'currencies/getCurrenciesSymbols',
   async () => {
      try {
         const res = await requestCurrenciesSymbols()
         return res
      } catch (error) {
         console.log('Error in currencies slice', error)
      }
   },
)

export const getCurrencyRate = createAsyncThunk(
   'currencies/getCurrencyRate',
   async (currency: string) => {
      try {
         const res = await requestCurrencyRate(currency)

         return { rates: res, currency }
      } catch (error) {
         console.log('Error in currencies slice', error)
      }
   },
)
