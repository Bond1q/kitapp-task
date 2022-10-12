import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getCurrenciesSymbols, getCurrencyRate } from '../../store/actionCreators/currenciesAction'
import CurrencyListItem from '../../components/CurrencyListItem/CurrencyListItem'
import FindCurrency from '../../components/FindCurrency/FindCurrency'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from './../../utils/hooks/useAppSelector'

const CurrenciesListPage = () => {
	const { currenciesRates, isLoading, currenciesSymbols, activeCurrency } = useAppSelector(
		(state) => state.currencies,
	)
	const [amount, setAmount] = useState(1)
	const { cur } = useParams()
	const navigate = useNavigate()
	const setConvertedCurrency = (symbols: string, amount: number) => {
		navigate(`/list/${symbols}`)
		dispatch(getCurrencyRate(symbols.toLowerCase()))
		setAmount(amount)
	}
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(getCurrenciesSymbols())
		cur ? dispatch(getCurrencyRate(cur)) : dispatch(getCurrencyRate('usd'))
	}, [dispatch, cur])

	const areCurrencySymbolsCorrect = (symbols: string) => {
		return currenciesSymbols.some((el) => el.symbols === symbols.toLowerCase())
	}

	return (
		<div>
			<FindCurrency
				currency={cur || 'usd'}
				setConvertedCurrency={setConvertedCurrency}
				areCurrencySymbolsCorrect={areCurrencySymbolsCorrect}
			/>
			{!isLoading &&
				currenciesSymbols.map((el, index) => {
					return (
						<CurrencyListItem
							activeCurrency={activeCurrency}
							key={el.symbols}
							symbols={el.symbols}
							fullName={el.fullName}
							amount={currenciesRates[index]?.rate * amount || 1}
						/>
					)
				})}
		</div>
	)
}

export default CurrenciesListPage
