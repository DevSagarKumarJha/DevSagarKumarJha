import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import AdminModel, { Admin } from "@/model/Admin";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request){
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
    const { skill } = await request.json();

    try {
        const user = await AdminModel.findById(userId);

        if(!user){
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

        user.skills.push(skill);
        await user.save()

        return Response.json(
            {
                success: true,
                message: "New skill added successfully"
            },{
                status: 201
            }
        )
    } catch (error) {
        console.log("Skill adding failed", error)
        return Response.json(
            {
                success: false,
                message: "Adding skills failed"
            },
            {
                status: 500
            }
        )
    }


}