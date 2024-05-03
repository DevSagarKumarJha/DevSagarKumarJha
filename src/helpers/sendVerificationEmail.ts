import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
    email: string,
    name: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Portfolio Admin | Email verification code',
            react: VerificationEmail({ name, otp: verifyCode }),
        })

        return {
            success: true,
            message: `Sent verification email check your inbox ${email}`
        }
    } catch (emailError) {
        console.log("Error sending verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email"
        }
    }
}