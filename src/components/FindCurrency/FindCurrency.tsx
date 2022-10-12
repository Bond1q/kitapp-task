import { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'

import st from './FindCurrency.module.scss'

interface FindCurrencyProps {
	currency: string
	setConvertedCurrency: (symbols: string, amount: number) => void
	areCurrencySymbolsCorrect: (symbols: string) => boolean
}

const FindCurrency: FC<FindCurrencyProps> = ({
	currency,
	setConvertedCurrency,
	areCurrencySymbolsCorrect,
}) => {
	const formik = useFormik({
		initialValues: {
			activeCurrency: currency,
			amount: 1,
		},
		validationSchema: Yup.object({
			activeCurrency: Yup.string()
				.test('areCorrectCurrency', '', (value) => {
					return areCurrencySymbolsCorrect(String(value))
				})
				.required('activeCurrency is required'),
			amount: Yup.number().required('amount is required'),
		}),
		onSubmit: (values) => {
			setConvertedCurrency(values.activeCurrency, values.amount)
		},
	})

	const isInputUncorrect = (inputName: 'amount' | 'activeCurrency') => {
		return formik.touched[inputName] && formik.errors[inputName]
	}

	return (
		<div className={st.findCurrency}>
			<form onSubmit={formik.handleSubmit}>
				<input
					id='amount'
					type='text'
					value={formik.values.amount}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder='Amount'
					className={cn({ [st.error]: isInputUncorrect('amount') })}
				/>
				<input
					id='activeCurrency'
					type='text'
					value={formik.values.activeCurrency}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder='Currency'
					className={cn({ [st.error]: isInputUncorrect('activeCurrency') })}
				/>
				<button disabled={!formik.isValid} type='submit'>
					Convert
				</button>
			</form>
		</div>
	)
}

export default FindCurrency
