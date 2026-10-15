# Alea Botucatu — Realize Negócios Imobiliários

Landing page de pré-lançamento para atendimento comercial da **Realize Negócios Imobiliários** (CRECI-J 33.923), desenvolvida pela Figueira Marketing.

## Situação atual
- **Versão demonstrativa**: conteúdo navegável, mobile-first, sem captação real de dados; `robots: noindex` até a homologação.
- Projeto Vercel existente: `alea-botucatu`.
- Repositório: https://github.com/tuco-gui/alea-botucatu
- Cliente: Realize Negócios Imobiliários, Botucatu/SP.
- Produto: Alea Botucatu / Bosque da Alvorada (materiais recebidos em 2026-10-15).
- Atendimento independente, sem sugerir que a Realize é a Tenda.

## Estrutura
- `index.html`: página estática responsiva com CSS e formulário **demonstrativo, sem envio**.

## Referências de imagens
Materiais remetidos pela Realize no projeto Figueira: fachadas, salas, dormitórios, cozinha, localização, praça de lazer e logomarcas.
No protótipo, as imagens usam URLs da LP de referência de terceiros **provisoriamente**. Antes da aprovação/publicação com campanhas, migrar para assets locais autorizados em `public/assets` e verificar direitos/qualidade/ disponibilidade. Não utilizar a marca Livar no conteúdo da Realize.

## Pendências para versão operacional
1. Autorizações formais para uso de logomarcas, imagens e informações do empreendimento.
2. Dados comerciais e jurídicos: telefone/WhatsApp oficial, e-mail de privacidade, dados de contato da Realize e confirmação do CRECI.
3. Definição de destino dos leads (CRM / webhook), LGPD, consentimento, política de privacidade e testes de entrega.
4. Verificação das condições de comercialização, registro, plantas, preço, ITBI e CEF: nenhuma condição não confirmada é promessa.
5. Download das mídias recebidas e hospedagem no projeto (sem hotlink).
6. SEO: retirar `noindex` apenas depois da homologação e publicação autorizada; configurar sitemap e analytics somente com aprovação.
7. Testes de acessibilidade, imagens, formulário, mobile e indexabilidade antes de ativar tráfego pago.

## Desenvolvimento
Abra `index.html` em um navegador para revisar a composição. Não requer instalar dependências.

## Segurança
Não inserir credenciais no GitHub. Não gravar dados de leads sem integração e política de privacidade. Não colocar essa versão de demonstração em campanhas.

## Escopo
CLIENTE: Realize Negócios Imobiliários. Sem dependências ou dados de outros clientes da Figueira.
