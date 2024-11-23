"use client"

import { useAccount } from "@lib/context/account-context"
import Register from "@modules/account/components/register"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Login from "../components/login/login"
import ForgetPassword from "../components/login/forgot-password"
import ResetPassword from "../components/login/reset-password"

interface ForgetPassword {
  setforgetPassword: (value: boolean) => void;
  setLoginView: (value: boolean) => void;
}

const LoginTemplate = () => {
  const [forgetPassword, setforgetPassword] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)
  const [loginv, setLoginView] = useState(true)

  const { loginView, customer, retrievingCustomer } = useAccount()
  const [currentView, _] = loginView

  const router = useRouter()

  useEffect(() => {
    if (!retrievingCustomer && customer) {
      router.push("/account")
    }
  }, [customer, retrievingCustomer, router])

  return (
    // <div className="w-full flex justify-center py-24">
    <div className="content-container">
      {currentView === "sign-in" ? (
        loginv ? (
          <Login setLoginView={setLoginView} setforgetPassword={setforgetPassword} />
        ) : forgetPassword ? (
          <ForgetPassword setforgetPassword={setforgetPassword} setResetPassword={setResetPassword} />
        ) : resetPassword ? (
          <ResetPassword setResetPassword={setResetPassword} setLoginView={setLoginView}/>
        ) : null
      ) : (
        <Register />
      )}
    </div>
  )
}

export default LoginTemplate
