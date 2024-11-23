import { RadioGroup } from "@headlessui/react"
import { ErrorMessage } from "@hookform/error-message"
import { useCheckout } from "@lib/context/checkout-context"
import { Cart } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import StepContainer from "../step-container"
import axios from "axios"
import { MEDUSA_BACKEND_URL } from "@lib/config"

type ShippingOption = {
  value?: string
  label?: string
  price: string
}

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

type ShippingFormProps = {
  soId: string
}

const Shipping: React.FC<ShippingProps> = ({ cart }) => {
  const { addShippingMethod, setCart } = useCart()
  const {
    control,
    setError,
    formState: { errors },
  } = useForm<ShippingFormProps>()

  async function fetchPricing() {
    const dropCity = localStorage.getItem("city")
    const config = {
      headers: {
        Authorization:
          "29ceec1badba89799d94d17baf973262ceaee48468e40760cc39ead2ebe63694",
      },
    }
    const apiUrlOrder = `https://stg-app.bosta.co/api/v2/pricing/shipment/calculator?cod=${
      (cart?.total || 0) / 100
    }&dropOffCity=${dropCity}&pickupCity=Alexandria&size=Normal&type=CASH_COLLECTION`

    try {
      const response = await axios.get(apiUrlOrder, config)
      return response.data.data.shippingFee
    } catch (e) {
      console.log(e)
    }
  }

  async function addShippingPricing(price: number, cart_id: string) {
    const apiUrlShippingPrice = `${MEDUSA_BACKEND_URL}/store/custom/updateshippingprice`
    const data = {
      price: price * 100,
      cart_id: cart_id,
    }

    try {
      const response = await axios.post(apiUrlShippingPrice, data)
      console.log(response.data)
    } catch (e) {
      console.error("Error adding shipping pricing:", e)
    }
  }

  // Fetch shipping options
  const { shipping_options, refetch } = useCartShippingOptions(cart.id, {
    enabled: !!cart.id,
  })

  // Any time the cart changes we need to ensure that we are displaying valid shipping options
  useEffect(() => {
    const refetchShipping = async () => {
      await refetch()
    }
    refetchShipping()
  }, [cart, refetch])

  const submitShippingOption = async (soId: string) => {
    var price = await fetchPricing()
    addShippingMethod.mutate(
      { option_id: soId },
      {
        onSuccess: async ({ cart }) => {
          await addShippingPricing(price, cart.id)
          setCart(cart)
          window.location.reload()
        },
        onError: () =>
          setError(
            "soId",
            {
              type: "validate",
              message:
                "An error occurred while adding shipping. Please try again.",
            },
            { shouldFocus: true }
          ),
      }
    )
  }

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value)
    fn(value)
  }

  // Memoized shipping method options
  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }))
    }
    return []
  }, [shipping_options, cart])

  const {
    sameAsBilling: { state: sameBilling },
  } = useCheckout()

  return (
    <StepContainer
      index={sameBilling ? 2 : 3}
      title="Delivery"
      closedState={
        <div className="px-4 md:px-8 pb-8 text-small-regular">
          <p>Enter your address to see available delivery options.</p>
        </div>
      }
    >
      <Controller
        name="soId"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <div>
              <RadioGroup
                value={value}
                onChange={(value: string) => handleChange(value, onChange)}
              >
                {shippingMethods && shippingMethods.length ? (
                  shippingMethods.map((option) => {
                    return (
                      <RadioGroup.Option
                        key={option.value}
                        value={option.value}
                        className={clsx(
                          "flex items-center justify-between text-small-regular cursor-pointer py-4 border-b border-gray-200 last:border-b-0 px-8",
                          {
                            "bg-gray-50": option.value === value,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <Radio checked={value === option.value} />
                          <span className="text-base-regular">
                            {option.label}
                          </span>
                        </div>
                        <span className="justify-self-end text-gray-700">
                          {option.label === "Bosta"
                            ? "shipping price changes based on location"
                            : option.price}
                        </span>
                      </RadioGroup.Option>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900">
                    <Spinner />
                  </div>
                )}
              </RadioGroup>
              <ErrorMessage
                errors={errors}
                name="soId"
                render={({ message }) => {
                  return (
                    <div className="pt-2 text-rose-500 text-small-regular">
                      <span>{message}</span>
                    </div>
                  )
                }}
              />
            </div>
          )
        }}
      />
    </StepContainer>
  )
}

export default Shipping
