import { Request, Response } from "express";
import * as pg from "pg";
import dotenv from 'dotenv';
import axios from "axios";
import { medusaUrl } from "../../../../admin/routes/personalizer/common/services/config";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
    connectionString,
    max: 100
});

const headers = {
    Authorization:
        // "0ad30dce7c79c66a6280ba8ab92c3d2a408253c10de5d772cc41bd0e77583a33",
        "29ceec1badba89799d94d17baf973262ceaee48468e40760cc39ead2ebe63694",
    "Content-Type": "application/json",
};

export async function POST(req: Request, res: Response) {
    try {
        const { order_id } = req.query;
        const data = await pool.query(
            `SELECT 
          "order".id,
          "order".status,
          "order".fulfillment_status,
          "order".payment_status,
          "order".display_id,
          "order".cart_id,
          "order".region_id,
          "order".shipping_address_id,
          "order".billing_address_id,
          "cart".*,
          "address".*,
          "customer".*,
          "payment".*,
          "region".*
        FROM public."order"
        JOIN public."cart" ON public."order".cart_id = public."cart".id
        JOIN public."address" ON public."order".billing_address_id = public."address".id
        JOIN public."customer" ON public."order".customer_id = public."customer".id
        JOIN public."payment" ON public."cart".payment_id = public."payment".id
        JOIN public."region" ON public."order".region_id = public."region".id
        WHERE "order".id = $1`,
            [order_id]
        );
        console.log("data", data.rows[0])
        const userAddress = data.rows[0].address_1;
        const address_2 = data.rows[0].address_2 || "";
        const [zone_id, district] = address_2.split(", ");
        const userName = data.rows[0].first_name || "unknown";
        const userPhone = data.rows[0].phone || "01065685435";
        const userEmail = data.rows[0].email;
        const userCity = data.rows[0].city

        // City Logic
        const apiUrlCity = "https://stg-app.bosta.co/api/v2/cities";
        const apiResponseCities = await axios.get(apiUrlCity, { headers });
        const bostaApiDataCity = JSON.stringify(apiResponseCities.data.data, null, 2);
        const bostaApiData = JSON.parse(bostaApiDataCity);

        // Find the city in the response (case-insensitive comparison)
        const selectedCity = bostaApiData.list.find(
            (city) => city.name.toLowerCase() === userCity.toLowerCase()
        );

        // Check if the city is not found
        if (!selectedCity) {
            console.log(`City '${userCity}' not found.`);
            return res.status(404).json({ error: `Invalid City'${userCity}'` });
        }
        const cityId = selectedCity._id || 123344566;

        // //Zone Logic
        // const apiUrlZones = `http://app.bosta.co/api/v2/cities/${cityId}/zones`
        // const  apiResponseZones = await axios.get(apiUrlZones,{headers})
        // const bostaApiDataZones = JSON.stringify(apiResponseZones.data.data,null,2);
        // const bostaApiZone = JSON.parse(bostaApiDataZones)
        // const ZoneID = bostaApiZone[0]._id
        // console.log("ZoneID", ZoneID)

        //Distric Logic
        const apiUrlDistrict = `https://stg-app.bosta.co/api/v2/cities/${cityId}/districts`;
        const apiResponseDistricts = await axios.get(apiUrlDistrict, { headers });
        const bostaApiDistrict = apiResponseDistricts.data.data;

        const normalizedAddress = district.toLowerCase().trim(); // Normalize and trim the address

        const filteredDistricts = bostaApiDistrict.filter((city) => {
            const normalizedDistrictName = city.districtName.toLowerCase().trim(); // Normalize and trim the district name
            return normalizedDistrictName.includes(normalizedAddress);
        })
        console.log("address", filteredDistricts[0])

        //Order Logic
        const apiUrlOrder = "https://stg-app.bosta.co/api/v2/deliveries";
        const requestBodyOrder = {
            type: 10,
            cod: data.rows[0].amount/100,
            dropOffAddress: {
                city: userCity,
                zoneId: filteredDistricts[0].zoneId,
                districtId: filteredDistricts[0].districtId,
                firstLine: userAddress,
            },
            pickupAddress: {
                city: "Alexandria",
                zoneId: "eSzcbUZsRAH",
                districtId: "TIOHAQrPWD",
                firstLine: "1 domiat street",
            },
            returnAddress: {
                city: "Alexandria",
                zoneId: "eSzcbUZsRAH",
                districtId: "TIOHAQrPWD",
                firstLine: "1 domiat street",
            },
            receiver: {
                firstName: userName,
                phone: userPhone,
                email: userEmail
            },
            webhookUrl: `${medusaUrl}/admin/custom/updateOrderStatus`
        };

        const apiResponse = await axios.post(apiUrlOrder, requestBodyOrder, {
            headers,
        });

        //Need to check the response and what to store in db
        const orderData = apiResponse.data.data;
        const trackingNumber = orderData.trackingNumber;
        const sender = orderData.sender;

        // Insert the data into the 'bosta' table with the sender field as JSON
        const insertQuery = `
         INSERT INTO bosta (trackingnumber, sender, orderid)
         VALUES ($1, $2::jsonb, $3)
        `;

        const insertValues = [
            trackingNumber,
            sender,
            order_id
        ];

        // Execute the insert query
        await pool.query(insertQuery, insertValues);

        return res.status(200).send("Order is ready for Delivery")
        //Air Way Bill Logic
        // const orderId = orderData.data._id
        // const apiUrlAwb = 'https://app.bosta.co/api/v2/deliveries/mass-awb'
        // const requestBodyAWB = {
        // "ids": orderId,
        // "requestedAwbType": "A4", // accepts "A6" and "A4"
        // "lang": "ar" // accepts "ar" and "en"
        // }
        // const apiResponseAwb = await axios.post(apiUrlAwb,requestBodyAWB,{headers})
    } catch (error) {
        console.log("Error", error);

        // Check if the error is an Axios error
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const axiosErrorResponse = error.response.data;

            if (axiosErrorResponse.errorCode === 3000) {
                // Handle the specific error code 3000 (insufficient parameters)
                return res.status(400).json({
                    error: "Insufficient parameters in the entered address",
                    errorCode: 3000,
                });
            } else {
                // Handle other Axios errors
                res.status(500).json({
                    error: error.message,
                    axiosError: {
                        success: false,
                        message: axiosErrorResponse.message || "Unknown Axios error",
                        errorCode: axiosErrorResponse.errorCode || 500,
                    },
                });
            }
        } else {
            // Handle other types of errors
            res.status(500).json({ error: error.message });
        }
    }
}