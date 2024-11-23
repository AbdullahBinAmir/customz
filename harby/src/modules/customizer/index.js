"use client"

import React, { useEffect } from "react"
import medusaRequest from "@lib/medusa-fetch"
import Medusa from "@medusajs/medusa-js"
import { MEDUSA_BACKEND_URL } from "@lib/config"

const STORE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"

const getCart = () => {
  if (!IS_SERVER) {
    console.log(localStorage.getItem(CART_KEY))
    return localStorage.getItem(CART_KEY)
  }
  return null
}

const Index = () => {
  useEffect(() => {
    const dataLocalStorage = localStorage.getItem("customizerProps")
    const info = JSON.parse(dataLocalStorage)

    const cartId = getCart()

    async function addCustomizedUrlCartContext(imageUrl, designType) {
      const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
      medusa.carts
        .update(cartId, {
          context: {
            title: info.title,
            customizedURL: imageUrl,
            designType: designType,
          },
        })
        .then(({ cart }) => {
          console.log(cart.id)
        })
    }

    const handleMessage = async (event) => {
      const { dataURL, isBase64, designType } = event.data

      if (isBase64) {
        const requestBody = JSON.stringify({ base: dataURL })

        fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/custom/uploadimage`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            body: requestBody,
          }
        )
          .then((response) => {
            if (response.ok) {
              // Parse the JSON response
              return response.json()
            } else {
              throw new Error("Failed to upload image")
            }
          })
          .then(async (data) => {
            const imageUrl = data.fileURL
            await addCustomizedUrlCartContext(imageUrl, designType)

            localStorage.setItem("customizedURL", imageUrl)

            const handle = info.handle
            if (handle) {
              window.location.href = `${STORE_BASE_URL}/products/${handle}`
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  return (
    <div>
      <iframe
        src="/index.html"
        title="Your Iframe"
        width="100%"
        height="700"
      ></iframe>
    </div>
  )
}

export default Index
