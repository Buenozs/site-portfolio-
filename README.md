# Pedro Bueno — Portfólio Profissional

Site pessoal profissional com design moderno, formulário de contato funcional e backend Node.js.

## 🚀 Tecnologias

| Front-end | Back-end | Ferramentas |
|-----------|----------|-------------|
| HTML5     | Node.js  | Git & GitHub |
| CSS3      | Express  | VS Code     |
| JavaScript | Nodemailer | dotenv   |

## ✨ Funcionalidades

- Design responsivo (mobile-first)
- Animações de scroll e micro-interações
- Cursor personalizado
- Barras de habilidades animadas
- Formulário de contato funcional com envio de e-mail
- E-mail HTML formatado com Nodemailer
- SEO básico (meta tags, Open Graph)

## 🛠 Como rodar localmente

**1. Clone o repositório:**
```bash
git clone https://github.com/Buenozs/site-pessoal.git
cd site-pessoal
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```
Edite o `.env` com suas credenciais:
```env
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail
PORT=3000
```

> ⚠️ Para Gmail, use uma **Senha de App** (não a senha normal).  
> Acesse: Google Account → Segurança → Verificação em 2 etapas → Senhas de app

**4. Inicie o servidor:**
```bash
node server.js
```

**5. Acesse no navegador:**
```
http://localhost:3000
```

## 🌐 Deploy (GitHub Pages — apenas front-end)

Para hospedar apenas o front-end no GitHub Pages:

1. Vá em **Settings → Pages** no seu repositório
2. Selecione a branch `main` e pasta `/ (root)`
3. Clique em **Save**

> O formulário de contato requer o servidor Node.js rodando. Para deploy completo, use Railway, Render ou Vercel.

## 📁 Estrutura

```
site-pessoal/
├── index.html      # Estrutura principal
├── style.css       # Estilos
├── script.js       # Interatividade
├── server.js       # Backend Express
├── foto.jpg        # Foto de perfil
├── background.png  # Imagem de fundo
├── .env            # Variáveis de ambiente (não versionar)
├── .env.example    # Exemplo de variáveis
├── .gitignore
└── package.json
```

## 📬 Contato

- **E-mail:** buenozspe@gmail.com
- **LinkedIn:** [pedro-bueno-457b91320](https://www.linkedin.com/in/pedro-bueno-457b91320/)
- **GitHub:** [Buenozs](https://github.com/Buenozs)
- **WhatsApp:** +55 12 99611-3303

---

© 2026 Pedro Bueno
