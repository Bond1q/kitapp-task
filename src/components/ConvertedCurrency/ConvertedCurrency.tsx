import { FC } from 'react'

import { numberWithSpaces } from './../../utils/funcs/numbersWithSpaces'
import st from './ConvertedCurrency.module.scss'

interface ConvertedCurrencyProps {
   currencyFrom: string
   currencyFromAmount: number
   currencyTo: string
   currencyToAmount: number
}

const ConvertedCurrency: FC<ConvertedCurrencyProps> = ({
   currencyFrom,
   currencyFromAmount,
   currencyTo,
   currencyToAmount,
}) => {
   return (
      <div className={st.convertedCurrency}>
         <div className={st.currency}>
            <span>{numberWithSpaces(+currencyFromAmount.toFixed(2))}</span>
            <span className={st.symbols}>{currencyFrom}</span>
         </div>
         <div className={st.divider}>=</div>
         <div className={st.currency}>
            <span>{numberWithSpaces(+currencyToAmount.toFixed(2))}</span>
            <span className={st.symbols}>{currencyTo}</span>
         </div>
      </div>
   )
}

export default ConvertedCurrency
