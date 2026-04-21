import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// 📁 CAMINHO DO ARQUIVO DE TESTEMUNHOS
const testimonialsFile = path.join(__dirname, "testimonials.json");

// 🔑 CONFIG MERCADO PAGO
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

    res.json({
      id: response.body.id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar pagamento");
  }
});

// 💬 ROTA ENVIAR TESTEMUNHO
app.post("/submit-testimony", async (req, res) => {
  try {
    const { nome, sobrenome, email, mensagem } = req.body;

    // ✅ VALIDAÇÃO
    if (!nome || !email || !mensagem) {
      return res.status(400).json({ error: "Nome, email e mensagem são obrigatórios" });
    }

    // 📝 CRIAR OBJETO DO TESTEMUNHO
    const testimony = {
      id: Date.now().toString(),
      nome: String(nome).trim(),
      sobrenome: String(sobrenome).trim(),
      email: String(email).trim().toLowerCase(),
      mensagem: String(mensagem).trim(),
      data: new Date().toISOString(),
      aprovado: false, // Testemunhos precisam de aprovação
    };

    // 📂 LER TESTEMUNHOS EXISTENTES
    let testimonials = [];
    if (fs.existsSync(testimonialsFile)) {
      const data = fs.readFileSync(testimonialsFile, "utf-8");
      testimonials = JSON.parse(data || "[]");
    }

    // ➕ ADICIONAR NOVO TESTEMUNHO
    testimonials.push(testimony);

    // 💾 SALVAR NO ARQUIVO
    fs.writeFileSync(testimonialsFile, JSON.stringify(testimonials, null, 2));

    res.status(201).json({ 
      success: true, 
      message: "Testemunho recebido com sucesso! Será aprovado em breve.",
      id: testimony.id 
    });

  } catch (error) {
    console.error("Erro ao salvar testemunho:", error);
    res.status(500).json({ error: "Erro ao enviar testemunho" });
  }
});

// 📖 ROTA LISTAR TESTEMUNHOS APROVADOS
app.get("/testimonials", (req, res) => {
  try {
    if (!fs.existsSync(testimonialsFile)) {
      return res.json([]);
    }

    const data = fs.readFileSync(testimonialsFile, "utf-8");
    const testimonials = JSON.parse(data || "[]");

    // 🔒 RETORNA APENAS APROVADOS
    const approved = testimonials.filter((t) => t.aprovado);

    res.json(approved);
  } catch (error) {
    console.error("Erro ao buscar testemunhos:", error);
    res.status(500).json({ error: "Erro ao buscar testemunhos" });
  }
});

app.listen(3001, () => {
  console.log("🔥 API rodando na porta 3001");
});