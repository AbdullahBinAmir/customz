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

interface ForgetPassword {
  setforgetPassword: (value: boolean) => void
  setLoginView: (value: boolean) => void
}

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login: React.FC<ForgetPassword> = ({
  setforgetPassword,
  setLoginView,
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
    await medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh] my-10">
      {/* <div className="max-w-sm w-full flex flex-col items-center"> */}
      {/* <div className="flex flex-col justify-center w-3/4 pl-9 py-4"> */}
      <div className="flex justify-center items-center">
        <div className="w-full md:w-2/3">
          {isSubmitting && (
            <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <Spinner size={24} />
            </div>
          )}

          {/* <h1 className="text-large-semi uppercase mb-6">Welcome back</h1> */}
          <h2 className="text[#000000] text-[30px] font-extrabold leading-[45px] mb-12 text-center">
            Login to CustomZ
          </h2>
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
            </div>
            {authError && (
              <div>
                <span className="text-rose-500 w-full text-small-regular">
                  These credentials do not match our records
                </span>
              </div>
            )}

            <div className="flex justify-between mt-3">
              <div className="flex opacity-0">
                <input type="checkbox" />
                <p className="ml-2 text[#000000] text-[15px] font-light leading-[17.25px]">
                  Remember password
                </p>
              </div>

              <span
                className="text-[#000000] text-[15px] font-light leading-[17.25px] cursor-pointer"
                onClick={() => {
                  setLoginView(false), setforgetPassword(true)
                }}
              >
                Forgot Password ?
              </span>
            </div>
            {/* <Button className="mt-6">Enter</Button> */}
            <button className="w-full bg-blue-dark rounded-full mt-6 py-3">
              Login
            </button>
          </form>
          <div className="text-center mt-8">
            <span className="text-[#000] text-[16px] mt-6">
              Not Register yet?{" "}
              <button
                onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                className="ml-1 text-blue-dark underline"
              >
                Create an Account
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="relative invisible md:visible">
        <Image src="/customz.png" fill alt="register" />
      </div>
    </div>
  )
}

export default Login

{
  /* <div className="grid grid-cols-2 min-h-[100vh]">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
        <Spinner size={24} />
        </div>
      )}
      <div className="flex flex-col justify-between w-3/4 pl-9 py-4">
        <h2 className="text[#000000] text-[30px] font-extrabold leading-[45px]">Login to CustomZ</h2>
        <form onSubmit={onSubmit}>
          <div>
            <p className="text[#000000] text-xs font-normal leading-6">Enter email or user name</p>
            <input
              className="py-[14px] pl-[40px] mt-2 rounded-full w-full"
              placeholder="Enter email or user name"
              {...register("email", { required: "First name is required" })}
              autoComplete="given-name"
            />
          </div>
          <div>
            <p className="text[#000000] text-xs font-normal leading-6">Password</p>
            <input
              className="py-[14px] pl-[40px] mt-2 rounded-full w-full"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "First name is required" })}
              autoComplete="given-name"
            />
          </div>
          {authError && (
            <div className="my-2">
              <span className="text-[red]">
                These credentials do not match our records
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex">
              <input type="checkbox" />
              <p className="ml-2 text[#000000] text-[15px] font-light leading-[17.25px]">Remember password</p>
            </div>
            <p className="text[#000000] text-[15px] font-light leading-[17.25px]">Forgot Password?</p>
          </div>
          <div>
            <button className="w-full bg-blue-dark rounded-full py-3">Login</button>
          </div>
        </form>
        <div>
          <p className="text-center">Not Register yet?
            <button className="ml-1 text-blue-dark" onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}>Create an Account</button>
          </p>
        </div>
        <div className="flex items-center">
          <hr className="w-full" /> <span className="mx-9">or</span> <hr className="w-full" />
        </div>
        <div className="relative flex justify-evenly">
          <Image src='/register/google.png' width={148} height={61} alt='google' />
          <Image src='/register/twitter.png' width={60} height={60} alt='google' />
          <Image src='/register/apple.png' width={60} height={60} alt='google' />
        </div>
      </div>
      <div className="relative">
        <Image src='/register/register.png' fill alt="register" />
      </div>
    </div> */
}
