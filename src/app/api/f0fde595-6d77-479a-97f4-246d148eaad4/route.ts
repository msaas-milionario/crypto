import { NextResponse } from 'next/server'
import { z } from 'zod'
import { compare } from 'bcryptjs'
import User from '@/models/User'

const admLogin = z.object({
    email: z.string(),
    // password: z.string().min(31)
    password: z.string().min(1)
})

export async function POST(request: Request, context: any) {
    const data = await request.json()

    const { email, password } = admLogin.parse(data)

    if (email !== 'admlogin@otaviano.com') {
        return NextResponse.json({
            message: 'Unauthorized'
        })
    }

    const doesUserExists = await User.findOne({ email })

    if (doesUserExists === null) {
        return NextResponse.json({
            message: 'Unauthorized'
        })
    }

    const doesPasswordMatches = await compare(password, doesUserExists.password_hash)
    
    if (!doesPasswordMatches) {
        return NextResponse.json({
            message: 'Unauthorized'
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
export async function GET(request: Request, context: any) {
    const users = await User.find()

    console.log(users)

    return NextResponse.json({
        
    })
}

