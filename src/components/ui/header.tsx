import Image from "next/image"
import { ReactNode, SetStateAction } from "react"

interface HeaderBuyProps {
    children?: ReactNode
    search: string
    setSearch: React.Dispatch<SetStateAction<string>>
}

export function HeaderBuy({ children, search, setSearch }: HeaderBuyProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-8">
                <h3 className="text-white font-bold xl:text-xl text-lg">Exchanges de compra</h3>
                {children}
            </div>
            <div className="relative">
                <input type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    className="inpt-search"
                    placeholder="Buscar..."
                />
                <Image
                    className="absolute top-[10px] left-4"
                    src="/images/icons/pesquisar.png"
                    alt=""
                    width={14}
                    height={14}
                />
            </div>
        </div>
    )
}

export function HeaderSell({ children }: HeaderBuyProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8 h-[40px]">
                <h3 className="text-white font-bold xl:text-xl text-lg">Exchanges de venda</h3>
                {children}
            </div>
            <div className="relative">
                <input type="text"
                    className="inpt-search"
                    placeholder="Buscar..."
                />
                <Image
                    className="absolute top-[10px] left-4"
                    src="/images/icons/pesquisar.png"
                    alt=""
                    width={14}
                    height={14}
                />
            </div>
        </div>
    )
}

interface HeaderOperationProps {
    dolar: string
    children: ReactNode

}
export function HeaderOperation({ dolar, children }: HeaderOperationProps) {
    return (
        <div className="flex flex-col items-start gap-0">
            <h3 className="text-white font-bold text-xl">Operações</h3>
            <p className="text-zinc-400 text-sm font-medium">Cotação do Dólar -  R${dolar} </p>
            {children}
        </div>
    )
}