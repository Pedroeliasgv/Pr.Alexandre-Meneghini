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
      to: "pedroeliasvale@gmail.com", // seu email
      subject: `Novo testemunho de ${nome}`,
      reply_to: email,

      html: `
        <div style="font-family: Arial, sans-serif; background:#f5f7fa; padding:20px;">
          <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
            
            <h2 style="color:#2563eb; margin-bottom:20px;">
              📩 Novo Testemunho Recebido
            </h2>

            <p style="font-size:14px; color:#555;">
              Você recebeu um novo testemunho através do site:
            </p>

            <hr style="margin:20px 0;" />

            <p><strong>Nome:</strong> ${nome} ${sobrenome}</p>
            <p><strong>Email:</strong> ${email}</p>

            <div style="
              margin-top:20px;
              padding:15px;
              background:#f1f5f9;
              border-radius:8px;
              font-size:15px;
              color:#333;
            ">
              ${mensagem}
            </div>

            <hr style="margin:20px 0;" />

            <p style="font-size:12px; color:#999;">
              Enviado pelo site oficial
            </p>

          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao enviar email" });
  }
}