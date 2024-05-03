import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/Admin";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, adminId, phone, email, password } = await request.json();
        const existingVerifiedWithAdminId = await AdminModel.findOne(
            {
                adminId,
                isVerified: true,
            }
        )

        if (existingVerifiedWithAdminId) {
            return Response.json(
                {
                    success: false,
                    message: "User with adminId is already exists"
                }
            )
        }

        const existingAdminByEmail = await AdminModel.findOne({ email });
        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

        if (existingAdminByEmail) {
            if (existingAdminByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User with email is already exists"
                    },
                    {
                        status: 402
                    }
                );
            }
            else {
                existingAdminByEmail.password = await bcrypt.hash(password, 10);
                existingAdminByEmail.verifyCode = verifyCode;
                existingAdminByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                existingAdminByEmail.save();
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new AdminModel({
                name,
                adminId,
                imgurl: "",
                email,
                phone,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                messages: [],
                blogs: [],
                projects:[],
            })

            await newUser.save();
        }
        const emailResponse = await sendVerificationEmail(
            email,
            name,
            verifyCode
        )

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 402
            });
        }

        return Response.json({
            success: true,
            message: "User registration successful. Please verify email"
        }, {
            status: 201,
        });
    } catch (error) {
        console.error('Error registering user', error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}