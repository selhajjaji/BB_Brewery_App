const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");
const { executeQuery } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

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
  const { basket_id, ship_date, shipper, tracking_number } = req.body;
  try {
    const query = `BEGIN STATUS_SHIP_SP(:basket_id, :ship_date, :shipper, :tracking_number); END;`;
    await executeQuery(query, { basket_id, ship_date, shipper, tracking_number });
    res.json({ message: "Shipping status updated successfully!" });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

// 🆕 Add Basket Item
app.post("/add-basket-item", async (req, res) => {
  const { idproduct, idbasket, price, quantity, option1, option2 } = req.body;
  try {
    const query = `BEGIN COMP214_W25_ERS_1.BASKET_ADD_SP(:idproduct, :idbasket, :price, :quantity, :option1, :option2); END;`;
    await executeQuery(query, {
      idproduct,
      idbasket,
      price,
      quantity,
      option1,
      option2
    });
    res.json({ message: "Basket item added successfully!" });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

// 🆕  Check Sale Status
app.post("/check-sale", async (req, res) => {
  const { date, idproduct } = req.body;
  try {
    const query = `BEGIN :result := CK_SALE_SF(:date, :idproduct); END;`;
    const result = await executeQuery(query, {
      date,
      idproduct,
      result: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    });
    res.json({ saleStatus: result.outBinds.result });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

//  Server Listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
