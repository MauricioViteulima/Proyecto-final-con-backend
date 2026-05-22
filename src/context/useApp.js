import { useContext } from 'react'
import { AppContext } from './AppContextBase'

export const useApp = () => useContext(AppContext)
