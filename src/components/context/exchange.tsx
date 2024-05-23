'use client'

import { ReactNode, SetStateAction, createContext, useState } from "react"

interface ExchangeContextProps {
    BuyExchange: string[]
    setBuyExchange: React.Dispatch<SetStateAction<string[]>>

    SellExchange: string[]
    setSellExchange: React.Dispatch<SetStateAction<string[]>>
}

export const BuyExchangeContext = createContext({} as ExchangeContextProps)

interface ExchangeProviderProps {
    children: ReactNode
}

export function ExchangeProvider({ children }: ExchangeProviderProps) {
    const [BuyExchange, setBuyExchange] = useState<string[]>([])
    const [SellExchange, setSellExchange] = useState<string[]>([])

    return (
        <BuyExchangeContext.Provider value={{ BuyExchange, setBuyExchange, SellExchange, setSellExchange }}>
            {children}
        </BuyExchangeContext.Provider>
    )
}