# Confia.ai - Landing Page

Uma landing page moderna para o Confia.ai, uma ferramenta focada na tradução de apólices de seguro de automóvel.

## Funcionalidades

- Design moderno e responsivo
- Área de upload de arquivos PDF
- Chatbot integrado com OpenAI
- Análise de apólices de seguro
- Exibição de informações em linguagem simples e clara

## Configuração

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
   ```
   OPENAI_API_KEY=sua_chave_api_aqui
   ```
   Substitua `sua_chave_api_aqui` pela sua chave de API da OpenAI.
   
   Para obter uma chave de API da OpenAI:
   1. Acesse [https://platform.openai.com/](https://platform.openai.com/)
   2. Faça login ou crie uma conta
   3. Vá para "API Keys" no menu lateral
   4. Clique em "Create new secret key"
   5. Copie a chave gerada e cole no arquivo `.env.local`

## Desenvolvimento

```
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## Produção

```
npm run build
npm run start
```

## Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- OpenAI API
- PDF Parse

## Estrutura do Projeto

- `/src/app`: Páginas e rotas da aplicação
- `/src/components`: Componentes React reutilizáveis
- `/src/lib`: Utilitários e funções auxiliares
- `/src/app/api`: Rotas da API para o chatbot e análise de apólices

## Licença

Este projeto está licenciado sob a licença MIT. 