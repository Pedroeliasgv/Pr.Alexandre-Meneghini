# Guia de Administração de Testemunhos

## Como o Sistema Funciona

### 📝 Fluxo de Testemunhos

1. **Usuários submetem testemunhos** através do formulário na seção "Compartilhe o que Deus fez"
2. **Testemunhos são salvos** em `testimonials.json` com status `aprovado: false`
3. **Admin aprova testemunhos** manualmente no arquivo
4. **Testemunhos aprovados** aparecem na seção "Histórias que Transformam"

---

## 📂 Arquivo de Testemunhos

**Localização:** `testimonials.json` (raiz do projeto)

### Estrutura de um Testemunho

```json
{
  "id": "1701234567890",
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao@email.com",
  "mensagem": "Minha vida mudou completamente após encontrar a fé...",
  "data": "2024-04-21T10:30:00.000Z",
  "aprovado": false
}
```

### Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único (timestamp) |
| `nome` | string | Nome do testemunhante |
| `sobrenome` | string | Sobrenome do testemunhante |
| `email` | string | Email para contato |
| `mensagem` | string | Conteúdo do testemunho |
| `data` | string | Data/hora do envio (ISO 8601) |
| `aprovado` | boolean | **IMPORTANTE**: `true` para publicar |

---

## ✅ Como Aprovar Testemunhos

### Passo 1: Abrir o arquivo
```
testimonials.json
```

### Passo 2: Encontrar o testemunho
Procure pelo `email` ou `nome` do usuário

### Passo 3: Alterar `aprovado`
```json
// ANTES
"aprovado": false

// DEPOIS
"aprovado": true
```

### Passo 4: Salvar o arquivo
O testemunho aparecerá imediatamente na seção "Histórias que Transformam"

---

## 🚀 Endpoints da API

### Enviar Testemunho
```bash
POST http://localhost:3001/submit-testimony
```

**Body:**
```json
{
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao@email.com",
  "mensagem": "Meu testemunho..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Testemunho recebido com sucesso!",
  "id": "1701234567890"
}
```

---

### Buscar Testemunhos Aprovados
```bash
GET http://localhost:3001/testimonials
```

**Response:**
```json
[
  {
    "id": "1701234567890",
    "nome": "João",
    "sobrenome": "Silva",
    "email": "joao@email.com",
    "mensagem": "Minha vida mudou...",
    "data": "2024-04-21T10:30:00.000Z",
    "aprovado": true
  }
]
```

---

## 📊 Visualização de Testemunhos

- **Formulário:** Seção "Compartilhe o que Deus fez" (ContactSection)
- **Galeria:** Seção "Histórias que Transformam" (TestimonialsSection)
- **Gerenciamento:** `testimonials.json`

---

## 🛡️ Segurança

✅ **Validações automáticas:**
- Email obrigatório e com formato válido
- Nome e mensagem obrigatórios
- Trimagem de espaços em branco
- Email convertido para minúsculas

✅ **Testemunhos pendentes:**
- Salvos como `aprovado: false`
- Não aparecem na galeria
- Aguardam revisão manual

---

## 💡 Dicas

1. **Backup:** Faça backup do `testimonials.json` regularmente
2. **Moderação:** Revise antes de aprovar para evitar conteúdo inadequado
3. **Ordem:** Os testemunhos aparecem em ordem de data (mais recente primeiro)
4. **Limite:** Considere criar um limite de testemunhos exibidos se crescer muito

---

## 🔧 Troubleshooting

### Testemunho não aparece após aprovar?
- Verifique se `"aprovado": true` está correto
- Recarregue a página no navegador
- Verifique o console do navegador para erros

### Erro "Erro ao enviar testemunho"?
- Certifique-se de que o servidor está rodando: `npm run dev` (porta 3001)
- Verifique se todos os campos obrigatórios estão preenchidos
- Verifique o console do servidor para mais detalhes

### Arquivo `testimonials.json` não foi criado?
- O arquivo é criado automaticamente após o primeiro testemunho
- Aguarde um usuário enviar um testemunho

---

## 📈 Expansões Futuras

Possibilidades para expandir o sistema:

1. **Dashboard de Administração:** Painel web para gerenciar testemunhos
2. **Email de Notificação:** Notificar admin quando novo testemunho chega
3. **Banco de Dados:** Migrar de JSON para MongoDB/PostgreSQL
4. **Rating:** Adicionar estrelas/votos nos testemunhos
5. **Filtros:** Pesquisar por data, autor, categoria
6. **Imagens:** Permitir foto do testemunhante
7. **Aprovação Automática:** IA para detectar conteúdo apropriado

---

**Última atualização:** 21 de Abril de 2026
