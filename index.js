// Replace with your CoinMarketCap API key
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Endpoint to get the latest rate for a specific cryptocurrency
app.get("/api/rate/:cryptoSymbol", async (req, res) => {
  const apiKey = "4f49f915-50d7-434a-a15a-1ed64a8c6fb7";
  // Replace with your CoinMarketCap API key
  const cryptoSymbol = req.params.cryptoSymbol || "bitcoin";
  console.log(cryptoSymbol);

  try {
    // const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?symbol=${cryptoSymbol}`;
    const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    const response = await axios.get(apiUrl, {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    });

    const data = response.data;
    console.log(data.data[0]);

    if (response.status === 200) {
      const rate = data.data[0].quote.USD.price;
      console.log(rate);
      res.json({ rate });
    } else {
      throw new Error(`Unable to fetch rate for ${cryptoSymbol}`);
    }
  } catch (error) {
    console.error("Error fetching rate:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
