import React from "react"
import InputField from "../../../../../molecules/input"
import FormValidator from "../../../../../utils/form-validator"
import { NestedForm } from "../../../../../utils/nested-form"
import { Select } from "@medusajs/ui"
import { Controller, useFieldArray } from "react-hook-form"
import { NextCreateableSelect, NextSelect } from "../../../../../molecules/select/next-select"
import { VariantStockFormType } from "../variant-stock-form"

export type VariantGeneralFormType = {
  title: string | null
  material: string | null
}

type Props = {
  form: NestedForm<VariantGeneralFormType>
  options: any
  stock: NestedForm<VariantStockFormType>
}

const VariantGeneralForm = ({ form, options, stock }: Props) => {
  const {
    path,
    register,
    control,
    formState: { errors },
  } = form

  const { setValue, path: stockpath } = stock

  // console.log("options", options)

  // const createTitle = (item: any) => {
  //   return `${item.color} / ${item.type} / ${item.size}`
  // }

  const create = options.map((opt) => ({
    value: `${opt.size} / ${opt.color} / ${opt.type}`,
    label: `${opt.size} / ${opt.color} / ${opt.type}`,
    quantity: opt.qty,
  }))

  return (
    <div>
      <p className="inter-base-regular text-grey-50">
        Configure the general information for this variant.
      </p>
      <div className="pt-large">
        <div className="grid grid-cols-2 gap-x-large">
          {/* <InputField
            label="Title"
            placeholder="Green / XL..."
            {...register(path("title"), {
              pattern: FormValidator.whiteSpaceRule("Title"),
            })}
            errors={errors}
          /> */}

          {/* <Select
            {...register(path("title"))}
          >
            <Select.Trigger>
              <Select.Value placeholder="Select option from inventory" />
            </Select.Trigger>
            <Select.Content>
              {options.map((item) => (
                <Select.Item key={item.id} value={item.type}>
                  {item.type}
                </Select.Item>
              ))}
            </Select.Content>
          </Select> */}

          <Controller
          name={path("title")}
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <NextSelect
                label="Title"
                onChange={(selectedOption:any)=>{
                  console.log(selectedOption)
                  onChange(selectedOption?.value)
                  setValue(stockpath("inventory_quantity"),selectedOption ? selectedOption.quantity : 0)
                }}
                options={create}
                value={create.find((opt) => opt.value === value)}
                placeholder="Choose an option"
                isClearable
              />
            )
          }}
        />

          <InputField
            label="Material"
            placeholder="80% wool, 20% cotton..."
            {...form.register(path("material"), {
              pattern: FormValidator.whiteSpaceRule("Material"),
            })}
            errors={errors}
          />
        </div>
      </div>
    </div>
  )
}

export default VariantGeneralForm