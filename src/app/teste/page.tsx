import axios from "axios"

const getDataFromBinance = async () => {
    const data = await axios.get(`https://api.binance.com/api/v3/depth?symbol=CRVUSDT&limit=1`, {
        headers: {
            'X-MBX-APIKEY': 'DAnyPyBeJOhIyC6ntN3hpBo853CpGF2PfMzwADy1fGNDivra1FLI9XscusW5bc95'
        }
    }).then(async res => {
        const response = await res.data
        console.log(response)
        return response
    }).catch(e => {
        console.log(e)
        return e
    })

    return data
}

export default async function Teste() {
    const data = await getDataFromBinance()
    console.log('DATA', data)

    return (
        <div className="p-12">
            <h1 className="font-bold text-3xl">PÁGINA COM FINS DE TESTE</h1>
            <div className="">
                <p>Response</p>
                <p>{data.bids[0][0]}</p>
            </div>
        </div>
    )
}