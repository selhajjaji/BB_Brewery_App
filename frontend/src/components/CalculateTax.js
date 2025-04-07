import React, { useState } from "react";
import axios from "axios";

const CalculateTax = () => {
  const [state, setState] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [tax, setTax] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/calculate-tax", {
        state,
        subtotal,
      });
      setTax(response.data.tax);
    } catch (error) {
      setTax("Error calculating tax");
    }
  };

  return (
    <div>
      <h2>Calculate Tax</h2>
      <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
      <input type="number" placeholder="Subtotal" value={subtotal} onChange={(e) => setSubtotal(e.target.value)} />
      <button onClick={handleCalculate}>Calculate</button>
      <p>Tax: {tax !== null ? `$${tax}` : "N/A"}</p>
    </div>
  );
};

export default CalculateTax;
