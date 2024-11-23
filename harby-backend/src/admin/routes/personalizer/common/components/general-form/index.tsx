import React from "react"
import { Controller } from "react-hook-form"
import InputField from "../molecules/input"
import TextArea from "../molecules/textarea"
import FormValidator from "../utils/form-validator"
import { NestedForm } from "../utils/nested-form"

export type GeneralFormType = {
  // isPersonalizer: boolean | undefined
  title: string
  subtitle: string | null
  handle: string
  material: string | null
  description: string | null
}

type Props = {
  form: NestedForm<GeneralFormType>
  requireHandle?: boolean
}

const GeneralForm = ({ form, requireHandle = true }: Props) => {
  const {
    register,
    path,
    control,
    formState: { errors },
  } = form

  return (
    <div>
      {/* <div className="mb-large">
        <div className="mb-2xsmall flex items-center justify-between">
          <h2 className="inter-base-semibold">Is Personalize</h2>
          <Controller
            control={control}
            name={path("isPersonalizer")}
            render={({ field: { value, onChange } }) => {
              return <Switch checked={value} onCheckedChange={onChange} />
            }}
          />
        </div>
        <p className="inter-base-regular text-grey-50">
          When unchecked personalizer will not be applied to this product.
        </p>
      </div> */}
      <div className="mb-small grid grid-cols-2 gap-x-large">
        <InputField
          label="Title"
          placeholder="Winter Jacket"
          required
          {...register(path("title"), {
            required: "Title is required",
            minLength: {
              value: 1,
              message: "Title must be at least 1 character",
            },
            pattern: FormValidator.whiteSpaceRule("Title"),
          })}
          errors={errors}
        />
        <InputField
          label="Subtitle"
          placeholder="Warm and cozy..."
          {...register(path("subtitle"), {
            pattern: FormValidator.whiteSpaceRule("Subtitle"),
          })}
          errors={errors}
        />
      </div>
      <p className="inter-base-regular mb-large text-grey-50">
        Give your product a short and clear title.
        <br />
        50-60 characters is the recommended length for search engines.
      </p>
      <div className="mb-large grid grid-cols-2 gap-x-large">
        <InputField
          label="Handle"
          tooltipContent={
            !requireHandle
              ? "The handle is the part of the URL that identifies the product. If not specified, it will be generated from the title."
              : undefined
          }
          placeholder="winter-jacket"
          required={requireHandle}
          {...register(path("handle"), {
            required: requireHandle ? "Handle is required" : undefined,
            minLength: FormValidator.minOneCharRule("Handle"),
            pattern: FormValidator.whiteSpaceRule("Handle"),
          })}
          prefix="/"
          errors={errors}
        />
        <InputField
          label="Material"
          placeholder="100% cotton"
          {...register(path("material"), {
            minLength: FormValidator.minOneCharRule("Material"),
            pattern: FormValidator.whiteSpaceRule("Material"),
          })}
          errors={errors}
        />
      </div>
      <TextArea
        label="Description"
        placeholder="A warm and cozy jacket..."
        rows={3}
        className="mb-small"
        {...register(path("description"))}
        errors={errors}
      />
      <p className="inter-base-regular text-grey-50">
        Give your product a short and clear description.
        <br />
        120-160 characters is the recommended length for search engines.
      </p>
    </div>
  )
}

export default GeneralForm
