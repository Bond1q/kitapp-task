import { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'

import st from './Converter.module.scss'

interface ConverterProps {
	amount: number | string
	currencyFrom: string
	currencyTo: string
	setConvertedCurrency: (amount: number, from: string, to: string) => void
	areCurrencySymbolsCorrect: (symbols: string) => boolean
}

const Converter: FC<ConverterProps> = ({
	amount,
	currencyFrom,
	currencyTo,
	setConvertedCurrency,
	areCurrencySymbolsCorrect,
}) => {
	const formik = useFormik({
		initialValues: {
			amount: amount,
			convertFrom: currencyFrom,
			convertTo: currencyTo,
		},
		validationSchema: Yup.object({
			amount: Yup.number().required('amount is required'),
			convertFrom: Yup.string()
				.test('areCorrectCurrency', '', (value) => {
					return areCurrencySymbolsCorrect(String(value))
				})
				.required('convertFrom is required'),

			convertTo: Yup.string()
				.test('areCorrectCurrency', '', (value) => {
					return areCurrencySymbolsCorrect(String(value))
				})
				.required('convertTo is required'),
		}),
		onSubmit: (values) => {
			setConvertedCurrency(+values.amount, values.convertFrom, values.convertTo)
		},
	})

	const isInputUncorrect = (inputName: 'amount' | 'convertFrom' | 'convertTo') => {
		return formik.touched[inputName] && formik.errors[inputName]
	}

	return (
		<div className={st.converter}>
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
					id='convertFrom'
					type='text'
					value={formik.values.convertFrom}
					onChange={formik.handleChange}
					placeholder='Currency'
					onBlur={formik.handleBlur}
					className={cn({ [st.error]: isInputUncorrect('convertFrom') })}
				/>

				<span>in</span>

				<input
					id='convertTo'
					type='text'
					value={formik.values.convertTo}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder='Currency'
					className={cn({ [st.error]: isInputUncorrect('convertTo') })}
				/>
				<button type='submit' disabled={!formik.isValid}>
					Convert
				</button>
			</form>
		</div>
	)
}

export default Converter
