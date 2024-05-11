import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import AdminModel, { Admin, SocialLinks } from "@/model/Admin";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    const user: Admin = session?.user as Admin;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "UnAuthenticated User",
            }, {
            status: 401
        }
        )
    }

    await dbConnect();

    const userId = new mongoose.Types.ObjectId(user._id);

    const { imgurl } = await request.json();

    try {
        const user = await AdminModel.findByIdAndUpdate(userId, {imgurl: imgurl})

        if (!user) {
            return Response.json(
                { message: 'User not found', success: false },
                { status: 404 }
            );
        }

        return Response.json(
            { message: 'Profile pic changed successfully', success: true },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}