import { createContext, FC, useContext, Dispatch, SetStateAction } from 'react'

const PriceContext = createContext({
  price: 0,
  total: 0,
  setTotal: arg => {},
})

export const usePriceState = () => useContext(PriceContext)

interface PriceProviderProps {
  price: number
  total: number
  setTotal: Dispatch<SetStateAction<number>>
}

export const PriceProvider: FC<PriceProviderProps> = ({
  children,
  price,
  total,
  setTotal,
}) => {
  return (
    <PriceContext.Provider
      value={{
        price,
        total,
        setTotal: arg => setTotal(arg),
      }}
    >
      {children}
    </PriceContext.Provider>
  )
}
