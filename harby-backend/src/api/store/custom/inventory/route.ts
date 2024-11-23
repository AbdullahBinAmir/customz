import { Request, Response } from "express";
import * as pg from "pg";
import dotenv from 'dotenv';
import { generateEntityId } from "@medusajs/medusa";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
    connectionString,
    max: 100
});

export async function POST(req: Request, res: Response) {
    const { color, qty, type, size } = req.body;

    if (!color || !qty || !type || !size) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const client = await pool.connect();
        try {
            const inventoryId = generateEntityId("", "cinv");
            const insertInventoryQuery = `
                INSERT INTO custom_inventory (id, color, qty, type, size) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *
            `;
            const inventoryValues = [inventoryId, color, qty, type, size];

            const { rows } = await client.query(insertInventoryQuery, inventoryValues);

            return res.status(201).json({ message: "Inventory created successfully", inventory: rows[0] });
        } catch (error) {
            console.error('Error creating inventory:', error);
            return res.status(500).json({ message: "Failed to create the inventory" });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send({ message: "Server error", error });
    }
}

export async function GET(req: Request, res: Response) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "Inventory Id is required." });
    }

    try {
        const client = await pool.connect();
        try {
            const productQuery = `
                SELECT * FROM custom_inventory
                WHERE id = $1
            `;
            const productResult = await client.query(productQuery, [id]);

            if (productResult.rowCount === 0) {
                return res.status(404).json({ message: "Inventory not found." });
            }

            const inventory = productResult.rows[0];
            return res.status(200).json({ message: "Inventory fetched successfully", inventory });
        } catch (error) {
            console.error("Error retrieving inventory:", error);
            return res.status(500).json({ message: "Failed to retrieve inventory", error: error.message });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send({ message: "Server error", error });
    }
}

export async function PUT(req: Request, res: Response) {
    const { color, qty, type, size, id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Inventory Id is required." });
    }

    try {
        const client = await pool.connect();

        await client.query("BEGIN");
        try {
            const updateInventoryQuery = `
                UPDATE custom_inventory
                SET
                    color = $1,
                    qty = $2,
                    type = $3,
                    size = $4
                WHERE id = $5
            `;
            const inventoryValues = [color, qty, type, size, id];

            await client.query(updateInventoryQuery, inventoryValues);

            const updateVariant = `update public.product_variant set inventory_quantity=$1 WHERE title = $2`;
            // await client.query(updateVariant, [newQty,optionResult.rows[0].id]);
            await client.query(updateVariant, [qty, `${size} / ${color} / ${type}`]);
            await client.query("COMMIT");

            return res.status(200).json({ message: "Inventory updated successfully", inventory_id: id });

        } catch (error) {
            console.error("Error updating inventory:", error);
            return res.status(500).json({ message: "Failed to update inventory", error: error.message });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send({ message: "Server error", error });
    }
}

export async function DELETE(req: Request, res: Response) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "Inventory Id is required." });
    }

    try {
        const client = await pool.connect();
        try {
            const deleteInventoryQuery = `
                DELETE FROM custom_inventory
                WHERE id = $1
            `;
            await client.query(deleteInventoryQuery, [id]);

            return res.status(200).json({ message: "Inventory deleted successfully" });
        } catch (error) {
            console.error("Error deleting inventory:", error);
            return res.status(500).json({ message: "Failed to delete inventory", error: error.message });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send({ message: "Server error", error });
    }
}