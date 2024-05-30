import User from "@/models/User"
import { NextResponse } from "next/server"
import { z } from "zod"

const updateUserStatus = z.object({
    email: z.string(),
    status: z.boolean()
})

export async function POST(request: Request, context: any) {
    try {
        const data = await request.json();
        const { email, status } = updateUserStatus.parse(data);

        const result = await User.updateOne({ email }, { $set: { status: !status } });

        return NextResponse.json({
            success: true,
            message: "User status updated successfully"
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Error'
        }, { status: 400 });
    }
}