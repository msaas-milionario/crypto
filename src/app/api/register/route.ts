import { NextResponse } from "next/server"
import { z } from "zod"

const registerRequestSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string()
})

export async function POST(request: Request, context: any) {
    console.log('aqui2')
    
    console.log('aqui')

    // const client = await clientPromise
    // const db = client.db('BASEDEDADOS')
    
    // const db = client.db('BASEDEDADOS')
    
    
    const data = await request.json()
    
    const { email, name, password } = registerRequestSchema.parse(data)
    
    // const data = await 

    // Find user with same email
    // const user = await db.collection('arbitfy').findOne({ email: { email } })
    // console.log(user)    

    // Bcryptjs -> password hash

    // Returns user data

    return NextResponse.json({
        opa: true
    })
}