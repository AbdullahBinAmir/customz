import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import Image from "next/image"
import Link from "next/link"

interface ResetPass {
    setResetPassword: (value: boolean) => void;
    setLoginView: (value: boolean) => void;
}

interface SignInCredentials extends FieldValues {
    email: string
    password: string
    token: string
}

const ResetPassword: React.FC<ResetPass> = ({setResetPassword, setLoginView}) => {
    const { loginView, refetchCustomer } = useAccount()
    const [_, setCurrentView] = loginView
    const [authError, setAuthError] = useState<string | undefined>(undefined)
    const router = useRouter()

    const handleError = (_e: Error) => {
        setAuthError("Invalid email or password")
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInCredentials>()

    const onSubmit = handleSubmit(async (credentials) => {
        await medusaClient.customers.resetPassword(credentials)
            .then(() => {
                // setforgetPassword(false)
                setResetPassword(false)
                setLoginView(true)
                refetchCustomer()
                // router.push("/account/login")
            })
            .catch(handleError)
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh] my-10">
            <div className="flex justify-center items-center">
                <div className="w-full md:w-2/3">
                    {isSubmitting && (
                        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                            <Spinner size={24} />
                        </div>
                    )}
                    <h2 className="text[#000000] text-[30px] font-extrabold leading-[45px] text-center md:text-start mb-12">Reset Password</h2>
                    <form className="w-full" onSubmit={onSubmit}>
                        <div className="flex flex-col w-full gap-y-2">
                            <Input
                                label="Email"
                                {...register("email", { required: "Email is required" })}
                                autoComplete="email"
                                errors={errors}
                            />
                            <Input
                                label="Password"
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                autoComplete="current-password"
                                errors={errors}
                            />
                            <Input
                                label="Token"
                                {...register("token", { required: "Token is required" })}
                                type="password"
                                // autoComplete="current-password"
                                errors={errors}
                            />
                        </div>
                        {authError && (
                            <div>
                                <span className="text-rose-500 w-full text-small-regular">
                                    Email does not exist
                                </span>
                            </div>
                        )}
                        <button className="w-full bg-blue-dark rounded-full mt-6 py-3">Reset Password</button>
                    </form>
                </div>
            </div>
            <div className="relative invisible md:visible">
                <Image src='/login/register.png' fill alt="register" />
            </div>
        </div>
    )
}

export default ResetPassword
