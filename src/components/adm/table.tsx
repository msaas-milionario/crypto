'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface UserProps {
    name: string
    email: string,
    status: boolean
}

interface TableProps {
    users: UserProps[]
}

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

type registerSchemaType = z.infer<typeof registerSchema>

export function Table({ users }: TableProps) {
    const { register, handleSubmit, reset } = useForm<registerSchemaType>({
        resolver: zodResolver(registerSchema)
    })
    const router = useRouter()
    const [data, setData] = useState(users)
    const [tableData, setTableData] = useState(data)
    const [message, setMessage] = useState<string>('')
    const [newUserForms, setNewUserForms] = useState<boolean>(false)
    const [modal, setModal] = useState<number | null>()

    // async function formSubmited(email: string, status: boolean, index: number) {
    //     setMessage('')

    //     const dataBack = {
    //         email,
    //         status
    //     }

    //     await axios.post('http://localhost:3000/api/f0fde595-6d77-479a-97f4-246d148eaad4/update-status', dataBack, {
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => {
    //         const response = res.data
    //         if (response.success) {
    //             let hlp: any = data
    //             hlp[index].status = !status
    //             setData(hlp)
    //             router.refresh()
    //         }
    //     }).catch(e => console.log(e))
    // }

    useEffect(() => {
        setTableData(data)
    }, [data])

    async function newUser(dataNewUser: registerSchemaType) {
        await axios.post('https://app.arbitfy.com.br/api/register', dataNewUser, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => {
            const response = res.data

            if (response.error) {
                setMessage(response.error)
                return
            }
            reset()
            setMessage('Usuário adicionado com sucesso')
            setNewUserForms(false)


            let hlp = tableData
            hlp.unshift(response.user)
            setTableData(hlp)

        }).catch(e => console.log(e))
    }

    async function excludeUser(email: string) {
        const excludeUserData = {
            email
        }
        await axios.post('https://app.arbitfy.com.br/api/f0fde595-6d77-479a-97f4-246d148eaad4/delete-user', excludeUserData, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                const response = res.data

                if (response.error) {
                    return
                }
                let hlp = tableData
                hlp = hlp.filter(user => user.email !== email)
                console.log(hlp)

                setTableData(hlp)
                setModal(null)
                router.refresh()

            }).catch(e => console.log(e))
    }

    return (
        <div className="w-full border-2 border-zinc-800 bg-zinc-900 rounded px-8 py-6">
            <div className="grid grid-cols-5 gap-4 text-zinc-300 font-semibold border-b border-zinc-400 px-4 py-6">
                <p>Name</p>
                <p className="col-span-2">Email</p>
                <p>Status</p>
                <p>Ação</p>
            </div>
            {tableData.filter(user => user.name !== 'adm login').map((user, index) => (
                <div key={index} className="relative grid grid-cols-5 items-center gap-4 text-zinc-300 font-semibold border-b border-zinc-400 px-4 py-6">
                    <p>{user.name}</p>
                    <p className="col-span-2">{user.email}</p>
                    {/* <p>{user.status ? 'Ativo' : 'Desativado'}</p> */}
                    <div className="">
                        <button onClick={() => {
                            if (index === modal) {
                                setModal(null)
                            } else {
                                setModal(index)
                            }
                        }}>
                            <svg className="w-4 h-4 fill-zinc-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" /></svg>
                        </button>
                        {modal === index && (
                            <div className="absolute right-16 bottom-5 flex flex-col bg-zinc-700 border border-zinc-600 rounded overflow-hidden">
                                {/* <button
                                    className="flex justify-center border border-none outline-none px-6 hover:bg-zinc-900 py-1 text-sm"
                                    onClick={() => {
                                        setModal(null)
                                        formSubmited(user.email, user.status, index)
                                    }}
                                >
                                    <span>{user.status ? 'Desativar' : 'Ativar'}</span>
                                </button> */}

                                <button
                                    className="flex justify-center border border-none outline-none px-6 hover:bg-zinc-900 py-1 text-sm"
                                    onClick={() => {
                                        excludeUser(user.email)
                                    }}
                                >Excluir</button>

                            </div>
                        )}
                    </div>
                </div>
            ))}
            {newUserForms ? (
                <form
                    onSubmit={handleSubmit(newUser)}
                    className="grid grid-cols-5 items-center gap-4 px-4 py-6"
                >
                    <div className="flex flex-col gap-1">
                        <label className="text-zinc-200 text-sm">Nome:</label>
                        <input
                            {...register('name')}
                            type="text"
                            className="w-full inpt"
                            placeholder="Digite aqui..."
                        />

                    </div>
                    <div className="flex flex-col col-span-2 gap-1">
                        <label className="text-zinc-200 text-sm">E-mail:</label>
                        <input
                            {...register('email')}
                            type="text"
                            className="w-full inpt"
                            placeholder="exemplo@gmail.com"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-zinc-200 text-sm">Senha:</label>
                        <input
                            {...register('password')}
                            type="password"
                            className="w-full inpt"
                            placeholder="******"
                        />
                    </div>
                    <div className=" flex items-center translate-y-3">
                        <button
                            className="w-32 text-white transition hover:bg-white hover:text-black flex justify-center border p-2 rounded-md"
                        >Adicionar</button>
                    </div>
                </form>
            ) : (
                <div className="flex items-center justify-center pt-12 pb-6">
                    <button
                        className="px-12 text-white hover:bg-white hover:text-black transition flex justify-center border p-2 rounded"
                        onClick={() => {
                            setNewUserForms(true)
                            setMessage('')
                        }}
                    >Adicionar novo usuário</button>
                </div>
            )}
            {message && (
                <p className="text-zinc-200 text-center">{message}</p>
            )}
        </div>
    )
}