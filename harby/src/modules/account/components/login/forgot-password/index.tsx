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

interface ForgetPass {
  setforgetPassword: (value: boolean) => void
  setResetPassword: (value: boolean) => void
}

interface SignInCredentials extends FieldValues {
  email: string
}

const ForgetPassword: React.FC<ForgetPass> = ({
  setforgetPassword,
  setResetPassword,
}) => {
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
    await medusaClient.customers
      .generatePasswordToken(credentials)
      .then(() => {
        // alert('Succesfull')
        setforgetPassword(false)
        setResetPassword(true)
        // refetchCustomer()
        // router.push("/account")
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

          {/* <h1 className="text-large-semi uppercase mb-6">Welcome back</h1> */}
          <h2 className="text[#000000] text-[30px] font-extrabold leading-[45px] text-center md:text-start">
            Forget Password
          </h2>
          <p className="text-[#000000] text-[15px] font-light mt-2 mb-14">
            Enter your email, and we&apos;ll send you a password reset link.
            This may take a few minutes!
          </p>
          <form className="w-full" onSubmit={onSubmit}>
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label="Email"
                {...register("email", { required: "Email is required" })}
                autoComplete="email"
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
            <button className="w-full bg-blue-dark rounded-full mt-6 py-3">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="relative invisible md:visible">
        <Image src="/customz.png" fill alt="register" />
      </div>
    </div>
  )
}

export default ForgetPassword
