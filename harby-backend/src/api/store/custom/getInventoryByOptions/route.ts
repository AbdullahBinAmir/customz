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

interface Option {
  title: string;
  option: { value: string };
}

export async function POST(req: Request, res: Response) {
  const { selectedOptions }: { selectedOptions: Option[] } = req.body;

  // Initialize variables for color, type, and size
  let colorValue: string | null = null;
  let typeValue: string | null = null;
  let sizeValue: string | null = null;

  // Loop through the array and extract color, type, and size values
  selectedOptions.forEach((option) => {
    if (option.title === "color") {
      colorValue = option.option.value;
    } else if (option.title === "type") {
      typeValue = option.option.value;
    } else if (option.title === "size") {
      sizeValue = option.option.value;
    }
  });

  // Check if at least one of color, type, or size is provided
  if (!colorValue && !typeValue && !sizeValue) {
    return res.status(400).json({ message: "At least one of color, type, or size must be provided." });
  }

  try {
    const client = await pool.connect();
    try {
      // Build dynamic query based on provided values
      let query = `SELECT qty FROM custom_inventory WHERE `;
      let queryValues: Array<string> = [];
      let index = 1;

      // Build the query based on which fields are provided
      const conditions: string[] = [];
      if (colorValue) {
        conditions.push(`color = $${index++}`);
        queryValues.push(colorValue);
      }
      if (typeValue) {
        conditions.push(`type = $${index++}`);
        queryValues.push(typeValue);
      }
      if (sizeValue) {
        conditions.push(`size = $${index++}`);
        queryValues.push(sizeValue);
      }

      // Join conditions with 'AND'
      query += conditions.join(' AND ');

      const result = await client.query(query, queryValues);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "No matching inventory found." });
      }

      // Sum up qty if multiple rows are returned
      const totalQty = result.rows.reduce((sum, row) => {
        const qty = parseInt(row.qty);
        return isNaN(qty) ? sum : sum + qty;
      }, 0);

      res.status(200).json({ qty: totalQty });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send({ message: "Server error", error });
  }
}

// export async function PUT(req: Request, res: Response) {
//   const { selectedOptions, qty }: { selectedOptions: Option[], qty: number } = req.body;

//   // Initialize variables for color, type, and size
//   let colorValue: string | null = null;
//   let typeValue: string | null = null;
//   let sizeValue: string | null = null;

//   // Loop through the array and extract color, type, and size values
//   selectedOptions.forEach((option) => {
//     if (option.title === "color") {
//       colorValue = option.option.value;
//     } else if (option.title === "type") {
//       typeValue = option.option.value;
//     } else if (option.title === "size") {
//       sizeValue = option.option.value;
//     }
//   });

//   // Check if at least one of color, type, or size is provided
//   if (!colorValue && !typeValue && !sizeValue) {
//     return res.status(400).json({ message: "At least one of color, type, or size must be provided." });
//   }

//   if (!qty || qty <= 0) {
//     return res.status(400).json({ message: "A valid qty must be provided." });
//   }

//   try {
//     const client = await pool.connect();
//     try {
//       // Build dynamic query to find the row
//       let query = `SELECT id, qty FROM custom_inventory WHERE `;
//       let queryValues: Array<string> = [];
//       let index = 1;

//       // Build the query based on which fields are provided
//       const conditions: string[] = [];
//       if (colorValue) {
//         conditions.push(`color = $${index++}`);
//         queryValues.push(colorValue);
//       }
//       if (typeValue) {
//         conditions.push(`type = $${index++}`);
//         queryValues.push(typeValue);
//       }
//       if (sizeValue) {
//         conditions.push(`size = $${index++}`);
//         queryValues.push(sizeValue);
//       }

//       // Join conditions with 'AND'
//       query += conditions.join(' AND ');

//       const result = await client.query(query, queryValues);

//       if (result.rowCount === 0) {
//         return res.status(404).json({ message: "No matching inventory found." });
//       }

//       const currentInventory = result.rows[0];
//       const currentQty = parseInt(currentInventory.qty);

//       if (isNaN(currentQty) || currentQty < qty) {
//         return res.status(400).json({ message: "Insufficient inventory for the requested quantity." });
//       }

//       // Subtract the requested qty from the current inventory
//       const newQty = currentQty - qty;

//       // Update the inventory in the database
//       const updateQuery = `UPDATE custom_inventory SET qty = $1 WHERE id = $2`;
//       await client.query(updateQuery, [newQty, currentInventory.id]);

//       res.status(200).json({ message: "Inventory updated successfully.", qty: newQty });
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).send({ message: "Server error", error });
//   }
// }

interface OptionValue {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  value: string;
  option_id: string;
  variant_id: string;
  metadata: any;
}

export async function PUT(req: Request, res: Response) {
  // console.log(req.body)
  const { selectedOptions }: { selectedOptions: OptionValue[] } = req.body;
  const { qty } = req.body;

  if (!Array.isArray(selectedOptions) || !qty || qty <= 0) {
    return res.status(400).json({ message: "Invalid selected options or quantity." });
  }

  let colorOptionId: string | null = null;
  let sizeOptionId: string | null = null;
  let typeOptionId: string | null = null;

  try {
    const client = await pool.connect();

    // Fetch option IDs for color, size, and type from product_option table
    const optionQuery = `
      SELECT id, title
      FROM public.product_option
      WHERE title IN ('color', 'size', 'type')
    `;
    const optionResult = await client.query(optionQuery);

    optionResult.rows.forEach((row) => {
     selectedOptions.forEach((option) => {
      if (row.title === 'color' && row.id===option.option_id) colorOptionId = row.id;
      if (row.title === 'size'  && row.id===option.option_id) sizeOptionId = row.id;
      if (row.title === 'type'  && row.id===option.option_id) typeOptionId = row.id;
     })
    });

    let colorValue: string | null = null;
    let typeValue: string | null = null;
    let sizeValue: string | null = null;

    selectedOptions.forEach((option) => {
      if (option.option_id === colorOptionId) colorValue = option.value;
      if (option.option_id === sizeOptionId) sizeValue = option.value;
      if (option.option_id === typeOptionId) typeValue = option.value;
    });

    if (!colorValue && !typeValue && !sizeValue) {
      return res.status(400).json({ message: "At least one of color, type, or size must be provided." });
    }

    await client.query("BEGIN");

    // Build the dynamic inventory check query
    let query = `SELECT id, qty FROM custom_inventory WHERE `;
    const queryValues: string[] = [];
    let index = 1;

    const conditions: string[] = [];
    if (colorValue) {
      conditions.push(`color = $${index++}`);
      queryValues.push(colorValue);
    }
    if (typeValue) {
      conditions.push(`type = $${index++}`);
      queryValues.push(typeValue);
    }
    if (sizeValue) {
      conditions.push(`size = $${index++}`);
      queryValues.push(sizeValue);
    }

    query += conditions.join(" AND ");
    const result = await client.query(query, queryValues);

    if (result.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "No matching inventory found." });
    }

    const currentInventory = result.rows[0];
    const currentQty = parseInt(currentInventory.qty);

    if (isNaN(currentQty) || currentQty < qty) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Insufficient inventory for the requested quantity." });
    }

    const newQty = currentQty - qty;
    const updateQuery = `UPDATE custom_inventory SET qty = $1 WHERE id = $2`;
    await client.query(updateQuery, [newQty, currentInventory.id]);

    await client.query("COMMIT");
    res.status(200).json({ message: "Inventory updated successfully.", qty: newQty });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
