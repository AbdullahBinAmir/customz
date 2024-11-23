import axios from "axios"
import { medusaUrl } from "./config"

let jwt_token = localStorage.getItem("auth_token")

// const post = async (param) => {
async function post(param) {
  try {
    const headers = {
      Authorization: `Bearer ${jwt_token}`,
    }
    const res = await axios.post(param, null, { headers })

    return {
      status: res.status,
      data: res.data,
    }
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      }
    } else if (error.request) {
      return {
        status: 500,
        data: { message: "No response received from the server" },
      }
    } else {
      return {
        status: 500,
        data: { message: error.message },
      }
    }
  }
}

export async function createFulfillment(id) {
  const path = `${medusaUrl}/admin/custom/bostaOrder?order_id=${id}`
  const res = await post(path)
  return res
}

export async function createPickupRequest() {
  const path = `${medusaUrl}/admin/custom/pickUpRequest`
  const res = await post(path)
  return res
}
