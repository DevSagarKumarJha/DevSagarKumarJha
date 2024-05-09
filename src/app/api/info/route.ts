import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import AdminModel, { Admin } from "@/model/Admin";
import dbConnect from "@/lib/dbConnect";

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
    const { name, biodata, country, city } = await request.json();

    try {
        const updateAdminInfo = await AdminModel.findByIdAndUpdate(
            userId,
            {
                name,
                bio: biodata,
                country,
                city,
            },
            {
                new: true
            }
        )

        if (!updateAdminInfo) {
            return Response.json(
                {
                    success: false,
                    message: "Failed to update admin"
                },
                {
                    status: 402
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Biodata updated successfully"
            }, {
            status: 200,
        }
        )
    } catch (error) {
        console.log("Failed to update biodata")
        return Response.json(
            {
                success: false,
                message: "Failed to update bio data"
            },
            {
                status: 500
            }
        )
    }
}

export async function GET(request: Request) {
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

    try {
        const user = await AdminModel.findById(userId);

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                }, {
                status: 404
            }
            )
        }

        return Response.json(
            {
                success: true,
                
                user: user
            }, {
            status: 200
        }
        )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Unable to get user info",
            }, {
            status: 500
        }
        )
    }
}