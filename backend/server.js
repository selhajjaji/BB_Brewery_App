const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");
const { executeQuery } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

//  Update Product Description
app.post("/update-product", async (req, res) => {
  const { product_id, new_description } = req.body;
  try {
    const query = `BEGIN UPDATE_PRODUCT_DESC(:product_id, :new_description); END;`;
    await executeQuery(query, { product_id, new_description });
    res.json({ message: "Product description updated successfully!" });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

//  Add New Product
app.post("/add-product", async (req, res) => {
  const { product_name, description, image, price, active } = req.body;
  try {
    const query = `BEGIN PROD_ADD_SP(:product_name, :description, :image, :price, :active); END;`;
    await executeQuery(query, { product_name, description, image, price, active });
    res.json({ message: "Product added successfully!" });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Calculate Tax
app.post("/calculate-tax", async (req, res) => {
  const { state, subtotal } = req.body;
  try {
    const query = `DECLARE v_tax NUMBER; BEGIN TAX_COST_SP(:state, :subtotal, v_tax); :tax := v_tax; END;`;
    const result = await executeQuery(query, {
      state,
      subtotal,
      tax: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    });
    res.json({ tax: result.outBinds.tax });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

// 🆕 ✅ Update Shipping Status
app.post("/update-shipping-status", async (req, res) => {
  const { basket_id, date_shipped, shipper, tracking_number } = req.body;
  try {
    const query = `BEGIN STATUS_SHIP_SP(:basket_id, TO_DATE(:date_shipped, 'DD-MON-YY'), :shipper, :tracking_number); END;`;
    await executeQuery(query, {
      basket_id,
      date_shipped,
      shipper,
      tracking_number
    });
    res.json({ message: "Shipping status updated successfully!" });
  } catch (err) {
    console.error("Error updating shipping status:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/add-to-basket", async (req, res) => {
  const { basket_id, product_id, price, quantity, size_code, form_code } = req.body;
  try {
    const query = `BEGIN BASKET_ADD_SP(:basket_id, :product_id, :price, :quantity, :size_code, :form_code); END;`;
    await executeQuery(query, { basket_id, product_id, price, quantity, size_code, form_code });
    res.json({ message: "Item added to basket successfully!" });
  } catch (err) {
    console.error("Error adding to basket:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🆕  Check Sale Status
app.post("/check-sale-status", async (req, res) => {
  const { date, product_id } = req.body;
  try {
    const query = `BEGIN :result := CK_SALE_SF(TO_DATE(:date, 'DD-MON-YY'), :product_id); END;`;
    const binds = {
      date,
      product_id,
      result: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
    };
    const result = await executeQuery(query, binds);
    res.json({ status: result.outBinds.result });
  } catch (err) {
    console.error("Error checking sale status:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/check-basket-stock", async (req, res) => {
  const { basket_id } = req.body;
  try {
    const query = `BEGIN CHECK_BASKET_STOCK_SP(:basket_id, :result); END;`;
    const binds = {
      basket_id,
      result: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
    };
    const result = await executeQuery(query, binds);
    res.json({ status: result.outBinds.result });
  } catch (err) {
    console.error("Error checking basket stock:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/get-total-spending", async (req, res) => {
  const { shopper_id } = req.body;

  // Case 1: Show specific shopper's total spending
  if (shopper_id) {
    try {
      const query = `BEGIN :result := TOT_PURCH_SF(:shopper_id); END;`;
      const binds = {
        shopper_id,
        result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      };
      const result = await executeQuery(query, binds);
      res.json({ total: result.outBinds.result });
    } catch (err) {
      console.error("Error calculating total spending:", err);
      res.status(400).json({ error: "Invalid Shopper ID" });
    }
  } 
  // Case 2: Show total for all shoppers
  else {
    try {
      const query = `
        SELECT s.idshopper, s.firstname || ' ' || s.lastname AS name, NVL(SUM(b.total), 0) AS total
        FROM bb_shopper s
        LEFT JOIN bb_basket b ON s.idshopper = b.idshopper
        GROUP BY s.idshopper, s.firstname, s.lastname
        ORDER BY s.idshopper
      `;
      const result = await executeQuery(query);
      res.json({ shoppers: result.rows });
    } catch (err) {
      console.error("Error fetching shoppers list:", err);
      res.status(500).json({ error: err.message });
    }
  }
});

//  Server Listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
