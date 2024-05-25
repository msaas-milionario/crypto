'use client'

import { FormControl } from "@/components/form-control";
import Image from "next/image";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from 'nookies'

const loginSchema = z.object({
    email: z.string().email('Formato de email inválido'),
    password: z.string().min(6)
})

type loginSchemaType = z.infer<typeof loginSchema>

export default function Page() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()
    const { register, handleSubmit } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema)
    })

    async function formSubmited(data: loginSchemaType) {
        setLoading(true)
        setError('')
        // 
        await axios.post('https://crypto-jade-nine.vercel.app/api/login', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => {
                const response = res.data
                setLoading(false)

                if (response.error) {
                    setError(response.error)
                    return
                }

                setError('')
                setCookie(null, 'arbitfy', JSON.stringify({ name: response.user.name, email: response.user.email }), {
                    path: '/',
                })
                router.push("/app/dash")

            }).catch(e => console.log(e))
    }

    useEffect(() => {
        const { arbitfy } = parseCookies()
        if (typeof arbitfy !== 'undefined') {
            router.push("/app/dash")
            return
        }
    }, [])

    return (
        <form
            onSubmit={handleSubmit(formSubmited)}
            className=""
        >
            <div className="flex flex-col gap-3 items-center text-white">
                <Image
                    src="/images/profile.png"
                    alt="Imagem de perfil em branco"
                    width={60}
                    height={60}
                />
                <h2 className="font-semibold text-3xl">Bem vindo!</h2>
            </div>
            <div className="flex flex-col gap-4">
                <FormControl
                    label="E-mail"
                >
                    <input
                        {...register('email')}
                        type="text"
                        className="inpt"
                    />
                </FormControl>
                <FormControl
                    label="Senha"
                >
                    <input
                        {...register('password')}
                        type="password"
                        className="inpt"
                    />
                </FormControl>
                <button className="font-bold py-3 text-center flex justify-center rounded-lg bg-orange text-white">
                    {loading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : <span>Entrar</span>}
                </button>
                <p className="text-red-400 text-center">{error}</p>
            </div>
        </form>
    )
}