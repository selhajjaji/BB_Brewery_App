const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");
const { executeQuery } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

<<<<<<< HEAD
const PORT = process.env.PORT || 5001;
=======
const PORT = process.env.PORT || 5000;
>>>>>>> 1decdc42ea6f2bd5f2299a9c11198079368105a6

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

app.post("/add-product", async (req, res) => {
    const { product_name, description, image, price, active } = req.body;
    try {
      const query = `BEGIN PROD_ADD_SP(:product_name, :description, :image, :price, :active); END;`;
      await executeQuery(query, {
        product_name,
        description,
        image,
        price,
        active
      });
      res.json({ message: "Product added successfully!" });
    } catch (err) {
      console.error("Database Error: ", err);
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ API pour calculer la taxe sur un panier
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});