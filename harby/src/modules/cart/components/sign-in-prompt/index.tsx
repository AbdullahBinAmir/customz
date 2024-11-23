import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex flex-col small:flex-row items-start justify-between p-5 rounded-t-lg">
      <div>
        <h2 className="text-xl-semi">Already have an account?</h2>
        <p className="text-base-regular text-gray-700 mt-2">
          Sign in for a better experience.
        </p>
      </div>
      <div className="mt-4 small:mt-0">
        <Link href="/account/login">
          <Button
            variant="custom-address"
            className="bg-blue-dark py-2 px-8 rounded-full"
          >
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
