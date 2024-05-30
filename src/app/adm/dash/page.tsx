import { Table } from "@/components/adm/table"
import { Loading } from "@/components/loading-adm"
import axios from "axios"
import { cookies } from "next/headers"
import Image from "next/image"
import { Suspense } from "react"

const getData = async () => {
    const cookie = cookies()
    const arbitfyCookie = cookie.get('arbitfy') || { value: '{}' }
    const arbitfy = JSON.parse(arbitfyCookie.value)

    if (arbitfy.email !== 'admlogin@otaviano.com')
        return {
            success: false,
            message: 'Unauthorized'
        }

    const response = await axios.get('https://app.arbitfy.com.br/api/f0fde595-6d77-479a-97f4-246d148eaad4')

    return {
        users: response.data.users,
        success: true
    }
}

export default async function Page() {
    const data = await getData()

    if (!data?.success) {
        return <>Acesso negado</>
    }

    return (
        <div className="h-screen w-full bg-zinc-950 flex items-center justify-center">
            <Loading />
            <div className="w-full max-w-6xl p-12 flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                    <div className="w-24">
                        <Image
                            src="/images/logo.png"
                            alt="Imagem de fundo"
                            width={518}
                            height={133}
                            className=""
                        />
                    </div>
                    <h1 className="text-white font-bold text-2xl">Painel Administrativo</h1>
                </div>
                <Suspense fallback={<span>Carregando...</span>}>
                    {data.success && (
                        <Table
                            users={data.users.reverse()}
                        />
                    )}
                </Suspense>
            </div>
        </div>
    )
}