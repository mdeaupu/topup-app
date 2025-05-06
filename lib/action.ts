"use server"
import { RegisterSchema, SignInSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const signInCredentials = async (prevState: unknown, formData: FormData) => {
    const validatedFields = SignInSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        };
    }

    const { email, password } = validatedFields.data;
    const redirectTo = formData.get('redirectTo')?.toString() || '/';

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: redirectTo  
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Invalid Credentials" };
                default:
                    return { message: "Something went wrong" };
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
    } catch (error) {
        return {message: "Failed to register user"}
        throw error
    }
    redirect("/login")
}


