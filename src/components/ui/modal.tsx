'use client'

import React, { FormEvent, SetStateAction, useContext, useEffect, useState } from "react"
import { modalContext } from "../context/modal"
import axios from "axios"

interface modalProps {
    buyBinance: boolean
    buyOkX: boolean
    buyMercadoBitcoin: boolean
    buyKuCoin: boolean
    buyGateio: boolean
    buyBybit: boolean
    sellBinance: boolean
    sellOkX: boolean
    sellMercadoBitcoin: boolean
    sellKuCoin: boolean
    sellGateio: boolean
    sellBybit: boolean
    loading: boolean
    setLoading: React.Dispatch<SetStateAction<boolean>>
    liberate: boolean
    setLiberate: React.Dispatch<SetStateAction<boolean>>
    setComparisons: React.Dispatch<SetStateAction<ComparisonData>>
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

const binance_valid_coins = ['CRVUSDT', 'RENUSDT', 'PSGUSDT', 'ACMUSDT', 'GALUSDT', 'BARUSDT', 'JUVUSDT', 'CITYUSDT', 'ASRUSDT', 'FORUSDT', 'ATMUSDT', 'OGUSDT']
const okx_valid_coins = ['CRV-USDT', 'REN-USDT', 'MENGO-USDT', 'CITY-USDT', 'GAL-USDT', 'MENGO-USDT', 'POR-USDT', 'ACM-USDT', 'ARG-USDT', 'TRA-USDT']
const mercadobitcoin_valid_coins = ['CRV', 'REN', 'GAL']
const kucoin_valid_coins = ['CRV-USDT', 'REN-USDT', 'GAL-USDT']
const bybit_valid_coins = ['RENUSDT', 'GALUSDT', 'OGUSDT']
const gateio_valid_coins = ['REN_USDT', 'CRV_USDT', 'PSG_USDT', 'ACM_USDT', 'MENGO_USDT', 'POR_USDT', 'AFC_USDT', 'GAL_USDT', 'ALA_USDT', 'JUV_USDT', 'SCCP_USDT', 'CITY_USDT', 'GOZ_USDT', 'TRA_USDT', 'ARG_USDT', 'NAP_USDT', 'ASR_USDT', 'AM_USDT', 'INTER_USDT', 'ITA_USDT', 'ASM_USDT', 'FOR_USDT', 'IBFK_USDT', 'ATM_USDT', 'SPFC_USDT', 'OG_USDT', 'GALO_USDT', 'SAUBER_USDT',]

export function Modal({ buyBinance, loading, setLoading, buyKuCoin, buyMercadoBitcoin, buyOkX, buyBybit, buyGateio, sellBybit, sellGateio, sellBinance, sellKuCoin, sellMercadoBitcoin, sellOkX, liberate, setLiberate, setComparisons }: modalProps) {
    const { isActived, setIsActived } = useContext(modalContext)
    const [error, setError] = useState<string>('')

    // Função para padronizar e contar elementos em comum
    function standardizeAndCountCommonElements(...arrays: string[][]): number {
        const standardize = (str: string) => {
            const noHyphens = str.replace(/-/g, '').replace(/_/g, '');
            return noHyphens.includes('USDT') ? noHyphens : `${noHyphens}USDT`;
        };

        const standardizedSets = arrays.map(arr => new Set(arr.map(standardize)));
        const commonElementsSet = [...standardizedSets[0]].filter(element =>
            standardizedSets.every(set => set.has(element))
        );

        return commonElementsSet.length;
    }

    // Função para obter elementos em comum entre corretoras
    function getCommonElements(buyExchanges: { [key: string]: string[] }, sellExchanges: { [key: string]: string[] }): { buyExchange: string, sellExchange: string, commonCount: number }[] {
        const results: { buyExchange: string, sellExchange: string, commonCount: number }[] = [];

        for (const buyExchangeName in buyExchanges) {
            for (const sellExchangeName in sellExchanges) {
                const commonCount = standardizeAndCountCommonElements(buyExchanges[buyExchangeName], sellExchanges[sellExchangeName]);
                results.push({ buyExchange: buyExchangeName, sellExchange: sellExchangeName, commonCount });
            }
        }

        return results;
    }

    const formatComparisonData = (data: { [key: string]: ExchangeData[] }): FormattedData => {
        const comparisons: FormattedData = {};

        const getBaseCoin = (coin: string): string => {
            return coin.substring(0, 3);
        };

        Object.keys(data).forEach(exchange => {
            data[exchange].forEach(entry => {
                const baseCoin = getBaseCoin(entry.coin);
                if (!comparisons[baseCoin]) {
                    comparisons[baseCoin] = { buy: [], sell: [] };
                }
                comparisons[baseCoin][entry.type].push({ exchange, value: parseFloat(entry.value[0]) });
            });
        });

        return comparisons;
    }

    async function formSubmited() {
        setLoading(true)
        const data = {
            binance: {
                buy: buyBinance,
                sell: sellBinance
            },
            okx: {
                buy: buyOkX,
                sell: sellOkX
            },
            mercado_bitcoin: {
                buy: buyMercadoBitcoin,
                sell: sellMercadoBitcoin
            },
            kuCoin: {
                buy: buyKuCoin,
                sell: sellKuCoin
            },
            gateio: {
                buy: buyGateio,
                sell: sellGateio
            },
            bybit: {
                buy: buyBybit,
                sell: sellBybit
            }
        }

        // await axios.post('https://crypto-beige-three.vercel.app/api/coins', JSON.stringify(data), {
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     }
        // })
        document.querySelector("#black-bg")?.classList.add('pointer-events-none')
        await axios.post('https://crypto-beige-three.vercel.app/api/coins', JSON.stringify(data))
            .then(res => {
                if (res.status === 200) {
                    setLiberate(true)
                    const data = res.data

                    setComparisons(formatComparisonData(data))
                    document.querySelector('body')?.classList.remove('overflow-hidden')
                    setLoading(false)
                }
            }).catch(e => {
                setError('Erro. Tente novamente mais tarde.')
                setTimeout(() => {
                    setLoading(false)
                }, 3000)
                setTimeout(() => {
                    setError('')
                }, 3500)
                return
            })
    }

    useEffect(() => {
        if (isActived) {
            document.querySelector('body')?.classList.add('overflow-hidden')
        } else {
            document.querySelector('body')?.classList.remove('overflow-hidden')
        }
    }, [isActived])

    // const commonElementsCount = buyBinance ? getCommonElements(binance_valid_coins, sellExchanges) : 0;

    const buyExchanges = {
        Binance: buyBinance ? binance_valid_coins : undefined,
        KuCoin: buyKuCoin ? kucoin_valid_coins : undefined,
        OKX: buyOkX ? okx_valid_coins : undefined,
        MercadoBitcoin: buyMercadoBitcoin ? mercadobitcoin_valid_coins : undefined,
        Bybit: buyBybit ? bybit_valid_coins : undefined,
        Gateio: buyGateio ? gateio_valid_coins : undefined,
    };

    const sellExchanges = {
        Binance: sellBinance ? binance_valid_coins : undefined,
        KuCoin: sellKuCoin ? kucoin_valid_coins : undefined,
        OKX: sellOkX ? okx_valid_coins : undefined,
        MercadoBitcoin: sellMercadoBitcoin ? mercadobitcoin_valid_coins : undefined,
        Bybit: sellBybit ? bybit_valid_coins : undefined,
        Gateio: sellGateio ? gateio_valid_coins : undefined
    };

    // Filtrando exchanges válidas
    const validBuyExchanges = Object.entries(buyExchanges).filter(([_, coins]) => coins) as [string, string[]][];
    const validSellExchanges = Object.entries(sellExchanges).filter(([_, coins]) => coins) as [string, string[]][];

    const results = getCommonElements(Object.fromEntries(validBuyExchanges), Object.fromEntries(validSellExchanges));

    return (
        <div className={`fixed left-0 top-0 h-screen w-full flex items-center justify-center ${isActived ? "z-[999] opacity-100" : "-z-[999] opacity-0"}`}>
            <div className="absolute left-0 top-0 bg-zinc-950/60 w-full h-screen" id="black-bg" onClick={() => setIsActived(false)}></div>
            <div className="relative w-[524px] rounded-xl z-50 bg-zinc-200 px-4 flex flex-col">

                <div className={`absolute top-0 left-0 h-full w-full bg-zinc-950/60 flex flex-col items-center justify-center gap-2 rounded-xl transition duration-500 ${loading ? 'opacity-100 z-50' : 'opacity-0 -z-50'}`}>
                    {error.length > 0 ? (
                        <>
                            <svg className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M12 13.4L14.9 16.3C15.0833 16.4833 15.3167 16.575 15.6 16.575C15.8833 16.575 16.1167 16.4833 16.3 16.3C16.4833 16.1167 16.575 15.8833 16.575 15.6C16.575 15.3167 16.4833 15.0833 16.3 14.9L13.4 12L16.3 9.1C16.4833 8.91667 16.575 8.68333 16.575 8.4C16.575 8.11667 16.4833 7.88333 16.3 7.7C16.1167 7.51667 15.8833 7.425 15.6 7.425C15.3167 7.425 15.0833 7.51667 14.9 7.7L12 10.6L9.1 7.7C8.91667 7.51667 8.68333 7.425 8.4 7.425C8.11667 7.425 7.88333 7.51667 7.7 7.7C7.51667 7.88333 7.425 8.11667 7.425 8.4C7.425 8.68333 7.51667 8.91667 7.7 9.1L10.6 12L7.7 14.9C7.51667 15.0833 7.425 15.3167 7.425 15.6C7.425 15.8833 7.51667 16.1167 7.7 16.3C7.88333 16.4833 8.11667 16.575 8.4 16.575C8.68333 16.575 8.91667 16.4833 9.1 16.3L12 13.4ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" />
                            </svg>
                            <p className="text-zinc-200">{error}</p>
                        </>
                    ) : (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-zinc-200">Buscando dados...</p>
                        </>
                    )
                    }
                </div >
                <div className="flex flex-col gap-1 pt-4 pb-2 border-b border-zinc-400">
                    <h2 className="font-bold text-zinc-950 text-xl">Resumo da operação</h2>
                    <p className="text-zinc-600 text-sm">Saiba de antemão quantas análises receberá da operação selecionada.</p>
                </div>
                <div className="border-b border-zinc-400 px-1 py-4 flex flex-col gap-4">

                    {results.map((result, index) => (
                        <div className="" key={index}>
                            <div key={index} className="flex gap-4 items-center">
                                <h4 className="font-medium">{result.buyExchange}</h4>
                                <h4>X</h4>
                                <h4 className="font-medium text-emerald-700">{result.sellExchange}</h4>
                            </div>
                            <div className="">
                                <p className="text-zinc-600 text-sm">{result.commonCount} moedas em comum</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="py-4">
                    <button
                        type="button"
                        onClick={() => formSubmited()}
                        className="rounded-lg add-btn w-full"
                    >Encontrar oportunidade</button>
                </div>
            </div >
        </div >
    )
}