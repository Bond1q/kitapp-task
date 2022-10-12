import { FC } from 'react'

import { numberWithSpaces } from './../../utils/funcs/numbersWithSpaces'
import st from './CurrencyListItem.module.scss'

interface CurrencyListItemProps {
   symbols: string
   fullName: string
   amount: number
   activeCurrency: string
}

const CurrencyListItem: FC<CurrencyListItemProps> = ({
   symbols,
   fullName,
   amount,
   activeCurrency,
}) => {
   return (
      <div className={st.currencyListItem}>
         <div className={st.name}>
            <div className={st.symbols}>{symbols}</div>
            <span className={st.divider}>-</span>
            <div className={st.fullName}>{fullName}</div>
         </div>
         <div className={st.amount}>
            {numberWithSpaces(+amount.toFixed(2))}
            <span>{activeCurrency}</span>
         </div>
      </div>
   )
}

export default CurrencyListItem
