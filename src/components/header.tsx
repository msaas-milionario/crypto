'use client'

import Image from "next/image";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export function Header() {
    const [name, setName] = useState<string>('')

    useEffect(() => {
        const { arbitfy } = parseCookies()
        setName(JSON.parse(arbitfy).name)
    }, [])

    return (
        <div className="w-full flex justify-between items-center mt-12">
            <div className="w-48 translate-x-12">
                <Image
                    src="/images/logo.png"
                    alt="Imagem de fundo"
                    width={518}
                    height={133}
                    className=""
                />
            </div>
            <h4 className="text-white -translate-x-12 text-2xl uppercase">Bem vindo <span className="font-semibold">{name}</span></h4>
        </div>
    )
}