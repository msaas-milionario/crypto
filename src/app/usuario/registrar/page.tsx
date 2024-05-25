'use client'

import { FormControl } from "@/components/form-control";
import Image from "next/image";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from "axios";
import { useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

type registerSchemaType = z.infer<typeof registerSchema>

export default function Page() {
    const [error, setError] = useState<string>('')
    const router = useRouter()
    const { register, handleSubmit } = useForm<registerSchemaType>({
        resolver: zodResolver(registerSchema)
    })

    async function formSubmited(data: registerSchemaType) {
        setError('')
        await axios.post('https://crypto-beige-three.vercel.app/api/register', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => {
            const response = res.data

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
                    label="Nome"
                >
                    <input
                        {...register('name')}
                        type="text"
                        className="inpt"
                    />
                </FormControl>
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
                <button className="font-bold py-3 text-center rounded-lg bg-orange text-white">Criar conta</button>
            </div>
        </form>
    )
}