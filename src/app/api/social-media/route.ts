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

    const userId = user._id;
    const { name, url } = await request.json();

    try {
        const user = await AdminModel.findById(userId);

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        }

        const newSocialLinks = {
            name,
            url
        }
        user.socials.push(newSocialLinks as SocialLinks);
        await user.save()

        return Response.json(
            {
                success: true,
                message: "New Social link added successfully"
            }, {
            status: 201
        }
        )
    } catch (error) {
        console.log("Skill adding failed", error)
        return Response.json(
            {
                success: false,
                message: "Adding certificate failed"
            },
            {
                status: 500
            }
        )
    }
}

