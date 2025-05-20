"use server"
import { RegisterSchema, SignInSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

interface ForgotPasswordResult {
  error?: string;
  password?: string | null;
  success?: boolean;
}

export async function handleForgotPassword(
  prevState: ForgotPasswordResult | null,
  formData: FormData
): Promise<ForgotPasswordResult> {
  try {
    const email = formData.get("email")?.toString();
    
    if (!email) {
      return { error: "Email is required" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { password: true }
    });

    if (!user) {
      return { error: "No account found with that email" };
    }

    return { password: user.password, success: true };
  } catch (error) {
    console.error("Error in handleForgotPassword:", error);
    return { error: "An error occurred. Please try again." };
  }
}

export const signInCredentials = async (prevState: unknown, formData: FormData) => {
    const validatedFields = SignInSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
            success: false
        };
    }

    const { email, password } = validatedFields.data;
    const redirectTo = formData.get('redirectTo')?.toString() || '/';

    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false, 
            redirectTo: redirectTo  
        });

        if (response?.error) {
            if (response.error === "CredentialsSignin") {
                return { 
                    message: "Invalid Credentials",
                    success: false 
                };
            }
            return { 
                message: "Something went wrong",
                success: false 
            };
        }

        return { 
            success: true,
            redirectTo: redirectTo
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { 
                        message: "Invalid Credentials",
                        success: false 
                    };
                default:
                    return { 
                        message: "Something went wrong",
                        success: false 
                    };
            }
        }
        throw error;
    }
};

export const signUpCredentials = async(prevState: unknown, formData: FormData) => {
    const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const {name, email, password} = validatedFields.data

    const hashedPassword = hashSync(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        return {
      success: true,
      message: "Registration successful"
    };
    } catch (error) {
        return {message: "Failed to register user"}
        throw error
    }
    redirect("/login")
}


