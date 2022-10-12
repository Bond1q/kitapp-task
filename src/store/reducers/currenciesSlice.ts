import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrenciesSymbols, getCurrencyRate } from '../actionCreators/currenciesAction'
import {
   CurrenciesState,
   CurrencySymbolFromServer,
   CurrencySymbol,
   CurrenciesRates,
   GetCurrencyRateAction,
} from '../../utils/types/currencyTypes'

const initialState: CurrenciesState = {
   currenciesSymbols: [],
   activeCurrency: 'usd',
   currenciesRates: [],
   isLoading: false,
}

const currenciesSlice = createSlice({
   name: 'currencies',
   initialState,
   reducers: {},
   extraReducers: {
      [getCurrenciesSymbols.fulfilled.type]: (
         state,
         action: PayloadAction<CurrencySymbolFromServer>,
      ) => {
         const symbolsArr: CurrencySymbol[] = []
         for (let key in action.payload) {
            symbolsArr.push({ symbols: key, fullName: action.payload[key] })
         }
         state.currenciesSymbols = symbolsArr
         state.isLoading = false
      },
      [getCurrenciesSymbols.pending.type]: (state) => {
         state.isLoading = true
      },

      [getCurrencyRate.fulfilled.type]: (state, action: PayloadAction<GetCurrencyRateAction>) => {
         const { rates, currency: activeCurrency } = action.payload
         const ratesArr: CurrenciesRates[] = []
         for (let key in rates[activeCurrency]) {
            ratesArr.push({ currency: key, rate: rates[activeCurrency][key] })
         }
         state.currenciesRates = ratesArr
         state.isLoading = false
         state.activeCurrency = activeCurrency
      },
      [getCurrencyRate.pending.type]: (state) => {
         state.isLoading = true
      },
   },
})

export default currenciesSlice.reducer
