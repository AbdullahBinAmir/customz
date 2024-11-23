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

export async function GET(req: Request, res: Response) {
    try {
        const { order_id } = req.query;
        pool.query(
            `SELECT 
        "order".id,
        "order".status,
        "order".fulfillment_status,
        "order".payment_status,
        "order".display_id,
        "order".cart_id,
        "cart".type,
        "cart".context
        FROM public."order" JOIN public."cart" ON public."order".cart_id = public."cart" .id where "order".id='${order_id}'`,
            (error: any, results: any) => {
                if (error) {
                    res.status(500).json(error);
                    //console.log(error)
                }
                res.status(200).json(results?.rows[0]);
            }
        );
    } catch (error) {
        console.log("error", error);
        res.status(404).send(error);
    }
}