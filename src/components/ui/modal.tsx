'use client'

import React, { FormEvent, SetStateAction, useContext, useEffect, useState } from "react"
import { modalContext } from "../context/modal"
import axios from "axios"

interface modalProps {
    buyBinance: boolean
    buyOkX: boolean
    buyMercadoBitcoin: boolean
    buyKuCoin: boolean
    sellBinance: boolean
    sellOkX: boolean
    sellMercadoBitcoin: boolean
    sellKuCoin: boolean
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

const binance_valid_coins = ['CRVUSDT', 'RENUSDT']
const okx_valid_coins = ['CRV-USDT', 'REN-USDT']
const mercadobitcoin_valid_coins = ['CRV', 'REN']
const kucoin_valid_coins = ['CRV-USDT', 'REN-USDT']

export function Modal({ buyBinance, buyKuCoin, buyMercadoBitcoin, buyOkX, sellBinance, sellKuCoin, sellMercadoBitcoin, sellOkX, liberate, setLiberate, setComparisons }: modalProps) {
    const { isActived, setIsActived } = useContext(modalContext)

    // Função para padronizar e contar elementos em comum
    function standardizeAndCountCommonElements(...arrays: string[][]): number {
        const standardize = (str: string) => {
            const noHyphens = str.replace(/-/g, '');
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
            }
        }

        // await axios.post('https://crypto-beige-three.vercel.app/api/coins', JSON.stringify(data), {
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     }
        // })
        await axios.post('https://crypto-beige-three.vercel.app/api/coins', JSON.stringify(data))
            .then(res => {
                if (res.status === 200) {
                    setLiberate(true)
                    const data = res.data

                    setComparisons(formatComparisonData(data))
                    document.querySelector('body')?.classList.remove('overflow-hidden')
                }
            }).catch(e => console.log(e))
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
        MercadoBitcoin: buyMercadoBitcoin ? mercadobitcoin_valid_coins : undefined
    };

    const sellExchanges = {
        Binance: sellBinance ? binance_valid_coins : undefined,
        KuCoin: sellKuCoin ? kucoin_valid_coins : undefined,
        OKX: sellOkX ? okx_valid_coins : undefined,
        MercadoBitcoin: sellMercadoBitcoin ? mercadobitcoin_valid_coins : undefined,
    };

    // Filtrando exchanges válidas
    const validBuyExchanges = Object.entries(buyExchanges).filter(([_, coins]) => coins) as [string, string[]][];
    const validSellExchanges = Object.entries(sellExchanges).filter(([_, coins]) => coins) as [string, string[]][];

    const results = getCommonElements(Object.fromEntries(validBuyExchanges), Object.fromEntries(validSellExchanges));


    return (
        <div className={`absolute left-0 top-0 h-screen w-full flex items-center justify-center ${isActived ? "z-[999] opacity-100" : "-z-[999] opacity-0"}`}>
            <div className="absolute left-0 top-0 bg-zinc-950/60 w-full h-screen" onClick={() => setIsActived(false)}></div>
            <div className="w-1/3 rounded-xl dashed-custom z-50 bg-zinc-100 px-4 flex flex-col">
                <div className="flex flex-col gap-1 pt-4 pb-2 border-b border-zinc-400">
                    <h2 className="font-bold text-zinc-950 text-xl">Resumo da operação</h2>
                    <p className="text-zinc-600 text-sm">Saiba de antemão quantas análises receberá da operação selecionada.</p>
                </div>
                <div className="border-b border-zinc-400 px-1 py-4 flex flex-col gap-4">

                    {results.map((result, index) => (
                        <div className="" key={index}>
                            <div key={index} className="flex gap-4 items-center">
                                <h4 className="text-blue-700">{result.buyExchange}</h4>
                                <h4>X</h4>
                                <h4 className="text-emerald-700">{result.sellExchange}</h4>
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
                        className="add-btn w-full"
                    >Encontrar oportunidade</button>
                </div>
            </div>
        </div>
    )
}