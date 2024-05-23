'use client'

import { ReactNode, SetStateAction, createContext, useState } from "react"

interface modalContextProps {
    isActived: boolean
    setIsActived: React.Dispatch<SetStateAction<boolean>>
}

export const modalContext = createContext<modalContextProps>({} as modalContextProps)

interface modalProviderProps {
    children: ReactNode
}

export function ModalProvider({ children }: modalProviderProps) {
    const [isActived, setIsActived] = useState<boolean>(false)

    return (
        <modalContext.Provider value={{ isActived, setIsActived }}>
            {children}
        </modalContext.Provider>
    )
}