"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"

import { toast } from "react-toastify"

import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"
import Spinner from "@modules/common/icons/spinner"
import { convertBase64Img, postBulkOrder } from "@lib/data"
import X from "@modules/common/icons/x"

type FormValues = {
  first_name: string
  last_name: string
  phone: string
  email: string
  type: string
  material: string
  color: string
  size: string
  qty: string
  print_technique: string
  address: string
  desc: string
  img: string
  status: string
}

const BulkOrder = () => {
  const intialFormData = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    type: "",
    material: "",
    color: "",
    size: "",
    qty: "",
    print_technique: "",
    address: "",
    desc: "",
    img: "",
  }

  const [submitting, setSubmitting] = useState(false)
  const [imgUrl, setImgUrl] = useState("")
  const [base64Img, setBase64Img] = useState("")
  const [error, setError] = useState<string | undefined>(undefined)

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImgUrl(previewUrl)

      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64 = reader.result as string
          const res = await convertBase64Img(base64)
          setBase64Img(res.fileURL)
        } catch (error) {
          console.error("Error processing image:", error)
        }
      }
      reader.readAsDataURL(file)
    }
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
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      type: data.type,
      material: data.material,
      color: data.color,
      size: data.size,
      qty: data.qty,
      print_technique: data.print_technique,
      address: data.address,
      desc: data.desc,
      img: base64Img,
      status: "pending",
    }

    const res = await postBulkOrder(payload)

    if (res?.status === 201) {
      setImgUrl("")
      toast.success(res.data.message)
    } else {
      toast.error(res?.data.message)
    }

    reset(intialFormData)
    setSubmitting(false)
  })

  return (
    <div className="max-w-3xl mx-4 xsmall:m-auto">
      <div className="text-center">
        <h1 className="text-[#48C0D0] text-2xl font-semibold mt-8">
          Bulk Order
        </h1>
        <p className="text-sm text-gray-500 mt-4 mb-4">
          Welcome to Customz ! We are delighted to offer tailored solutions for
          bulk orders. Whether you&apos;re outfitting a team, orchestrating an
          event, or celebrating a milestone as seniors in high school,
          we&apos;re here to ensure your bulk purchase is both seamless and
          exceptional.
        </p>
        <h2 className="text-[#48C0D0] text-lg font-medium">
          For Orders Exceeding 150 Units
        </h2>
        <p className="text-sm text-gray-500 mt-2 mb-4">
          Large orders deserve special attention, and at Customz, we’re
          committed to providing just that. To best serve your needs and deliver
          top-notch service. Simply fill in your details below, and one of our
          dedicated representatives will contact you. We will discuss your
          specific requirements, provide a detailed quote, and guide you through
          the ordering process from start to finish
        </p>
        <h2 className="text-[#48C0D0] text-lg font-medium">
          Here’s What to Expect
        </h2>
        <ul className=" list-disc pl-8 text-sm text-gray-500 mt-2 mb-4 text-start">
          <li className="pl-2">
            Personal Consultation: A dedicated representative will reach out to
            ensure your order aligns perfectly with your expectations.
          </li>
          <li className="pl-2">
            Custom Quotes: Receive a tailored quote that meets the specific
            needs of your group or event.
          </li>
          <li className="pl-2">
            Expert Guidance: We’ll assist you every step of the way, from design
            selection to final delivery.
          </li>
        </ul>
      </div>

      <div className="my-16 space-y-4">
        <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
          <Input
            label="First Name"
            {...register("first_name", {
              required: "First name is required",
            })}
            required
            errors={errors}
          />
          {errors && errors?.first_name && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.first_name?.message}
              </span>
            </div>
          )}
          <Input label="Last Name" {...register("last_name")} errors={errors} />
        </div>

        {errors && errors?.first_name && (
          <div className="hidden small:grid grid-cols-1 small:grid-cols-2 gap-4">
            <span className="text-xs text-red-500 ml-4 mt-[-14px]">
              {errors?.first_name?.message}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
          <Input
            label="Phone"
            {...register("phone", {
              required: "Phone number is required",
            })}
            required
            errors={errors}
          />
          {errors && errors?.phone && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.phone?.message}
              </span>
            </div>
          )}

          <Input
            label="Email"
            {...register("email", {
              required: "Email is required",
            })}
            required
            errors={errors}
          />
          {errors && errors?.email && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.email?.message}
              </span>
            </div>
          )}
        </div>

        {errors && (
          <div className="hidden small:grid grid-cols-1 small:grid-cols-2 gap-4">
            <div>
              {errors && errors?.phone && (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.phone?.message}
                </p>
              )}
            </div>
            <div>
              {errors && errors?.email && (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.email?.message}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
          <NativeSelect
            placeholder="Select Type"
            {...register("type", {
              required: "Type is required",
            })}
            required
            errors={errors}
          >
            <option value="T-shirts">T-shirts</option>
            <option value="T-shirts">Hoodies</option>
            <option value="T-shirts">Jackets</option>
          </NativeSelect>
          {errors && errors?.type && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.type?.message}
              </span>
            </div>
          )}

          <NativeSelect
            placeholder="Select Material"
            {...register("material", {
              required: "Material is required",
            })}
            required
            errors={errors}
          >
            <option value="Cotton">Cotton</option>
            <option value="Polyester">Polyester</option>
            <option value="Blends">Blends</option>
          </NativeSelect>
          {errors && errors?.material && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.material?.message}
              </span>
            </div>
          )}
        </div>
        {errors && (
          <div className="hidden small:grid grid-cols-1 small:grid-cols-2 gap-4">
            <div>
              {errors && errors?.type && (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.type?.message}
                </p>
              )}
            </div>
            <div>
              {errors && errors?.material ? (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.material?.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
          <NativeSelect
            placeholder="Select Color"
            {...register("color", {
              required: "Color is required",
            })}
            required
            errors={errors}
          >
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
          </NativeSelect>
          {errors && errors?.color && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.color?.message}
              </span>
            </div>
          )}

          <NativeSelect
            placeholder="Select Size"
            {...register("size", {
              required: "Size is required",
            })}
            required
            errors={errors}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </NativeSelect>
          {errors && errors?.size && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.size?.message}
              </span>
            </div>
          )}
        </div>
        {errors && (
          <div className="hidden small:grid grid-cols-1 small:grid-cols-2 gap-4">
            <div>
              {errors && errors?.color && (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.color?.message}
                </p>
              )}
            </div>
            <div>
              {errors && errors?.size ? (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.size?.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
          <NativeSelect
            placeholder="Select Print Technique"
            {...register("print_technique", {
              required: "Print Technique is required",
            })}
            required
            errors={errors}
          >
            <option value="ScreenPrinting">Screen Printing</option>
            <option value="Embroidery">Embroidery</option>
            <option value="HeatTransfer">Heat Transfer</option>
          </NativeSelect>
          {errors && errors?.print_technique && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.print_technique?.message}
              </span>
            </div>
          )}

          <Input
            label="Quantity"
            {...register("qty", {
              required: "Quantity is required",
            })}
            required
            errors={errors}
          />
          {errors && errors?.qty && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.qty?.message}
              </span>
            </div>
          )}
        </div>
        {errors && (
          <div className="hidden small:grid grid-cols-1 small:grid-cols-2 gap-4">
            <div>
              {errors && errors?.print_technique && (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.print_technique?.message}
                </p>
              )}
            </div>
            <div>
              {errors && errors?.qty ? (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.qty?.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Add Address"
            {...register("address", {
              required: "Address is required",
            })}
            required
            errors={errors}
          />
          {errors && errors?.address && (
            <div className="small:hidden grid grid-cols-1 small:grid-cols-2 gap-4">
              <span className="text-xs text-red-500 ml-4 mt-[-14px]">
                {errors?.address?.message}
              </span>
            </div>
          )}
        </div>
        {errors && (
          <div className="hidden smaal:grid grid-cols-1 small:grid-cols-2 gap-4">
            <div>
              {errors && errors?.address && (
                <p className="text-xs text-red-500 ml-4 mt-[-14px]">
                  {errors?.address?.message}
                </p>
              )}
            </div>
          </div>
        )}

        {!imgUrl ? (
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#F6FEFF] hover:bg-[#F6FEFF]"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p> */}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        ) : (
          // <div className="relative h-60 w-full">
          <div className="relative">
            <div className="absolute right-2 top-2 cursor-pointer">
              <X onClick={() => setImgUrl("")} />
            </div>
            <Image
              src={imgUrl}
              width={100}
              height={0}
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        <div>
          <textarea
            className="w-full text-base-regular p-2 focus:outline-none bg-[#F6FEFF] border-2 border-gray-200 focus:border-gray-400 rounded-lg resize-none"
            placeholder="Any special instructions or requirements"
            rows={5}
            {...register("desc")}
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="custom-address"
            className="min-h-0 xsmall:max-w-40"
            onClick={submit}
            disabled={submitting}
          >
            {submitting ? <Spinner /> : "Submit"}
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500 my-12 text-start">
        Thank you for choosing Customz for your special event. We look forward
        to bringing your vision to life!
      </p>
    </div>
  )
}

export default BulkOrder
