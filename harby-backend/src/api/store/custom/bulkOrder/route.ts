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
    const {
        first_name,
        last_name,
        phone,
        email,
        type,
        material,
        color,
        size,
        qty,
        print_technique,
        desc,
        address,
        status,
        img
    } = req.body;

    try {
        const query = `
          INSERT INTO public.bulkorder(
            id, first_name, last_name, phone, email, type, material, color, size, qty, print_technique, "desc", address, status, img)
          VALUES (
            uuid_in(md5(random()::text || now()::text)::cstring), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
          );
        `;
        const values = [
            first_name, last_name, phone, email, type, material, color, size, qty, print_technique, desc, address, status, img
        ];
        await pool.query(query, values);
        res.status(201).json({ message: 'Bulk order created successfully!' });
    } catch (error) {
        console.error('Error inserting bulk order:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
}

export async function GET(req: Request, res: Response) {
    const { id } = req.query;

    try {
        const query = 'SELECT * FROM public.bulkorder WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Bulk order not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching bulk order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function PUT(req: Request, res: Response) {
    const {
        id,
        first_name,
        last_name,
        phone,
        email,
        type,
        material,
        color,
        size,
        qty,
        print_technique,
        desc,
        address,
        status,
        img
    } = req.body;

    try {
        // Fetch existing record
        const fetchQuery = 'SELECT * FROM public.bulkorder WHERE id = $1';
        const fetchResult = await pool.query(fetchQuery, [id]);

        if (fetchResult.rows.length === 0) {
            return res.status(404).json({ error: 'Bulk order not found' });
        }

        const existingOrder = fetchResult.rows[0];

        // Update only the fields provided
        const updatedOrder = {
            first_name: first_name || existingOrder.first_name,
            last_name: last_name || existingOrder.last_name,
            phone: phone || existingOrder.phone,
            email: email || existingOrder.email,
            type: type || existingOrder.type,
            material: material || existingOrder.material,
            color: color || existingOrder.color,
            size: size || existingOrder.size,
            qty: qty || existingOrder.qty,
            print_technique: print_technique || existingOrder.print_technique,
            desc: desc || existingOrder.desc,
            address: address || existingOrder.address,
            status: status || existingOrder.status,
            img: img || existingOrder.img
        };

        const query = `
          UPDATE public.bulkorder
          SET first_name = $1, last_name = $2, phone = $3, email = $4, type = $5, material = $6, color = $7, size = $8, qty = $9, print_technique = $10, "desc" = $11, "address" = $12, "status" = $13, img = $14
          WHERE id = $15
        `;
        const values = [
            updatedOrder.first_name, updatedOrder.last_name, updatedOrder.phone, updatedOrder.email, updatedOrder.type, updatedOrder.material, updatedOrder.color, updatedOrder.size, updatedOrder.qty, updatedOrder.print_technique, updatedOrder.desc, updatedOrder.address, updatedOrder.status, updatedOrder.img, id
        ];
        await pool.query(query, values);
        res.status(200).json({ message: 'Bulk order updated successfully!' });
    } catch (error) {
        console.error('Error updating bulk order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function DELETE(req: Request, res: Response) {
    const { id } = req.body;

    try {
        const query = 'DELETE FROM public.bulkorder WHERE id = $1';
        const values = [id];
        await pool.query(query, values);

        res.status(200).json({ message: 'Bulk order deleted successfully!' });
    } catch (error) {
        console.error('Error deleting bulk order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}