'use client'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { setCookie } from 'nookies'

// 8fa261d1201946bcbc5fc8fd31c82d98

const admLogin = z.object({
    email: z.string(),
    // password: z.string().min(31)
    password: z.string().min(1)
})

type admLoginType = z.infer<typeof admLogin>

export default function Page() {
    const [error, setError] = useState('')
    const router = useRouter()
    const { register, handleSubmit } = useForm<admLoginType>({
        resolver: zodResolver(admLogin)
    })

    async function formSubmited({ password, email }: admLoginType) {
        setError('')
        await axios.post('http://localhost:3000/api/f0fde595-6d77-479a-97f4-246d148eaad4', { password, email }, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            }
        })
            .then(res => {
                const response = res.data
                console.log(response)
                if (response.success) {
                    setCookie(null, 'arbitfy', JSON.stringify(response.user), {
                        path: '/',
                        sameSite: true,
                    })

                    router.push('/adm/dash')

                    return
                }
                setError(response.message)
            }).catch(e => console.log(e))
    }

    return (
        <div className="bg-zinc-950 h-screen w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit(formSubmited)}
                className="bg-zinc-900 p-12 rounded-xl flex flex-col items-center gap-2 text-center"
            >
                <div className="w-32 z-50 mb-8">
                    <Image
                        src="/images/logo.png"
                        alt="Imagem de fundo"
                        width={518}
                        height={133}
                        className=""
                    />
                </div>
                <input
                    type="text"
                    className="py-2 inpt"
                    {...register('email')}
                />
                <input
                    type="password"
                    className="py-2 inpt"
                    {...register('password')}
                />
                <button className="w-full add-btn">Enviar</button>
                <span className="text-center text-red-400">{error}</span>
            </form>
        </div>
    )
}