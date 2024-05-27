'use client'

import { useContext, useEffect, useState } from "react"
import { modalOrderBookContext } from "../context/modal-order-book"
import Image from "next/image"
import axios from "axios"

export function ModalOrderBook() {
    const { isActived, setIsActived, orderBook, setOrderBook } = useContext(modalOrderBookContext)
    const [type, setType] = useState<'buy' | 'sell'>('buy')
    const [buyOrderBook, setBuyOrderBook] = useState<[]>([])
    const [sellOrderBook, setSellOrderBook] = useState<[]>([])
    const [currentOrderBook, setCurrentOrderBook] = useState<[]>([])

    async function getOrderBook() {
        setBuyOrderBook([])
        setSellOrderBook([])
        let exchange
        if (type === 'buy') {
            exchange = orderBook.buyExchange
        } else {
            exchange = orderBook.sellExchange
        }

        await axios.post('https://app.arbitfy.com.br/api/get-order-book', JSON.stringify({ exchange, type: type === 'buy' ? 'sell' : 'buy', crypto: orderBook.token }))
            .then(res => {
                if (type === 'buy') {
                    setBuyOrderBook(res.data.orderBook)
                } else {
                    setSellOrderBook(res.data.orderBook)
                }
            }).catch(e => console.log(e))
    }

    useEffect(() => {
        if (type === 'buy') {
            setCurrentOrderBook(buyOrderBook)
        } else {
            setCurrentOrderBook(sellOrderBook)
        }
    }, [sellOrderBook, buyOrderBook])

    useEffect(() => {
        if (isActived) {
            if (type)
                getOrderBook()
        }
        if (isActived) {
            document.querySelector('body')?.classList.add('overflow-hidden')
        } else {
            document.querySelector('body')?.classList.remove('overflow-hidden')
        }
    }, [isActived, type])

    return (
        <div className={`fixed left-0 top-0 h-screen w-full flex items-center justify-center ${isActived ? "z-[999] opacity-100" : "-z-[999] opacity-0"}`}>
            <div className="absolute left-0 top-0 bg-zinc-950/60 w-full h-screen" id="black-bg" onClick={() => {
                setIsActived(!isActived)
                setType('buy')
            }}></div>
            <div className="relative w-[524px] rounded-xl z-50 bg-zinc-800 flex flex-col">
                <nav className="w-full grid grid-cols-2">
                    <button onClick={() => setType('buy')} className={`py-4 border-b-4  transition duration-300 hover:animate-pulse hover:border-emerald-400 ${type === 'buy' ? 'border-b-4 border-emerald-400' : 'border-transparent'} uppercase font-bold text-emerald-400`}>Compra</button>
                    <button onClick={() => setType('sell')} className={`py-4 border-b-4 transition duration-300 hover:animate-pulse hover:border-red-500 ${type === 'sell' ? 'border-b-4 border-red-500' : 'border-transparent'} uppercase font-bold text-red-500`}>Venda</button>
                </nav>
                <div className="flex flex-col gap-6 py-6">
                    <div className="text-center">
                        <p className="uppercase text-zinc-400 text-sm">Exchange</p>
                    </div>
                    <div className="w-full flex gap-2 items-center justify-center">
                        <div className="flex gap-12">
                            <p className="flex gap-2 items-center">
                                <Image
                                    src={`/images/coins/${orderBook.token}.png`}
                                    alt={`${orderBook.token}`}
                                    width={24}
                                    height={24}
                                />
                                <span className="text-white font-bold">{orderBook.token}</span>
                            </p>
                            {type === 'buy' ? (
                                <p className="flex gap-2 items-center">
                                    <Image
                                        src={`/images/exchanges/${orderBook.buyExchange}.png`}
                                        alt={`${crypto}`}
                                        width={24}
                                        height={24}
                                    />
                                    <span className="text-white font-bold capitalize">{orderBook.buyExchange}</span>
                                </p>
                            ) : (
                                <p className="flex gap-2 items-center">
                                    <Image
                                        src={`/images/exchanges/${orderBook.sellExchange === 'mercadoBitcoin' ? 'mb' : orderBook.sellExchange}.png`}
                                        alt={`${crypto}`}
                                        width={24}
                                        height={24}
                                    />
                                    <span className="text-white font-bold capitalize">{orderBook.sellExchange === 'mercadoBitcoin' ? 'Mercado Bit.' : orderBook.sellExchange}</span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 px-4 text-center">
                        <h4 className="text-emerald-400 font-bold uppercase text-sm">Preço ($)</h4>
                        <h4 className="text-emerald-400 font-bold uppercase text-sm">Volume</h4>
                        <h4 className="text-emerald-400 font-bold uppercase text-sm">Total ($)</h4>
                    </div>
                    <div className="relative flex flex-col h-[204px]">
                        {currentOrderBook.length > 0 ? (
                            <>
                                {currentOrderBook.slice(0,5).map((item, index) => (
                                    <div key={index} className={`grid grid-cols-3 px-4 py-2 text-center text-zinc-400 ${index % 2 === 0 && 'bg-zinc-700 border-y border-zinc-600'}`}>
                                        <p>$ {Number(item[0]).toFixed(2)}</p>
                                        <p>{Math.round(item[1]).toLocaleString('pt-br')}</p>
                                        <p>$ {Math.round(item[1] * item[1])}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="w-full flex justify-end px-4">
                        <button
                            onClick={() => {
                                setIsActived(false)
                                setType('buy')
                            }}
                            className="w-1/3 py-3 font-semibold text-sm text-zinc-400 border border-zinc-700 rounded hover:bg-zinc-700 hover:text-white"
                        >Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}