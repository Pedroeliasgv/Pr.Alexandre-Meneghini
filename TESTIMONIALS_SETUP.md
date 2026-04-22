# Configuração de Testemunhos - Supabase

## 📋 Instruções de Setup

### 1. Criar Tabela no Supabase

1. Acesse seu projeto no [Supabase](https://supabase.com)
2. Vá para **SQL Editor**
3. Execute o script em `DATABASE_SETUP.sql`

Ou execute este SQL diretamente:

```sql
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pública" ON testimonials
  FOR INSERT WITH CHECK (true);
```

### 2. Configurar Credenciais

1. No seu projeto Supabase, vá para **Settings > API**
2. Copie:
   - `Project URL` → `supabaseUrl` em `src/lib/supabase.ts`
   - `anon public` key → `supabaseKey` em `src/lib/supabase.ts`

Exemplo:
```typescript
// src/lib/supabase.ts
const supabaseUrl = "https://seu-projeto.supabase.co";
const supabaseKey = "sua-anon-key-aqui";
```

### 3. Funcionalidades da Seção de Testemunhos

✅ **Formulário de Envio:**
- Nome, Email e Mensagem
- Validação de campos obrigatórios
- Estado de loading durante envio
- Feedback visual de sucesso

✅ **Lista de Testemunhos:**
- Carrega dados do Supabase em tempo real
- Exibe 5 estrelas para cada testemunho
- Mostra nome, email e data
- Scroll automático se muitos testemunhos
- Ordenado por data (mais recentes primeiro)

✅ **Fallback:**
- Se Supabase não estiver configurado, usa dados de exemplo
- Permite testar a UI sem credenciais

### 4. Estrutura de Dados

```typescript
Interface Testimonial {
  id?: string;           // UUID gerado pelo Supabase
  nome: string;          // Nome do usuário
  email: string;         // Email do usuário
  mensagem: string;      // Testemunho/Mensagem
  created_at?: string;   // Data de criação (ISO 8601)
}
```

### 5. Sugestões de Melhorias Futuras

- Adicionar sistema de moderação (aprovação de testemunhos)
- Limitar 1 testemunho por email por mês
- Adicionar rating/avaliação (1-5 estrelas)
- Enviar notificação por email quando novo testemunho chegar
- Adicionar paginação para melhor performance
- Adicionar filtros/busca
- Integrar com anti-spam/validação

### 6. Testes

Para testar localmente:

1. Preencha o formulário com dados fictícios
2. Clique em "Enviar testemunho"
3. Se Supabase estiver configurado, os dados serão salvos
4. Se não, usará dados mockados localmente
5. Recarregue a página para ver os testemunhos

---

**Dúvidas?** Consulte a documentação do Supabase em https://supabase.com/docs
