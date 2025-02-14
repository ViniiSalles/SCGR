import express from 'express';
import routers from './routers/routers.js';
import cors from 'cors';

const app = express();

/**
 * Configuração do servidor Express.
 * Este servidor gerencia as requisições da API e define as rotas disponíveis.
 */

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Middleware para permitir o recebimento de requisições com corpo em JSON
app.use(express.json());

// Configuração das rotas da aplicação
app.use(routers);

// Inicia o servidor na porta 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
