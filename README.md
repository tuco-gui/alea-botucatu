# Alea Botucatu — Realize Negócios Imobiliários

Landing page de pré-lançamento para atendimento comercial da **Realize Negócios Imobiliários** (CRECI-J 33.923), desenvolvida pela Figueira Marketing.

## Situação atual
- **Formulário integrado em homologação:** registra o pré-cadastro via n8n na planilha exclusiva da Realize e recebe protocolo para envio via WhatsApp. Teste controlado com dados fictícios confirmou gravação na planilha; falta o teste completo pelo navegador. `robots: noindex` permanece até aprovação.
- Projeto Vercel existente: `alea-botucatu`.
- Repositório: https://github.com/tuco-gui/alea-botucatu
- Cliente: Realize Negócios Imobiliários, Botucatu/SP.
- Produto: Alea Botucatu / Bosque da Alvorada (materiais recebidos em 2026-10-15).
- Atendimento independente, sem sugerir que a Realize é a Tenda.

## Estrutura
- `index.html`: landing page e formulário que envia dados à API do projeto.\n- `api/lead.js`: função Vercel server-side que valida o formulário e encaminha ao webhook n8n através da variável `ALEA_LEADS_WEBHOOK_URL`.\n- `obrigado.html`: exibe protocolo, prepara a mensagem e abre WhatsApp da Realize, com botão de contingência.\n- Planilha: https://docs.google.com/spreadsheets/d/1vPQBhcAykwaM22t-8paKFXC42SGR1vnSf6hQls6ckqE/edit\n- Fluxo n8n (exclusivo Realize): `CZ3gAStDKp75yJtm`, credencial já existente de Google Sheets.\n- WhatsApp atendimento: `+55 14 99708-0405`.

## Referências de imagens
Materiais remetidos pela Realize no projeto Figueira: fachadas, salas, dormitórios, cozinha, localização, praça de lazer e logomarcas.
No protótipo, as imagens usam URLs da LP de referência de terceiros **provisoriamente**. Antes da aprovação/publicação com campanhas, migrar para assets locais autorizados em `public/assets` e verificar direitos/qualidade/ disponibilidade. Não utilizar a marca Livar no conteúdo da Realize.

## Pendências para versão operacional
1. Autorizações formais para uso de logomarcas, imagens e informações do empreendimento.
2. Dados comerciais e jurídicos: confirmar CRECI, e-mail/contato de privacidade, política de privacidade e base legal aplicável. WhatsApp recebido em 15/10/2026.
3. Teste completo pela LP pública, política de privacidade, rate limit/anti-spam e política de retenção. Teste via execução manual do n8n gravou com sucesso e a linha fictícia foi removida.
4. Verificação das condições de comercialização, registro, plantas, preço, ITBI e CEF: nenhuma condição não confirmada é promessa.
5. Download das mídias recebidas e hospedagem no projeto (sem hotlink).
6. SEO: retirar `noindex` apenas depois da homologação e publicação autorizada; configurar sitemap e analytics somente com aprovação.
7. Testes de acessibilidade, imagens, formulário, mobile e indexabilidade antes de ativar tráfego pago.

## Desenvolvimento
Abra `index.html` em um navegador para revisar a composição. Não requer instalar dependências.

## Segurança
Não inserir credenciais no GitHub. A API não expõe a credencial da planilha, tem validação básica e encaminha para n8n. O front-end coleta consentimento; revisar aviso/política de privacidade antes de divulgação pública/campanhas. Sem Supabase. O protocolo é chave de consulta na planilha; a atribuição completa depende dos parâmetros UTM/identificadores presentes na visita e não pode ser recuperada se não forem fornecidos.

## Escopo
CLIENTE: Realize Negócios Imobiliários. Sem dependências ou dados de outros clientes da Figueira.
