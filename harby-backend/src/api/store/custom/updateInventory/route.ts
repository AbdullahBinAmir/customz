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

interface RequestData {
  options: string,
  qty: number
}

export async function PUT(req: Request, res: Response) {
  const { options, qty }: RequestData = req.body;
  // console.log(req.body)
  let values = options.split("/")

  try {
    const client = await pool.connect();

    await client.query("BEGIN");

        // Fetch option IDs for color, size, and type from product_option table
      //   const optionQuery = `
      //   SELECT id
      //   FROM public.product_variant
      //   WHERE title = $1
      // `;
      // // console.log(optionQuery)
      // const optionResult = await client.query(optionQuery,[options]);

      // console.log(optionResult)

    // Build the dynamic inventory check query
    let query = `SELECT id, qty FROM custom_inventory WHERE color=$1 and type=$2 and size=$3 `;

    const result = await client.query(query, [values[1].trim(),values[2].trim(),values[0].trim()]);

    if (result.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "No matching inventory found." });
    }

    const currentInventory = result.rows[0];
    const currentQty = parseInt(currentInventory.qty);

    const newQty = currentQty - qty;
    const updateQuery = `UPDATE custom_inventory SET qty = $1 WHERE id = $2`;
    await client.query(updateQuery, [newQty, currentInventory.id]);

    const updateVariant = `update public.product_variant set inventory_quantity=$1 WHERE title = $2`;
    // await client.query(updateVariant, [newQty,optionResult.rows[0].id]);
    await client.query(updateVariant, [newQty,options]);

    await client.query("COMMIT");
    res.status(200).json({ message: "Inventory updated successfully.", qty: newQty });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
