'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
    const router = useRouter()
    useEffect(() => {
        router.push('/usuario/entrar')
    }, [])
    return (
        <div className="bg-zinc-950"></div>
    )
}