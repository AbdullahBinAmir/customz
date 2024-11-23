import { useState } from "react"
import { useForm } from "react-hook-form"
import Input from "@modules/common/components/input"
import ArrowRight from "@modules/common/icons/arrow-right"
import Link from "next/link"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { postSubscriptionEmail } from "@lib/data"
import { toast } from "react-toastify"

type FormValues = {
  email: string
}

const Subscribe = () => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const intialFormData = {
    email: "",
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      email: data.email,
    }

    const res = await postSubscriptionEmail(payload)

    if (res?.status === 201) {
      toast.success("You have successfully subscribed to CustomZ")
    } else {
      toast.success(res?.data.message)
    }

    reset(intialFormData)
    setSubmitting(false)
  })

  return (
    <div className="md:content-container">
      <div className="grid grid-cols-1 md:grid-cols-3 md:mx-[71px] mt-[177px] mb-[119px] bg-blue-dark px-10 md:px-[75px] pt-[33px] pb-[48px] md:rounded-[20px]">
        <div className="col-span-1 pt-2">
          <h6 className="text-[#434343] text-[28px] md:text-[35px] text-center md:text-start font-semibold">
            Be proactive to Maximize Your Chances and Enter Your E-mail
          </h6>
        </div>
        <div className="col-span-2 md:flex">
          <div className="md:pr-6 md:py-5 flex flex-col justify-between">
            <p className="text-[#434343] text-[12px] md:text-[16px] font-normal leading-5 md:leading-6 text-center md:text-start mt-3 md:mt-0">
              As Part of The CustomZ Family; You Will Enjoy Special Discounts
              and Early Access to Any Updates. Subscribe For Exclusive Benefits.
            </p>
            <div className="mt-2 md:mt-0">
              <p className="flex items-center gap-2 text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>{" "}
                <Link href="mailto:support@customz.shop">
                  support@customz.shop
                </Link>
              </p>
              <p className="flex items-center gap-2 text-[16px] text-[#2C3E50] mt-2 mb-4 md:mb-0 font-normal leading-6 tracking-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <Link href="tel:+20 100 006 2247">+20 100 006 2247</Link>
              </p>
            </div>
            {/* <input
              className="rounded-[10px] py-3 pl-9 mt-4 w-full"
              placeholder="Enter your email"
            /> */}
            <Input
              style={{ backgroundColor: "white" }}
              // className="bg-white w-full"
              label="First Name"
              {...register("email", {
                required: "First name is required",
              })}
              required
              errors={errors}
            />
          </div>
          <div className="md:flex flex-col justify-end py-5">
            {/* <button className="flex items-center bg-[#FFF] px-14 py-3 rounded-full mx-auto md:mx-0">
              <span className="pr-2">Subscribe</span> <ArrowRight />
            </button> */}
            <Button
              variant="custom-address"
              className="min-h-0 xsmall:max-w-40 bg-white hover:bg-white hover:shadow w-full"
              onClick={submit}
              disabled={submitting}
            >
              {submitting ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
