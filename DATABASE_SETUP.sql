-- Criar tabela de testemunhos no Supabase
-- Execute este script no SQL Editor do Supabase

CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mensagem TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de inscrições na newsletter
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para melhor performance
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX idx_testimonials_email ON testimonials(email);
CREATE INDEX idx_testimonials_status ON testimonials(status);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_ativo ON newsletter_subscribers(ativo);
CREATE INDEX idx_newsletter_created_at ON newsletter_subscribers(created_at DESC);

-- Politica de acesso (permitir leitura pública e inserção sem autenticação)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pública" ON testimonials
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização para admin" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Políticas para newsletter
CREATE POLICY "Permitir leitura pública newsletter" ON newsletter_subscribers
  FOR SELECT USING (false); -- Não permitir leitura pública dos emails

CREATE POLICY "Permitir inserção pública newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização admin newsletter" ON newsletter_subscribers
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Opcional: Limitar a 1 testemunho por email por dia (requer função PL/pgSQL)
-- Isso pode ser implementado como validação no backend se necessário
