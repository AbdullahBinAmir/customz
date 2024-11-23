import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import Image from "next/image"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("An error occured. Please try again.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>()

  // const onSubmit = handleSubmit(async (credentials) => {
  //   await medusaClient.customers
  //     .create(credentials)
  //     .then(() => {
  //       refetchCustomer()
  //       router.push("/account")
  //     })
  //     .catch(handleError)
  // })
  const onSubmit = handleSubmit(async (credentials) => {
    const res = medusaClient.auth.exists(credentials.email, {
      exists: true,
    })
    console.log("res", res)
    const userExist = Promise.resolve(res)

    userExist.then(async (value) => {
      if (value.exists === true) {
        return await setAuthError("User already exist")
      } else {
        await medusaClient.customers
          .create(credentials)
          .then(() => {
            refetchCustomer()
            router.push("/account")
          })
          .catch(handleError)
      }
    })
  })

  return (
    // <div className="max-w-sm flex flex-col items-center mt-12">
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh] my-10">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-full md:w-2/3">
          <h1 className="text[#000000] text-[30px] font-extrabold leading-[45px] mb-6 text-center">
            Signup to CustomZ
          </h1>
          {/* <p className="text-center text-base-regular text-gray-700 mb-4">
            Create your CustomZ Member profile, and get access to an enhanced shopping
            experience.
          </p> */}
          <form className="w-full flex flex-col" onSubmit={onSubmit}>
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label="First name"
                {...register("first_name", {
                  required: "First name is required",
                })}
                autoComplete="given-name"
                errors={errors}
              />
              <Input
                label="Last name"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                autoComplete="family-name"
                errors={errors}
              />
              <Input
                label="Email"
                {...register("email", { required: "Email is required" })}
                autoComplete="email"
                errors={errors}
              />
              <Input
                label="Phone"
                {...register("phone")}
                autoComplete="tel"
                errors={errors}
              />
              <Input
                label="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                autoComplete="new-password"
                errors={errors}
              />
            </div>
            {authError && (
              <div>
                <span className="text-rose-500 w-full text-small-regular">
                  {authError}
                </span>
              </div>
            )}
            <span className="text-center text-gray-700 text-small-regular mt-6">
              By creating an account, you agree to CustomZ&apos;s{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-of-use" className="underline">
                Terms of Use
              </Link>
              .
            </span>
            {/* <Button className="mt-6">Join</Button> */}
            <button className="w-full bg-blue-dark rounded-full mt-6 py-3">
              Register
            </button>
          </form>
          {/* <span className="text-center text-gray-700 text-small-regular mt-6">
            Already a member?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="underline"
            >
              Sign in
            </button>
            .
          </span> */}
          <div className="text-center mt-8">
            <span className="text-[#000] text-[16px] text-center mt-6">
              Not Register yet?{" "}
              <button
                onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                className="ml-1 text-blue-dark underline"
              >
                Login
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

export default Register
