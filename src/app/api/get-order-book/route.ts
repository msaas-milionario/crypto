import axios from "axios";
import { NextResponse } from "next/server";

const binance_valid_coins = ['CRVUSDT', 'RENUSDT', 'PSGUSDT', 'ACMUSDT', 'GALUSDT', 'BARUSDT', 'JUVUSDT', 'CITYUSDT', 'ASRUSDT', 'FORUSDT', 'ATMUSDT', 'OGUSDT']
const okx_valid_coins = ['CRV-USDT', 'REN-USDT', 'MENGO-USDT', 'CITY-USDT', 'GAL-USDT', 'MENGO-USDT', 'POR-USDT', 'ACM-USDT', 'ARG-USDT', 'TRA-USDT']
const mercadobitcoin_valid_coins = ['CRV', 'REN', 'GAL']
const kucoin_valid_coins = ['CRV-USDT', 'REN-USDT', 'GAL-USDT']
const bybit_valid_coins = ['RENUSDT', 'GALUSDT', 'OGUSDT']
const gateio_valid_coins = ['REN_USDT', 'CRV_USDT', 'PSG_USDT', 'ACM_USDT', 'MENGO_USDT', 'POR_USDT', 'AFC_USDT', 'GAL_USDT', 'ALA_USDT', 'JUV_USDT', 'SCCP_USDT', 'CITY_USDT', 'GOZ_USDT', 'TRA_USDT', 'ARG_USDT', 'NAP_USDT', 'ASR_USDT', 'AM_USDT', 'INTER_USDT', 'ITA_USDT', 'ASM_USDT', 'FOR_USDT', 'IBFK_USDT', 'ATM_USDT', 'SPFC_USDT', 'OG_USDT', 'GALO_USDT', 'SAUBER_USDT',]

async function getBinanceValues(cryptoName: string, type: 'buy' | 'sell') {
    try {
        const binance_values = []
        let response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${cryptoName}&limit=10`)
        if (type === 'buy') {
            binance_values.push(response.data.bids)
        } else {
            binance_values.push(response.data.asks)
        }

        return binance_values
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}

async function getMercadoBitcoinValues(cryptoName: string, type: 'buy' | 'sell') {
    try {
        const binance_values = []
        let response = await axios.get(`https://www.mercadobitcoin.net/api/${cryptoName}/orderbook/`)
        if (type === 'buy') {
            binance_values.push(response.data.bids.slice(0, 10))
        } else {
            binance_values.push(response.data.asks.slice(0, 10))
        }

        return binance_values
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}

async function getOKXValues(cryptoName: string, type: 'buy' | 'sell') {
    try {
        const binance_values = []
        let response = await axios.get(`https://www.okx.com/api/v5/market/books?instId=${cryptoName}&sz=10`)
        if (type === 'buy') {
            binance_values.push(response.data.data[0].bids.slice(0, 5))
        } else {
            binance_values.push(response.data.data[0].asks.slice(0, 5))
        }

        return binance_values
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}

async function getKuCoinValues(cryptoName: string, type: 'buy' | 'sell') {
    const ku_coin_values = []
    let response = await axios.get(`https://api.kucoin.com/api/v1/market/orderbook/level2_20?symbol=${cryptoName}`)
    if (type === 'buy') {
        ku_coin_values.push(response.data.data.bids.slice(0, 10))
    } else {
        ku_coin_values.push(response.data.data.asks.slice(0, 10))
    }

    return ku_coin_values
}

async function getBybitValues(cryptoName: string, type: 'buy' | 'sell') {
    const bybit_values = []
    let response = await axios.get(`https://api.bybit.com/v2/public/orderBook/L2?symbol=${cryptoName}`)
    // FAZER TRATAMENTO DE DADOS
    if (type === 'buy') {
        let array: string[][] = []
        response.data.result.map((item: { symbol: string, price: string, side: string, size: number }) => item.side === 'Buy' ? array.push([item.price, `${item.size}`]) : '')
        bybit_values.push(array.slice(0, 10))
    } else {
        let array: string[][] = []
        response.data.result.map((item: { symbol: string, price: string, side: string, size: number }) => item.side === 'Sell' ? array.push([item.price, `${item.size}`]) : '')
        bybit_values.push(array.slice(0, 10))
    }
    return bybit_values
}

async function getGateioValues(cryptoName: string, type: 'buy' | 'sell') {
    const gateio_values = []
    let response = await axios.get(`https://api.gateio.ws/api/v4/spot/order_book?currency_pair=${cryptoName}&limit=10`)

    // FAZER TRATAMENTO DE DADOS
    if (type === 'buy') {
        gateio_values.push(response.data.bids)
    } else {
        gateio_values.push(response.data.asks)
    }

    return gateio_values
}

function getCorrectCrypto(exchange: string, crypto: string) {
    let position
    if (exchange === 'binance') {
        position = binance_valid_coins.findIndex(currency => currency.includes(crypto))
    } else if (exchange === 'mercadoBitcoin') {
        position = mercadobitcoin_valid_coins.findIndex(currency => currency.includes(crypto))
    } else if (exchange === 'bybit') {
        position = bybit_valid_coins.findIndex(currency => currency.includes(crypto))
    }

    if (typeof position === 'undefined') return 0

    return position
}

export async function POST(request: Request, context: any) {

    const data = await request.json()
    let orderBook = []

    if (data.exchange === 'binance') {
        let correctCrypto = 0
        correctCrypto = getCorrectCrypto(data.exchange, data.crypto)
        if (data.type === 'buy') {
            // Puxar order book de venda da data.crypto
            orderBook = await getBinanceValues(binance_valid_coins[correctCrypto], 'sell')
        } else if (data.type === 'sell') {
            // Puxar order book de compra da data.crypto
            orderBook = await getBinanceValues(binance_valid_coins[correctCrypto], 'buy')
        }
    }
    if (data.exchange === 'okx') {
        let correctCrypto = 0
        correctCrypto = getCorrectCrypto(data.exchange, data.crypto)
        if (data.type === 'buy') {
            // Puxar order book de venda da data.crypto
            orderBook = await getOKXValues(okx_valid_coins[correctCrypto], 'sell')
        } else if (data.type === 'sell') {
            // Puxar order book de compra da data.crypto
            orderBook = await getOKXValues(okx_valid_coins[correctCrypto], 'buy')
        }
    }
    if (data.exchange === 'mercadoBitcoin') {
        let correctCrypto = 0
        correctCrypto = getCorrectCrypto(data.exchange, data.crypto)
        // console.log(correctCrypto)
        if (data.type === 'buy') {
            // Puxar order book de venda da data.crypto
            orderBook = await getMercadoBitcoinValues(mercadobitcoin_valid_coins[correctCrypto], 'sell')
        } else if (data.type === 'sell') {
            // Puxar order book de compra da data.crypto
            orderBook = await getMercadoBitcoinValues(mercadobitcoin_valid_coins[correctCrypto], 'buy')
        }
    }
    if (data.exchange === 'kuCoin') {
        let correctCrypto = 0
        correctCrypto = getCorrectCrypto(data.exchange, data.crypto)
        if (data.type === 'buy') {
            // Puxar order book de venda da data.crypto
            orderBook = await getKuCoinValues(kucoin_valid_coins[correctCrypto], 'sell')
        } else if (data.type === 'sell') {
            // Puxar order book de compra da data.crypto
            orderBook = await getKuCoinValues(kucoin_valid_coins[correctCrypto], 'buy')
        }
    }
    if (data.exchange === 'mercadoBitcoin') {
        let correctCrypto = 0
        correctCrypto = getCorrectCrypto(data.exchange, data.crypto)
        if (data.type === 'buy') {
            // Puxar order book de venda da data.crypto
            orderBook = await getMercadoBitcoinValues(mercadobitcoin_valid_coins[correctCrypto], 'sell')
        } else if (data.type === 'sell') {
            // Puxar order book de compra da data.crypto
            orderBook = await getMercadoBitcoinValues(mercadobitcoin_valid_coins[correctCrypto], 'buy')
        }
    }
    if (data.exchange === 'bybit') {
        let correctCrypto = 0
        correctCrypto = getCorrectCrypto(data.exchange, data.crypto)
        if (data.type === 'buy') {
            // Puxar order book de venda da data.crypto
            orderBook = await getBybitValues(bybit_valid_coins[correctCrypto], 'sell')
        } else if (data.type === 'sell') {
            // Puxar order book de compra da data.crypto
            orderBook = await getBybitValues(bybit_valid_coins[correctCrypto], 'buy')
        }
    }
    if (data.exchange === 'gateio') {
        let correctCrypto = 0
        correctCrypto = getCorrectCrypto(data.exchange, data.crypto)
        if (data.type === 'buy') {
            // Puxar order book de venda da data.crypto
            orderBook = await getGateioValues(gateio_valid_coins[correctCrypto], 'sell')
        } else if (data.type === 'sell') {
            // Puxar order book de compra da data.crypto
            orderBook = await getGateioValues(gateio_valid_coins[correctCrypto], 'buy')
        }
    }

    return NextResponse.json({
        orderBook: orderBook[0]
    })
}