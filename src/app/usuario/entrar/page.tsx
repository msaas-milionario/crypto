'use client'

import { FormControl } from "@/components/form-control";
import Image from "next/image";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from "axios";

const loginSchema = z.object({
    email: z.string().email('Formato de email inválido'),
    password: z.string().min(6)
})

type loginSchemaType = z.infer<typeof loginSchema>

export default function Page() {
    const { register, handleSubmit } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema)
    })

    async function formSubmited(data: loginSchemaType) {
        await axios.post('http://localhost:3000/api/login', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => {
                const response = res.data

                console.log(response)
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
                <button className="font-bold py-3 text-center rounded-lg bg-orange text-white">Entrar</button>
            </div>
        </form>
    )
}