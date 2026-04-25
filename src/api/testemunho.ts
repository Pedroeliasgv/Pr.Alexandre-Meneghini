import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const testemunhos = [];

// 📩 RECEBER TESTEMUNHO
app.post("/submit-testimony", (req, res) => {
  const { nome, sobrenome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Campos obrigatórios" });
  }

  const newTestimony = {
    id: Date.now(),
    nome,
    sobrenome,
    email,
    mensagem,
    createdAt: new Date(),
  };

  testemunhos.unshift(newTestimony);

  return res.json({ success: true });
});

// 📦 LISTAR TESTEMUNHOS (para “receber no site”)
app.get("/testimonies", (req, res) => {
  res.json(testemunhos);
});

app.listen(3001, () => {
  console.log("API rodando na porta 3001");
});