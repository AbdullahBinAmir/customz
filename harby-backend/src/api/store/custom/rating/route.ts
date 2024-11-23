import { Request, Response } from "express";
import dotenv from "dotenv";
import * as pg from "pg";
import { generateEntityId } from "@medusajs/medusa";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
  connectionString,
  max: 100,
});

export async function POST(req: Request, res: Response) {
  try {
    const { productIds, rating, review, user_id } = req.body;
    // console.log("req body =============", req.body);
    // Validate the input
    // if (
    //     (Array.isArray(productIds) && productIds.length === 0) ||
    //     (Array.isArray(productIds) &&
    //         !productIds.every((id) => typeof id === "string")) ||
    //     (!Array.isArray(productIds) && typeof productIds !== "string") ||
    //     typeof rating !== "number"
    // ) {
    //     res.status(400).json({ error: "Invalid input format" });
    //     return;
    // }
    if (
      (Array.isArray(productIds) && productIds.length === 0) ||
      (Array.isArray(productIds) &&
        !productIds.every((id) => typeof id === "string")) ||
      (!Array.isArray(productIds) && typeof productIds !== "string") ||
      typeof rating !== "number" ||
      (review && typeof review !== "string") // Review is optional, but must be a string if provided
    ) {
      res.status(400).json({ error: "Invalid input format" });
      return;
    }

    const client = await pool.connect();

    try {
      // Convert single product ID to an array for uniform processing
      const productIdArray = Array.isArray(productIds)
        ? productIds
        : [productIds];

      // Loop through each product ID and update the database
      //   for (const productId of productIdArray) {
      //     // Insert rating for each product ID
      //     await client.query(
      //       "INSERT INTO rating (productid, rating) VALUES ($1, $2)",
      //       [productId, rating]
      //     );
      //   }
      for (const productId of productIdArray) {
        // Insert rating and review for each product ID
        const id = generateEntityId("","rating")
        await client.query(
          "INSERT INTO rating (id,productid, rating, review, user_id) VALUES ($1, $2, $3, $4, $5)",
          [id,productId, rating, review, user_id || null] // user_id is optional
        );
      }

      // Calculate average ratings and update product ratings after inserting all records
      for (const productId of productIdArray) {
        const productRatingQuery = `
              SELECT AVG(rating::NUMERIC) AS average_rating
              FROM rating
              WHERE productid = $1
            `;

        const productRatingResult = await client.query(productRatingQuery, [
          productId,
        ]);
        const averageRating = productRatingResult.rows[0].average_rating;

        const updateProductRatingQuery = `
              UPDATE product
              SET rating = $1
              WHERE id = $2
            `;

        await client.query(updateProductRatingQuery, [
          averageRating,
          productId,
        ]);
      }

      res.status(200).json({ success: true });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
