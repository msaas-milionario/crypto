'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export function Loading() {
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        const { arbitfy } = parseCookies()
        const data = JSON.parse(arbitfy)
        if (typeof arbitfy === 'undefined' || data.name !== 'adm login') {
            router.push("/usuario/entrar")
            return
        }
        setLoading(false)
    }, [])

    return (
        <div className={`fixed top-0 left-0 w-full h-screen bg-zinc-950/90 flex flex-col gap-4 items-center justify-center ${loading ? 'z-50' : '-z-50'}`}>
            <div className="w-32 animate-pulse">
                <Image
                    src="/images/logo.png"
                    alt="Imagem de fundo"
                    width={518}
                    height={133}
                    className=""
                />
            </div>
        </div>
    )
}