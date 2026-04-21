import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, sobrenome, email, mensagem } = req.body;

  try {
    await resend.emails.send({
      from: `${nome} ${sobrenome} <onboarding@resend.dev>`,
      to: "pedroeliasvale@gmail.com",
      subject: `Novo testemunho de ${nome}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Novo testemunho recebido 🙌</h2>

          <p><strong>Nome:</strong> ${nome} ${sobrenome}</p>
          <p><strong>Email:</strong> ${email}</p>

          <hr/>

          <p><strong>Mensagem:</strong></p>
          <p>${mensagem}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao enviar email" });
  }
}