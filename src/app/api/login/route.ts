import { NextResponse } from 'next/server'

export async function POST(request: Request, context: any) {
    const data = await request.json()
    

    return NextResponse.json({
        opa: true
    })
}