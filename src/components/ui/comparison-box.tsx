'use client'

import Image from "next/image"
import { useContext } from "react";
import { modalOrderBookContext } from "../context/modal-order-book";

type Exchanges = 'binance' | 'mercadoBitcoin' | 'okx' | 'kuCoin' | 'bybit' | 'gateio';
interface Exchange {
    exchange: Exchanges;
    value: string;
}

interface ComparisonBoxProps {
    crypto: string;
    cryptoImagePath: string;
    sellExchange: Exchange;
    buyExchange: Exchange;
    spread: string
}

export function ComparisonBox({ buyExchange, sellExchange, crypto, cryptoImagePath, spread }: ComparisonBoxProps) {
    const { setIsActived, setOrderBook, isActived } = useContext(modalOrderBookContext)

    function openOrderBook() {
        setIsActived(!isActived)
        setOrderBook({
            token: crypto,
            buyExchange: buyExchange.exchange,
            sellExchange: sellExchange.exchange
        })
    }

    const exchangeFees: Record<Exchanges, number> = {
        binance: 0.10, // 0.10%
        mercadoBitcoin: 0.70, // 0.70%
        okx: 0.36, // 0.36%
        kuCoin: 0.10, // 0.10%
        bybit: 0.10, // 0.10%
        gateio: 0.10 // 0.10%
    };

    function calculateEffectiveFee(exchange1: Exchanges, exchange2: Exchanges): string {
        const fee1 = exchangeFees[exchange1];
        const fee2 = exchangeFees[exchange2];

        const effectiveFee = fee1 + fee2;
        return effectiveFee.toFixed(2);
    }

    return (
        <div className="border-normal relative exchange-box rounded-xl flex flex-col gap-4 px-6">
            <div className="py-4 border-b border-b-zinc-100">
                <p className="flex items-center gap-2">
                    <Image
                        src={`/images/coins/${crypto}.png`}
                        alt={`${crypto}`}
                        width={32}
                        height={32}
                    />
                    <span className="text-white font-bold">{crypto}</span>
                </p>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="text-zinc-400 text-sm text-left">COMPRA</p>
                    <div className="flex flex-col">
                        <h4 className="text-white font-semibold capitalize">{buyExchange.exchange === 'mercadoBitcoin' ? 'Mercado Bitcoin' : buyExchange.exchange}</h4>
                        <h4 className="text-zinc-300 text-sm">{buyExchange.value}</h4>
                    </div>
                </div>
                <div className="flex flex-col text-right">
                    <p className="text-zinc-400 text-sm">VENDA</p>
                    <div className="flex flex-col">
                        <h4 className="text-white font-semibold capitalize">{sellExchange.exchange === 'mercadoBitcoin' ? 'Mercado Bitcoin' : sellExchange.exchange}</h4>
                        <h4 className="text-zinc-300 text-sm">{sellExchange.value}</h4>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="text-zinc-400 text-sm text-left">SPREAD</p>
                    <div className="flex flex-col">
                        <h4 className="text-emerald-400 text-sm">{spread.replace('-', '').slice(0, 6)}%</h4>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-zinc-400 text-sm text-right">TAXAS</p>
                    <div className="flex flex-col">
                        <h4 className="text-red-400 text-sm text-right">{calculateEffectiveFee(buyExchange.exchange, sellExchange.exchange)}%</h4>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pb-4">
                <button
                    className="text-orange text-lg font-semibold"
                    onClick={() => openOrderBook()}
                >ORDER BOOK</button>
            </div>
        </div>
    )
}