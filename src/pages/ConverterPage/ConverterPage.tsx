import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { getCurrenciesSymbols, getCurrencyRate } from '../../store/actionCreators/currenciesAction'
import Converter from '../../components/Converter/Converter'
import ConvertedCurrency from '../../components/ConvertedCurrency/ConvertedCurrency'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from './../../utils/hooks/useAppSelector'

const ConverterPage = () => {
	const [searchParams] = useSearchParams()

	const [isBlockVisible, setIsBlockVisible] = useState(searchParams.get('amount') ? true : false)
	const navigate = useNavigate()

	const setConvertedCurrency = (amount: number, from: string, to: string) => {
		navigate(`/converter?from=${from.toLowerCase()}&to=${to.toLowerCase()}&amount=${amount}`)
		setIsBlockVisible(true)
		dispatch(getCurrencyRate(from.toLowerCase()))
	}
	const { currenciesRates, isLoading, currenciesSymbols } = useAppSelector(
		(state) => state.currencies,
	)

	const areCurrencySymbolsCorrect = (symbols: string) => {
		return currenciesSymbols.some((el) => el.symbols === symbols.toLowerCase())
	}

	const getConvertedCurrency = (currency: string, amount: number) => {
		const index = currenciesRates.findIndex((el) => el.currency === currency)
		return currenciesRates[index]?.rate * amount || 1
	}
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(getCurrenciesSymbols())
	}, [dispatch])
	return (
		<div>
			<Converter
				amount={searchParams.get('amount') || ''}
				currencyFrom={searchParams.get('from') || ''}
				currencyTo={searchParams.get('to') || ''}
				setConvertedCurrency={setConvertedCurrency}
				areCurrencySymbolsCorrect={areCurrencySymbolsCorrect}
			/>
			{isBlockVisible && !isLoading && (
				<ConvertedCurrency
					currencyFrom={searchParams.get('from')!}
					currencyFromAmount={+searchParams.get('amount')!}
					currencyToAmount={getConvertedCurrency(
						searchParams.get('to')!,
						+searchParams.get('amount')!,
					)}
					currencyTo={searchParams.get('to')!}
				/>
			)}
		</div>
	)
}

export default ConverterPage
