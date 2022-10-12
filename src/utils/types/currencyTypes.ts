export type CurrencySymbolFromServer = {
   [key: string]: string
}

export interface CurrencySymbol {
   symbols: string
   fullName: string
}

export type CurrencyRateFromServer = {
   [key: string]: number
}
export interface CurrenciesRates {
   currency: string
   rate: number
}

export type ListOfCurrenciesRatesFromServer = {
   [key: string]: CurrencyRateFromServer
}

export interface GetCurrencyRateAction {
   rates: ListOfCurrenciesRatesFromServer
   currency: string
}

export interface CurrenciesState {
   currenciesSymbols: CurrencySymbol[]
   activeCurrency: string
   currenciesRates: CurrenciesRates[]
   isLoading: boolean
}
