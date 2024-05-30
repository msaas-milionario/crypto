import { NextResponse } from 'next/server'
import { z } from 'zod'
import { compare } from 'bcryptjs'
import User from '@/models/User'

const loginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export async function POST(request: Request, context: any) {
    const data = await request.json()

    const { email, password } = loginRequestSchema.parse(data)

    const doesUserExists = await User.findOne({ email })

    console.log(doesUserExists)

    if (doesUserExists === null) {
        return NextResponse.json({
            error: "Email ou senha inválidos."
        })
    }

    const doesPasswordMatches = await compare(password, doesUserExists.password_hash)
    
    if (!doesPasswordMatches) {
        return NextResponse.json({
            error: "Email ou senha inválidos."
        })
    }

    return NextResponse.json({
        success: true,
            user: {
                email: doesUserExists.email,
                name: doesUserExists.name
            }
    })
}