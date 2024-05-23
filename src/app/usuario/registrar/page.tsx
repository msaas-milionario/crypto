'use client'

import { FormControl } from "@/components/form-control";
import Image from "next/image";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from "axios";

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

type registerSchemaType = z.infer<typeof registerSchema>

export default function Page() {
    const { register, handleSubmit } = useForm<registerSchemaType>({
        resolver: zodResolver(registerSchema)
    })

    async function formSubmited(data: registerSchemaType) {
        console.log(data)
        await axios.post('http://localhost:3000/api/register', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
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