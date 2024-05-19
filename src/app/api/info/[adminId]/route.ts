import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/Admin";

export async function GET(request: Request, { params }: { params: { adminId: string } }) {
    const adminId = params.adminId;

    await dbConnect();

    try {
        const user = await AdminModel.findOne({ adminId: adminId });
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