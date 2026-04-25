import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//  CONFIG MERCADO PAGO
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

// 🚀 ROTA CRIAR PAGAMENTO
app.post("/create-preference", async (req, res) => {
  try {
    const { items } = req.body;

    const preference = {
      items: items.map((item) => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      back_urls: {
        success: "http://localhost:5173/sucesso",
        failure: "http://localhost:5173/erro",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    dotenv.config();

    const app = express();
    app.use(cors());
    app.use(express.json());