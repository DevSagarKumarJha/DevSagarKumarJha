import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import AdminModel, { Admin, Certificate } from "@/model/Admin";
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
    const { name, issuingOrganization, credentialId, img, credentialUrl, issueDate, expiryDate, createdAt } = await request.json();

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

        const newCertificate = {
            name,
            issuingOrganization,
            credentialId,
            img,
            credentialUrl,
            issueDate,
            expiryDate,
            createdAt
        }
        user.certificates.push(newCertificate as Certificate);
        await user.save()

        return Response.json(
            {
                success: true,
                message: "New certificate added successfully"
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
