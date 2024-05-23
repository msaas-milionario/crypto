'use client'

import { HeaderBuy, HeaderSell } from "./ui/header";
import { AddBtn } from "./ui/add-btn";

export function Container() {
    // const [buyExchange, setBuyExchange] = useState<string[]>([])
    // const [sellExchange, setSellExchange] = useState<string[]>([])
    // const { Exchange, setExchange } = useContext(ExchangeContext)

    // const [info, setInfo] = useState<{ crypto: string, type: string } | null>(null)
    // useEffect(() => {
    //     if (info?.type === 'sell') {
    //         const { crypto } = info;

    //         // Verifica se o nome já está em sellExchange
    //         if (sellExchange.some(name => name === crypto)) {
    //             // Se estiver, remove o nome do array
    //             setSellExchange(sellExchange.filter(name => name !== crypto));
    //         } else {
    //             // Se não estiver, adiciona o nome ao array
    //             setSellExchange([...sellExchange, crypto]);
    //         }
    //     } else if (info) {
    //         const { crypto } = info;

    //         // Verifica se o nome já está em sellExchange
    //         if (buyExchange.some(name => name === crypto)) {
    //             // Se estiver, remove o nome do array
    //             setBuyExchange(buyExchange.filter(name => name !== crypto));
    //         } else {
    //             // Se não estiver, adiciona o nome ao array
    //             setBuyExchange([...sellExchange, crypto]);
    //         }
    //         setExchange(buyExchange)
    //     }
    // }, [info])

    return (
        <>
            <div className="border-x border-zinc-100 px-4">
                <div className="flex flex-col gap-4">
                    <HeaderBuy>
                        <button className="add-btn">Fazer busca</button>
                    </HeaderBuy>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative col-span-1 h-[52px] exchange-box rounded-md flex items-center">
                            <label htmlFor="buy-binance" className="absolute left-0 top-0 h-full w-full z-50">
                                <input name="buy-binance" type="checkbox" id="buy-binance" className="absolute right-2 top-2" />
                            </label>
                            <AddBtn
                                imagePath="binance"
                                cryptoText="binance"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <div className="flex flex-col gap-4">
                    <HeaderSell />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative col-span-1 h-[52px] exchange-box rounded-md flex items-center">
                            <label htmlFor="sell-binance" className="absolute left-0 top-0 h-full w-full z-50">
                                <input name="sell-binance" type="checkbox" id="sell-binance" className="absolute right-2 top-2" />
                            </label>
                            <AddBtn
                                imagePath="okx"
                                cryptoText="OKX"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="border-x border-zinc-100">
                <form
                    onSubmit={(e) => formSubmited(e)}
                    className="px-4 flex flex-col gap-2"
                >
                    <HeaderBuy>
                        <button className="add-btn">Enviar</button>
                    </HeaderBuy>
                    <ListCoin
                        array={buyExchange}
                    />
                    <div className="flex flex-col gap-6 px-4">
                        <h4 className="flex items-center gap-2 text-white font-bold">
                            <span>Mais populares</span>
                            <Image
                                src="/images/tria.png"
                                alt="Ícone de triângulo"
                                width={12}
                                height={12}
                            />
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'binance', type: 'buy' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm"
                            >
                                <Image
                                    src="/images/exchanges/binance.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">Binance</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'chiliz', type: 'buy' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm"
                            >
                                <Image
                                    src="/images/exchanges/chiliz.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">Chiliz</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'foxbit', type: 'buy' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm"
                            >
                                <Image
                                    src="/images/exchanges/foxbit.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">Foxbit</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'kucoin', type: 'buy' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm"
                            >
                                <Image
                                    src="/images/exchanges/kucoin.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">KuCoin</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'mb', type: 'buy' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm"
                            >
                                <Image
                                    src="/images/exchanges/mb.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">Mercado Bitcoin</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'okx', type: 'buy' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm"
                            >
                                <Image
                                    src="/images/exchanges/okx.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">OKX</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="border-r border-zinc-100 me-6">
                <form className="px-4 flex flex-col gap-2">
                    <HeaderSell />
                    <div className="flex flex-col gap-6 px-4">
                    </div>
                    <div className="flex flex-col gap-6 px-4">
                        <h4 className="flex items-center gap-2 text-white font-bold">
                            <span>Mais populares</span>
                            <Image
                                src="/images/tria.png"
                                alt="Ícone de triângulo"
                                width={12}
                                height={12}
                            />
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'binance', type: 'sell' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm"
                            >
                                <Image
                                    src="/images/exchanges/binance.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">Binance</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'chiliz', type: 'sell' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm">
                                <Image
                                    src="/images/exchanges/chiliz.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">Chiliz</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'foxbit', type: 'sell' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm">
                                <Image
                                    src="/images/exchanges/foxbit.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">Foxbit</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'kucoin', type: 'sell' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm">
                                <Image
                                    src="/images/exchanges/kucoin.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">KuCoin</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'mb', type: 'sell' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm">
                                <Image
                                    src="/images/exchanges/mb.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">Mercado Bitcoin</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setInfo({ crypto: 'okx', type: 'sell' })}
                                className="exchange-box rounded-lg text-white font-bold flex items-center gap-4 px-3 py-4 w-full text-sm">
                                <Image
                                    src="/images/exchanges/okx.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute left-4"
                                />
                                <span className="ps-12">OKX</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div> */}
        </>
    )
}