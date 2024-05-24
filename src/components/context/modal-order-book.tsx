'use client'

import { ReactNode, SetStateAction, createContext, useState } from "react"

interface orderBookProps {
    token: string | undefined
    buyExchange: string | undefined
    sellExchange: string | undefined
}

interface modalOrderBookContextProps {
    isActived: boolean
    setIsActived: React.Dispatch<SetStateAction<boolean>>
    orderBook: orderBookProps
    setOrderBook: React.Dispatch<SetStateAction<orderBookProps>>
}

export const modalOrderBookContext = createContext<modalOrderBookContextProps>({} as modalOrderBookContextProps)

interface modalOrderBookProviderProps {
    children: ReactNode
}

export function ModalOrderBookProvider({ children }: modalOrderBookProviderProps) {
    const [isActived, setIsActived] = useState<boolean>(false)
    const [orderBook, setOrderBook] = useState<orderBookProps>({
        buyExchange: undefined,
        sellExchange: undefined,
        token: undefined
    })

    return (
        <modalOrderBookContext.Provider value={{ isActived, setIsActived, orderBook, setOrderBook }}>
            {children}
        </modalOrderBookContext.Provider>
    )
}