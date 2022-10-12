import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ConverterPage from './pages/ConverterPage/ConverterPage'
import CurrenciesListPage from './pages/CurrenciesListPage/CurrenciesListPage'

function App() {
   return (
      <div className='App'>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route path='/' element={<Navigate to='/converter' replace />} />
               <Route path='/converter' element={<ConverterPage />} />
               <Route path='/list' element={<CurrenciesListPage />}>
                  <Route path=':cur' element={<CurrenciesListPage />} />
               </Route>
            </Route>
         </Routes>
      </div>
   )
}

export default App
