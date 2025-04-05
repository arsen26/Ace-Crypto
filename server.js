import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/crypto", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});
app.get("/crypto/:symbol", async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      {
        params: {
          symbol: symbol.toUpperCase(),
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching data for ${symbol}`,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
