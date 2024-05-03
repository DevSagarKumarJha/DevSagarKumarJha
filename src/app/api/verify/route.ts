import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/Admin";

export async function POST(request:Request){
    await dbConnect();

    try {
        const {adminId, code} = await request.json();
        const decodedAdminId = decodeURIComponent(adminId);

        const user = await AdminModel.findOne({adminId: decodedAdminId});

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            }
            )
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Verification code has expired please register again"
            }, {
                status: 400
            }
            )
        }

        if(!isCodeValid){
            return Response.json({
                success: false,
                message: "Invalid verification code"
            }, {
                status: 403
            }
            )
        }

        user.isVerified = true;
        await user.save();

        return Response.json({
            success: true,
            message: "Code Verification successful"
        }, {
            status: 200
        }
        )
    } catch (error) {
        console.error("Error verifying user", error)
        return Response.json({
            success: false,
            message: "Error verifying user"
        }, {
            status: 500
        });
    }
}