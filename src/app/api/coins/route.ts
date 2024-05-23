import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

const valid_coins = ['CRV-USDT', 'REN-USDT']

const binance_valid_coins = ['CRVUSDT', 'RENUSDT']
const okx_valid_coins = ['CRV-USDT', 'REN-USDT']
const mercadobitcoin_valid_coins = ['CRV', 'REN']
const kucoin_valid_coins = ['CRV-USDT', 'REN-USDT']

async function getBinanceValues(cryptoName: string, type: 'buy' | 'sell') {
    const binance_values = []
    let response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${cryptoName}&limit=1`)
    if (type === 'buy') {
        binance_values.push(response.data.bids[0][0])
    } else {
        binance_values.push(response.data.asks[0][0])
    }

    return binance_values
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
    }
    return data
}

export async function POST(request: Request, context: any) {
    const data = await request.json()

    let binanceCoins
    let okxCoins
    let mercadobitcoin
    let kucoin

    if (data.binance.buy) {
        binanceCoins = await getDataFromExchange('binance', 'buy')
    } else if(data.binance.sell) {
        binanceCoins = await getDataFromExchange('binance', 'sell')
    }
    if (data.okx.buy) {
        okxCoins = await getDataFromExchange('okx', 'buy')
    } else if(data.okx.sell) {
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

    return NextResponse.json({
        binance: binanceCoins,
        mercadoBitcoin: mercadobitcoin,
        okxCoins: okxCoins,
        kuCoin: kucoin
    })
}