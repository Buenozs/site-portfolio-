const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Serve arquivos estáticos (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname)));
app.use(cors());
app.use(express.json());

// ===== ROTA: Envio de E-mail =====
app.post("/enviar", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  // Validação básica de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "E-mail inválido." });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfólio Pedro Bueno" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 Contato do site — ${nome}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#111;color:#f0f0f0;padding:32px;border-radius:12px;border:1px solid #222;">
          <h2 style="color:#e8ff00;margin-bottom:8px;">Nova mensagem do portfólio</h2>
          <p style="color:#888;margin-bottom:28px;font-size:14px;">Recebido via formulário de contato</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#888;font-size:13px;width:80px;">Nome</td>
              <td style="padding:10px 0;font-weight:600;">${nome}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#888;font-size:13px;">E-mail</td>
              <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#e8ff00;">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#1a1a1a;border-radius:8px;border-left:3px solid #e8ff00;">
            <p style="color:#888;font-size:12px;margin-bottom:8px;text-transform:uppercase;letter-spacing:.08em;">Mensagem</p>
            <p style="line-height:1.7;">${mensagem.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#555;">Responda diretamente para ${email}</p>
        </div>
      `,
    });

    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Erro ao enviar e-mail. Tente novamente." });
  }
});

// Todas as rotas não encontradas retornam o index
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}\n`);
});
