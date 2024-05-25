'use server'

import { NextResponse } from "next/server"
import { z } from "zod"
import { hash } from 'bcryptjs'
import mongoose from 'mongoose'


const registerRequestSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string()
})

import User from "@/models/User"

export async function POST(request: Request, context: any) {
    try {
        const data = await request.json()
        
        const { email, name, password } = registerRequestSchema.parse(data)
        
        const existingUser = await User.findOne({ email });
    
        if (existingUser !== null) {
            return NextResponse.json({
                error: "Usuário já existe."
            })
        }
    
        const password_hash = await hash(password, 6)
    
        const newUser = new User({
            name,
            email,
            password_hash
        })
    
        await newUser.save()

        return NextResponse.json({
            success: true,
            user: {
                email: newUser.email,
                name: newUser.name
            }
        })
    } catch(e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Erro ao registrar usuário'
        })
    }
}