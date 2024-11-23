import { Request, Response } from "express";
import * as pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
    connectionString,
    max: 100
});

export async function POST(req: Request, res: Response) {
    try {
        const { _id, trackingNumber, state, type, cod, timeStamp, isConfirmedDelivery, deliveryPromiseDate, exceptionReason, exceptionCode, businessReference, numberOfAttempts } = req.body
        const selectQuery = `
              SELECT *
              FROM bosta
              WHERE trackingnumber = $1
            `;

        const result = await pool.query(selectQuery, [trackingNumber]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Record not found for the provided tracking number' });
        }

        // The result.rows array contains the found record(s) from the bosta table
        const foundRecord = result.rows[0];

        const orderid = foundRecord.orderid;

        // Query to find a record in the order table based on orderid
        const orderQuery = `
              SELECT *
              FROM "order"
              WHERE id = $1
            `;
        const orderResult = await pool.query(orderQuery, [orderid]);

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: 'Record not found in the order table for the provided orderid' });
        }

        // The orderResult.rows array contains the found record(s) from the order table
        const foundOrderRecord = orderResult.rows[0];

        // Update the fulfillment_status in the order table with the value from req.body.type
        switch (type) {
            case 'FXF_SEND':
                const updatefxfsend = `
                  UPDATE "order"
                  SET fulfillment_status = 'shipped'
                  WHERE id = '${orderid}'
                `;
                await pool.query(updatefxfsend);
                break
            case 'EXCHANGE':
                const updateExchange = `
                  UPDATE "order"
                  SET fulfillment_status = 'not_fulfilled'
                  WHERE id = '${orderid}'
                `;
                await pool.query(updateExchange);
                break
            case 'CUSTOMER_RETURN_PICKUP':
                const updatenotfullfill = `
                  UPDATE "order"
                  SET fulfillment_status = 'not_fulfilled'
                  WHERE id = '${orderid}'
                `;
                await pool.query(updatenotfullfill);
                break
            case 'SIGN_AND_RETURN':
                const updateFullfilled = `
                  UPDATE "order"
                  SET fulfillment_status = 'fulfilled'
                  WHERE id = '${orderid}'
                `;
                await pool.query(updateFullfilled);
                break
            default:
                return res.status(400).send("Invalid")

        }

        // Fetch the updated order record
        const updatedOrderQuery = `
              SELECT *
              FROM "order"
              WHERE id = $1
            `;
        const updatedOrderResult = await pool.query(updatedOrderQuery, [orderid]);
        const updatedOrder = updatedOrderResult.rows[0];

        return res.status(200).json({ message: "Updated", updatedOrder });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: error.message });
    }
}