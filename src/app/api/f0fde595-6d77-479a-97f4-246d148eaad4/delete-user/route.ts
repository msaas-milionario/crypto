import User from "@/models/User"
import { NextResponse } from "next/server"
import { z } from "zod"

const deleteUserStatus = z.object({
    email: z.string(),
})

export async function POST(request: Request, context: any) {
    try {
        const data = await request.json();
        const { email } = deleteUserStatus.parse(data);

        await User.deleteOne({ email });

        return NextResponse.json({
            success: true,
            message: "User status deleted successfully"
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Error'
        }, { status: 400 });
    }
}