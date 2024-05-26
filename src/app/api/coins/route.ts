import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

const valid_coins = ['CRV-USDT', 'REN-USDT']

const binance_valid_coins = ['CRVUSDT', 'RENUSDT', 'PSGUSDT', 'ACMUSDT', 'GALUSDT', 'BARUSDT', 'JUVUSDT', 'CITYUSDT', 'ASRUSDT', 'FORUSDT', 'ATMUSDT', 'OGUSDT']
const okx_valid_coins = ['CRV-USDT', 'REN-USDT', 'MENGO-USDT', 'CITY-USDT', 'GAL-USDT', 'MENGO-USDT', 'POR-USDT', 'ACM-USDT', 'ARG-USDT', 'TRA-USDT']
const mercadobitcoin_valid_coins = ['CRV', 'REN', 'GAL']
const kucoin_valid_coins = ['CRV-USDT', 'REN-USDT', 'GAL-USDT']
const bybit_valid_coins = ['RENUSDT', 'GALUSDT', 'OGUSDT']
const gateio_valid_coins = ['REN_USDT', 'CRV_USDT', 'PSG_USDT', 'ACM_USDT', 'MENGO_USDT', 'POR_USDT', 'AFC_USDT', 'GAL_USDT', 'ALA_USDT', 'JUV_USDT', 'SCCP_USDT', 'CITY_USDT', 'GOZ_USDT', 'TRA_USDT', 'ARG_USDT', 'NAP_USDT', 'ASR_USDT', 'AM_USDT', 'INTER_USDT', 'ITA_USDT', 'ASM_USDT', 'FOR_USDT', 'IBFK_USDT', 'ATM_USDT', 'SPFC_USDT', 'OG_USDT', 'GALO_USDT', 'SAUBER_USDT',]

async function getBinanceValues(cryptoName: string, type: 'buy' | 'sell') {
    try {
        console.log('FUNÇÃO GET BINANCE VALUES')
        const binance_values = []
        let response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${cryptoName}&limit=1`)
        console.log('BINANCE API RESPONSE', response)
        if (type === 'buy') {
            binance_values.push(response.data.bids[0][0])
        } else {
            binance_values.push(response.data.asks[0][0])
        }
        
        console.log('BINANCE VALUES', binance_values)
        return binance_values
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}
async function getOKXValues(cryptoName: string, type: 'buy' | 'sell') {
    const okx_values = []
    let response = await axios.get(`https://www.okx.com/api/v5/market/books?instId=${cryptoName}&sz=1`)

    if (type === 'buy') {
        okx_values.push(response.data.data[0].bids[0] && response.data.data[0].bids[0][0])
    } else {
        okx_values.push(response.data.data[0].asks[0] && response.data.data[0].asks[0][0])
    }
    return okx_values
}
async function getMercadoBitcoinValues(cryptoName: string, type: 'buy' | 'sell') {
    const mercado_bitcoin_values = []
    let response = await axios.get(`https://www.mercadobitcoin.net/api/${cryptoName}/orderbook/`)

    if (type === 'buy') {
        mercado_bitcoin_values.push(response.data.bids[0][0])
    } else {
        mercado_bitcoin_values.push(response.data.asks[0][0])
    }
    return mercado_bitcoin_values
}
async function getKuCoinValues(cryptoName: string, type: 'buy' | 'sell') {
    const ku_coin_values = []
    let response = await axios.get(`https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${cryptoName}`)

    if (type === 'buy') {
        ku_coin_values.push(response.data.data.price)
    } else {
        ku_coin_values.push(response.data.data.bestAsk)
    }

    return ku_coin_values
}
async function getBybitValues(cryptoName: string, type: 'buy' | 'sell') {
    const bybit_values = []
    let response = await axios.get(`https://api.bybit.com/v2/public/tickers?symbol=${cryptoName}`)
    // FAZER TRATAMENTO DE DADOS
    if (type === 'buy') {
        bybit_values.push(response.data.result[0].bid_price)
    } else {
        bybit_values.push(response.data.result[0].ask_price)
    }

    return bybit_values
}
async function getGateioValues(cryptoName: string, type: 'buy' | 'sell') {
    const gateio_values = []
    let response = await axios.get(`https://api.gateio.ws/api/v4/spot/tickers?currency_pair=${cryptoName}`)

    // FAZER TRATAMENTO DE DADOS
    if (type === 'buy') {
        gateio_values.push(response.data[0].highest_bid)
    } else {
        gateio_values.push(response.data[0].lowest_ask)
    }

    return gateio_values
}
async function getDataFromExchange(exchange: string, type: 'buy' | 'sell') {
    const data: {}[] = []

    if (exchange === 'binance') {
        for (let p of binance_valid_coins) {
            var response = await getBinanceValues(p, type)
            data.push({
                coin: p,
                type: type,
                value: response
            })
        }
    } else if (exchange === 'okx') {
        for (let p of okx_valid_coins) {
            var responseOKX = await getOKXValues(p, type)
            data.push({
                coin: p,
                type: type,
                value: responseOKX
            })
        }
    } else if (exchange === 'mercado_bitcoin') {
        for (let p of mercadobitcoin_valid_coins) {
            var responseMercadoBitcoin = await getMercadoBitcoinValues(p, type)
            data.push({
                coin: p,
                type: type,
                value: responseMercadoBitcoin
            })
        }
    } else if (exchange === 'kuCoin') {
        for (let p of kucoin_valid_coins) {
            var responseKuCoin = await getKuCoinValues(p, type)
            data.push({
                coin: p,
                type: type,
                value: responseKuCoin
            })
        }
    } else if (exchange === 'gateio') {
        for (let p of gateio_valid_coins) {
            var responseGateio = await getGateioValues(p, type)
            data.push({
                coin: p,
                type: type,
                value: responseGateio
            })
        }
    } else if (exchange === 'bybit') {
        for (let p of bybit_valid_coins) {
            var responseBybit = await getBybitValues(p, type)
            data.push({
                coin: p,
                type: type,
                value: responseBybit
            })
        }
    }
    return data
}

export async function POST(request: Request, context: any) {
    const data = await request.json()

    let binanceCoins
    let okxCoins
    let mercadobitcoin
    let kucoin
    let bybit
    let gateio

    if (data.binance.buy) {
        binanceCoins = await getDataFromExchange('binance', 'buy')
    } else if (data.binance.sell) {
        binanceCoins = await getDataFromExchange('binance', 'sell')
    }
    if (data.okx.buy) {
        okxCoins = await getDataFromExchange('okx', 'buy')
    } else if (data.okx.sell) {
        okxCoins = await getDataFromExchange('okx', 'sell')
    }
    if (data.mercado_bitcoin.buy) {
        mercadobitcoin = await getDataFromExchange('mercado_bitcoin', 'buy')
    } else if (data.mercado_bitcoin.sell) {
        mercadobitcoin = await getDataFromExchange('mercado_bitcoin', 'sell')
    }
    if (data.kuCoin.buy) {
        kucoin = await getDataFromExchange('kuCoin', 'buy')
    } else if (data.kuCoin.sell) {
        kucoin = await getDataFromExchange('kuCoin', 'sell')
    }
    if (data.bybit.buy) {
        bybit = await getDataFromExchange('bybit', 'buy')
    } else if (data.bybit.sell) {
        bybit = await getDataFromExchange('bybit', 'sell')
    }
    if (data.gateio.buy) {
        gateio = await getDataFromExchange('gateio', 'buy')
    } else if (data.gateio.sell) {
        gateio = await getDataFromExchange('gateio', 'sell')
    }

    return NextResponse.json({
        binance: binanceCoins,
        mercadoBitcoin: mercadobitcoin,
        okx: okxCoins,
        kuCoin: kucoin,
        bybit: bybit,
        gateio: gateio
    })
}