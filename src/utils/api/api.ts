import axios from 'axios'

import { CurrencySymbolFromServer, ListOfCurrenciesRatesFromServer } from '../types/currencyTypes'

export const requestCurrenciesSymbols = async () => {
   try {
      const list = await axios.get<CurrencySymbolFromServer>(
         'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json',
      )
      return list.data
   } catch (error) {
      console.log(error)
   }
}

export const requestCurrencyRate = async (currency: string) => {
   try {
      const list = await axios.get<ListOfCurrenciesRatesFromServer>(
         `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`,
      )
      return list.data
   } catch (error) {
      console.log(error)
   }
}
