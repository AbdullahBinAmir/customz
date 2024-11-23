import { useCheckout } from "@lib/context/checkout-context"
import { PaymentSession } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useCart, useUpdatePaymentSession } from "medusa-react"
import React, { useEffect, useState } from "react"
import { Rating } from "react-simple-star-rating"
import axios from "axios"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import cryto from "crypto"
import Input from "@modules/common/components/input"
import { useRouter, useSearchParams } from "next/navigation"

type PaymentButtonProps = {
  paymentSession?: PaymentSession | null
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ paymentSession }) => {
  const [notReady, setNotReady] = useState(true)
  const [cardData, setCardData] = useState<any>({})
  const { cart } = useCart()

  useEffect(() => {
    setNotReady(true)
    if (!cart) {
      return
    }

    if (cart && cart.payment_session?.provider_id === "fawry") {
      const hashString = `${process.env.NEXT_PUBLIC_FAWRY_MERCHANT_CODE}${cart?.customer_id}${process.env.NEXT_PUBLIC_FAWRY_SECRET_KEY}`
      const signature_hash = cryto
        .createHash("sha256")
        .update(hashString)
        .digest("hex")
      let config = {
        method: "get",
        url: `https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/cards/cardToken?merchantCode=${process.env.NEXT_PUBLIC_FAWRY_MERCHANT_CODE}&customerProfileId=${cart?.customer_id}&signature=${signature_hash}`,
      }

      axios
        .request(config)
        .then((response) => {
          if (response.data) {
            console.log(JSON.stringify(response.data))
            setCardData(response.data)
            return
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    if (!cart.shipping_address) {
      return
    }

    if (!cart.billing_address) {
      return
    }

    if (!cart.email) {
      return
    }

    if (cart.shipping_methods.length < 1) {
      return
    }

    setNotReady(false)
  }, [cart])

  switch (paymentSession?.provider_id) {
    case "stripe":
      return (
        <StripePaymentButton session={paymentSession} notReady={notReady} />
      )
    case "fawry":
      return (
        <FawryPaymentButton
          session={paymentSession}
          notReady={notReady}
          token={cardData}
        />
      )
    case "manual":
      return <ManualTestPaymentButton notReady={notReady} />
    case "paypal":
      return (
        <PayPalPaymentButton notReady={notReady} session={paymentSession} />
      )
    default:
      return (
        <Button variant="custom-address" disabled>
          Select a payment method
        </Button>
      )
  }
}

const StripePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [disabled, setDisabled] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("cardNumber")

  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [stripe, elements])

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address.first_name +
              " " +
              cart.billing_address.last_name,
            address: {
              city: cart.billing_address.city ?? undefined,
              country: cart.billing_address.country_code ?? undefined,
              line1: cart.billing_address.address_1 ?? undefined,
              line2: cart.billing_address.address_2 ?? undefined,
              postal_code: cart.billing_address.postal_code ?? undefined,
              state: cart.billing_address.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      <Button
        variant="custom-address"
        disabled={submitting || disabled || notReady}
        onClick={handlePayment}
      >
        {submitting ? <Spinner /> : "Checkout"}
      </Button>
      {errorMessage && (
        <div className="text-red-500 text-small-regular mt-2">
          {errorMessage}
        </div>
      )}
    </>
  )
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""

const PayPalPaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const handlePayment = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    actions?.order
      ?.authorize()
      .then((authorization) => {
        if (authorization.status !== "COMPLETED") {
          setErrorMessage(`An error occurred, status: ${authorization.status}`)
          return
        }
        onPaymentCompleted()
      })
      .catch(() => {
        setErrorMessage(`An unknown error occurred, please try again.`)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: cart?.region.currency_code.toUpperCase(),
        intent: "authorize",
      }}
    >
      {errorMessage && (
        <span className="text-rose-500 mt-4">{errorMessage}</span>
      )}
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={async () => session.data.id as string}
        onApprove={handlePayment}
        disabled={notReady || submitting}
      />
    </PayPalScriptProvider>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const { cart } = useCart()

  const [submitting, setSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setreview] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const productIds = cart?.items.map((item) => item.variant.product_id)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    handlePayment()
  }

  const { onPaymentCompleted } = useCheckout()

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const handlePayment = async () => {
    setSubmitting(true)

    onPaymentCompleted()

    setSubmitting(false)
  }

  const handleRatingSubmit = async () => {
    const reqBody = {
      productIds: productIds,
      rating: rating,
      review: review,
    }
    try {
      axios
        .post(`${MEDUSA_BACKEND_URL}/store/custom/rating`, reqBody)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {}
    closeModal()
  }

  return (
    <>
      <Button
        variant="custom-address"
        disabled={submitting || notReady}
        onClick={openModal}
      >
        {submitting ? <Spinner /> : "Checkout"}
      </Button>
      <Modal isOpen={isModalOpen} close={closeModal}>
        <div>
          <div className="App flex flex-col justify-center items-center gap-4 h-full">
            <div className="text-start">
              <h1 className="text-lg mb-2">How would you rate this item?</h1>
              <textarea
                className="border resize-none p-2 rounded focus:outline-none w-full"
                placeholder="Please leave a comment..."
                rows={5}
                // cols={45}
                onChange={(e) => setreview(e.target.value)}
              />
            </div>
            <Rating
              // className="pl-4 py-2"
              onClick={handleRating}
              initialValue={rating}
              showTooltip={true}
              transition={true}
              tooltipArray={["Very Bad", "Bad", "Average", "Good", "Very Good"]}
              SVGstyle={{ display: "inline" }}
            />
          </div>
          <div className="text-center py-4">
            <button
              className="bg-blue-dark py-2 w-4/5 mx-auto rounded-full"
              onClick={handleRatingSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
const FawryPaymentButton = ({
  session,
  notReady,
  token,
}: {
  session: PaymentSession
  notReady: boolean
  token: any
}) => {
  const { cart } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [proceed, setProceed] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setreview] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const updatePaymentSession = useUpdatePaymentSession(cart?.id || "")
  const [cvv, setCVV] = useState<number>()

  const searchParams = useSearchParams()
  const router = useRouter()

  const merchantRefNumber = searchParams.get("merchantRefNumber")
  const paymentAmount = searchParams.get("paymentAmount")
  const orderStatus = searchParams.get("orderStatus")

  useEffect(() => {
    if (merchantRefNumber && paymentAmount && orderStatus == "AUTHORIZED") {
      const provider = cart?.payment_session?.provider_id || ""
      updatePaymentSession.mutate({
        provider_id: provider,
        data: { fawryMerchantRefNum: merchantRefNumber, amount: paymentAmount },
      })
    } else {
      setProceed(true)
    }
  }, [])

  const productItems = cart?.items.map((item) => ({
    itemId: item.id,
    description: item.description,
    price: ((item.unit_price as number) / 100).toFixed(2),
    quantity: item.quantity,
  }))

  productItems?.push({
    itemId: "0",
    description: "shipping charges",
    price: ((cart?.shipping_total as number) / 100).toFixed(2),
    quantity: 1,
  })

  const paywithFawry = async () => {
    try {
      setSubmitting(true)
      let merchantRefNum = parseInt(Date.now().toString())
      const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`
      const signatureData = `${
        process.env.NEXT_PUBLIC_FAWRY_MERCHANT_CODE
      }${merchantRefNum}${cart?.customer_id}CARD${(
        (cart?.total as number) / 100
      ).toFixed(2)}${token?.cards[0]?.token}${cvv}${returnUrl}${
        process.env.NEXT_PUBLIC_FAWRY_SECRET_KEY
      }`
      let data = JSON.stringify({
        merchantCode: process.env.NEXT_PUBLIC_FAWRY_MERCHANT_CODE,
        merchantRefNum: merchantRefNum,
        customerProfileId: cart?.customer_id,
        paymentMethod: "CARD",
        cardToken: token?.cards[0]?.token,
        cvv: cvv,
        customerName:
          cart?.billing_address.first_name +
          " " +
          cart?.billing_address.last_name,
        customerMobile: cart?.billing_address.phone,
        customerEmail: cart?.email,
        amount: ((cart?.total as number) / 100).toFixed(2),
        currencyCode: "EGP",
        description: `Payment by Customer  ${cart?.customer_id}`,
        language: "en-gb",
        chargeItems: productItems,
        enable3DS: true,
        authCaptureModePayment: true,
        returnUrl: returnUrl,
        signature: cryto
          .createHash("sha256")
          .update(signatureData)
          .digest("hex"),
      })

      console.log("fary req", data)

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/payments/charge",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }

      const response = await axios.request(config)

      console.log("fary response", response.data)
      if (response.data?.nextAction?.redirectUrl) {
        router.push(response.data?.nextAction?.redirectUrl)
      } else {
        alert("Try Again! Error while authorizing payment")
      }
    } catch (e) {
      console.log(e)
      return null
    } finally {
      setSubmitting(false)
    }
  }

  const productIds = cart?.items.map((item) => item.variant.product_id)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    handlePayment()
  }

  const { onPaymentCompleted } = useCheckout()

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const handlePayment = async () => {
    setSubmitting(true)
    onPaymentCompleted()
    setSubmitting(false)
  }

  const handleRatingSubmit = async () => {
    const reqBody = {
      productIds: productIds,
      rating: rating,
      review: review,
    }
    try {
      axios
        .post(`${MEDUSA_BACKEND_URL}/store/custom/rating`, reqBody)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {}
    closeModal()
  }

  return (
    <>
      {proceed && (
        <div className="w-full">
          <div className="grid grid-cols-[1fr_80px] gap-x-2">
            <input
              className="w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-200 rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="cvv"
              value={cvv}
              onChange={(e) => setCVV(parseInt(e.currentTarget.value))}
              type="number"
            />
            <div>
              <Button
                variant="custom-address"
                className="!min-h-[0] h-[46px] w-[80px] rounded-full"
                disabled={submitting}
                onClick={() => paywithFawry()}
              >
                {submitting ? <Spinner /> : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
      <Button
        variant="custom-address"
        disabled={submitting || notReady || proceed}
        onClick={() => {
          openModal()
        }}
      >
        {submitting ? <Spinner /> : "Pay With Fawry"}
      </Button>
      <Modal isOpen={isModalOpen} close={closeModal}>
        <div>
          <div className="App flex flex-col justify-center items-center gap-4 h-full">
            <div className="text-start">
              <h1 className="text-lg mb-2">How would you rate this item?</h1>
              <textarea
                className="border resize-none p-2 rounded focus:outline-none w-full"
                placeholder="Please leave a comment..."
                rows={5}
                // cols={45}
                onChange={(e) => setreview(e.target.value)}
              />
            </div>
            <Rating
              // className="pl-4 py-2"
              onClick={handleRating}
              initialValue={rating}
              showTooltip={true}
              transition={true}
              tooltipArray={["Very Bad", "Bad", "Average", "Good", "Very Good"]}
              SVGstyle={{ display: "inline" }}
            />
          </div>
          <div className="text-center py-4">
            <button
              className="bg-blue-dark py-2 w-4/5 mx-auto rounded-full"
              onClick={handleRatingSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PaymentButton
