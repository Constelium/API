const express = require("express");
const cors = require("cors"); // Ajoutez cette ligne
const connectDB = require("./db");
const nftRoutes = require("./routes/nftRoutes"); // Nouvel import

const userRoutes = require("./routes/userRoutes");
const mailRoutes = require("./routes/mailRoutes");
const app = express();
const port = 3001;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // Pour les navigateurs qui ne supportent pas le code 204
};

require("dotenv").config();

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/user", userRoutes);
app.use("/nfts", nftRoutes); // Nouvelle route pour les NFTs
app.use("/mail", mailRoutes);

app.post("/create-charge", async (req, res) => {
  try {
    // Replace "YOUR_API_KEY" with your actual Coinbase Commerce API Key
    const apiKey = process.env.COINBASE_COMMERCE_API_KEY;
    const chargeData = {
      name: req.body.name,
      description: req.body.description,
      pricing_type: "fixed_price",
      local_price: {
        amount: req.body.amount,
        currency: req.body.currency,
      },
    };

    const response = await axios.post(
      "https://api.commerce.coinbase.com/charges/",
      chargeData,
      {
        headers: {
          "X-CC-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the charge URL back to the client
    res.json({ chargeUrl: response.data.data.hosted_url });
  } catch (error) {
    console.error("Failed to create charge:", error.response);
    res.status(500).send("Error creating charge");
  }
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
