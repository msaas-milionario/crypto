'use client'

import { modalContext } from "@/components/context/modal";
import { Navbar } from "@/components/navbar";
import { AddBtn } from "@/components/ui/add-btn";
import { ComparisonBox } from "@/components/ui/comparison-box";
import { HeaderBuy, HeaderOperation, HeaderSell } from "@/components/ui/header";
import { Modal } from "@/components/ui/modal";
import { ModalOrderBook } from "@/components/ui/modal-order-book";
import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";

interface ExchangeData {
    coin: string;
    type: 'buy' | 'sell';
    value: string[];
}

interface FormattedData {
    [coin: string]: {
        buy: { exchange: string; value: number }[];
        sell: { exchange: string; value: number }[];
    };
}

interface ExchangeValue {
    exchange: string;
    value: number;
}

interface CoinData {
    buy: ExchangeValue[];
    sell: ExchangeValue[];
}

interface ComparisonData {
    [coin: string]: CoinData;
}

const formatCurrency = (value: number): string => {
    return `$${value.toFixed(4)}`;
};

export default function Page() {

    const { isActived, setIsActived } = useContext(modalContext)
    const [message, setMessage] = useState<string>('')

    const [liberate, setLiberate] = useState<boolean>(false)

    const [dolarValue, setDolarValue] = useState<string>('')

    // Buy
    const [buyBinance, setBuyBinance] = useState<boolean>(false)
    const [buyOkX, setBuyOKX] = useState<boolean>(false)
    const [buyMercadoBitcoin, setBuyMercadoBitcoin] = useState<boolean>(false)
    const [buyKuCoin, setBuyBKucoin] = useState<boolean>(false)
    const [buyBybit, setBuyBybit] = useState<boolean>(false)
    const [buyGateio, setBuyGateio] = useState<boolean>(false)

    // Sell
    const [sellBinance, setSellBinance] = useState<boolean>(false)
    const [sellOkx, setSellOKX] = useState<boolean>(false)
    const [sellMercadoBitcoin, setSellMercadoBitcoin] = useState<boolean>(false)
    const [sellKuCoin, setSellBKucoin] = useState<boolean>(false)
    const [sellBybit, setSellBybit] = useState<boolean>(false)
    const [sellGateio, setSellGateio] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)
    const [comparisons, setComparisons] = useState<ComparisonData>({});

    async function confirmOperation() {
        let buyExchangesSum = 0
        buyExchangesSum = buyBinance ? buyExchangesSum + 1 : buyExchangesSum
        buyExchangesSum = buyKuCoin ? buyExchangesSum + 1 : buyExchangesSum
        buyExchangesSum = buyMercadoBitcoin ? buyExchangesSum + 1 : buyExchangesSum
        buyExchangesSum = buyOkX ? buyExchangesSum + 1 : buyExchangesSum
        buyExchangesSum = buyBybit ? buyExchangesSum + 1 : buyExchangesSum
        buyExchangesSum = buyGateio ? buyExchangesSum + 1 : buyExchangesSum

        let sellExchangeSum = 0
        sellExchangeSum = sellBinance ? sellExchangeSum + 1 : sellExchangeSum
        sellExchangeSum = sellKuCoin ? sellExchangeSum + 1 : sellExchangeSum
        sellExchangeSum = sellMercadoBitcoin ? sellExchangeSum + 1 : sellExchangeSum
        sellExchangeSum = sellOkx ? sellExchangeSum + 1 : sellExchangeSum
        sellExchangeSum = sellBybit ? sellExchangeSum + 1 : sellExchangeSum
        sellExchangeSum = sellGateio ? sellExchangeSum + 1 : sellExchangeSum

        if (buyExchangesSum === 0 || sellExchangeSum === 0) {
            setMessage("Selecione pelo menos 1 corretora de compra e 1 corretora de venda.")
        } else {
            setIsActived(true)
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`)
            setDolarValue(response.data.rates.BRL)
        }

    }

    if (liberate) {
        return (
            <div className="grid grid-cols-my min-h-[524px] overflosw-y-scroll">
                <Navbar />
                <div className="border-l border-zinc-100 px-4 col-span-2">
                    <div className="flex flex-col gap-4">
                        <HeaderOperation
                            dolar={dolarValue}
                        />
                        <div className="grid grid-cols-3 gap-6">
                            {Object.keys(comparisons).map((coin, index) => (
                                <>
                                    {comparisons[coin].buy.map((buy, buyIndex) => (
                                        comparisons[coin].sell.map((sell, sellIndex) => (
                                            <ComparisonBox
                                                key={`${buyIndex}-${sellIndex}`}
                                                crypto={coin}
                                                cryptoImagePath={`/images/${coin.toLowerCase()}.png`} // Supondo que você tenha as imagens das criptomoedas em um diretório 'images'
                                                sellExchange={{
                                                    exchange: sell.exchange,
                                                    value: formatCurrency(sell.exchange === 'mercadoBitcoin' ? sell.value / Number(dolarValue) : sell.value),
                                                }}
                                                buyExchange={{
                                                    exchange: buy.exchange,
                                                    value: formatCurrency(buy.exchange === 'mercadoBitcoin' ? buy.value / Number(dolarValue) : buy.value),
                                                }}
                                                spread={`${buy.value - sell.value}`}
                                            />
                                        ))
                                    ))}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div
                className="grid grid-cols-my min-h-[524px]"
            >
                <Navbar />
                <div className="border-x border-zinc-100 px-4">
                    <div className="flex flex-col gap-4">
                        <HeaderBuy>
                            <button
                                onClick={() => confirmOperation()}
                                type="button"
                                className="add-btn"
                            >Fazer busca</button>
                        </HeaderBuy>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`${sellBinance && 'opacity-50 hover:cursor-not-allowed'} relative col-span-1 h-[52px] exchange-box rounded-md flex items-center`}>
                                <label htmlFor="buy-binance" className={`absolute left-0 top-0 h-full w-full z-50 ${sellBinance && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={buyBinance}
                                        onChange={() => setBuyBinance(!buyBinance)}
                                        name="buy-binance"
                                        type="checkbox"
                                        id="buy-binance"
                                        className={`absolute right-2 top-2`}
                                    />
                                </label>
                                <AddBtn
                                    imagePath="binance"
                                    cryptoText="binance"
                                />
                            </div>
                            <div className={`${sellOkx && 'opacity-50 hover:cursor-not-allowed'} relative col-span-1 h-[52px] exchange-box rounded-md flex items-center`}>
                                <label htmlFor="buy-okx" className={`absolute left-0 top-0 h-full w-full z-50 ${sellOkx && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={buyOkX}
                                        onChange={() => setBuyOKX(!buyOkX)}
                                        name="buy-okx"
                                        type="checkbox"
                                        id="buy-okx"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="okx"
                                    cryptoText="OKX"
                                />
                            </div>
                            <div className={`${sellMercadoBitcoin && 'opacity-50 hover:cursor-not-allowed'} relative col-span-1 h-[52px] exchange-box rounded-md flex items-center`}>
                                <label htmlFor="buy-mercado" className={`absolute left-0 top-0 h-full w-full z-50 ${sellMercadoBitcoin && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={buyMercadoBitcoin}
                                        onChange={() => setBuyMercadoBitcoin(!buyMercadoBitcoin)}
                                        name="buy-mercado"
                                        type="checkbox"
                                        id="buy-mercado"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="mb"
                                    cryptoText="Mercado Bitcoin"
                                />
                            </div>
                            <div className={`${sellKuCoin && 'opacity-50 hover:cursor-not-allowed'} relative col-span-1 h-[52px] exchange-box rounded-md flex items-center`}>
                                <label htmlFor="buy-kucoin" className={`absolute left-0 top-0 h-full w-full z-50 ${sellKuCoin && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={buyKuCoin}
                                        onChange={() => setBuyBKucoin(!buyKuCoin)}
                                        name="buy-kucoin"
                                        type="checkbox"
                                        id="buy-kucoin"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="kucoin"
                                    cryptoText="KuCoin"
                                />
                            </div>
                            <div className={`${sellBybit && 'opacity-50 hover:cursor-not-allowed'} relative col-span-1 h-[52px] exchange-box rounded-md flex items-center`}>
                                <label htmlFor="buy-bybit" className={`absolute left-0 top-0 h-full w-full z-50 ${sellBybit && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={buyBybit}
                                        onChange={() => setBuyBybit(!buyBybit)}
                                        name="buy-bybit"
                                        type="checkbox"
                                        id="buy-bybit"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="bybit"
                                    cryptoText="ByBit"
                                />
                            </div>
                            <div className={`${sellGateio && 'opacity-50 hover:cursor-not-allowed'} relative col-span-1 h-[52px] exchange-box rounded-md flex items-center`}>
                                <label htmlFor="buy-gateio" className={`absolute left-0 top-0 h-full w-full z-50 ${sellGateio && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={buyGateio}
                                        onChange={() => setBuyGateio(!buyGateio)}
                                        name="buy-gateio"
                                        type="checkbox"
                                        id="buy-gateio"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="gateio"
                                    cryptoText="Gateio"
                                />
                            </div>
                        </div>
                        {message.length > 0 && (
                            <div className="w-full bg-red-950/40 border border-red-950/90 rounded-lg p-4">
                                <p className="text-zinc-200 text-sm text-center">{message}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="px-4">
                    <div className="flex flex-col gap-4">
                        <HeaderSell />
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`relative col-span-1 h-[52px] exchange-box rounded-md flex items-center ${buyBinance && 'opacity-50 cursor-not-allowed'}`}>
                                <label htmlFor="sell-binance" className={`absolute left-0 top-0 h-full w-full z-50 ${buyBinance && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={sellBinance}
                                        onChange={() => setSellBinance(!sellBinance)}
                                        name="sell-binance"
                                        type="checkbox"
                                        id="sell-binance"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="binance"
                                    cryptoText="binance"
                                />
                            </div>
                            <div className={`relative col-span-1 h-[52px] exchange-box rounded-md flex items-center ${buyOkX && 'opacity-50 cursor-not-allowed'}`}>
                                <label htmlFor="sell-okx" className={`absolute left-0 top-0 h-full w-full z-50 ${buyOkX && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={sellOkx}
                                        onChange={() => setSellOKX(!sellOkx)}
                                        name="sell-okx"
                                        type="checkbox"
                                        id="sell-okx"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="okx"
                                    cryptoText="OKX"
                                />
                            </div>
                            <div className={`relative col-span-1 h-[52px] exchange-box rounded-md flex items-center ${buyMercadoBitcoin && 'opacity-50 cursor-not-allowed'}`}>
                                <label htmlFor="sell-mercado" className={`absolute left-0 top-0 h-full w-full z-50 ${buyMercadoBitcoin && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={sellMercadoBitcoin}
                                        onChange={() => setSellMercadoBitcoin(!sellMercadoBitcoin)}
                                        name="sell-mercado"
                                        type="checkbox"
                                        id="sell-mercado"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="mb"
                                    cryptoText="Mercado Bitcoin"
                                />
                            </div>
                            <div className={`relative col-span-1 h-[52px] exchange-box rounded-md flex items-center ${buyKuCoin && 'opacity-50 cursor-not-allowed'}`}>
                                <label htmlFor="sell-kucoin" className={`absolute left-0 top-0 h-full w-full z-50 ${buyKuCoin && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={sellKuCoin}
                                        onChange={() => setSellBKucoin(!sellKuCoin)}
                                        name="sell-kucoin"
                                        type="checkbox"
                                        id="sell-kucoin"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="kucoin"
                                    cryptoText="KuCoin"
                                />
                            </div>
                            <div className={`${buyBybit && 'opacity-50 hover:cursor-not-allowed'} relative col-span-1 h-[52px] exchange-box rounded-md flex items-center`}>
                                <label htmlFor="sell-bybit" className={`absolute left-0 top-0 h-full w-full z-50 ${buyBybit && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={sellBybit}
                                        onChange={() => setSellBybit(!sellBybit)}
                                        name="sell-bybit"
                                        type="checkbox"
                                        id="sell-bybit"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="bybit"
                                    cryptoText="ByBit"
                                />
                            </div>
                            <div className={`${buyGateio && 'opacity-50 hover:cursor-not-allowed'} relative col-span-1 h-[52px] exchange-box rounded-md flex items-center`}>
                                <label htmlFor="sell-gateio" className={`absolute left-0 top-0 h-full w-full z-50 ${buyGateio && 'cursor-not-allowed pointer-events-none'}`}>
                                    <input
                                        checked={sellGateio}
                                        onChange={() => setSellGateio(!sellGateio)}
                                        name="sell-gateio"
                                        type="checkbox"
                                        id="sell-gateio"
                                        className="absolute right-2 top-2"
                                    />
                                </label>
                                <AddBtn
                                    imagePath="gateio"
                                    cryptoText="Gateio"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    buyBinance={buyBinance}
                    buyKuCoin={buyKuCoin}
                    buyMercadoBitcoin={buyMercadoBitcoin}
                    buyOkX={buyOkX}
                    sellBinance={sellBinance}
                    sellKuCoin={sellKuCoin}
                    sellMercadoBitcoin={sellMercadoBitcoin}
                    sellOkX={sellOkx}
                    buyBybit={buyBybit}
                    buyGateio={buyGateio}
                    sellBybit={sellBybit}
                    sellGateio={sellGateio}
                    liberate={liberate}
                    loading={loading}
                    setLoading={setLoading}
                    setLiberate={setLiberate}
                    setComparisons={setComparisons}
                />
            </div>
        )
    }

}
